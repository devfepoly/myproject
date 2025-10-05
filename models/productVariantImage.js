import mongoose from 'mongoose';

const productVariantImageSchema = new mongoose.Schema({
    product_variant_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'ProductVariant',
        required: true
    },
    img_url: {
        type: String,
        required: true
    },
    sort_order: {
        type: Number,
        default: 0
    }
}, {
    timestamps: true
});

// Index
productVariantImageSchema.index({ product_variant_id: 1 });

const ProductVariantImage = mongoose.model('ProductVariantImage', productVariantImageSchema);

export default ProductVariantImage;
