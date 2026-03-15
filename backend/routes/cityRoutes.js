import express from "express";
import City from "../models/city.js";

const router = express.Router();

/**
 * @route   GET /api/cities
 * @desc    Get all active cities
 */
router.get("/", async (req, res) => {
  try {
    const cities = await City.find({ isActive: true }).sort({ name: 1 });
    res.status(200).json(cities);
  } catch (error) {
    res.status(500).json({
      message: "Error fetching cities",
      error: error.message
    });
  }
});

export default router;
