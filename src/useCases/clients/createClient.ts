import prisma from "../../../prisma/client";

export async function createClient(user: any, body: any) {
  const { name, adress, contact } = body;
  const userId = user.id;

  const client = await prisma.client.create({
    data: {
      userId,
      name,
      adress,
      contact,
    },
  });

  return {
    data: client,
    statusCode: 201,
  };
}
