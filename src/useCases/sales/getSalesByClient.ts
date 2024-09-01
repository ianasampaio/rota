import prisma from "../../../prisma/client";

export async function getSalesByClient(payload: any) {
  const { userId, params } = payload;
  const clientId = params.clientId;

  const clientSales = await prisma.sale.findMany({ where: { clientId, userId } });

  if (!clientSales) {
    return {
      data: {
        error: "Client sales not found",
      },
      statusCode: 400,
    };
  }
  return {
    data: clientSales,
    statusCode: 200,
  };
}
