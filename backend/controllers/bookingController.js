import Booking from "../models/booking.js";
import ShowSeat from "../models/showSeat.js";
import Show from "../models/show.js";
import mongoose from "mongoose";

export const createBooking = async (req, res) => {
  const session = await mongoose.startSession();
  session.startTransaction();

  try {
    const { showId, seatIds } = req.body;
    const userId = req.user._id;

    if (!showId || !seatIds || seatIds.length === 0) {
      return res.status(400).json({ message: "Show and seats are required" });
    }

    // 1️⃣ Check show exists
    const show = await Show.findById(showId);
    if (!show || show.status !== "ACTIVE") {
      return res.status(404).json({ message: "Show not available" });
    }

    // 2️⃣ Fetch seats and lock them
    const seats = await ShowSeat.find({
      _id: { $in: seatIds },
      show: showId,
      status: "AVAILABLE",
    }).session(session);

    if (seats.length !== seatIds.length) {
      throw new Error("One or more seats already booked");
    }

    // 3️⃣ Mark seats as BOOKED
    await ShowSeat.updateMany(
      { _id: { $in: seatIds } },
      { $set: { status: "BOOKED" } },
      { session }
    );

    const totalAmount = seats.reduce(
      (sum, seat) => sum + seat.price,
      0
    );

    // 4️⃣ Create booking
    const booking = await Booking.create(
      [
        {
          user: userId,
          show: showId,
          seats: seatIds,
          totalAmount,
          paymentStatus: "PAID",
          bookingStatus: "CONFIRMED",
        },
      ],
      { session }
    );

    await session.commitTransaction();
    session.endSession();

    res.status(201).json(booking[0]);
  } catch (error) {
    await session.abortTransaction();
    session.endSession();

    res.status(400).json({ message: error.message });
  }
};



export const getMyBookings = async (req, res) => {
  try {
    const bookings = await Booking.find({ user: req.user._id })
      .populate("show")
      .populate("seats");

    res.status(200).json(bookings);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

