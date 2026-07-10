import { z } from "zod";

export const listProductsSchema = {
  query: z.object({
    brand: z.string().trim().max(40).optional(),
    q: z.string().trim().max(80).optional(),
    sort: z.enum(["newest", "price-asc", "price-desc", "rating"]).optional(),
    limit: z.coerce.number().int().min(1).max(100).default(60),
    offset: z.coerce.number().int().min(0).default(0),
  }),
};

export const productIdSchema = {
  params: z.object({ id: z.string().min(1).max(100) }),
};

export const wishlistSchema = {
  body: z.object({ productId: z.string().min(1).max(100) }),
};
