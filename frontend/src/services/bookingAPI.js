import axios from "axios";

const API = axios.create({ baseURL: process.env.REACT_APP_BASE_URL || "http://localhost:3001/api" });

const authorized = () => ({ headers: { Authorization: `Bearer ${localStorage.getItem("token")}` } });

export const getShowSeats = async (showId) => (await API.get(`/bookings/shows/${showId}/seats`)).data;
export const holdSeats = async (showId, seatIds) => (await API.post("/bookings", { showId, seatIds }, authorized())).data;
export const getMyBookings = async () => (await API.get("/bookings/mine", authorized())).data;
