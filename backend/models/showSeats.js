import mongoose from "mongoose";

const showSeatSchema = new mongoose.Schema ({
    seatCode: {
        type: String,
        required: true,
        trim: true
    },
    showID: {
        type: mongoose.Schema.Types.ObjectID,
        ref: "shows",
        required: true,
    },
    // Snapshot fields make inventory searchable by movie and theatre while the
    // show remains the source of truth for its scheduled time and status.
    theatreID: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Theatre",
        required: true,
    },
    movieId: {
        type: String,
        required: true,
        trim: true,
    },
    seatID: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "seats",
        required: false
    },
    row: {
        type: String,
        required: true,
    },
    seatNumber: {
        type: String,
        required: true,
    },
    category: {
        type: String,
        enum: ["NORMAL", "EXECUTIVE", "PREMIUM", "VIP", "RECLINER"],
        required: true,
    },
    screenID: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Screen",
        required: true
    },
    status: {
        type: String,
        enum: ["BOOKED", "AVAILABLE", "HELD"],
        default: "AVAILABLE"
    },
    price: {
        type: Number,
        required: true,
        min: 0
    },
    bookingID: {
        type: mongoose.Schema.Types.ObjectID,
        ref: "Booking",
        default: null
    },
    lockedAt: {
        type: Date,
        default: null
    }
},
{timestamps: true}
);

showSeatSchema.index(
    {showID: 1, seatCode: 1},
    {unique: true}
);

showSeatSchema.index(
    {showID: 1, status: 1}
);

showSeatSchema.index({ theatreID: 1, movieId: 1, showID: 1 });

export default mongoose.model("ShowSeat", showSeatSchema);
