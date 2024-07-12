import prisma from "../../../prisma/client";
import bcrypt from "bcrypt";
import generateToken from "../../utils/token/generateToken";

export async function signin(payload: any) {
  const { email, password } = payload.body;

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

  const token = generateToken(user);

  return {
    data: token,
    statusCode: 200,
  };
}
