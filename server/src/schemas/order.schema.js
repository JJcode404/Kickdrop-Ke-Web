import { z } from "zod";

export const createOrderSchema = {
  body: z.object({
    customerName: z.string().trim().min(1).max(120),
    // Kenyan phone, tolerant of +254 / 0 / spaces.
    phone: z
      .string()
      .trim()
      .regex(/^(\+?254|0)[17]\d{8}$/, "Enter a valid Kenyan phone number"),
    note: z.string().trim().max(500).optional(),
    items: z
      .array(
        z.object({
          productId: z.string().min(1).max(100),
          size: z.coerce.number().int().min(20).max(60).nullable().optional(),
          color: z.string().trim().max(40).nullable().optional(),
          qty: z.coerce.number().int().min(1).max(20),
        })
      )
      .min(1, "Order must contain at least one item")
      .max(50),
  }),
};

export const orderIdSchema = {
  params: z.object({ id: z.string().min(1).max(100) }),
};
