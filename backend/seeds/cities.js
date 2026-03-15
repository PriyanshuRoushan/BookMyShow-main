import mongoose from "mongoose";
import dotenv from "dotenv";
import City from "../models/city.js";
import ConnectDB from "../config/db.js";

dotenv.config();
await ConnectDB();

const cities = [
    { name: "Delhi NCR", state: "Delhi", landmarkImage: "/uploads/cityLandmarks/gate-of-india.png"},
    { name: "Mumbai", state: "Maharashtra", landmarkImage: "/uploads/cityLandmarks/mumbai.png" },
    { name: "Bangalore", state: "Karnataka", landmarkImage: ""},
    { name: "Patna", state: "Bihar", landmarkImage: "/uploads/cityLandmarks/stupa.png"},
    { name: "Hyderabad", state: "Telangana" },
    { name: "Chennai", state: "Tamil Nadu", landmarkImage: "/uploads/cityLandmarks/sri-ranganathasvamy.png"},
    { name: "Lucknow", state: "Uttar Pradesh", landmarkImage: "/uploads/cityLandmarks/taj-mahal.png" },
    { name: "Kolkata", state: "West Bengal" },
    { name: "Jaipur", state: "Rajasthan" },
    { name: "Pune", state: "Maharashtra" }
];

const seedCities = async () => {
  try {
    for (const city of cities) {
      await City.updateOne(
        { name: city.name },     // find by unique field
        { $set: city },          // update data
        { upsert: true }         // create if not exists
      );
    }

    console.log("Cities updated successfully ✅");
    process.exit();
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
};

seedCities();