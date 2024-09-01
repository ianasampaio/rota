import { z } from "zod";

export const validateSale = z.object({
  client_id: z.string().uuid(),
  shipment_id: z.string().uuid(),
  payment: z
  .object({
    type: z.string(),
    value: z.number().int(),
  })
  .optional(),
  sale_products: z.array(z.object({
    product_id: z.string().uuid(),
    quantity: z.number().int(),
  })),
});

export const validatePayment = z.object({
  payment: z
  .object({
    type: z.string(),
    value: z.number().int(),
  }),
});
