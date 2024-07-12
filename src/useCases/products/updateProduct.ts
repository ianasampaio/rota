import prisma from "../../../prisma/client";
import validateFields from "../../utils/validators/fieldValidator";

export async function updateProduct(payload: any) {
  const { body, params } = payload;
  const { id } = params;

  const allowedFieldsToUpdate = ["name", "value"];

  const validationError = validateFields(body, allowedFieldsToUpdate);

  if (validationError) {
    return {
      data: {
        error: validationError.error,
      },
      statusCode: 400,
    };
  }

  await prisma.product.update({
    where: { id },
    data: body,
  });

  return {
    statusCode: 204,
  };
}
