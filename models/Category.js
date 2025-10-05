import mongoose from 'mongoose';

const categorySchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    description: {
        type: String,
        trim: true
    },
    parent_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Category',
        default: null
    },
    slug: {
        type: String,
        unique: true,
        lowercase: true,
        trim: true
    },
    is_active: {
        type: Boolean,
        default: true
    }
}, {
    timestamps: true
});

// Index
categorySchema.index({ parent_id: 1 });
categorySchema.index({ slug: 1 });

const Category = mongoose.model('Category', categorySchema);

export default Category;
