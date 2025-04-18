// src/components/BookingForm.js
import React, { useState } from "react";
import { createBooking } from "../api/bookings";
import AIFeedback from "./AIFeedback";

const BookingForm = () => {
  const [formData, setFormData] = useState({
    tableNumber: "",
    customerName: "",
    partySize: 1,
    dateTime: "",
    items: [],
    status: "confirmed"
  });

  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await createBooking({
        ...formData,
        items: [
          { itemName: "Table Booking", quantity: 1, price: 0 },
        ]
      });
      setMessage("✅ Booking successful!");
    } catch (error) {
      setMessage("❌ Booking failed. Please try again.");
    }
  };

  return (
    <div style={{ maxWidth: "400px", margin: "auto" }}>
      <h2>Reserve a Table</h2>
      <form onSubmit={handleSubmit}>
        <label>Customer Name:</label>
        <input
          type="text"
          name="customerName"
          value={formData.customerName}
          onChange={handleChange}
          required
        />
        <label>Table Number:</label>
        <input
          type="number"
          name="tableNumber"
          value={formData.tableNumber}
          onChange={handleChange}
          required
        />
        <label>Party Size:</label>
        <input
          type="number"
          name="partySize"
          value={formData.partySize}
          onChange={handleChange}
          required
        />
        <label>Booking Time:</label>
        <input
          type="datetime-local"
          name="dateTime"
          value={formData.dateTime}
          onChange={handleChange}
          required
        />
        <AIFeedback
          tableNumber={formData.tableNumber}
          partySize={formData.partySize}
          dateTime={formData.dateTime}
        />
        <button type="submit" style={{ marginTop: "10px" }}>
          Book Table
        </button>
      </form>
      {message && <p>{message}</p>}
    </div>
  );
};

export default BookingForm;
