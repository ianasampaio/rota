import { Request, Response } from "express";
import prisma from "../../../prisma/client";

export async function listUsers(request: Request, response: Response) {
  try {
    const users = await prisma.user.findMany();
    response.status(201).json(users);
  } catch (error) {
    console.error(error);
    response.sendStatus(500);
  }
}
