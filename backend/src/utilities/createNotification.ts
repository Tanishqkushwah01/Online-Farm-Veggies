import mongoose from "mongoose";
import notificationModel from "../models/notification.model";

type ReceiverRole = "Farmer" | "Customer";

type NotificationType =
  | "new_order"
  | "order_cancelled"
  | "product_low_stock"
  | "product_out_of_stock"
  | "new_product_review"
  | "new_farmer_review"
  | "order_accepted"
  | "order_rejected";

type CreateNotificationParams = {
  receiverId: string | mongoose.Types.ObjectId;
  receiverRole: ReceiverRole;
  type: NotificationType;
  title: string;
  message: string;
};

export const createNotification = async ({
  receiverId,
  receiverRole,
  type,
  title,
  message,
}: CreateNotificationParams) => {
  if (!receiverId || !receiverRole || !type || !title || !message) {
    return null;
  }

  const notification = await notificationModel.create({
    receiverId,
    receiverRole,
    type,
    title: title.trim(),
    message: message.trim(),
  });

  return notification;
};