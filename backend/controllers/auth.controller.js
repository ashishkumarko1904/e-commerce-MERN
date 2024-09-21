import User from "../models/user.model.js"
export const signup = async (req,res)=>{
    const {email,password,name} = req.body;

    try {//check if user already exist
        // findOne() method is used to retrieve a single document from the collection based on certain criteria.
    const userExist = await User.findOne({email});
    if(userExist){
        res.status(400).json({message:"user already exist"});
    }
    //create a document that is 
    /*In Mongoose (and MongoDB in general), a document is a single record or entry in a collection, and it is stored in a JSON-like format called BSON (Binary JSON). A document typically contains data represented as key-value pairs, similar to how objects are structured in JavaScript. */
    const user = await User.create({name,email,password});
    res.status(201).json({user,message:"user created succesfully"});
    } catch (error) {
        res.status(500).json({message:error.message});
    }
    
    
    
}
export const login = async (req,res)=>{
    res.send("called login");
}
export const logout = async (req,res)=>{
    res.send("called logout");
}