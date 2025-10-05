import mongoose from 'mongoose';

const wishlistItemSchema = new mongoose.Schema({
    user_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    product_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Product',
        required: true
    }
}, {
    timestamps: true
});

// Indexes
wishlistItemSchema.index({ user_id: 1 });
wishlistItemSchema.index({ user_id: 1, product_id: 1 }, { unique: true }); // Prevent duplicates

const WishlistItem = mongoose.model('WishlistItem', wishlistItemSchema);

export default WishlistItem;
