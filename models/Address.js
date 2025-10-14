import mongoose from "mongoose";

const addressSchema = new mongoose.Schema(
    {
        user_id: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true,
        },
        recipient_name: { type: String, required: true, trim: true },
        recipient_phone: { type: String, required: true, trim: true },
        street: { type: String, required: true, trim: true },
        ward: { type: String, trim: true },
        district: { type: String, trim: true },
        city: { type: String, trim: true },
        is_default: { type: Boolean, default: false }
    },
    { timestamps: true }
);

const Address = mongoose.model("Address", addressSchema);
export default Address;
