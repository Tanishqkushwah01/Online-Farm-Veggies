import mongoose from "mongoose";

const customerSchema = new mongoose.Schema({

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
        type: String,
        required: true,
        unique: true,
        trim: true,
        match: [/^[6-9]\d{9}$/, "Please enter a valid 10-digit Indian phone number"],
    },

    city: {
        type: String,
        trim: true,
    },
    address: {
        type: String,
        trim: true,
    },
    bio: {
        type: String,
        trim: true,
        maxlength: 500,
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

const customerModel = mongoose.model("Customer", customerSchema);
export default customerModel;