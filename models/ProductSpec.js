import mongoose from "mongoose";

const productSpecSchema = new mongoose.Schema({
    processor: {
        type: String,
        required: true
    },
    ram: {
        type: Number,
        required: true
    },
    storage: {
        type: String,
        required: true
    },
    gpu: {
        type: String
    },
    screen_size: {
        type: Number
    },
    screen_resolution: {
        type: String
    },
    operating_system: {
        type: String
    },
    weight: {
        type: Number
    },
    warranty_months: {
        type: Number,
        default: 12
    },
    created_at: {
        type: Date,
        default: Date.now
    },
    product_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Product",
        required: true
    }
});

export default mongoose.model("ProductSpec", productSpecSchema);
