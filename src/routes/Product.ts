import { Router } from "express";
import { listProducts } from "../useCases/products/listProducts";
import { getProduct } from "../useCases/products/getProduct";
import { createProduct } from "../useCases/products/createProduct";
import { validateProduct } from "../middlewares/ValidationMiddleware";

const router = Router();

router.get("/products", listProducts);
router.get("/products/:id", getProduct);
router.post("/products", validateProduct, createProduct);
// router.get("/products",);

export default router;
