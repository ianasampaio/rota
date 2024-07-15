import { body } from "express-validator";

export const validateSignup = [
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

export const validateSignin = [
  body("email").isEmail().withMessage("Invalid email format"),
  body("password").isString().withMessage("Password must be provided"),
];