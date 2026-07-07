import InfoLayout from "../../components/InfoLayout.jsx";
import Seo from "../../components/Seo.jsx";
import { breadcrumbLd } from "../../data/seo.js";

const ZONES = [
  ["Nairobi", "Free express delivery, within 24 hours of dispatch."],
  ["Rest of Kenya", "Free delivery, 1–2 business days."],
  ["East Africa", "Ksh 1,500 flat rate, 2–3 business days."],
  ["Worldwide", "Calculated at order, 3–5 business days, fully tracked."],
];

export default function Delivery() {
  return (
    <>
      <Seo
        title='Sneaker Delivery in Kenya — Free Express Shipping'
        description='Free express sneaker delivery across Kenya: Nairobi within 24 hours, nationwide in 1–2 days, worldwide in 3–5 days. Tracked, insured, dispatched same day for WhatsApp orders before 3 PM.'
        path="/delivery"
        jsonLd={[breadcrumbLd([{ name: "Home", path: "/" }, { name: 'Sneaker Delivery in Kenya', path: "/delivery" }])]}
      />
      <InfoLayout
      eyebrow="Shipping"
      title="Delivery Information"
      lede="Free express shipping across Kenya, with worldwide delivery in 3–5 days."
    >
      <section aria-label="Delivery zones and times">
        <h2>Zones &amp; Times</h2>
        <dl className="info__rows">
          {ZONES.map(([zone, detail]) => (
            <div className="info__row" key={zone}>
              <dt>{zone}</dt>
              <dd>{detail}</dd>
            </div>
          ))}
        </dl>
      </section>

      <section aria-label="How dispatch works">
        <h2>How It Works</h2>
        <ul className="info__list">
          <li>
            Orders confirmed on WhatsApp before 3:00 PM (EAT) are dispatched
            the same day, Monday to Saturday.
          </li>
          <li>
            Every shipment is tracked and insured door-to-door; you receive
            the tracking link the moment your pair leaves us.
          </li>
          <li>
            Each pair is verified, boxed, and wrapped before dispatch — what
            arrives is exactly what was photographed.
          </li>
        </ul>
      </section>

      <section aria-label="International orders">
        <h2>International Orders</h2>
        <p>
          Worldwide deliveries are shipped DDU (delivered duties unpaid): any
          import duties or taxes levied by your country are the
          recipient&rsquo;s responsibility. We declare all shipments accurately
          — we can&rsquo;t mark orders as gifts.
        </p>
      </section>

      <p className="info__note">
        Delivery questions? Message us on WhatsApp at + (254) 700 456 789 or
        email hello@kickdrop.ke — a human answers, 24/7.
      </p>
      </InfoLayout>
    </>
  );
}
