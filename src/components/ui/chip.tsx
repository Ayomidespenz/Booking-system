"use client";

import { motion } from "framer-motion";
import { Check } from "lucide-react";
import { cn } from "@/lib/utils";
import { SNAPPY } from "@/animations/variants";

/** Toggleable filter chip with an animated check reveal. */
export function Chip({
  active,
  onClick,
  children,
  className,
}: {
  active: boolean;
  onClick: () => void;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <motion.button
      type="button"
      onClick={onClick}
      whileTap={{ scale: 0.95 }}
      transition={SNAPPY}
      aria-pressed={active}
      className={cn(
        "inline-flex items-center gap-1.5 rounded-full border px-3.5 py-1.5 text-[13px] font-medium transition-colors duration-300",
        active
          ? "border-transparent bg-ink-900 text-sand-50 dark:bg-sand-100 dark:text-ink-950"
          : "border-ink-900/12 bg-white/60 text-ink-600 hover:border-ink-900/35 hover:text-ink-900 dark:border-sand-100/12 dark:bg-ink-900/50 dark:text-sand-300 dark:hover:border-sand-100/40 dark:hover:text-sand-100",
        className,
      )}
    >
      <motion.span
        initial={false}
        animate={{ width: active ? 14 : 0, opacity: active ? 1 : 0 }}
        transition={SNAPPY}
        className="overflow-hidden"
      >
        <Check className="h-3.5 w-3.5" />
      </motion.span>
      {children}
    </motion.button>
  );
}
