import prisma from "../../../prisma/client";

export async function listProducts() {
  const products = await prisma.product.findMany();

  return {
    data: products,
    statusCode: 201,
  };
}
