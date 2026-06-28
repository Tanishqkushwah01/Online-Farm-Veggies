import { Request, Response } from "express"
import UserModel from "../models/user.model"
import userValidation from "../types/user.validation"
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken";
import crypto from "crypto";
import { sendVerificationEmail } from "../utilities/sendEmailVerification";
import { sendResetPasswordEmail } from "../utilities/resetpasswordemail";
import { sendVerificationMailToUser } from "../utilities/sendEmail";
import resetPassValidation from "../types/reset.password.validation";
import blacklistModel from "../models/blacklist.model";


/**
     * Register API
     * @description: This API is used to create a new user account
     * @route /api/auth/signup
*/
export const signup = async (req: Request, res: Response) => {
  try {

    const details = req.body;
    console.log("data =", details)
    const validUser = userValidation.safeParse(details)
    console.log(validUser)
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
      // console.log(hashedPass, verificationToken)
      const User = await UserModel.create({
        ...details,
        password: hashedPass,
        verificationToken,
        isVerified: false,
        verificationTokenExpires: new Date(Date.now() + 30 * 60 * 1000), // 30 minutes
      });
      console.log("User email:", User.email)
      // Send verification email
      const result = await sendVerificationMailToUser(User.email);
      //  console.log(result)
      if (!result) {
        return res.status(301).json({ msg: "Verification of mail not .........." })
      }

      const token = jwt.sign(
        { UserId: User._id },
        process.env.JWT_SECRET!,
        {
          expiresIn: "7d",
        });
      res.status(201).json({
        msg: "registered", User: {
          email: User.email,
          username: User.username,
          role: User.role,
          phoneNumber: User.phoneNumber
        }, token
      })
      console.log("TOKEN--------->Registration", token)
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
    console.log("EMail---->", email)
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

    res.status(201).json({
      msg: "LoggedIn", userExist: {
        email: userExist.email,
        username: userExist.username,
        role: userExist.role,
        phoneNumber: userExist.phoneNumber,
        shopName: userExist.shopName,
        profilePicture: userExist.profilePicture,
        Address: userExist.Address
      }, token
    })
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
// export const sendVerification = async (
//   req: Request,
//   res: Response
// ) => {
//   try {
//     const { email } = req.body;
//     console.log("Request body--->",req.body);
//     console.log("Email:", req.body.email);
//     const user = await UserModel.findOne({ email });
//     console.log(user)
//     if (!user) {
//       return res.status(404).json({
//         success: false,
//         message: "User not found",
//       });
//     }

//     if (user.isVerified) {
//       return res.status(400).json({
//         success: false,
//         message: "Email is already verified",
//       });
//     }
//     if (!user.verificationToken) {
//       return res.status(400).json({
//         success: false,
//         message: "Verification token not found",
//       });
//     }
//     await sendVerificationEmail(
//       user.email,
//       user.verificationToken
//     );

//     return res.status(200).json({
//       success: true,
//       message: "Verification email sent successfully",
//     });
//   } catch (error) {
//     return res.status(500).json({
//       success: false,
//       message: "Internal Server Error",
//     });
//   }
// };

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
    console.log(email);

    const user = await UserModel.findOne({ email });
    console.log("user::", user)
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
    console.log("hi verify", verificationToken)

    user.verificationToken = verificationToken;
    user.verificationTokenExpires = new Date(
      Date.now() + 30 * 60 * 1000
    );

    await user.save();

    await sendVerificationEmail(
      user.email,
      verificationToken
    );
    console.log("user::", user)


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
      // return res.status(400).json({
      //   success: false,
      //   message: "Invalid or expired verification token",
      // });
      return res.redirect(`${process.env.CLIENT_URL}/verify-failed`);
    }
    user.isVerified = true;
    user.verificationToken = undefined;
    user.verificationTokenExpires = undefined;

    await user.save();

    // return res.status(200).json({
    //   success: true,
    //   message: "Email verified successfully",
    // });

    return res.redirect(`${process.env.CLIENT_URL}/verify-success`);
  } catch (error) {
    console.error(error);

    return res.redirect(`${process.env.CLIENT_URL}/verify-failed`);
  }
};

/**
 * Update User API
 * @description: This API is used to update User's Profile
 * @route /api/profile/updateProfile/:id
 *  */
export const updateUser = async (
  req: Request,
  res: Response
) => {
  try {
    const userId = req.user._id;

    const updates = req.body;

    console.log("Logged in user:", req.user);
    console.log("User ID:", req.user?._id);
    console.log("Updates:", req.body);

    const updatedUser = await UserModel.findByIdAndUpdate(
      userId,
      updates,
      {
        returnDocument: "after",
        runValidators: true,
      }
    ).select("-password -verificationToken");

    console.log("Updated User------>", updatedUser)
    return res.status(200).json({
      success: true,
      message: "Profile updated successfully",
      data: updatedUser,

    });

  } catch (error) {
    console.error("Update Error:", error);

    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};

/**
 * Forget password API
 * @description: This API is used if when user forget it's password
 * @route /api/auth/forget-password
 */
export const forgotPassword = async (
  req: Request,
  res: Response
) => {
  try {
    const { email } = req.body;

    // Check if email is provided
    if (!email) {
      return res.status(400).json({
        success: false,
        message: "Email is required",
      });
    }

    // Find user
    const user = await UserModel.findOne({ email });

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    // Generate reset token
    const resetToken = crypto.randomBytes(32).toString("hex");

    // Save token and expiry
    user.resetPasswordToken = resetToken;
    user.resetPasswordExpires = new Date(
      Date.now() + 15 * 60 * 1000 // 10 minutes
    );

    await user.save();

    // Send email
    await sendResetPasswordEmail(
      user.email,
      resetToken
    );

    return res.status(200).json({
      success: true,
      message: "Password reset email sent successfully",
    });

  } catch (error) {
    console.error("Forgot Password Error:", error);

    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};

/**
 * Reset Password API
 * @description: This API is used to reset the password
 * @route /api/auth/reset-password/token
 */
export const resetPassword = async (
  req: Request,
  res: Response
) => {
  try {

    const { token } = req.params;

    const { password } = req.body;
    const ValidPassword = resetPassValidation.safeParse(password)
    if (ValidPassword) {
      if (!password) {
        return res.status(400).json({
          success: false,
          message: "Password is required",
        });
      }

      // Find user with valid token
      const user = await UserModel.findOne({
        resetPasswordToken: token,
        resetPasswordExpires: {
          $gt: new Date(),
        },
      });

      if (!user) {
        return res.status(400).json({
          success: false,
          message: "Invalid or expired reset token",
        });
      }

      // Hash new password
      const hashedPassword = await bcrypt.hash(password, 10);
      user.password = hashedPassword;

      // Remove token
      user.resetPasswordToken = undefined;
      user.resetPasswordExpires = undefined;

      await user.save();
      // console.log("Result:------------->")
      return res.status(200).json({ success: true })
    }
  } catch (error) {

    console.error("Reset Password Error:", error);

    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};

/**
 * Delete API : 
 * @description: This API is used to delete the user's profile.
 * @route: api/auth/profile/:id
 */

export const deleteUser = async (
  req: Request,
  res: Response
) => {
  try {
    const userId = req.user._id;
    console.log("UserID at Delete API======", userId)

    const deletedUser = await UserModel.findByIdAndDelete(userId);

    if (!deletedUser) {
      console.log("User not deleted==>")
    }
    res.status(201).json({ success: true })
  } catch (err) {
    console.log("Error in deletion:", err)
  }
}

export const logout = async (req: Request, res: Response) => {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(401).json({
        success: false,
        message: "Authentication token is missing",
      });
    }

    const token = authHeader.split(" ")[1];

    await blacklistModel.create({ token });
    console.log("hi there")

    return res.status(200).json({
      success: true,
      message: "Logged out successfully",
    });
  } catch (err) {
    console.log("Logout Error:", err);

    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};