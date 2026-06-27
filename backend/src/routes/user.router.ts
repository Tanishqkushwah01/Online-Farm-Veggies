import express from "express";
import * as userController from "../controllers/user.controller";
import { isAuthenticated } from "../middleware/auth.middleware";

const router=express.Router()

router.post("/signup",userController.signup);
router.post("/signin",userController.signin)
// router.post("/send-email",userController.sendVerification)
router.post("/resend-email",userController.resendVerificationEmail)
router.get("/verify-email/:token",userController.verifyEmail)
router.post("/forgot-password",userController.forgotPassword);
router.post("/reset-password/:token", userController.resetPassword);

//Profile Routes
router.put("/profile/update",isAuthenticated,userController.updateUser)
router.delete("/profile/delete",isAuthenticated,userController.deleteUser)
export default router