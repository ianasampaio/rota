import { Router } from "express";
import { listUsers } from "../useCases/users/listUsers";
import { signup } from "../useCases/auth/signup";
import { signin } from "../useCases/auth/signin";
import {
  validateUser,
  validateLogin,
} from "../middlewares/ValidationMiddleware";
import { expressAdapter } from "../utils/express-adapter";

const router = Router();

router.get("/users", listUsers);
router.post("/signup", validateUser, expressAdapter(signup));
router.post("/signin", validateLogin, expressAdapter(signin));

export default router;
