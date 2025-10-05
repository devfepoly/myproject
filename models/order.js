import mongoose from 'mongoose';

const orderSchema = new mongoose.Schema({
    user_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    address_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Address',
        required: true
    },
    voucher_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Voucher',
        default: null
    },
    order_number: {
        type: String,
        required: true,
        unique: true,
        uppercase: true
    },
    status: {
        type: String,
        enum: ['pending', 'confirmed', 'shipping', 'delivered', 'cancelled'],
        default: 'pending'
    },
    subtotal: {
        type: Number,
        required: true,
        min: 0
    },
    discount_total: {
        type: Number,
        default: 0,
        min: 0
    },
    shipping_fee: {
        type: Number,
        default: 0,
        min: 0
    },
    grand_total: {
        type: Number,
        required: true,
        min: 0
    },
    shipping_method: {
        type: String
    },
    tracking_number: {
        type: String
    },
    estimated_delivery: {
        type: Date
    },
    actual_delivery: {
        type: Date
    },
    notes: {
        type: String
    },
    cancel_reason: {
        type: String
    }
}, {
    timestamps: true
});

// Indexes
orderSchema.index({ user_id: 1 });
orderSchema.index({ status: 1 });
orderSchema.index({ order_number: 1 });
orderSchema.index({ createdAt: -1 });

// Generate order number
orderSchema.statics.generateOrderNumber = async function () {
    const date = new Date();
    const dateStr = date.toISOString().slice(0, 10).replace(/-/g, '');
    const count = await this.countDocuments({
        createdAt: {
            $gte: new Date(date.setHours(0, 0, 0, 0)),
            $lt: new Date(date.setHours(23, 59, 59, 999))
        }
    });
    return `ORD${dateStr}${String(count + 1).padStart(4, '0')}`;
};

const Order = mongoose.model('Order', orderSchema);

export default Order;
