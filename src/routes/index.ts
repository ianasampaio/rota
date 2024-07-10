import { Router } from "express";
import AuthRouter from "./Auth";
import UsersRouter from "./User";
import ProductRouter from "./Product";
import ClientRouter from "./Client";
import { authenticate } from "../middlewares/AuthMiddleware";

const router = Router();

router.use(AuthRouter);
router.use(authenticate, UsersRouter);
router.use(authenticate, ProductRouter);
router.use(authenticate, ClientRouter);

export default router;
