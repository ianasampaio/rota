import prisma from "../../../prisma/client";

export async function createClient(body: any) {
  const { name, adress, contact } = body;

  const client = await prisma.client.create({
    data: {
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
