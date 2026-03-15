import dotenv from "dotenv";
import mongoose from "mongoose";
import ConnectDB from "../config/db.js";
import Theatre from "../models/theatre.js";
import Screen from "../models/screen.js";

dotenv.config();
await ConnectDB();

/* -------- SEED DATA -------- */
const screenListSeedData = [

    // ================== AUDI 1 ===================

  {
    name: "Audi 1",
    theatreName: "PVR Orion Mall",
    screenType: "IMAX",
    isActive: true,

    aisleIndexes: [5, 11, 16],

    seatLayout: [
      {
        category: "NORMAL",
        price: 240,
        rows: [
          {
            rowLabel: "A",
            seats: [1,2,3,4,5,6,7,8,9,10,null,null,11,12,13,14,15,null,null,null]
          }
        ]
      },
      {
        category: "EXECUTIVE",
        price: 260,
        rows: [
          { rowLabel: "B", seats: [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,null,null,null] },
          { rowLabel: "C", seats: [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,null,null,null] },
          { rowLabel: "D", seats: [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,null,null,null] }
        ]
      },
      {
        category: "PREMIUM",
        price: 280,
        rows: [
          { rowLabel: "E", seats: [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,null,null,null] },
          { rowLabel: "F", seats: [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20] },
          { rowLabel: "G", seats: [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20] },
          { rowLabel: "H", seats: [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20] },
          { rowLabel: "I", seats: [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20] },
          { rowLabel: "J", seats: [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20] },
          { rowLabel: "K", seats: [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20] }
        ]
      },
      {
        category: "VIP",
        price: 480,
        rows: [
          {
            rowLabel: "L",
            seats: [null,1,2,null,3,4,5,6,null,7,8,null,9,10,null,11,12,13,14,null]
          }
        ]
      }
    ]
  },
  // ================== AUDI 2 ===================
  {
    name: "Audi2",
    theatreName: "PVR Orion Mall",
    screenType: "IMAX",
    isActive: true,

    aisleIndexes: [13],

    seatLayout: [
    {
      catagory: "NORMAL",
      price: 240,
      rows: [
       {
        rowLabel: "A",   seats: [1,2,3,4,5,6,7,8,9,10,11,12,13,14]
        },
        {
        rowLabel: "B",   seats: [1,2,3,4,5,6,7,8,9,10,11,12,13,14]
        },
        {
        rowLabel: "C",   seats: [1,2,3,4,5,6,7,8,9,10,11,12,13,14]
        },
        {
        rowLabel: "D",   seats: [1,2,3,4,5,6,7,8,9,10,11,12,13,14]
        },
      ]
    },
    {
      catagory: "EXECUTIVE",
      price: 280,
      rows: [
        {
          rowLabel: "E",    seats: [1,2,3,4,5,6,7,8,9,10,11,12,null,null,13,14,15]
        },
        {
          rowLabel: "F",    seats: [1,2,3,4,5,6,7,8,9,10,11,12,null,null,13,14,15]
        },
        {
          rowLabel: "F",    seats: [1,2,3,4,5,6,7,8,9,10,11,12,null,null,13,14,15]
        }        
        
      ]
    },
    {
      catagory: "PREMIUM",
      price: 320,
      rows: [
        {
          rowLabel: "G",    seats: [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18]
        },
        {
          rowLabel: "H",    seats: [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18]
        },
        {
          rowLabel: "I",    seats: [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18]
        },
        {
          rowLabel: "J",    seats: [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18]
        },
        {
          rowLabel: "K",    seats: [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18]
        }
      ]
    },
    {
      catagory: "RECLINER",
      price: 500,
      rows: [
       { 
        
        rowLabel: "L",   seats: [1,2,3,4,5,6,7,8,9,null,null,null,null,null,null,10,11,12,13]
       }

      ]
    }
  ]
  }
];

const screenListSeed = async () => {
  try {
    const theatres = await Theatre.find({ isActive: true });
    if (!theatres.length) throw new Error("No active theatres found");

    const theatreMap = {};
    theatres.forEach(t => {
      theatreMap[t.name] = t._id;
    });

    for (const screen of screenListSeedData) {
      const theatreID = theatreMap[screen.theatreName];
      if (!theatreID) {
        throw new Error(`Theatre not found: ${screen.theatreName}`);
      }

      await Screen.findOneAndUpdate(
        {
          name: screen.name,
          theatreID: theatreID   // 🔑 UNIQUE KEY
        },
        {
          $set: {
            screenType: screen.screenType,
            aisleIndexes: screen.aisleIndexes,
            seatLayout: screen.seatLayout,
            isActive: screen.isActive
          }
        },
        {
          upsert: true,   // ✅ insert if not exists
          new: true       // return updated doc
        }
      );
    }

    console.log("✅ Screen list seeded (upserted) successfully");
    process.exit(0);

  } catch (error) {
    console.error("❌ Error seeding screen list:", error.message);
    process.exit(1);
  }
};
screenListSeed();