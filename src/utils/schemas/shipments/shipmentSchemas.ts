import { z } from "zod";

export const validateShipment = z.object({
  location: z.string(),
});

export const validateShipmentProduct = z.object({
  product_id: z.string().uuid(),
  name: z.string(),
  value: z.number().int(),
  quantity: z.number().int(),
});

export const validateShipmentProductToDelete = z.object({
  product_id: z.string().uuid(),
});
