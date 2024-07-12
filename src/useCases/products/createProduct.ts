import prisma from "../../../prisma/client";

export async function createProduct(body: any) {
  const product = await prisma.product.create({
    data: body,
  });
  return {
    data: product,
    statusCode: 201,
  };
}
