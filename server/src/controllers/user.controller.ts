import { Request, Response } from "express"
import UserModel from "../models/user.model"
import userValidation from "../types/user.validation"
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken";
import crypto from "crypto";
import { sendVerificationEmail } from "../utilities/sendEmailVerification";


/**
     * Register API
     * @description: This API is used to create a new user account
     * @route /api/auth/signup
*/
export const signup = async (req: Request, res: Response) => {
  try {

    const details = req.body
    const validUser = userValidation.safeParse(details)
    // console.log(validUser)
    if (validUser.success) {

      const existingUser = await UserModel.findOne({
        $or: [
          { email: details.email },
          { phoneNumber: details.phoneNumber }
        ]
      });

      if (existingUser) {
        if (existingUser.email === details.email) {
          return res.status(409).json({
            success: false,
            message: "Email already exists"
          });
        }

        if (existingUser.phoneNumber === details.phoneNumber) {
          return res.status(409).json({
            success: false,
            message: "Phone number already exists"
          });
        }
      }
      const hashedPass = await bcrypt.hash(details.password, 10)
      const verificationToken = crypto.randomBytes(32).toString("hex");
      const User = await UserModel.create({
        ...details,
        password: hashedPass,
        verificationToken,
        isVerified: false,
        verificationTokenExpires: new Date(Date.now() + 3 * 60 * 1000), // 3 minutes
      })
      console.log("User email:", User.email)
      await sendVerificationEmail(
        User.email,
        verificationToken
      );



      const token = jwt.sign(
        { UserId: User._id },
        process.env.JWT_SECRET!,
        {
          expiresIn: "7d",
        });
      res.status(201).json({ msg: "Registered", token })
    }
  } catch (error: any) {

    console.error("Signup Error:", error);

    if (error.code === 11000) {
      return res.status(409).json({
        success: false,
        message: "Email or phone number already exists",
      });
    }

    if (error.name === "ValidationError") {
      return res.status(400).json({
        success: false,
        message: error.message,
      });
    }
  }
}

/**
     * Login API
     * @description: This API is used to login a user.
     * @route /api/auth/signup
*/

export const signin = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body
    const userExist = await UserModel.findOne({ email })

    if (!userExist) {
      return res.status(404).json({
        success: false,
        message: "User not found"
      })
    }
    const isPasswordCorrect = await bcrypt.compare(password, userExist.password)

    if (!isPasswordCorrect) {
      return res.status(401).json({
        success: false,
        message: "Invalid email or password",
      });
    }
    if (!userExist.isVerified) {
      return res.status(403).json({
        success: false,
        message: "Please verify your email first."
      });
    }
    // Token Creation
    const token = jwt.sign(
      { UserId: userExist.id },
      process.env.JWT_SECRET!,
      {
        expiresIn: "7d"
      })
    res.status(201).json({ msg: "LoggedIn", token })
  }
  catch (error: any) {
    console.error("Signin Error:", error);

    return res.status(500).json({
      success: false,
      message: "Something went wrong. Please try again later."
    });
  }
}

/**
     * Email-Sending API
     * @description: This API is used by client to send their email to the backend.
     * @route /api/auth/send-email
*/
export const sendVerification = async (
  req: Request,
  res: Response
) => {
  try {
    const { email } = req.body;
    console.log(req.body);
    console.log("Email:", req.body.email);
    const user = await UserModel.findOne({ email });
    console.log(user)
    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    if (user.isVerified) {
      return res.status(400).json({
        success: false,
        message: "Email is already verified",
      });
    }
    if (!user.verificationToken) {
      return res.status(400).json({
        success: false,
        message: "Verification token not found",
      });
    }
    await sendVerificationEmail(
      user.email,
      user.verificationToken
    );

    return res.status(200).json({
      success: true,
      message: "Verification email sent successfully",
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};

/**
     * Resend Email API
     * @description: This API is used by client to resend their email to the backend.
     * @route /api/auth/resend-email
*/
export const resendVerificationEmail = async (
  req: Request,
  res: Response
) => {
  try {
    const { email } = req.body;

    const user = await UserModel.findOne({ email });

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    if (user.isVerified) {
      return res.status(400).json({
        success: false,
        message: "Email is already verified",
      });
    }

    // Generate new token
    const verificationToken = crypto.randomBytes(32).toString("hex");

    user.verificationToken = verificationToken;
    user.verificationTokenExpires = new Date(
      Date.now() + 30 * 60 * 1000
    );

    await user.save();

    await sendVerificationEmail(
      user.email,
      verificationToken
    );

    return res.status(200).json({
      success: true,
      message: "Verification email sent successfully",
    });

  } catch (error) {
    console.error(error);

    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};


/**
     * Email Verification API
     * @description: This API is used to verify user's email.
     * @route /api/auth/verify-email/:token
*/

export const verifyEmail = async (req: Request, res: Response) => {
  try {
    const { token } = req.params;

    const user = await UserModel.findOne({
      verificationToken: token,
      verificationTokenExpires: { $gt: new Date() },
    });

    console.log(user)

    if (!user) {
      return res.status(400).json({
        success: false,
        message: "Invalid or expired verification token",
      });
    }

    user.isVerified = true;
    user.verificationToken = undefined;
    user.verificationTokenExpires = undefined;

    await user.save();

    return res.status(200).json({
      success: true,
      message: "Email verified successfully",
    });
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};
