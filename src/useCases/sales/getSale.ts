import prisma from "../../../prisma/client";

export async function getSale(payload:any) {
  const { userId, params } = payload;
  const { id } = params;

  const sale = await prisma.sale.findUnique({ where: { id, userId } });

  if (!sale) {
    return {
      data: {
        error: "Sale not found",
      },
      statusCode: 400,
    };
  }
  return {
    data: sale,
    statusCode: 200,
  };

}
