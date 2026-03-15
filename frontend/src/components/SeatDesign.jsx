import React, { useState, useEffect } from "react";
import "../styles/components/seatDesign.css";

const SeatDesign = ({
  seatLayout,
  aisleIndexes = [],
  maxSelectable
}) => {
  const [selectedSeats, setSelectedSeats] = useState([]);

  // 🔁 Reset selected seats when ticket count changes
  useEffect(() => {
    setSelectedSeats([]);
  }, [maxSelectable]);

  const toggleSeat = (rowLabel, seatNo) => {
    // ❌ Block selection if ticket count is invalid
    if (typeof maxSelectable !== "number" || maxSelectable <= 0) {
      return;
    }

    const seatId = `${rowLabel}${seatNo}`;

    setSelectedSeats((prev) => {
      // ✅ Unselect always allowed
      if (prev.includes(seatId)) {
        return prev.filter((s) => s !== seatId);
      }

      // ❌ Block if max seats reached
      if (prev.length >= maxSelectable) {
        return prev;
      }

      // ✅ Select seat
      return [...prev, seatId];
    });
  };

  return (
    <div className="seat-wrapper">
      {[...seatLayout].reverse().map((section) => (
        <div key={section.category} className="seat-section">
          {/* PRICE HEADER */}
          <div className="seat-price">
            ₹{section.price} {section.category}
          </div>

          {section.rows.map((row) => (
            <div key={row.rowLabel} className="seat-row">
              {/* ROW LABEL */}
              <div className="row-label">{row.rowLabel}</div>

              {/* SEATS */}
              <div className="seat-row-grid">
                {row.seats.map((seat, index) => {
                  const hasAisle =
                    seat !== null &&
                    aisleIndexes.includes(index);

                  // EMPTY GAP (null seat)
                  if (seat === null) {
                    return (
                      <React.Fragment key={`${row.rowLabel}-${index}`}>
                        <div className="seat-gap" />
                        {hasAisle && <div className="seat-walk-gap" />}
                      </React.Fragment>
                    );
                  }

                  const seatId = `${row.rowLabel}${seat}`;
                  const isSelected = selectedSeats.includes(seatId);
                  const isDisabled =
                    !isSelected &&
                    typeof maxSelectable === "number" &&
                    selectedSeats.length >= maxSelectable;

                  return (
                    <React.Fragment key={`${row.rowLabel}-${index}`}>
                      <div
                        className={`seat-box
                          ${isSelected ? "selected" : ""}
                          ${isDisabled ? "disabled" : ""}
                        `}
                        onClick={() =>
                          !isDisabled &&
                          toggleSeat(row.rowLabel, seat)
                        }
                      >
                        {seat.toString().padStart(2, "0")}
                      </div>

                      {hasAisle && <div className="seat-walk-gap" />}
                    </React.Fragment>
                  );
                })}
              </div>
            </div>
          ))}

          <hr className="section-divider" />
        </div>
      ))}

      {/* SCREEN */}
      <div className="screen-indicator">
        <div className="screen-shape" />
        <p>All eyes this way please</p>
      </div>
    </div>
  );
};

export default SeatDesign;
