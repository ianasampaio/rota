import dotenv from "dotenv";
dotenv.config();

import { Request, Response } from "express";
import prisma from "../../../prisma/client";
import { validationResult } from "express-validator";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export async function signin(request: Request, response: Response) {
  const errors = validationResult(request);
  if (!errors.isEmpty()) {
    const errorMessages = errors.array().map((error) => error.msg);
    return response.status(422).json({ errors: errorMessages });
  }

  try {
    const { email, password } = request.body;

    const user = await prisma.user.findUnique({
      where: { email },
    });

    if (!user) {
      return response.status(400).json({ error: "Invalid credentials" });
    }

    const checkPassword = await bcrypt.compare(password, user.password);
    if (!checkPassword) {
      return response.status(400).json({ error: "Invalid credentials" });
    }

    const accessToken = process.env.ACCESS_TOKEN_SECRET;
    if (!accessToken) {
      return response
        .status(400)
        .json({ error: "ACCESS_TOKEN_SECRET must be defined" });
    }
    const expiresIn = process.env.EXPIRE;

    const token = jwt.sign(
      {
        id: user.id,
      },
      accessToken,
      {
        expiresIn: expiresIn,
      }
    );

    return response.status(200).json({ msg: "Authentication success", token });
  } catch (error) {
    console.error(error);
    response.sendStatus(500);
  }
}
