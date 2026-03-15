import express from "express";
import { createBooking } from "../controllers/bookingController.js";
import { protect } from "../middleware/authMiddleware.js";
import { validateBooking } from "../middleware/bookingMiddleware.js";

const router = express.Router();

router.post(
  "/",
  protect,
  validateBooking, // 👈 YOUR booking middleware
  createBooking
);

export default router;
