import { Request, Response } from "express";
import productModel from "../models/product.model";
import { FarmerModel } from "../models/farmer.model";
import { populate } from "dotenv";



// Get All Products with Pagination and Filters.
export const getAllProducts = async (
    req: Request,
    res: Response
): Promise<any> => {
    try {

        const {
            search,
            city,
            page = "1",
            limit = "10"
        } = req.query;

        const currentPage = Number(page);
        const pageLimit = Number(limit);
        const skip = (currentPage - 1) * pageLimit;

        // Dynamic Filter
        const filter: any = {};

        // Search by Product Name
        if (search) {
            filter.name = {
                $regex: "^" + search,
                $options: "i"
            };
        }

        // Filter by City
        if (city) {
            filter.city = {
                $regex: city,
                $options: "i"
            };
        }

        const products = await productModel
            .find(filter)
            .populate({
                path: "farmerId",
                select: "farmName city"
            })
            .skip(skip)
            .limit(pageLimit)
            .sort({ createdAt: -1 });

        const totalProducts = await productModel.countDocuments(filter);

        return res.status(200).json({
            success: true,
            currentPage,
            totalPages: Math.ceil(totalProducts / pageLimit),
            totalProducts,
            products
        });

    } catch (error: any) {

        return res.status(500).json({
            success: false,
            message: error.message
        });
    }
};



export const getFarmerProfile = async (
    req: Request,
    res: Response
)=> {
try{
    const {farmerId} = req.params;

    console.log("Farmer ID:", farmerId);


    const farmer= await FarmerModel.findById(farmerId);

    if(!farmer){
       return res.status(404).json({
            success:false,
            msg:"Farmer not found"
        })
    }
      return  res.status(200).json({
            success:true,
            msg:"Farmer Found",
            data:{
               farmName: farmer.farmName,
                city: farmer.city,
                bio: farmer.bio,
                mainCrops: farmer.mainCrops,
                farmAddress: farmer.farmAddress
            }
        })  }catch(err){
    console.log(err);

    res.status(500).json({
        success:false,
        msg:"Internal Server Error"
    })
}

}


export const getProductDetails = async (
    req: Request,
    res: Response
) => {
    try {
        const { productId } = req.params;

        const product = await productModel.findById(productId)
        .populate({
            path:"farmerId",
            select:"farmName city bio farmName mainCrops farmAddress"
        });

        if (!product) {
            return res.status(404).json({
                success: false,
                msg: "Product not found"
            });
        }

        return res.status(200).json({
            success: true,
            msg: "Product Found",
            data: product
        });
    }
    catch (err) {
        console.log(err);
        res.status(500).json({  

            success: false,
            msg: "Internal Server Error"


        })
}
}