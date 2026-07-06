import InfoLayout from "../../components/InfoLayout.jsx";

export default function Privacy() {
  return (
    <InfoLayout
      eyebrow="Your Data"
      title="Privacy Policy"
      lede="We collect the minimum, protect it properly, and never sell it. Here's the plain-language version."
    >
      <p className="info__updated">Last updated: July 2026</p>

      <section aria-label="What we collect">
        <h2>What We Collect</h2>
        <ul className="info__list">
          <li>
            <strong>Order details.</strong> Your name, phone number, delivery
            address, and the pairs you order — shared with us when you order
            via WhatsApp.
          </li>
          <li>
            <strong>Newsletter email.</strong> Only if you join the list, only
            for drops and member offers.
          </li>
          <li>
            <strong>Basic analytics.</strong> Anonymous page-view data that
            helps us understand what the culture is into.
          </li>
        </ul>
      </section>

      <section aria-label="How we use it">
        <h2>How We Use It</h2>
        <p>
          To fulfil and deliver your orders, verify authenticity claims,
          process returns and refunds, and — if you opted in — tell you about
          new drops first. That&rsquo;s it.
        </p>
      </section>

      <section aria-label="WhatsApp ordering">
        <h2>WhatsApp Ordering</h2>
        <p>
          Orders are placed through WhatsApp, which is operated by Meta and
          governed by its own privacy policy. Your conversation with us stays
          between you and KICKDROP; we never share it with third parties for
          marketing.
        </p>
      </section>

      <section id="cookies" aria-label="Cookies">
        <h2>Cookies</h2>
        <p>
          We use only what the site needs to function and anonymous analytics
          cookies. No advertising trackers, no cross-site profiling.
        </p>
      </section>

      <section aria-label="Your rights">
        <h2>Your Rights</h2>
        <p>
          Under Kenya&rsquo;s Data Protection Act (2019), you can request a
          copy of the data we hold about you, ask us to correct it, or ask us
          to delete it entirely. Email{" "}
          <a href="mailto:hello@kickdrop.ke">hello@kickdrop.ke</a> and
          we&rsquo;ll action it within 7 days.
        </p>
      </section>

      <section aria-label="Security">
        <h2>Security</h2>
        <p>
          Payment happens through M-Pesa and card providers — we never see or
          store your card number or PIN. Order records are encrypted at rest
          and access is limited to staff who fulfil orders.
        </p>
      </section>
    </InfoLayout>
  );
}
