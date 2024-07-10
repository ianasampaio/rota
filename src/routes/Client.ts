import { Router } from "express";
import { validateClient } from "../middlewares/ValidationMiddleware";
import { createClient } from "../useCases/clients/createClient";

const router = Router();

router.post("/clients", validateClient, createClient);

export default router;
