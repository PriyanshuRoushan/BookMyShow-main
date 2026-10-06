import dotenv from "dotenv";
import mongoose from "mongoose";
import Show from "../models/show.js";
import ShowSeat from "../models/showSeats.js";
import { ensureShowSeatInventory } from "../services/showSeatInventoryService.js";

dotenv.config({ quiet: true });

if (!process.env.MONGO_URI) throw new Error("MONGO_URI is not configured");

await mongoose.connect(process.env.MONGO_URI);
try {
  const shows = await Show.find({ status: "ACTIVE" });
  let created = 0;

  for (const show of shows) {
    const before = await ShowSeat.countDocuments({ showID: show._id });
    await ensureShowSeatInventory(show);
    const after = await ShowSeat.countDocuments({ showID: show._id });
    created += after - before;
  }

  console.log(`Processed ${shows.length} active shows; created ${created} show-specific seats.`);
} finally {
  await mongoose.disconnect();
}
