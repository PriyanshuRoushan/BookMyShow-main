import nodemailer from "nodemailer";

const configured = () => Boolean(process.env.SMTP_HOST && process.env.SMTP_USER && process.env.SMTP_PASS && process.env.SMTP_FROM);

export async function sendTicketEmail({ booking, user, show, seats }) {
  if (!configured()) {
    console.warn(`Ticket email skipped for ${booking.bookingId}: SMTP is not configured.`);
    return false;
  }
  const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: Number(process.env.SMTP_PORT || 587),
    secure: Number(process.env.SMTP_PORT) === 465,
    auth: { user: process.env.SMTP_USER, pass: process.env.SMTP_PASS },
  });
  const seatList = seats.map((seat) => seat.seatCode).join(", ");
  await transporter.sendMail({
    from: process.env.SMTP_FROM,
    to: user.email,
    subject: `Ticket confirmed: ${show.movieName || "Movie"} (${booking.bookingId})`,
    text: [
      `Hello ${user.name},`, "",
      "Your booking is confirmed.",
      `Booking ID: ${booking.bookingId}`,
      `Movie: ${show.movieName || "Movie"}`,
      `Show: ${new Date(show.showDate).toLocaleDateString("en-IN")} at ${show.startTime}`,
      `Seats: ${seatList}`,
      `Amount paid: ₹${booking.totalAmount}`,
    ].join("\n"),
  });
  return true;
}
