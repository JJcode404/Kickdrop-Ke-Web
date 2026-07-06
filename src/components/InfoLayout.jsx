/**
 * Shared shell for informational pages (About, Delivery, Privacy, …).
 * Children are rendered as prose inside the design system.
 */
export default function InfoLayout({ eyebrow, title, lede, children }) {
  return (
    <section className="section info" aria-labelledby="info-title">
      <header className="info__header">
        {eyebrow && <p className="section-heading__eyebrow">{eyebrow}</p>}
        <h1 id="info-title" className="section-heading__title">
          {title}
        </h1>
        {lede && <p className="section-heading__lede">{lede}</p>}
      </header>
      <div className="info__body">{children}</div>
    </section>
  );
}
