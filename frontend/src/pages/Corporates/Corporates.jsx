import React, { useState } from "react";
import "../../styles/pages/Corporates.css";
import PhoneInput from "../../components/PhoneInput";

import SlowMotionVideoIcon from "@mui/icons-material/SlowMotionVideo";
import DownloadIcon from "@mui/icons-material/Download";

const Corporates = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    company: "",
    phone: ""
  });

  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
    console.log("Form Data Ready for DB:", formData);
  };

  const handleDownload = () => {
    const link = document.createElement("a");
    link.href = "/brochure.pdf";
    link.download = "Corporate_Brochure.pdf";
    link.click();
  };

  return (
    <div className="corporates-hero">
      <div className="corporates-hero-content">
        <h1>Entertainment you can gift.</h1>
        <p>
          A variety of solutions to skyrocket your business with vouchers,
          promotions, loyalty, employee recognition & rewards.
        </p>

        <div className="corporates-hero-content-buttons">
          <button className="corporates-hero-content-button">
            <SlowMotionVideoIcon /> Watch Videos
          </button>

          <button
            className="corporates-hero-content-button"
            onClick={handleDownload}
          >
            <DownloadIcon /> Download Brochure
          </button>
        </div>
      </div>

      {/* FORM */}
      <div className="corporates-hero-form">
        <form onSubmit={handleSubmit}>
          <div className="form-field">
            <input
              type="text"
              name="name"
              placeholder="Full Name"
              value={formData.name}
              onChange={handleChange}
            />
            {submitted && !formData.name && (
              <span className="error-text">Name cannot be empty</span>
            )}
          </div>

          <div className="form-field">
            <input
              type="email"
              name="email"
              placeholder="Company Email"
              value={formData.email}
              onChange={handleChange}
            />
            {submitted && !formData.email && (
              <span className="error-text">Enter a valid email</span>
            )}
          </div>

          <div className="form-field">
            <input
              type="text"
              name="company"
              placeholder="Company Name"
              value={formData.company}
              onChange={handleChange}
            />
            {submitted && !formData.company && (
              <span className="error-text">Company name cannot be empty</span>
            )}
          </div>

          {/* ✅ COUNTRY CODE + POPUP PHONE INPUT */}
          <PhoneInput
            formData={formData}
            setFormData={setFormData}
            submitted={submitted}
          />

          <button type="submit">Receive a callback</button>
        </form>
      </div>
    </div>
  );
};

export default Corporates;
