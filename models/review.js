import mongoose from 'mongoose';

const reviewSchema = new mongoose.Schema({
    order_detail_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'OrderDetail',
        required: true
    },
    user_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    product_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Product',
        required: true
    },
    rating: {
        type: Number,
        required: true,
        min: 1,
        max: 5
    },
    comment: {
        type: String,
        trim: true
    },
    admin_reply: {
        type: String,
        trim: true
    },
    verified_purchase: {
        type: Boolean,
        default: true
    },
    helpful_count: {
        type: Number,
        default: 0,
        min: 0
    },
    is_approved: {
        type: Boolean,
        default: false
    }
}, {
    timestamps: true
});

// Indexes
reviewSchema.index({ product_id: 1 });
reviewSchema.index({ user_id: 1 });
reviewSchema.index({ rating: 1 });

const Review = mongoose.model('Review', reviewSchema);

export default Review;
