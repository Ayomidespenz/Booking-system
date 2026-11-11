"use client";

import { useEffect, useRef, useState } from "react";
import { useInView, useReducedMotion } from "framer-motion";

type CountUpOptions = {
  duration?: number;
  decimals?: number;
  /** Delay before the count begins, in ms. */
  delay?: number;
};

/**
 * Animates from 0 → `target` with an ease-out-quart curve once the returned
 * ref scrolls into view. Respects `prefers-reduced-motion`.
 */
export function useCountUp(target: number, options: CountUpOptions = {}) {
  const { duration = 1600, decimals = 0, delay = 0 } = options;
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-40px 0px" });
  const reducedMotion = useReducedMotion();
  const [value, setValue] = useState(0);

  useEffect(() => {
    if (!inView) return;
    if (reducedMotion) {
      setValue(target);
      return;
    }

    let raf = 0;
    let start = 0;

    const tick = (now: number) => {
      if (!start) start = now;
      const elapsed = now - start - delay;
      if (elapsed < 0) {
        raf = requestAnimationFrame(tick);
        return;
      }
      const progress = Math.min(1, elapsed / duration);
      const eased = 1 - Math.pow(1 - progress, 4);
      setValue(target * eased);
      if (progress < 1) raf = requestAnimationFrame(tick);
    };

    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [inView, target, duration, decimals, delay, reducedMotion]);

  const display = decimals > 0 ? value.toFixed(decimals) : Math.round(value);

  return { ref, display: Number(display), displayString: display };
}
