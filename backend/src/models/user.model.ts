import mongoose from "mongoose";
import { timeStamp } from "node:console";

const userSchema = new mongoose.Schema({

    username: {
        type: String,
        required: true,
        trim: true,
        maxlength: 30,
        minlength: 3
    },
    password: {
        type: String,
        maxlength: 100,
        minlength: 6,
        required: true,
    },

    email: {
        type: String,
        unique: true,
        required: true
    },

    role: {
        type: String,
        required: true,
        enum: ["Farmer", "Customer", "Admin"],
        default: "Customer"
    },

    phoneNumber: {
        type: Number,
        required: true,
        unique: true,
        trim: true,
        match: [/^[6-9]\d{9}$/, "Please enter a valid 10-digit Indian phone number"],
    },

    profilePicture: {

        type: String,
        default: ""
    },

    isVerified: {
        type: Boolean,
        default: false,
    },

    verificationToken: {
        type: String,
    },

    verificationTokenExpires: {
        type: Date,
    },

    resetPasswordToken: {
        type: String,
        default: null,
    },

    resetPasswordExpires: {
        type: Date,
        default: null,
    },

}, { timestamps: true });

const UserModel = mongoose.model("User", userSchema);
export default UserModel;