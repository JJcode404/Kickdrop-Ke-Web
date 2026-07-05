import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { formatPrice } from "../data/products.js";
import { shopProducts, discountOf } from "../data/shop.js";

const DEAL_ID = "new-balance-2002r";
const ENDS_AT = new Date("2026-12-24T00:00:00");

const pad = (n) => String(n).padStart(2, "0");

function useCountdown(target) {
  const [now, setNow] = useState(() => Date.now());
  useEffect(() => {
    const id = setInterval(() => setNow(Date.now()), 1000);
    return () => clearInterval(id);
  }, []);
  const total = Math.max(0, Math.floor((target.getTime() - now) / 1000));
  return {
    days: Math.floor(total / 86400),
    hours: Math.floor((total % 86400) / 3600),
    minutes: Math.floor((total % 3600) / 60),
    seconds: total % 60,
  };
}

export default function FlashSale() {
  const deal = shopProducts.find((p) => p.id === DEAL_ID);
  const { days, hours, minutes, seconds } = useCountdown(ENDS_AT);

  const units = [
    { value: days, label: days === 1 ? "Day" : "Days" },
    { value: pad(hours), label: hours === 1 ? "Hour" : "Hours" },
    { value: pad(minutes), label: minutes === 1 ? "Minute" : "Minutes" },
    { value: pad(seconds), label: seconds === 1 ? "Second" : "Seconds" },
  ];

  return (
    <section id="flash-sale" className="flash" aria-labelledby="flash-title">
      {/* giant background text drifting left → right */}
      <div className="flash__marquee" aria-hidden="true">
        <span className="flash__marquee-track">
          <span>Flash Sale — Flash Sale — Flash Sale — </span>
          <span>Flash Sale — Flash Sale — Flash Sale — </span>
        </span>
      </div>

      <div className="flash__inner">
        <div className="flash__offer">
          <p className="flash__from">
            Started from <s>{formatPrice(deal.price)}</s>
          </p>
          <p className="flash__discount">
            <span className="flash__circled">
              {discountOf(deal)}%
              <svg viewBox="0 0 120 72" aria-hidden="true">
                <ellipse
                  cx="60"
                  cy="36"
                  rx="55"
                  ry="30"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.5"
                  transform="rotate(-4 60 36)"
                />
              </svg>
            </span>{" "}
            OFF
          </p>
        </div>

        <Link to={`/product/${deal.id}`} className="flash__shoe" tabIndex={-1} aria-hidden="true">
          <img
            src={`/images/products/${deal.id}-a1.webp`}
            alt=""
            width="800"
            height="572"
            loading="lazy"
          />
        </Link>

        <p className="flash__timer" role="timer" aria-label="Flash sale ends in">
          {units.map((u) => (
            <span className="flash__unit" key={u.label}>
              <span className="flash__unit-value">{u.value}</span>
              <span className="flash__unit-label">{u.label}</span>
            </span>
          ))}
        </p>

        <div className="flash__copy">
          <h2 id="flash-title" className="flash__title">
            Classic NB Lifestyle
          </h2>
          <p className="flash__lede">
            The {deal.name} — premium suede and mesh over N-ERGY cushioning, in
            the grey that started it all. Half price at {formatPrice(deal.salePrice)},
            until the timer runs out.
          </p>
          <Link to={`/product/${deal.id}`} className="flash__cta">
            Shop Now <span className="arrow" aria-hidden="true">→</span>
          </Link>
        </div>
      </div>
    </section>
  );
}
