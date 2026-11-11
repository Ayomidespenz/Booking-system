"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
import { EASE } from "@/animations/variants";

/** Slim gold progress rail that sweeps across the top on route changes. */
export function RouteProgress() {
  const pathname = usePathname();
  const [active, setActive] = useState(false);

  useEffect(() => {
    setActive(true);
    const timer = setTimeout(() => setActive(false), 850);
    return () => clearTimeout(timer);
  }, [pathname]);

  return (
    <AnimatePresence>
      {active ? (
        <motion.div
          key="route-progress"
          initial={{ scaleX: 0, opacity: 1 }}
          animate={{ scaleX: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.75, ease: EASE }}
          className="pointer-events-none fixed inset-x-0 top-0 z-[100] h-[3px] origin-left bg-gradient-to-r from-gold-400 via-gold-500 to-gold-300 shadow-[0_0_14px_rgba(181,137,78,0.8)]"
        />
      ) : null}
    </AnimatePresence>
  );
}
