import { useState } from "react";
import { Link } from "react-router-dom";
import { formatPrice } from "../../data/products.js";
import {
  effectivePrice,
  soldOf,
  formatSold,
  isHotItem,
  isTrendingUp,
} from "../../data/shop.js";

function Rating({ rating, reviews }) {
  return (
    <p className="rating bs-card__rating">
      <span className="visually-hidden">
        {`Rated ${rating} out of 5 stars from ${reviews} reviews`}
      </span>
      <span className="rating__stars" aria-hidden="true">
        <span className="rating__fill" style={{ width: `${(rating / 5) * 100}%` }}>
          ★★★★★
        </span>
        <span className="rating__base">★★★★★</span>
      </span>
      <span className="rating__meta" aria-hidden="true">{rating}</span>
    </p>
  );
}

export default function BestSellerCard({ product: p, index }) {
  const [wished, setWished] = useState(false);

  return (
    <li className="shop-card bs-card" style={{ "--i": Math.min(index, 7) }}>
      <div className={`media-zoom shop-card__media ${p.soldOut ? "is-soldout" : ""}`}>
        <span className="arrival-card__badges">
          <span className="product-card__badge">Best Seller</span>
          {isHotItem(p) && (
            <span className="product-card__badge bs-card__hot">Hot Item</span>
          )}
        </span>

        <button
          type="button"
          className="shop-card__wish"
          aria-pressed={wished}
          aria-label={wished ? `Remove ${p.name} from wishlist` : `Add ${p.name} to wishlist`}
          onClick={() => setWished((v) => !v)}
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

        {p.soldOut && <span className="shop-card__soldout">Sold Out</span>}
      </div>

      <div className="shop-card__body">
        <p className="product-card__category">{p.brand}</p>
        <h3 className="shop-card__name">
          <Link to={`/product/${p.id}`} className="shop-card__name-link">
            {p.name}
          </Link>
        </h3>

        <div className="bs-card__proof">
          <Rating rating={p.rating} reviews={p.reviews} />
          <span className="bs-card__sold">{formatSold(soldOf(p))}</span>
          {isTrendingUp(p) && (
            <span className="bs-card__trend">
              <span aria-hidden="true">↑</span> Trending
            </span>
          )}
        </div>

        <p className="shop-card__price">
          <span className="shop-card__price-now">{formatPrice(effectivePrice(p))}</span>
          {p.salePrice && <s className="shop-card__price-was">{formatPrice(p.price)}</s>}
        </p>
      </div>
    </li>
  );
}
