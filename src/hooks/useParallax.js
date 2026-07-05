import { useEffect, useRef } from "react";
import usePrefersReducedMotion from "./usePrefersReducedMotion.js";

/**
 * Translates the referenced element vertically as the page scrolls,
 * at `speed` times the scroll distance (small values = subtle drift).
 * Disabled entirely when the user prefers reduced motion.
 */
export default function useParallax(speed = 0.15) {
  const ref = useRef(null);
  const reduced = usePrefersReducedMotion();

  useEffect(() => {
    const el = ref.current;
    if (!el || reduced) return;

    let frame = 0;
    const update = () => {
      frame = 0;
      const rect = el.getBoundingClientRect();
      // Offset relative to the element's resting position in the viewport
      const offset = (rect.top + rect.height / 2 - window.innerHeight / 2) * -speed;
      el.style.transform = `translate3d(0, ${offset.toFixed(1)}px, 0)`;
    };
    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };

    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      if (frame) cancelAnimationFrame(frame);
      el.style.transform = "";
    };
  }, [speed, reduced]);

  return ref;
}
