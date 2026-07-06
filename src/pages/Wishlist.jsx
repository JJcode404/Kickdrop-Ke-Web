import { useState } from "react";
import { Link } from "react-router-dom";
import ShopProductCard from "../components/shop/ShopProductCard.jsx";
import { useStore } from "../store/StoreContext.jsx";
import { shopProducts } from "../data/shop.js";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function NeverMissAThing() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState(null); // null | "error" | "success"

  const onSubmit = (e) => {
    e.preventDefault();
    if (!EMAIL_RE.test(email)) {
      setStatus("error");
      return;
    }
    setStatus("success");
    setEmail("");
  };

  return (
    <section className="wl-news" aria-labelledby="wl-news-title">
      <h2 id="wl-news-title" className="wl-news__title">
        Never miss a thing
      </h2>
      <p className="wl-news__lede">
        Sign up for promotions, tailored new arrivals, stock updates and more
        &mdash; straight to your inbox
      </p>

      <p className="wl-news__by" id="wl-news-by">
        Get updates by
      </p>
      <div className="wl-news__channels" role="group" aria-labelledby="wl-news-by">
        <span className="wl-news__channel" aria-current="true">Email</span>
      </div>

      <form className="wl-news__form" onSubmit={onSubmit} noValidate>
        <label htmlFor="wl-news-email" className="visually-hidden">
          Your email address
        </label>
        <input
          id="wl-news-email"
          type="email"
          autoComplete="email"
          placeholder="Your email address"
          value={email}
          onChange={(e) => {
            setEmail(e.target.value);
            setStatus(null);
          }}
          aria-invalid={status === "error"}
          aria-describedby="wl-news-status"
        />
        <button type="submit" className="btn btn--primary">
          Sign Up
        </button>
      </form>

      <p id="wl-news-status" className="wl-news__status" role="status">
        {status === "error" && "Please enter a valid email address."}
        {status === "success" && "You're on the list — watch your inbox."}
      </p>

      <p className="wl-news__legal">
        By signing up, you consent to receiving marketing by email and/or SMS
        and acknowledge you have read our{" "}
        <Link to="/privacy">Privacy Policy</Link>. Unsubscribe anytime at the
        bottom of our emails or by replying STOP to any of our SMS.
      </p>
    </section>
  );
}

export default function Wishlist() {
  const { wishlist, user, setAuthOpen } = useStore();
  const items = shopProducts.filter((p) => wishlist.includes(p.id));

  return (
    <section className="section shop arrivals" aria-labelledby="wishlist-title">
      <header className="arrivals__hero wl__hero">
        <p className="arrivals__pill">
          <span className="arrival-card__limited-dot" aria-hidden="true" />
          Saved for Later
        </p>
        <h1 id="wishlist-title" className="section-heading__title">
          Wishlist
        </h1>
        <p className="wl__count" role="status">
          {items.length} {items.length === 1 ? "item" : "items"}
        </p>
      </header>

      {!user && items.length > 0 && (
        <div className="wl-signin">
          <p className="wl-signin__text">
            Sign in or create an account to save the items below &mdash;
            don&rsquo;t let your favourites get away
          </p>
          <button
            type="button"
            className="btn btn--primary"
            onClick={() => setAuthOpen(true)}
          >
            Sign In
          </button>
        </div>
      )}

      {items.length > 0 ? (
        <ul className="shop-grid" role="list">
          {items.map((p, i) => (
            <ShopProductCard key={p.id} product={p} index={i} />
          ))}
        </ul>
      ) : (
        <div className="shop__empty">
          <p className="shop__empty-title">Nothing saved yet.</p>
          <p className="shop__empty-body">
            Tap the heart on any pair and it will be waiting for you here.
          </p>
          <Link to="/shop" className="btn btn--ghost btn--small">
            Browse the catalogue
          </Link>
        </div>
      )}

      {!user && <NeverMissAThing />}
    </section>
  );
}
