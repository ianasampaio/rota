import prisma from "../../../prisma/client";

export async function createProduct(payload: any) {
  const { body, userId } = payload;

  const product = await prisma.product.create({
    data: {
      ...body,
      userId,
    },
  });
  return {
    data: product,
    statusCode: 201,
  };
}
