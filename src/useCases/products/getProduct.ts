import { Request, Response } from "express";
import prisma from "../../../prisma/client";

export async function getProduct(request: Request, response: Response) {
  try {
    const { id } = request.params;
    const product = await prisma.product.findUnique({ where: { id } });

    if (!product) {
      return response.status(400).json({ error: "Product not found" });
    }
    response.status(201).json(product);
  } catch (error) {
    console.error(error);
    response.sendStatus(500);
  }
}
