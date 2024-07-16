import { Router } from "express";
import { signup } from "../useCases/auth/signup";
import { signin } from "../useCases/auth/signin";
import { expressAdapter } from "../utils/express-adapter";
import { validateData } from "../middlewares/validationMiddleware";
import {
  validateSignin,
  validateSignup,
} from "../utils/schemas/auth/authSchemas";

const router = Router();

router.post("/signup", validateData(validateSignup), expressAdapter(signup));
router.post("/signin", validateData(validateSignin), expressAdapter(signin));

export default router;
