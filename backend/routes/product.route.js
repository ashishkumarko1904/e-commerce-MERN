import express from "express";
import { getAllProducts ,getFeaturedProducts,createProduct,deleteProduct,getRecommendedProducts,getProductsByCategory} from "../controllers/product.controller.js";
import { protectRoute,adminRoute } from "../middleware/auth.middleware.js";
import { toggleFeaturedProducts } from "../controllers/product.controller.js";
const router = express.Router();

router.get("/",getAllProducts);
router.get("/featured",getFeaturedProducts);
router.get("/category/:category",getProductsByCategory);
router.get("/recommendation",getRecommendedProducts);
router.post("/",protectRoute,adminRoute,createProduct);
router.patch("/:id",protectRoute,adminRoute,toggleFeaturedProducts);
router.delete("/:id",protectRoute,adminRoute,deleteProduct);
export default router;