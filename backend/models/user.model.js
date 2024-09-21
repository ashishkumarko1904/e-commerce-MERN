import mongoose from "mongoose";
import bcrypt from "bcryptjs"
//creating a schema 
const userSchema = mongoose.Schema({
    name:{
        type:String,
        required:[true,"name is required"]
    }, 
    email:{
            type:String,
            required:[true,"email is required"],
            unique:true,
            lowercase:true,
            trim:true
        },
        password:{
            type:String,
            required:[true,"password is required"],
            minlength:[6,"password should be atleast 6 character long"]
        },
        cartItems:{
            quantity:[{
                type:Number,
                default:1
            }],
            product:{
                type:mongoose.Schema.Types.ObjectId,
                ref:"Product"
            }
                
        },
        role:{type:String,
            enum:["customer","admin"],
            default: "customer"
        }
    
},{ //createdat updatedat
    timestamps:true
});

//hashing the password before saving to db
userSchema.pre("save",async function (next){
    if(!this.isModified("password"))
        return next();
    try {
        const salt = await bcrypt.genSalt(10);
        this.password = await bcrypt.hash(this.password,salt);
        next();
    } catch (error) {
        next(error);
    }
});
userSchema.methods.comparePassword = async function(password){
    return bcrypt.compare(password,this.password);
}
//compile the schema into a model
const User = mongoose.model("User",userSchema);
export default User;