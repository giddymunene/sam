// src/pages/Booking.jsx
import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import emailjs from "emailjs-com";
import "./Booking.css";

const Booking = () => {
  const { state } = useLocation();
  const navigate = useNavigate();
  const car = state?.car;
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    const formData = new FormData(e.target);
    const data = Object.fromEntries(formData.entries());

    const { startDate, endDate } = data;

    // ✅ Date Validation
    if (new Date(startDate) < new Date()) {
      return setError("Start date cannot be in the past.");
    }
    if (new Date(endDate) <= new Date(startDate)) {
      return setError("End date must be after start date.");
    }

    // ✅ Send Email with EmailJS
    emailjs.send(
      "service_5lw96mm",    // ✅ your EmailJS service ID
      "template_getgj87",   // ✅ your EmailJS template ID
      
      {
        name: data.name,
        email: data.email,
        phone: data.phone,
        startDate,
        endDate,
        car: `${car.make} ${car.model}`,
      },
      "FWAd3Z-6YUT3c-NhW"
    );

    // ✅ Send SMS via Backend
    await fetch("http://localhost:5000/api/sms", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ data, car }),
    });

    alert("Booking Confirmed! Email & SMS Sent.");
    navigate("/cars");
  };

  return (
    <div className="page-container">
      <h2>Book {car.make} {car.model}</h2>

      {error && <p style={{ color: "red" }}>{error}</p>}

      <form onSubmit={handleSubmit}>
        <input name="name" placeholder="Your Name" required />
        <input name="email" type="email" placeholder="Email Address" required />
        <input name="phone" placeholder="Phone Number" required />

        <label>Start Date:</label>
        <input name="startDate" type="date" required />

        <label>End Date:</label>
        <input name="endDate" type="date" required />

        <button className="btn-primary" type="submit">Confirm Booking</button>
      </form>
    </div>
  );
};

export default Booking;
