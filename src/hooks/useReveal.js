import { useEffect, useRef } from "react";
import usePrefersReducedMotion from "./usePrefersReducedMotion.js";

/**
 * Adds `.is-revealed` to the referenced element when it scrolls into view.
 * Pair with the `.reveal` CSS class, which handles the fade/translate.
 * With reduced motion the element is revealed immediately.
 */
export default function useReveal() {
  const ref = useRef(null);
  const reduced = usePrefersReducedMotion();

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    if (reduced || !("IntersectionObserver" in window)) {
      el.classList.add("is-revealed");
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-revealed");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.15, rootMargin: "0px 0px -8% 0px" }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [reduced]);

  return ref;
}
