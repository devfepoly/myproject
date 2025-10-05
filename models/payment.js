import mongoose from 'mongoose';

const paymentSchema = new mongoose.Schema({
    order_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Order',
        required: true
    },
    method: {
        type: String,
        enum: ['COD', 'bank_transfer', 'credit_card', 'e_wallet', 'momo', 'vnpay', 'zalopay'],
        required: true
    },
    status: {
        type: String,
        enum: ['pending', 'completed', 'failed', 'refunded'],
        default: 'pending'
    },
    transaction_id: {
        type: String,
        unique: true,
        sparse: true // Allow null values
    },
    amount: {
        type: Number,
        required: true,
        min: 0
    },
    payment_date: {
        type: Date
    },
    notes: {
        type: String
    }
}, {
    timestamps: true
});

// Indexes
paymentSchema.index({ order_id: 1 });
paymentSchema.index({ status: 1 });
paymentSchema.index({ transaction_id: 1 });

const Payment = mongoose.model('Payment', paymentSchema);

export default Payment;
