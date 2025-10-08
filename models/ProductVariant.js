import mongoose from "mongoose";

const productVariantSchema = new mongoose.Schema(
    {
        product_id: { type: mongoose.Schema.Types.ObjectId, ref: "Product", required: true },
        size_id: { type: mongoose.Schema.Types.ObjectId, ref: "Size", required: true },
        color_id: { type: mongoose.Schema.Types.ObjectId, ref: "Color", required: true },
        quantity: { type: Number, required: true, min: 0 },
        is_active: { type: Boolean, default: true },
    },
    { timestamps: true }
);

const ProductVariant = mongoose.model("ProductVariant", productVariantSchema);
export default ProductVariant;
