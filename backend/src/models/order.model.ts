import mongoose from "mongoose";

const orderSchema = new mongoose.Schema(
  {
    customerId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Customer",
      required: true,
    },


    farmerId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Farmer",
      required: true,
    },

    productId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Product",
      required: true,
    },


    quantity: {
      type: Number,
      required: true,
      min: 1,
    },

    totalAmount: {
      type: Number,
      required: true,
    },

    shippingAddress: {
      type: String,
      required: true,
    },

    neededBy: {
      type: Date,
      required: true,
    },
    
    orderCode: {
      type: String,
      unique: true,
      required: true,
    },

    orderStatus: {
      type: String,
      enum: [
        "Pending",
        "Accepted",
        "Delivered",
        "Cancelled",
      ],
      default: "Pending",
    },
  },
  {
    timestamps: true,
  }
);

const orderModel = mongoose.model("Order", orderSchema);
export default orderModel;