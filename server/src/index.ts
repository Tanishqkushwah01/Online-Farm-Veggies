import express from "express";
// import { url } from "node:inspector";
import dotenv from "dotenv";
import cors from "cors";

dotenv.config()
const app=express()

app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(cors({
    origin: "http:localhost:5173",
    credentials:true
}))

// User
import userRouter from "./routes/user.router"
import connectToDB from "./utilities/database";
connectToDB();
app.use("/api/auth",userRouter)
console.log(process.env.PORT)
app.listen(process.env.PORT,()=>{
console.log("server running at 3000");
})