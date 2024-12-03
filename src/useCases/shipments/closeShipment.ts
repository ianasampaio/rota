import prisma from "../../../prisma/client";
import { ShipmentStatus } from "@prisma/client";

export async function closeShipment(payload:any) {
  const { userId } = payload;
  const { id } = payload.params;

  const sales = await prisma.sale.findMany({
    where: {
      shipmentId: id,
    },
    select: {
      value: true,
    }
  })

  const saleValue = sales.reduce((accumulator, sale) => {
    return accumulator + sale.value;
  }, 0);

  const shipment = await prisma.shipment.update({
    where:{
      id,
      userId,
    },
    data:{
      saleValue: saleValue,
      status: ShipmentStatus.CLOSED,
    },
    select: {
      baseValue: true,
      status: true,
    }
  });

  const data = {
    baseValue: shipment.baseValue,
    saleValue: saleValue,
    shipmentStatus: shipment.status,
  }

  return {
    data,
    statusCode: 200,
  };
}
