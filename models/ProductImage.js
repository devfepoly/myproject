import mongoose from "mongoose";

const productImageSchema = new mongoose.Schema({
    product_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Product",
        required: true
    },
    img_url: {
        type: String,
        required: true
    },
    is_primary: {
        type: Boolean,
        default: false
    }
}, {
    timestamps: true
});

export default mongoose.model("ProductImage", productImageSchema);
