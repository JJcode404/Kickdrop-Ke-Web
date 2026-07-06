import { useMemo, useState } from "react";
import { Link, Navigate, useParams } from "react-router-dom";
import Gallery from "../components/product/Gallery.jsx";
import ShopProductCard from "../components/shop/ShopProductCard.jsx";
import { formatPrice } from "../data/products.js";
import {
  shopProducts,
  SWATCH_HEX,
  effectivePrice,
  galleryFor,
  stockStatus,
  relatedTo,
} from "../data/shop.js";
import { useStore } from "../store/StoreContext.jsx";
import { WHATSAPP_NUMBER } from "../config.js";

const FEATURES_BY_CATEGORY = {
  running: [
    "Responsive cushioned midsole for all-day comfort",
    "Engineered mesh upper — breathable and featherlight",
    "High-abrasion rubber outsole with multidirectional grip",
  ],
  default: [
    "Premium leather and suede construction",
    "Cushioned insole with anatomical arch support",
    "Durable cup sole with heritage stitching",
  ],
};

function Rating({ rating, reviews }) {
  return (
    <p className="rating pdp__rating">
      <span className="visually-hidden">
        {`Rated ${rating} out of 5 stars from ${reviews} reviews`}
      </span>
      <span className="rating__stars" aria-hidden="true">
        <span className="rating__fill" style={{ width: `${(rating / 5) * 100}%` }}>
          ★★★★★
        </span>
        <span className="rating__base">★★★★★</span>
      </span>
      <span className="rating__meta" aria-hidden="true">
        {rating} · {reviews} reviews
      </span>
    </p>
  );
}

const TABS = [
  { id: "description", label: "Description" },
  { id: "features", label: "Features" },
  { id: "shipping", label: "Shipping & Delivery" },
  { id: "returns", label: "Returns" },
];

function InfoTabs({ product: p }) {
  const [active, setActive] = useState("description");

  const features = /running/i.test(p.category)
    ? FEATURES_BY_CATEGORY.running
    : FEATURES_BY_CATEGORY.default;

  const onKeyDown = (e) => {
    const i = TABS.findIndex((t) => t.id === active);
    if (e.key === "ArrowRight") setActive(TABS[(i + 1) % TABS.length].id);
    if (e.key === "ArrowLeft") setActive(TABS[(i - 1 + TABS.length) % TABS.length].id);
  };

  return (
    <div className="pdp__info">
      <div className="pdp__tabs" role="tablist" aria-label="Product information" onKeyDown={onKeyDown}>
        {TABS.map((t) => (
          <button
            type="button"
            key={t.id}
            id={`tab-${t.id}`}
            role="tab"
            aria-selected={active === t.id}
            aria-controls={`panel-${t.id}`}
            tabIndex={active === t.id ? 0 : -1}
            className="pdp__tab"
            onClick={() => setActive(t.id)}
          >
            {t.label}
          </button>
        ))}
      </div>

      <div
        id="panel-description"
        role="tabpanel"
        aria-labelledby="tab-description"
        hidden={active !== "description"}
        className="pdp__panel"
      >
        <p>
          The {p.name} is {p.brand}&rsquo;s modern classic — a {p.category.toLowerCase()}{" "}
          silhouette that moves effortlessly between the street and the front row.
          Hand-picked for the KICKDROP catalogue and verified authentic before it
          ships, this pair arrives boxed, wrapped, and ready to wear.
        </p>
        <p>
          Available in {p.colors.join(", ").toLowerCase()}, sizes EU {p.sizes[0]}–
          {p.sizes[p.sizes.length - 1]}.
        </p>
      </div>

      <div
        id="panel-features"
        role="tabpanel"
        aria-labelledby="tab-features"
        hidden={active !== "features"}
        className="pdp__panel"
      >
        <ul className="pdp__feature-list" role="list">
          {features.map((f) => (
            <li key={f}>{f}</li>
          ))}
          <li>Verified authentic — numbered KICKDROP certificate included</li>
        </ul>
      </div>

      <div
        id="panel-shipping"
        role="tabpanel"
        aria-labelledby="tab-shipping"
        hidden={active !== "shipping"}
        className="pdp__panel"
      >
        <p>
          Complimentary express delivery across Kenya — Nairobi orders arrive within
          24 hours, nationwide in 1–2 business days. Worldwide shipping in 3–5 days,
          fully tracked and insured.
        </p>
      </div>

      <div
        id="panel-returns"
        role="tabpanel"
        aria-labelledby="tab-returns"
        hidden={active !== "returns"}
        className="pdp__panel"
      >
        <p>
          30-day returns, no questions asked. Pairs must be unworn with the original
          box and certificate. We arrange the courier pickup — you never leave home.
        </p>
      </div>
    </div>
  );
}

export default function Product() {
  const { id } = useParams();
  const product = useMemo(() => shopProducts.find((p) => p.id === id), [id]);

  const { isWished, toggleWish, addToCart } = useStore();
  const [size, setSize] = useState(product?.sizes[0] ?? null);
  const [color, setColor] = useState(product?.colors[0]);
  const [shareMsg, setShareMsg] = useState("");
  const wished = product ? isWished(product.id) : false;

  if (!product) return <Navigate to="/shop" replace />;

  const p = product;
  const stock = stockStatus(p);
  const price = effectivePrice(p);
  const orderable = stock.id !== "out";

  const whatsappHref = () => {
    const lines = [
      "Hi KICKDROP, I want to order this sneaker:",
      `• ${p.name}`,
      `• Size: EU ${size}`,
      `• Color: ${color}`,
      `• Price: ${formatPrice(price)}`,
    ];
    return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(lines.join("\n"))}`;
  };

  const share = async () => {
    const url = window.location.href;
    try {
      if (navigator.share) {
        await navigator.share({ title: p.name, url });
      } else {
        await navigator.clipboard.writeText(url);
        setShareMsg("Link copied to clipboard");
        setTimeout(() => setShareMsg(""), 2500);
      }
    } catch {
      /* user dismissed the share sheet */
    }
  };

  return (
    <article className="section pdp" aria-labelledby="pdp-title">
      <nav className="pdp__breadcrumb" aria-label="Breadcrumb">
        <ol role="list">
          <li><Link to="/">Home</Link></li>
          <li><Link to="/shop">Shop</Link></li>
          <li aria-current="page">{p.name}</li>
        </ol>
      </nav>

      <div className="pdp__layout">
        <Gallery images={galleryFor(p)} name={p.name} />

        <div className="pdp__details">
          <p className="product-card__category">{p.brand}</p>
          <h1 id="pdp-title" className="pdp__name">{p.name}</h1>

          <Rating rating={p.rating} reviews={p.reviews} />

          <p className="pdp__price">
            <span className="pdp__price-now">{formatPrice(price)}</span>
            {p.salePrice && <s className="shop-card__price-was">{formatPrice(p.price)}</s>}
          </p>

          <p className={`pdp__stock pdp__stock--${stock.id}`}>
            <span className="pdp__stock-dot" aria-hidden="true" />
            {stock.label}
          </p>

          <fieldset className="pdp__options" disabled={stock.id === "out"}>
            <legend className="pdp__option-label">
              Size (EU) {size && <strong>— {size}</strong>}
            </legend>
            <div className="pdp__sizes">
              {p.sizes.map((s) => (
                <button
                  type="button"
                  key={s}
                  className="pdp__size"
                  aria-pressed={size === s}
                  onClick={() => setSize(s)}
                >
                  {s}
                </button>
              ))}
            </div>
          </fieldset>

          <fieldset className="pdp__options" disabled={stock.id === "out"}>
            <legend className="pdp__option-label">
              Color — <strong>{color}</strong>
            </legend>
            <div className="pdp__colors">
              {p.colors.map((c) => (
                <button
                  type="button"
                  key={c}
                  className="pdp__color"
                  aria-pressed={color === c}
                  aria-label={c}
                  onClick={() => setColor(c)}
                >
                  <span className="swatch swatch--lg" style={{ backgroundColor: SWATCH_HEX[c] }} />
                </button>
              ))}
            </div>
          </fieldset>

          <div className="pdp__actions">
            {orderable ? (
              <a
                className="btn btn--gold pdp__whatsapp"
                href={whatsappHref()}
                target="_blank"
                rel="noreferrer"
              >
                <svg className="pdp__wa-icon" viewBox="0 0 448 512" fill="currentColor" aria-hidden="true">
                  <path d="M380.9 97.1C339 55.1 283.2 32 223.9 32c-122.4 0-222 99.6-222 222 0 39.1 10.2 77.3 29.6 111L0 480l117.7-30.9c32.4 17.7 68.9 27 106.1 27h.1c122.3 0 224.1-99.6 224.1-222 0-59.3-25.2-115-67.1-157zm-157 341.6c-33.2 0-65.7-8.9-94-25.7l-6.7-4-69.8 18.3L72 359.2l-4.4-7c-18.5-29.4-28.2-63.3-28.2-98.2 0-101.7 82.8-184.5 184.6-184.5 49.3 0 95.6 19.2 130.4 54.1 34.8 34.9 56.2 81.2 56.1 130.5 0 101.8-84.9 184.6-186.6 184.6zm101.2-138.2c-5.5-2.8-32.8-16.2-37.9-18-5.1-1.9-8.8-2.8-12.5 2.8-3.7 5.6-14.3 18-17.6 21.8-3.2 3.7-6.5 4.2-12 1.4-32.6-16.3-54-29.1-75.5-66-5.7-9.8 5.7-9.1 16.3-30.3 1.8-3.7.9-6.9-.5-9.7-1.4-2.8-12.5-30.1-17.1-41.2-4.5-10.8-9.1-9.3-12.5-9.5-3.2-.2-6.9-.2-10.6-.2-3.7 0-9.7 1.4-14.8 6.9-5.1 5.6-19.4 19-19.4 46.3 0 27.3 19.9 53.7 22.6 57.4 2.8 3.7 39.1 59.7 94.8 83.8 35.2 15.2 49 16.5 66.6 13.9 10.7-1.6 32.8-13.4 37.4-26.4 4.6-13 4.6-24.1 3.2-26.4-1.3-2.5-5-3.9-10.5-6.6z" />
                </svg>
                Order on WhatsApp
              </a>
            ) : (
              <button type="button" className="btn btn--gold pdp__whatsapp" disabled>
                <svg className="pdp__wa-icon" viewBox="0 0 448 512" fill="currentColor" aria-hidden="true">
                  <path d="M380.9 97.1C339 55.1 283.2 32 223.9 32c-122.4 0-222 99.6-222 222 0 39.1 10.2 77.3 29.6 111L0 480l117.7-30.9c32.4 17.7 68.9 27 106.1 27h.1c122.3 0 224.1-99.6 224.1-222 0-59.3-25.2-115-67.1-157zm-157 341.6c-33.2 0-65.7-8.9-94-25.7l-6.7-4-69.8 18.3L72 359.2l-4.4-7c-18.5-29.4-28.2-63.3-28.2-98.2 0-101.7 82.8-184.5 184.6-184.5 49.3 0 95.6 19.2 130.4 54.1 34.8 34.9 56.2 81.2 56.1 130.5 0 101.8-84.9 184.6-186.6 184.6z" />
                </svg>
                Order on WhatsApp
              </button>
            )}
            <p className="pdp__cta-hint" role="status">
              {stock.id === "out"
                ? "This pair is currently sold out."
                : `Ordering ${p.name} — EU ${size}, ${color}, ${formatPrice(price)}.`}
            </p>

            <div className="pdp__secondary">
              <button
                type="button"
                className="btn btn--ghost btn--small"
                disabled={stock.id === "out"}
                onClick={() => addToCart({ id: p.id, size, color })}
              >
                Add to Bag
              </button>
              <button
                type="button"
                className="btn btn--ghost btn--small"
                aria-pressed={wished}
                onClick={() => toggleWish(p.id)}
              >
                <svg className="pdp__heart" viewBox="0 0 24 24" fill={wished ? "currentColor" : "none"} stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round" aria-hidden="true">
                  <path d="M12 20.5C7.5 16.5 3.5 13.2 3.5 9.1 3.5 6.4 5.6 4.5 8 4.5c1.6 0 3 .8 4 2.1 1-1.3 2.4-2.1 4-2.1 2.4 0 4.5 1.9 4.5 4.6 0 4.1-4 7.4-8.5 11.4z" />
                </svg>
                {wished ? "Wishlisted" : "Add to Wishlist"}
              </button>
              <button type="button" className="btn btn--ghost btn--small" onClick={share}>
                Share
              </button>
              <span className="pdp__share-msg" role="status">{shareMsg}</span>
            </div>
          </div>

          <InfoTabs product={p} />
        </div>
      </div>

      <section className="pdp__related" aria-labelledby="related-title">
        <p className="section-heading__eyebrow">Complete the Rotation</p>
        <h2 id="related-title" className="pdp__related-title">
          You May Also Like
        </h2>
        <ul className="shop-grid" role="list">
          {relatedTo(p).map((rp, i) => (
            <ShopProductCard key={rp.id} product={rp} index={i} />
          ))}
        </ul>
      </section>
    </article>
  );
}
