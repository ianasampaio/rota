import { body, check } from "express-validator";

export const validateShipment = [
  body("location")
    .notEmpty()
    .withMessage("Location must be provided")
    .isString()
    .withMessage("Location must be a string"),
];

export const validateShipmentProduct = [
  body("product_id")
    .notEmpty()
    .withMessage("Product ID must be provided")
    .isString()
    .withMessage("Product ID must be a string"),
  body("name")
    .notEmpty()
    .withMessage("Name must be provided")
    .isString()
    .withMessage("Name must be a string"),
  body("value")
    .notEmpty()
    .withMessage("Value must be provided")
    .isInt()
    .withMessage("Value must be a Integer"),
  body("quantity")
    .notEmpty()
    .withMessage("Quantity must be provided")
    .isInt()
    .withMessage("Quantity must be a Integer"),
];
