import express from "express";
import * as userController from "../controllers/user.controller";
import authMiddleware from "../middleware/auth.middleware";

const router = express.Router()

router.post("/signup", userController.signup);
router.post("/signin", userController.signin);
router.post("/resend-email", userController.resendVerificationEmail);
router.get("/verify-email/:token", userController.verifyEmail);
router.post("/forgot-password", userController.forgotPassword);
router.put("/reset-password/:token", userController.resetPassword);

//Profile Routes
router.put("/profile", authMiddleware, userController.updateUser);
router.delete("/profile", authMiddleware, userController.deleteUser);


router.delete("/logout", authMiddleware, userController.logout);
export default router
