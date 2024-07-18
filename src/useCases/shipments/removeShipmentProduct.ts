import prisma from "../../../prisma/client";

export async function removeShipmentProduct(payload: any) {
  const { product_id } = payload.body;
  const { id } = payload.params;

  await prisma.shipmentProduct.deleteMany({
    where: {
      shipmentId: id,
      productId: product_id,
    },
  });

  return {
    statusCode: 204,
  };
}
