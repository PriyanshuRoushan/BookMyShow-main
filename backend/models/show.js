import mongoose from "mongoose";

const showSchema = new mongoose.Schema({
    showID: {
        type: String,
        unique: true,
        required: true
    },
    movieId: {
        type: String,
        required: true,
        trim: true
    },
    movieName: {
        type: String,
        trim: true
    },
    theatreID: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Theatre",
        required: true
    },
    screenID: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Screen",
        required: true
    },
    showDate: {
      type: Date,
      required: true,
    },
    startTime: {
      type: String, // "18:30"
      required: true,
    },
    endTime: {
      type: String, // "21:15"
      required: true,
    },
    basePrice: {
      type: Number,
      required: true,
    },
    status: {
      type: String,
      enum: ["ACTIVE", "CANCELLED"],
      default: "ACTIVE",
    },
  },
  {
    timestamps: true,
  }
);

const Show = mongoose.model("Show", showSchema);

export default Show;