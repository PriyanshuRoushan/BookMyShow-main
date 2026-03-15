import mongoose from "mongoose";

const citySchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: true
    },
    state: {
        type: String,
        required: true
    },
    landmarkImage: {
        type: String,
    },
    isActive: {
        type: Boolean,
        default: true
    }     
});

export default mongoose.model("City", citySchema);
