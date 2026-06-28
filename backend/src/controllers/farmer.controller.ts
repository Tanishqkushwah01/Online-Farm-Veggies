import { FarmerModel } from "../models/farmer.model";
import jwt from "jsonwebtoken";
import { Request, Response } from "express"


/**
 * Profile Complete API : 
 * @description: This API completes the Farmer profile.
 * @route: api/farmer/complete-profile/
 */

export const farmerCompleteProfile = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const userId = req.user?._id;

    if (!userId) {
      res.status(401).json({
        success: false,
        message: "Unauthorized",
      });
      return;
    }
    const profileData = req.body;

    if (!profileData || Object.keys(profileData).length === 0) {
      res.status(400).json({
        success: false,
        message: "Profile data is required.",
      });
      return;
    }

    const farmer = await FarmerModel.findOneAndUpdate(
      { userId },              // Filter
      { $set:{ 
        ...profileData, 
        isProfileCompleted:true,
      },
      },   // Update
      {
        new: true,
        runValidators: true,
      }
    );

    if (!farmer) {
      res.status(404).json({
        success: false,
        message: "Farmer not found.",
      });
      return;
    }

    res.status(200).json({
      success: true,
      message: "Profile completed successfully.",
      data: farmer,

    });
  } catch (error) {
    console.error("Farmer Profile Error:", error);

    res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};



