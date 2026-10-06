import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams, useLocation, useNavigate } from "react-router-dom";
import ModeEditOutlineIcon from "@mui/icons-material/ModeEditOutline";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";

import "../styles/pages/BookingPage.css";
import BookingPopup from "../components/bookingPopup";
import SeatDesign from "../components/SeatDesign";
import { getShowSeats, holdSeats } from "../services/bookingAPI";

const SeatLayout = () => {
  const [seatCount, setSeatCount] = useState(null);
  const [openPopup, setOpenPopup] = useState(true);
  const [screen, setScreen] = useState(null);

  const [selectedSeats, setSelectedSeats] = useState([]); // ✅ FIXED
  const [showSeats, setShowSeats] = useState([]);
  const [reserving, setReserving] = useState(false);
  const [bookingError, setBookingError] = useState("");

  const { screenId } = useParams();
  const location = useLocation();
  const navigate = useNavigate();

  const movie = location.state?.movie;
  const theatre = location.state?.theatre;
  const show = location.state?.show;

  /* ---------------- FETCH SCREEN ---------------- */
  useEffect(() => {
    const fetchScreen = async () => {
      try {
        const res = await axios.get(
          `${process.env.REACT_APP_BASE_URL}/screens/${screenId}`
        );
        setScreen(res.data);
      } catch (error) {
        console.error("Error fetching screen:", error);
      }
    };

    fetchScreen();
  }, [screenId]);

  useEffect(() => {
    if (!show?._id) return;
    getShowSeats(show._id).then(setShowSeats).catch(() => setBookingError("Unable to load current seat availability."));
  }, [show?._id]);

  useEffect(() => {
    setSelectedSeats((current) => current.slice(0, seatCount || 0));
  }, [seatCount]);

  /* ---------------- PRICE LOGIC ---------------- */
  const showSeatByCode = new Map(showSeats.map((seat) => [seat.seatCode, seat]));
  const getSeatPrice = (seatCode) => showSeatByCode.get(seatCode)?.price || 0;

  const totalAmount = selectedSeats.reduce(
    (sum, seat) => sum + getSeatPrice(seat),
    0
  );

  const unavailableSeats = showSeats.filter((seat) => seat.status !== "AVAILABLE").map((seat) => seat.seatCode);
  const showSeatIdByCode = new Map(showSeats.map((seat) => [seat.seatCode, seat._id]));

  const reserveSeats = async () => {
    if (!localStorage.getItem("token")) return navigate("/login", { state: { from: location.pathname } });
    if (!show?._id) return setBookingError("Show details are missing. Please return and choose a showtime again.");
    const seatIds = selectedSeats.map((code) => showSeatIdByCode.get(code));
    if (seatIds.some((id) => !id)) return setBookingError("Seat availability has changed. Refresh and choose seats again.");
    setReserving(true);
    setBookingError("");
    try {
      const booking = await holdSeats(show._id, seatIds);
      navigate(`/payment/${booking.id}`, { state: { booking, movie, theatre, show, selectedSeats } });
    } catch (error) {
      setBookingError(error.response?.data?.message || "Could not reserve those seats. Please try again.");
      getShowSeats(show._id).then(setShowSeats).catch(() => {});
    } finally { setReserving(false); }
  };

  /* ---------------- LOADING ---------------- */
  if (!screen) {
    return <p className="seat-loading">Loading Seat Layout...</p>;
  }

  /* ---------------- UI ---------------- */
  return (
    <>
      {/* -------- HEADER -------- */}
      <div className="book-header-main">
        <div className="book-header-top">
          <div className="book-header-left">
            <ArrowBackIosIcon
              className="back-icon"
              onClick={() => navigate(-1)}
            />

            <div className="book-header-text">
              <h2 className="book-movie-title">
                {movie?.title || "Movie Name"}
              </h2>
              <p className="book-movie-place">
                {theatre
                  ? `${theatre.brand}: ${theatre.name}`
                  : "Theater Name"}
              </p>
            </div>
          </div>

          <div className="book-header-right">
            <button
              className="book-header-ticektcount"
              onClick={() => setOpenPopup(true)}
            >
              <ModeEditOutlineIcon style={{ fontSize: "18px" }} />
              {seatCount ? `${seatCount} Tickets` : "Tickets"}
            </button>

            {openPopup && (
              <BookingPopup
                onClose={() => setOpenPopup(false)}
                setSeatCount={setSeatCount}
              />
            )}
          </div>
        </div>

        <div className="book-header-bottom">
          <div className="book-header-time">
            <button className="book-header-time-btn">
              <div className="book-btn-time">
                {show?.startTime || "7:00 PM"}
              </div>
              <div className="book-btn-data">2K laser Dolby Atmos</div>
            </button>
          </div>
        </div>
      </div>

      {/* -------- SEAT LAYOUT -------- */}
      <div className="book-main-body">
        <div className="seat-layout-wrapper">
          <SeatDesign
            seatLayout={screen.seatLayout}
            aisleIndexes={screen.aisleIndexes}
            maxSelectable={seatCount || 0} // ✅ SAFE
            selectedSeats={selectedSeats}
            setSelectedSeats={setSelectedSeats}
            unavailableSeats={unavailableSeats}
          />
        </div>
      </div>

      {/* -------- PAYMENT -------- */}
      <div className="book-main-payment-section">
        <div className="book-main-payment-top">
          <div className="bmptop-one">BestSeller</div>
          <div className="bmptop-two">Available</div>
          <div className="bmptop-three">Selected</div>
          <div className="bmptop-three">Sold</div>
        </div>

        <div className="book-main-payemnt-bottom">
          {bookingError && <p className="seat-loading">{bookingError}</p>}
          <button disabled={selectedSeats.length === 0 || reserving} onClick={reserveSeats}>
            {reserving ? "Reserving seats..." : `Continue ₹ ${selectedSeats.length > 0 ? totalAmount : "NA"}`}
          </button>
        </div>
      </div>
    </>
  );
};

export default SeatLayout;
