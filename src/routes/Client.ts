import { Router } from "express";
import {
  validateClient,
  validateClientToUpdate,
} from "../middlewares/ValidationMiddleware";
import { createClient } from "../useCases/clients/createClient";
import { updateClient } from "../useCases/clients/updateClient";

const router = Router();

router.post("/clients", validateClient, createClient);
router.patch("/clients/:id", validateClientToUpdate, updateClient);

export default router;
