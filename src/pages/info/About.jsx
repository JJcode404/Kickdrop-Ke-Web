import { Link } from "react-router-dom";
import InfoLayout from "../../components/InfoLayout.jsx";
import Seo from "../../components/Seo.jsx";
import { breadcrumbLd } from "../../data/seo.js";
import { shopProducts } from "../../data/shop.js";
import { brandsData } from "../../data/brands.js";

export default function About() {
  return (
    <>
      <Seo
        title="About KICKDROP — Nairobi's Premium Sneaker Store"
        description='KICKDROP is a premium sneaker store founded in Nairobi, Kenya in 2024. We hand-pick and verify authentic Nike, Jordan, Adidas & New Balance sneakers and deliver across Kenya and worldwide.'
        path="/about"
        jsonLd={[breadcrumbLd([{ name: "Home", path: "/" }, { name: 'About KICKDROP', path: "/about" }])]}
      />
      <InfoLayout
      eyebrow="Our Story"
      title="About Us"
      lede="Luxury footwear, crafted without compromise — born in Nairobi, worn everywhere."
    >
      <section aria-label="The story">
        <h2>Born in Nairobi, 2024</h2>
        <p>
          KICKDROP started with a simple frustration: finding authentic,
          well-curated sneakers in Kenya meant either overpaying a reseller or
          gambling on a fake. We decided the culture deserved better — a store
          that treats sneakers the way a gallery treats art.
        </p>
        <p>
          Today we hand-pick icons and future classics from the world&rsquo;s
          leading brands, verify every pair before it ships, and deliver across
          Kenya and the world. No fakes. No restocks on limited drops. No
          compromises.
        </p>
      </section>

      <ul className="info__stats" role="list" aria-label="KICKDROP at a glance">
        <li>
          <span className="info__stat-value">{shopProducts.length}</span>
          <span className="info__stat-label">Curated styles</span>
        </li>
        <li>
          <span className="info__stat-value">{brandsData.length}</span>
          <span className="info__stat-label">Iconic brands</span>
        </li>
        <li>
          <span className="info__stat-value">24h</span>
          <span className="info__stat-label">Nairobi delivery</span>
        </li>
        <li>
          <span className="info__stat-value">100%</span>
          <span className="info__stat-label">Verified authentic</span>
        </li>
      </ul>

      <section aria-label="What we stand for">
        <h2>What We Stand For</h2>
        <ul className="info__list">
          <li>
            <strong>Curation over catalogue.</strong> We stock fewer pairs,
            chosen harder. If it&rsquo;s here, it earned its place.
          </li>
          <li>
            <strong>Authenticity, guaranteed.</strong> Every pair is inspected
            and verified before dispatch and ships with a numbered KICKDROP
            certificate.
          </li>
          <li>
            <strong>Service like a boutique.</strong> Order over WhatsApp, get
            honest sizing advice, and reach a human 24/7.
          </li>
        </ul>
      </section>

      <section aria-label="Visit or contact us">
        <h2>Find Us</h2>
        <p>
          123 Kimathi Street, Nairobi, Kenya ·{" "}
          <a href="mailto:hello@kickdrop.ke">hello@kickdrop.ke</a> ·{" "}
          <a href="tel:+254700456789">+ (254) 700 456 789</a>
        </p>
        <p>
          Or start with the good part — <Link to="/shop">browse the catalogue</Link>.
        </p>
      </section>
      </InfoLayout>
    </>
  );
}
