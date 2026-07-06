import { Link } from "react-router-dom";
import { useStore } from "../store/StoreContext.jsx";

const BENEFITS = [
  {
    id: "delivery",
    title: "Free Delivery",
    body: "Free shipping on all orders",
    icon: <path d="M3 16V7a1 1 0 0 1 1-1h9v10M13 9h4l3 3v4h-2M3 16h2m4 0h6M7 18.5a1.5 1.5 0 1 0 0-.01M17 18.5a1.5 1.5 0 1 0 0-.01" />,
  },
  {
    id: "support",
    title: "Online Support 24/7",
    body: "Support online 24 hours a day",
    icon: <path d="M4 13a8 8 0 0 1 16 0M4 13v4a2 2 0 0 0 2 2h2v-6H6a2 2 0 0 0-2 2zm16 0v4a2 2 0 0 1-2 2h-2v-6h2a2 2 0 0 1 2 2z" />,
  },
  {
    id: "returns",
    title: "Money Return",
    body: "Back guarantee under 30 days",
    icon: <path d="M4 9l4-4M4 9l4 4M4 9h11a5 5 0 0 1 0 10H9" />,
  },
  {
    id: "discount",
    title: "Member Discount",
    body: "On every order over Ksh 15,000",
    icon: <path d="M9 15L15 9M9.5 9.5h.01M14.5 14.5h.01M12 3l2.1 2.1 3-.4.6 2.9 2.7 1.4-1.3 2.7 1.3 2.7-2.7 1.4-.6 2.9-3-.4L12 20.4l-2.1-2.1-3 .4-.6-2.9-2.7-1.4L4.9 12 3.6 9.3l2.7-1.4.6-2.9 3 .4z" />,
  },
  {
    id: "payment",
    title: "Secure Payment",
    body: "All cards & M-Pesa accepted",
    icon: <path d="M3 8a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2zm0 2h18M6 15h4" />,
  },
];

const INFORMATION = [
  { label: "About Us", to: "/about" },
  { label: "Delivery Information", to: "/delivery" },
  { label: "Privacy Policy", to: "/privacy" },
  { label: "Terms & Conditions", to: "/terms" },
];

const CUSTOMER_SERVICE = [
  { label: "Return Policy", to: "/returns" },
  { label: "My Account", action: "auth" },
  { label: "Wishlist", to: "/wishlist" },
  { label: "Order History", to: "/shop" },
  { label: "International Orders", to: "/delivery" },
  { label: "Contact", href: "mailto:hello@kickdrop.ke" },
];

export default function Footer() {
  const { setAuthOpen } = useStore();
  return (
    <footer className="footer">
      <ul className="footer__benefits" role="list">
        {BENEFITS.map((b) => (
          <li className="footer-benefit" key={b.id}>
            <svg
              className="footer-benefit__icon"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
            >
              {b.icon}
            </svg>
            <div>
              <h3 className="footer-benefit__title">{b.title}</h3>
              <p className="footer-benefit__body">{b.body}</p>
            </div>
          </li>
        ))}
      </ul>

      <div className="footer__inner">
        <div className="footer__brand">
          <p className="footer__logo">
            KICKDROP KE<span className="navbar__brand-dot">.</span>
          </p>
          <a className="footer__phone" href="tel:+254700456789">
            + (254) 700 456 789
          </a>
          <p className="footer__tagline">
            Luxury footwear, crafted without compromise. Icons and future
            classics, hand-picked, verified authentic, and delivered across
            Kenya and the world.
          </p>
          <a
            className="footer__map-link"
            href="https://maps.google.com/?q=Kimathi+Street+Nairobi"
            target="_blank"
            rel="noreferrer"
          >
            View on map <span className="arrow" aria-hidden="true">→</span>
          </a>
        </div>

        <nav className="footer__nav" aria-label="Footer">
          <div className="footer__col">
            <h3 className="footer__heading">Information</h3>
            <ul role="list">
              {INFORMATION.map((link) => (
                <li key={link.label}>
                  <Link to={link.to}>{link.label}</Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="footer__col">
            <h3 className="footer__heading">Customer Service</h3>
            <ul role="list">
              {CUSTOMER_SERVICE.map((link) => (
                <li key={link.label}>
                  {link.action === "auth" ? (
                    <button
                      type="button"
                      className="footer__link-btn"
                      onClick={() => setAuthOpen(true)}
                    >
                      {link.label}
                    </button>
                  ) : link.href ? (
                    <a href={link.href}>{link.label}</a>
                  ) : (
                    <Link to={link.to}>{link.label}</Link>
                  )}
                </li>
              ))}
            </ul>
          </div>

          <div className="footer__col footer__col--contact">
            <h3 className="footer__heading">Get In Touch</h3>
            <address className="footer__address">
              <p>
                <strong>Address:</strong> 123 Kimathi Street, Nairobi, Kenya.
              </p>
              <p>
                <strong>Telephone:</strong>{" "}
                <a href="tel:+254700456789">+ (254) 700 456 789</a>
              </p>
              <p>
                <strong>Email:</strong>{" "}
                <a href="mailto:hello@kickdrop.ke">hello@kickdrop.ke</a>
              </p>
            </address>

            <h3 className="footer__heading footer__heading--hours">
              Opening Time
            </h3>
            <p className="footer__hours">
              Mon – Fri: 8:00 AM – 6:00 PM
              <br />
              Saturday: 10:00 AM – 4:00 PM
              <br />
              Sunday: Closed
            </p>
          </div>
        </nav>
      </div>

      <div className="footer__bottom">
        <p>© {new Date().getFullYear()} KICKDROP KE. All rights reserved.</p>
        <ul className="footer__legal" role="list">
          <li><Link to="/privacy">Privacy</Link></li>
          <li><Link to="/terms">Terms</Link></li>
          <li><Link to="/privacy#cookies">Cookies</Link></li>
        </ul>
      </div>
    </footer>
  );
}
