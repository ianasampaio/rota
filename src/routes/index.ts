import { Router } from "express";
import AuthRouter from "./auth";
import ProductRouter from "./product";
import ClientRouter from "./client";
import { authenticate } from "../middlewares/AuthMiddleware";

const router = Router();

router.use(AuthRouter);
router.use(authenticate, ProductRouter);
router.use(authenticate, ClientRouter);

export default router;
