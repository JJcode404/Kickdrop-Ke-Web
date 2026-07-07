import { useEffect, useMemo, useRef, useState } from "react";
import { useSearchParams } from "react-router-dom";
import FilterPanel from "../components/shop/FilterPanel.jsx";
import ShopProductCard from "../components/shop/ShopProductCard.jsx";
import Seo from "../components/Seo.jsx";
import { collectionLd, breadcrumbLd } from "../data/seo.js";
import { filterProducts, shopProducts, BRANDS } from "../data/shop.js";

const emptyFilters = () => ({
  brands: new Set(),
  sizes: new Set(),
  colors: new Set(),
  price: "all",
  availability: new Set(),
});

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

export default function Shop({ title = "Shop", presetSort, presetAvailability }) {
  const [searchParams] = useSearchParams();
  const [loading, setLoading] = useState(true);
  const [query, setQuery] = useState(() => searchParams.get("q") ?? "");
  const [filters, setFilters] = useState(() => {
    const f = emptyFilters();
    if (presetAvailability) f.availability.add(presetAvailability);
    const brandParam = searchParams.get("brand");
    if (brandParam && BRANDS.includes(brandParam)) f.brands.add(brandParam);
    return f;
  });
  const [sort, setSort] = useState(presetSort ?? "newest");
  const [drawerOpen, setDrawerOpen] = useState(false);
  const panelRef = useRef(null);

  useEffect(() => {
    const t = setTimeout(() => setLoading(false), 700);
    return () => clearTimeout(t);
  }, []);

  // Drawer: lock page scroll, close on Escape
  useEffect(() => {
    if (!drawerOpen) return;
    document.body.style.overflow = "hidden";
    const onKey = (e) => e.key === "Escape" && setDrawerOpen(false);
    document.addEventListener("keydown", onKey);
    panelRef.current?.querySelector("button, input")?.focus();
    return () => {
      document.body.style.overflow = "";
      document.removeEventListener("keydown", onKey);
    };
  }, [drawerOpen]);

  const results = useMemo(
    () => filterProducts({ query, ...filters, sort }),
    [query, filters, sort]
  );

  // Changing this key remounts the grid so the entrance stagger replays
  const gridKey = useMemo(() => `${sort}:${results.map((p) => p.id).join(",")}`, [results, sort]);

  const activeCount =
    filters.brands.size +
    filters.sizes.size +
    filters.colors.size +
    filters.availability.size +
    (filters.price !== "all" ? 1 : 0);

  const toggle = (group, value) =>
    setFilters((f) => {
      const next = new Set(f[group]);
      next.has(value) ? next.delete(value) : next.add(value);
      return { ...f, [group]: next };
    });

  const clearAll = () => {
    setFilters(emptyFilters());
    setQuery("");
  };

  const brandParam = searchParams.get("brand");
  return (
    <section className="section shop" aria-labelledby="shop-title">
      <Seo
        title={brandParam ? `${brandParam} Sneakers in Kenya` : "Shop All Sneakers"}
        description={
          brandParam
            ? `Buy authentic ${brandParam} sneakers in Nairobi, Kenya. Verified pairs, free delivery across Kenya, M-Pesa accepted, order on WhatsApp.`
            : "Browse the full KICKDROP catalogue — verified-authentic Nike, Jordan, Adidas, New Balance, ASICS, PUMA, Converse, Vans and On sneakers with free delivery across Kenya."
        }
        path={brandParam ? `/shop?brand=${encodeURIComponent(brandParam)}` : "/shop"}
        jsonLd={[
          collectionLd({
            name: brandParam ? `${brandParam} Sneakers` : "Shop All Sneakers",
            description: "The full KICKDROP sneaker catalogue.",
            path: "/shop",
            products: results,
          }),
          breadcrumbLd([
            { name: "Home", path: "/" },
            { name: "Shop", path: "/shop" },
          ]),
        ]}
      />
      <header className="shop__header">
        <p className="section-heading__eyebrow">The Catalogue</p>
        <h1 id="shop-title" className="section-heading__title">
          {title}
        </h1>
        <p className="section-heading__lede">
          Discover premium sneakers from the world&rsquo;s leading brands.
        </p>
      </header>

      <div className="shop__toolbar">
        <div className="shop__search">
          <svg
            className="shop__search-icon"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.75"
            strokeLinecap="round"
            aria-hidden="true"
          >
            <circle cx="11" cy="11" r="7" />
            <path d="M21 21l-4.35-4.35" />
          </svg>
          <label htmlFor="shop-search" className="visually-hidden">
            Search products
          </label>
          <input
            id="shop-search"
            type="search"
            placeholder="Search brand or model…"
            autoComplete="off"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
        </div>

        <button
          type="button"
          className="btn btn--ghost btn--small shop__filters-toggle"
          aria-expanded={drawerOpen}
          aria-controls="shop-filters"
          onClick={() => setDrawerOpen(true)}
        >
          Filters{activeCount > 0 && ` (${activeCount})`}
        </button>

        <p className="shop__count" role="status">
          {loading
            ? "Loading pairs…"
            : `${results.length} of ${shopProducts.length} pairs`}
        </p>
      </div>

      <div className="shop__layout">
        {drawerOpen && (
          <button
            type="button"
            className="shop__backdrop"
            aria-label="Close filters"
            onClick={() => setDrawerOpen(false)}
          />
        )}

        <FilterPanel
          ref={panelRef}
          id="shop-filters"
          open={drawerOpen}
          onClose={() => setDrawerOpen(false)}
          filters={filters}
          sort={sort}
          onToggle={toggle}
          onPrice={(id) => setFilters((f) => ({ ...f, price: id }))}
          onSort={setSort}
          onClear={clearAll}
          activeCount={activeCount}
        />

        <div className="shop__results">
          {loading ? (
            <ul className="shop-grid" role="list" aria-label="Loading products">
              {Array.from({ length: 8 }, (_, i) => (
                <SkeletonCard key={i} />
              ))}
            </ul>
          ) : results.length > 0 ? (
            <ul className="shop-grid" role="list" key={gridKey}>
              {results.map((p, i) => (
                <ShopProductCard key={p.id} product={p} index={i} />
              ))}
            </ul>
          ) : (
            <div className="shop__empty">
              <p className="shop__empty-title">No pairs match your filters.</p>
              <p className="shop__empty-body">
                Try widening your search — or clear everything and browse the
                full catalogue.
              </p>
              <button type="button" className="btn btn--ghost btn--small" onClick={clearAll}>
                Clear all filters
              </button>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
