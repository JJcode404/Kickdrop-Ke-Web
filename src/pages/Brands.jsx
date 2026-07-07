import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { brandsData, featuredBrands, BRAND_FOCUSES } from "../data/brands.js";
import Seo from "../components/Seo.jsx";
import { breadcrumbLd } from "../data/seo.js";

const SORTS = [
  { id: "az", label: "A – Z" },
  { id: "popularity", label: "Popularity" },
  { id: "count", label: "Most products" },
];

const shopLink = (name) => `/shop?brand=${encodeURIComponent(name)}`;
const styles = (n) => `${n} ${n === 1 ? "style" : "styles"}`;

function FeaturedCard({ brand, index }) {
  return (
    <li className="brand-featured" style={{ "--i": index }}>
      <Link to={shopLink(brand.name)} className="brand-featured__link">
        <span className="product-card__badge brand-featured__badge">
          Featured Brand
        </span>
        <span className="brand-featured__logo">
          <img src={brand.logo} alt="" width="160" height="80" loading="lazy" />
        </span>
        <span className="brand-featured__body">
          <span className="brand-featured__name">{brand.name}</span>
          <span className="brand-featured__tagline">{brand.tagline}</span>
          <span className="brand-featured__blurb">{brand.blurb}</span>
          <span className="brand-featured__cta">
            Shop {brand.name} · {styles(brand.count)}{" "}
            <span className="arrow" aria-hidden="true">→</span>
          </span>
        </span>
      </Link>
    </li>
  );
}

function BrandCard({ brand, index }) {
  return (
    <li className="brand-card-wrap" style={{ "--i": Math.min(index, 7) }}>
      <Link to={shopLink(brand.name)} className="brand-card">
        <span className="brand-card__logo">
          <img src={brand.logo} alt="" width="120" height="60" loading="lazy" />
        </span>
        <span className="brand-card__name">{brand.name}</span>
        <span className="brand-card__tagline">{brand.tagline}</span>
        <span className="brand-card__count">{styles(brand.count)}</span>
      </Link>
    </li>
  );
}

function SkeletonBrand() {
  return (
    <li className="skel-card brand-skel" aria-hidden="true">
      <div className="skel brand-skel__logo" />
      <div className="skel skel--line skel--w40" />
      <div className="skel skel--line skel--w80" />
    </li>
  );
}

export default function Brands() {
  const [loading, setLoading] = useState(true);
  const [focus, setFocus] = useState("all");
  const [sort, setSort] = useState("az");

  useEffect(() => {
    const t = setTimeout(() => setLoading(false), 600);
    return () => clearTimeout(t);
  }, []);

  const results = useMemo(() => {
    let out = brandsData.filter((b) => focus === "all" || b.focus === focus);
    if (sort === "popularity") out = [...out].sort((a, b) => b.popularity - a.popularity);
    if (sort === "count") out = [...out].sort((a, b) => b.count - a.count || a.name.localeCompare(b.name));
    // "az" keeps source order — brandsData is alphabetical
    return out;
  }, [focus, sort]);

  const gridKey = useMemo(() => results.map((b) => b.name).join(","), [results]);

  return (
    <section className="section shop arrivals brands" aria-labelledby="brands-title">
      <Seo
        title="Sneaker Brands in Kenya — Nike, Jordan, Adidas, New Balance & More"
        description="Shop 9 iconic sneaker brands in Nairobi, Kenya: Nike, Jordan, Adidas, New Balance, ASICS, PUMA, Converse, Vans and On — every pair verified authentic with free Kenya delivery."
        path="/brands"
        jsonLd={[breadcrumbLd([{ name: "Home", path: "/" }, { name: "Brands", path: "/brands" }])]}
      />
      <header className="arrivals__hero">
        <p className="arrivals__pill">
          <span className="arrival-card__limited-dot" aria-hidden="true" />
          Curated Selection
        </p>
        <h1 id="brands-title" className="section-heading__title">
          Brands
        </h1>
        <p className="section-heading__lede arrivals__lede">
          Explore iconic sneaker brands shaping culture, performance, and
          streetwear.
        </p>
      </header>

      <div className="brands__featured-wrap">
        <div className="brands__glow" aria-hidden="true" />
        <h2 className="brands__subheading">The House Favorites</h2>
        <ul className="brands__featured" role="list">
          {featuredBrands.map((b, i) => (
            <FeaturedCard key={b.name} brand={b} index={i} />
          ))}
        </ul>
      </div>

      <div className="arrivals__toolbar">
        <h2 className="brands__subheading brands__subheading--grid">
          All Brands
        </h2>
        <div className="arrivals__selects">
          <label className="arrivals__select">
            <span>Focus</span>
            <select value={focus} onChange={(e) => setFocus(e.target.value)}>
              <option value="all">All categories</option>
              {BRAND_FOCUSES.map((f) => (
                <option key={f} value={f}>{f}</option>
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
          {loading ? "Loading brands…" : `${results.length} of ${brandsData.length} brands`}
        </p>
      </div>

      {loading ? (
        <ul className="brands__grid" role="list" aria-label="Loading brands">
          {Array.from({ length: 8 }, (_, i) => (
            <SkeletonBrand key={i} />
          ))}
        </ul>
      ) : (
        <ul className="brands__grid" role="list" key={gridKey}>
          {results.map((b, i) => (
            <BrandCard key={b.name} brand={b} index={i} />
          ))}
        </ul>
      )}
    </section>
  );
}
