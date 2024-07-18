import { Router } from "express";
import { expressAdapter } from "../utils/express-adapter";
import { createShipment } from "../useCases/shipments/createShipment";
import { addShipmentProduct } from "../useCases/shipments/addShipmentProduct";
import { validateData } from "../middlewares/validationMiddleware";
import {
  validateShipment,
  validateShipmentProduct,
  validateShipmentProductToDelete,
} from "../utils/schemas/shipments/shipmentSchemas";
import { removeShipmentProduct } from "../useCases/shipments/removeShipmentProduct";

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
router.delete(
  "/shipments/:id/remove-products",
  validateData(validateShipmentProductToDelete),
  expressAdapter(removeShipmentProduct)
);
export default router;
