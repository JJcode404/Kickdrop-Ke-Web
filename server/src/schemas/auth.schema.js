import { z } from "zod";

const email = z.string().trim().toLowerCase().email().max(254);

/* Require a reasonably strong password without being hostile: length does the
   heavy lifting, plus at least one letter and one number. */
const password = z
  .string()
  .min(8, "Password must be at least 8 characters")
  .max(128)
  .regex(/[A-Za-z]/, "Password must contain a letter")
  .regex(/[0-9]/, "Password must contain a number");

export const registerSchema = {
  body: z.object({
    name: z.string().trim().min(1, "Name is required").max(80),
    email,
    password,
  }),
};

export const loginSchema = {
  body: z.object({
    email,
    password: z.string().min(1).max(128),
  }),
};
