import { Request, Response } from "express";
import mongoose from "mongoose";
import notificationModel from "../models/notification.model";

type ReceiverRole = "Farmer" | "Customer";

type AuthUser = {
  _id?: string | mongoose.Types.ObjectId;
  role?: string;
};

const getReceiverRole = (role?: string): ReceiverRole | null => {
  if (!role) return null;

  const normalizedRole = role.toLowerCase();

  if (normalizedRole === "farmer") return "Farmer";
  if (normalizedRole === "customer") return "Customer";

  return null;
};

const getAuthUser = (req: Request) => {
  const user = (req as Request & { user?: AuthUser }).user;

  const receiverId = user?._id;
  const receiverRole = getReceiverRole(user?.role);

  return { receiverId, receiverRole };
};

const getParamAsString = (value: unknown): string | null => {
  if (typeof value !== "string") return null;
  return value.trim();
};

export const getNotifications = async (req: Request, res: Response) => {
  try {
    const { receiverId, receiverRole } = getAuthUser(req);

    if (!receiverId || !receiverRole) {
      return res.status(401).json({
        success: false,
        message: "Unauthorized user",
      });
    }

    const page = Math.max(Number(req.query.page) || 1, 1);
    const limit = Math.min(Math.max(Number(req.query.limit) || 20, 1), 50);
    const skip = (page - 1) * limit;

    const filter = {
      receiverId,
      receiverRole,
    };

    const [notifications, totalNotifications, unreadCount] =
      await Promise.all([
        notificationModel
          .find(filter)
          .sort({ createdAt: -1 })
          .skip(skip)
          .limit(limit)
          .lean(),

        notificationModel.countDocuments(filter),

        notificationModel.countDocuments({
          ...filter,
          isRead: false,
        }),
      ]);

    return res.status(200).json({
      success: true,
      notifications,
      unreadCount,
      pagination: {
        totalNotifications,
        currentPage: page,
        totalPages: Math.ceil(totalNotifications / limit),
        hasMore: skip + notifications.length < totalNotifications,
      },
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Failed to fetch notifications",
    });
  }
};

export const markNotificationAsRead = async (req: Request, res: Response) => {
  try {
    const { receiverId, receiverRole } = getAuthUser(req);
    const notificationId = getParamAsString(req.params.notificationId);

    if (!receiverId || !receiverRole) {
      return res.status(401).json({
        success: false,
        message: "Unauthorized user",
      });
    }

    if (
      !notificationId ||
      !mongoose.Types.ObjectId.isValid(notificationId)
    ) {
      return res.status(400).json({
        success: false,
        message: "Invalid notification id",
      });
    }

    const notification = await notificationModel.findOneAndUpdate(
      {
        _id: notificationId,
        receiverId,
        receiverRole,
      },
      { isRead: true },
      { new: true }
    );

    if (!notification) {
      return res.status(404).json({
        success: false,
        message: "Notification not found",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Notification marked as read",
      notification,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Failed to update notification",
    });
  }
};

export const markAllNotificationsAsRead = async (
  req: Request,
  res: Response
) => {
  try {
    const { receiverId, receiverRole } = getAuthUser(req);

    if (!receiverId || !receiverRole) {
      return res.status(401).json({
        success: false,
        message: "Unauthorized user",
      });
    }

    await notificationModel.updateMany(
      {
        receiverId,
        receiverRole,
        isRead: false,
      },
      { isRead: true }
    );

    return res.status(200).json({
      success: true,
      message: "All notifications marked as read",
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Failed to mark all notifications as read",
    });
  }
};

export const deleteNotification = async (req: Request, res: Response) => {
  try {
    const { receiverId, receiverRole } = getAuthUser(req);
    const notificationId = getParamAsString(req.params.notificationId);

    if (!receiverId || !receiverRole) {
      return res.status(401).json({
        success: false,
        message: "Unauthorized user",
      });
    }

    if (
      !notificationId ||
      !mongoose.Types.ObjectId.isValid(notificationId)
    ) {
      return res.status(400).json({
        success: false,
        message: "Invalid notification id",
      });
    }

    const notification = await notificationModel.findOneAndDelete({
      _id: notificationId,
      receiverId,
      receiverRole,
    });

    if (!notification) {
      return res.status(404).json({
        success: false,
        message: "Notification not found",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Notification deleted successfully",
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Failed to delete notification",
    });
  }
};