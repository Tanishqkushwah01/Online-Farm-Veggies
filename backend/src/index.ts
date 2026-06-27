import express from "express";
import cors from "cors";
import dotenv from "dotenv";

dotenv.config()
const app=express()
app.use(cors())

app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(cors({
    origin: process.env.CLIENT_URL,
    credentials:true
}))

// User
import userRouter from "./routes/user.router"
import connectToDB from "./utilities/database";
connectToDB();


app.use("/api/auth",userRouter);

console.log(process.env.PORT)
app.listen(process.env.PORT,()=>{
console.log("server running at 3000");
})