import { useState } from "react";
import useReveal from "../hooks/useReveal.js";

export default function Newsletter() {
  const ref = useReveal();
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState(null); // null | "error" | "success"

  const onSubmit = (e) => {
    e.preventDefault();
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setStatus("error");
      return;
    }
    setStatus("success");
    setEmail("");
  };

  return (
    <section id="newsletter" className="newsletter" aria-labelledby="newsletter-title">
      <div className="newsletter__inner reveal" ref={ref}>
        <p className="section-heading__eyebrow section-heading__eyebrow--gold">
          First Access
        </p>
        <h2 id="newsletter-title" className="newsletter__title">
          Drops sell out in hours.
          <br />
          Members hear first.
        </h2>
        <p className="newsletter__lede">
          Join the list for early access to limited releases, private events,
          and member-only pricing.
        </p>

        <form className="newsletter__form" onSubmit={onSubmit} noValidate>
          <label htmlFor="newsletter-email" className="visually-hidden">
            Email address
          </label>
          <input
            id="newsletter-email"
            type="email"
            name="email"
            autoComplete="email"
            placeholder="your@email.com"
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
              setStatus(null);
            }}
            aria-invalid={status === "error"}
            aria-describedby="newsletter-status"
            required
          />
          <button type="submit" className="btn btn--gold">
            Join the List
          </button>
        </form>

        <p id="newsletter-status" className="newsletter__status" role="status">
          {status === "error" && "Please enter a valid email address."}
          {status === "success" && "Welcome to the list — watch your inbox."}
        </p>
      </div>
    </section>
  );
}
