import { Request, Response } from "express";
import productModel from "../models/product.model";
import farmerModel from "../models/farmer.model";
import wishlistModel from "../models/wishlist.model";
import orderModel from "../models/order.model";
import mongoose from "mongoose";
import productsReviewModel from "../models/productsReview.model";
import farmerReviewModel from "../models/farmerReview.model";




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

export const getProductById = async (req: any, res: Response) => {
  try {
    const { productId } = req.params;

    const product = await productModel
      .findById(productId)
      .populate(
        "farmerId",
        "username farmName city farmAddress phoneNumber email profilePicture bio"
      );

    if (!product) {
      return res.status(404).json({
        success: false,
        message: "Product not found.",
      });
    }

    const myReview = await productsReviewModel.findOne({
      productId,
      customerId: req.user._id,
    });

    const productData = product.toObject();

    const { farmerId: farmerDetails, ...productWithoutFarmer } = productData;

    return res.status(200).json({
      success: true,
      product: productWithoutFarmer,
      farmerDetails,

      review: myReview
        ? {
            _id: myReview._id,
            rating: myReview.rating,
            review: myReview.review,
            createdAt: myReview.createdAt,
            username: req.user.username,
          }
        : null,
    });
  } catch (error) {
    console.log(error);

    return res.status(500).json({
      success: false,
      message: "Internal Server Error.",
    });
  }
};

export const getTenProducts = async (req: Request, res: Response) => {
  try {
    const customerId = req.user._id;

    const products = await productModel.aggregate([
      {
        $match: {
          quantity: { $gt: 0 },
        },
      },
      {
        $sample: {
          size: 10,
        },
      },
    ]);

    const wishlist = await wishlistModel
      .find({ customerId })
      .select("productId");

    const wishlistIds = wishlist.map((item) =>
      item.productId.toString()
    );

    const updatedProducts = products.map((product: any) => ({
      ...product,
      isWishlisted: wishlistIds.includes(product._id.toString()),
    }));

    return res.status(200).json({
      success: true,
      products: updatedProducts,
    });
  } catch (error) {
    console.log(error);

    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};

// export const addReview = async (req: Request, res: Response) => {
//   try {
//     const { productId, rating, review } = req.body;

//     const customerId = req.user._id;

//     if (!productId || !rating) {
//       return res.status(400).json({
//         success: false,
//         message: "Product id and rating are required.",
//       });
//     }

//     const product = await productModel.findById(productId);

//     if (!product) {
//       return res.status(404).json({
//         success: false,
//         message: "Product not found.",
//       });
//     }

//     const alreadyReviewed = await productsReviewModel.findOne({
//       customerId,
//       productId,
//     });

//     if (alreadyReviewed) {
//       return res.status(400).json({
//         success: false,
//         message: "You have already reviewed this product.",
//       });
//     }

//     const newReview = await productsReviewModel.create({
//       customerId,
//       productId,
//       rating,
//       review,
//     });

//     return res.status(201).json({
//       success: true,
//       message: "Review added successfully.",
//       review: newReview,
//       username:req.user.username
//     });
    
//   } catch (error: any) {
//     console.log(error);

//     if (error.code === 11000) {
//       return res.status(400).json({
//         success: false,
//         message: "You have already reviewed this product.",
//       });
//     }

//     return res.status(500).json({
//       success: false,
//       message: "Internal Server Error.",
//     });
//   }
// };


export const addReview = async (req: Request, res: Response) => {
  try {
    const { id, rating, review } = req.body;
    const { type } = req.query;

    const customerId = req.user._id;

    if (!id || !rating) {
      return res.status(400).json({
        success: false,
        message: "Id and rating are required.",
      });
    }

    if (type === "product") {
      const product = await productModel.findById(id);

      if (!product) {
        return res.status(404).json({
          success: false,
          message: "Product not found.",
        });
      }

      const alreadyReviewed = await productsReviewModel.findOne({
        customerId,
        productId: id,
      });

      if (alreadyReviewed) {
        return res.status(400).json({
          success: false,
          message: "You have already reviewed this product.",
        });
      }

      const newReview = await productsReviewModel.create({
        customerId,
        productId: id,
        rating,
        review,
      });

      return res.status(201).json({
        success: true,
        message: "Review added successfully.",
        review: newReview,
        username: req.user.username,
      });
    }

    if (type === "farmer") {
      const farmer = await farmerModel.findById(id);

      if (!farmer) {
        return res.status(404).json({
          success: false,
          message: "Farmer not found.",
        });
      }

      const alreadyReviewed = await farmerReviewModel.findOne({
        customerId,
        farmerId: id,
      });

      if (alreadyReviewed) {
        return res.status(400).json({
          success: false,
          message: "You have already reviewed this farmer.",
        });
      }

      const newReview = await farmerReviewModel.create({
        customerId,
        farmerId: id,
        rating,
        review,
      });

      return res.status(201).json({
        success: true,
        message: "Review added successfully.",
        review: newReview,
        username: req.user.username,
      });
    }

    return res.status(400).json({
      success: false,
      message: "Invalid review type.",
    });
  } catch (error: any) {
    console.log(error);

    if (error.code === 11000) {
      return res.status(400).json({
        success: false,
        message: "You have already reviewed this.",
      });
    }

    return res.status(500).json({
      success: false,
      message: "Internal Server Error.",
    });
  }
};


// export const deleteReview = async (req: Request, res: Response) => {
//   try {
//     const { productId } = req.params;

//     const customerId = req.user._id;

//     const review = await productsReviewModel.findOneAndDelete({
//       customerId,
//       productId,
//     });

//     if (!review) {
//       return res.status(404).json({
//         success: false,
//         message: "Review not found.",
//       });
//     }

//     return res.status(200).json({
//       success: true,
//       message: "Review deleted successfully.",
//     });
//   } catch (error) {
//     console.log(error);

//     return res.status(500).json({
//       success: false,
//       message: "Internal Server Error.",
//     });
//   }
// };


export const deleteReview = async (req: Request, res: Response) => {
  try {
    const { type, id } = req.params;
    const customerId = req.user._id;

    let review;

    if (type === "product") {
      review = await productsReviewModel.findOneAndDelete({
        customerId,
        productId: id,
      });
    } else if (type === "farmer") {
      review = await farmerReviewModel.findOneAndDelete({
        customerId,
        farmerId: id,
      });
    } else {
      return res.status(400).json({
        success: false,
        message: "Invalid review type.",
      });
    }

    if (!review) {
      return res.status(404).json({
        success: false,
        message: "Review not found.",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Review deleted successfully.",
    });
  } catch (error) {
    console.log(error);

    return res.status(500).json({
      success: false,
      message: "Internal Server Error.",
    });
  }
};




// Create Order ye pk ki  
// export const createOrder = async (
//   req: Request,
//   res: Response
// ) => {
//   try {
//     const customerId = req.user._id;

//     const {
//       productId,
//       quantity,
//       shippingAddress,
//       paymentMethod,

//     } = req.body;

//     // Validate request
//     if (
//       !productId ||
//       !quantity ||
//       !shippingAddress ||
//       !paymentMethod
//     ) {
//       return res.status(400).json({
//         success: false,
//         message: "All fields are required",
//       });
//     }

//     // Find product
//     const product = await productModel.findById(productId);

//     if (!product) {
//       return res.status(404).json({
//         success: false,
//         message: "Product not found",
//       });
//     }

//     // Product available?
//     if (!product.isAvailable) {
//       return res.status(400).json({
//         success: false,
//         message: "Product is unavailable",
//       });
//     }

//     // Stock check
//     if (quantity > product.quantity) {
//       return res.status(400).json({
//         success: false,
//         message: "Insufficient stock available",
//       });
//     }

//     // Calculate total
//     const totalAmount = quantity * product.price;

//     // Create order
//     const order = await orderModel.create({
//       customerId,
//       farmerId: product.farmerId,
//       productId,
//       quantity,
//       totalAmount,
//       shippingAddress,
//     });

//     // Reduce stock
//     product.quantity -= quantity;

//     if (product.quantity === 0) {
//       product.isAvailable = false;
//     }

//     await product.save();

//     return res.status(201).json({
//       success: true,
//       message: "Order placed successfully",
//       order,
//     });

//   } catch (error: any) {
//     console.error("Create Order Error:", error);

//     return res.status(500).json({
//       success: false,
//       message: "Internal Server Error",
//     });
//   }
// };

// ye meri 
// export const createOrder = async (
//   req: Request,
//   res: Response
// ) => {
//   try {
//     const customerId = req.user._id;

//     const {
//       productId,
//       quantity,
//       city,
//       requiredDate,
//     } = req.body;

//     if (
//       !productId ||
//       !quantity ||
//       !city ||
//       !requiredDate
//     ) {
//       return res.status(400).json({
//         success: false,
//         message: "All fields are required",
//       });
//     }

//     const product = await productModel.findById(productId);

//     if (!product) {
//       return res.status(404).json({
//         success: false,
//         message: "Product not found",
//       });
//     }

//     if (!product.isAvailable) {
//       return res.status(400).json({
//         success: false,
//         message: "Product is unavailable",
//       });
//     }

//     if (quantity > product.quantity) {
//       return res.status(400).json({
//         success: false,
//         message: "Insufficient stock available",
//       });
//     }

//     const totalAmount = quantity * product.price;

//     // Generate Unique Order Code
//     let orderCode = "";
//     let exists = true;

//     while (exists) {
//       orderCode = `ORD-${Math.floor(
//         100000 + Math.random() * 900000
//       )}`;

//       exists = !!(await orderModel.exists({ orderCode }));
//     }

//     const order = await orderModel.create({
//       customerId,
//       farmerId: product.farmerId,
//       productId,
//       quantity,
//       totalAmount,
//       shippingAddress: city,
//       neededBy: new Date(requiredDate),
//       orderCode,
//     });

//     // Reduce Stock
//     product.quantity -= quantity;

//     if (product.quantity <= 0) {
//       product.quantity = 0;
//       product.isAvailable = false;
//     }

//     await product.save();

//     return res.status(201).json({
//       success: true,
//       message: "Order placed successfully",
//       order,
//     });
//   } catch (error: any) {
//     console.error("Create Order Error:", error);

//     return res.status(500).json({
//       success: false,
//       message: "Internal Server Error",
//     });
//   }
// };


// ye bhi meri pr updated wali 
export const createOrder = async (req: Request, res: Response) => {
  try {
    const customerId = req.user._id;

    const { productId, quantity, city, requiredDate } = req.body;

    if (!productId || !quantity || !city || !requiredDate) {
      return res.status(400).json({
        success: false,
        message: "All fields are required",
      });
    }

    const product = await productModel.findById(productId);

    if (!product) {
      return res.status(404).json({
        success: false,
        message: "Product not found",
      });
    }

    if (!product.isAvailable) {
      return res.status(400).json({
        success: false,
        message: "Product is unavailable",
      });
    }

    if (quantity > product.quantity) {
      return res.status(400).json({
        success: false,
        message: "Insufficient stock available",
      });
    }

    const totalAmount = quantity * product.price;

    let orderCode = "";
    let exists = true;

    while (exists) {
      orderCode = `ORD-${Math.floor(100000 + Math.random() * 900000)}`;
      exists = !!(await orderModel.exists({ orderCode }));
    }

    const order = await orderModel.create({
      customerId,
      farmerId: product.farmerId,
      productId,
      quantity,
      totalAmount,
      shippingAddress: city,
      neededBy: new Date(requiredDate),
      orderCode,
    });

    product.quantity -= quantity;

    if (product.quantity <= 0) {
      product.quantity = 0;
      product.isAvailable = false;
    }

    await product.save();

    const populatedOrder: any = await orderModel
      .findById(order._id)
      .populate("productId", "productName image")
      .populate("farmerId", "farmName farmAddress city phoneNumber");

    if (!populatedOrder) {
      return res.status(404).json({
        success: false,
        message: "Order not found after creation",
      });
    }

    const formattedOrder = {
      _id: populatedOrder._id,
      productId: populatedOrder.productId?._id,
      farmerId: populatedOrder.farmerId?._id,

      productName: populatedOrder.productId?.productName,
      productImage: populatedOrder.productId?.image,

      orderCode: populatedOrder.orderCode,
      quantity: populatedOrder.quantity,
      totalPrice: populatedOrder.totalAmount,
      requiredDate: populatedOrder.neededBy,

      farmName: populatedOrder.farmerId?.farmName,
      location:
        populatedOrder.farmerId?.farmAddress || populatedOrder.farmerId?.city,
      phoneNumber: populatedOrder.farmerId?.phoneNumber,

      orderedOn: populatedOrder.createdAt,
      orderStatus: populatedOrder.orderStatus,
    };

    return res.status(201).json({
      success: true,
      message: "Order placed successfully",
      order: formattedOrder,
    });
  } catch (error: any) {
    console.error("Create Order Error:", error);

    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};



export const getCustomerOrders = async (req: Request, res: Response) => {
  try {
    const customerId = req.user._id;

    const orders = await orderModel
      .find({ customerId })
      .populate("productId", "productName image price")
      .populate("farmerId", "farmName farmAddress city phoneNumber")
      .sort({ createdAt: -1 });

    const formattedOrders = orders.map((order: any) => ({
      _id: order._id,
      productId: order.productId?._id,
      farmerId: order.farmerId?._id,

      productName: order.productId?.productName,
      productImage: order.productId?.image,

      orderCode: order.orderCode,
      quantity: order.quantity,
      totalPrice: order.totalAmount,
      requiredDate: order.neededBy,

      farmName: order.farmerId?.farmName,
      location: order.farmerId?.farmAddress || order.farmerId?.city,
      phoneNumber: order.farmerId?.phoneNumber,

      orderedOn: order.createdAt,
      orderStatus: order.orderStatus,
    }));

    return res.status(200).json({
      success: true,
      orders: formattedOrders,
    });
  } catch (error) {
    console.log("Get Customer Orders Error:", error);

    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};

// export const cancelOrder = async (
//   req: Request,
//   res: Response
// ) => {
//   try {
//     const customerId = req.user._id;
//     const { orderId } = req.params;

//     // Find Order
//     const order = await orderModel.findById(orderId);

//     if (!order) {
//       return res.status(404).json({
//         success: false,
//         message: "Order not found",
//       });
//     }

//     // Check Ownership
//     if (order.customerId.toString() !== customerId.toString()) {
//       return res.status(403).json({
//         success: false,
//         message: "You are not authorized to cancel this order",
//       });
//     }

//     // Already Cancelled
//     if (order.orderStatus === "Cancelled") {
//       return res.status(400).json({
//         success: false,
//         message: "Order is already cancelled",
//       });
//     }

//     // Check if order can be cancelled
//     const allowedStatus = [
//       "Pending",
//       "Accepted",
//       "Preparing",
//     ];

//     if (!allowedStatus.includes(order.orderStatus)) {
//       return res.status(400).json({
//         success: false,
//         message: `Order cannot be cancelled because it is ${order.orderStatus}`,
//       });
//     }

//     // Restore Product Quantity
//     const product = await productModel.findById(order.productId);

//     if (product) {
//       product.quantity += order.quantity;
//       product.isAvailable = true;

//       await product.save();
//     }

//     // Update Order Status
//     order.orderStatus = "Cancelled";

//     await order.save();

//     return res.status(200).json({
//       success: true,
//       message: "Order cancelled successfully",
//       order,
//     });

//   } catch (error: any) {
//     console.error("Cancel Order Error:", error);

//     return res.status(500).json({
//       success: false,
//       message: "Internal Server Error",
//     });
//   }
// };


export const deleteOrder = async (req: Request, res: Response) => {
  try {
    const { orderId } = req.params;
    const customerId = req.user; // auth middleware se

    const deletedOrder = await orderModel.findOneAndDelete({
      _id: orderId,
      customerId,
    });

    if (!deletedOrder) {
      return res.status(404).json({
        success: false,
        message: "Order not found.",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Order deleted successfully.",
    });
  } catch (error) {
    console.log(error);

    return res.status(500).json({
      success: false,
      message: "Internal Server Error.",
    });
  }
};

// export const getFarmerProfileById = async (
//   req: Request,
//   res: Response
// ) => {
//   try {
//     const { farmerId } = req.params;

//     const farmer = await farmerModel
//       .findById(farmerId)
//       .select(
//         "username farmName city farmAddress phoneNumber email profilePicture bio"
//       );

//     if (!farmer) {
//       return res.status(404).json({
//         success: false,
//         message: "Farmer not found.",
//       });
//     }

//     const products = await productModel
//       .find({ farmerId })
//       .sort({ createdAt: -1 });

//     const totalOrders = await orderModel.countDocuments({
//       farmerId,
//     });

//     return res.status(200).json({
//       success: true,
//       farmer: {
//         ...farmer.toObject(),
//         totalOrders,
//       },
//       products,
//     });
//   } catch (error) {
//     console.log(error);

//     return res.status(500).json({
//       success: false,
//       message: "Internal Server Error.",
//     });
//   }
// };

export const getFarmerProfileById = async (req: any, res: Response) => {
  try {
    const { farmerId } = req.params;

    const farmer = await farmerModel
      .findById(farmerId)
      .select(
        "username farmName city farmAddress phoneNumber email profilePicture bio"
      );

    if (!farmer) {
      return res.status(404).json({
        success: false,
        message: "Farmer not found.",
      });
    }

    const myReview = await farmerReviewModel.findOne({
      farmerId,
      customerId: req.user._id,
    });

    const products = await productModel.find({ farmerId }).sort({
      createdAt: -1,
    });

    const totalOrders = await orderModel.countDocuments({
      farmerId,
    });

    return res.status(200).json({
      success: true,
      farmer: {
        ...farmer.toObject(),
        totalOrders,
      },
      products,

      review: myReview
        ? {
            _id: myReview._id,
            rating: myReview.rating,
            review: myReview.review,
            createdAt: myReview.createdAt,
            username: req.user.username,
          }
        : null,
    });
  } catch (error) {
    console.log(error);

    return res.status(500).json({
      success: false,
      message: "Internal Server Error.",
    });
  }
};

export const getParticularOrder = async (
  req: Request,
  res: Response
) => {
  try {
    const customerId = req.user._id;
    const { orderId } = req.params;

    // Find Order
    const order = await orderModel
      .findById(orderId)

      // Product Details
      .populate({
        path: "productId",
        select: `
          productName
          description
          category
          image
          price
          quantity
          unit
          city
          averageRating
          totalReviews
        `,
      })

      // Farmer Details
      .populate({
        path: "farmerId",
        select: `
          username
          farmName
          profilePicture
          city
          review
        `,
      });

    // Order not found
    if (!order) {
      return res.status(404).json({
        success: false,
        message: "Order not found",
      });
    }

    // Check Ownership
    if (order.customerId.toString() !== customerId.toString()) {
      return res.status(403).json({
        success: false,
        message: "You are not authorized to view this order",
      });
    }

    return res.status(200).json({
      success: true,
      order,
    });

  } catch (error: any) {
    console.error("Get Order Error:", error);

    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
      error: error.message,
    });
  }
};

