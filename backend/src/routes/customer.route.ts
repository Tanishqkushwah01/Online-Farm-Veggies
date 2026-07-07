import authMiddleware from "../middleware/auth.middleware";
import express from "express";
import * as customerController from "../controllers/customer.controller";
const customerRouter = express.Router();

// Customer can view all products
// customerRouter.get("/products", authMiddleware, customerController.getAllProducts);
// Customer can view all products of a specific farmer
// customerRouter.get("/farmer/:farmerId/products",authMiddleware, customerController.getFarmerProducts);
// Customer can view details of a specific product
// customerRouter.get("/product/:productId",authMiddleware, customerController.getProductDetails);
// Customer can view details of a specific farmer
// customerRouter.get("/farmer/:farmerId",authMiddleware, customerController.getFarmerProfile);



// Customer can post a review for a specific product
// customerRouter.post("/products/:productId/reviews", authMiddleware, customerController.postReview);

// Customer can view all reviews for a specific product
// customerRouter.get("/products/:productId/reviews",authMiddleware,customerController.getProductReviews);



// Customer can post a review for a specific farmer
// customerRouter.post("/farmer/:farmerId/reviews", authMiddleware, customerController.postFarmerReview);




// Customer can view all reviews for a specific farmer
// customerRouter.get("/farmer/:farmerId/reviews",authMiddleware,customerController.getFarmerReviews);

// customerRouter.post("/wishlist/:productId", authMiddleware, customerController.addToWishlist);

// get random 10 products 
customerRouter.get("/products/random", authMiddleware, customerController.getTenProducts);

// create and delete at one time 
customerRouter.post("/wishlist/toggle/:productId", authMiddleware, customerController.toggleWishlist);

// get your all wishlist 
customerRouter.get("/wishlist", authMiddleware, customerController.getWishlist);

export default customerRouter;