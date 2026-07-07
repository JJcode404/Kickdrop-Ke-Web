import { useEffect } from "react";
import { SITE_URL, SITE_NAME, SITE_TAGLINE } from "../config.js";

const abs = (url) => (url?.startsWith("http") ? url : `${SITE_URL}${url ?? ""}`);

function upsertMeta(attr, key, content) {
  let el = document.head.querySelector(`meta[${attr}="${key}"]`);
  if (!el) {
    el = document.createElement("meta");
    el.setAttribute(attr, key);
    document.head.appendChild(el);
  }
  el.setAttribute("content", content);
}

function upsertLink(rel, href) {
  let el = document.head.querySelector(`link[rel="${rel}"]`);
  if (!el) {
    el = document.createElement("link");
    el.setAttribute("rel", rel);
    document.head.appendChild(el);
  }
  el.setAttribute("href", href);
}

/**
 * Per-route head management: title, description, canonical, robots,
 * Open Graph / Twitter cards, and JSON-LD structured data.
 * Rendered once per page; the prerender step bakes the result into
 * static HTML so crawlers that don't execute JS still see it.
 */
export default function Seo({
  title,
  description = SITE_TAGLINE,
  path = "/",
  image = "/images/og-default.png",
  type = "website",
  noindex = false,
  jsonLd = [],
}) {
  useEffect(() => {
    const fullTitle = title ? `${title} | ${SITE_NAME}` : `${SITE_NAME} — ${SITE_TAGLINE}`;
    document.title = fullTitle;

    upsertMeta("name", "description", description);
    upsertMeta("name", "robots", noindex ? "noindex, nofollow" : "index, follow");

    upsertLink("canonical", abs(path));

    upsertMeta("property", "og:site_name", SITE_NAME);
    upsertMeta("property", "og:type", type);
    upsertMeta("property", "og:title", fullTitle);
    upsertMeta("property", "og:description", description);
    upsertMeta("property", "og:url", abs(path));
    upsertMeta("property", "og:image", abs(image));
    upsertMeta("property", "og:locale", "en_KE");

    upsertMeta("name", "twitter:card", "summary_large_image");
    upsertMeta("name", "twitter:title", fullTitle);
    upsertMeta("name", "twitter:description", description);
    upsertMeta("name", "twitter:image", abs(image));

    // Replace this route's structured data
    document.querySelectorAll("script[data-seo-jsonld]").forEach((s) => s.remove());
    jsonLd.filter(Boolean).forEach((schema) => {
      const s = document.createElement("script");
      s.type = "application/ld+json";
      s.dataset.seoJsonld = "true";
      s.textContent = JSON.stringify(schema);
      document.head.appendChild(s);
    });

    return () => {
      document.querySelectorAll("script[data-seo-jsonld]").forEach((s) => s.remove());
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [title, description, path, image, type, noindex, JSON.stringify(jsonLd)]);

  return null;
}
