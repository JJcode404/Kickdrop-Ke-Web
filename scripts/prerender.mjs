/**
 * Snapshot prerendering: serves the built app, renders every route in
 * headless Chrome, and writes the fully-rendered HTML (content, per-page
 * meta tags, JSON-LD) to dist/<route>/index.html.
 *
 * Crawlers and AI bots that don't execute JavaScript get real content;
 * browsers load the same HTML and React takes over on hydration.
 *
 * Usage: npm run build:seo   (build + prerender)
 * Requires Chrome/Chromium. Override the binary with CHROME_PATH.
 */
import { mkdirSync, writeFileSync, existsSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import { preview } from "vite";
import { chromium } from "playwright-core";
import { products } from "../src/data/products.js";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const dist = join(root, "dist");

const CHROME_CANDIDATES = [
  process.env.CHROME_PATH,
  "/usr/bin/google-chrome",
  "/usr/bin/google-chrome-stable",
  "/usr/bin/chromium",
  "/usr/bin/chromium-browser",
].filter(Boolean);
const chromePath = CHROME_CANDIDATES.find((p) => existsSync(p));
if (!chromePath) {
  console.error("No Chrome/Chromium found — set CHROME_PATH. Skipping prerender.");
  process.exit(1);
}

const routes = [
  "/",
  "/shop",
  "/new-arrivals",
  "/best-sellers",
  "/brands",
  "/sale",
  "/about",
  "/delivery",
  "/returns",
  "/privacy",
  "/terms",
  "/faq",
  ...products.map((p) => `/product/${p.id}`),
];

const server = await preview({ root, preview: { port: 4180, strictPort: true } });
const origin = server.resolvedUrls.local[0].replace(/\/$/, "");

const browser = await chromium.launch({ executablePath: chromePath });
const page = await browser.newPage({ viewport: { width: 1280, height: 800 } });

let done = 0;
for (const route of routes) {
  await page.goto(origin + route, { waitUntil: "networkidle" });
  // let skeleton loaders resolve and Seo effects run
  await page.waitForTimeout(900);
  const html = "<!doctype html>\n" + (await page.content());
  const outDir = route === "/" ? dist : join(dist, route.slice(1));
  mkdirSync(outDir, { recursive: true });
  writeFileSync(join(outDir, "index.html"), html);
  done++;
}

await browser.close();
await server.close();
console.log(`prerendered ${done}/${routes.length} routes into dist/`);
