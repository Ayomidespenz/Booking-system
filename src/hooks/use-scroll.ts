"use client";

import { useEffect, useState } from "react";

/** True once the page has scrolled past `offset` px. Hydration-safe. */
export function useIsScrolled(offset = 24): boolean {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > offset);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [offset]);

  return scrolled;
}

export type ScrollDirection = "up" | "down";

/** Tracks whether the user is currently scrolling up or down. */
export function useScrollDirection(threshold = 80): ScrollDirection {
  const [direction, setDirection] = useState<ScrollDirection>("up");

  useEffect(() => {
    let lastY = window.scrollY;
    let ticking = false;

    const onScroll = () => {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(() => {
        const y = window.scrollY;
        const delta = y - lastY;
        if (Math.abs(delta) > threshold) {
          setDirection(delta > 0 ? "down" : "up");
          lastY = y;
        } else if (y < threshold) {
          setDirection("up");
        }
        ticking = false;
      });
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [threshold]);

  return direction;
}
