import { Router } from "express";
import { expressAdapter } from "../utils/express-adapter";
import { createShipment } from "../useCases/shipments/createShipment";
import { validateShipment } from "../utils/validators/shipments/shipmentValidator";

const router = Router();

router.post("/shipments", validateShipment, expressAdapter(createShipment));

export default router;
