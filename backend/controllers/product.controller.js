import Product from "../models/product.model.js"
import cloudinary from "../lib/cloudinary.js";
import { redis } from "../lib/redis.js";

export const getAllProducts = async (req,res)=>{
    try {
        const products = await Product.find({}); // get all the products 
        res.json({products});
    } catch (error) {
        console.log("error in get all product controller",error.message);
        res.status(500).json({message:"server error",error:error.message});
    }
}
 
//featured products 
/* it would be good to store the featured products in the redis database as they are rfrequently seen and are shown on homepage which saves us from querying
the mongodb for it and homepage can load more faster..  */
export const getFeaturedProducts = async(req,res)=>{
try {
    let featuredProducts = await redis.get("featured_products");
    if(featuredProducts){
        return res.json(JSON.parse(featuredProducts));
    }
    //if not in redis fetch from the mongo db
    //.lean return a plain js object rather than a mongo db document
    featuredProducts = await Product.find({isFeatured:true}).lean();

    if(!featuredProducts){
        return res.status(404).json({message:"no product found"});
    }
    //store in redis for future reference
    await redis.set("featured_products",JSON.stringify(featuredProducts));
    res.json(featuredProducts);
} catch (error) {
    console.log("error in getfeaturedproducts controller",error.message);
    res.status(501).json({message:"server error",error:error.message});
}
}

export const createProduct = async(req,res)=>{
    try {
        const {name,description,price,image,category} = req.body;
        let cloudinaryResponse = null;
        let imageUrl = null;
        if(image){
            cloudinaryResponse = await cloudinary.uploader.upload(image,{folder:"products"});
            console.log(cloudinaryResponse.secure_url);
        }
        const product = await Product.create({
            name,
            description,
            price,
            image:cloudinaryResponse.secure_url?cloudinaryResponse.secure_url:"",
            category

        });
        res.status(201).json(product);
    } catch (error) {
        console.log("error in createproduct controller",error.message);
        res.status(500).json({message:"server error",error:error.message});
        
    }
}

export const deleteProduct = async(req,res)=>{
    try {
		const product = await Product.findById(req.params.id);

		if (!product) {
			return res.status(404).json({ message: "Product not found" });
		}

		if (product.image) {
			const publicId = product.image.split("/").pop().split(".")[0];
			try {
				await cloudinary.uploader.destroy(`products/${publicId}`);
				console.log("deleted image from cloduinary");
			} catch (error) {
				console.log("error deleting image from cloduinary", error);
			}
		}

		await Product.findByIdAndDelete(req.params.id);

		res.json({ message: "Product deleted successfully" });
	} catch (error) {
		console.log("Error in deleteProduct controller", error.message);
		res.status(500).json({ message: "Server error", error: error.message });
	}
}

export const getRecommendedProducts = async(req,res)=>{
    try {
        const products =  await Product.aggregate([{
            $sample: {size:3}
        },{
            $project:{
                _id:1,
                name:1,
                description:1,
                image:1,
                price:1
            }
        }])
        res.json(products);
    } catch (error) {
        console.log("error in getrecommendedProducts controller",error.message);
        res.status(500).json({message:"server error",error:error.message});
    }
}

export const getProductsByCategory = async(req,res)=>{
try {
    const {category} = req.params;
    const products = Product.find({category});
    res.json(products);
} catch (error) {
    console.log("error in getProductbycategory",error.message);
    res.status(500).json({message:"server error",error:error.message});
}
}

export const toggleFeaturedProducts = async(req,res)=>{
    try {
        const product = await Product.findById(req.params.id);
        if(product){
            product.isFeatured = !product.isFeatured;
            const updatedProduct = await product.save();
            await updateFeaturedProductCache();
            res.json(updatedProduct);
        }
        else{
            res.status(404).json({message:"product not found"});
        }
    } catch (error) {
        console.log("error in toggleFeaturedproduct",error.message);
        res.status(500).json({message:"server error",error:error.message});
    }
}
 
async function updateFeaturedProductCache() {
    try {
        const featuredProducts = await Product.find({isFeatured:true}).lean();
        await redis.set("featured_products",JSON.stringify(featuredProducts));
    } catch (error) {
        console.log(error);
        console.log("error in update cache function");
    }
}