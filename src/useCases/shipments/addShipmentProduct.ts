import prisma from "../../../prisma/client";
import { ShipmentProductStatus } from "@prisma/client";

export async function addShipmentProduct(payload: any) {
  const { product_id, name, value, quantity } = payload.body;
  const { id } = payload.params;

  const status = ShipmentProductStatus.AVAILABLE;

  const data = Array.from({ length: Number(quantity) }).map(() => ({
    shipmentId: id,
    productId: product_id,
    name: name,
    value: value,
    status: status,
  }));

  await prisma.shipmentProduct.createMany({
    data,
  });

  return {
    statusCode: 201,
  };
}
