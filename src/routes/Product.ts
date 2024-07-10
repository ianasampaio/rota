import { Router } from "express";
import { listProducts } from "../useCases/products/listProducts";
import { getProduct } from "../useCases/products/getProduct";
import { createProduct } from "../useCases/products/createProduct";
import {
  validateProduct,
  validateProductToUpdate,
} from "../middlewares/ValidationMiddleware";
import { updateProduct } from "../useCases/products/updateProduct";

const router = Router();

router.get("/products", listProducts);
router.get("/products/:id", getProduct);
router.post("/products", validateProduct, createProduct);
router.patch("/products/:id", validateProductToUpdate, updateProduct);

export default router;
