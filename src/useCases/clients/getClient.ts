import prisma from "../../../prisma/client";

export async function getClient(payload: any) {
  const { userId, params } = payload;
  const { id } = params;

  const client = await prisma.client.findUnique({ where: { id, userId } });

  if (!client) {
    return {
      data: {
        error: "Client not found",
      },
      statusCode: 400,
    };
  }
  return {
    data: client,
    statusCode: 200,
  };
}
