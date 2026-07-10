import { Router } from "express";
import { prisma } from "../lib/prisma.js";
import { validate } from "../middleware/validate.js";
import { listProductsSchema, productIdSchema } from "../schemas/product.schema.js";
import { asyncHandler, notFound } from "../lib/httpError.js";

const router = Router();

const ORDER_BY = {
  newest: { createdAt: "desc" },
  "price-asc": { price: "asc" },
  "price-desc": { price: "desc" },
  rating: { rating: "desc" },
};

router.get(
  "/",
  validate(listProductsSchema),
  asyncHandler(async (req, res) => {
    const { brand, q, sort, limit, offset } = req.query;

    const where = {
      ...(brand ? { brand } : {}),
      ...(q ? { name: { contains: q, mode: "insensitive" } } : {}),
    };

    const [items, total] = await Promise.all([
      prisma.product.findMany({
        where,
        orderBy: ORDER_BY[sort] ?? { name: "asc" },
        take: limit,
        skip: offset,
      }),
      prisma.product.count({ where }),
    ]);

    res.json({ items, total, limit, offset });
  })
);

router.get(
  "/:id",
  validate(productIdSchema),
  asyncHandler(async (req, res) => {
    const product = await prisma.product.findUnique({ where: { id: req.params.id } });
    if (!product) throw notFound("Product not found");
    res.json({ product });
  })
);

export default router;
