import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import ModeEditOutlineIcon from "@mui/icons-material/ModeEditOutline";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";

import "../styles/pages/BookingPage.css";
import BookingPopup from "../components/bookingPopup";
import SeatDesign from "../components/SeatDesign";

const SeatLayout = () => {
  const [seatCount, setSeatCount] = useState(null);
  const [openPopup, setOpenPopup] = useState(true);
  const [screen, setScreen] = useState(null);

  const { screenId } = useParams();

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

  if (!screen) {
    return <p>Loading Seat Layout....</p>;
  }

  return (
    <>
      <div className="book-header-main">
        <div className="book-header-top">
          <div className="book-header-left">
            <ArrowBackIosIcon className="back-icon" />

            <div className="book-header-text">
              <h2 className="book-movie-title">Movie Name</h2>
              <p className="book-movie-place">Theater Name and Place</p>
            </div>
          </div>

          <div className="book-header-right">
            <button
              className="book-header-ticektcount"
              onClick={() => setOpenPopup(true)}
            >
              <ModeEditOutlineIcon style={{ fontSize: "18px" }} />
              {seatCount ? ` ${seatCount} Tickets` : " Tickets"}
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
              <div className="book-btn-time">7:00 PM</div>
              <div className="book-btn-data">
                2K laser Dolby Atmos
              </div>
            </button>
          </div>
        </div>
      </div>

      {/* ✅ PASS LIMIT TO SeatDesign */}
      <div className="book-main-body">
        <SeatDesign
          seatLayout={screen.seatLayout}
          aisleIndexes={screen.aisleIndexes}
          maxSelectable={seatCount}
        />
      </div>
    </>
  );
};

export default SeatLayout;
