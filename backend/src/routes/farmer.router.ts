import express from "express";
import authMiddleware from "../middleware/auth.middleware";
import * as farmerController from "../controllers/farmer.controller"

const farmerRoute= express.Router();







export default farmerRoute;