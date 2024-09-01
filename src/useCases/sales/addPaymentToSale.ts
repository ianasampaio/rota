import prisma from "../../../prisma/client";
import { SaleStatus } from "@prisma/client";

export async function addPaymentToSale(payload:any) {
  const { userId } = payload;
  const { id } = payload.params;
  const { payment } = payload.body;

  const sale = await prisma.sale.findUnique({ where: { id, userId } });

  if (!sale) {
    return {
      data: {
        error: "Sale not found",
      },
      statusCode: 400,
    };
  }

  if (sale.status === SaleStatus.PAID) {
    return {
      data: {
        error: "Sale already paid",
      },
      statusCode: 409,
    };
  }

  const payments = await prisma.payments.findMany({
    where: {
      saleId: id
    },
    select: {
      value: true,
    },
  });

  const totalPayment = payments.reduce((accumulator, value) => {
    return accumulator + value.value;
  }, 0);

  const currentValue = totalPayment + payment.value;

  let saleStatus:SaleStatus;

  if (currentValue >= sale.value) {
    saleStatus = SaleStatus.PAID;
  } else if (currentValue < sale.value) {
    saleStatus = SaleStatus.PARTIALLY_PAID;
  } else {
    throw new Error('Invalid payment value');
  }

  const newPayment = await prisma.payments.create({
    data: {
      saleId: sale.id,
      type: payment.type,
      value: payment.value,
    }
  });

  await prisma.sale.update({
    where: {
      id:sale.id,
    },
    data: {
      status:saleStatus,
    }
  });

  return {
    data: newPayment,
    statusCode: 200,
  };
}
