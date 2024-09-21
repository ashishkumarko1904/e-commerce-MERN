import mongoose from "mongoose";

export const connectdb = async()=>{
    try {
        const conn = mongoose.connect(process.env.MONGO_URI)
        console.log(`connected to mongodb`)
    } catch (error) {
        console.log(`error connecting mongodb`,error.message);
        process.exit(1);
    }
}