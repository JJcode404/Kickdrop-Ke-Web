import { createContext, useCallback, useContext, useEffect, useMemo, useState } from "react";

const StoreContext = createContext(null);

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
  const [cart, setCart] = useState(() => load("kickdrop:cart", []));
  const [wishlist, setWishlist] = useState(() => load("kickdrop:wishlist", []));
  const [cartOpen, setCartOpen] = useState(false);
  const [user, setUser] = useState(() => load("kickdrop:user", null));
  const [authOpen, setAuthOpen] = useState(false);

  useEffect(() => save("kickdrop:cart", cart), [cart]);
  useEffect(() => save("kickdrop:wishlist", wishlist), [wishlist]);
  useEffect(() => save("kickdrop:user", user), [user]);

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
    setWishlist((prev) =>
      prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]
    );
  }, []);

  /* Front-end auth mock: swap these for real API calls when a backend exists */
  const signIn = useCallback((account) => {
    setUser(account);
    setAuthOpen(false);
  }, []);
  const signOut = useCallback(() => setUser(null), []);

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
      authOpen,
      setAuthOpen,
      signIn,
      signOut,
    }),
    [cart, cartOpen, wishlist, user, authOpen, addToCart, updateItem, removeFromCart, clearCart, toggleWish, signIn, signOut]
  );

  return <StoreContext.Provider value={value}>{children}</StoreContext.Provider>;
}

export function useStore() {
  const ctx = useContext(StoreContext);
  if (!ctx) throw new Error("useStore must be used inside <StoreProvider>");
  return ctx;
}
