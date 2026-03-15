import React, { useEffect, useState } from "react";
import "../styles/components/bookingPopup.css";
import axios from "axios";


import OnePerson from '../assets/images/bookingPopup/cycle.png';
import TwoPerson from '../assets/images/bookingPopup/bike.png';
import ThreePerson from '../assets/images/bookingPopup/auto.png'
import FourPerson from '../assets/images/bookingPopup/small-car.png';
import FivePerson from '../assets/images/bookingPopup/mid-car.png'
import SixPerson from '../assets/images/bookingPopup/big-car.png';
import SevenPerson from '../assets/images/bookingPopup/van.png';
import EightPerson from '../assets/images/bookingPopup/van.png';
import NinePerson from '../assets/images/bookingPopup/bus.png'
import TenPerson from '../assets/images/bookingPopup/bus.png'
import { useParams } from "react-router-dom";

const BookingPopup = ({ onClose, setSeatCount }) => {
  const [selectedNum, setSelectedNum] = useState(2);

  useEffect(() => {
    setSeatCount(2);
  }, []);

  const {screenId} =useParams();
  const [screen, setScreen] = useState(null);


useEffect(() => {
    if (screenId) {
      axios.get(`${process.env.REACT_APP_BASE_URL}/screens/${screenId}`).then(res => {
        setScreen(res.data);
      }).catch(error => {
        console.error("Error fetching screen:", error);
      });
    }
  }, [screenId]);


  const handleSelect = (num) => {
    setSelectedNum(num);   // local highlight
    setSeatCount(num);    // send to main screen
  };

  const SeatPersonImage = [OnePerson, TwoPerson, ThreePerson, FourPerson, FivePerson, SixPerson, SevenPerson, EightPerson, NinePerson, TenPerson];



  return (
    <div className="book-popup">
      <div className="book-popup-body">

        <div className="book-popup-header">
          <h2 className="book-popup-header-title">How Many Seats?</h2>
        </div>

        <div className="book-popup-image">
          <img src={selectedNum ? SeatPersonImage[selectedNum -1] : OnePerson} 
          alt="seats"
          className="seat-image"/>
        </div>

        <div className="book-popup-numbers">
          {[1,2,3,4,5,6,7,8,9,10].map((num) => (
            <div
              key={num}
              className={`book-popup-number-select ${
                selectedNum === num ? "active" : ""
              }`}
              onClick={() => handleSelect(num)}
            >
              {num}
            </div>
          ))}
        </div>
            {/* =================== PRICE DETAIL ============= */}
        <div className="book-popup-price-main">
            {screen?.seatLayout?.map((section) => (
              <div
                key={section.category}
                className="book-popup-price-detailed"
              >
                <div className="popup-price-head-top">
                  {section.category}
                </div>
                <div className="popup-price-head-price">
                  ₹{section.price}
                </div>
                <div className="popup-price-head-price-bottom">
                  Available
                </div>
              </div>
            ))}
        </div>

        <div className="book-popup-select">
          <button
            className="book-popup-selectseat"
            disabled={!selectedNum}
            onClick={onClose}
          >
            Select Seats
          </button>
        </div>

      </div>
    </div>
  );
};

export default BookingPopup;
