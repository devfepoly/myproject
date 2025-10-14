import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
            trim: true,
        },
        email: {
            type: String,
            required: true,
            unique: true,
            lowercase: true,
            trim: true,
        },
        phone: {
            type: String,
            required: false,
            trim: true,
        },
        password_hash: {
            type: String,
            required: true,
        },
        gender: {
            type: String,
            enum: ["male", "female", "other"],
            default: null,
        },
        provider: {
            type: String,
            enum: ["local", "google", "facebook", "github"],
            default: "local",
        },
        role: {
            type: String,
            enum: ["user", "admin"],
            default: "user",
        },
        verify_token: {
            type: String
        },
        token_expire: {
            type: Date
        }
    },
    {
        timestamps: true,
    }
);

const User = mongoose.model("User", userSchema);

export default User;
