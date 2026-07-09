import mongoose from "mongoose";

const farmerReviewSchema = new mongoose.Schema(
  {
    farmerId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Farmer",
      required: true,
    },

    customerId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Customer",
      required: true,
    },

    rating: {
      type: Number,
      required: true,
      min: 1,
      max: 5,
    },

    review: {
      type: String,
      trim: true,
      maxlength: 500,
      default: "",
    },
  },
  {
    timestamps: true,
  }
);

// One customer can review one farmer only once
farmerReviewSchema.index(
  { customerId: 1, farmerId: 1 },
  { unique: true }
);


const farmerReviewModel = mongoose.model("FarmerReview", farmerReviewSchema);
export default farmerReviewModel;