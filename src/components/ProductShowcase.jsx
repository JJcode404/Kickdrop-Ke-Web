import { Link } from "react-router-dom";
import useReveal from "../hooks/useReveal.js";
import useParallax from "../hooks/useParallax.js";
import { showcase, formatPrice } from "../data/products.js";

export default function ProductShowcase() {
  const copyRef = useReveal();
  const artRef = useParallax(0.06);

  return (
    <section id="showcase" className="showcase" aria-labelledby="showcase-title">
      <div className="showcase__art" ref={artRef}>
        <div className="media-zoom showcase__media">
          <img
            className="product-photo"
            src={showcase.image}
            alt={showcase.alt}
            loading="lazy"
            width="800"
            height="572"
          />
        </div>
      </div>

      <div className="showcase__copy reveal" ref={copyRef}>
        <p className="section-heading__eyebrow section-heading__eyebrow--gold">
          {showcase.edition}
        </p>
        <h2 id="showcase-title" className="showcase__title">
          {showcase.name}
        </h2>
        <p className="showcase__description">{showcase.description}</p>
        <ul className="showcase__details" role="list">
          {showcase.details.map((d) => (
            <li key={d}>{d}</li>
          ))}
        </ul>
        <div className="showcase__actions">
          <span className="showcase__price">{formatPrice(showcase.price)}</span>
          <Link to={`/product/${showcase.id}`} className="btn btn--gold">
            Reserve Your Pair
          </Link>
        </div>
      </div>
    </section>
  );
}
