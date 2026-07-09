import { Request, Response } from "express";
import customerModel from "../models/customer.model";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import farmerModel from "../models/farmer.model";
import productModel from "../models/product.model";
import productsReviewModel from "../models/productsReview.model";
import farmerReviewModel from "../models/farmerReview.model";
import mongoose from "mongoose";
import orderModel from "../models/order.model";

/**
 * @POST Product Update Route
 * @description This API uses to update the product by the farmer.
 * @Route /api/product/:productId
 */


export const createProduct = async (req: Request, res: Response) => {
  try {
    console.log("User ID:", req.user._id);
    const UserId = req.user._id;

    const {
      productName,
      description,
      category,
      price,
      quantity,
      unit,
    } = req.body;

    const image = req.file?.path;

    const product = await productModel.create({
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

    const products = await productModel.find({
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
    console.log("productId::",productId);

    const updates = req.body;
    console.log("updates::",updates);


    if (req.file) {
      updates.image = req.file.path;
    }
    console.log("req.file.path::",req.file?.path);


    const product = await productModel.findByIdAndUpdate(
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


/**
 * @DELETE Product Update Route
 * @description This API uses to update the product by the farmer.
 * @Route /api/product/:productId
 */
export const deleteProduct = async (req: Request, res: Response) => {
  try {
    const farmerId = req.user._id;
    const { productId } = req.params;

    const product = await productModel.findOneAndDelete({
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

/**
 * @DELETE Product Update Route
 * @description This API uses to update the product by the farmer.
 * @Route /api/product/:productId
 */
export const getFarmerProductStats = async (req: Request, res: Response) => {
  try {
    const farmerId = req.user._id;

    const totalProducts = await productModel.countDocuments({ farmerId });

    const weekStart = new Date();
    weekStart.setDate(weekStart.getDate() - 7);

    const newThisWeek = await productModel.countDocuments({
      farmerId,
      createdAt: { $gte: weekStart },
    });

    return res.status(200).json({
      success: true,
      totalProducts,
      newThisWeek,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};

<<<<<<< HEAD
/**
 * @DELETE Product Update Route
 * @description This API uses to update the product by the farmer.
 * @Route /api/product/:productId
 */
=======

// export const getFarmerReviews = async (req: Request, res: Response) => {
//   try {
//     const farmerId = req.user._id;
//     const { type } = req.query;

//     let reviews: any[] = [];

//     if (type === "product") {
//       const farmerProducts = await productModel
//         .find({ farmerId })
//         .select("_id");

//       const productIds = farmerProducts.map((product) => product._id);

//       reviews = await productsReviewModel
//         .find({ productId: { $in: productIds } })
//         .populate("customerId", "username profilePicture")
//         .populate("productId", "productName image price")
//         .sort({ createdAt: -1 });
//     } else if (type === "customer") {
//       reviews = await farmerReviewModel
//         .find({ farmerId })
//         .populate("customerId", "username profilePicture")
//         .sort({ createdAt: -1 });
//     } else {
//       return res.status(400).json({
//         success: false,
//         message: "Invalid review type",
//       });
//     }
// const formattedReviews = reviews.map((item: any) => ({
//   _id: item._id,
//   customerName: item.customerId.username,
//   customerImage:item.customerId.profilePicture,
//   productName: item.productId.productName,
//   productId: item.productId._id,
//   rating: item.rating,
//   review: item.review,
//   createdAt: item.createdAt,
// }));
// // console.log("reviews::",formattedReviews);


//     return res.status(200).json({
//       success: true,
//       reviews: formattedReviews
//     });

//   } catch (error) {
//     console.log(error);

//     return res.status(500).json({
//       success: false,
//       message: "Internal Server Error",
//     });
//   }
// };


// export const getFarmerReviews = async (req: any, res: Response) => {
//   try {
//     const farmerId = req.user._id;
//     const { type } = req.query;

//     let reviews: any[] = [];

//     if (type === "product") {
//       const farmerProducts = await productModel
//         .find({ farmerId })
//         .select("_id");

//       const productIds = farmerProducts.map((product) => product._id);

//       reviews = await productsReviewModel
//         .find({ productId: { $in: productIds } })
//         .populate("customerId", "username profilePicture")
//         .populate("productId", "productName image price")
//         .sort({ createdAt: -1 });
//     } else if (type === "customer") {
//       reviews = await farmerReviewModel
//         .find({ farmerId })
//         .populate("customerId", "username profilePicture")
//         .sort({ createdAt: -1 });
//     } else {
//       return res.status(400).json({
//         success: false,
//         message: "Invalid review type",
//       });
//     }

//     const formattedReviews = reviews.map((item: any) => ({
//       _id: item._id,
//       customerName: item.customerId?.username || "Customer",
//       customerImage: item.customerId?.profilePicture || "",
//       productName:
//         type === "product" ? item.productId?.productName || "Product" : "Farmer Review",
//       productId:
//         type === "product" ? item.productId?._id || "" : farmerId,
//       rating: item.rating,
//       review: item.review,
//       createdAt: item.createdAt,
//     }));

//     return res.status(200).json({
//       success: true,
//       reviews: formattedReviews,
//     });
//   } catch (error) {
//     console.log(error);

//     return res.status(500).json({
//       success: false,
//       message: "Internal Server Error",
//     });
//   }
// };


// export const getFarmerReviews = async (req: Request, res: Response) => {
//   try {
//     const farmerId = req.user._id;
//     const { type, search } = req.query;
    

//     let reviews: any[] = [];

//     if (type === "product") {
//       const farmerProducts = await productModel
//         .find({ farmerId })
//         .select("_id productName");

//       let productIds = farmerProducts.map((product) => product._id);

//       if (search) {
//         const matchedProducts = farmerProducts.filter((product: any) =>
//           product.productName
//             ?.toLowerCase()
//             .includes(String(search).toLowerCase())
//         );

//         const matchedCustomers = await customerModel
//           .find({
//             username: { $regex: search, $options: "i" },
//           })
//           .select("_id");

//         const customerIds = matchedCustomers.map((customer) => customer._id);

//         reviews = await productsReviewModel
//           .find({
//             productId: { $in: productIds },
//             $or: [
//               { productId: { $in: matchedProducts.map((p) => p._id) } },
//               { customerId: { $in: customerIds } },
//             ],
//           })
//           .populate("customerId", "username profilePicture")
//           .populate("productId", "productName image price")
//           .sort({ createdAt: -1 });
//       } else {
//         reviews = await productsReviewModel
//           .find({ productId: { $in: productIds } })
//           .populate("customerId", "username profilePicture")
//           .populate("productId", "productName image price")
//           .sort({ createdAt: -1 });
//       }
//     }

//     else if (type === "customer") {
//       let query: any = { farmerId };

//       if (search) {
//         const matchedCustomers = await customerModel
//           .find({
//             username: { $regex: search, $options: "i" },
//           })
//           .select("_id");

//         const customerIds = matchedCustomers.map((customer) => customer._id);

//         query.customerId = { $in: customerIds };
//       }

//       reviews = await farmerReviewModel
//         .find(query)
//         .populate("customerId", "username profilePicture")
//         .sort({ createdAt: -1 });
//     }

//     else {
//       return res.status(400).json({
//         success: false,
//         message: "Invalid review type",
//       });
//     }

//     return res.status(200).json({
//       success: true,
//       reviews,
//     });
//   } catch (error) {
//     console.log(error);

//     return res.status(500).json({
//       success: false,
//       message: "Internal Server Error",
//     });
//   }
// };

>>>>>>> b4a111ed1e894fcbad622750d5e01d12bc2b5375
export const getFarmerReviews = async (req: Request, res: Response) => {
  try {
    const farmerId = req.user._id;
    const { type } = req.query;

    const searchText =
      typeof req.query.search === "string" ? req.query.search.trim() : "";

    let reviews: any[] = [];

    if (type === "product") {
      const farmerProducts = await productModel
        .find({ farmerId })
        .select("_id productName");

      const productIds = farmerProducts.map((product) => product._id);

      if (searchText) {
        const matchedProducts = farmerProducts.filter((product: any) =>
          product.productName
            ?.toLowerCase()
            .includes(searchText.toLowerCase())
        );

        const matchedCustomers = await customerModel
          .find({
            username: { $regex: searchText, $options: "i" },
          })
          .select("_id");

        const customerIds = matchedCustomers.map((customer) => customer._id);

        reviews = await productsReviewModel
          .find({
            productId: { $in: productIds },
            $or: [
              { productId: { $in: matchedProducts.map((p: any) => p._id) } },
              { customerId: { $in: customerIds } },
            ],
          })
          .populate("customerId", "username profilePicture")
          .populate("productId", "productName image price")
          .sort({ createdAt: -1 });
      } else {
        reviews = await productsReviewModel
          .find({ productId: { $in: productIds } })
          .populate("customerId", "username profilePicture")
          .populate("productId", "productName image price")
          .sort({ createdAt: -1 });
      }
    } else if (type === "customer") {
      const query: any = { farmerId };

      if (searchText) {
        const matchedCustomers = await customerModel
          .find({
            username: { $regex: searchText, $options: "i" },
          })
          .select("_id");

        const customerIds = matchedCustomers.map((customer) => customer._id);

        query.customerId = { $in: customerIds };
      }

      reviews = await farmerReviewModel
        .find(query)
        .populate("customerId", "username profilePicture")
        .sort({ createdAt: -1 });
    } else {
      return res.status(400).json({
        success: false,
        message: "Invalid review type",
      });
    }

    return res.status(200).json({
      success: true,
      reviews,
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
 * @Route /api/product/:productId
 */
export const getFarmerReviewStats = async (req: Request, res: Response) => {
  try {
    const farmerId = req.user._id;
    const { type } = req.query;

    let reviews: any[] = [];

    if (type === "product") {
      const farmerProducts = await productModel.find({ farmerId }).select("_id");

      const productIds = farmerProducts.map((product) => product._id);

      reviews = await productsReviewModel.find({
        productId: { $in: productIds },
      });
    } else if (type === "customer") {
      reviews = await farmerReviewModel.find({ farmerId });
    } else {
      return res.status(400).json({
        success: false,
        message: "Invalid review type",
      });
    }

    const totalReviews = reviews.length;

    const averageRating =
      totalReviews === 0
        ? 0
        : reviews.reduce((sum, item) => sum + item.rating, 0) / totalReviews;

    const positiveReviews = reviews.filter((item) => item.rating >= 4).length;

    const negativeReviews = reviews.filter((item) => item.rating <= 2).length;

    const uniqueIds =
      type === "product"
        ? new Set(reviews.map((item) => item.productId.toString()))
        : new Set(reviews.map((item) => item.customerId.toString()));

    return res.status(200).json({
      success: true,
      stats: {
        averageRating: Number(averageRating.toFixed(1)),
        totalReviews,
        positiveReviews,
        negativeReviews,
        reviewedCount: uniqueIds.size,
      },
    });
  } catch (error) {
    console.log(error);

    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};


export const getRatingDistribution = async (
  req: Request,
  res: Response
) => {
  try {
    const farmerId = req.user._id;
    const { type } = req.query;

    let reviews: any[] = [];

    if (type === "product") {
      const farmerProducts = await productModel
        .find({ farmerId })
        .select("_id");

      const productIds = farmerProducts.map((product) => product._id);

      reviews = await productsReviewModel.find({
        productId: { $in: productIds },
      });
    } else if (type === "customer") {
      reviews = await farmerReviewModel.find({ farmerId });
    } else {
      return res.status(400).json({
        success: false,
        message: "Invalid review type",
      });
    }

    const distribution = {
      5: 0,
      4: 0,
      3: 0,
      2: 0,
      1: 0,
    };

    reviews.forEach((review) => {
      if (review.rating >= 1 && review.rating <= 5) {
        distribution[review.rating as keyof typeof distribution]++;
      }
    });

    return res.status(200).json({
      success: true,
      distribution: {
        total: reviews.length,
        fiveStar: distribution[5],
        fourStar: distribution[4],
        threeStar: distribution[3],
        twoStar: distribution[2],
        oneStar: distribution[1],
      },
    });
  } catch (error) {
    console.log(error);

    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};

/*
 *@ name: updateOrderStatus
 *@ description: This API changes the status of their order which is handled by Farmer.
 *@ route: /farmer/order 
 */
export const getHighestRatedProducts = async (req: Request, res: Response) => {
  try {
    const farmerId = req.user._id;

    const farmerProducts = await productModel
      .find({ farmerId })
      .select("_id productName image");

    const productIds = farmerProducts.map((product) => product._id);

    const ratedProducts = await productsReviewModel.aggregate([
      {
        $match: {
          productId: {
            $in: productIds.map((id) => new mongoose.Types.ObjectId(id)),
          },
        },
      },
      {
        $group: {
          _id: "$productId",
          averageRating: { $avg: "$rating" },
          totalReviews: { $sum: 1 },
        },
      },
      {
        $sort: {
          averageRating: -1,
          totalReviews: -1,
        },
      },
      {
        $limit: 4,
      },
      {
        $lookup: {
          from: "products",
          localField: "_id",
          foreignField: "_id",
          as: "product",
        },
      },
      {
        $unwind: "$product",
      },
      {
        $project: {
          _id: "$product._id",
          productName: "$product.productName",
          image: "$product.image",
          averageRating: { $round: ["$averageRating", 1] },
          totalReviews: 1,
        },
      },
    ]);

    return res.status(200).json({
      success: true,
      products: ratedProducts,
    });
  } catch (error) {
    console.log(error);

    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};
/*
 *@ name: updateOrderStatus
 *@ description: This API changes the status of their order which is handled by Farmer.
 *@ route: 
 */
// export const updateOrderStatus = async (
//   req: Request,
//   res: Response
// ) => {
//   try {
//     const farmerId = req.user._id;
//     const { orderId } = req.params;
//     const { orderStatus } = req.body;

//     const allowedStatus = [
//       "Accepted",
//       "Cancelled",
//       "Delivered",
//       "Pending",
//     ];

//     if (!allowedStatus.includes(orderStatus)) {
//       return res.status(400).json({
//         success: false,
//         message: "Invalid order status",
//       });
//     }

//     const order = await orderModel.findById(orderId);

//     if (!order) {
//       return res.status(404).json({
//         success: false,
//         message: "Order not found",
//       });
//     }

//     if (order.farmerId.toString() !== farmerId.toString()) {
//       return res.status(403).json({
//         success: false,
//         message: "Unauthorized",
//       });
//     }

//     if (order.orderStatus === "Cancelled") {
//       return res.status(400).json({
//         success: false,
//         message: "Cancelled orders cannot be updated",
//       });
//     }

//     if (order.orderStatus === "Delivered") {
//       return res.status(400).json({
//         success: false,
//         message: "Order already delivered",
//       });
//     }

//     order.orderStatus = orderStatus;

//     await order.save();

//     return res.status(200).json({
//       success: true,
//       message: "Order status updated successfully",
//       order,
//     });

//   } catch (error: any) {
//     console.error(error);

//     return res.status(500).json({
//       success: false,
//       message: "Internal Server Error",
//     });
//   }
// };


<<<<<<< HEAD
export const getFarmerParticularOrder = async (
  req: Request,
  res: Response
) => {
  try {
    const farmerId = req.user._id;
    const { orderId } = req.params;
=======

// export const getFarmerParticularOrder = async (
//   req: Request,
//   res: Response
// ) => {
//   try {
//     const farmerId = req.user._id;
//     const { orderId } = req.params;
>>>>>>> b4a111ed1e894fcbad622750d5e01d12bc2b5375

//     const order = await orderModel
//       .findById(orderId)
//       .populate({
//         path: "customerId",
//         select: "username email phoneNumber profilePicture address city",
//       })
//       .populate({
//         path: "productId",
//         select: `
//           productName
//           description
//           image
//           category
//           price
//           quantity
//           unit
//           averageRating
//           totalReviews
//         `,
//       });

//     if (!order) {
//       return res.status(404).json({
//         success: false,
//         message: "Order not found",
//       });
//     }

//     if (order.farmerId.toString() !== farmerId.toString()) {
//       return res.status(403).json({
//         success: false,
//         message: "Unauthorized",
//       });
//     }

//     return res.status(200).json({
//       success: true,
//       order,
//     });

//   } catch (error: any) {
//     console.error(error);

//     return res.status(500).json({
//       success: false,
//       message: "Internal Server Error",
//     });
//   }
// };


export const getFarmerOrders = async (
  req: Request,
  res: Response
) => {
  try {
    const farmerId = req.user._id;

    const orders = await orderModel
      .find({ farmerId })
      .populate({
        path: "customerId",
        select: "username email phoneNumber profilePicture address city",
      })
      .populate({
        path: "productId",
        select: `
          productName
          image
          price
          quantity
          unit
          category
          averageRating
          totalReviews
        `,
      })
      .sort({ createdAt: -1 });

    return res.status(200).json({
      success: true,
      totalOrders: orders.length,
      orders,
    });

  } catch (error: any) {
    console.error(error);

    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};


export const getOrderStats = async (req: Request, res: Response) => {
  try {
    const farmerId = req.user._id;

    const startOfWeek = new Date();
    startOfWeek.setDate(startOfWeek.getDate() - startOfWeek.getDay());
    startOfWeek.setHours(0, 0, 0, 0);

    const [
      totalOrders,
      pendingOrders,
      acceptedOrders,
      deliveredOrders,

      totalOrdersThisWeek,
      pendingOrdersThisWeek,
      acceptedOrdersThisWeek,
      deliveredOrdersThisWeek,
    ] = await Promise.all([
      orderModel.countDocuments({ farmerId }),

      orderModel.countDocuments({
        farmerId,
        orderStatus: "Pending",
      }),

      orderModel.countDocuments({
        farmerId,
        orderStatus: "Accepted",
      }),

      orderModel.countDocuments({
        farmerId,
        orderStatus: "Delivered",
      }),

      orderModel.countDocuments({
        farmerId,
        createdAt: { $gte: startOfWeek },
      }),

      orderModel.countDocuments({
        farmerId,
        orderStatus: "Pending",
        createdAt: { $gte: startOfWeek },
      }),

      orderModel.countDocuments({
        farmerId,
        orderStatus: "Accepted",
        createdAt: { $gte: startOfWeek },
      }),

      orderModel.countDocuments({
        farmerId,
        orderStatus: "Delivered",
        createdAt: { $gte: startOfWeek },
      }),
    ]);

    return res.status(200).json({
      success: true,
      stats: {
        totalOrders,
        pendingOrders,
        acceptedOrders,
        deliveredOrders,

        totalOrdersThisWeek,
        pendingOrdersThisWeek,
        acceptedOrdersThisWeek,
        deliveredOrdersThisWeek,
      },
    });
  } catch (error) {
    console.log("Get order stats error:", error);

    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};

<<<<<<< HEAD
=======
export const updateOrderStatus = async (req: Request, res: Response) => {
  try {
    const farmerId = req.user._id;
    const { orderId } = req.params;
    const { status } = req.body;

    const allowedStatus = ["Accepted", "Rejected", "Delivered"];

    if (!allowedStatus.includes(status)) {
      return res.status(400).json({
        success: false,
        message: "Invalid order status",
      });
    }

    const order = await orderModel.findOneAndUpdate(
      { _id: orderId, farmerId },
      { orderStatus: status },
      { new: true }
    );

    if (!order) {
      return res.status(404).json({
        success: false,
        message: "Order not found",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Order status updated",
      order,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};


export const getDashboardStats = async (req: Request, res: Response) => {
  try {
    const farmerId = req.user._id;

    const startOfWeek = new Date();
    startOfWeek.setDate(startOfWeek.getDate() - startOfWeek.getDay());
    startOfWeek.setHours(0, 0, 0, 0);

    const [
      totalProducts,
      newProductsThisWeek,
      totalOrders,
      ordersThisWeek,
      pendingOrders,
      totalCustomers,
      customersThisWeek,
    ] = await Promise.all([
      productModel.countDocuments({ farmerId }),

      productModel.countDocuments({
        farmerId,
        createdAt: { $gte: startOfWeek },
      }),

      orderModel.countDocuments({ farmerId }),

      orderModel.countDocuments({
        farmerId,
        createdAt: { $gte: startOfWeek },
      }),

      orderModel.countDocuments({
        farmerId,
        orderStatus: "Pending",
      }),

      orderModel.distinct("customerId", { farmerId }),

      orderModel.distinct("customerId", {
        farmerId,
        createdAt: { $gte: startOfWeek },
      }),
    ]);

    return res.status(200).json({
      success: true,
      stats: {
        totalProducts,
        newProductsThisWeek,
        totalOrders,
        ordersThisWeek,
        pendingOrders,
        totalCustomers: totalCustomers.length,
        customersThisWeek: customersThisWeek.length,
      },
    });
  } catch (error) {
    console.log("Dashboard stats error:", error);

    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};

export const getRecentCustomerReviews = async (req: Request, res: Response) => {
  try {
    const farmerId = req.user._id;

    const reviews = await farmerReviewModel
      .find({ farmerId })
      .populate("customerId", "username profilePicture")
      .sort({ createdAt: -1 })
      .limit(3);

    const formattedReviews = reviews.map((item: any) => ({
      _id: item._id,
      rating: item.rating,
      review: item.review,
      createdAt: item.createdAt,
      customerName: item.customerId?.username || "Customer",
      customerImage: item.customerId?.profilePicture || "",
    }));

    return res.status(200).json({
      success: true,
      reviews: formattedReviews,
    });
  } catch (error) {
    console.log("Recent customer reviews error:", error);

    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};

export const removeOrder = async (req: Request, res: Response) => {
  try {
    const farmerId = req.user._id;
    const { orderId } = req.params;

    const order = await orderModel.findOne({
      _id: orderId,
      farmerId,
    });

    if (!order) {
      return res.status(404).json({
        success: false,
        message: "Order not found",
      });
    }

    await orderModel.findByIdAndDelete(orderId);

    return res.status(200).json({
      success: true,
      message: "Order removed successfully",
    });
  } catch (error) {
    console.log(error);

    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};

// export const getRecentCustomerReviews = async (req: Request, res: Response) => {
//   try {
//     const farmerId = req.user._id;

//     const reviews = await farmerReviewModel
//       .find({ farmerId })
//       .populate("customerId", "username profilePicture")
//       .sort({ createdAt: -1 })
//       .limit(3);

//     return res.status(200).json({
//       success: true,
//       reviews,
//     });
//   } catch (error) {
//     console.log("Recent customer reviews error:", error);

//     return res.status(500).json({
//       success: false,
//       message: "Internal Server Error",
//     });
//   }
// };

// export const getOrdersByStatus = async (
//   req: Request,
//   res: Response
// ) => {
//   try {
//    const farmerId = new mongoose.Types.ObjectId(req.user._id);
//     const { status } = req.params;

//     const orders = await orderModel.find({
//         farmerId,
//          orderStatus: req.params.status as
//     | "Pending"
//     | "Accepted"
//     | "Delivered"
//     | "Cancelled",
//       })
//       .populate("customerId", "username profilePicture")
//       .populate("productId", "productName image price");

//     return res.status(200).json({
//       success: true,
//       totalOrders: orders.length,
//       orders,
//     });

//   } catch (error: any) {
//     console.error(error);

//     return res.status(500).json({
//       success: false,
//       message: "Internal Server Error",
//     });
//   }
// };
>>>>>>> b4a111ed1e894fcbad622750d5e01d12bc2b5375
