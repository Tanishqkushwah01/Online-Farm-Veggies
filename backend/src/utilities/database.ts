import mongoose from "mongoose";

async function connectToDB() {
    try {
        const uri= process.env.MONGO_URI
        console.log(uri)
        await mongoose.connect(process.env.MONGO_URI!)
        console.log("connected to database")
    }
    catch (err) {
        console.log(err)
    }
}
export default connectToDB;