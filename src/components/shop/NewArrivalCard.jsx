import { Link } from "react-router-dom";
import { formatPrice } from "../../data/products.js";
import { effectivePrice, isJustDropped } from "../../data/shop.js";
import { useStore } from "../../store/StoreContext.jsx";

export default function NewArrivalCard({ product: p, index }) {
  const { isWished, toggleWish } = useStore();
  const wished = isWished(p.id);

  return (
    <li className="shop-card arrival-card" style={{ "--i": Math.min(index, 7) }}>
      <div className={`media-zoom shop-card__media ${p.soldOut ? "is-soldout" : ""}`}>
        <span className="arrival-card__badges">
          <span className="product-card__badge">New</span>
          {isJustDropped(p) && (
            <span className="product-card__badge arrival-card__dropped">
              Just Dropped
            </span>
          )}
        </span>

        <button
          type="button"
          className="shop-card__wish"
          aria-pressed={wished}
          aria-label={wished ? `Remove ${p.name} from wishlist` : `Add ${p.name} to wishlist`}
          onClick={() => toggleWish(p.id)}
        >
          <svg viewBox="0 0 24 24" fill={wished ? "currentColor" : "none"} stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round" aria-hidden="true">
            <path d="M12 20.5C7.5 16.5 3.5 13.2 3.5 9.1 3.5 6.4 5.6 4.5 8 4.5c1.6 0 3 .8 4 2.1 1-1.3 2.4-2.1 4-2.1 2.4 0 4.5 1.9 4.5 4.6 0 4.1-4 7.4-8.5 11.4z" />
          </svg>
        </button>

        <Link
          to={`/product/${p.id}`}
          className="shop-card__img-link"
          tabIndex={-1}
          aria-hidden="true"
        >
          <img
            className="product-photo"
            src={p.image}
            alt={p.alt}
            loading="lazy"
            width="800"
            height="572"
          />
        </Link>

        {p.soldOut ? (
          <span className="shop-card__soldout">Sold Out</span>
        ) : (
          p.lowStock && (
            <span className="arrival-card__limited">
              <span className="arrival-card__limited-dot" aria-hidden="true" />
              Limited stock
            </span>
          )
        )}
      </div>

      <div className="shop-card__body">
        <p className="product-card__category">{p.brand}</p>
        <h3 className="shop-card__name">
          <Link to={`/product/${p.id}`} className="shop-card__name-link">
            {p.name}
          </Link>
        </h3>
        <p className="shop-card__price">
          <span className="shop-card__price-now">{formatPrice(effectivePrice(p))}</span>
          {p.salePrice && <s className="shop-card__price-was">{formatPrice(p.price)}</s>}
        </p>
      </div>
    </li>
  );
}
