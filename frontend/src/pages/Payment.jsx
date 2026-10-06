import { useLocation, useNavigate } from "react-router-dom";

const Payment = () => {
  const { state } = useLocation();
  const navigate = useNavigate();
  const booking = state?.booking;

  if (!booking) return <main className="seat-loading"><p>This booking session is no longer available.</p><button onClick={() => navigate("/movies")}>Choose a show</button></main>;

  return (
    <main className="seat-loading">
      <h1>Your seats are reserved</h1>
      <p>Booking {booking.bookingId} is held until {new Date(booking.expiresAt).toLocaleTimeString()}.</p>
      <p>Payment is not enabled yet. A payment provider must verify the payment before this reservation can become a ticket.</p>
    </main>
  );
};

export default Payment;
