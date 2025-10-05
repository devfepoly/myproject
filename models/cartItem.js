import mongoose from 'mongoose';

const cartItemSchema = new mongoose.Schema({
    user_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
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
        default: 1,
        min: 1
    }
}, {
    timestamps: true
});

// Indexes
cartItemSchema.index({ user_id: 1 });
cartItemSchema.index({ user_id: 1, product_variant_id: 1 }, { unique: true }); // Prevent duplicates

const CartItem = mongoose.model('CartItem', cartItemSchema);

export default CartItem;
