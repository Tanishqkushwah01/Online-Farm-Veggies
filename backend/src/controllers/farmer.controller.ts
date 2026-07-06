import { Request, Response } from "express";
import customerModel from "../models/customer.model";
// import userValidation from "../types/user.validation"
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import farmerModel from "../models/farmer.model";
import ProductModel from "../models/product.model";

/**
 * @POST Product Update Route
 * @description This API uses to update the product by the farmer.
 * @Route /api/product/:productId
 */


export const createProduct = async (req: Request, res: Response) => {
  try {
    console.log("User ID:", req.user._id);
    const UserId = req.user._id;

    // const farmer = await farmerModel.findOne({ _id: UserId });
    // console.log(farmer)
    // if (!farmer) {
    //   return res.status(404).json({
    //     success: false,
    //     message: "Farmer not found",
    //   });
    // }

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
      farmerId: UserId,
      productName,
      description,
      category,
      price,
      quantity,
      unit,
      image,
      city: req.user.city
    });

    const totalProducts = req.user.totalProducts + 1;

    await farmerModel.findByIdAndUpdate(
      req.user._id,
      {
        totalProducts,
      }
    );
    return res.status(201).json({
      success: true,
      message: "Product created successfully.",
      data: product,
      totalProducts // Increment the totalProducts count by 1
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
 * @GET Product Update Route
 * @description This API uses to update the product by the farmer.
 * @Route /api/product/products
 */

export const getFarmerProducts = async (
  req: Request,
  res: Response
) => {
  try {

    const userId = req.user._id;

    // const farmer = await farmerModel.findOne({ _id: userId });

    // if (!farmer) {
    //   return res.status(404).json({
    //     success: false,
    //     message: "Farmer not found",
    //   });
    // }

    const products = await ProductModel.find({
      farmerId: req.user._id,
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



/**
 * @PUT Product Update Route
 * @description This API uses to update the product by the farmer.
 * @Route /api/product/:productId
 */


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
        returnDocument: 'after',
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

/**
 * @DELETE Product Update Route
 * @description This API uses to update the product by the farmer.
 * @Route /api/product/:productId
 */



export const deleteProduct = async (req: Request, res: Response) => {
  try {
    const farmerId = req.user._id;
    const { productId } = req.params;

    const product = await ProductModel.findOneAndDelete({
      _id: productId,
      farmerId,
    });

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