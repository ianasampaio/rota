import { Request, Response } from "express";
import prisma from "../../../prisma/client";
import bcrypt from "bcrypt";
import { validationResult } from "express-validator";

export async function signup(request: Request, response: Response) {
  const errors = validationResult(request);
  if (!errors.isEmpty()) {
    const errorMessages = errors.array().map((error) => error.msg);
    return response.status(422).json({ errors: errorMessages });
  }
  try {
    const { name, email, password } = request.body;

    const userExists = await prisma.user.findUnique({
      where: { email },
    });

    if (userExists) {
      return response.status(409).json({ error: "Email already in use" });
    }

    const passwordHash = await bcrypt.hash(password, 12);

    const user = await prisma.user.create({
      data: {
        name,
        email,
        password: passwordHash,
      },
    });
    response.status(201).json(user);
  } catch (error) {
    console.error(error);
    response.sendStatus(500);
  }
}
