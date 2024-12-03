import { Request, Response, NextFunction } from "express";
import jwt, { JwtPayload } from "jsonwebtoken";

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

  try {
    const { id } = jwt.verify(token, accessToken) as JwtPayload;

    request.user = { id };

  } catch (error) {
    return response
      .status(400)
      .json({ error });
  }

  next();
}
