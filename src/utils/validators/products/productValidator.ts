import { body } from "express-validator";

export const validateProduct = [
  body("name")
    .notEmpty()
    .withMessage("Name must be provided")
    .isString()
    .withMessage("Name must be a string"),
  body("value")
    .notEmpty()
    .withMessage("Value must be provided")
    .isInt()
    .withMessage("Value must be a integer"),
];

export const validateProductToUpdate = [
  body("name").optional().isString().trim().escape(),
  body("value").optional().isInt(),
];
