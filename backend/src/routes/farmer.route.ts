import express from "express";
import * as farmerController from "../controllers/farmer.controller";
import authMiddleware from "../middleware/auth.middleware";
import upload from "../middleware/upload.middleware";

const router = express.Router();

router.post("/products", authMiddleware, upload.single("image"), farmerController.createProduct);

router.get("/products", authMiddleware, farmerController.getFarmerProducts);

router.put("/products/:productId", authMiddleware, upload.single("image"), farmerController.updateProduct);

router.delete("/products/:productId", authMiddleware, farmerController.deleteProduct);

router.get("/products/stats", authMiddleware, farmerController.getFarmerProductStats);

router.get("/reviews", authMiddleware, farmerController.getFarmerReviews);

router.get("/review-stats", authMiddleware, farmerController.getFarmerReviewStats);

router.get("/rating-distribution", authMiddleware, farmerController.getRatingDistribution);

router.get("/highest-rated-products", authMiddleware, farmerController.getHighestRatedProducts);

router.get("/orders", authMiddleware, farmerController.getFarmerOrders);

router.get("/orders/stats", authMiddleware, farmerController.getOrderStats);

router.patch("/orders/:orderId/status", authMiddleware, farmerController.updateOrderStatus);

router.get("/dashboard/stats", authMiddleware, farmerController.getDashboardStats);

router.get("/dashboard/recent-reviews", authMiddleware, farmerController.getRecentCustomerReviews);

router.delete("/orders/:orderId", authMiddleware, farmerController.removeOrder);

export default router;
