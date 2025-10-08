import mongoose from "mongoose";

const wishlistItemSchema = new mongoose.Schema(
    {
        user_id: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
        product_id: { type: mongoose.Schema.Types.ObjectId, ref: "Product", required: true },
    },
    { timestamps: true }
);

const WishlistItem = mongoose.model("WishlistItem", wishlistItemSchema);
export default WishlistItem;
