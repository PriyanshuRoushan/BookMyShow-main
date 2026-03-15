import mongoose, { trusted } from "mongoose";

const showSeatSchema = new mongoose.Schema ({
    screenSeats: {
        type: String,
        required: true,
        unique: true
    },
    showID: {
        type: mongoose.Schema.Types.ObjectID,
        ref: "shows",
        require: true,
    },
    seatID: {
        type: mongoose.Schema.Type.ObjectID,
        ref: "seats",
        required: true,
        unique: true
    },
    screenID: {
        type: mongoose.Schema.Type.ObjectID,
        ref: "screen",
        required: true
    },
    status: {
        type: String,
        enum: ["Booked", "Available", "Locked"],
        default: "Available"
    },
    price: {
        type: Number,
        required: true,
        min: 0
    },
    bookingID: {
        type: mongoose.Schema.Types.ObjectID,
        ref: "booking",
        required: true
    },
    lockedAt: {
        type: Date,
        default: null
    }
},
{timestamps: true}
);

showSeatSchema.index(
    {showID: 1, seatID: 1},
    {unique: true}
);

showSeatSchema.index(
    {showID: 1, status: 1}
);

export default mongoose.model("screenSeats", showSeatSchema);