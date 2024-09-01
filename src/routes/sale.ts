import { Router } from "express";
import { expressAdapter } from "../utils/express-adapter";
import { createSale } from "../useCases/sales/createSale";
import { validateData } from "../middlewares/validationMiddleware";
import { validatePayment, validateSale } from "../utils/schemas/sales/saleSchema";
import { listSales } from "../useCases/sales/listSales";
import { getSale } from "../useCases/sales/getSale";
import { addPaymentToSale } from "../useCases/sales/addPaymentToSale";
import { getSalesByClient } from "../useCases/sales/getSalesByClient";

const router = Router();

router.post("/sales", validateData(validateSale),expressAdapter(createSale));
router.get("/sales", expressAdapter(listSales));
router.get("/sales/:id", expressAdapter(getSale));
router.get("/sales/client/:clientId", expressAdapter(getSalesByClient));
router.post("/sales/:id/payment", validateData(validatePayment), expressAdapter(addPaymentToSale));

export default router;
