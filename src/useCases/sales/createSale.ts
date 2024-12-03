import prisma from "../../../prisma/client";
import { SaleStatus, ShipmentStatus } from "@prisma/client";

type Product = {
  product_id: string;
  quantity: number;
};

export async function createSale(payload:any) {
  const { userId } = payload;
  const { client_id, shipment_id, payment, sale_products } = payload.body;

  const shipment = await prisma.shipment.findUnique({
    where: {
      id: shipment_id,
      userId,
    },
    select: {
      status: true,
    }
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
        error: "Shipment already closed",
      },
      statusCode: 400,
    };
  }

  const saleProductsEntries = await Promise.all(
    sale_products.map(async (product:Product) => {
      const productInfo = await prisma.product.findUnique({
        where: {
          id: product.product_id,
        },
        select: {
          id: true,
          value: true,
        },
      });

      return {
        ...product,
        value: productInfo?.value,
      };
    })
  );

  const totalValue = saleProductsEntries.reduce((accumulator, product) => {
    return accumulator + product.quantity * product.value;
  }, 0);

  let status:SaleStatus;

  if (!payment || payment.value === 0) {
    status = SaleStatus.OPEN;
  } else if (payment.value > 0 && payment.value < totalValue) {
    status = SaleStatus.PARTIALLY_PAID;
  } else if (payment.value >= totalValue) {
    status = SaleStatus.PAID;
  } else {
    throw new Error('Invalid payment value');
  }

  const saleData: any = {
    clientId: client_id,
    userId: userId,
    shipmentId: shipment_id,
    value: totalValue,
    status: status,
  };

  if (payment) {
    saleData.payments = {
      create: {
        type: payment.type,
        value: payment.value,
      },
    };
  }

  const sale = await prisma.sale.create({
    data: saleData,
    include: {
      payments: {
        select: {
          value: true,
          type:true,
        }
      },
    }
  });

  const saleProducts = saleProductsEntries.reduce((accumulator, product) => {
    const totalValue = product.quantity * product.value;
    const newProduct = {
      saleId: sale.id,
      productId: product.product_id,
      total: totalValue,
      quantity: product.quantity,
    }
    accumulator.push({ ...newProduct });
    return accumulator;
  }, []);

  await prisma.saleProduct.createMany({
    data: saleProducts,
  });

  const dataProducts = await prisma.saleProduct.findMany({
    where: {
      saleId: sale.id,
    },
    select: {
      quantity: true,
      total: true,
      product: {
        select: {
          name: true,
        },
      },
    }
  });

  const products = dataProducts.map((product) => ({
    quantity: product.quantity,
    total: product.total,
    name: product.product.name
  }))

  const paidValue = payment? payment.value : undefined;

  const data = {
    ...sale,
    paidValue,
    products,
  }

  return {
    data,
    statusCode: 201,
  };
}
