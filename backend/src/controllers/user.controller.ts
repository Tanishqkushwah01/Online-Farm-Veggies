import { Request, Response } from "express";
import customerModel from "../models/customer.model";
import farmerModel from "../models/farmer.model";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import crypto from "crypto";
import { sendVerificationEmail } from "../utilities/sendEmailVerification";
import { sendResetPasswordEmail } from "../utilities/resetpasswordemail";
import { sendVerificationMailToUser } from "../utilities/sendEmail";
import resetPassValidation from "../types/reset.password.validation";
import { sendChangePasswordEmail } from "../utilities/sendChangePassMail";
import blacklistModel from "../models/blacklist.model";
import farmerValidation from "../types/farmer.validation";
import customerValidation from "../types/customer.validation";
import signinValidation from "../types/signin.validation";
import  {googleClient}  from "../utilities/googleConfig";
import orderModel from "../models/order.model";
import productModel from "../models/product.model";
import productsReviewModel from "../models/productsReview.model";
import farmerReviewModel from "../models/farmerReview.model";
import wishlistModel from "../models/wishlist.model";
import notificationModel from "../models/notification.model";

/**
     * Register API
     * @description: This API is used to create a new user account
     * @route /api/auth/signup
*/

export const signup = async (req: Request, res: Response) => {
  try {
    const details = req.body;

    // Select validation by role
    const validationSchema =
      details.role === "Farmer" ? farmerValidation : customerValidation;

    const validUser = validationSchema.safeParse(details);
    console.log("validUser===", validUser)
    // Zod validation error response
    if (!validUser.success) {
      return res.status(400).json({
        success: false,
        message: "Validation failed",
        errors: validUser.error.issues.map((issue) => ({
          field: issue.path.join("."),
          message: issue.message,
        })),
      });
    }

    const validatedData = validUser.data;

    // Check duplicate email or phone in both models
    const [existingCustomer, existingFarmer] = await Promise.all([
      customerModel.findOne({
        $or: [
          { email: validatedData.email },
          { phoneNumber: validatedData.phoneNumber },
        ],
      }),
      farmerModel.findOne({
        $or: [
          { email: validatedData.email },
          { phoneNumber: validatedData.phoneNumber },
        ],
      }),
    ]);

    const existingUser = existingCustomer || existingFarmer;

    if (existingUser) {
      let field = "emailOrPhone";
      let message = "Email or phone number already exists";

      if (existingUser.email === validatedData.email) {
        field = "email";
        message = "Email already exists";
      }

      if (existingUser.phoneNumber === validatedData.phoneNumber) {
        field = "phoneNumber";
        message = "Phone number already exists";
      }

      return res.status(409).json({
        success: false,
        message,
        errors: [
          {
            field,
            message,
          },
        ],
      });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(validatedData.password, 10);

    // Verification token
    const verificationToken = crypto.randomBytes(32).toString("hex");

    let user: any;
    let isProfileCompleted: boolean | null = null;

    // Create Farmer
    if (validatedData.role === "Farmer") {
      user = await farmerModel.create({
        ...validatedData,
        password: hashedPassword,
        verificationToken,
        verificationTokenExpires: new Date(Date.now() + 30 * 60 * 1000),
        isVerified: false,
        isProfileCompleted: false,
      });

      isProfileCompleted = false;
    }

    // Create Customer
    if (validatedData.role === "Customer") {
      user = await customerModel.create({
        ...validatedData,
        password: hashedPassword,
        verificationToken,
        verificationTokenExpires: new Date(Date.now() + 30 * 60 * 1000),
        isVerified: false,
      });

      isProfileCompleted = null;
    }
    // console.log("user==", user);
    // Send verification email
    const emailSent = await sendVerificationMailToUser(validatedData.email, validatedData.role);
    console.log("emailSent==", emailSent);

    if (!emailSent) {
      return res.status(500).json({
        success: false,
        message: "Verification email could not be sent",
      });
    }

    // JWT token
    const token = jwt.sign(
      {
        UserId: user._id,
        role: user.role,
      },
      process.env.JWT_SECRET!,
      {
        expiresIn: "7d",
      }
    );
    const userObj = user.toObject();

    delete userObj.password;
    delete userObj.isVerified;
    delete userObj.verificationToken;
    delete userObj.verificationTokenExpires;
    delete userObj.resetPasswordToken;
    delete userObj.resetPasswordExpires;

    // console.log("userObj::", userObj);
    return res.status(201).json({
      success: true,
      message: "Registration successful",
      user: userObj,
      token,
    });
  } catch (error: any) {
    console.error("Signup Error:", error);

    if (error.code === 11000) {
      const field = Object.keys(error.keyPattern || {})[0] || "unknown";

      return res.status(409).json({
        success: false,
        message: `${field} already exists`,
        errors: [
          {
            field,
            message: `${field} already exists`,
          },
        ],
      });
    }

    if (error.name === "ValidationError") {
      return res.status(400).json({
        success: false,
        message: "Mongoose validation failed",
        errors: Object.keys(error.errors).map((field) => ({
          field,
          message: error.errors[field].message,
        })),
      });
    }

    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};

/**
     * Login API
     * @description: This API is used to login a user.
     * @route /api/auth/signup
*/

// export const signin = async (req: Request, res: Response) => {
//   try {
//     const validatedData = signinValidation.safeParse(req.body);

//     if (!validatedData.success) {
//       return res.status(400).json({
//         success: false,
//         message: validatedData.error.issues[0].message,
//         errors: validatedData.error.flatten().fieldErrors,
//       });
//     }

//     const { email, phoneNumber, password } = validatedData.data;

//     const query = email ? { email } : { phoneNumber };

//     let user: any = await customerModel.findOne(query);

//     if (!user) {
//       user = await farmerModel.findOne(query);
//     }

//     if (!user) {
//       return res.status(404).json({
//         success: false,
//         message: email
//           ? "No account found with this email"
//           : "No account found with this phone number",
//       });
//     }

//     const isPasswordCorrect = await bcrypt.compare(password, user.password);

//     if (!isPasswordCorrect) {
//       return res.status(401).json({
//         success: false,
//         message: "Invalid password",
//       });
//     }

//     if (!user.isVerified) {
//       return res.status(403).json({
//         success: false,
//         message: "Please verify your email first",
//       });
//     }

//     if (!process.env.JWT_SECRET) {
//       return res.status(500).json({
//         success: false,
//         message: "JWT secret is missing",
//       });
//     }

//     const token = jwt.sign(
//       {
//         UserId: user._id,
//         role: user.role,
//       },
//       process.env.JWT_SECRET,
//       {
//         expiresIn: "7d",
//       }
//     );

//     const isProfileCompleted =
//       user.role === "Farmer" ? user.isProfileCompleted || false : null;

//     const userObj = user.toObject();

//     // Remove sensitive fields
//     delete userObj.password;
//     delete userObj.isVerified;
//     delete userObj.verificationToken;
//     delete userObj.verificationTokenExpires;
//     delete userObj.resetPasswordToken;
//     delete userObj.resetPasswordExpires;

//     // console.log("userObj::", userObj);

//     return res.status(200).json({
//       success: true,
//       message: "Login successful",
//       user: userObj,
//       token,
//     });

//   } catch (error) {
//     console.error("Signin Error:", error);

//     return res.status(500).json({
//       success: false,
//       message: "Internal server error",
//     });
//   }
// };

export const signin = async (req: Request, res: Response) => {
  try {
    const validatedData = signinValidation.safeParse(req.body);

    if (!validatedData.success) {
      return res.status(400).json({
        success: false,
        message: validatedData.error.issues[0].message,
        errors: validatedData.error.flatten().fieldErrors,
      });
    }

    const { email, phoneNumber, password } = validatedData.data;

    const query = email ? { email } : { phoneNumber };

    let user: any = await customerModel.findOne(query);
    let userType: "Customer" | "Farmer" = "Customer";

    if (!user) {
      user = await farmerModel.findOne(query);
      userType = "Farmer";
    }

    if (!user) {
      return res.status(404).json({
        success: false,
        message: email
          ? "No account found with this email"
          : "No account found with this phone number",
      });
    }

    const isPasswordCorrect = await bcrypt.compare(password, user.password);

    if (!isPasswordCorrect) {
      return res.status(401).json({
        success: false,
        message: "Invalid password",
      });
    }

    if (!user.isVerified) {
      return res.status(403).json({
        success: false,
        message: "Please verify your email first",
      });
    }

    if (!process.env.JWT_SECRET) {
      return res.status(500).json({
        success: false,
        message: "JWT secret is missing",
      });
    }

    const previousLogin = user.lastLogin || null;

    if (userType === "Farmer") {
      await farmerModel.findByIdAndUpdate(user._id, {
        lastLogin: new Date(),
      });
    }

    const token = jwt.sign(
      {
        UserId: user._id,
        role: user.role,
      },
      process.env.JWT_SECRET,
      {
        expiresIn: "7d",
      }
    );

    const userObj = user.toObject();

    if (userType === "Farmer") {
      userObj.lastLogin = previousLogin;
    }

    delete userObj.password;
    delete userObj.isVerified;
    delete userObj.verificationToken;
    delete userObj.verificationTokenExpires;
    delete userObj.resetPasswordToken;
    delete userObj.resetPasswordExpires;

    return res.status(200).json({
      success: true,
      message: "Login successful",
      user: userObj,
      token,
    });
  } catch (error) {
    console.error("Signin Error:", error);

    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

/**
     * Google Login API
     * @description: This API is used to login a user with it's google credentials.
     * @route /api/auth/`google?code=${code}`
*/

// pk ka hai 
// export const googleLogin = async (  req: Request,  res: Response) => {
//   try {
//     const { code } = req.body;

//     if (!code) {
//       return res.status(400).json({
//         success: false,
//         message: "Authorization code is required",
//       });
//     }

//     // Exchange authorization code
//     const { tokens } = await googleClient.getToken(code);

//     googleClient.setCredentials(tokens);

//     // Verify Google ID token
//     const ticket = await googleClient.verifyIdToken({
//       idToken: tokens.id_token!,
//       audience: process.env.GOOGLE_CLIENT_ID,
//     });

//     const payload = ticket.getPayload();

//     if (!payload) {
//       return res.status(401).json({
//         success: false,
//         message: "Invalid Google token",
//       });
//     }

//     const {
//       email,
//       name,
//       picture,
//       email_verified,
//     } = payload;

//     if (!email_verified) {
//       return res.status(401).json({
//         success: false,
//         message: "Email is not verified by Google",
//       });
//     }

//     // Search Customer
//     let user: any = await customerModel.findOne({ email });
//     let role = "Customer";

//     // Search Farmer
//     if (!user) {
//       user = await farmerModel.findOne({ email });
//       role = "Farmer";
//     }

//     // If user doesn't exist
//     if (!user) {
//       user = await customerModel.create({
//         username: name,
//         email,
//         profilePicture: picture,
//         password: "",
//         isVerified: true,
//         role: "Customer"
//       });

//       role = "Customer";
//     }

//     // Generate JWT
//     const token = jwt.sign(
//       {
//         UserId: user._id,
//         role,
//       },
//       process.env.JWT_SECRET!,
//       {
//         expiresIn: "7d",
//       }
//     );

//     return res.status(200).json({
//       success: true,
//       message: "Google login successful",
//       token,
//       user: {
//         _id: user._id,
//         username: user.username,
//         email: user.email,
//         profilePicture: user.profilePicture,
//         role,
//       },
//     });

//   } catch (error: any) {
//     console.error("Google Login Error:", error);

//     return res.status(500).json({
//       success: false,
//       message: "Google Login Failed",
//     });
//   }
// };


// mera hai 
export const googleLogin = async (req: Request, res: Response) => {
  try {
    const { code } = req.body;

    if (!code) {
      return res.status(400).json({
        success: false,
        message: "Authorization code is required",
      });
    }

    const { tokens } = await googleClient.getToken(code);
    googleClient.setCredentials(tokens);

    const ticket = await googleClient.verifyIdToken({
      idToken: tokens.id_token!,
      audience: process.env.GOOGLE_CLIENT_ID,
    });

    const payload = ticket.getPayload();

    if (!payload) {
      return res.status(401).json({
        success: false,
        message: "Invalid Google token",
      });
    }

    const { email, name, picture, email_verified } = payload;

    if (!email_verified) {
      return res.status(401).json({
        success: false,
        message: "Email is not verified by Google",
      });
    }

    let user: any = await customerModel.findOne({ email });
    let userType: "Customer" | "Farmer" = "Customer";

    if (!user) {
      user = await farmerModel.findOne({ email });
      userType = "Farmer";
    }

    if (!user) {
      user = await customerModel.create({
        username: name,
        email,
        profilePicture: picture,
        password: "",
        isVerified: true,
        role: "Customer",
      });

      userType = "Customer";
    }

    const previousLogin = user.lastLogin || null;

    if (userType === "Farmer") {
      await farmerModel.findByIdAndUpdate(user._id, {
        lastLogin: new Date(),
      });
    }

    if (!process.env.JWT_SECRET) {
      return res.status(500).json({
        success: false,
        message: "JWT secret is missing",
      });
    }

    const token = jwt.sign(
      {
        UserId: user._id,
        role: user.role,
      },
      process.env.JWT_SECRET,
      {
        expiresIn: "7d",
      }
    );

    const userObj = user.toObject();

    if (userType === "Farmer") {
      userObj.lastLogin = previousLogin;
    }

    delete userObj.password;
    delete userObj.isVerified;
    delete userObj.verificationToken;
    delete userObj.verificationTokenExpires;
    delete userObj.resetPasswordToken;
    delete userObj.resetPasswordExpires;

    return res.status(200).json({
      success: true,
      message: "Google login successful",
      token,
      user: userObj,
    });
  } catch (error: any) {
    console.error("Google Login Error:", error);

    return res.status(500).json({
      success: false,
      message: "Google Login Failed",
    });
  }
};

/**
     * Resend Email API
     * @description: This API is used by client to resend their email to the backend.
     * @route /api/auth/resend-email
*/

export const resendVerificationEmail = async (  req: Request,  res: Response) => {
  try {
    const { email } = req.body;

    // Search in Customer Collection
    let user: any = await customerModel.findOne({ email });

    // If not found, search in Farmer Collection
    if (!user) {
      user = await farmerModel.findOne({ email });
    }

    // User not found
    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    // Already verified
    if (user.isVerified) {
      return res.status(400).json({
        success: false,
        message: "Email is already verified",
      });
    }

    // Generate new verification token
    const verificationToken = crypto.randomBytes(32).toString("hex");

    user.verificationToken = verificationToken;
    user.verificationTokenExpires = new Date(
      Date.now() + 30 * 60 * 1000
    );

    await user.save();

    // Send verification email
    await sendVerificationEmail(
      user.email,
      verificationToken
    );

    return res.status(200).json({
      success: true,
      message: "Verification email sent successfully",
    });

  } catch (error: any) {
    console.error("Resend Verification Error:", error);

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

    let user: any = await customerModel.findOne({
      verificationToken: token,
      verificationTokenExpires: { $gt: new Date() },
    });

    if (!user) {
      user = await farmerModel.findOne({
        verificationToken: token,
        verificationTokenExpires: { $gt: new Date() },
      });
    }

    if (!user) {
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

export const updateUser = async (  req: Request,  res: Response) => {
  try {
    const userId = req.user._id;
    const role = req.user.role;

    const {
      username,
      phoneNumber,
      city,
      address,
      farmName,
      farmAddress,
      mainCrops,
      bio,
      removeProfilePicture,
    } = req.body;

    const profilePicture = req.file?.path;

    const cleanObject = (obj: Record<string, any>) => {
      Object.keys(obj).forEach((key) => {
        if (obj[key] === undefined || obj[key] === "") {
          delete obj[key];
        }
      });

      return obj;
    };

    const parseMainCrops = (crops: any) => {
      if (crops === undefined) return undefined;

      if (Array.isArray(crops)) return crops;

      return crops
        .split(",")
        .map((crop: string) => crop.trim())
        .filter(Boolean);
    };

    let updatedUser: any;

    // ---------------- CUSTOMER ----------------

    if (role === "Customer") {
      const customerUpdates = cleanObject({
        username,
        phoneNumber,
        city,
        address,
        bio,
      });

      if (removeProfilePicture === "true") {
        customerUpdates.profilePicture = "";
      } else if (profilePicture) {
        customerUpdates.profilePicture = profilePicture;
      }

      updatedUser = await customerModel
        .findByIdAndUpdate(
          userId,
          { $set: customerUpdates },
          {
            new: true,
            runValidators: true,
          }
        )
        .select(
          "-password -verificationToken -verificationTokenExpires -resetPasswordToken -resetPasswordExpires"
        );

      if (!updatedUser) {
        return res.status(404).json({
          success: false,
          message: "Customer not found",
        });
      }

      updatedUser.isProfileCompleted = Boolean(
        updatedUser.username &&
          updatedUser.phoneNumber &&
          updatedUser.city &&
          updatedUser.address
      );

      await updatedUser.save();

      return res.status(200).json({
        success: true,
        message: "Profile updated successfully.",
        userInfo: updatedUser,
      });
    }

    // ---------------- FARMER ----------------

    const farmerUpdates = cleanObject({
      username,
      phoneNumber,
      city,
      farmName,
      farmAddress,
      bio,
      mainCrops: parseMainCrops(mainCrops),
    });

    if (removeProfilePicture === "true") {
      farmerUpdates.profilePicture = "";
    } else if (profilePicture) {
      farmerUpdates.profilePicture = profilePicture;
    }

    updatedUser = await farmerModel
      .findByIdAndUpdate(
        userId,
        { $set: farmerUpdates },
        {
          new: true,
          runValidators: true,
        }
      )
      .select(
        "-password -verificationToken -verificationTokenExpires -resetPasswordToken -resetPasswordExpires"
      );

    if (!updatedUser) {
      return res.status(404).json({
        success: false,
        message: "Farmer not found",
      });
    }

    updatedUser.isProfileCompleted = Boolean(
      updatedUser.username &&
        updatedUser.phoneNumber &&
        updatedUser.city &&
        updatedUser.farmName &&
        updatedUser.farmAddress &&
        updatedUser.mainCrops &&
        updatedUser.mainCrops.length > 0
    );

    await updatedUser.save();

    return res.status(200).json({
      success: true,
      message: "Profile updated successfully.",
      userInfo: updatedUser,
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

export const forgotPassword = async (  req: Request,  res: Response) => {
  try {
    const { email } = req.body;

    if (!email) {
      return res.status(400).json({
        success: false,
        message: "Email is required",
      });
    }

    // Search Customer
    let user: any = await customerModel.findOne({ email });

    // If not found, search Farmer
    if (!user) {
      user = await farmerModel.findOne({ email });
    }

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    // Generate Reset Token
    const resetToken = crypto.randomBytes(32).toString("hex");

    // Save Token & Expiry
    user.resetPasswordToken = resetToken;
    user.resetPasswordExpires = new Date(
      Date.now() + 15 * 60 * 1000
    );

    await user.save();

    // Send Reset Password Email
    await sendResetPasswordEmail(
      user.email,
      resetToken
    );

    return res.status(200).json({
      success: true,
      message: "Password reset email sent successfully",
    });

  } catch (error: any) {
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

export const resetPassword = async (  req: Request,  res: Response) => {
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
      let user: any = await customerModel.findOne({
        resetPasswordToken: token,
        resetPasswordExpires: {
          $gt: new Date(),
        },
      });

      if (!user) {
        user = await farmerModel.findOne({
          resetPasswordToken: token,
          resetPasswordExpires: {
            $gt: new Date(),
          }
        });
      }

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

export const deleteUser = async (req: Request, res: Response) => {
  try {
    const userId = req.user._id;
    const role = req.user.role;

    if (role === "Customer") {
      const customerOrders = await orderModel.find({
        customerId: userId,
        orderStatus: "Accepted",
      });

      for (const order of customerOrders) {
        const product = await productModel.findById(order.productId);

        if (product) {
          product.quantity += order.quantity;
          product.isAvailable = product.quantity > 0;
          await product.save();
        }
      }

      await orderModel.deleteMany({ customerId: userId });

      await productsReviewModel.deleteMany({ customerId: userId });

      await farmerReviewModel.deleteMany({ customerId: userId });

      await wishlistModel.deleteMany({ customerId: userId });

      await notificationModel.deleteMany({
        receiverId: userId,
        receiverRole: "Customer",
      });

      const deletedUser = await customerModel.findByIdAndDelete(userId);

      if (!deletedUser) {
        return res.status(404).json({
          success: false,
          message: "Customer not found",
        });
      }

      return res.status(200).json({
        success: true,
        message: "Customer account deleted successfully",
      });
    }

    if (role === "Farmer") {
      const farmerProducts = await productModel
        .find({ farmerId: userId })
        .select("_id");

      const productIds = farmerProducts.map((product) => product._id);

      await orderModel.deleteMany({
        farmerId: userId,
      });

      await productsReviewModel.deleteMany({
        productId: { $in: productIds },
      });

      await farmerReviewModel.deleteMany({
        farmerId: userId,
      });

      await wishlistModel.deleteMany({
        productId: { $in: productIds },
      });

      await wishlistModel.updateMany(
        {},
        {
          $pull: {
            products: { $in: productIds },
            wishlistProducts: { $in: productIds },
          },
        }
      );

      await notificationModel.deleteMany({
        receiverId: userId,
        receiverRole: "Farmer",
      });

      await productModel.deleteMany({
        farmerId: userId,
      });

      const deletedUser = await farmerModel.findByIdAndDelete(userId);

      if (!deletedUser) {
        return res.status(404).json({
          success: false,
          message: "Farmer not found",
        });
      }

      return res.status(200).json({
        success: true,
        message: "Farmer account deleted successfully",
      });
    }

    return res.status(400).json({
      success: false,
      message: "Invalid user role",
    });
  } catch (error) {
    console.error("Delete User Error:", error);

    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};

/**
 * Change Password API : 
 * @description: This API used to change the password of requested user.
 * @route: api/auth/change-password
 */

export const requestChangePassword = async (  req: Request,  res: Response) => {
  try {
    // const userId = req.user._id;
    const { password } = req.body;

  // Verify current password
    const isMatch = await bcrypt.compare(password, req.user.password);

    if (!isMatch) {
      return res.status(400).json({
        success: false,
        message: "Current password is incorrect",
      });
    }

    // Generate reset token
    const resetToken = crypto.randomBytes(32).toString("hex");

    req.user.resetPasswordToken = resetToken;
    req.user.resetPasswordExpires = new Date(
      Date.now() + 15 * 60 * 1000
    );

    await req.user.save();

    // Send change password email
    await sendChangePasswordEmail(
      req.user.email,
      resetToken
    );

    return res.status(200).json({
      success: true,
      message: "Password change link sent successfully",
    });

  } catch (error: any) {
    console.error("Request Change Password Error:", error);

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

export const verifyDeletePassword = async (req: Request,res: Response) => {
  try {
    const { password } = req.body;
  
    // Compare Password
    const isMatch = await bcrypt.compare(
      password,
      req.user.password
    );

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

  } catch (error: any) {
    console.error("Verify Delete Password Error:", error);

    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};