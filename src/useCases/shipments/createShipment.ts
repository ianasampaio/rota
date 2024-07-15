import prisma from "../../../prisma/client";

export async function createShipment(payload: any) {
  const { body, userId } = payload;

  const shipment = await prisma.shipment.create({
    data: {
      ...body,
      userId,
    },
  });

  return {
    data: shipment,
    statusCode: 201,
  };
}
