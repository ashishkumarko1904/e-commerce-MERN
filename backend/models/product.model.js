import mongoose from "mongoose";
//define the schema
const productSchema = new mongoose.Schema({
    name:{
        type:String,
    required:true    },
    description:{
        type:String,
        required:true
    },
    price:{
        type:Number,
        min:0,
        required:true
    },
    image:{
        type:String,
        required:[true,"image is required"]
    },
    category:{
        type:String,
        required:true
    },
    isFeatured:{
        type:Boolean,
        default:false
    }
},{timestamps:true});

//create the model
const Product = mongoose.model("Product",productSchema);

export default Product;