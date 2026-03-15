import express from "express";
import Screen from "../models/screen.js";

const router = express.Router();

/**
 * GET screens by theatre
 */
router.get("/theatre/:theatreId", async (req, res) => {
  try {
    const screens = await Screen.find({
      theatreID: req.params.theatreId,
      isActive: true,
    });

    res.status(200).json(screens);
  } catch (error) {
    res.status(500).json({
      message: "Error fetching screens",
      error: error.message,
    });
  }
});

/**
 * GET screen by screenId (FOR SEAT LAYOUT)
 */
router.get("/:screenId", async (req, res) => {
  try {
    const screen = await Screen.findById(req.params.screenId);

    if (!screen) {
      return res.status(404).json({ message: "Screen not found" });
    }

    res.status(200).json(screen);
  } catch (error) {
    res.status(500).json({
      message: "Error fetching screen",
      error: error.message,
    });
  }
});


export default router;
