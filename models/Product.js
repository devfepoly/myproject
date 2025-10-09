import mongoose from "mongoose";

const productSchema = new mongoose.Schema(
    {
        brand_id: { type: mongoose.Schema.Types.ObjectId, ref: "Brand", required: true },
        category_id: { type: mongoose.Schema.Types.ObjectId, ref: "Category", required: true },
        name: { type: String, required: true, trim: true },
        price: { type: Number, required: true },
        img_url: { type: String, trim: true },
        sale: { type: Number, default: 0 },
        is_active: { type: Boolean, default: true },
    },
    { timestamps: true }
);

const Product = mongoose.model("Product", productSchema);
export default Product;
