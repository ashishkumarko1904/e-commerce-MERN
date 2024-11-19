import Product  from "../models/product.model.js";
import mongoose from "mongoose";

export const getCartProducts = async (req,res)=>{
    try {
        
       console.log("user is",req.user);
       // Extract only the `_id` values from `cartItems`
//const productIds = req.user.cartItems.map(item => item._id);
//const productIds = req.user.cartItems.map(item => new mongoose.Types.ObjectId(item._id));
// Extract product IDs from `cartItems`
const productIds = req.user.cartItems.map(item => item.product);


console.log("ids",productIds);

//checking
//const pd = await Product.findOne({"_id":"67087e1dac1fc6b032865fe2"}).exec();
//console.log("checked",pd);

// Query the Product collection using the extracted `_id`s
const products = await Product.find({ _id: { $in: productIds } });

        
        //const products = await Product.find({_id:{$in:req.user.cartItems}});
        console.log("zzzz",products);
        //add quantity for each product
        const cartItems = products.map(pd => {
            console.log("**********************************************************");
            console.log(pd);
            console.log(req.user.cartItems);
           const item = req.user.cartItems.find(cartItem => cartItem.product.toString() === pd._id.toString());
    
            console.log("item in getcartitems is",item);
            return {...pd.toJSON(),quantity:item.quantity};
        })
      
        res.json(cartItems);
    } catch (error) {
console.log("error in getcartproducts controller",error.message);
res.status(500).json({message:"server error",error:error.message});
    }
}

export const addToCart = async(req,res)=>{
try {
    const pd = req.body;
    console.log(pd);
    const {productId} = pd;
    console.log("produvt id is ",productId);
    const user = req.user;
    const existingItem = user.cartItems.find((item)=>{
        
        return item.product.toString() === productId;
    })
    console.log("item exists",existingItem);
    if(existingItem){
        
        existingItem.quantity = Number(existingItem.quantity) + 1;
    }
    else{
        user.cartItems.push({
            product:productId,
            quantity:1,
        });
    }
    await user.save();
    res.json(user.cartItems);
} catch (error) {
    console.log("error in addtocart controller",error.message);
    res.status(500).json({message:"server error",error:error.message});
}
}

export const removeAllFromCart = async(req,res)=>{
    try {
        const {productId} = req.body;
        const user = req.user;
        if(!productId){
            user.cartItems = [];
        }
        else{
            user.cartItems = user.cartItems.filter((item)=>item.product.toString() !== productId);
        }
        await user.save();
        res.json(user.cartItems);
    } catch (error) {
        res.status(500).json({message:"server error",error:error.message});
    }
}

export const updateQuantity = async(req,res)=>{
 try {
       const {id:productId} = req.params;
       const {quantity} = req.body;
       const user =  req.user;
       const existingItem = user.cartItems.find((item)=>item.id.toString() === productId);
       if(existingItem){
           if(quantity === 0){
               user.cartItems = user.cartItems.filter((item)=> item.id.toString() !== productId);
               await user.save();
               return res.json(user.cartItems);
           }
           existingItem.quantity = quantity;
           await user.save();
           res.json(user.cartItems);
       }
       else{
           res.status(400).json({message:"product not found"});
       }
 } catch (error) {
    console.log("error in updateQuantity controller ",error.message);
    res.status(500).json({message:"server error",error:error.message});
 }
}