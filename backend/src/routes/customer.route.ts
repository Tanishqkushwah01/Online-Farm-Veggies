import authMiddleware from "../middleware/auth.middleware";
import express from "express";
import * as customerController from "../controllers/customer.controller";
const customerRouter = express.Router();

// Customer can view all products
customerRouter.get("/products", authMiddleware, customerController.getAllProducts);
customerRouter.get("/farmer/:farmerId/products",authMiddleware, customerController.getFarmerProfile);
customerRouter.get("/product/:productId",authMiddleware, customerController.getProductDetails);




export default customerRouter;