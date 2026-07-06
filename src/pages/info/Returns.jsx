import { Link } from "react-router-dom";
import InfoLayout from "../../components/InfoLayout.jsx";

export default function Returns() {
  return (
    <InfoLayout
      eyebrow="Peace of Mind"
      title="Return Policy"
      lede="Change your mind, not your standards. 30-day returns, no questions asked."
    >
      <section aria-label="The 30 day promise">
        <h2>The 30-Day Promise</h2>
        <p>
          You have 30 days from the day your pair arrives to return it for a
          full refund or an exchange. We don&rsquo;t ask why. We arrange the
          courier pickup — you never leave home.
        </p>
      </section>

      <section aria-label="Return conditions">
        <h2>Conditions</h2>
        <ul className="info__list">
          <li>
            <strong>Unworn.</strong> Try them on indoors, on a clean surface —
            soles must be unmarked.
          </li>
          <li>
            <strong>Complete.</strong> Original box, wrapping, and your
            numbered KICKDROP certificate included.
          </li>
          <li>
            <strong>On time.</strong> Pickup requested within 30 days of
            delivery.
          </li>
        </ul>
      </section>

      <section aria-label="How to return">
        <h2>How to Start a Return</h2>
        <ul className="info__list">
          <li>
            Message us on WhatsApp at + (254) 700 456 789 or email{" "}
            <a href="mailto:hello@kickdrop.ke">hello@kickdrop.ke</a> with your
            order details.
          </li>
          <li>We confirm and schedule a courier pickup at your address.</li>
          <li>
            Once the pair passes inspection, your refund is issued — M-Pesa
            refunds land within 24 hours, card refunds within 3–5 business
            days.
          </li>
        </ul>
      </section>

      <section aria-label="Exchanges and exclusions">
        <h2>Exchanges &amp; Exclusions</h2>
        <p>
          Need a different size? Tell us at pickup and we&rsquo;ll dispatch the
          new size the same day it&rsquo;s confirmed, subject to stock. Sale
          items are returnable like everything else; pairs marked{" "}
          <em>1 of a limited run</em> can be refunded but not exchanged once
          the run sells out.
        </p>
        <p>
          Full delivery details are on the{" "}
          <Link to="/delivery">Delivery Information</Link> page.
        </p>
      </section>
    </InfoLayout>
  );
}
