import { Router } from "express";
import { createClient } from "../useCases/clients/createClient";
import { updateClient } from "../useCases/clients/updateClient";
import { expressAdapter } from "../utils/express-adapter";
import {
  validateClient,
  validateClientToUpdate,
} from "../utils/validators/clients/clientValidator";
import { listClient } from "../useCases/clients/listClient";

const router = Router();

router.get("/clients", expressAdapter(listClient));
router.post("/clients", validateClient, expressAdapter(createClient));
router.patch(
  "/clients/:id",
  validateClientToUpdate,
  expressAdapter(updateClient)
);

export default router;
