import Show from "../models/show.js";
import ShowSeat from "../models/showSeat.js";

export const validateBooking = async (req, res, next) => {
  try {
    const { showID, seats } = req.body;

    if (!showID || !seats || seats.length === 0) {
      return res.status(400).json({
        message: "showID and seats are required",
      });
    }

    // 1️⃣ Check show exists
    const show = await Show.findById(showID);
    if (!show || show.status !== "ACTIVE") {
      return res.status(404).json({
        message: "Show not available",
      });
    }

    // 2️⃣ Validate show seats
    const showSeats = await ShowSeat.find({
      _id: { $in: seats },
      showID: showID,
      status: "AVAILABLE",
    });

    if (showSeats.length !== seats.length) {
      return res.status(400).json({
        message: "One or more seats already booked",
      });
    }

    // 3️⃣ Attach validated data
    req.show = show;
    req.showSeats = showSeats;

    next();
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
