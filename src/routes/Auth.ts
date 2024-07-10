import { Router } from "express";
import { listUsers } from "../useCases/users/listUsers";
import { signup } from "../useCases/auth/signup";
import { signin } from "../useCases/auth/signin";
import {
  validateUser,
  validateLogin,
} from "../middlewares/ValidationMiddleware";

const router = Router();

router.get("/users", listUsers);
router.post("/signup", validateUser, signup);
router.post("/signin", validateLogin, signin);

export default router;
