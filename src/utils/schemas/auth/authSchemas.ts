import { z } from "zod";

export const validateSignup = z.object({
  name: z.string(),
  email: z.string().email(),
  password: z.string().min(6),
});

export const validateSignin = z.object({
  email: z.string().email(),
  password: z.string().min(6),
});
