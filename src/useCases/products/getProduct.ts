import prisma from "../../../prisma/client";

export async function getProduct(id: any) {
  const product = await prisma.product.findUnique({ where: { id } });

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
    statusCode: 201,
  };
}
