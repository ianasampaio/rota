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
  body("value")
    .notEmpty()
    .withMessage("Price must be provided")
    .isInt()
    .withMessage("Price must be a integer"),
];

export const validateProductToUpdate = [
  body("name").optional().isString().trim().escape(),
  body("value").optional().isInt(),
];

export const validateClient = [
  body("name")
    .notEmpty()
    .withMessage("Name must be provided")
    .isString()
    .withMessage("Name must be a string"),
  body("adress")
    .notEmpty()
    .withMessage("Name must be provided")
    .isString()
    .withMessage("Name must be a string"),
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
