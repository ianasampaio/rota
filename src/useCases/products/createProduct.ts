import prisma from "../../../prisma/client";

export async function createProduct(body: any) {
  const { name, price } = body;

  const product = await prisma.product.create({
    data: {
      name,
      price,
    },
  });
  return {
    data: product,
    statusCode: 201,
  };
}
