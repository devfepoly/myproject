import mongoose from "mongoose";

const orderSchema = new mongoose.Schema(
    {
        user_id: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
        address_id: { type: mongoose.Schema.Types.ObjectId, ref: "Address", required: true },
        order_number: { type: String, required: true },
        status: { type: String, enum: ["pending", "paid", "shipped", "completed", "cancelled"], default: "pending" },
        subtotal: { type: Number, required: true },
        discount_total: { type: Number, default: 0 },
        grand_total: { type: Number, required: true },
        notes: { type: String, default: "" },
        voucher_id: { type: mongoose.Schema.Types.ObjectId, ref: "Voucher" },
    },
    { timestamps: true }
);

const Order = mongoose.model("Order", orderSchema);
export default Order;
