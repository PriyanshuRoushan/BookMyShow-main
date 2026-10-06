import Booking from "../models/booking.js";
import ShowSeat from "../models/showSeats.js";
import Show from "../models/show.js";
import mongoose from "mongoose";
import User from "../models/users.js";
import { sendTicketEmail } from "../services/ticketEmailService.js";
import { ensureShowSeatInventory } from "../services/showSeatInventoryService.js";

const HOLD_MINUTES = 10;
const MAX_SEATS_PER_BOOKING = 10;
const invalid = (value) => !mongoose.Types.ObjectId.isValid(value);

async function releaseExpiredHolds(showID) {
  const expired = await Booking.find({ showID, status: "PENDING", expiresAt: { $lte: new Date() } }).select("_id");
  if (!expired.length) return;
  const ids = expired.map((booking) => booking._id);
  await ShowSeat.updateMany({ showID, bookingID: { $in: ids }, status: "HELD" }, { $set: { status: "AVAILABLE", bookingID: null, lockedAt: null } });
  await Booking.updateMany({ _id: { $in: ids } }, { $set: { status: "EXPIRED" } });
}

export const getShowSeats = async (req, res) => {
  try {
    if (invalid(req.params.showId)) return res.status(400).json({ message: "Invalid show id" });
    const show = await Show.findOne({ _id: req.params.showId, status: "ACTIVE" });
    if (!show) return res.status(404).json({ message: "Show not available" });
    await ensureShowSeatInventory(show);
    await releaseExpiredHolds(req.params.showId);
    const seats = await ShowSeat.find({ showID: req.params.showId }).select("seatCode price status category row seatNumber").sort({ row: 1, seatNumber: 1 });
    return res.json(seats);
  } catch {
    return res.status(500).json({ message: "Unable to load seat availability" });
  }
};

// A hold is deliberately pending: payment confirmation will turn it into a ticket.
export const createBooking = async (req, res) => {
  const { showId, seatIds } = req.body;
  if (invalid(showId) || !Array.isArray(seatIds) || !seatIds.length) return res.status(400).json({ message: "A valid show and at least one seat are required" });
  if (seatIds.length > MAX_SEATS_PER_BOOKING || new Set(seatIds.map(String)).size !== seatIds.length) return res.status(400).json({ message: `Choose between 1 and ${MAX_SEATS_PER_BOOKING} different seats` });
  if (seatIds.some(invalid)) return res.status(400).json({ message: "One or more seat ids are invalid" });

  try {
    await releaseExpiredHolds(showId);
    const session = await mongoose.startSession();
    let booking;
    try {
      await session.withTransaction(async () => {
        const show = await Show.findOne({ _id: showId, status: "ACTIVE" }).session(session);
        if (!show) throw Object.assign(new Error("Show not available"), { statusCode: 404 });
        await ensureShowSeatInventory(show, { session });
        const seats = await ShowSeat.find({ _id: { $in: seatIds }, showID: showId, status: "AVAILABLE" }).session(session);
        if (seats.length !== seatIds.length) throw Object.assign(new Error("One or more seats are no longer available"), { statusCode: 409 });
        booking = (await Booking.create([{
          userID: req.user._id, showID: showId, seats: seatIds,
          totalAmount: seats.reduce((total, seat) => total + seat.price, 0),
          expiresAt: new Date(Date.now() + HOLD_MINUTES * 60 * 1000),
        }], { session }))[0];
        const update = await ShowSeat.updateMany({ _id: { $in: seatIds }, showID: showId, status: "AVAILABLE" }, { $set: { status: "HELD", bookingID: booking._id, lockedAt: new Date() } }, { session });
        if (update.modifiedCount !== seatIds.length) throw Object.assign(new Error("One or more seats are no longer available"), { statusCode: 409 });
      });
    } finally { await session.endSession(); }
    return res.status(201).json({ id: booking._id, bookingId: booking.bookingId, totalAmount: booking.totalAmount, paymentStatus: booking.paymentStatus, expiresAt: booking.expiresAt });
  } catch (error) {
    return res.status(error.statusCode || 500).json({ message: error.message || "Unable to reserve seats" });
  }
};

export const getMyBookings = async (req, res) => {
  try {
    const bookings = await Booking.find({ userID: req.user._id }).populate("showID", "movieName showDate startTime theatreID screenID").populate("seats", "seatCode price").sort({ createdAt: -1 });
    return res.json(bookings);
  } catch { return res.status(500).json({ message: "Unable to load bookings" }); }
};

// Called only by a future Razorpay/Stripe webhook after its signature and payment
// status have been verified. It is deliberately not exposed as a public endpoint.
export async function confirmPaidBooking({ bookingId, paymentReference }) {
  const session = await mongoose.startSession();
  let confirmedBooking;
  try {
    await session.withTransaction(async () => {
      const booking = await Booking.findOne({ _id: bookingId, status: "PENDING", paymentStatus: "PENDING" }).session(session);
      if (!booking) throw new Error("Booking is not awaiting payment confirmation");
      if (booking.expiresAt <= new Date()) throw new Error("Booking hold has expired");
      const seatUpdate = await ShowSeat.updateMany({ _id: { $in: booking.seats }, bookingID: booking._id, status: "HELD" }, { $set: { status: "BOOKED" } }, { session });
      if (seatUpdate.modifiedCount !== booking.seats.length) throw new Error("Booking seats are no longer held");
      booking.status = "CONFIRMED";
      booking.paymentStatus = "PAID";
      booking.paymentReference = paymentReference;
      booking.expiresAt = null;
      await booking.save({ session });
      confirmedBooking = booking;
    });
  } finally { await session.endSession(); }

  try {
    const [user, show, seats] = await Promise.all([
      User.findById(confirmedBooking.userID),
      Show.findById(confirmedBooking.showID),
      ShowSeat.find({ _id: { $in: confirmedBooking.seats } }),
    ]);
    if (user && show && await sendTicketEmail({ booking: confirmedBooking, user, show, seats })) {
      confirmedBooking.emailSentAt = new Date();
      await confirmedBooking.save();
    }
  } catch (error) {
    console.error(`Ticket email failed for ${confirmedBooking.bookingId}:`, error.message);
  }
  return confirmedBooking;
}
