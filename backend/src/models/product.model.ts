import mongoose from "mongoose";

const productSchema = new mongoose.Schema(
  {
    farmerId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Farmer",
      required: true,
    },
    productName: {
      type: String,
      required: true,
    },
    description: String,
    category: String,
    price: {
      type: Number,
      required: true,
    },
    quantity: {
      type: Number,
      required: true,
    },
    unit: {
      type: String,
      enum: ["kg", "gram", "dozen", "piece", "liter"],
      required: true,
    },
    image: String,
    isAvailable: {
      type: Boolean,
      default: true,
    },
  },
  { timestamps: true }
);

export default mongoose.model("ProductModel", productSchema);