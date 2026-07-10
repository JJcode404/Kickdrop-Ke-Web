import { SITE_URL, SITE_NAME, BUSINESS, SOCIALS } from "../config.js";
import { effectivePrice, galleryFor, soldOf } from "./shop.js";
import { reviews as storeReviews } from "./products.js";

const abs = (url) => (url?.startsWith("http") ? url : `${SITE_URL}${url ?? ""}`);

export const organizationLd = () => ({
  "@context": "https://schema.org",
  "@type": "Organization",
  "@id": `${SITE_URL}/#organization`,
  name: SITE_NAME,
  url: SITE_URL,
  logo: abs("/icon-512.png"),
  email: BUSINESS.email,
  telephone: BUSINESS.phone,
  sameAs: [SOCIALS.instagram, SOCIALS.tiktok],
  address: {
    "@type": "PostalAddress",
    streetAddress: BUSINESS.street,
    addressLocality: BUSINESS.city,
    addressCountry: BUSINESS.country,
  },
});

export const localBusinessLd = () => ({
  "@context": "https://schema.org",
  "@type": "ShoeStore",
  "@id": `${SITE_URL}/#store`,
  name: SITE_NAME,
  description:
    "Premium sneaker store in Nairobi, Kenya. Verified-authentic Nike, Jordan, Adidas, New Balance, ASICS, PUMA, Converse, Vans and On sneakers with free delivery across Kenya and WhatsApp ordering.",
  url: SITE_URL,
  image: abs("/images/og-default.png"),
  telephone: BUSINESS.phone,
  email: BUSINESS.email,
  priceRange: "KSh 5,500 – KSh 89,500",
  currenciesAccepted: "KES",
  paymentAccepted: "M-Pesa, Credit Card, Debit Card",
  address: {
    "@type": "PostalAddress",
    streetAddress: BUSINESS.street,
    addressLocality: BUSINESS.city,
    addressCountry: BUSINESS.country,
  },
  openingHoursSpecification: BUSINESS.openingHours.map((h) => ({
    "@type": "OpeningHoursSpecification",
    dayOfWeek: h.days,
    opens: h.opens,
    closes: h.closes,
  })),
  sameAs: [SOCIALS.instagram, SOCIALS.tiktok],
  aggregateRating: {
    "@type": "AggregateRating",
    ratingValue: "4.9",
    reviewCount: String(storeReviews.length),
  },
  review: storeReviews.map((r) => ({
    "@type": "Review",
    reviewRating: { "@type": "Rating", ratingValue: String(r.rating), bestRating: "5" },
    author: { "@type": "Person", name: r.name },
    reviewBody: r.quote,
  })),
});

export const websiteLd = () => ({
  "@context": "https://schema.org",
  "@type": "WebSite",
  "@id": `${SITE_URL}/#website`,
  name: SITE_NAME,
  url: SITE_URL,
  publisher: { "@id": `${SITE_URL}/#organization` },
  potentialAction: {
    "@type": "SearchAction",
    target: { "@type": "EntryPoint", urlTemplate: `${SITE_URL}/shop?q={search_term_string}` },
    "query-input": "required name=search_term_string",
  },
});

export const breadcrumbLd = (items) => ({
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: items.map((it, i) => ({
    "@type": "ListItem",
    position: i + 1,
    name: it.name,
    item: abs(it.path),
  })),
});

export const productLd = (p) => ({
  "@context": "https://schema.org",
  "@type": "Product",
  "@id": `${SITE_URL}/product/${p.id}#product`,
  name: p.name,
  sku: p.id,
  brand: { "@type": "Brand", name: p.brand },
  category: p.category,
  image: galleryFor(p).map((img) => abs(img.src)),
  description: `${p.name} — authentic ${p.brand} ${p.category.toLowerCase()} sneaker, verified by ${SITE_NAME} in Nairobi, Kenya. Available in ${p.colors.join(", ").toLowerCase()}, EU sizes ${p.sizes[0]}–${p.sizes[p.sizes.length - 1]}. Free delivery across Kenya, worldwide shipping, 30-day returns.`,
  offers: {
    "@type": "Offer",
    url: `${SITE_URL}/product/${p.id}`,
    price: String(effectivePrice(p)),
    priceCurrency: "KES",
    priceValidUntil: "2026-12-31",
    itemCondition: "https://schema.org/NewCondition",
    availability: p.soldOut
      ? "https://schema.org/OutOfStock"
      : p.lowStock
        ? "https://schema.org/LimitedAvailability"
        : "https://schema.org/InStock",
    seller: { "@id": `${SITE_URL}/#organization` },
  },
  aggregateRating: {
    "@type": "AggregateRating",
    ratingValue: String(p.rating),
    reviewCount: String(p.reviews),
  },
});

export const collectionLd = ({ name, description, path, products }) => ({
  "@context": "https://schema.org",
  "@type": "CollectionPage",
  name: `${name} | ${SITE_NAME}`,
  description,
  url: abs(path),
  isPartOf: { "@id": `${SITE_URL}/#website` },
  mainEntity: {
    "@type": "ItemList",
    numberOfItems: products.length,
    itemListElement: products.map((p, i) => ({
      "@type": "ListItem",
      position: i + 1,
      url: `${SITE_URL}/product/${p.id}`,
      name: p.name,
    })),
  },
});

export const faqLd = (qas) => ({
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: qas.map((qa) => ({
    "@type": "Question",
    name: qa.q,
    acceptedAnswer: { "@type": "Answer", text: qa.a },
  })),
});

/* Popularity hint reused in descriptions */
export const soldLabel = (p) => `${soldOf(p)}+ pairs sold`;
