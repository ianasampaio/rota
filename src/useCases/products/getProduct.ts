import prisma from "../../../prisma/client";

export async function getProduct(payload: any) {
  const { userId, params } = payload;
  const { id } = params;

  const product = await prisma.product.findUnique({ where: { id, userId } });

  if (!product) {
    return {
      data: {
        error: "Product not found",
      },
      statusCode: 400,
    };
  }
  return {
    data: product,
    statusCode: 200,
  };
}
