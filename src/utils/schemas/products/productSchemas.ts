import { z } from "zod";

export const validateProduct = z.object({
  name: z.string(),
  value: z.number().int(),
});

export const validateProductToUpdate = z.object({
  name: z.string().optional(),
  value: z.number().int().optional(),
});
