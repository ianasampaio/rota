import prisma from "../../../prisma/client";
import { ShipmentStatus } from "@prisma/client";

export async function createShipment(payload: any) {
  const { userId } = payload;
  const { location } = payload.body;

  const status = ShipmentStatus.OPEN;

  const shipment = await prisma.shipment.create({
    data: {
      location,
      status,
      userId,
      baseValue: 0,
      saleValue:0,
    },
  });

  return {
    data: shipment,
    statusCode: 201,
  };
}
