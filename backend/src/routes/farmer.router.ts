import express from "express";
import * as farmerController from "../controllers/farmer.controller";
import authMiddleware from "../middleware/auth.middleware";
import upload from "../middleware/upload.middleware";

const router = express.Router();

router.post("/product",authMiddleware,upload.single("image"),farmerController.createProduct);

router.get("/products",authMiddleware,farmerController.getFarmerProducts);

router.put("/product/:productId",authMiddleware,upload.single("image"),farmerController.updateProduct);

router.delete("/product/:productId",authMiddleware,farmerController.deleteProduct
);

export default router;