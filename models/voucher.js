import mongoose from 'mongoose';

const voucherSchema = new mongoose.Schema({
    code: {
        type: String,
        required: true,
        unique: true,
        uppercase: true,
        trim: true
    },
    type: {
        type: String,
        enum: ['percentage', 'fixed'],
        required: true
    },
    value: {
        type: Number,
        required: true,
        min: 0
    },
    min_total: {
        type: Number,
        default: 0,
        min: 0
    },
    max_discount_value: {
        type: Number,
        min: 0
    },
    usage_limit: {
        type: Number,
        min: 0
    },
    used_count: {
        type: Number,
        default: 0,
        min: 0
    },
    start_date: {
        type: Date,
        required: true
    },
    end_date: {
        type: Date,
        required: true
    },
    is_active: {
        type: Boolean,
        default: true
    },
    description: {
        type: String
    }
}, {
    timestamps: true
});

// Indexes
voucherSchema.index({ code: 1 });
voucherSchema.index({ start_date: 1, end_date: 1 });

// Method to check if voucher is valid
voucherSchema.methods.isValid = function () {
    const now = new Date();
    return this.is_active &&
        now >= this.start_date &&
        now <= this.end_date &&
        (!this.usage_limit || this.used_count < this.usage_limit);
};

const Voucher = mongoose.model('Voucher', voucherSchema);

export default Voucher;
