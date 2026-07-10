import { Router } from "express";
import { prisma } from "../lib/prisma.js";
import { validate } from "../middleware/validate.js";
import { requireAuth } from "../middleware/auth.js";
import { wishlistSchema, productIdSchema } from "../schemas/product.schema.js";
import { asyncHandler, badRequest } from "../lib/httpError.js";

const router = Router();

// Every wishlist route requires a signed-in user.
router.use(requireAuth);

router.get(
  "/",
  asyncHandler(async (req, res) => {
    const items = await prisma.wishlistItem.findMany({
      where: { userId: req.user.id },
      include: { product: true },
      orderBy: { createdAt: "desc" },
    });
    res.json({ items });
  })
);

router.post(
  "/",
  validate(wishlistSchema),
  asyncHandler(async (req, res) => {
    const { productId } = req.body;
    const product = await prisma.product.findUnique({ where: { id: productId } });
    if (!product) throw badRequest("Unknown product");

    const item = await prisma.wishlistItem.upsert({
      where: { userId_productId: { userId: req.user.id, productId } },
      create: { userId: req.user.id, productId },
      update: {},
    });
    res.status(201).json({ item });
  })
);

router.delete(
  "/:id",
  validate(productIdSchema),
  asyncHandler(async (req, res) => {
    await prisma.wishlistItem
      .delete({
        where: { userId_productId: { userId: req.user.id, productId: req.params.id } },
      })
      .catch(() => {}); // idempotent: deleting a non-existent item is fine
    res.status(204).end();
  })
);

export default router;
