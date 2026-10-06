import Show from "../models/show.js";

// @route GET /api/shows
// @desc Get shows for a movie in a specific city on a specific date
export const getShows = async (req, res) => {
  try {
    const { cityId, movieId, date } = req.query;
    
    // We should populate the theatre and screen
    const query = { status: "ACTIVE" };
    if (movieId) query.movieId = String(movieId);
    if (date) {
      const start = new Date(`${date}T00:00:00.000Z`);
      if (Number.isNaN(start.getTime())) return res.status(400).json({ message: "Invalid date" });
      const end = new Date(start);
      end.setUTCDate(end.getUTCDate() + 1);
      query.showDate = { $gte: start, $lt: end };
    }

    // Filter where either cityId matches on populated Theatre, or fetch conventionally
    const shows = await Show.find(query)
      .populate({
        path: "theatreID",
        match: cityId ? { city: cityId } : {}
      })
      .populate("screenID");

    const validShows = shows.filter(show => show.theatreID !== null);

    res.status(200).json(validShows);
  } catch (error) {
    res.status(500).json({ message: "Server Error fetching shows", error: error.message });
  }
};
