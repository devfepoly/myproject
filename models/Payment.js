import mongoose from "mongoose";

const paymentSchema = new mongoose.Schema(
    {
        method: { type: String, required: true },
        status: { type: String, required: true },
        transaction_id: { type: String, trim: true },
        amount: { type: Number, required: true },
    },
    { timestamps: true }
);

const Payment = mongoose.model("Payment", paymentSchema);
export default Payment;
