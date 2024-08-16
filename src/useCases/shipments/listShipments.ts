import prisma from "../../../prisma/client";

export async function listShipments(payload:any) {
  const { userId } = payload;
  const shipments = await prisma.shipment.findMany({ where: { userId } });

  return {
    data: shipments,
    statusCode: 200,
  };
}
