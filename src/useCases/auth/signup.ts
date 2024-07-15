import prisma from "../../../prisma/client";
import bcrypt from "bcrypt";
import generateToken from "../../utils/token/generateToken";

export async function signup(payload: any) {
  const { name, email, password } = payload.body;

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

  const token = generateToken(user);

  return {
    data: token,
    statusCode: 201,
  };
}
