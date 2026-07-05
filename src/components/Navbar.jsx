import { useEffect, useState } from "react";
import { Link, NavLink } from "react-router-dom";

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
      </nav>
    </header>
  );
}
