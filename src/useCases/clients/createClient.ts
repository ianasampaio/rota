import { Request, Response } from "express";
import prisma from "../../../prisma/client";
import { validationResult } from "express-validator";

export async function createClient(request: Request, response: Response) {
  const errors = validationResult(request);
  if (!errors.isEmpty()) {
    const errorMessages = errors.array().map((error) => error.msg);
    return response.status(422).json({ errors: errorMessages });
  }

  try {
    const { name, adress, contact } = request.body;

    const client = await prisma.client.create({
      data: {
        name,
        adress,
        contact,
      },
    });

    response.status(201).json(client);
  } catch (error) {
    console.error(error);
    response.sendStatus(500);
  }
}
