import { useState } from "react";
import "../admin/SeatListing.css";

const SeatListing = () => {
  const [screenName, setScreenName] = useState("");
  const [screenType, setScreenType] = useState("STANDARD");
  const [theatreId, setTheatreId] = useState("");

  const [sections, setSections] = useState([
    {
      category: "PREMIUM",
      price: 280,
      rows: [{ rowLabel: "A", seatCount: 10 }]
    }
  ]);

  const addSection = () => {
    setSections([
      ...sections,
      { category: "", price: 0, rows: [{ rowLabel: "", seatCount: 0 }] }
    ]);
  };

  const addRow = (sectionIndex) => {
    const updated = [...sections];
    updated[sectionIndex].rows.push({ rowLabel: "", seatCount: 0 });
    setSections(updated);
  };

  const handleSubmit = () => {
    const seatLayout = sections.map(section => ({
      category: section.category,
      price: section.price,
      rows: section.rows.map(row => ({
        rowLabel: row.rowLabel,
        seats: Array.from({ length: row.seatCount }, (_, i) => i + 1)
      }))
    }));

    const payload = {
      name: screenName,
      theatreId,
      screenType,
      seatLayout
    };

    console.log("Screen Payload:", payload);
    // later → POST to backend
  };

  return (
    <div className="seat-listing-container">
      <div className="seat-listing-form">

        <h2>Create Screen</h2>

        {/* Screen Info */}
        <input
          type="text"
          placeholder="Screen Name (Audi 1)"
          value={screenName}
          onChange={(e) => setScreenName(e.target.value)}
        />

        <input
          type="text"
          placeholder="Theatre ID"
          value={theatreId}
          onChange={(e) => setTheatreId(e.target.value)}
        />

        <select
          value={screenType}
          onChange={(e) => setScreenType(e.target.value)}
        >
          <option value="STANDARD">Standard</option>
          <option value="IMAX">IMAX</option>
          <option value="4DX">4DX</option>
        </select>

        <hr />

        {/* Seat Sections */}
        {sections.map((section, sIndex) => (
          <div className="section-box" key={sIndex}>

            <h4>Seat Section</h4>

            <input
              type="text"
              placeholder="Category (PREMIUM / VIP)"
              value={section.category}
              onChange={(e) => {
                const updated = [...sections];
                updated[sIndex].category = e.target.value;
                setSections(updated);
              }}
            />

            <input
              type="number"
              placeholder="Price"
              value={section.price}
              onChange={(e) => {
                const updated = [...sections];
                updated[sIndex].price = Number(e.target.value);
                setSections(updated);
              }}
            />

            <h5>Rows</h5>

            {section.rows.map((row, rIndex) => (
              <div className="row-input" key={rIndex}>
                <input
                  type="text"
                  placeholder="Row Label (A, B)"
                  value={row.rowLabel}
                  onChange={(e) => {
                    const updated = [...sections];
                    updated[sIndex].rows[rIndex].rowLabel = e.target.value;
                    setSections(updated);
                  }}
                />

                <input
                  type="number"
                  placeholder="Seats"
                  value={row.seatCount}
                  onChange={(e) => {
                    const updated = [...sections];
                    updated[sIndex].rows[rIndex].seatCount = Number(e.target.value);
                    setSections(updated);
                  }}
                />
              </div>
            ))}

            <div className="center-btn">
              <button type="button" onClick={() => addRow(sIndex)}>
                Add Row
              </button>
            </div>

          </div>
        ))}

        <div className="center-btn">
          <button type="button" onClick={addSection}>
            Add Section
          </button>
        </div>

        <div className="center-btn">
          <button type="button" onClick={handleSubmit}>
            Save Screen
          </button>
        </div>

      </div>
    </div>
  );
};

export default SeatListing;
