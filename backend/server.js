import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import authRoutes from "./routes/auth.route.js";
import productRoutes from "./routes/product.route.js";
import cartRoutes from "./routes/cart.route";
import couponRoutes from "./routes/coupon.route.js";
import paymentRoutes from "./routes/payment.route.js"
import { connectdb } from "./lib/db.js";
dotenv.config();
const app = express();
const PORT = process.env.PORT || 5000;
//allow us to parse the request body
app.use(express.json());
app.use(cookieParser());
/* 
authRoutes is a collection of routes defined in auth.route.js.
The app.use("/api/auth", authRoutes); line tells Express to use those routes when the request path starts with /api/auth.
*/
app.use("/api/auth",authRoutes);
app.use("/api/products",productRoutes);
app.use("/api/cart",cartRoutes);
app.use("/api/coupons",couponRoutes);
app.use("/api/payments",paymentRoutes);

app.listen(PORT,()=>{
    connectdb();
    console.log(`server running on port : ${PORT}`)
});