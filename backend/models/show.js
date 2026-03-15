import mongoose from "mongoose";

const showSchema = new mongoose.Schema({
    showID: {
        type: String,
        unique: true,
        required: true
    },
    movieName: {
        Type: String,
        requied: true,
        trim: true
    },
    theaterID: {
        type: mongoose.Schema.Type.ObjectID,
        ref: "theatre",
        reuired: true
    },
    ScreenID: {
        type: mongoose.Schema.Type.ObjectID,
        ref: "screen",
        requied: true
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