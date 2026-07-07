import { useEffect, useMemo, useState } from "react";
import SaleCard from "../components/shop/SaleCard.jsx";
import Seo from "../components/Seo.jsx";
import { collectionLd, breadcrumbLd } from "../data/seo.js";
import {
  saleProducts,
  discountOf,
  maxDiscount,
  PRICE_RANGES,
  SIZES,
} from "../data/shop.js";

const BRANDS = [...new Set(saleProducts.map((p) => p.brand))].sort();

const DISCOUNTS = [
  { id: 0, label: "Any discount" },
  { id: 10, label: "10% off or more" },
  { id: 20, label: "20% off or more" },
  { id: 30, label: "30% off or more" },
  { id: 50, label: "50% off or more" },
];

const AVAILABILITY = [
  { id: "all", label: "All deals" },
  { id: "in-stock", label: "In stock" },
  { id: "low-stock", label: "Almost gone" },
];

const SORTS = [
  { id: "discount", label: "Biggest Discount" },
  { id: "price-asc", label: "Lowest Price" },
  { id: "newest", label: "Newest Deals" },
];

function SkeletonCard() {
  return (
    <li className="skel-card" aria-hidden="true">
      <div className="skel skel--media" />
      <div className="skel skel--line skel--w40" />
      <div className="skel skel--line skel--w80" />
      <div className="skel skel--line skel--w30" />
    </li>
  );
}

export default function Sale() {
  const [loading, setLoading] = useState(true);
  const [brands, setBrands] = useState(() => new Set());
  const [sizes, setSizes] = useState(() => new Set());
  const [discount, setDiscount] = useState(0);
  const [price, setPrice] = useState("all");
  const [availability, setAvailability] = useState("all");
  const [sort, setSort] = useState("discount");

  useEffect(() => {
    const t = setTimeout(() => setLoading(false), 650);
    return () => clearTimeout(t);
  }, []);

  const toggleIn = (setter) => (value) =>
    setter((prev) => {
      const next = new Set(prev);
      next.has(value) ? next.delete(value) : next.add(value);
      return next;
    });
  const toggleBrand = toggleIn(setBrands);
  const toggleSize = toggleIn(setSizes);

  const results = useMemo(() => {
    const range = PRICE_RANGES.find((r) => r.id === price) ?? PRICE_RANGES[0];
    let out = saleProducts.filter((p) => {
      if (discountOf(p) < discount) return false;
      if (brands.size && !brands.has(p.brand)) return false;
      if (sizes.size && !p.sizes.some((s) => sizes.has(s))) return false;
      if (p.salePrice < range.min || p.salePrice > range.max) return false;
      if (availability === "in-stock" && p.soldOut) return false;
      if (availability === "low-stock" && !p.lowStock) return false;
      return true;
    });
    if (sort === "price-asc") out = [...out].sort((a, b) => a.salePrice - b.salePrice);
    if (sort === "newest") out = [...out].sort((a, b) => b.added - a.added);
    // "discount" keeps the source order — saleProducts is biggest-discount first
    return out;
  }, [brands, sizes, discount, price, availability, sort]);

  const gridKey = useMemo(() => results.map((p) => p.id).join(","), [results]);

  const filtered =
    brands.size > 0 || sizes.size > 0 || discount !== 0 ||
    price !== "all" || availability !== "all";

  const clearAll = () => {
    setBrands(new Set());
    setSizes(new Set());
    setDiscount(0);
    setPrice("all");
    setAvailability("all");
    setSort("discount");
  };

  return (
    <section className="section shop arrivals sale" aria-labelledby="sale-title">
      <Seo
        title={`Sneaker Sale Kenya — Up to ${maxDiscount}% Off Authentic Sneakers`}
        description={`Sneakers on sale in Nairobi: up to ${maxDiscount}% off verified-authentic Nike, Adidas, PUMA & New Balance pairs. Limited-time offers, free delivery across Kenya, M-Pesa accepted.`}
        path="/sale"
        jsonLd={[
          collectionLd({ name: "Sale", description: "Limited-time offers on authentic sneakers.", path: "/sale", products: results }),
          breadcrumbLd([{ name: "Home", path: "/" }, { name: "Sale", path: "/sale" }]),
        ]}
      />
      <header className="arrivals__hero">
        <p className="arrivals__pill sale__pill">
          <span className="arrival-card__limited-dot" aria-hidden="true" />
          Up to {maxDiscount}% Off
        </p>
        <h1 id="sale-title" className="section-heading__title">
          Sale
        </h1>
        <p className="section-heading__lede arrivals__lede">
          Limited-time offers on premium sneakers. Grab them before
          they&rsquo;re gone.
        </p>
      </header>

      <div className="arrivals__toolbar">
        <div className="arrivals__brands" role="group" aria-label="Filter by brand">
          {BRANDS.map((b) => (
            <button
              type="button"
              key={b}
              className="arrivals__brand"
              aria-pressed={brands.has(b)}
              onClick={() => toggleBrand(b)}
            >
              {b}
            </button>
          ))}
        </div>

        <div className="arrivals__brands" role="group" aria-label="Filter by size (EU)">
          {SIZES.map((s) => (
            <button
              type="button"
              key={s}
              className="arrivals__brand sale__size"
              aria-pressed={sizes.has(s)}
              aria-label={`Size EU ${s}`}
              onClick={() => toggleSize(s)}
            >
              {s}
            </button>
          ))}
        </div>

        <div className="arrivals__selects">
          <label className="arrivals__select">
            <span>Discount</span>
            <select value={discount} onChange={(e) => setDiscount(Number(e.target.value))}>
              {DISCOUNTS.map((d) => (
                <option key={d.id} value={d.id}>{d.label}</option>
              ))}
            </select>
          </label>

          <label className="arrivals__select">
            <span>Price</span>
            <select value={price} onChange={(e) => setPrice(e.target.value)}>
              {PRICE_RANGES.map((r) => (
                <option key={r.id} value={r.id}>{r.label}</option>
              ))}
            </select>
          </label>

          <label className="arrivals__select">
            <span>Availability</span>
            <select value={availability} onChange={(e) => setAvailability(e.target.value)}>
              {AVAILABILITY.map((a) => (
                <option key={a.id} value={a.id}>{a.label}</option>
              ))}
            </select>
          </label>

          <label className="arrivals__select">
            <span>Sort</span>
            <select value={sort} onChange={(e) => setSort(e.target.value)}>
              {SORTS.map((s) => (
                <option key={s.id} value={s.id}>{s.label}</option>
              ))}
            </select>
          </label>
        </div>

        <p className="shop__count arrivals__count" role="status">
          {loading
            ? "Loading deals…"
            : `${results.length} of ${saleProducts.length} deals`}
        </p>
      </div>

      {loading ? (
        <ul className="shop-grid" role="list" aria-label="Loading sale items">
          {Array.from({ length: 8 }, (_, i) => (
            <SkeletonCard key={i} />
          ))}
        </ul>
      ) : results.length > 0 ? (
        <ul className="shop-grid" role="list" key={gridKey}>
          {results.map((p, i) => (
            <SaleCard key={p.id} product={p} index={i} />
          ))}
        </ul>
      ) : (
        <div className="shop__empty">
          <p className="shop__empty-title">No deals match those filters.</p>
          <p className="shop__empty-body">
            The best offers disappear first — reset the filters to see every
            live deal.
          </p>
          <button
            type="button"
            className="btn btn--ghost btn--small"
            onClick={clearAll}
            disabled={!filtered}
          >
            Reset filters
          </button>
        </div>
      )}
    </section>
  );
}
