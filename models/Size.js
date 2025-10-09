import mongoose from "mongoose";

const sizeSchema = new mongoose.Schema(
    {
        name: { type: String, required: true, trim: true },
        description: { type: String, trim: true },
    },
    { timestamps: true }
);

const Size = mongoose.model("Size", sizeSchema);
export default Size;
