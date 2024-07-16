import { Router } from "express";
import { expressAdapter } from "../utils/express-adapter";
import { createShipment } from "../useCases/shipments/createShipment";
import { addShipmentProduct } from "../useCases/shipments/addShipmentProduct";
import {
  validateShipment,
  validateShipmentProduct,
} from "../utils/validators/shipments/shipmentValidator";

const router = Router();

router.post("/shipments", validateShipment, expressAdapter(createShipment));
router.post(
  "/shipments/:id/add-products",
  validateShipmentProduct,
  expressAdapter(addShipmentProduct)
);

export default router;
