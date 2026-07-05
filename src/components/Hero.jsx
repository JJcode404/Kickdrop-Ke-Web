import useParallax from "../hooks/useParallax.js";

export default function Hero() {
  const artRef = useParallax(0.08);
  const haloRef = useParallax(-0.05);

  return (
    <section className="hero" aria-labelledby="hero-title">
      <div className="hero__halo" ref={haloRef} aria-hidden="true" />

      <div className="hero__content">
        <p className="hero__eyebrow">Nairobi · Est. 2024</p>
        <h1 id="hero-title" className="hero__title">
          Walk like it&rsquo;s
          <br />
          <em>already yours.</em>
        </h1>
        <p className="hero__lede">
          Icons and future classics, hand-picked and verified. No fakes.
          No compromises.
        </p>
        <div className="hero__actions">
          <a className="btn btn--primary" href="#best-sellers">
            Shop the Drop
          </a>
          <a className="btn btn--ghost" href="#flash-sale">
            Flash Sale
          </a>
        </div>
      </div>

      <div className="hero__art" ref={artRef}>
        <img
          className="product-photo"
          src="/images/products/nike-air-force-1-07.webp"
          alt="Nike Air Force 1 '07 in white, side profile"
          width="800"
          height="572"
          fetchpriority="high"
        />
      </div>

      <p className="hero__scroll-hint" aria-hidden="true">
        Scroll
        <span className="hero__scroll-line" />
      </p>
    </section>
  );
}
