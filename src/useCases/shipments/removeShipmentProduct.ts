import { ShipmentStatus } from "@prisma/client";
import prisma from "../../../prisma/client";

export async function removeShipmentProduct(payload: any) {
  const { product_id } = payload.body;
  const { id, userId } = payload.params;

  const shipment = await prisma.shipment.findUnique({
    where: {
      id, userId
    },
  });

  if (!shipment) {
    return {
      data: {
        error: "Shipment not found",
      },
      statusCode: 400,
    };
  }

  if (shipment.status === ShipmentStatus.CLOSED) {
    return {
      data: {
        error: "Shipment closed",
      },
      statusCode: 400,
    };
  }

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
