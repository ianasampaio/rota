import prisma from "../../../prisma/client";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export async function signin(body: any) {
  const { email, password } = body;

  const user = await prisma.user.findUnique({
    where: { email },
  });

  if (!user) {
    return {
      data: {
        error: "Invalid credentials",
      },
      statusCode: 400,
    };
  }

  const checkPassword = await bcrypt.compare(password, user.password);
  if (!checkPassword) {
    return {
      data: {
        error: "Invalid credentials",
      },
      statusCode: 400,
    };
  }

  const accessToken = process.env.ACCESS_TOKEN_SECRET;
  if (!accessToken) {
    return {
      data: {
        error: "ACCESS_TOKEN_SECRET must be defined",
      },
      statusCode: 400,
    };
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

  return {
    data: token,
    statusCode: 201,
  };
}
