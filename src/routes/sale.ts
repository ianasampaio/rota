import { Router } from "express";
import { expressAdapter } from "../utils/express-adapter";
import { createSale } from "../useCases/sales/createSale";
import { validateData } from "../middlewares/validationMiddleware";
import { validateSale } from "../utils/schemas/sales/saleSchema";
import { listSales } from "../useCases/sales/listSales";
import { getSale } from "../useCases/sales/getSale";

const router = Router();

router.post("/sales", validateData(validateSale),expressAdapter(createSale));
router.get("/sales", expressAdapter(listSales));
router.get("/sales/:id", expressAdapter(getSale));

export default router;
