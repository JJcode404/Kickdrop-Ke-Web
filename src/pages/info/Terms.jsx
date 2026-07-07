import { Link } from "react-router-dom";
import InfoLayout from "../../components/InfoLayout.jsx";
import Seo from "../../components/Seo.jsx";
import { breadcrumbLd } from "../../data/seo.js";

export default function Terms() {
  return (
    <>
      <Seo
        title='Terms & Conditions'
        description="KICKDROP KE's terms of sale: WhatsApp ordering, M-Pesa and card payment, KES pricing, double-refund authenticity guarantee, and Kenyan governing law."
        path="/terms"
        jsonLd={[breadcrumbLd([{ name: "Home", path: "/" }, { name: 'Terms & Conditions', path: "/terms" }])]}
      />
      <InfoLayout
      eyebrow="The Fine Print"
      title="Terms & Conditions"
      lede="The agreement between you and KICKDROP KE when you use this site or place an order."
    >
      <p className="info__updated">Last updated: July 2026</p>

      <section aria-label="Orders and payment">
        <h2>Orders &amp; Payment</h2>
        <p>
          Orders are placed via WhatsApp and confirmed when payment clears. We
          accept M-Pesa and all major cards. All prices are in Kenyan
          Shillings (KES) and include VAT; delivery charges, where they apply,
          are shown before you pay.
        </p>
        <p>
          A confirmed order is an offer we accept on dispatch. If a pair sells
          out between your message and payment — limited drops move fast — we
          refund immediately and in full.
        </p>
      </section>

      <section aria-label="Authenticity guarantee">
        <h2>Authenticity Guarantee</h2>
        <p>
          Every pair is verified before dispatch and ships with a numbered
          KICKDROP certificate. If a pair we sold you is ever shown to be
          inauthentic, we refund double its price. That&rsquo;s how sure we
          are.
        </p>
      </section>

      <section aria-label="Pricing and availability">
        <h2>Pricing &amp; Availability</h2>
        <p>
          Sale prices and flash offers run for the stated period or while
          stock lasts, whichever ends first. Obvious pricing errors (a missing
          zero, a misplaced comma) don&rsquo;t bind us — we&rsquo;ll contact
          you before charging anything.
        </p>
      </section>

      <section aria-label="Returns">
        <h2>Returns</h2>
        <p>
          Returns and refunds are governed by our{" "}
          <Link to="/returns">Return Policy</Link> — 30 days, unworn, with box
          and certificate.
        </p>
      </section>

      <section aria-label="Intellectual property">
        <h2>Intellectual Property</h2>
        <p>
          The KICKDROP name, wordmark, and site content belong to KICKDROP KE.
          Brand names and logos belong to their respective owners and appear
          here to identify genuine products we stock.
        </p>
      </section>

      <section aria-label="Liability and law">
        <h2>Liability &amp; Governing Law</h2>
        <p>
          We&rsquo;re liable for the pairs we sell and the promises on this
          site — not for losses we couldn&rsquo;t reasonably foresee. These
          terms are governed by the laws of Kenya, and disputes fall to the
          courts of Nairobi.
        </p>
      </section>

      <section aria-label="Contact">
        <h2>Questions</h2>
        <p>
          <a href="mailto:hello@kickdrop.ke">hello@kickdrop.ke</a> · + (254)
          700 456 789 · 123 Kimathi Street, Nairobi, Kenya.
        </p>
      </section>
      </InfoLayout>
    </>
  );
}
