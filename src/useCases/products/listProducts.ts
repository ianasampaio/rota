import prisma from "../../../prisma/client";

export async function listProducts(payload: any) {
  const { userId } = payload;
  const products = await prisma.product.findMany({ where: { userId } });

  return {
    data: products,
    statusCode: 200,
  };
}
