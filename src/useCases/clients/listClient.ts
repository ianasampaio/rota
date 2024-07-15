import prisma from "../../../prisma/client";

export async function listClient(payload: any) {
  const { userId } = payload;
  const clients = await prisma.client.findMany({ where: { userId } });

  return {
    data: clients,
    statusCode: 200,
  };
}
