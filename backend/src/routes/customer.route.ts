import authMiddleware from "../middleware/auth.middleware";
import express from "express";
import * as customerController from "../controllers/customer.controller";
import reviewModel from "../models/productsReview.model";
const router = express.Router();

// Customer can view all products
// router.get("/products", authMiddleware, customerController.getAllProducts);
// Customer can view all products of a specific farmer
// router.get("/farmer/:farmerId/products",authMiddleware, customerController.getFarmerProducts);
// Customer can view details of a specific product
// router.get("/product/:productId",authMiddleware, customerController.getProductDetails);
// Customer can view details of a specific farmer
// router.get("/farmer/:farmerId",authMiddleware, customerController.getFarmerProfile);



// Customer can post a review for a specific product
// router.post("/products/:productId/reviews", authMiddleware, customerController.postReview);

// Customer can view all reviews for a specific product
// router.get("/products/:productId/reviews",authMiddleware,customerController.getProductReviews);



// Customer can post a review for a specific farmer
// router.post("/farmer/:farmerId/reviews", authMiddleware, customerController.postFarmerReview);




// Customer can view all reviews for a specific farmer
// router.get("/farmer/:farmerId/reviews",authMiddleware,customerController.getFarmerReviews);

// router.post("/wishlist/:productId", authMiddleware, customerController.addToWishlist);

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
router.delete("/review/:productId", authMiddleware, customerController.deleteReview);

// Order routes
router.post("/orders", authMiddleware, customerController.createOrder);
export default router;