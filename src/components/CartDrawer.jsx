import { useEffect, useRef } from "react";
import { useStore } from "../store/StoreContext.jsx";
import { formatPrice } from "../data/products.js";
import { shopProducts, effectivePrice } from "../data/shop.js";
import { WHATSAPP_NUMBER } from "../config.js";

const productOf = (item) => shopProducts.find((p) => p.id === item.id);

function CartLine({ item }) {
  const { updateItem, removeFromCart } = useStore();
  const p = productOf(item);
  if (!p) return null;

  return (
    <li className="cart-line">
      <img
        className="cart-line__img product-photo"
        src={p.image}
        alt=""
        width="120"
        height="86"
        loading="lazy"
      />
      <div className="cart-line__body">
        <p className="cart-line__name">{p.name}</p>
        <p className="cart-line__meta">
          {item.color} · {formatPrice(effectivePrice(p))}
        </p>

        <div className="cart-line__controls">
          <label className="cart-line__size">
            <span className="visually-hidden">{`Size for ${p.name}`}</span>
            <select
              value={item.size ?? p.sizes[0]}
              onChange={(e) => updateItem(item, { size: Number(e.target.value) })}
            >
              {p.sizes.map((s) => (
                <option key={s} value={s}>
                  EU {s}
                </option>
              ))}
            </select>
          </label>

          <span className="cart-line__qty" role="group" aria-label={`Quantity of ${p.name}`}>
            <button
              type="button"
              onClick={() =>
                item.qty > 1
                  ? updateItem(item, { qty: item.qty - 1 })
                  : removeFromCart(item)
              }
              aria-label="Decrease quantity"
            >
              −
            </button>
            <span aria-live="polite">{item.qty}</span>
            <button
              type="button"
              onClick={() => updateItem(item, { qty: item.qty + 1 })}
              aria-label="Increase quantity"
            >
              +
            </button>
          </span>

          <button
            type="button"
            className="cart-line__remove"
            onClick={() => removeFromCart(item)}
          >
            Remove
          </button>
        </div>
      </div>
      <p className="cart-line__total">{formatPrice(effectivePrice(p) * item.qty)}</p>
    </li>
  );
}

export default function CartDrawer() {
  const { cart, cartOpen, setCartOpen, cartCount } = useStore();
  const panelRef = useRef(null);

  useEffect(() => {
    if (!cartOpen) return;
    document.body.style.overflow = "hidden";
    const onKey = (e) => e.key === "Escape" && setCartOpen(false);
    document.addEventListener("keydown", onKey);
    panelRef.current?.querySelector("button, select")?.focus();
    return () => {
      document.body.style.overflow = "";
      document.removeEventListener("keydown", onKey);
    };
  }, [cartOpen, setCartOpen]);

  const subtotal = cart.reduce((sum, item) => {
    const p = productOf(item);
    return p ? sum + effectivePrice(p) * item.qty : sum;
  }, 0);

  const whatsappHref = () => {
    const lines = cart.map((item, i) => {
      const p = productOf(item);
      // items added straight from cards default to the first available size
      const size = item.size ?? p.sizes[0];
      return `${i + 1}. ${p.name} — ${item.color}, EU ${size} ×${item.qty} — ${formatPrice(effectivePrice(p) * item.qty)}`;
    });
    const msg = [
      "Hi KICKDROP, I'd like to place an order:",
      "",
      ...lines,
      "",
      `Total: ${formatPrice(subtotal)}`,
    ].join("\n");
    return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(msg)}`;
  };

  return (
    <>
      {cartOpen && (
        <button
          type="button"
          className="shop__backdrop cart-backdrop"
          aria-label="Close cart"
          onClick={() => setCartOpen(false)}
        />
      )}

      <aside
        ref={panelRef}
        className={`cart-drawer ${cartOpen ? "is-open" : ""}`}
        aria-label="Shopping bag"
        aria-hidden={!cartOpen}
      >
        <div className="cart-drawer__head">
          <h2 className="cart-drawer__title">
            Your Bag {cartCount > 0 && <span>({cartCount})</span>}
          </h2>
          <button
            type="button"
            className="filter-panel__close"
            onClick={() => setCartOpen(false)}
            aria-label="Close cart"
          >
            <svg viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" fill="none" aria-hidden="true">
              <path d="M6 6l12 12M18 6L6 18" />
            </svg>
          </button>
        </div>

        {cart.length === 0 ? (
          <div className="cart-drawer__empty">
            <p className="cart-drawer__empty-title">Your bag is empty.</p>
            <p className="cart-drawer__empty-body">
              The icons are waiting — add a pair and order it in one message.
            </p>
          </div>
        ) : (
          <>
            <ul className="cart-drawer__lines" role="list">
              {cart.map((item) => (
                <CartLine key={`${item.id}-${item.size}-${item.color}`} item={item} />
              ))}
            </ul>

            <div className="cart-drawer__foot">
              <p className="cart-drawer__subtotal">
                <span>Subtotal</span>
                <strong>{formatPrice(subtotal)}</strong>
              </p>

              <a
                className="btn btn--gold pdp__whatsapp"
                href={whatsappHref()}
                target="_blank"
                rel="noreferrer"
              >
                  <svg className="pdp__wa-icon" viewBox="0 0 448 512" fill="currentColor" aria-hidden="true">
                    <path d="M380.9 97.1C339 55.1 283.2 32 223.9 32c-122.4 0-222 99.6-222 222 0 39.1 10.2 77.3 29.6 111L0 480l117.7-30.9c32.4 17.7 68.9 27 106.1 27h.1c122.3 0 224.1-99.6 224.1-222 0-59.3-25.2-115-67.1-157zm-157 341.6c-33.2 0-65.7-8.9-94-25.7l-6.7-4-69.8 18.3L72 359.2l-4.4-7c-18.5-29.4-28.2-63.3-28.2-98.2 0-101.7 82.8-184.5 184.6-184.5 49.3 0 95.6 19.2 130.4 54.1 34.8 34.9 56.2 81.2 56.1 130.5 0 101.8-84.9 184.6-186.6 184.6zm101.2-138.2c-5.5-2.8-32.8-16.2-37.9-18-5.1-1.9-8.8-2.8-12.5 2.8-3.7 5.6-14.3 18-17.6 21.8-3.2 3.7-6.5 4.2-12 1.4-32.6-16.3-54-29.1-75.5-66-5.7-9.8 5.7-9.1 16.3-30.3 1.8-3.7.9-6.9-.5-9.7-1.4-2.8-12.5-30.1-17.1-41.2-4.5-10.8-9.1-9.3-12.5-9.5-3.2-.2-6.9-.2-10.6-.2-3.7 0-9.7 1.4-14.8 6.9-5.1 5.6-19.4 19-19.4 46.3 0 27.3 19.9 53.7 22.6 57.4 2.8 3.7 39.1 59.7 94.8 83.8 35.2 15.2 49 16.5 66.6 13.9 10.7-1.6 32.8-13.4 37.4-26.4 4.6-13 4.6-24.1 3.2-26.4-1.3-2.5-5-3.9-10.5-6.6z" />
                  </svg>
                  Order on WhatsApp
                </a>

              <p className="cart-drawer__hint" role="status">
                Your order opens in WhatsApp — send the message to confirm.
              </p>
            </div>
          </>
        )}
      </aside>
    </>
  );
}
