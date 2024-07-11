import prisma from "../../../prisma/client";

export async function updateClient(id: any, body: any) {
  const allowedFieldsToUpdate = ["name", "adress", "contact"];

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
  await prisma.client.update({
    where: { id },
    data: body,
  });

  return {
    statusCode: 204,
  };
}
