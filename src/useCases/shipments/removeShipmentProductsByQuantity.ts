import { ShipmentStatus } from "@prisma/client";
import prisma from "../../../prisma/client";

export async function removeShipmentProductsByQuantity(payload: any) {
  const { product_id, quantity } = payload.body;
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

  const shipmentProducts = await prisma.shipmentProduct.findMany({
    where: {
      shipmentId: id,
      productId: product_id,
    },
    take: quantity,
    select: {
      id: true,
    },
  });

  if (shipmentProducts.length === 0) {
    return {
      data: {
        error: "Product not available in this shipment",
      },
      statusCode: 400,
    };
  }

  if (shipmentProducts.length < quantity) {
    return {
      data: {
        error: "Quantity to remove exceeds available quantity",
      },
      statusCode: 400,
    };
  }

  await prisma.shipmentProduct.deleteMany({
    where: {
      id: {
        in: shipmentProducts.map((product) => product.id),
      },
      shipmentId: id,
    },
  });

  return {
    statusCode: 204,
  };
}
