import { Request, Response } from "express";
import productModel from "../models/product.model";
import  farmerModel from "../models/farmer.model";
import reviewModel from "../models/ReviewModel";
import wishlistModel from "../models/wishlist.model";
import mongoose from "mongoose";




// // Get All Products with Pagination and Filters.
// export const getAllProducts = async (
//     req: Request,
//     res: Response
// ): Promise<any> => {
//     try {

//         const {
//             search,
//             city,
//             page = "1",
//             limit = "10"
//         } = req.query;

//         const currentPage = Number(page);
//         const pageLimit = Number(limit);
//         const skip = (currentPage - 1) * pageLimit;

//         // Dynamic Filter
//         const filter: any = {};

//         // Search by Product Name
//         if (search) {
//             filter.name = {
//                 $regex: "^" + search,
//                 $options: "i"
//             };
//         }

//         // Filter by City
//         if (city) {
//             filter.city = {
//                 $regex: city,
//                 $options: "i"
//             };
//         }

//         const products = await productModel
//             .find(filter)
//             .populate({
//                 path: "farmerId",
//                 select: "farmName city"
//             })
//             .skip(skip)
//             .limit(pageLimit)
//             .sort({ createdAt: -1 });

//         const totalProducts = await productModel.countDocuments(filter);

//         return res.status(200).json({
//             success: true,
//             currentPage,
//             totalPages: Math.ceil(totalProducts / pageLimit),
//             totalProducts,
//             products
//         });

//     } catch (error: any) {

//         return res.status(500).json({
//             success: false,
//             message: error.message
//         });
//     }
// };


// // Get All Products of a Specific Farmer
// export const getFarmerProducts = async (
//     req: Request,
//     res: Response
// ): Promise<any> => {
//     try {

//         const { farmerId } = req.params;

//         const farmer = await farmerModel.findById(farmerId);

//         if (!farmer) {
//             return res.status(404).json({
//                 success: false,
//                 msg: "Farmer not found"
//             });
//         }

//         const products = await productModel.find({
//             farmerId: farmerId
//         });

//         return res.status(200).json({
//             success: true,
//             farmer,
//             totalProducts: products.length,
//             products
//         });

//     } catch (error: any) {

//         return res.status(500).json({
//             success: false,
//             msg: error.message
//         });

//     }
// };

// // Get Specific Product Details
// export const getProductDetails = async (
//     req: Request,
//     res: Response
// ) => {
//     try {
//         const { productId } = req.params;

//         const product = await productModel.findById(productId)
//         .populate({
//             path:"farmerId",
//             select:"farmName city bio farmName mainCrops farmAddress"
//         });

//         if (!product) {
//             return res.status(404).json({
//                 success: false,
//                 msg: "Product not found"
//             });
//         }

//         return res.status(200).json({
//             success: true,
//             msg: "Product Found",
//             data: product
//         });
//     }
//     catch (err) {
//         console.log(err);
//         res.status(500).json({  

//             success: false,
//             msg: "Internal Server Error"


//         })
// }
// }


// // Get Farmer Profile
// export const getFarmerProfile = async (
//     req: Request,
//     res: Response
// ) => {
//     try {
//         const { farmerId } = req.params;
//         const farmer = await farmerModel.findById(farmerId);

//         if (!farmer) {
//             return res.status(404).json({
//                 success: false,
//                 msg: "Farmer not found"
//             });
//         }

//         return res.status(200).json({
//             success: true,
//             msg: "Farmer Found",
//             data: farmer
//         });
//     } catch (err) {
//         console.log(err);
//         res.status(500).json({
//             success: false,
//             msg: "Internal Server Error"
//         });
//     }
// };



// // Posting a review for a product
// export const postReview = async (
//     req: Request,
//     res: Response
// ) => {
//     try {
//         const { productId } = req.params;
//         const userId = req.user._id; // Assuming you have user authentication and the user ID is available in req.user
//         const { rating, review } = req.body;

//         const product = await productModel.findById(productId);

//         if (!product) {
//             return res.status(404).json({
//                 success: false,
//                 msg: "Product not found"
//             });
//         }

//         const comments = new ReviewModel({
//             customerId:userId,
//             productId,
//             rating,
//             review
//         });

//         await comments.save();

//         return res.status(201).json({
//             success: true,
//             msg: "Review posted successfully",
//             data: comments
//         });
//     } catch (err) {
//         console.log(err);
//         res.status(500).json({
//             success: false,
//             msg: "Internal Server Error"
//         });
//     }
// };




// // get product reviews
// export const getProductReviews = async (
//     req: Request,
//     res: Response
// ): Promise<any> => {

//     try {

//         const { productId } = req.params;

//         const reviews = await ReviewModel.find({
//             productId
//         })
//         .populate({
//             path: "customerId",
//             select: "username name profileImage"
//         })
//         .sort({
//             // latest reviews first
//             createdAt: -1
//         });

//         return res.status(200).json({
//             success: true,
//             totalReviews: reviews.length,
//             reviews
//         });

//     } catch (error: any) {

//         return res.status(500).json({
//             success: false,
//             message: error.message
//         });

//     }

// };

// // Posting a review for a farmer
// export const postFarmerReview = async (
//     req: Request,       
//     res: Response
// ) => {
//     try {
//         const { farmerId } = req.params;
//         const userId = req.user._id; // Assuming you have user authentication and the user ID is available in req.user
//         const { rating, review } = req.body;
//         const farmer = await farmerModel.findById(farmerId);

//         if (!farmer) {
//             return res.status(404).json({
//                 success: false,
//                 msg: "Farmer not found"
//             });
//         }   

//         const comments = new ReviewModel({
//             customerId:userId,
//             farmerId,
//             rating,
//             review
//         });
//         await comments.save();

//         return res.status(201).json({
//             success: true,
//             msg: "Review posted successfully",
//             data: comments
//         });
//     } catch (err) {
//         console.log(err);
//         res.status(500).json({
//             success: false,
//             msg: "Internal Server Error"
//         });
//     }
// };


// // Get All Reviews of a Specific Farmer
// export const getFarmerReviews = async (
//     req: Request,
//     res: Response
// ): Promise<any> => {

//     try {

//         const { farmerId } = req.params;
//         const reviews = await ReviewModel.find({
//             farmerId
//         })
//         .populate({
//             path: "customerId",
//             select: "username name profileImage"
//         })
//         .sort({
//             // latest reviews first
//             createdAt: -1
//         });

//         return res.status(200).json({
//             success: true,
//             totalReviews: reviews.length,
//             reviews
//         });

//     } catch (error: any) {

//         return res.status(500).json({
//             success: false,
//             message: error.message
//         });

//     }

// };




// // Add product to wishlist
export const toggleWishlist = async (req: Request, res: Response) => {
  try {
    const customerId = req.user._id;
    const productIdParam = req.params.productId;

    const productId = Array.isArray(productIdParam)
      ? productIdParam[0]
      : productIdParam;

    if (req.user.role !== "Customer") {
      return res.status(403).json({
        success: false,
        message: "Only customers can use wishlist",
      });
    }

    if (!mongoose.Types.ObjectId.isValid(productId)) {
      return res.status(400).json({
        success: false,
        message: "Invalid product id",
      });
    }

    const productObjectId = new mongoose.Types.ObjectId(productId);

    const product = await productModel.findById(productObjectId);

    if (!product) {
      return res.status(404).json({
        success: false,
        message: "Product not found",
      });
    }

    const wishlistAlreadyExists = await wishlistModel.findOne({
      customerId,
      productId: productObjectId,
    });

    if (wishlistAlreadyExists) {
      await wishlistModel.findByIdAndDelete(wishlistAlreadyExists._id);

      return res.status(200).json({
        success: true,
        message: "Product removed from wishlist",
        isWishlisted: false,
      });
    }

    const wishlist = await wishlistModel.create({
      customerId,
      productId: productObjectId,
    });

    return res.status(201).json({
      success: true,
      message: "Product added to wishlist",
      isWishlisted: true,
      wishlist,
    });
  } catch (error) {
    console.log(error);

    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};

// // Get products in wishlist

export const getWishlist = async (req: Request, res: Response) => {
  try {
    const customerId = req.user._id;

    const wishlist = await wishlistModel.find({ customerId }).populate(
      "productId"
    );

    return res.status(200).json({
      success: true,
      wishlist,
    });
  } catch (error) {
    console.log(error);

    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};


// export const getWishlist = async (
//   req: Request,
//   res: Response
// ) => {
//   try {
//     const customerId = req.user._id;

//     // Only Customer can access wishlist
//     if (req.user.role !== "Customer") {
//       return res.status(403).json({
//         success: false,
//         message: "Only customers can access wishlist",
//       });
//     }

//     const wishlist = await wishlistModel
//       .find({ customerId })
//       .populate({
//         path: "productId",
//         populate: {
//           path: "farmerId",
//           select: "farmName city profilePicture",
//         },
//       });

//     return res.status(200).json({
//       success: true,
//       totalItems: wishlist.length,
//       wishlist,
//     });

//   } catch (error: any) {
//     console.error("Get Wishlist Error:", error);

//     return res.status(500).json({
//       success: false,
//       message: "Internal Server Error",
//     });
//   }
// };




export const getTenProducts  = async (req: Request, res: Response) => {
 try {
    const products = await productModel.aggregate([
      {
        $match: {
          quantity: { $gt: 0 }, // sirf available products
        },
      },
      {
        $sample: {
          size: 10,
        },
      },
    ]);

    return res.status(200).json({
      success: true,
      products,
    });
  } catch (error) {
    console.log(error);

    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};
