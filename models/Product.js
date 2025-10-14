import mongoose from "mongoose";

const productSchema = new mongoose.Schema(
    {
        brand_id: { type: mongoose.Schema.Types.ObjectId, ref: "Brand", required: true },
        name: { type: String, required: true, trim: true },
        description: { type: String, required: true, trim: true },
        price: { type: Number, required: true },
        discount_percent: { type: Number, default: 0 },
        img_url: { type: String, trim: true },
        category_id: { type: mongoose.Schema.Types.ObjectId, ref: "Category", required: true },
        is_active: { type: Boolean, default: true },
        view_count: { type: Number, default: 0 }
    },
    { timestamps: true }
);

const Product = mongoose.model("Product", productSchema);
export default Product;
