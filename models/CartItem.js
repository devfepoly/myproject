import mongoose from "mongoose";

const cartItemSchema = new mongoose.Schema(
    {
        user_id: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
        product_variant_id: { type: mongoose.Schema.Types.ObjectId, ref: "ProductVariant", required: true },
        quantity: { type: Number, required: true, min: 1 },
    },
    { timestamps: true }
);

const CartItem = mongoose.model("CartItem", cartItemSchema);
export default CartItem;
