import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        trim: true
    },
    phone: {
        type: String,
        trim: true
    },
    password_hash: {
        type: String,
        required: true
    },
    avatar_url: {
        type: String
    },
    date_of_birth: {
        type: Date
    },
    gender: {
        type: String,
        enum: ['male', 'female', 'other']
    },
    role: {
        type: String,
        enum: ['admin', 'customer'],
        default: 'customer'
    },
    email_verified: {
        type: Boolean,
        default: false
    },
    phone_verified: {
        type: Boolean,
        default: false
    },
    is_active: {
        type: Boolean,
        default: true
    },
    last_login: {
        type: Date
    }
}, {
    timestamps: true
});

// Indexes
userSchema.index({ email: 1 });
userSchema.index({ phone: 1 });
userSchema.index({ role: 1 });

// Method to compare password
userSchema.methods.comparePassword = async function (candidatePassword) {
    return await bcrypt.compare(candidatePassword, this.password_hash);
};

// Hash password before saving
userSchema.pre('save', async function (next) {
    if (!this.isModified('password_hash')) return next();

    const salt = await bcrypt.genSalt(10);
    this.password_hash = await bcrypt.hash(this.password_hash, salt);
    next();
});

const User = mongoose.model('User', userSchema);

export default User;