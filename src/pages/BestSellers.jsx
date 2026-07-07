import { useEffect, useMemo, useState } from "react";
import BestSellerCard from "../components/shop/BestSellerCard.jsx";
import Seo from "../components/Seo.jsx";
import { collectionLd, breadcrumbLd } from "../data/seo.js";
import {
  bestSellersRanked,
  effectivePrice,
  soldOf,
  isTrendingUp,
  PRICE_RANGES,
} from "../data/shop.js";

const BRANDS = [...new Set(bestSellersRanked.map((p) => p.brand))].sort();
const CATEGORIES = [...new Set(bestSellersRanked.map((p) => p.category))].sort();

const RATINGS = [
  { id: 0, label: "Any rating" },
  { id: 4.5, label: "4.5 ★ & up" },
  { id: 4.7, label: "4.7 ★ & up" },
  { id: 4.8, label: "4.8 ★ & up" },
];

const SORTS = [
  { id: "popular", label: "Most Popular" },
  { id: "rated", label: "Highest Rated" },
  { id: "purchased", label: "Most Purchased" },
  { id: "trending", label: "Trending" },
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

export default function BestSellers() {
  const [loading, setLoading] = useState(true);
  const [brands, setBrands] = useState(() => new Set());
  const [category, setCategory] = useState("all");
  const [price, setPrice] = useState("all");
  const [rating, setRating] = useState(0);
  const [sort, setSort] = useState("popular");

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
    let out = bestSellersRanked.filter((p) => {
      if (brands.size && !brands.has(p.brand)) return false;
      if (category !== "all" && p.category !== category) return false;
      const pr = effectivePrice(p);
      if (pr < range.min || pr > range.max) return false;
      if (p.rating < rating) return false;
      return true;
    });
    const by = {
      // "popular" keeps source order — bestSellersRanked is already ranked
      rated: (a, b) => b.rating - a.rating || b.reviews - a.reviews,
      purchased: (a, b) => soldOf(b) - soldOf(a),
      trending: (a, b) =>
        Number(isTrendingUp(b)) - Number(isTrendingUp(a)) || b.added - a.added,
    }[sort];
    if (by) out = [...out].sort(by);
    return out;
  }, [brands, category, price, rating, sort]);

  const gridKey = useMemo(() => results.map((p) => p.id).join(","), [results]);

  const filtered =
    brands.size > 0 || category !== "all" || price !== "all" || rating !== 0;

  const clearAll = () => {
    setBrands(new Set());
    setCategory("all");
    setPrice("all");
    setRating(0);
    setSort("popular");
  };

  return (
    <section className="section shop arrivals" aria-labelledby="best-sellers-title">
      <Seo
        title="Best-Selling Sneakers in Kenya — Customer Favorites"
        description="Kenya's most-loved sneakers ranked by sales: Nike Air Force 1, Adidas Samba OG, Nike Dunk Low Panda, New Balance 550 & more. Real ratings, verified authentic, free delivery."
        path="/best-sellers"
        jsonLd={[
          collectionLd({ name: "Best Sellers", description: "KICKDROP's best-selling sneakers, ranked by units sold.", path: "/best-sellers", products: results }),
          breadcrumbLd([{ name: "Home", path: "/" }, { name: "Best Sellers", path: "/best-sellers" }]),
        ]}
      />
      <header className="arrivals__hero">
        <p className="arrivals__pill">
          <span className="arrival-card__limited-dot" aria-hidden="true" />
          Customer Favorites
        </p>
        <h1 id="best-sellers-title" className="section-heading__title">
          Best Sellers
        </h1>
        <p className="section-heading__lede arrivals__lede">
          Most loved. Most worn. Customer favorites that define the culture.
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
            <span>Category</span>
            <select value={category} onChange={(e) => setCategory(e.target.value)}>
              <option value="all">All categories</option>
              {CATEGORIES.map((c) => (
                <option key={c} value={c}>{c}</option>
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
            <span>Rating</span>
            <select value={rating} onChange={(e) => setRating(Number(e.target.value))}>
              {RATINGS.map((r) => (
                <option key={r.id} value={r.id}>{r.label}</option>
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
            ? "Loading favorites…"
            : `${results.length} of ${bestSellersRanked.length} favorites`}
        </p>
      </div>

      {loading ? (
        <ul className="shop-grid" role="list" aria-label="Loading best sellers">
          {Array.from({ length: 8 }, (_, i) => (
            <SkeletonCard key={i} />
          ))}
        </ul>
      ) : results.length > 0 ? (
        <ul className="shop-grid" role="list" key={gridKey}>
          {results.map((p, i) => (
            <BestSellerCard key={p.id} product={p} index={i} />
          ))}
        </ul>
      ) : (
        <div className="shop__empty">
          <p className="shop__empty-title">No favorites match those filters.</p>
          <p className="shop__empty-body">
            Reset the filters to see every pair our customers keep coming back
            for.
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
