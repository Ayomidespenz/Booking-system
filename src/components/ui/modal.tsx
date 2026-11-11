"use client";

import { useEffect, type ReactNode } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { X } from "lucide-react";
import { modalOverlay, modalPanel } from "@/animations/variants";
import { cn } from "@/lib/utils";

/** Dialog shell with blur backdrop, scroll lock and escape-to-close. */
export function Modal({
  open,
  onClose,
  children,
  className,
  label,
}: {
  open: boolean;
  onClose: () => void;
  children: ReactNode;
  className?: string;
  label: string;
}) {
  useEffect(() => {
    if (!open) return;
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
    };
    document.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = previous;
      document.removeEventListener("keydown", onKey);
    };
  }, [open, onClose]);

  return (
    <AnimatePresence>
      {open ? (
        <div className="fixed inset-0 z-[90] flex items-center justify-center p-4 sm:p-8">
          <motion.div
            variants={modalOverlay}
            initial="hidden"
            animate="show"
            exit="exit"
            onClick={onClose}
            className="absolute inset-0 bg-ink-950/80 backdrop-blur-md"
          />
          <motion.div
            role="dialog"
            aria-modal="true"
            aria-label={label}
            variants={modalPanel}
            initial="hidden"
            animate="show"
            exit="exit"
            className={cn("relative z-10 w-full max-w-5xl", className)}
          >
            <button
              type="button"
              onClick={onClose}
              aria-label="Close"
              className="absolute -top-12 right-0 flex h-10 w-10 items-center justify-center rounded-full bg-white/10 text-white backdrop-blur-md transition hover:bg-white/25 sm:-top-14"
            >
              <X className="h-5 w-5" />
            </button>
            {children}
          </motion.div>
        </div>
      ) : null}
    </AnimatePresence>
  );
}
