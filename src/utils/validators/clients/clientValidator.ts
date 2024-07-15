import { body } from "express-validator";

export const validateClient = [
  body("name")
    .notEmpty()
    .withMessage("Name must be provided")
    .isString()
    .withMessage("Name must be a string"),
  body("adress")
    .notEmpty()
    .withMessage("adress must be provided")
    .isString()
    .withMessage("adress must be a string"),
  body("contact")
    .matches(/^\d{10,11}$/)
    .withMessage("Invalid contact format"),
];

export const validateClientToUpdate = [
  body("name").optional().isString().trim().escape(),
  body("adress").optional().isString().trim().escape(),
  body("contact")
    .optional()
    .matches(/^\d{10,11}$/)
    .withMessage("Invalid contact format"),
];
