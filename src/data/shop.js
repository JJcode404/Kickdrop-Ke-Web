import { products } from "./products.js";

export const SWATCH_HEX = {
  White: "#f2f0ea",
  Black: "#1a1a1c",
  Grey: "#b9bdc1",
  Cream: "#e4d6bd",
  Green: "#1d5c3f",
  Ochre: "#d9a441",
  Gum: "#b07a4a",
  Silver: "#c9ccd0",
  Clay: "#c68e5f",
};

const r = (from, to) => {
  const out = [];
  for (let s = from; s <= to; s++) out.push(s);
  return out;
};

/* Shop-only metadata keyed by product id. `added` ranks recency (higher = newer). */
const META = {
  "nike-air-force-1-07": { brand: "Nike", rating: 4.9, reviews: 1284, colors: ["White"], sizes: r(38, 46), added: 3 },
  "nike-dunk-low-panda": { brand: "Nike", rating: 4.8, reviews: 962, colors: ["White", "Black"], sizes: r(38, 45), added: 8 },
  "nike-air-max-90": { brand: "Nike", rating: 4.7, reviews: 731, colors: ["White"], sizes: r(39, 46), added: 5, salePrice: 12950 },
  "nike-air-max-270": { brand: "Nike", rating: 4.5, reviews: 618, colors: ["Black", "White"], sizes: r(38, 46), added: 4, salePrice: 14700 },
  "nike-zoom-vomero-5": { brand: "Nike", rating: 4.8, reviews: 402, colors: ["Cream"], sizes: r(36, 42), added: 18, isNew: true },
  "adidas-samba-og": { brand: "Adidas", rating: 4.9, reviews: 1105, colors: ["White", "Black", "Gum"], sizes: r(36, 46), added: 10 },
  "adidas-gazelle-indoor": { brand: "Adidas", rating: 4.7, reviews: 356, colors: ["Green", "Gum"], sizes: r(36, 45), added: 17, isNew: true, lowStock: true },
  "adidas-campus-00s": { brand: "Adidas", rating: 4.6, reviews: 489, colors: ["Black", "White"], sizes: r(36, 46), added: 9, salePrice: 12400 },
  "adidas-ultraboost-light": { brand: "Adidas", rating: 4.6, reviews: 275, colors: ["Black"], sizes: r(39, 46), added: 7, salePrice: 18200 },
  "new-balance-550": { brand: "New Balance", rating: 4.8, reviews: 847, colors: ["White", "Grey"], sizes: r(38, 46), added: 6 },
  "new-balance-9060": { brand: "New Balance", rating: 4.7, reviews: 318, colors: ["Cream", "White"], sizes: r(38, 46), added: 16, isNew: true },
  "new-balance-2002r": { brand: "New Balance", rating: 4.7, reviews: 522, colors: ["Grey"], sizes: r(38, 46), added: 11, salePrice: 9900 },
  "asics-gel-kayano-14": { brand: "ASICS", rating: 4.8, reviews: 294, colors: ["White", "Silver"], sizes: r(38, 46), added: 14 },
  "asics-gel-1130": { brand: "ASICS", rating: 4.6, reviews: 233, colors: ["White", "Clay"], sizes: r(38, 46), added: 12, salePrice: 12900 },
  "puma-palermo": { brand: "PUMA", rating: 4.5, reviews: 187, colors: ["White", "Grey", "Gum"], sizes: r(36, 45), added: 19, isNew: true },
  "puma-suede-classic-xxi": { brand: "PUMA", rating: 4.6, reviews: 445, colors: ["Black", "White"], sizes: r(36, 46), added: 2, salePrice: 5500, lowStock: true },
  "converse-chuck-taylor-high": { brand: "Converse", rating: 4.7, reviews: 1530, colors: ["Black", "White"], sizes: r(36, 46), added: 1, soldOut: true, salePrice: 5950 },
  "vans-knu-skool": { brand: "Vans", rating: 4.6, reviews: 264, colors: ["Black", "White"], sizes: r(36, 45), added: 20, isNew: true },
  "jordan-1-retro-high-og": { brand: "Jordan", rating: 4.9, reviews: 903, colors: ["Ochre", "Black", "White"], sizes: r(38, 46), added: 15, lowStock: true },
  "on-cloud-5": { brand: "On", rating: 4.5, reviews: 341, colors: ["Black"], sizes: r(38, 46), added: 13, salePrice: 21250 },
};

export const shopProducts = products.map((p) => ({ ...p, ...META[p.id] }));

export const BRANDS = [...new Set(shopProducts.map((p) => p.brand))].sort();
export const SIZES = r(36, 46);
export const COLORS = Object.keys(SWATCH_HEX);

export const PRICE_RANGES = [
  { id: "all", label: "All prices", min: 0, max: Infinity },
  { id: "under-15k", label: "Under Ksh 15,000", min: 0, max: 15000 },
  { id: "15k-20k", label: "Ksh 15,000 – 20,000", min: 15000, max: 20000 },
  { id: "20k-25k", label: "Ksh 20,000 – 25,000", min: 20000, max: 25000 },
  { id: "over-25k", label: "Over Ksh 25,000", min: 25000, max: Infinity },
];

export const AVAILABILITY = [
  { id: "in-stock", label: "In stock" },
  { id: "on-sale", label: "On sale" },
  { id: "new", label: "New arrivals" },
];

export const SORTS = [
  { id: "newest", label: "Newest" },
  { id: "popular", label: "Popular" },
  { id: "price-asc", label: "Price: Low to High" },
  { id: "price-desc", label: "Price: High to Low" },
];

export const effectivePrice = (p) => p.salePrice ?? p.price;

/* Every product ships with 4 extra angle shots: <id>-a1.webp … <id>-a4.webp */
const ANGLE_LABELS = ["Front three-quarter view", "Outer side view", "Heel view", "Detail view"];

export const galleryFor = (p) => [
  { src: p.image, label: `${p.name} — side profile` },
  ...ANGLE_LABELS.map((label, i) => ({
    src: `/images/products/${p.id}-a${i + 1}.webp`,
    label: `${p.name} — ${label.toLowerCase()}`,
  })),
];

export const discountOf = (p) =>
  p.salePrice ? Math.round((1 - p.salePrice / p.price) * 100) : 0;

/* Everything with a cut price, biggest discount first. */
export const saleProducts = shopProducts
  .filter((p) => p.salePrice)
  .sort((a, b) => discountOf(b) - discountOf(a));

export const maxDiscount = Math.max(...saleProducts.map(discountOf));

/* Units sold — derived deterministically from reviews and rating so the
   ranking is stable across sessions without a backend. */
export const soldOf = (p) => Math.round(p.reviews * (1.8 + (p.rating - 4.4) * 3));

export const formatSold = (n) =>
  n >= 1000 ? `${(n / 1000).toFixed(1).replace(/\.0$/, "")}K sold` : `${n} sold`;

/* Top 12 by units sold, best first. */
export const bestSellersRanked = [...shopProducts]
  .sort((a, b) => soldOf(b) - soldOf(a))
  .slice(0, 12);

/* The 3 strongest sellers get a "Hot Item" label. */
const HOT_IDS = new Set(bestSellersRanked.slice(0, 3).map((p) => p.id));
export const isHotItem = (p) => HOT_IDS.has(p.id);

/* Momentum: flagged as trending in the catalogue, or a very fresh drop. */
export const isTrendingUp = (p) => p.badge === "Trending" || p.added >= 19;

/* The 8 most recent releases, newest first. `added` ranks recency. */
export const newArrivals = [...shopProducts]
  .sort((a, b) => b.added - a.added)
  .slice(0, 8);

/* The freshest couple of drops get extra urgency treatment */
export const isJustDropped = (p) => p.added >= 19;

export const stockStatus = (p) =>
  p.soldOut
    ? { id: "out", label: "Out of Stock" }
    : p.lowStock
      ? { id: "low", label: "Low Stock — only a few pairs left" }
      : { id: "in", label: "In Stock" };

export function filterProducts({ query, brands, sizes, colors, price, availability, sort }) {
  const q = query.trim().toLowerCase();
  const range = PRICE_RANGES.find((r2) => r2.id === price) ?? PRICE_RANGES[0];

  let out = shopProducts.filter((p) => {
    if (q && !`${p.brand} ${p.name} ${p.category}`.toLowerCase().includes(q)) return false;
    if (brands.size && !brands.has(p.brand)) return false;
    if (sizes.size && !p.sizes.some((s) => sizes.has(s))) return false;
    if (colors.size && !p.colors.some((c) => colors.has(c))) return false;
    const pr = effectivePrice(p);
    if (pr < range.min || pr > range.max) return false;
    if (availability.has("in-stock") && p.soldOut) return false;
    if (availability.has("on-sale") && !p.salePrice) return false;
    if (availability.has("new") && !p.isNew) return false;
    return true;
  });

  const by = {
    newest: (a, b) => b.added - a.added,
    popular: (a, b) => b.reviews - a.reviews,
    "price-asc": (a, b) => effectivePrice(a) - effectivePrice(b),
    "price-desc": (a, b) => effectivePrice(b) - effectivePrice(a),
  }[sort];
  if (by) out = [...out].sort(by);

  return out;
}
