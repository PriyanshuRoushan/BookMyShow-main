import mongoose from "mongoose";

const seatSchema = new mongoose.Schema ({
    seatID: {
        type: String,
        required: true,
        unique: true
    },
    screenID: {
        type: mongoose.Schema.Types.ObjectID,
        ref: "screens",
        required: true
    },
    seatNumber: {
        type: String,
        required: true
    },
    row: {
        type: String,
        required: true
    },
    type: {
        type: String,
        enum: ["Recliner", "Basic", "premium"],
        required: true
    },
    basePrice: {
        type: Number,
        required: true,
        min: 0
    }
},
{timestamps: true}
);

seatSchema.index(
    { screenID: 1, seatnumber: 1},
    { uniqueID: true}
)

export default mongoose.model("seats", seatSchema)