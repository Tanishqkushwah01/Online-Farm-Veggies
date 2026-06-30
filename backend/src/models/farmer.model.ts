import mongoose from "mongoose";


const farmerSchema= new mongoose.Schema({
    
    _id:{
        type: mongoose.Schema.Types.ObjectId,
        ref:"User",
        required:true,
        unique:true
    },

    farmName:{
        type:String,
        default:""
    },

     City:{
        type:String,
        default:""
    },

    review:{
        type:Number,
        default:0
    },
    mainCrops:{
        type:[String],
        default:""
    },
    bio:{
        type:String,
        default:""
    },

    farmAddress:{
        type:String,
        default:""
    },

    farmerDescription:{
        type:String,
        default:""
    },
    isProfileCompleted:{
        type:Boolean,
        default:"false"
    }   
});

export const FarmerModel = mongoose.model("Farmer",farmerSchema);
