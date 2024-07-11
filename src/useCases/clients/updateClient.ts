import { Request, Response } from "express";
import prisma from "../../../prisma/client";
import { validationResult } from "express-validator";

export async function updateClient(request: Request, response: Response) {
  const errors = validationResult(request);
  if (!errors.isEmpty()) {
    const errorMessages = errors.array().map((error) => error.msg);
    return response.status(422).json({ errors: errorMessages });
  }

  const { id } = request.params;
  const body = request.body;

  const allowedFieldsToUpdate = ["name", "adress", "contact"];

  const fieldsNotAllowedForUpdate = Object.keys(body).some(
    (key) => !allowedFieldsToUpdate.includes(key)
  );

  if (fieldsNotAllowedForUpdate) {
    return response
      .status(400)
      .json({ error: "Some received field is not allowed" });
  }

  try {
    await prisma.client.update({
      where: { id },
      data: {
        ...body,
      },
    });

    response.sendStatus(204);
  } catch (error) {
    console.error(error);
    response.sendStatus(500);
  }
}
