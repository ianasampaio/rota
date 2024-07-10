import { body } from "express-validator";

export const validateUser = [
  body("name")
    .notEmpty()
    .withMessage("Name must be provided")
    .isString()
    .withMessage("Name must be a string"),
  body("email").isEmail().withMessage("Invalid email format"),
  body("password")
    .isLength({ min: 6 })
    .withMessage("Password must be at least 6 characters long"),
];

export const validateLogin = [
  body("email").isEmail().withMessage("Invalid email format"),
  body("password").isString().withMessage("Password must be provided"),
];

export const validateProduct = [
  body("name")
    .notEmpty()
    .withMessage("Name must be provided")
    .isString()
    .withMessage("Name must be a string"),
  body("price")
    .notEmpty()
    .withMessage("Price must be provided")
    .isDecimal()
    .withMessage("Price must be a decimal"),
];

export const validateProductToUpdate = [
  body("name").optional().isString().trim().escape(),
  body("price").optional().isDecimal(),
];
