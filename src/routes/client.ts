import { Router } from "express";
import { createClient } from "../useCases/clients/createClient";
import { updateClient } from "../useCases/clients/updateClient";
import { expressAdapter } from "../utils/express-adapter";
import { listClient } from "../useCases/clients/listClient";
import { getClient } from "../useCases/clients/getClient";
import { validateData } from "../middlewares/validationMiddleware";
import {
  validateClient,
  validateClientToUpdate,
} from "../utils/schemas/clients/clientSchemas";

const router = Router();

router.get("/clients", expressAdapter(listClient));
router.get("/clients/:id", expressAdapter(getClient));
router.post(
  "/clients",
  validateData(validateClient),
  expressAdapter(createClient)
);
router.patch(
  "/clients/:id",
  validateData(validateClientToUpdate),
  expressAdapter(updateClient)
);

export default router;
