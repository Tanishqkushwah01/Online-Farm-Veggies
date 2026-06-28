import express from "express";
import authMiddleware from "../middleware/auth.middleware";
import * as farmerController from "../controllers/farmer.controller"

const farmerRoute= express.Router();

farmerRoute.put("/complete-profile",authMiddleware,farmerController.farmerCompleteProfile)





export default farmerRoute;