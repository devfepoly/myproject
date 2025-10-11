import mongoose from "mongoose";

const categorySchema = new mongoose.Schema(
    {
        name: { type: String, required: true, trim: true },
        description: { type: String, trim: true },
        parent_id: { type: mongoose.Schema.Types.ObjectId, ref: "Category", default: null },
        is_active: { type: Boolean, default: true },
    },
    { timestamps: true }
);

const Category = mongoose.model("Category", categorySchema);
export default Category;
