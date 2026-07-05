import useReveal from "../hooks/useReveal.js";
import SectionHeading from "./SectionHeading.jsx";
import { reviews } from "../data/products.js";

function Stars({ rating }) {
  return (
    <p className="review__stars">
      <span className="visually-hidden">{`Rated ${rating} out of 5 stars`}</span>
      <span aria-hidden="true">{"★".repeat(rating)}</span>
    </p>
  );
}

function ReviewCard({ review, index }) {
  const ref = useReveal();
  return (
    <li
      className="review reveal"
      ref={ref}
      style={{ "--reveal-delay": `${index * 100}ms` }}
    >
      <Stars rating={review.rating} />
      <blockquote className="review__quote">
        <p>&ldquo;{review.quote}&rdquo;</p>
      </blockquote>
      <p className="review__name">{review.name}</p>
      <p className="review__title">{review.title}</p>
    </li>
  );
}

export default function Reviews() {
  return (
    <section id="reviews" className="section section--dark" aria-labelledby="reviews-title">
      <SectionHeading
        id="reviews-title"
        eyebrow="In Their Words"
        title="Worn by the Discerning"
      />
      <ul className="reviews-grid" role="list">
        {reviews.map((r, i) => (
          <ReviewCard key={r.id} review={r} index={i} />
        ))}
      </ul>
    </section>
  );
}
