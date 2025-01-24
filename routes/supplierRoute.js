import express from "express";
import supplierController from "../controllers/supplierController.js";

const router = express.Router();

router.post("/", supplierController.createSupplier);
router.get("/", supplierController.getSuppliers);
router.get("/:id", supplierController.getSupplier);
router.delete("/:id", supplierController.deleteSupplier);
router.put("/", supplierController.updateSupplier);

export default router;