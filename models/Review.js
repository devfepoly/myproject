import mongoose from "mongoose";

const reviewSchema = new mongoose.Schema(
    {
        order_detail_id: { type: mongoose.Schema.Types.ObjectId, ref: "OrderDetail", required: true },
        rating: { type: Number, min: 1, max: 5, required: true },
        comment: { type: String, trim: true },
        admin_reply: { type: String, trim: true },
    },
    { timestamps: true }
);

const Review = mongoose.model("Review", reviewSchema);
export default Review;
