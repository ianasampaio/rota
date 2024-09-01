import prisma from "../../../prisma/client";
import { SaleStatus } from "@prisma/client";

type Product = {
  product_id: string;
  quantity: number;
};

export async function createSale(payload:any) {
  const { userId } = payload;
  const { client_id, shipment_id, payment, sale_products } = payload.body;

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

  const products = await prisma.saleProduct.createMany({
    data: saleProducts,
  });

  return {
    data: {
      sale,
      products,
    },
    statusCode: 201,
  };
}
