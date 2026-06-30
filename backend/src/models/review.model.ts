import mongoose from "mongoose"
const reviewSchema = new mongoose.Schema({
    productId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Product",
        required:true
    },

    customerId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required:true
    },

    rating: Number,
    review: String
});

export default mongoose.model("ReviewModel", reviewSchema);