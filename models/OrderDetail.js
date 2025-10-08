import mongoose from "mongoose";

const orderDetailSchema = new mongoose.Schema(
    {
        order_id: { type: mongoose.Schema.Types.ObjectId, ref: "Order", required: true },
        product_variant_id: { type: mongoose.Schema.Types.ObjectId, ref: "ProductVariant", required: true },
        quantity: { type: Number, required: true },
        unit_price: { type: Number, required: true },
        total_price: { type: Number, required: true },
    },
    { timestamps: true }
);

const OrderDetail = mongoose.model("OrderDetail", orderDetailSchema);
export default OrderDetail;
