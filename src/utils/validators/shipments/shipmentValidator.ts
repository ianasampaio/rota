import { body } from "express-validator";

export const validateShipment = [
  body("location")
    .notEmpty()
    .withMessage("Location must be provided")
    .isString()
    .withMessage("Location must be a string"),
];
