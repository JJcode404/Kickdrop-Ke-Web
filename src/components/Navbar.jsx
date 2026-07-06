import { useEffect, useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { useStore } from "../store/StoreContext.jsx";

const LINKS = [
  { href: "/", label: "Home", end: true },
  { href: "/shop", label: "Shop" },
  { href: "/new-arrivals", label: "New Arrivals" },
  { href: "/best-sellers", label: "Best Sellers" },
  { href: "/brands", label: "Brands" },
  { href: "/sale", label: "Sale" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const { cartCount, wishlist, setCartOpen, setAuthOpen, user } = useStore();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (!open) return;
    const onKey = (e) => e.key === "Escape" && setOpen(false);
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [open]);

  return (
    <header className={`navbar ${scrolled ? "navbar--scrolled" : ""}`}>
      <nav className="navbar__inner" aria-label="Primary">
        <Link to="/" className="navbar__brand">
          KICKDROP KE<span className="navbar__brand-dot">.</span>
        </Link>

        <button
          className="navbar__toggle"
          aria-expanded={open}
          aria-controls="primary-menu"
          onClick={() => setOpen((v) => !v)}
        >
          <span className="visually-hidden">
            {open ? "Close menu" : "Open menu"}
          </span>
          <span className="navbar__toggle-bar" aria-hidden="true" />
          <span className="navbar__toggle-bar" aria-hidden="true" />
        </button>

        <ul
          id="primary-menu"
          className={`navbar__links ${open ? "is-open" : ""}`}
        >
          {LINKS.map((link) => (
            <li key={link.href}>
              <NavLink
                to={link.href}
                end={link.end}
                onClick={() => setOpen(false)}
              >
                {link.label}
              </NavLink>
            </li>
          ))}
          <li>
            <a
              href="/#newsletter"
              className="btn btn--small"
              onClick={() => setOpen(false)}
            >
              Join the List
            </a>
          </li>
        </ul>

        <div className="navbar__actions">
          <button
            type="button"
            className="navbar__icon-btn"
            onClick={() => setAuthOpen(true)}
            aria-label={user ? `Account: ${user.name}` : "Sign in"}
          >
            <svg viewBox="0 0 24 24" fill={user ? "currentColor" : "none"} stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <circle cx="12" cy="8" r="3.5" />
              <path d="M5 20c.8-3.6 3.7-5.5 7-5.5s6.2 1.9 7 5.5" />
            </svg>
          </button>

          <Link
            to="/wishlist"
            className="navbar__icon-btn"
            aria-label={`Wishlist, ${wishlist.length} items`}
          >
            <svg viewBox="0 0 24 24" fill={wishlist.length ? "currentColor" : "none"} stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round" aria-hidden="true">
              <path d="M12 20.5C7.5 16.5 3.5 13.2 3.5 9.1 3.5 6.4 5.6 4.5 8 4.5c1.6 0 3 .8 4 2.1 1-1.3 2.4-2.1 4-2.1 2.4 0 4.5 1.9 4.5 4.6 0 4.1-4 7.4-8.5 11.4z" />
            </svg>
            {wishlist.length > 0 && (
              <span className="navbar__badge" aria-hidden="true">{wishlist.length}</span>
            )}
          </Link>

          <button
            type="button"
            className="navbar__icon-btn"
            onClick={() => setCartOpen(true)}
            aria-label={`Shopping bag, ${cartCount} items`}
          >
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round" aria-hidden="true">
              <path d="M6 8h12l-1 12.5a1 1 0 0 1-1 .5H8a1 1 0 0 1-1-.5zM9 8V6.5a3 3 0 0 1 6 0V8" />
            </svg>
            {cartCount > 0 && (
              <span className="navbar__badge" aria-hidden="true">{cartCount}</span>
            )}
          </button>
        </div>
      </nav>
    </header>
  );
}
