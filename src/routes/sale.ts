import { Router } from "express";
import { expressAdapter } from "../utils/express-adapter";
import { createSale } from "../useCases/sales/createSale";
import { validateData } from "../middlewares/validationMiddleware";
import { validateSale } from "../utils/schemas/sales/saleSchema";

const router = Router();

router.post("/sales", validateData(validateSale),expressAdapter(createSale));

export default router;
