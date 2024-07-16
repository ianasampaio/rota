import { z } from "zod";

export const validateClient = z.object({
  name: z.string(),
  adress: z.string(),
  contact: z.string().regex(/^\d{10,11}$/, "Invalid phone number"),
});

export const validateClientToUpdate = z.object({
  name: z.string().optional(),
  value: z.number().optional(),
  contact: z
    .string()
    .regex(/^\d{10,11}$/, "Invalid phone number")
    .optional(),
});
