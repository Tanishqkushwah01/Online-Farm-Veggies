import express from "express";
import * as notificationController from "../controllers/notification.controller";
import authMiddleware from "../middleware/auth.middleware";

const notificationRoutes = express.Router();

notificationRoutes.get("/", authMiddleware, notificationController.getNotifications);

notificationRoutes.patch("/:notificationId/read", authMiddleware, notificationController.markNotificationAsRead);

notificationRoutes.patch("/mark-all-read", authMiddleware, notificationController.markAllNotificationsAsRead);

notificationRoutes.delete("/:notificationId", authMiddleware, notificationController.deleteNotification);

export default notificationRoutes;