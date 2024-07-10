import { Request, Response, NextFunction } from "express";
import jwt, { JwtPayload } from "jsonwebtoken";
import prisma from "../../prisma/client";

export async function authenticate(
  request: Request,
  response: Response,
  next: NextFunction
) {
  const { authorization } = request.headers;

  const token = authorization && authorization.split(" ")[1];

  if (!token) {
    return response.status(401).json({ error: "Not authorized" });
  }

  const accessToken = process.env.ACCESS_TOKEN_SECRET;
  if (!accessToken) {
    return response
      .status(400)
      .json({ error: "ACCESS_TOKEN_SECRET must be defined" });
  }

  const { id } = jwt.verify(token, accessToken) as JwtPayload;

  const user = await prisma.user.findUnique({ where: { id } });

  if (!user) {
    return response.status(400).json({ error: "Not authorized" });
  }

  (request as any).user = { id: user.id };

  next();
}
