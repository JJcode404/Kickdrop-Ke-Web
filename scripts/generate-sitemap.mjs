/**
 * Generates public/sitemap.xml from the live product catalogue.
 * Runs automatically before every build (see "prebuild" in package.json).
 */
import { writeFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";
import { products } from "../src/data/products.js";

const SITE = "https://kickdrop.ke";
const today = new Date().toISOString().slice(0, 10);

const routes = [
  { path: "/", priority: "1.0", changefreq: "weekly" },
  { path: "/shop", priority: "0.9", changefreq: "daily" },
  { path: "/new-arrivals", priority: "0.9", changefreq: "daily" },
  { path: "/sale", priority: "0.9", changefreq: "daily" },
  { path: "/best-sellers", priority: "0.8", changefreq: "weekly" },
  { path: "/brands", priority: "0.7", changefreq: "weekly" },
  { path: "/faq", priority: "0.6", changefreq: "monthly" },
  { path: "/about", priority: "0.5", changefreq: "monthly" },
  { path: "/delivery", priority: "0.5", changefreq: "monthly" },
  { path: "/returns", priority: "0.5", changefreq: "monthly" },
  { path: "/privacy", priority: "0.3", changefreq: "yearly" },
  { path: "/terms", priority: "0.3", changefreq: "yearly" },
  ...products.map((p) => ({
    path: `/product/${p.id}`,
    priority: "0.8",
    changefreq: "weekly",
  })),
];

const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${routes
  .map(
    (r) => `  <url>
    <loc>${SITE}${r.path}</loc>
    <lastmod>${today}</lastmod>
    <changefreq>${r.changefreq}</changefreq>
    <priority>${r.priority}</priority>
  </url>`
  )
  .join("\n")}
</urlset>
`;

const out = join(dirname(fileURLToPath(import.meta.url)), "../public/sitemap.xml");
writeFileSync(out, xml);
console.log(`sitemap.xml written — ${routes.length} URLs`);
