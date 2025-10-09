import mongoose from "mongoose";

const voucherSchema = new mongoose.Schema(
    {
        code: { type: String, required: true, unique: true, trim: true },
        type: { type: String, enum: ["percent", "fixed"], required: true },
        value: { type: Number, required: true },
        min_total: { type: Number, default: 0 },
        max_discount_value: { type: Number, default: 0 },
        usage_limit: { type: Number, default: 1 },
        start: { type: Date, required: true },
        end: { type: Date, required: true },
        is_active: { type: Boolean, default: true },
    },
    { timestamps: true }
);

const Voucher = mongoose.model("Voucher", voucherSchema);
export default Voucher;
