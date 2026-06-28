import express from "express";
import { isAuthenticated } from "../middleware/auth.middleware";
import * as farmerController from "../controllers/farmer.controller"

const farmerRoute= express.Router();

farmerRoute.put("/complete-profile",isAuthenticated,farmerController.farmerCompleteProfile)





export default farmerRoute;