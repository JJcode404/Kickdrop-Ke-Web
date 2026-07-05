import { shopProducts, soldOf } from "./shop.js";

/* Editorial copy per brand — everything else is derived from product data. */
const BRAND_META = {
  Nike: {
    tagline: "Innovation in motion",
    blurb:
      "From the waffle sole to Air, Nike has defined every era of sneaker culture. The icons start here.",
    featured: true,
  },
  Adidas: {
    tagline: "Sport meets street culture",
    blurb:
      "Three stripes, endless influence — from the terraces of Europe to every city street in the world.",
    featured: true,
  },
  "New Balance": {
    tagline: "Crafted for comfort & performance",
    blurb:
      "Understated, over-engineered, and beloved by purists. New Balance is quiet luxury on foot.",
    featured: true,
  },
  Jordan: { tagline: "Basketball heritage, street royalty" },
  ASICS: { tagline: "Japanese engineering, retro soul" },
  PUMA: { tagline: "Terrace culture icon" },
  Converse: { tagline: "The original canvas classic" },
  Vans: { tagline: "Skate-born streetwear" },
  On: { tagline: "Swiss performance running" },
};

const slug = (name) => name.toLowerCase().replace(/\s+/g, "-");

/* One entry per brand, built from the live catalogue. */
export const brandsData = [...new Set(shopProducts.map((p) => p.brand))]
  .map((name) => {
    const items = shopProducts.filter((p) => p.brand === name);
    // focus = the brand's most common product category
    const tally = {};
    items.forEach((p) => {
      tally[p.category] = (tally[p.category] ?? 0) + 1;
    });
    const focus = Object.entries(tally).sort((a, b) => b[1] - a[1])[0][0];
    return {
      name,
      logo: `/images/brands/${slug(name)}.svg`,
      count: items.length,
      popularity: items.reduce((sum, p) => sum + soldOf(p), 0),
      focus,
      ...BRAND_META[name],
    };
  })
  .sort((a, b) => a.name.localeCompare(b.name));

export const featuredBrands = ["Nike", "Adidas", "New Balance"]
  .map((n) => brandsData.find((b) => b.name === n))
  .filter(Boolean);

export const BRAND_FOCUSES = [...new Set(brandsData.map((b) => b.focus))].sort();
