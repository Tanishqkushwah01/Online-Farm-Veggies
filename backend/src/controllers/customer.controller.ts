import { Request, Response } from "express";
import productModel from "../models/product.model";
import farmerModel from "../models/farmer.model";
import wishlistModel from "../models/wishlist.model";
import orderModel from "../models/order.model";
import mongoose from "mongoose";
import productsReviewModel from "../models/productsReview.model";
import farmerReviewModel from "../models/farmerReview.model";
import { createNotification } from "../utilities/createNotification";
import {
  escapeRegex,
  getCustomerFarmerPaginatedProducts,
  getCustomerFarmerAllProducts,
  getCustomerFarmerMatchedProducts,
  getPaginatedOrders, getAllOrders,
  getMatchedOrders,
  getWishlistPipeline,
  getPaginatedWishlist,
  getCustomerAllProducts,
  getCustomerCategoryProducts,
  getCustomerMatchedProducts,
} from "../services/customerService";




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

// export const getWishlist = async (req: Request, res: Response) => {
//   try {
//     const customerId = req.user._id;

//     const wishlist = await wishlistModel.find({ customerId }).populate(
//       "productId"
//     );

//     return res.status(200).json({
//       success: true,
//       wishlist,
//     });
//   } catch (error) {
//     console.log(error);

//     return res.status(500).json({
//       success: false,
//       message: "Internal Server Error",
//     });
//   }
// };


export const getWishlist = async (req: Request, res: Response) => {
  try {
    const customerId = new mongoose.Types.ObjectId(req.user._id);

    const page = Number(req.query.page) || 1;
    const limit = Number(req.query.limit) || 15;

    const search = String(req.query.search || "").trim();
    const category = String(req.query.category || "").trim();

    const pipeline = getWishlistPipeline(
      customerId,
      search,
      category
    );

    const {
      wishlist,
      totalWishlist,
      totalPages,
    } = await getPaginatedWishlist(
      pipeline,
      page,
      limit
    );

    return res.status(200).json({
      success: true,
      wishlist,

      totalWishlist,
      totalPages,

      currentPage: page,
      hasNextPage: page < totalPages,
      hasPrevPage: page > 1,

      message:
        wishlist.length === 0
          ? "Product not found"
          : "",
    });
  } catch (error) {
    console.log(error);

    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};

export const getProductById = async (req: Request, res: Response) => {
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

      await createNotification({
        receiverId: product.farmerId,
        receiverRole: "Farmer",
        type: "new_product_review",
        title: "New Product Review",
        message: `${req.user.username} reviewed your product "${product.productName}".`,
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

      await createNotification({
        receiverId: farmer._id,
        receiverRole: "Farmer",
        type: "new_farmer_review",
        title: "New Farmer Review",
        message: `${req.user.username} rated your farming service.`,
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

// order Start

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

    if (!mongoose.Types.ObjectId.isValid(productId)) {
      return res.status(400).json({
        success: false,
        message: "Invalid product id",
      });
    }

    const orderQuantity = Number(quantity);

    if (!Number.isInteger(orderQuantity) || orderQuantity <= 0) {
      return res.status(400).json({
        success: false,
        message: "Quantity must be a positive number",
      });
    }

    const neededByDate = new Date(requiredDate);

    if (Number.isNaN(neededByDate.getTime())) {
      return res.status(400).json({
        success: false,
        message: "Invalid required date",
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

    if (orderQuantity > product.quantity) {
      return res.status(400).json({
        success: false,
        message: "Insufficient stock available",
      });
    }

    const totalAmount = orderQuantity * product.price;

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
      quantity: orderQuantity,
      totalAmount,
      shippingAddress: city.trim(),
      neededBy: neededByDate,
      orderCode,
    });

    await createNotification({
      receiverId: product.farmerId,
      receiverRole: "Farmer",
      type: "new_order",
      title: "New Order",
      message: `You received a new order for ${product.productName}.`,
    });

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
      location: order.shippingAddress,
      // populatedOrder.farmerId?.farmAddress || populatedOrder.farmerId?.city,
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

// export const getCustomerOrders = async (req: Request, res: Response) => {
//   try {
//     const customerId = req.user._id;

//     const orders = await orderModel
//       .find({ customerId })
//       .populate("productId", "productName image price")
//       .populate("farmerId", "farmName farmAddress city phoneNumber")
//       .sort({ createdAt: -1 });

//     const formattedOrders = orders.map((order: any) => ({
//       _id: order._id,
//       productId: order.productId?._id,
//       farmerId: order.farmerId?._id,

//       productName: order.productId?.productName,
//       productImage: order.productId?.image,

//       orderCode: order.orderCode,
//       quantity: order.quantity,
//       totalPrice: order.totalAmount,
//       requiredDate: order.neededBy,

//       farmName: order.farmerId?.farmName,
//       location: order.farmerId?.farmAddress || order.farmerId?.city,
//       phoneNumber: order.farmerId?.phoneNumber,

//       orderedOn: order.createdAt,
//       orderStatus: order.orderStatus,
//     }));

//     return res.status(200).json({
//       success: true,
//       orders: formattedOrders,
//     });
//   } catch (error) {
//     console.log("Get Customer Orders Error:", error);

//     return res.status(500).json({
//       success: false,
//       message: "Internal Server Error",
//     });
//   }
// };

export const getCustomerOrders = async (req: Request, res: Response) => {
  try {
    const customerId = new mongoose.Types.ObjectId(req.user._id);

    const page = Math.max(Number(req.query.page) || 1, 1);
    const limit = Math.max(Number(req.query.limit) || 5, 1);

    const search = ((req.query.search as string) || "").trim();
    const category = ((req.query.category as string) || "").trim();

    let result;

    // No Search + No Category
    if (!search && !category) {
      result = await getAllOrders(customerId, page, limit);
    }

    // Search and/or Category
    else {
      result = await getMatchedOrders(
        customerId,
        page,
        limit,
        search,
        category
      );
    }

    return res.status(200).json({
      success: true,
      message:
        result.orders.length > 0
          ? "Your All Orders"
          : "Product not found",

      orders: result.orders,

      page,
      limit,

      totalOrders: result.totalOrders,
      totalPages: result.totalPages,
    });
  } catch (error) {
    console.log("Get Customer Orders Error:", error);

    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};

export const getParticularOrder = async (req: Request, res: Response) => {
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



export const deleteOrder = async (req: Request, res: Response) => {
  try {
    const orderId = req.params.orderId as string;
    const customerId = req.user._id;

    if (!mongoose.Types.ObjectId.isValid(orderId)) {
      return res.status(400).json({
        success: false,
        message: "Invalid order id.",
      });
    }

    const order: any = await orderModel.findOne({
      _id: orderId,
      customerId,
    });

    if (!order) {
      return res.status(404).json({
        success: false,
        message: "Order not found.",
      });
    }

    if (order.orderStatus === "Accepted") {
      const product = await productModel.findById(order.productId);

      if (!product) {
        return res.status(404).json({
          success: false,
          message: "Product not found.",
        });
      }

      product.quantity += order.quantity;
      product.isAvailable = product.quantity > 0;

      await product.save();
    }

    await orderModel.deleteOne({ _id: order._id });

    if (order.orderStatus === "Pending" || order.orderStatus === "Accepted") {
      await createNotification({
        receiverId: order.farmerId,
        receiverRole: "Farmer",
        type: "order_cancelled",
        title: "Order Cancelled",
        message: `Order ${order.orderCode} has been cancelled by the customer.`,
      });
    }

    return res.status(200).json({
      success: true,
      message: "Order deleted successfully.",
    });
  } catch (error) {
    console.log("Delete Order Error:", error);

    return res.status(500).json({
      success: false,
      message: "Internal Server Error.",
    });
  }
};

// ORDER END

export const getFarmerProfileById = async (req: Request, res: Response) => {
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





// searching applying 

// export const getCustomerProducts = async (
//   req: Request,
//   res: Response
// ) => {

//   try {

//     const escapeRegex = (text: string) => {
//       return text.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
//     };


//     const page = Number(req.query.page) || 1;
//     const limit = Number(req.query.limit) || 20;
//     const skip = (page - 1) * limit;
//     const search = (req.query.search as string)?.trim() || "";
//     const location = (req.query.location as string)?.trim() || "";
//     const category = (req.query.category as string)?.trim() || "";
//     const price = (req.query.price as string)?.trim() || "";
//     const baseFilter: any = {
//       isAvailable: true,
//       quantity: {
//         $gt: 0
//       }
//     };
//     if (location && location !== "All Location") {
//       baseFilter.city = {
//         $regex: escapeRegex(location),
//         $options: "i"
//       };
//     }

//     let sort: any = { createdAt: -1 };

//     if (price === "low") {
//       sort = { price: 1 };
//     }

//     if (price === "high") {
//       sort = { price: -1 };
//     }

//     // ==============================
//     // SEARCH PRODUCTS
//     // ==============================


//     let searchFilter = { ...baseFilter };

//     if (search) {
//       searchFilter.productName = {
//         $regex: escapeRegex(search),
//         $options: "i"
//       };
//     }

//     if (category && category !== "All Category") {
//       searchFilter.category = category;
//     }
//     let products = await productModel
//       .find(searchFilter)
//       .sort(sort)
//       .skip(skip)
//       .limit(limit)
//       .lean();

//     const totalProducts = await productModel.countDocuments(searchFilter);

//     // =====================================
//     // SEARCH MIL GAYA BUT 10 YA LESS HAI
//     // =====================================


//     if (search && products.length > 0 && products.length <= 10) {
//       const productCategory = products[0].category;
//       const similarFilter: any = { ...baseFilter, category: productCategory };
//       const similarProducts = await productModel
//         .find(similarFilter)
//         .sort(sort)
//         .limit(20)
//         .lean();



//       return res.status(200).json({
//         success: true, noSearchResult: false, showCategoryProducts: true, products, categoryProducts: similarProducts,
//         currentPage: page, totalPages: Math.ceil(totalProducts / limit), totalProducts
//       });
//     }

//     // =====================================
//     // SEARCH ZERO RESULT
//     // =====================================


//     if (search && products.length === 0) {
//       const fallbackProducts = await productModel
//         .find(baseFilter)
//         .sort(sort)
//         .limit(20)
//         .lean();
//       return res.status(200).json({
//         success: true, noSearchResult: true, message: "No products found", products: [], categoryProducts: fallbackProducts,
//         currentPage: 1, totalPages: 1, totalProducts: fallbackProducts.length
//       });
//     }

//     // =====================================
//     // NORMAL SEARCH 20+
//     // =====================================

//     return res.status(200).json({
//       success: true, noSearchResult: false, showCategoryProducts: false, products, categoryProducts: [], currentPage: page,
//       totalPages: Math.ceil(totalProducts / limit), totalProducts
//     });
//   }
//   catch (error) {
//     console.log(error);
//     return res.status(500).json({ success: false, message: "Internal Server Error" });
//   }
// };


export const getCustomerProducts = async (req: Request, res: Response) => {
  try {

    const limit = Math.max(Number(req.query.limit) || 20, 1);
    const page = Math.max(Number(req.query.page) || 1, 1);

    const search = ((req.query.search as string) || "").trim();
    const location = ((req.query.location as string) || "").trim();
    const category = ((req.query.category as string) || "").trim();
    const price = ((req.query.price as string) || "").trim();

    // ============================
    // CASE 1
    // No Search + No Filters
    // ============================

    if (
      !search &&
      (!location || location === "All Location") &&
      (!category || category === "All Category") &&
      !price
    ) {

      const {
        products,
        totalProducts,
        totalPages,
      } = await getCustomerAllProducts(
        page,
        limit
      );

      return res.status(200).json({
        success: true,
        message: "",
        products,
        categoryProducts: [],
        page,
        limit,
        totalProducts,
        totalPages,
      });
    }
    // ============================
    // CASE 2
    // Search Only
    // ============================

    if (
      search &&
      (!location || location === "All Location") &&
      (!category || category === "All Category") &&
      !price
    ) {

      const matchedProducts = await getCustomerMatchedProducts(search);

      // Product Not Found
      if (!matchedProducts.length) {

        const {
          products,
          totalProducts,
          totalPages,
        } = await getCustomerAllProducts(
          page,
          limit
        );

        return res.status(200).json({
          success: true,
          message: "Product not found",
          products,
          categoryProducts: [],
          page,
          limit,
          totalProducts,
          totalPages,
        });
      }

      // Product Found

      const matchedCategory = matchedProducts[0].category;
      
      if (!matchedCategory) {
        return res.status(500).json({
          success: false,
          message: "Category not found",
        });
      }

      const matchedIds = matchedProducts.map(
        (product) => product._id
      );

      const {
        products: categoryProducts,
        totalProducts,
        totalPages,
      } = await getCustomerCategoryProducts(
        matchedCategory,
        matchedIds,
        page,
        limit
      );

      return res.status(200).json({
        success: true,
        message: "",
        products: matchedProducts,
        categoryProducts,
        page,
        limit,
        totalProducts,
        totalPages,
      });
    }

    // ============================
    // CASE 3
    // Filters Only
    // (Category / Location / Price)
    // ============================

    if (!search) {

      const {
        products,
        totalProducts,
        totalPages,
      } = await getCustomerAllProducts(
        page,
        limit,
        category,
        location,
        price
      );

      // No products found with filters
      if (!totalProducts) {

        const allProducts = await getCustomerAllProducts(
          page,
          limit
        );

        return res.status(200).json({
          success: true,
          message: "No products found",
          products: allProducts.products,
          categoryProducts: [],
          page,
          limit,
          totalProducts: allProducts.totalProducts,
          totalPages: allProducts.totalPages,
        });
      }

      return res.status(200).json({
        success: true,
        message: "",
        products,
        categoryProducts: [],
        page,
        limit,
        totalProducts,
        totalPages,
      });
    }


    // ============================
    // CASE 4
    // Search + Filters
    // ============================

    const matchedProducts = await getCustomerMatchedProducts(
      search,
      category,
      location,
      price
    );

    // Product not found
    if (!matchedProducts.length) {

      const {
        products,
        totalProducts,
        totalPages,
      } = await getCustomerAllProducts(
        page,
        limit,
        category,
        location,
        price
      );

      // Filters me bhi kuch nahi mila
      if (!totalProducts) {

        const allProducts = await getCustomerAllProducts(
          page,
          limit
        );

        return res.status(200).json({
          success: true,
          message: "Product not found",
          products: allProducts.products,
          categoryProducts: [],
          page,
          limit,
          totalProducts: allProducts.totalProducts,
          totalPages: allProducts.totalPages,
        });
      }

      // Search nahi mila lekin filter ke products mil gaye

      return res.status(200).json({
        success: true,
        message: "Product not found",
        products,
        categoryProducts: [],
        page,
        limit,
        totalProducts,
        totalPages,
      });
    }

    // Product Found

    const matchedCategory = matchedProducts[0].category!;

    const matchedIds = matchedProducts.map(
      (product) => product._id
    );

    const {
      products: categoryProducts,
      totalProducts,
      totalPages,
    } = await getCustomerCategoryProducts(
      matchedCategory,
      matchedIds,
      page,
      limit,
      location,
      price
    );

    return res.status(200).json({
      success: true,
      message: "",
      products: matchedProducts,
      categoryProducts,
      page,
      limit,
      totalProducts,
      totalPages,
    });

  } catch (error: any) {
    console.error("getCustomerProducts Error:", error);
    return res.status(500).json({ success: false, message: "Internal Server Error", });
  }
};

//  mera wala hai 
// export const getCustomerFarmerProducts = async (req: Request, res: Response) => {
//   try {
//     const userId = req.user._id;
//     const farmerId = Array.isArray(req.params.farmerId) ? req.params.farmerId[0] : req.params.farmerId;
//     const page = Number(req.query.page) || 1;
//     const limit = Number(req.query.limit) || 15;
//     const skip = (page - 1) * limit;
//     const search = (req.query.search as string || "").trim();
//     const category = (req.query.category as string || "").trim();

//     //  CASE1: JAB KUCH BHI NHI (SEARCH + CATEGORY) KhALI HOGI  
//     if (search === "" && category === "") {
//       const result = await productModel.aggregate([
//         {
//           $match: {
//             farmerId: new mongoose.Types.ObjectId(farmerId),
//           },
//         },
//         {
//           $facet: {
//             products: [
//               { $sort: { createdAt: -1 } },
//               { $skip: skip },
//               { $limit: limit },
//             ],
//             totalCount: [
//               { $count: "count" },
//             ],
//           },
//         },
//       ]);
//       const products = result[0].products;
//       const totalProducts = result[0].totalCount[0]?.count || 0;
//       const totalPages = Math.ceil(totalProducts / limit);

//       return res.status(200).json({
//         success: true,
//         message: "Controller reached",
//         products,
//         page,
//         limit,
//         totalProducts,
//         totalPages,
//       });
//     }

//     // CASE2: JAB SIRF SERACH KIYA HAI AND CATEGORY NHI HAI KUCH BHI 
//     if (search !== "" && category === "") {

//       const matchedProducts = await productModel.find({ farmerId, productName: { $regex: `^${search}`, $options: "i" } });

//       // CASE 1 : Product Found
//       if (matchedProducts.length > 0) {

//         const matchedCategory = matchedProducts[0].category;
//         const matchedIds = matchedProducts.map(product => product._id);

//         const totalProducts = await productModel.countDocuments({ farmerId, category: matchedCategory, _id: { $nin: matchedIds } });

//         const products = await productModel.find({ farmerId, category: matchedCategory, _id: { $nin: matchedIds } })
//           .sort({ createdAt: -1 })
//           .skip(skip)
//           .limit(limit);

//         const totalPages = Math.ceil(totalProducts / limit);

//         return res.status(200).json({
//           success: true,
//           message1: "Matching products",
//           message2: matchedCategory ? `Explore more ${matchedCategory} products` : `No more ${matchedCategory} products`,
//           matchedProducts,
//           products,
//           page,
//           limit,
//           totalProducts,
//           totalPages,
//         });
//       }

//       // CASE 2 : Product Not Found

//       const result = await productModel.aggregate([
//         {
//           $match: {
//             farmerId: new mongoose.Types.ObjectId(farmerId),
//           },
//         },
//         {
//           $facet: {
//             products: [
//               { $sort: { createdAt: -1 } },
//               { $skip: skip },
//               { $limit: limit },
//             ],
//             totalCount: [
//               { $count: "count" },
//             ],
//           },
//         },
//       ]);

//       const products = result[0].products;
//       const totalProducts = result[0].totalCount[0]?.count || 0;
//       const totalPages = Math.ceil(totalProducts / limit);

//       return res.status(200).json({
//         success: true,
//         message1: "Product not found",
//         message2: "Showing all products",
//         matchedProduct: null,
//         products,
//         page,
//         limit,
//         totalProducts,
//         totalPages,
//       });
//     }

//     // CASE3: JAB SEARCH KHALI HAI PR CATEGORY DALI HAI KYA BAAT
//     if (search === "" && category !== "") {

//       const totalProducts = await productModel.countDocuments({ farmerId, category });

//       // Category products found
//       if (totalProducts > 0) {
//         const matchedProducts = await productModel.find({ farmerId, category })
//           .sort({ createdAt: -1 })
//           .skip(skip)
//           .limit(limit);

//         const totalPages = Math.ceil(totalProducts / limit);

//         return res.status(200).json({
//           success: true,
//           message: "Matching products",
//           matchedProducts,
//           products: null,
//           page,
//           limit,
//           totalProducts,
//           totalPages,
//         });
//       }

//       // Category products not found -> Show all products
//       const result = await productModel.aggregate([
//         {
//           $match: {
//             farmerId: new mongoose.Types.ObjectId(farmerId),
//           },
//         },
//         {
//           $facet: {
//             products: [
//               { $sort: { createdAt: -1 } },
//               { $skip: skip },
//               { $limit: limit },
//             ],
//             totalCount: [
//               { $count: "count" },
//             ],
//           },
//         },
//       ]);

//       const products = result[0].products;
//       const allProducts = result[0].totalCount[0]?.count || 0;
//       const totalPages = Math.ceil(allProducts / limit);

//       return res.status(200).json({
//         success: true,
//         message1: `No products found in ${category}`,
//         message2: "Showing all products",
//         matchedProducts: [],
//         products,
//         page,
//         limit,
//         totalProducts: allProducts,
//         totalPages,
//       });
//     }

//     // CASE4: JAB DONO CHIZE AVALBLE HAI TAB YE WALA CASE CLEGA 
//     if (search !== "" && category !== "") {

//       // Product + Category search
//       const matchedProducts = await productModel.find({
//         farmerId,
//         category,
//         productName: { $regex: `^${search}`, $options: "i" },
//       });

//       // CASE 1
//       if (matchedProducts.length > 0) {

//         const matchedIds = matchedProducts.map(p => p._id);

//         const totalProducts = await productModel.countDocuments({
//           farmerId,
//           category,
//           _id: { $nin: matchedIds },
//         });

//         const products = await productModel.find({
//           farmerId,
//           category,
//           _id: { $nin: matchedIds },
//         })
//           .sort({ createdAt: -1 })
//           .skip(skip)
//           .limit(limit);

//         return res.status(200).json({
//           success: true,
//           message: "Matching products",
//           matchedProducts,
//           products,
//           page,
//           limit,
//           totalProducts,
//           totalPages: Math.ceil(totalProducts / limit),
//         });
//       }

//       // Product nahi mila, check category hai ya nahi
//       const totalCategoryProducts = await productModel.countDocuments({
//         farmerId,
//         category,
//       });

//       // CASE 2: 
//       if (totalCategoryProducts > 0) {

//         const products = await productModel.find({
//           farmerId,
//           category,
//         })
//           .sort({ createdAt: -1 })
//           .skip(skip)
//           .limit(limit);

//         return res.status(200).json({
//           success: true,
//           message1: `No "${search}" found in ${category}`,
//           message2: `Showing all ${category} products`,
//           matchedProducts: [],
//           products,
//           page,
//           limit,
//           totalProducts: totalCategoryProducts,
//           totalPages: Math.ceil(totalCategoryProducts / limit),
//         });
//       }

//       // CASE 3 JAB KUCH NHI MILA NA MATCHED PRODUCT NA HI C
//       const result = await productModel.aggregate([
//         {
//           $match: {
//             farmerId: new mongoose.Types.ObjectId(farmerId),
//           },
//         },
//         {
//           $facet: {
//             products: [
//               { $sort: { createdAt: -1 } },
//               { $skip: skip },
//               { $limit: limit },
//             ],
//             totalCount: [{ $count: "count" }],
//           },
//         },
//       ]);

//       const products = result[0].products;
//       const allProducts = result[0].totalCount[0]?.count || 0;

//       return res.status(200).json({
//         success: true,
//         message1: `No "${search}" found in ${category}`,
//         message2: "Showing all products",
//         matchedProducts: [],
//         products,
//         page,
//         limit,
//         totalProducts: allProducts,
//         totalPages: Math.ceil(allProducts / limit),
//       });
//     }


//     // IS API KO OR BHI ACHA BNA SAKTE HAI DUPLICATE CODE KO HTA KE JESE MENE
//     //  HAR JAGAH ESLE PART ME PAGINATION WAPIS SE LGA RHA HU SAMJHA 
//     // TO USKO HTA SAKTE HAI OR DATABASE CALL JHA 2 HO RHE HAI USKO EK KAR SAKTE HAI BAAD ME DEKHUNGA ME ARAM SE BHET KAR

//   } catch (error: any) {
//     console.log("error:", error);
//     res.status(500).json({ msg: "server error", err: error });
//   }
// }


// export interface IProduct {
//     _id: mongoose.Types.ObjectId | string;
//     farmerId: mongoose.Types.ObjectId | string;
//     productName: string;
//     description: string;
//     category: string;
//     price: number;
//     quantity: number;
//     unit: string;
//     image: string;
//     isAvailable: boolean;
//     averageRating: number;
//     city: string;
//     totalReviews: number;
//     createdAt: Date;
//     updatedAt: Date;
// }
// isko add karna hai interface ko getCustomerFarmerProducts me 

// STARTING OF THE GET CUSTOMER FARMER PRODUCTS


export const getCustomerFarmerProducts = async (req: Request, res: Response) => {
  try {

    const farmerId = Array.isArray(req.params.farmerId) ? req.params.farmerId[0] : req.params.farmerId;

    // Validate farmerId
    if (!mongoose.Types.ObjectId.isValid(farmerId)) {
      return res.status(400).json({ success: false, message: "Invalid farmerId", });
    }

    const limit = Math.max(Number(req.query.limit) || 15, 1);
    const page = Math.max(Number(req.query.page) || 1, 1);
    const search = ((req.query.search as string) || "").trim();
    const category = ((req.query.category as string) || "").trim();

    const farmerObjectId = new mongoose.Types.ObjectId(farmerId);
    // Base filter
    const baseFilter: any = { farmerId: farmerObjectId };

    // CASE 1: KUCH BHI NHI HAI SERACH BHI AND CATEGORY BHI 
    if (!search && !category) {

      const { products, totalProducts, totalPages } = await getCustomerFarmerAllProducts(farmerObjectId, page, limit);

      return res.status(200).json({
        success: true,
        messages: ["", "All products"],
        products,
        page,
        limit,
        totalProducts,
        totalPages,
      });
    }

    // CASE 2: JAB SIRF SEARCH HAI 
    if (search && !category) {

      const matchedProducts = await getCustomerFarmerMatchedProducts(farmerObjectId, search);

      // Product not found
      if (!matchedProducts.length) {

        const { products, totalProducts, totalPages } = await getCustomerFarmerAllProducts(farmerObjectId, page, limit);

        return res.status(200).json({
          success: true,
          messages: ["Product not found", "Showing all products"],
          matchedProducts: [],
          products,
          page,
          limit,
          totalProducts,
          totalPages,
        });
      }

      // Product found
      const matchedCategory = matchedProducts[0].category;
      const matchedIds = matchedProducts.map(product => product._id);

      const filter = { ...baseFilter, category: matchedCategory, _id: { $nin: matchedIds } };
      const { products, totalProducts, totalPages } = await getCustomerFarmerPaginatedProducts(filter, page, limit);

      return res.status(200).json({
        success: true,
        messages: ["Matching products", `Explore more ${matchedCategory} products`],
        matchedProducts,
        products,
        page,
        limit,
        totalProducts,
        totalPages,
      });
    }

    // CASE 3: Category only
    if (!search && category) {

      const filter = { ...baseFilter, category };

      const { products, totalProducts, totalPages } = await getCustomerFarmerPaginatedProducts(filter, page, limit);

      // Category products not found
      if (!totalProducts) {

        const allProducts = await getCustomerFarmerAllProducts(farmerObjectId, page, limit);

        return res.status(200).json({
          success: true,
          messages: [`No products found in ${category}`, "Showing all products"],
          matchedProducts: [],
          products: allProducts.products,
          page,
          limit,
          totalProducts: allProducts.totalProducts,
          totalPages: allProducts.totalPages,
        });
      }

      return res.status(200).json({
        success: true,
        messages: ["Matching products", ""],
        matchedProducts: products,
        products: [],
        page,
        limit,
        totalProducts,
        totalPages,
      });
    }

    // CASE 4: Search + Category
    if (search && category) {

      const matchedProducts = await getCustomerFarmerMatchedProducts(farmerObjectId, search, category);

      // CASE 4.1 Product found in category
      if (matchedProducts.length) {

        const matchedIds = matchedProducts.map(product => product._id);

        const filter = { ...baseFilter, category, _id: { $nin: matchedIds } };

        const { products, totalProducts, totalPages } = await getCustomerFarmerPaginatedProducts(filter, page, limit);

        return res.status(200).json({
          success: true,
          messages: ["Matching products", `Explore more ${category} products`],
          matchedProducts,
          products,
          page,
          limit,
          totalProducts,
          totalPages,
        });
      }

      // CASE 4.2 Category exists but search doesn't match
      const categoryResult = await getCustomerFarmerPaginatedProducts({ ...baseFilter, category }, page, limit);

      if (categoryResult.totalProducts > 0) {

        return res.status(200).json({
          success: true,
          messages: [`No "${search}" found in ${category}`, `Showing all ${category} products`],
          matchedProducts: [],
          products: categoryResult.products,
          page,
          limit,
          totalProducts: categoryResult.totalProducts,
          totalPages: categoryResult.totalPages,
        });
      }

      // CASE 4.3 Neither search nor category found
      const allProducts = await getCustomerFarmerAllProducts(farmerObjectId, page, limit);

      return res.status(200).json({
        success: true,
        messages: [`No "${search}" found in ${category}`, "Showing all products"],
        matchedProducts: [],
        products: allProducts.products,
        page,
        limit,
        totalProducts: allProducts.totalProducts,
        totalPages: allProducts.totalPages,
      });
    }

  }
  catch (error: any) {
    console.error("error:", error);
    return res.status(500).json({ success: false, message: "Internal Server Error" });
  }
}
// ENDING OF THE GET CUSTOMER FARMER PRODUCTS
