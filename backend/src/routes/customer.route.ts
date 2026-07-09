import authMiddleware from "../middleware/auth.middleware";
import express from "express";
import * as customerController from "../controllers/customer.controller";
import reviewModel from "../models/productsReview.model";
const router = express.Router();

// get random 10 products 
router.get("/products/random", authMiddleware, customerController.getTenProducts);

// create and delete at one time 
router.post("/wishlist/toggle/:productId", authMiddleware, customerController.toggleWishlist);

// get your all wishlist 
router.get("/wishlist", authMiddleware, customerController.getWishlist);

// get one products by ID
router.get("/products/:productId", authMiddleware, customerController.getProductById);

// create a  product review 

router.post("/review", authMiddleware, customerController.addReview);

// delete my review 
router.delete("/review/:type/:id", authMiddleware, customerController.deleteReview);

// Order routes

// create a order 
router.post("/orders", authMiddleware, customerController.createOrder);

// get my all orders 
router.get("/orders", authMiddleware, customerController.getCustomerOrders);

// deleting customer order 
router.delete("/orders/:orderId", authMiddleware, customerController.deleteOrder);

router.get("/farmer/:farmerId", authMiddleware, customerController.getFarmerProfileById);

router.get("/orders/:orderId", authMiddleware, customerController.getParticularOrder);



export default router;