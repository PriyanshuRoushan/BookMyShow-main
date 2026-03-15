import mongoose from "mongoose";

const theatreSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true
    },

    city: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "City",
      required: true
    },

    type: {
      type: String,
      enum: ["SINGLE_SCREEN", "MULTIPLEX"],
      required: true
    },
    brand: {
      type: String,
      enum: ["PVR", "INOX", "CINEPOLIS", "SPI", "LOCAL"],
      default: "LOCAL"
    },
    location: {
      address: {
        type: String,
        required: true
      },
      latitude: Number,
      longitude: Number
    },
    amenities: {
      type: [String],
      default: []
    },
    isActive: {
      type: Boolean,
      default: true
    }
  },
  {
    timestamps: false 
  }
);

export default mongoose.model("Theatre", theatreSchema);
