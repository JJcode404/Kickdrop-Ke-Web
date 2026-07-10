import { PrismaClient } from "@prisma/client";

/* Reuse the frontend catalogue as the single source of truth so the API and
   the storefront never drift apart. shop.js is pure data (no browser APIs). */
import { shopProducts } from "../../src/data/shop.js";

const prisma = new PrismaClient();

/* Mirror the frontend's convention (see src/data/shop.js galleryFor): a main
   side-profile shot plus four angle shots, all keyed by product id. */
const mainImage = (id) => `/images/products/${id}.webp`;
const galleryFor = (id) => [
  mainImage(id),
  ...[1, 2, 3, 4].map((n) => `/images/products/${id}-a${n}.webp`),
];

async function main() {
  console.log(`Seeding ${shopProducts.length} products…`);

  for (const p of shopProducts) {
    const data = {
      name: p.name,
      brand: p.brand,
      category: p.category,
      price: p.price,
      salePrice: p.salePrice ?? null,
      badge: p.badge ?? null,
      rating: p.rating ?? null,
      reviews: p.reviews ?? 0,
      colors: p.colors ?? [],
      sizes: p.sizes ?? [],
      imageUrl: mainImage(p.id),
      gallery: galleryFor(p.id),
      isNew: Boolean(p.isNew),
      soldOut: Boolean(p.soldOut),
      lowStock: Boolean(p.lowStock),
    };
    await prisma.product.upsert({
      where: { id: p.id },
      create: { id: p.id, ...data },
      update: data,
    });
  }

  console.log("✅ Products seeded.");
}

main()
  .catch((err) => {
    console.error(err);
    process.exit(1);
  })
  .finally(() => prisma.$disconnect());
