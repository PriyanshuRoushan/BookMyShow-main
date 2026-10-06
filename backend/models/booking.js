import mongoose from "mongoose";

const bookingSchema = new mongoose.Schema({
    bookingId: {
        type: String,
        required: true,
        unique: true,
        default: () => `BMS-${Date.now()}-${Math.random().toString(36).slice(2, 8).toUpperCase()}`,
    },
    userID: {
        type: mongoose.Schema.Types.ObjectID,
        ref: "User",
        required: true
    },
    showID: {
        type: mongoose.Schema.Types.ObjectID,
        ref: "Show",
        required: true
    },
    seats: [
        {
            type: mongoose.Schema.Types.ObjectID,
            ref: "ShowSeat",
            required: true
        }
    ],
    totalAmount: {
        type: Number,
        required: true
    },
    status: {
        type: String,
        enum: ["PENDING", "CONFIRMED", "CANCELLED", "EXPIRED"],
        default: "PENDING"
    },
    paymentStatus: {
        type: String,
        enum: ["PENDING", "PAID", "FAILED", "REFUNDED"],
        default: "PENDING"
    },
    expiresAt: {
        type: Date
    },
    paymentReference: { type: String, default: null },
    emailSentAt: { type: Date, default: null },
},
    {timestamps: true}
);

bookingSchema.index({ userID: 1, createdAt: -1 });

export default mongoose.model("Booking", bookingSchema);
