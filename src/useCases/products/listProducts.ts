import { Request, Response } from "express";
import prisma from "../../../prisma/client";

export async function listProducts(request: Request, response: Response) {
  try {
    const products = await prisma.product.findMany();
    response.status(201).json(products);
  } catch (error) {
    console.error(error);
    response.sendStatus(500);
  }
}
