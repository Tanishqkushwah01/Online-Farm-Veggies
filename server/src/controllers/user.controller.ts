import {Request,Response} from "express"
import UserModel from "../models/user.model"
import userValidation from "../types/user.validation"
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken";

/**
     * Register API
     * @description: This API is used to create a new user account
     * @route /api/auth/signup
*/
export const signup =async(req:Request,res:Response)=>{
try{
    const details= req.body;
    const validUser= userValidation.safeParse(details)
    if(validUser.success){

const existingUser = await UserModel.findOne({
  $or: [
    { email: details.email },
    { phoneNumber: details.phoneNumber }
  ]
});

if (existingUser) {
  if (existingUser.email === details.email) {
    return res.status(409).json({
      success: false,
      message: "Email already exists"
    });
  }

  if (existingUser.phoneNumber === details.phoneNumber) {
    return res.status(409).json({
      success: false,
      message: "Phone number already exists"
    });
  }
}
    const hashedPass = await bcrypt.hash(details.password,10)
    const User= await UserModel.create({...details,password:hashedPass})
    const token= jwt.sign(
        {UserId:User._id},
        process.env.JWT_SECRET!,
        {
            expiresIn:"7d",
        });
        res.status(201).json({msg:"Registered",token})
    }
}catch (error: any) {

    console.error("Signup Error:", error);

    if (error.code === 11000) {
      return res.status(409).json({
        success: false,
        message: "Email or phone number already exists",
      });
    }

    if (error.name === "ValidationError") {
      return res.status(400).json({
        success: false,
        message: error.message,
      });
    }
}
}

/**
     * Login API
     * @description: This API is used to login a user.
     * @route /api/auth/signup
*/
export const signin =async (req:Request,res:Response)=>{
    try{
    const {email,password}= req.body
    const userExist= await UserModel.findOne({email})
    
    if (!userExist) {
  return res.status(404).json({
    success: false,
    message: "User not found"
  })
}
const isPasswordCorrect= await bcrypt.compare(password,userExist.password)

if (!isPasswordCorrect) {
      return res.status(401).json({
        success: false,
        message: "Invalid email or password",
      });
    }
    // Token Creation
const token= jwt.sign(
        {UserId:userExist.id},
        process.env.JWT_SECRET!,
        {
            expiresIn:"7d"
   })
res.status(201).json({msg:"LoggedIn",token})
}
catch (error: any) {
    console.error("Signin Error:", error);

    return res.status(500).json({
        success: false,
        message: "Something went wrong. Please try again later."
    });
}
}
