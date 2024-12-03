import prisma from "../../../prisma/client";
import { ShipmentProductStatus, ShipmentStatus } from "@prisma/client";

export async function addShipmentProduct(payload: any) {
  const { product_id, name, value, quantity } = payload.body;
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

  const totalValue = data.reduce((accumulator, product) => {
    return accumulator + quantity * product.value;
  }, shipment.baseValue);

  await prisma.shipment.update({
    where: {
      id, userId
    },
    data: {
      baseValue: totalValue,
    }
  })

  return {
    statusCode: 201,
  };
}
