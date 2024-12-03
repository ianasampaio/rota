import { Router } from "express";
import { expressAdapter } from "../utils/express-adapter";

import { createShipment } from "../useCases/shipments/createShipment";
import { addShipmentProduct } from "../useCases/shipments/addShipmentProduct";
import { removeShipmentProduct } from "../useCases/shipments/removeShipmentProduct";
import { removeShipmentProductsByQuantity } from "../useCases/shipments/removeShipmentProductsByQuantity";
import { listShipments } from "../useCases/shipments/listShipments";
import { getShipment } from "../useCases/shipments/getShipment";

import { validateData } from "../middlewares/validationMiddleware";

import {
  validateShipment,
  validateShipmentProduct,
  validateShipmentProductToDelete,
  validateShipmentProductToDeleteByQuantity,
} from "../utils/schemas/shipments/shipmentSchemas";
import { closeShipment } from "../useCases/shipments/closeShipment";

const router = Router();

router.get("/shipments", expressAdapter(listShipments));

router.get("/shipments/:id", expressAdapter(getShipment));

router.post(
  "/shipments",
  validateData(validateShipment),
  expressAdapter(createShipment)
);
router.post(
  "/shipments/:id/products",
  validateData(validateShipmentProduct),
  expressAdapter(addShipmentProduct)
);
router.delete(
  "/shipments/:id/products",
  validateData(validateShipmentProductToDelete),
  expressAdapter(removeShipmentProduct)
);

router.delete(
  "/shipments/:id/products-by-quantity",
  validateData(validateShipmentProductToDeleteByQuantity),
  expressAdapter(removeShipmentProductsByQuantity)
);

router.patch(
  "/close-shipment/:id",
  expressAdapter(closeShipment)
);
export default router;
