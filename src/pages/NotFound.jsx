import { Link } from "react-router-dom";
import Seo from "../components/Seo.jsx";

export default function NotFound() {
  return (
    <section className="section shop arrivals" aria-labelledby="nf-title">
      <Seo
        title="Page Not Found"
        description="That page doesn't exist. Browse KICKDROP's authentic sneaker catalogue instead."
        path="/404"
        noindex
      />
      <header className="arrivals__hero">
        <p className="arrivals__pill">
          <span className="arrival-card__limited-dot" aria-hidden="true" />
          404
        </p>
        <h1 id="nf-title" className="section-heading__title">
          This page walked off.
        </h1>
        <p className="section-heading__lede arrivals__lede">
          The link is broken or the page has moved — but the icons are all
          still here.
        </p>
      </header>
      <div className="hero__actions">
        <Link to="/shop" className="btn btn--primary">Shop All Sneakers</Link>
        <Link to="/new-arrivals" className="btn btn--ghost">New Arrivals</Link>
        <Link to="/sale" className="btn btn--ghost">Sale</Link>
      </div>
    </section>
  );
}
