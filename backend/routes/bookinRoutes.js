import express from "express";
import { createBooking, getMyBookings, getShowSeats } from "../controllers/bookingController.js";
import { protect } from "../middleware/authMiddleware.js";
import { validateBooking } from "../middleware/bookingMiddleware.js";

const router = express.Router();

router.post(
  "/",
  protect,
  validateBooking, // 👈 YOUR booking middleware
  createBooking
);
router.get("/mine", protect, getMyBookings);
router.get("/shows/:showId/seats", getShowSeats);

export default router;
