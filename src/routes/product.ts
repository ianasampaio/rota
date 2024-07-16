import { Router } from "express";
import { listProducts } from "../useCases/products/listProducts";
import { getProduct } from "../useCases/products/getProduct";
import { createProduct } from "../useCases/products/createProduct";
import { updateProduct } from "../useCases/products/updateProduct";
import { expressAdapter } from "../utils/express-adapter";
import { validateData } from "../middlewares/validationMiddleware";
import {
  validateProduct,
  validateProductToUpdate,
} from "../utils/schemas/products/productSchemas";

const router = Router();

router.get("/products", expressAdapter(listProducts));
router.get("/products/:id", expressAdapter(getProduct));
router.post(
  "/products",
  validateData(validateProduct),
  expressAdapter(createProduct)
);
router.patch(
  "/products/:id",
  validateData(validateProductToUpdate),
  expressAdapter(updateProduct)
);

export default router;
