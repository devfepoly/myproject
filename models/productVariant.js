import mongoose from 'mongoose';

const productVariantSchema = new mongoose.Schema({
    product_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Product',
        required: true
    },
    color_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Color',
        default: null
    },
    sku: {
        type: String,
        unique: true,
        trim: true
    },
    price: {
        type: Number,
        min: 0
    },
    quantity: {
        type: Number,
        default: 0,
        min: 0
    },
    is_active: {
        type: Boolean,
        default: true
    }
}, {
    timestamps: true
});

// Indexes
productVariantSchema.index({ product_id: 1 });
productVariantSchema.index({ sku: 1 });

const ProductVariant = mongoose.model('ProductVariant', productVariantSchema);

export default ProductVariant;
