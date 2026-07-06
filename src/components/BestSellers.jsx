import { Link } from "react-router-dom";
import useReveal from "../hooks/useReveal.js";
import SectionHeading from "./SectionHeading.jsx";
import { products, formatPrice } from "../data/products.js";
import { useStore } from "../store/StoreContext.jsx";

function ProductCard({ product, index }) {
  const ref = useReveal();
  const { isWished, toggleWish } = useStore();
  const wished = isWished(product.id);
  return (
    <li
      className="product-card reveal"
      ref={ref}
      style={{ "--reveal-delay": `${(index % 4) * 90}ms` }}
    >
      <div className="media-zoom product-card__media">
        {product.badge && <span className="product-card__badge">{product.badge}</span>}
        <button
          type="button"
          className="shop-card__wish"
          aria-pressed={wished}
          aria-label={
            wished
              ? `Remove ${product.name} from wishlist`
              : `Add ${product.name} to wishlist`
          }
          onClick={() => toggleWish(product.id)}
        >
          <svg viewBox="0 0 24 24" fill={wished ? "currentColor" : "none"} stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round" aria-hidden="true">
            <path d="M12 20.5C7.5 16.5 3.5 13.2 3.5 9.1 3.5 6.4 5.6 4.5 8 4.5c1.6 0 3 .8 4 2.1 1-1.3 2.4-2.1 4-2.1 2.4 0 4.5 1.9 4.5 4.6 0 4.1-4 7.4-8.5 11.4z" />
          </svg>
        </button>
        <Link
          to={`/product/${product.id}`}
          className="shop-card__img-link"
          tabIndex={-1}
          aria-hidden="true"
        >
          <img
            className="product-photo"
            src={product.image}
            alt={product.alt}
            loading="lazy"
            width="800"
            height="572"
          />
        </Link>
      </div>
      <div className="product-card__body">
        <p className="product-card__category">{product.category}</p>
        <h3 className="product-card__name">
          <Link to={`/product/${product.id}`} className="shop-card__name-link">
            {product.name}
          </Link>
        </h3>
        <p className="product-card__price">{formatPrice(product.price)}</p>
        <Link
          to={`/product/${product.id}`}
          className="btn btn--ghost btn--small product-card__cta"
        >
          View Details
        </Link>
      </div>
    </li>
  );
}

export default function BestSellers() {
  return (
    <section id="best-sellers" className="section" aria-labelledby="best-sellers-title">
      <SectionHeading
        id="best-sellers-title"
        eyebrow="Most Wanted"
        title="Best Sellers"
        lede="Twenty icons, hand-picked and verified — the pairs our customers return for, before they sell out."
      />
      <ul className="products-grid" role="list">
        {products.map((p, i) => (
          <ProductCard key={p.id} product={p} index={i} />
        ))}
      </ul>
    </section>
  );
}
