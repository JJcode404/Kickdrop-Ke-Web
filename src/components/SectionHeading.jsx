import useReveal from "../hooks/useReveal.js";

export default function SectionHeading({ id, eyebrow, title, lede }) {
  const ref = useReveal();
  return (
    <div className="section-heading reveal" ref={ref}>
      {eyebrow && <p className="section-heading__eyebrow">{eyebrow}</p>}
      <h2 id={id} className="section-heading__title">
        {title}
      </h2>
      {lede && <p className="section-heading__lede">{lede}</p>}
    </div>
  );
}
