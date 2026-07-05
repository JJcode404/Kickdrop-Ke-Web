import { Link } from "react-router-dom";
import useReveal from "../hooks/useReveal.js";
import SectionHeading from "./SectionHeading.jsx";
import { brandsData } from "../data/brands.js";

function BrandTile({ brand, index }) {
  const ref = useReveal();
  return (
    <li
      className="brandstrip__item reveal"
      ref={ref}
      style={{ "--reveal-delay": `${index * 50}ms` }}
    >
      <Link
        to={`/shop?brand=${encodeURIComponent(brand.name)}`}
        className="brandstrip__tile"
        aria-label={`Shop ${brand.name}`}
      >
        <span className="brandstrip__logo">
          <img src={brand.logo} alt="" width="96" height="48" loading="lazy" />
        </span>
        <span className="brandstrip__name">{brand.name}</span>
      </Link>
    </li>
  );
}

export default function BrandStrip() {
  return (
    <section className="section" aria-labelledby="brandstrip-title">
      <SectionHeading
        id="brandstrip-title"
        eyebrow="The Roster"
        title="Shop by Brand"
        lede="Nine houses, one standard. Every pair verified authentic."
      />
      <ul className="brandstrip" role="list">
        {brandsData.map((b, i) => (
          <BrandTile key={b.name} brand={b} index={i} />
        ))}
      </ul>
      <p className="brandstrip__more">
        <Link to="/brands" className="brandstrip__more-link">
          Explore all brands <span className="arrow" aria-hidden="true">→</span>
        </Link>
      </p>
    </section>
  );
}
