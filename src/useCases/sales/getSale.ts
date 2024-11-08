import prisma from "../../../prisma/client";

export async function getSale(payload:any) {
  const { userId, params } = payload;
  const { id } = params;

  const sale = await prisma.sale.findUnique({
    where: {
      id, userId
    },
    include: {
      saleProducts: {
        select: {
          quantity: true,
          total: true,
          product: {
            select: {
              name: true,
            },
          },
        }
      },
      payments: {
        select: {
          value: true,
          type:true,
        }
      },
    },
  });

  if (!sale) {
    return {
      data: {
        error: "Sale not found",
      },
      statusCode: 400,
    };
  }

  const paidValue = sale.payments.reduce((accumulator, {value}) => {
    return accumulator + value;
  }, 0);


  const saleProducts = sale.saleProducts.map((product) => ({
    quantity: product.quantity,
    total: product.total,
    name: product.product.name
  }))

  const data = {
    ...sale,
    paidValue,
    saleProducts
  }

  return {
    data,
    statusCode: 200,
  };

}
