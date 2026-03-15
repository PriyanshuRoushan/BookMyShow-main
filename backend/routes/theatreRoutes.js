import express from "express";
import Theatre from "../models/theatre.js";

const router = express.Router();

/**
 * @route   GET /api/theatres/city/:cityId
 * @desc    Get theatres for a city
 */
router.get("/city/:cityId", async (req, res) => {
  try {
    const theatres = await Theatre.find({
      city: req.params.cityId,
      isActive: true
    });

    res.status(200).json(theatres);
  } catch (error) {
    res.status(500).json({
      message: "Error fetching theatres",
      error: error.message
    });
  }
});

export default router;
