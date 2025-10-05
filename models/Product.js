import mongoose from 'mongoose';

const productSchema = new mongoose.Schema({
    brand_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Brand',
        required: true
    },
    category_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Category',
        required: true
    },
    name: {
        type: String,
        required: true,
        trim: true
    },
    slug: {
        type: String,
        unique: true,
        lowercase: true,
        trim: true
    },
    description: {
        type: String
    },
    price: {
        type: Number,
        required: true,
        min: 0
    },
    sale_price: {
        type: Number,
        min: 0,
        default: null
    },
    img_url: {
        type: String
    },
    is_active: {
        type: Boolean,
        default: true
    },
    is_featured: {
        type: Boolean,
        default: false
    },
    view_count: {
        type: Number,
        default: 0
    },
    sold_count: {
        type: Number,
        default: 0
    },
    meta_title: String,
    meta_description: String,
    meta_keywords: String
}, {
    timestamps: true
});

// Indexes for performance
productSchema.index({ brand_id: 1 });
productSchema.index({ category_id: 1 });
productSchema.index({ price: 1 });
productSchema.index({ slug: 1 });
productSchema.index({ is_active: 1 });
productSchema.index({ is_featured: 1 });
productSchema.index({ name: 'text', description: 'text' }); // Full-text search

const Product = mongoose.model('Product', productSchema);

export default Product;
