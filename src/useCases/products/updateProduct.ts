import prisma from "../../../prisma/client";

export async function updateProduct(id: any, body: any) {
  const allowedFieldsToUpdate = ["name", "price"];

  const fieldsNotAllowedForUpdate = Object.keys(body).some(
    (key) => !allowedFieldsToUpdate.includes(key)
  );

  if (fieldsNotAllowedForUpdate) {
    return {
      data: {
        error: "Some received field is not allowed",
      },
      statusCode: 400,
    };
  }
  await prisma.product.update({
    where: { id },
    data: {
      ...body,
    },
  });

  return {
    statusCode: 204,
  };
}
