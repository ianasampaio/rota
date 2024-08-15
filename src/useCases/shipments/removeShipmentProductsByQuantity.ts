import prisma from "../../../prisma/client";

export async function removeShipmentProductsByQuantity(payload: any) {
  const { product_id, quantity } = payload.body;
  const { id } = payload.params;

  const shipmentProducts = await prisma.shipmentProduct.findMany({
    where: {
      shipmentId: id,
      productId: product_id,
    },
    take: quantity,
    select: {
      id: true,
    },
  });

  if (shipmentProducts.length === 0) {
    return {
      data: {
        error: "Product not found",
      },
      statusCode: 400,
    };
  }

  if (shipmentProducts.length < quantity) {
    return {
      data: {
        error: "Quantity to remove exceeds available quantity",
      },
      statusCode: 400,
    };
  }

  await prisma.shipmentProduct.deleteMany({
    where: {
      id: {
        in: shipmentProducts.map((product) => product.id),
      },
      shipmentId: id,
    },
  });

  return {
    statusCode: 204,
  };
}
