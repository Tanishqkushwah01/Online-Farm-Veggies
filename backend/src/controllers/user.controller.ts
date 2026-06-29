import { Request, Response } from "express";
import UserModel from "../models/user.model";
import userValidation from "../types/user.validation"
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import crypto from "crypto";
import { sendVerificationEmail } from "../utilities/sendEmailVerification";
import { sendResetPasswordEmail } from "../utilities/resetpasswordemail";
import { sendVerificationMailToUser } from "../utilities/sendEmail";
import resetPassValidation from "../types/reset.password.validation";
import { FarmerModel } from "../models/farmer.model";
import { sendChangePasswordEmail } from "../utilities/sendChangePassMail";
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

      //If Farmer, creates Farmer Profile.
      if (User.role === "Farmer") {
        await FarmerModel.create({ userId: User._id, isProfileCompleted: false })
      }
      console.log("User email:", User.email)

      let isProfileCompleted: boolean | null = null;

if (User.role === "Farmer") {
  const farmer = await FarmerModel.findOne({
    userId: User._id,
  });

  isProfileCompleted = farmer?.isProfileCompleted ?? false;
}
      // Send verification email
      const result = await sendVerificationMailToUser(User.email);

      if (!result) {
        return res.status(301).json({ msg: "Verification of mail not .........." })
      }

      const token = jwt.sign(
        { UserId: User._id },
        process.env.JWT_SECRET!,
        {
          expiresIn: "7d",
        });
     return res.status(201).json({
  msg: "registered",
  User: {
    email: User.email,
    username: User.username,
    role: User.role,
    phoneNumber: User.phoneNumber,
  },
  isProfileCompleted,
  token,
});
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
    const { email, password } = req.body;
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
    let isProfileCompleted = null;

    if (userExist.role === "Farmer") {
      const farmer = await FarmerModel.findOne({
        userId: userExist._id,
      });

      isProfileCompleted = farmer?.isProfileCompleted ?? false;
    }
    res.status(201).json({
      msg: "LoggedIn", userExist: {
        email: userExist.email,
        username: userExist.username,
        role: userExist.role,
        phoneNumber: userExist.phoneNumber,
        profilePicture: userExist.profilePicture,
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

    // User Fields
    const {
      username,
      phoneNumber,
      // Farmer Fields
      farmName,
      shopName,
      farmAddress,
      mainCrops,

    } = req.body;

    // Image uploaded through multer
    const profilePicture = req.file?.path;

    console.log("username:", username);
    console.log("phoneNumber:", phoneNumber);
    // console.log("address:", address);

    console.log("farmName:", farmName);
    // console.log("shopName:", shopName);
    console.log("farmAddress:", farmAddress);
    console.log("mainCrops:", mainCrops);

    console.log("profilePicture:", profilePicture);

    console.log("req.body:", req.body);
    console.log("req.file:", req.file);

    // ----------------------------
    // Update User
    // ----------------------------

    const userUpdates: any = {};

    if (username) userUpdates.username = username;
    if (phoneNumber) userUpdates.phoneNumber = phoneNumber;


    if (profilePicture) {
      userUpdates.profilePicture = profilePicture;
    }

    const updatedUser = await UserModel.findByIdAndUpdate(
      userId,
      {
        $set: userUpdates,
      },
      {
        new: true,
        runValidators: true,
      }
    ).select("-password -verificationToken -resetPasswordToken");

    if (!updatedUser) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    // ----------------------------
    // Update Farmer
    // ----------------------------

    const farmerUpdates: any = {};

    if (farmName) farmerUpdates.farmName = farmName;

    if (shopName) farmerUpdates.shopName = shopName;

    if (farmAddress) farmerUpdates.farmAddress = farmAddress;

    if (mainCrops) farmerUpdates.mainCrops = mainCrops;

    // if (experience) farmerUpdates.experience = experience;

    // If profile picture is stored in Farmer collection also
    if (profilePicture) {
      farmerUpdates.profilePicture = profilePicture;
    }

    // Check if all required fields are completed
    const isProfileCompleted =
      farmName &&
      shopName &&
      farmAddress &&
      mainCrops &&
      mainCrops.length > 0;

    farmerUpdates.isProfileCompleted = Boolean(isProfileCompleted);

    const updatedFarmer = await FarmerModel.findOneAndUpdate(
      {
        userId,
      },
      {
        $set: farmerUpdates,
      },
      {
        new: true,
        runValidators: true,
      }
    );

    return res.status(200).json({
      success: true,
      message: "Profile updated successfully.",
      user: updatedUser,
      farmer: updatedFarmer,
    });
  } catch (error: any) {
    console.error("Update Profile Error:", error);

    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
      error: error.message,
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

    const deletedUser = await UserModel.findByIdAndDelete(userId);

    if (!deletedUser) {
      console.log("User not deleted==>")
      return res.status(201).json({ success: false, msg: "User not deleted" });
    }
    res.status(201).json({ success: true })
  } catch (err) {
    console.log("Error in deletion:", err)
    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
}

/**
 * Change Password API : 
 * @description: This API used to change the password of requested user.
 * @route: api/auth/change-password
 */
export const requestChangePassword = async (
  req: Request,
  res: Response
) => {
  try {
    const userId = req.user._id;

    const { email, phoneNumber, password } = req.body;
    console.log("3 things to know ===", email, phoneNumber, password)
    let user;

    if (email) {
      user = await UserModel.findOne({ _id: userId, email });
    } else if (phoneNumber) {
      user = await UserModel.findOne({ _id: userId, phoneNumber });
    } else {
      return res.status(400).json({
        message: "Email or Phone Number is required",
      });
    }

    if (!user) {
      return res.status(400).json({
        message: "User not found",
      });
    }

    // Verify current password
    const isMatch = await bcrypt.compare(
      password,
      user.password
    );

    if (!isMatch) {
      return res.status(400).json({
        success: false,
        message: "Current password is incorrect",
      });
    }

    // Generate Token
    const resetToken = crypto
      .randomBytes(32)
      .toString("hex");

    user.resetPasswordToken = resetToken;

    user.resetPasswordExpires = new Date(
      Date.now() + 15 * 60 * 1000
    );

    await user.save();

    // Send Mail
    await sendChangePasswordEmail(
      user.email,
      resetToken
    );

    return res.status(200).json({
      success: true,
      message:
        "Password change link sent successfully",
    });
  } catch (error) {
    console.log(error);

    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};

/**
 * Logout API : 
 * @description: This API Logs Out the user and blacklists the token of user which created at the time of signup or signin.
 * @route: api/auth/logout
 */

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
  } catch (err: any) {
    console.log("Logout Error:", err);

    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};

/**
 * Verifying Delete API : 
 * @description: This API checks the password of requested user and if pass matches then the user is deleted.
 * @route: api/auth/verify-delete-password

 */
export const verifyDeletePassword = async (
  req: Request,
  res: Response
) => {

  try {
    const { password } = req.body;
    const userId = req.user.id;
    const user = await UserModel.findById(userId);

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(400).json({
        success: false,
        message: "Incorrect password",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Password verified",
    });
  } catch (err: any) {
    console.log("Logout Error:", err);

    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};


