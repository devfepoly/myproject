import mongoose from 'mongoose';

const productImageSchema = new mongoose.Schema({
    product_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Product',
        required: true
    },
    img_url: {
        type: String,
        required: true
    },
    is_primary: {
        type: Boolean,
        default: false
    },
    sort_order: {
        type: Number,
        default: 0
    },
    alt_text: {
        type: String
    }
}, {
    timestamps: true
});

// Index
productImageSchema.index({ product_id: 1 });

const ProductImage = mongoose.model('ProductImage', productImageSchema);

export default ProductImage;
