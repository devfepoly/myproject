import mongoose from "mongoose";

const paymentSchema = new mongoose.Schema(
    {
        order_id: { type: mongoose.Schema.Types.ObjectId, ref: "Order", required: true },
        method: { type: String, required: true },
        status: { type: String, required: true },
        transaction_id: { type: String, trim: true },
        amount: { type: Number, required: true },
        payment_date: { type: timestamps },
    },
    { timestamps: true }
);

const Payment = mongoose.model("Payment", paymentSchema);
export default Payment;
