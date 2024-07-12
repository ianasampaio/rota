import prisma from "../../../prisma/client";
import validateFields from "../../utils/validators/fieldValidator";

export async function updateClient(payload: any) {
  const { body, params } = payload;
  const { id } = params;

  const allowedFieldsToUpdate = ["name", "adress", "contact"];

  const validationError = validateFields(body, allowedFieldsToUpdate);

  if (validationError) {
    return {
      data: {
        error: validationError.error,
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
