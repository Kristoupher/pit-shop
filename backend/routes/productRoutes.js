import express from "express";
const router = express.Router();
import { protect, admin } from "../middleware/authMiddleware.js";
import {
    getProducts,
    getProductsSearch,
    getLastProducts,
    getProductsByCategory,
    getProductsByCategoryAndSortByPriceAsc,
    getProductsByCategoryAndSortByPriceDesc,
    getTeams,
    getDrivers,
    getTypes,
    getSizes,
    getProductById,
    createProduct,
    updateProduct,
    deleteProduct
} from "../controllers/productController.js";

router.route("/").get(getProducts).post(protect, admin, createProduct);
router.route("/search/:keyword").get(getProductsSearch);
router.route("/teams/:id").get(getTeams);
router.route("/drivers/:id").get(getDrivers);
router.route("/types/:id").get(getTypes);
router.route("/sizes/:id").get(getSizes);
router.route("/last").get(getLastProducts);
router.route("/:id").get(getProductById).put(protect, admin, updateProduct).delete(protect, admin, deleteProduct);
router.get("/category/:category", getProductsByCategory);
router.get("/category/:category/price/asc", getProductsByCategoryAndSortByPriceAsc);
router.get("/category/:category/price/desc", getProductsByCategoryAndSortByPriceDesc);

export default router;