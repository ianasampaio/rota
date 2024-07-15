import jwt from "jsonwebtoken";

type User = {
  id: string;
};

export default function generateToken(user: User) {
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
  return token;
}
