import { Router } from "express";
import { signup } from "../useCases/auth/signup";
import { signin } from "../useCases/auth/signin";

import { expressAdapter } from "../utils/express-adapter";
import {
  validateSignin,
  validateSignup,
} from "../utils/validators/auth/authValidator";

const router = Router();

router.post("/signup", validateSignup, expressAdapter(signup));
router.post("/signin", validateSignin, expressAdapter(signin));

export default router;
