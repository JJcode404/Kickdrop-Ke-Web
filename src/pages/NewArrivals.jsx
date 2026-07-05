import { useEffect, useMemo, useState } from "react";
import NewArrivalCard from "../components/shop/NewArrivalCard.jsx";
import { newArrivals, effectivePrice, PRICE_RANGES } from "../data/shop.js";

const BRANDS = [...new Set(newArrivals.map((p) => p.brand))].sort();

const AVAILABILITY = [
  { id: "all", label: "All pairs" },
  { id: "in-stock", label: "In stock" },
  { id: "on-sale", label: "On sale" },
];

const SORTS = [
  { id: "newest", label: "Newest first" },
  { id: "price-asc", label: "Price: Low to High" },
  { id: "price-desc", label: "Price: High to Low" },
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

export default function NewArrivals() {
  const [loading, setLoading] = useState(true);
  const [brands, setBrands] = useState(() => new Set());
  const [price, setPrice] = useState("all");
  const [availability, setAvailability] = useState("all");
  const [sort, setSort] = useState("newest");

  useEffect(() => {
    const t = setTimeout(() => setLoading(false), 650);
    return () => clearTimeout(t);
  }, []);

  const toggleBrand = (b) =>
    setBrands((prev) => {
      const next = new Set(prev);
      next.has(b) ? next.delete(b) : next.add(b);
      return next;
    });

  const results = useMemo(() => {
    const range = PRICE_RANGES.find((r) => r.id === price) ?? PRICE_RANGES[0];
    let out = newArrivals.filter((p) => {
      if (brands.size && !brands.has(p.brand)) return false;
      const pr = effectivePrice(p);
      if (pr < range.min || pr > range.max) return false;
      if (availability === "in-stock" && p.soldOut) return false;
      if (availability === "on-sale" && !p.salePrice) return false;
      return true;
    });
    if (sort === "price-asc") out = [...out].sort((a, b) => effectivePrice(a) - effectivePrice(b));
    if (sort === "price-desc") out = [...out].sort((a, b) => effectivePrice(b) - effectivePrice(a));
    // "newest" keeps the source order — newArrivals is already newest first
    return out;
  }, [brands, price, availability, sort]);

  const gridKey = useMemo(() => results.map((p) => p.id).join(","), [results]);

  const clearAll = () => {
    setBrands(new Set());
    setPrice("all");
    setAvailability("all");
    setSort("newest");
  };

  const filtered = brands.size > 0 || price !== "all" || availability !== "all";

  return (
    <section className="section shop arrivals" aria-labelledby="arrivals-title">
      <header className="arrivals__hero">
        <p className="arrivals__pill">
          <span className="arrival-card__limited-dot" aria-hidden="true" />
          Updated Weekly
        </p>
        <h1 id="arrivals-title" className="section-heading__title">
          New Arrivals
        </h1>
        <p className="section-heading__lede arrivals__lede">
          Fresh drops. Latest sneaker releases. Limited availability.
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

        <div className="arrivals__selects">
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
            ? "Loading drops…"
            : `${results.length} of ${newArrivals.length} drops`}
        </p>
      </div>

      {loading ? (
        <ul className="shop-grid" role="list" aria-label="Loading new arrivals">
          {Array.from({ length: 8 }, (_, i) => (
            <SkeletonCard key={i} />
          ))}
        </ul>
      ) : results.length > 0 ? (
        <ul className="shop-grid" role="list" key={gridKey}>
          {results.map((p, i) => (
            <NewArrivalCard key={p.id} product={p} index={i} />
          ))}
        </ul>
      ) : (
        <div className="shop__empty">
          <p className="shop__empty-title">Nothing matches those filters.</p>
          <p className="shop__empty-body">
            The freshest drops move fast — reset the filters to see every new
            arrival.
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
