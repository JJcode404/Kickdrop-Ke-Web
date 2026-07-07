import { Link } from "react-router-dom";
import InfoLayout from "../../components/InfoLayout.jsx";
import Seo from "../../components/Seo.jsx";
import { faqLd, breadcrumbLd } from "../../data/seo.js";

/* Plain-text answers double as FAQPage structured data — keep them in sync. */
const FAQS = [
  {
    q: "Where can I buy authentic sneakers in Nairobi?",
    a: "KICKDROP KE is a premium sneaker store at 123 Kimathi Street, Nairobi, stocking verified-authentic Nike, Jordan, Adidas, New Balance, ASICS, PUMA, Converse, Vans and On sneakers. You can shop online at kickdrop.ke and order via WhatsApp, or visit the store Monday to Saturday.",
  },
  {
    q: "How do I know KICKDROP sneakers are authentic?",
    a: "Every pair is inspected and verified by our team before dispatch and ships with a numbered KICKDROP certificate of authenticity. If a pair we sold you is ever shown to be inauthentic, we refund double its price.",
  },
  {
    q: "How do I order sneakers on WhatsApp?",
    a: "Pick your pair and size on kickdrop.ke, then tap “Order on WhatsApp”. A pre-filled message with the shoe, size, color and price opens in WhatsApp — send it and we confirm availability and payment. Orders confirmed before 3:00 PM ship the same day.",
  },
  {
    q: "Do you deliver sneakers outside Nairobi?",
    a: "Yes. Delivery is free across Kenya — Nairobi orders arrive within 24 hours and the rest of Kenya in 1–2 business days. We also ship to East Africa in 2–3 days and worldwide in 3–5 days, fully tracked and insured.",
  },
  {
    q: "What payment methods do you accept?",
    a: "We accept M-Pesa and all major credit and debit cards. All prices are in Kenyan Shillings (KES) and include VAT.",
  },
  {
    q: "Can I return sneakers if they don't fit?",
    a: "Yes — you have 30 days from delivery to return unworn pairs with the original box and certificate. We arrange free courier pickup anywhere in Kenya, and M-Pesa refunds land within 24 hours. Exchanges for a different size ship the same day they're confirmed.",
  },
  {
    q: "Do you stock Nike Air Force 1 and Jordans in Kenya?",
    a: "Yes. We stock the Nike Air Force 1 '07 in white and black, the Jordan 1 Retro High OG, the Air Jordan 4 White Oreo and limited pairs like the Travis Scott Jordan 1 Low — all verified authentic with prices in KES.",
  },
  {
    q: "Which New Balance models are available in Kenya?",
    a: "Our New Balance range includes the 530, 550, 1000, 2002R and 9060 in several colorways. New Balance pairs start from Ksh 15,500 with free delivery across Kenya.",
  },
  {
    q: "What sizes do you carry?",
    a: "Most sneakers are available in EU sizes 36–46 (men's and women's). Each product page lists the exact sizes in stock, and our team can advise on fit over WhatsApp before you order.",
  },
  {
    q: "Does KICKDROP have sneakers on sale?",
    a: "Yes — the Sale page lists limited-time offers of up to 50% off verified-authentic pairs, including Nike Air Max, Adidas Campus and New Balance models. Sale pairs carry the same authenticity guarantee and 30-day returns.",
  },
];

export default function Faq() {
  return (
    <>
      <Seo
        title="FAQs — Buying Authentic Sneakers in Kenya"
        description="Answers about buying sneakers in Nairobi, Kenya: authenticity verification, WhatsApp ordering, M-Pesa payment, free delivery times, returns, sizing, and which Nike, Jordan & New Balance models we stock."
        path="/faq"
        jsonLd={[
          faqLd(FAQS),
          breadcrumbLd([
            { name: "Home", path: "/" },
            { name: "FAQs", path: "/faq" },
          ]),
        ]}
      />
      <InfoLayout
        eyebrow="Good to Know"
        title="Frequently Asked Questions"
        lede="Everything about buying authentic sneakers from KICKDROP — ordering, delivery, payment, and returns."
      >
        {FAQS.map((f) => (
          <section key={f.q} aria-label={f.q}>
            <h2>{f.q}</h2>
            <p>{f.a}</p>
          </section>
        ))}

        <p className="info__note">
          Something else on your mind? Message us on WhatsApp at + (254) 700
          456 789, email hello@kickdrop.ke, or see{" "}
          <Link to="/delivery">Delivery Information</Link> and the{" "}
          <Link to="/returns">Return Policy</Link>.
        </p>
      </InfoLayout>
    </>
  );
}
