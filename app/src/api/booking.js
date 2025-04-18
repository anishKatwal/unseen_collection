// src/api/bookings.js
import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:5000/api/table-orders", // update if needed
});

export const createBooking = (data) => API.post("/", data);
