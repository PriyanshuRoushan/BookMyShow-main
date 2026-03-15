import { useState } from "react";
import countries from "../assets/Countries";
import "../styles/components/PhoneInput.css";

const PhoneInput = ({ formData, setFormData, submitted }) => {
  const [open, setOpen] = useState(false);
  const [search, setSearch] = useState("");
  const [selected, setSelected] = useState(countries[0]);

  const filteredCountries = countries.filter((c) =>
    c.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="form-field">
      {/* Combined input */}
      <div className="phone-input-wrapper">
        <button
          type="button"
          className="country-inline-btn"
          onClick={() => setOpen(true)}
        >
          {selected.flag} {selected.code}
        </button>

        <input
          type="number"
          name="phone"
          placeholder="Company Phone Number"
          value={formData.phone}
          onChange={(e) =>
            setFormData({ ...formData, phone: e.target.value })
          }
        />
      </div>

      {submitted && !formData.phone && (
        <span className="error-text">Enter a valid mobile number</span>
      )}

      {/* Popup */}
      {open && (
        <div className="country-modal" onClick={() => setOpen(false)}>
          <div
            className="country-modal-content"
            onClick={(e) => e.stopPropagation()}
          >
            <input
              type="text"
              placeholder="Search country"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="search-country"
            />

            <ul className="country-list">
              {filteredCountries.map((country) => (
                <li
                  key={country.name}
                  onClick={() => {
                    setSelected(country);
                    setOpen(false);
                    setSearch("");
                  }}
                >
                  <span>{country.flag}</span>
                  <span>{country.name}</span>
                  <span>{country.code}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      )}
    </div>
  );
};

export default PhoneInput;
