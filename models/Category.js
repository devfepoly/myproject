import mongoose from "mongoose";

const categorySchema = new mongoose.Schema(
    {
        name: { type: String, required: true, trim: true },
        description: { type: String, trim: true },
        parent_id: { type: mongoose.Schema.Types.ObjectId, ref: "Category", default: null },
        position: { type: Number, default: 0 },
    },
    { timestamps: true }
);

const Category = mongoose.model("Category", categorySchema);
export default Category;
