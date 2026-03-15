import mongoose from "mongoose";

/* -------- ROW SCHEMA -------- */
const rowSchema = new mongoose.Schema(
  {
    rowLabel: {
      type: String,
      required: true
    },
    seats: {
      type: [Number], // numbers + null
      required: true
    }
  },
  { _id: false }
);

/* -------- SECTION SCHEMA -------- */
const sectionSchema = new mongoose.Schema(
  {
    category: {
      type: String,
      enum: ["NORMAL", "EXECUTIVE", "PREMIUM", "VIP", "RECLINER"],
      required: true
    },
    price: {
      type: Number,
      required: true
    },
    rows: {
      type: [rowSchema],
      required: true
    }
  },
  { _id: false }
);

/* -------- SCREEN SCHEMA -------- */
const screenSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true
    },

    theatreID: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Theatre",
      required: true
    },

    screenType: {
      type: String,
      enum: ["IMAX", "STANDARD"],
      required: true
    },
    aisleIndexes: {
      type: [Number],
      default: []
    },
    seatLayout: {
      type: [sectionSchema],
      required: true
    },

    isActive: {
      type: Boolean,
      default: true
    }
  },
  { timestamps: true }
);

export default mongoose.model("Screen", screenSchema);
