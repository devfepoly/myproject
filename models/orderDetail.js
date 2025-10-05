import mongoose from 'mongoose';

const orderDetailSchema = new mongoose.Schema({
    order_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Order',
        required: true
    },
    product_variant_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'ProductVariant',
        required: true
    },
    quantity: {
        type: Number,
        required: true,
        min: 1
    },
    unit_price: {
        type: Number,
        required: true,
        min: 0
    },
    total_price: {
        type: Number,
        required: true,
        min: 0
    }
}, {
    timestamps: true
});

// Index
orderDetailSchema.index({ order_id: 1 });

const OrderDetail = mongoose.model('OrderDetail', orderDetailSchema);

export default OrderDetail;
