import prisma from "../../../prisma/client";

export async function listProducts(bode: any) {
  const products = await prisma.product.findMany();

  return {
    data: products,
    statusCode: 201,
  };
}
