# KICKDROP — Luxury Footwear Landing Page

A modern, minimal, premium e-commerce landing page built with React + Vite.
Black / white / subtle gold palette, serif display typography, lots of whitespace.

## Run it

```bash
npm install
npm run dev      # local dev server
npm run build    # production build → dist/
npm run preview  # serve the production build
```

## Structure

```
src/
  App.jsx                    Router shell (skip link → nav → routed page → footer)
  pages/
    Home.jsx                 Landing page (sections below)
    Shop.jsx                 Catalogue with search, filters, sorting, skeletons
    Product.jsx              Product details: gallery, sizes, WhatsApp ordering
    NewArrivals.jsx          Latest drops with urgency accents and quick filters
    Sale.jsx                 Discounted pairs, biggest discount first
    BestSellers.jsx          Sales-ranked favorites with social proof
    Brands.jsx               Brand discovery: featured editorial + logo wall
  components/
    shop/
      FilterPanel.jsx        Sidebar (desktop) / drawer (mobile) filter controls
      ShopProductCard.jsx    Card with rating, swatches, wishlist, hover cart
    product/
      Gallery.jsx            Scroll-snap swipe gallery with thumbs and zoom
    Navbar.jsx               Fixed header, mobile menu, scroll state
    Hero.jsx                 Fullscreen hero with parallax art + halo
    Collections.jsx          Featured collections grid
    BestSellers.jsx          Product cards with badges and prices
    ProductShowcase.jsx      Dark limited-edition feature section
    Benefits.jsx             Four-up value props with inline SVG icons
    Reviews.jsx              Customer testimonial cards
    InstagramGallery.jsx     Six-up social grid with hover overlay
    Newsletter.jsx           Email capture with inline validation
    Footer.jsx               Multi-column premium footer
    SectionHeading.jsx       Shared eyebrow / title / lede block
  hooks/
    useReveal.js             IntersectionObserver fade-in-on-scroll
    useParallax.js           rAF-throttled scroll parallax
    usePrefersReducedMotion.js
  data/products.js           Collections, products, reviews, price formatting
  data/shop.js               Shop metadata (brands, sizes, colors) + filter logic
  styles/
    global.css               Design tokens, reset, buttons, motion primitives
    sections.css             Mobile-first section layouts and breakpoints
    shop.css                 Shop page: grid, filters, cards, skeletons
    product.css              Product page: gallery, options, tabs, CTA
```

## Routes

`/` is the landing page. `/shop` is the full catalogue; `/product/:id` is the
product details page (ordering happens via WhatsApp — set the store number in
`src/pages/Product.jsx`). `/new-arrivals`, `/sale`, `/best-sellers`, and
`/brands` are dedicated pages. Brand cards deep-link to `/shop?brand=<name>`,
which pre-selects that brand filter. Brand logo SVGs live in
`public/images/brands/` (sourced from Wikimedia — verify licensing before
commercial use). Each product has five images: the
main side profile plus four angle shots (`<id>-a1.webp` … `<id>-a4.webp`).

## Notes

- **Motion**: scroll reveals, subtle parallax, image zoom on hover, and button
  wipe/press micro-interactions — all disabled under `prefers-reduced-motion`
  (both in CSS and in the JS hooks).
- **Accessibility**: semantic landmarks, skip link, labelled sections, visible
  focus states, keyboard-operable mobile menu (Escape closes it), form status
  announced via `role="status"`, WCAG AA color contrast (the gold accent uses a
  darker `#8a6d2f` on light backgrounds and brighter `#c2a35e` on dark ones).
- **Responsive**: mobile-first CSS with tablet (`48rem`) and desktop (`64rem`)
  breakpoints.
- **Images**: product photos live in `public/images/products/` as 800px WebP
  files (sourced from the StockX image CDN — replace with owned/licensed
  photography before any commercial use). Typography uses system font stacks,
  so the page works fully offline.
