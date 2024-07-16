import { Router } from "express";
import { expressAdapter } from "../utils/express-adapter";
import { createShipment } from "../useCases/shipments/createShipment";
import { addShipmentProduct } from "../useCases/shipments/addShipmentProduct";
import { validateData } from "../middlewares/validationMiddleware";
import {
  validateShipment,
  validateShipmentProduct,
} from "../utils/schemas/shipments/shipmentSchemas";

const router = Router();

router.post(
  "/shipments",
  validateData(validateShipment),
  expressAdapter(createShipment)
);
router.post(
  "/shipments/:id/add-products",
  validateData(validateShipmentProduct),
  expressAdapter(addShipmentProduct)
);

export default router;
