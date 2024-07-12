import prisma from "../../../prisma/client";

export async function createClient(body: any) {
  const client = await prisma.client.create({
    data: body,
  });

  return {
    data: client,
    statusCode: 201,
  };
}
