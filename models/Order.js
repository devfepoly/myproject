import mongoose from "mongoose";

const orderSchema = new mongoose.Schema(
    {
        user_id: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
        address_id: { type: mongoose.Schema.Types.ObjectId, ref: "Address", required: true },
        voucher_id: { type: mongoose.Schema.Types.ObjectId, ref: "Voucher" },
        payment_id: { type: mongoose.Schema.Types.ObjectId, ref: "Payment" },
        status: { type: String, enum: ["pending", "paid", "shipped", "completed", "cancelled"], default: "pending" },
        subtotal: { type: Number, required: true },
        discount_total: { type: Number, default: 0 },
        grand_total: { type: Number, required: true },
    },
    { timestamps: true }
);

const Order = mongoose.model("Order", orderSchema);
export default Order;
