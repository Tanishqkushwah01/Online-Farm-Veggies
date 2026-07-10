import mongoose from "mongoose";

const notificationSchema = new mongoose.Schema(
  {
    receiverId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      refPath: "receiverRole",
    },

    receiverRole: {
      type: String,
      enum: ["Farmer", "Customer"],
      required: true,
    },

    type: {
      type: String,
      enum: [
        "new_order",
        "order_cancelled",
        "product_low_stock",
        "product_out_of_stock",
        "new_product_review",
        "new_farmer_review",
        "order_accepted",
        "order_rejected",
      ],
      required: true,
    },

    title: {
      type: String,
      required: true,
      trim: true,
    },

    message: {
      type: String,
      required: true,
      trim: true,
    },

    isRead: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

notificationSchema.index({
  receiverId: 1,
  receiverRole: 1,
});

notificationSchema.index({
  receiverId: 1,
  receiverRole: 1,
  isRead: 1,
});

const notificationModel =  mongoose.models.Notification ||  mongoose.model("Notification", notificationSchema);

export default notificationModel;