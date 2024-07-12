import prisma from "../../../prisma/client";

export async function createClient(payload: any) {
  const { body, userId } = payload;

  const client = await prisma.client.create({
    data: {
      ...body,
      userId,
    },
  });

  return {
    data: client,
    statusCode: 201,
  };
}
