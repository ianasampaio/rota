import prisma from "../../../prisma/client";

export async function listSales(payload:any) {
  const { userId } = payload;
  const sales = await prisma.sale.findMany({ where: { userId } });

  return {
    data: sales,
    statusCode: 200,
  };
}
