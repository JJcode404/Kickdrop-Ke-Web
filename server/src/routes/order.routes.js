import { Router } from "express";
import { prisma } from "../lib/prisma.js";
import { validate } from "../middleware/validate.js";
import { requireAuth, optionalAuth } from "../middleware/auth.js";
import { createOrderSchema, orderIdSchema } from "../schemas/order.schema.js";
import { asyncHandler, badRequest, notFound } from "../lib/httpError.js";

const router = Router();

/* Orders can be placed by guests or signed-in users. Prices are ALWAYS taken
   from the database, never from the client, so the total cannot be tampered
   with. */
router.post(
  "/",
  optionalAuth,
  validate(createOrderSchema),
  asyncHandler(async (req, res) => {
    const { customerName, phone, note, items } = req.body;

    const ids = [...new Set(items.map((i) => i.productId))];
    const products = await prisma.product.findMany({ where: { id: { in: ids } } });
    const byId = new Map(products.map((p) => [p.id, p]));

    const missing = ids.filter((id) => !byId.has(id));
    if (missing.length) throw badRequest(`Unknown product(s): ${missing.join(", ")}`);

    const lineItems = items.map((i) => {
      const product = byId.get(i.productId);
      if (product.soldOut) throw badRequest(`${product.name} is sold out`);
      const unit = product.salePrice ?? product.price;
      return {
        productId: product.id,
        name: product.name,
        size: i.size ?? null,
        color: i.color ?? null,
        qty: i.qty,
        price: unit,
      };
    });

    const total = lineItems.reduce((sum, li) => sum + li.price * li.qty, 0);

    const order = await prisma.order.create({
      data: {
        userId: req.user?.id ?? null,
        customerName,
        phone,
        note: note ?? null,
        total,
        items: { create: lineItems },
      },
      include: { items: true },
    });

    res.status(201).json({ order });
  })
);

/* A user's own order history. */
router.get(
  "/",
  requireAuth,
  asyncHandler(async (req, res) => {
    const orders = await prisma.order.findMany({
      where: { userId: req.user.id },
      orderBy: { createdAt: "desc" },
      include: { items: true },
    });
    res.json({ orders });
  })
);

router.get(
  "/:id",
  requireAuth,
  validate(orderIdSchema),
  asyncHandler(async (req, res) => {
    const order = await prisma.order.findUnique({
      where: { id: req.params.id },
      include: { items: true },
    });
    // Don't reveal existence of other users' orders — 404 either way.
    if (!order || order.userId !== req.user.id) throw notFound("Order not found");
    res.json({ order });
  })
);

export default router;
