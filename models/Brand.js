import mongoose from 'mongoose';

const brandSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: true,
        trim: true
    },
    description: {
        type: String,
        trim: true
    },
    logo_url: {
        type: String
    },
    is_active: {
        type: Boolean,
        default: true
    }
}, {
    timestamps: true
});

// Index for search
brandSchema.index({ name: 1 });

const Brand = mongoose.model('Brand', brandSchema);

export default Brand;
