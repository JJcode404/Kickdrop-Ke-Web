import { createContext, useCallback, useContext, useEffect, useMemo, useRef, useState } from "react";
import { api } from "../lib/api.js";
import { shopProducts } from "../data/shop.js";

const StoreContext = createContext(null);

/* Ids still in the catalogue. A persisted cart/wishlist can reference a product
   that has since been removed; those stale entries are pruned on load so counts,
   totals, and the WhatsApp order stay in sync with what actually renders. */
const VALID_IDS = new Set(shopProducts.map((p) => p.id));

const load = (key, fallback) => {
  try {
    const raw = localStorage.getItem(key);
    return raw ? JSON.parse(raw) : fallback;
  } catch {
    return fallback;
  }
};

const save = (key, value) => {
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch {
    /* storage full or blocked — cart just won't persist */
  }
};

/* Cart items are identified by product id + size + color. */
const sameItem = (a, b) => a.id === b.id && a.size === b.size && a.color === b.color;

export function StoreProvider({ children }) {
  const [cart, setCart] = useState(() =>
    load("kickdrop:cart", []).filter((item) => VALID_IDS.has(item.id))
  );
  const [wishlist, setWishlist] = useState(() =>
    load("kickdrop:wishlist", []).filter((id) => VALID_IDS.has(id))
  );
  const [cartOpen, setCartOpen] = useState(false);
  // The session lives in an httpOnly cookie; `user` is restored from the API,
  // not persisted to localStorage, so it can never go stale.
  const [user, setUser] = useState(null);
  const [authReady, setAuthReady] = useState(false);
  const [authOpen, setAuthOpen] = useState(false);

  useEffect(() => save("kickdrop:cart", cart), [cart]);
  useEffect(() => save("kickdrop:wishlist", wishlist), [wishlist]);

  /* Refs let the stable callbacks below read the latest value without being
     re-created (which would churn every consumer of the context). */
  const userRef = useRef(user);
  const wishlistRef = useRef(wishlist);
  useEffect(() => { userRef.current = user; }, [user]);
  useEffect(() => { wishlistRef.current = wishlist; }, [wishlist]);

  /* Restore any existing session on first load. */
  useEffect(() => {
    let alive = true;
    api
      .me()
      .then(({ user }) => alive && setUser(user))
      .catch(() => {}) // not signed in — fine
      .finally(() => alive && setAuthReady(true));
    return () => {
      alive = false;
    };
  }, []);

  /* When a user signs in, reconcile the guest wishlist with the server's:
     push any local-only items up, then adopt the union. Best-effort. */
  useEffect(() => {
    if (!user) return;
    let alive = true;
    (async () => {
      try {
        const { items } = await api.getWishlist();
        const serverIds = items.map((i) => i.productId);
        const local = wishlistRef.current;
        const localOnly = local.filter((id) => !serverIds.includes(id));
        await Promise.allSettled(localOnly.map((id) => api.addWishlist(id)));
        if (alive) setWishlist([...new Set([...serverIds, ...local])]);
      } catch {
        /* keep the local wishlist if the sync fails */
      }
    })();
    return () => {
      alive = false;
    };
  }, [user?.id]);

  const addToCart = useCallback((item) => {
    setCart((prev) => {
      const existing = prev.find((x) => sameItem(x, item));
      if (existing) {
        return prev.map((x) =>
          sameItem(x, item) ? { ...x, qty: x.qty + (item.qty ?? 1) } : x
        );
      }
      return [...prev, { qty: 1, size: null, ...item }];
    });
    setCartOpen(true);
  }, []);

  const updateItem = useCallback((item, patch) => {
    setCart((prev) => prev.map((x) => (sameItem(x, item) ? { ...x, ...patch } : x)));
  }, []);

  const removeFromCart = useCallback((item) => {
    setCart((prev) => prev.filter((x) => !sameItem(x, item)));
  }, []);

  const clearCart = useCallback(() => setCart([]), []);

  const toggleWish = useCallback((id) => {
    setWishlist((prev) => {
      const has = prev.includes(id);
      const next = has ? prev.filter((x) => x !== id) : [...prev, id];
      // Mirror to the server when signed in (fire-and-forget).
      if (userRef.current) {
        (has ? api.removeWishlist(id) : api.addWishlist(id)).catch(() => {});
      }
      return next;
    });
  }, []);

  const signIn = useCallback(async ({ email, password }) => {
    const { user } = await api.login({ email, password });
    setUser(user);
    setAuthOpen(false);
    return user;
  }, []);

  const register = useCallback(async ({ name, email, password }) => {
    const { user } = await api.register({ name, email, password });
    setUser(user);
    setAuthOpen(false);
    return user;
  }, []);

  const signOut = useCallback(async () => {
    try {
      await api.logout();
    } catch {
      /* clear locally regardless */
    }
    setUser(null);
  }, []);

  const value = useMemo(
    () => ({
      cart,
      cartCount: cart.reduce((n, x) => n + x.qty, 0),
      cartOpen,
      setCartOpen,
      addToCart,
      updateItem,
      removeFromCart,
      clearCart,
      wishlist,
      isWished: (id) => wishlist.includes(id),
      toggleWish,
      user,
      authReady,
      authOpen,
      setAuthOpen,
      signIn,
      register,
      signOut,
    }),
    [cart, cartOpen, wishlist, user, authReady, authOpen, addToCart, updateItem, removeFromCart, clearCart, toggleWish, signIn, register, signOut]
  );

  return <StoreContext.Provider value={value}>{children}</StoreContext.Provider>;
}

export function useStore() {
  const ctx = useContext(StoreContext);
  if (!ctx) throw new Error("useStore must be used inside <StoreProvider>");
  return ctx;
}
