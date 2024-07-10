import { Router } from "express";
import { listUsers } from "../useCases/users/listUsers";

const router = Router();

router.get("/users", listUsers);

export default router;
