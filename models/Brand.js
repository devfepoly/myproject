import mongoose from "mongoose";

const brandSchema = new mongoose.Schema(
    {
        name: { type: String, required: true, trim: true },
        description: { type: String, trim: true },
        is_active: { type: Boolean, default: true }
    },
    { timestamps: true }
);

const Brand = mongoose.model("Brand", brandSchema);
export default Brand;
