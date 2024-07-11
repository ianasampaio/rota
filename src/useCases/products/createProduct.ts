import prisma from "../../../prisma/client";

export async function createProduct(user: any, body: any) {
  const { name, value } = body;
  const userId = user.id;

  const product = await prisma.product.create({
    data: {
      userId,
      name,
      value,
    },
  });
  return {
    data: product,
    statusCode: 201,
  };
}
