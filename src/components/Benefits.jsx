import useReveal from "../hooks/useReveal.js";
import SectionHeading from "./SectionHeading.jsx";
import { benefits } from "../data/products.js";

const ICONS = {
  shipping: (
    <path d="M3 16V7a1 1 0 0 1 1-1h9v10M13 9h4l3 3v4h-2M3 16h2m4 0h6" />
  ),
  returns: (
    <path d="M4 9l4-4M4 9l4 4M4 9h11a5 5 0 0 1 0 10H9" />
  ),
  craft: (
    <path d="M12 3l2.5 5 5.5.8-4 3.9.9 5.5-4.9-2.6-4.9 2.6.9-5.5-4-3.9L9.5 8z" />
  ),
  authenticity: (
    <path d="M12 3l7 3v5c0 4.5-3 8.5-7 10-4-1.5-7-5.5-7-10V6zM9 12l2 2 4-4" />
  ),
};

function BenefitCard({ benefit, index }) {
  const ref = useReveal();
  return (
    <li
      className="benefit reveal"
      ref={ref}
      style={{ "--reveal-delay": `${index * 80}ms` }}
    >
      <svg
        className="benefit__icon"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden="true"
      >
        {ICONS[benefit.id]}
      </svg>
      <h3 className="benefit__title">{benefit.title}</h3>
      <p className="benefit__body">{benefit.body}</p>
    </li>
  );
}

export default function Benefits() {
  return (
    <section className="section section--tight" aria-labelledby="benefits-title">
      <SectionHeading id="benefits-title" eyebrow="The Standard" title="Why KICKDROP" />
      <ul className="benefits-grid" role="list">
        {benefits.map((b, i) => (
          <BenefitCard key={b.id} benefit={b} index={i} />
        ))}
      </ul>
    </section>
  );
}
