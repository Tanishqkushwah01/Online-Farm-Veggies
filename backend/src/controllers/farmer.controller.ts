import { Request, Response } from "express";
import UserModel from "../models/user.model";
import userValidation from "../types/user.validation"
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { FarmerModel } from "../models/farmer.model";
import ProductModel  from "../models/product.model";


export const createProduct = async (
  req: Request,
  res: Response
) => {
  try {
    const userId = req.user._id;

    const farmer = await FarmerModel.findOne({ userId });

    if (!farmer) {
      return res.status(404).json({
        success: false,
        message: "Farmer not found",
      });
    }

    const {
      productName,
      description,
      category,
      price,
      quantity,
      unit,
    } = req.body;

    const image = req.file?.path;

    const product = await ProductModel.create({
      farmerId: farmer._id,
      productName,
      description,
      category,
      price,
      quantity,
      unit,
      image,
    });

    return res.status(201).json({
      success: true,
      message: "Product created successfully.",
      data: product,
    });

  } catch (error) {
    console.log(error);

    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};





export const getFarmerProducts = async (
  req: Request,
  res: Response
) => {
  try {

    const userId = req.user._id;

    const farmer = await FarmerModel.findOne({ userId });

    if (!farmer) {
      return res.status(404).json({
        success: false,
        message: "Farmer not found",
      });
    }

    const products = await ProductModel.find({
      farmerId: farmer._id,
    });

    return res.status(200).json({
      success: true,
      count: products.length,
      data: products,
    });

  } catch (error) {

    console.log(error);

    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });

  }
};






export const updateProduct = async (
  req: Request,
  res: Response
) => {
  try {

    const { productId } = req.params;

    const updates = req.body;

    if (req.file) {
      updates.image = req.file.path;
    }

    const product = await ProductModel.findByIdAndUpdate(
      productId,
      updates,
      {
        new: true,
        runValidators: true,
      }
    );

    if (!product) {
      return res.status(404).json({
        success: false,
        message: "Product not found",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Product updated successfully.",
      data: product,
    });

  } catch (error) {

    console.log(error);

    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });

  }
};





export const deleteProduct = async (
  req: Request,
  res: Response
) => {
  try {

    const { productId } = req.params;

    const product = await ProductModel.findByIdAndDelete(productId);

    if (!product) {
      return res.status(404).json({
        success: false,
        message: "Product not found",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Product deleted successfully.",
    });

  } catch (error) {

    console.log(error);

    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });

  }
};