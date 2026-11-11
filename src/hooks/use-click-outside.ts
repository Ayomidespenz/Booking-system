"use client";

import { useEffect, type RefObject } from "react";

/** Calls `onOutside` when a pointer-down lands outside every referenced node. */
export function useClickOutside(
  refs: Array<RefObject<HTMLElement | null>>,
  onOutside: () => void,
  active = true,
) {
  useEffect(() => {
    if (!active) return;

    const handler = (event: PointerEvent) => {
      const target = event.target as Node | null;
      if (!target) return;
      const inside = refs.some((ref) => ref.current?.contains(target));
      if (!inside) onOutside();
    };

    document.addEventListener("pointerdown", handler);
    return () => document.removeEventListener("pointerdown", handler);
  }, [refs, onOutside, active]);
}
