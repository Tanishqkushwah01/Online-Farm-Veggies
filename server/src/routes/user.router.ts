import express from "express";
import * as userController from "../controllers/user.controller";

const router=express.Router()

router.post("/signup",userController.signup);
router.post("/signin",userController.signin)
router.post("/send-email",userController.sendVerification)
router.post("/resend-email",userController.resendVerificationEmail)
router.get("/verify-email/:token",userController.verifyEmail)

export default router