// import { Request, Response, NextFunction } from "express";
// import jwt from "jsonwebtoken";
// import UserModel from "../models/user.model";

// export const isAuthenticated = async (
//   req: Request,
//   res: Response,
//   next: NextFunction
// ) => {
//   try {
//     // Get token from Authorization header
//     const authHeader = req.headers.authorization;

//     if (!authHeader || !authHeader.startsWith("Bearer ")) {
//       return res.status(401).json({
//         success: false,
//         message: "Authentication token is missing",
//       });
//     }

//     const token = authHeader.split(" ")[1];

//     // Verify token
//     const decoded = jwt.verify(token, process.env.JWT_SECRET!) as {
//       id: string;
//     };

//     // Find user
//     const user = await UserModel.findById(decoded.id);

//     if (!user) {
//       return res.status(404).json({
//         success: false,
//         message: "User not found",
//       });
//     }

//     // Attach user to request
//     req.user = user;

//     next();
//   } catch (error) {
//     return res.status(401).json({
//       success: false,
//       message: "Invalid or expired token",
//     });
//   }
// };

import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import customerModel from "../models/customer.model";
import blacklistModel from "../models/blacklist.model";
import farmerModel from "../models/farmer.model";

const authMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    // 1. Authorization header check
    const authHeader = req.headers.authorization;


    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(401).json({
        success: false,
        message: "Authentication token is missing",
      });
    }

    // 2. Token extract
    const token = authHeader.split(" ")[1];

    // 3. Blacklist check
    const blacklistedToken = await blacklistModel.findOne({ token });

    if (blacklistedToken) {
      return res.status(401).json({
        success: false,
        message: "Token is blacklisted. Please login again.",
      });
    }

    // 4. Verify JWT
    const decoded = jwt.verify(token, process.env.JWT_SECRET!) as {
      UserId: string;
      role: string;
    };
 let user : any
    // 5. User exists or not
    if (decoded.role === "farmer"){
     user = await farmerModel.findById(decoded.UserId);
    }

    else if(decoded.role === "customer"){
      user = await customerModel.findById(decoded.UserId);
    }

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }
 
    // 6. Attach user to request
    req.user = user;
 
console.log("Middleware user-->",req.user)
    next();
  
  } catch (error) {
    return res.status(401).json({
      success: false,
      message: "Invalid or expired token",
    });
  }
};

export default authMiddleware;