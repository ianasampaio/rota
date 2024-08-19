import prisma from "../../../prisma/client";

export async function getShipment(payload:any) {
  const { userId, params } = payload;
  const { id } = params;

  const shipment = await prisma.shipment.findUnique({ where: { id, userId } });

  if (!shipment) {
    return {
      data: {
        error: "Shipment not found",
      },
      statusCode: 400,
    };
  }
  return {
    data: shipment,
    statusCode: 200,
  };

}
