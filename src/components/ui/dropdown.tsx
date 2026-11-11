"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useRef, useState, type ReactNode } from "react";
import { useClickOutside } from "@/hooks/use-click-outside";
import { cn } from "@/lib/utils";
import { SNAPPY } from "@/animations/variants";

type DropdownProps = {
  trigger: ReactNode;
  children: ReactNode | ((props: { close: () => void }) => ReactNode);
  align?: "left" | "right";
  className?: string;
  panelClassName?: string;
  disabled?: boolean;
};

/** Lightweight anchored popover with spring entrance + outside/escape close. */
export function Dropdown({
  trigger,
  children,
  align = "left",
  className,
  panelClassName,
  disabled = false,
}: DropdownProps) {
  const [open, setOpen] = useState(false);
  const rootRef = useRef<HTMLDivElement>(null);

  useClickOutside([rootRef], () => setOpen(false), open);

  useEffect(() => {
    if (!open) return;
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [open]);

  const close = () => setOpen(false);

  return (
    <div ref={rootRef} className={cn("relative", className)}>
      <button
        type="button"
        disabled={disabled}
        aria-expanded={open}
        onClick={() => setOpen((value) => !value)}
        className="block w-full text-left"
      >
        {trigger}
      </button>
      <AnimatePresence>
        {open ? (
          <motion.div
            initial={{ opacity: 0, y: 10, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 6, scale: 0.98, transition: { duration: 0.18 } }}
            transition={SNAPPY}
            className={cn(
              "absolute z-50 mt-3 min-w-full origin-top",
              align === "right" ? "right-0" : "left-0",
              panelClassName,
            )}
          >
            {typeof children === "function" ? children({ close }) : children}
          </motion.div>
        ) : null}
      </AnimatePresence>
    </div>
  );
}
