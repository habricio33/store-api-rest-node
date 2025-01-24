import express from "express";
import productController from "../controllers/productController.js";

const router = express.Router();

router.post("/", productController.createProduct);
router.get("/", productController.getProducts);
router.get("/:info", productController.getAllProductInfo);
router.get("/:id", productController.getProduct);
router.delete("/:id", productController.deleteProduct);
router.put("/", productController.updateProduct);
router.post("/info", productController.createProductInfo);
router.put("/info", productController.updateProductInfo);
router.delete("/info/:id", productController.deleteProductInfo);
router.post("/review", productController.createReview);
router.delete("/:id/review/:index", productController.deleteReview); //:index pois podem existir varios reviews associado ao mesmo produto 


export default router;