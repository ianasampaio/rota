import { Router } from "express";
import {
  validateClient,
  validateClientToUpdate,
} from "../middlewares/ValidationMiddleware";
import { createClient } from "../useCases/clients/createClient";
import { updateClient } from "../useCases/clients/updateClient";
import { expressAdapter } from "../utils/express-adapter";

const router = Router();

router.post("/clients", validateClient, expressAdapter(createClient));
router.patch(
  "/clients/:id",
  validateClientToUpdate,
  expressAdapter(updateClient)
);

export default router;
