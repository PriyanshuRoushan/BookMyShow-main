import mongoose from "mongoose";

const bookingSchema = new mongoose.Schema({
    bookingId: {
        type: String,
        required: true,
        unique: true,
    },
    userID: {
        type: mongoose.Schema.Types.ObjectID,
        ref: "users",
        required: true
    },
    showID: {
        type: mongoose.Schema.Types.ObjectID,
        ref: "shows",
        require: true
    },
    seats: [
        {
            type: mongoose.Schema.Types.ObjectID,
            ref: "seats",
            required: true
        }
    ],
    totalAmount: {
        type: Number,
        required: true
    },
    status: {
        type: String,
        enum: ["Pending", "Success", "Failed"],
        required: true
    },
    paymentStatus: {
        type: String,
        enum: ["Pending", "Success", "Failed"],
        required: true
    },
    expiresAt: {
        type: Date
    },
},
    {timestamps: true}
);

export default mongoose.model("Booking", bookingSchema);