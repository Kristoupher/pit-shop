import express from "express";
const router = express.Router();
import { protect, admin } from "../middleware/authMiddleware.js";
import {
    getProducts,
    getLastProducts,
    getProductsByCategory,
    getProductsByCategoryAndSortByPriceAsc,
    getProductsByCategoryAndSortByPriceDesc,
    getProductById,
    createProduct,
    updateProduct,
    deleteProduct
} from "../controllers/productController.js";

router.route("/").get(getProducts).post(protect, admin, createProduct);
router.route("/last").get(getLastProducts);
router.route("/:id").get(getProductById).put(protect, admin, updateProduct).delete(protect, admin, deleteProduct);
router.get("/category/:category", getProductsByCategory);
router.get("/category/:category/price/asc", getProductsByCategoryAndSortByPriceAsc);
router.get("/category/:category/price/desc", getProductsByCategoryAndSortByPriceDesc);

export default router;