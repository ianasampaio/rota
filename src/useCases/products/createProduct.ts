import { Request, Response } from "express";
import prisma from "../../../prisma/client";
import { validationResult } from "express-validator";

export async function createProduct(request: Request, response: Response) {
  const errors = validationResult(request);
  if (!errors.isEmpty()) {
    const errorMessages = errors.array().map((error) => error.msg);
    return response.status(422).json({ errors: errorMessages });
  }
  try {
    const { name, price } = request.body;

    const product = await prisma.product.create({
      data: {
        name,
        price,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    });
    response.status(201).json(product);
  } catch (error) {
    console.error(error);
    response.sendStatus(500);
  }
}
