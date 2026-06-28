import express from "express";
import * as userController from "../controllers/user.controller";
import authMiddleware from "../middleware/auth.middleware";
import upload from "../middleware/upload.middleware";
const router = express.Router()

router.post("/signup", userController.signup);
router.post("/signin", userController.signin);
router.post("/resend-email", userController.resendVerificationEmail);
router.get("/verify-email/:token", userController.verifyEmail);
router.post("/forgot-password", userController.forgotPassword);
router.put("/reset-password/:token", userController.resetPassword);
router.post("/change-password/request",authMiddleware,userController.requestChangePassword);
router.put("/change-password/:token",userController.changePassword);
//Profile Routes
router.put("/profile",authMiddleware,upload.single("profilePicture"),userController.updateUser);
router.delete("/profile",authMiddleware,userController.deleteUser)

export default router
