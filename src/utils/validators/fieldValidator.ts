function validateFields(
  body: Record<string, any>,
  allowedFieldsToUpdate: string[]
) {
  const fieldsNotAllowedForUpdate = Object.keys(body).some(
    (key) => !allowedFieldsToUpdate.includes(key)
  );

  if (fieldsNotAllowedForUpdate) {
    return {
      error: "Some received field is not allowed",
    };
  }

  return null;
}

export default validateFields;
