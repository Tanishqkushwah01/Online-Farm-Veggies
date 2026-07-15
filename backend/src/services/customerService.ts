import orderModel from "../models/order.model";
import productModel from "../models/product.model";
import wishlistModel from "../models/wishlist.model";
import mongoose from "mongoose";



export const escapeRegex = (text: string) => text.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");


export const getCustomerFarmerPaginatedProducts = async (filter: any, page: number, limit: number) => {
    const skip = (page - 1) * limit;

    const [products, totalProducts] = await Promise.all([
        productModel
            .find(filter)
            .sort({ createdAt: -1 })
            .skip(skip)
            .limit(limit)
            .lean(),

        productModel.countDocuments(filter),
    ]);

    return {
        products,
        totalProducts,
        totalPages: Math.ceil(totalProducts / limit),
    };
};

export const getCustomerFarmerAllProducts = async (farmerObjectId: mongoose.Types.ObjectId, page: number, limit: number) => {
    return getCustomerFarmerPaginatedProducts({ farmerId: farmerObjectId }, page, limit)
};

export const getCustomerFarmerMatchedProducts = async (farmerObjectId: mongoose.Types.ObjectId, search: string, category?: string) => {

    const filter: any = {
        farmerId: farmerObjectId,
        productName: {
            $regex: `^${escapeRegex(search)}`,
            $options: "i",
        },
    };

    if (category) {
        filter.category = category;
    }

    return productModel
        .find(filter)
        .sort({ createdAt: -1 })
        .lean();
};


// Order start 
export const getPaginatedOrders = async (pipeline: any[], page: number, limit: number) => {
    const skip = (page - 1) * limit;
    const result = await orderModel.aggregate([...pipeline,
    {
        $facet: {
            orders: [
                { $sort: { createdAt: -1 } },
                { $skip: skip },
                { $limit: limit },
            ],

            totalCount: [
                {
                    $count: "count",
                },
            ],
        },
    },
    ]);

    const orders = result[0].orders;
    const totalOrders = result[0].totalCount.length > 0 ? result[0].totalCount[0].count : 0;

    return { orders, totalOrders, totalPages: Math.ceil(totalOrders / limit) };
};

export const getAllOrders = async (customerId: mongoose.Types.ObjectId, page: number, limit: number) => {

    const pipeline = [
        {
            $match: {
                customerId,
            },
        },
        {
            $lookup: {
                from: "products",
                localField: "productId",
                foreignField: "_id",
                as: "product",
            },
        },
        {
            $unwind: "$product",
        },
        {
            $lookup: {
                from: "farmers",
                localField: "farmerId",
                foreignField: "_id",
                as: "farmer",
            },
        },
        {
            $unwind: "$farmer",
        },
        {
            $project: {
                _id: 1,
                productId: "$product._id",
                farmerId: "$farmer._id",
                productName: "$product.productName",
                productImage: "$product.image",
                orderCode: 1,
                quantity: 1,
                totalPrice: "$totalAmount",
                requiredDate: "$neededBy",
                farmName: "$farmer.farmName",
                location: {
                    $ifNull: [
                        "$farmer.farmAddress",
                        "$farmer.city",
                    ],
                },
                phoneNumber: "$farmer.phoneNumber",
                orderedOn: "$createdAt",
                orderStatus: 1,
                createdAt: 1,
            },
        },
    ];

    return getPaginatedOrders(pipeline, page, limit);
};

export const getMatchedOrders = async (
    customerId: mongoose.Types.ObjectId,
    page: number,
    limit: number,
    search: string,
    category?: string
) => {
    const match: any = { customerId };

    const pipeline: any[] = [
        {
            $match: match,
        },
        {
            $lookup: {
                from: "products",
                localField: "productId",
                foreignField: "_id",
                as: "product",
            },
        },
        {
            $unwind: "$product",
        },
        {
            $lookup: {
                from: "farmers",
                localField: "farmerId",
                foreignField: "_id",
                as: "farmer",
            },
        },
        {
            $unwind: "$farmer",
        },
    ];

    const searchFilter: any = {};

    if (search) {
        searchFilter.$or = [
            {
                "product.productName": {
                    $regex: escapeRegex(search),
                    $options: "i",
                },
            },
            {
                orderCode: {
                    $regex: escapeRegex(search),
                    $options: "i",
                },
            },
        ];
    }

    if (category) {
        searchFilter["product.category"] = category;
    }

    if (Object.keys(searchFilter).length > 0) {
        pipeline.push({
            $match: searchFilter,
        });
    }

    pipeline.push({
        $project: {
            _id: 1,
            productId: "$product._id",
            farmerId: "$farmer._id",
            productName: "$product.productName",
            productImage: "$product.image",
            orderCode: 1,
            quantity: 1,
            totalPrice: "$totalAmount",
            requiredDate: "$neededBy",
            farmName: "$farmer.farmName",
            location: {
                $ifNull: [
                    "$farmer.farmAddress",
                    "$farmer.city",
                ],
            },
            phoneNumber: "$farmer.phoneNumber",
            orderedOn: "$createdAt",
            orderStatus: 1,
            createdAt: 1,
        },
    });

    return getPaginatedOrders(pipeline, page, limit);
};


// Order end 


// wishlist start 

export const getPaginatedWishlist = async (pipeline: any[], page: number, limit: number) => {
    const skip = (page - 1) * limit;
    const result = await wishlistModel.aggregate([...pipeline,
    {
        $facet: {
            wishlist: [
                { $sort: { createdAt: -1 } },
                { $skip: skip },
                { $limit: limit },
            ],
            totalCount: [
                {
                    $count: "count",
                },
            ],
        },
    },
    ]);
    const wishlist = result[0].wishlist;
    const totalWishlist = result[0].totalCount.length > 0 ? result[0].totalCount[0].count : 0;

    return { wishlist, totalWishlist, totalPages: Math.ceil(totalWishlist / limit) };
};

export const getWishlistPipeline = (customerId: mongoose.Types.ObjectId, search: string, category: string) => {
    const pipeline: any[] = [
        {
            $match: {
                customerId,
            },
        },
        {
            $lookup: {
                from: "products",
                localField: "productId",
                foreignField: "_id",
                as: "productId",
            },
        },
        {
            $unwind: "$productId",
        },
    ];
    if (search.trim()) {
        pipeline.push({
            $match: {
                "productId.productName": {
                    $regex: escapeRegex(search),
                    $options: "i",
                },
            },
        });
    }

    if (category.trim()) {
        pipeline.push({
            $match: {
                "productId.category": category,
            },
        });
    }

    return pipeline;
};


// wishlist end 



// home page search helper 


export const getCustomerPaginatedProducts = async (
    filter: any,
    page: number,
    limit: number,
    sort: any = { createdAt: -1 }
) => {
    const totalProducts = await productModel.countDocuments(filter);

    const totalPages = Math.max(Math.ceil(totalProducts / limit), 1);

    const skip = (page - 1) * limit;

    const products = await productModel
        .find(filter)
        .sort(sort)
        .skip(skip)
        .limit(limit);

    return {
        products,
        totalProducts,
        totalPages,
    };
};

export const getCustomerMatchedProducts = async (
    search: string,
    category?: string,
    location?: string,
    price?: string
) => {

    const filter: any = {
        isAvailable: true,
        quantity: { $gt: 0 },
        productName: {
            $regex: escapeRegex(search),
            $options: "i",
        },
    };

    // Category
    if (category && category !== "All Category") {
        filter.category = category;
    }

    // Location
    if (location && location !== "All Location") {
        filter.city = location;
    }

    const sort: any = {};

    // Price Sorting
    if (price === "lowToHigh") {
        sort.price = 1;
    }

    if (price === "highToLow") {
        sort.price = -1;
    }

    const matchedProducts = await productModel
        .find(filter)
        .sort(
            Object.keys(sort).length
                ? sort
                : { createdAt: -1 }
        );

    return matchedProducts;
};

export const getCustomerAllProducts = async (
    page: number,
    limit: number,
    category?: string,
    location?: string,
    price?: string
) => {

    const filter: any = {
        isAvailable: true,
        quantity: { $gt: 0 },
    };

    // Category
    if (category && category !== "All Category") {
        filter.category = category;
    }

    // Location
    if (location && location !== "All Location") {
        filter.city = location;
    }

    const sort: any = {};

    if (price === "lowToHigh") {
        sort.price = 1;
    }

    if (price === "highToLow") {
        sort.price = -1;
    }

    return await getCustomerPaginatedProducts(
        filter,
        page,
        limit,
        Object.keys(sort).length
            ? sort
            : { createdAt: -1 }
    );
};

export const getCustomerCategoryProducts = async (
  category: string,
  excludeIds: any[],
  page: number,
  limit: number,
  location?: string,
  price?: string
) => {

  const filter: any = {
    isAvailable: true,
    quantity: { $gt: 0 },
    category,
    _id: { $nin: excludeIds },
  };

  // Location filter
  if (    location &&    location !== "All Location"  ) {
    filter.city = location;
  }

  const sort: any = {};

  if (price === "lowToHigh") {
    sort.price = 1;
  }

  if (price === "highToLow") {
    sort.price = -1;
  }

  return await getCustomerPaginatedProducts(
    filter,
    page,
    limit,
    Object.keys(sort).length
      ? sort
      : { createdAt: -1 }
  );
};