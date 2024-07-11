import prisma from "../../../prisma/client";
import bcrypt from "bcrypt";

export async function signup(body: any) {
  const { name, email, password } = body;

  const userExists = await prisma.user.findUnique({
    where: { email },
  });

  if (userExists) {
    return {
      data: {
        error: "Email already in use",
      },
      statusCode: 409,
    };
  }

  const passwordHash = await bcrypt.hash(password, 12);

  const user = await prisma.user.create({
    data: {
      name,
      email,
      password: passwordHash,
    },
  });

  return {
    data: user,
    statusCode: 201,
  };
}
