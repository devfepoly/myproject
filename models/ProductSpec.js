import mongoose from "mongoose";

const productSpecSchema = new mongoose.Schema(
    {
        product_id: { type: mongoose.Schema.Types.ObjectId, ref: "Product", required: true },
        key: { type: String, required: true, trim: true },
        value: { type: String, required: true, trim: true },
    },
    { timestamps: true }
);

const ProductSpec = mongoose.model("ProductSpec", productSpecSchema);
export default ProductSpec;
