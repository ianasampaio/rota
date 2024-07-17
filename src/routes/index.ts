import { Router } from "express";
import AuthRouter from "./auth";
import ProductRouter from "./product";
import ClientRouter from "./client";
import ShipmentRouter from "./shipment";
import { authenticate } from "../middlewares/authMiddleware";

const router = Router();

router.use(AuthRouter);
router.use(authenticate, ProductRouter);
router.use(authenticate, ClientRouter);
router.use(authenticate, ShipmentRouter);

export default router;
