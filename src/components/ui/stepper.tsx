"use client";

import { AnimatePresence, motion } from "framer-motion";
import { Minus, Plus } from "lucide-react";
import { cn } from "@/lib/utils";
import { SNAPPY } from "@/animations/variants";

/** Animated −/+ counter used for guest and room counts. */
export function Stepper({
  value,
  onChange,
  min = 0,
  max = 12,
  label,
  hint,
}: {
  value: number;
  onChange: (next: number) => void;
  min?: number;
  max?: number;
  label: string;
  hint?: string;
}) {
  const dec = () => onChange(Math.max(min, value - 1));
  const inc = () => onChange(Math.min(max, value + 1));

  return (
    <div className="flex items-center justify-between gap-6 py-3">
      <div>
        <p className="text-sm font-medium text-ink-900 dark:text-sand-100">{label}</p>
        {hint ? <p className="mt-0.5 text-xs text-ink-400">{hint}</p> : null}
      </div>
      <div className="flex items-center gap-3">
        <StepButton onClick={dec} disabled={value <= min} label={`Decrease ${label}`}>
          <Minus className="h-3.5 w-3.5" />
        </StepButton>
        <div className="relative h-6 w-6 overflow-hidden text-center">
          <AnimatePresence mode="popLayout" initial={false}>
            <motion.span
              key={value}
              initial={{ y: 14, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: -14, opacity: 0 }}
              transition={SNAPPY}
              className="absolute inset-0 flex items-center justify-center text-sm font-semibold tabular-nums text-ink-900 dark:text-sand-100"
            >
              {value}
            </motion.span>
          </AnimatePresence>
        </div>
        <StepButton onClick={inc} disabled={value >= max} label={`Increase ${label}`}>
          <Plus className="h-3.5 w-3.5" />
        </StepButton>
      </div>
    </div>
  );
}

function StepButton({
  onClick,
  disabled,
  label,
  children,
}: {
  onClick: () => void;
  disabled: boolean;
  label: string;
  children: React.ReactNode;
}) {
  return (
    <motion.button
      type="button"
      onClick={onClick}
      disabled={disabled}
      aria-label={label}
      whileTap={{ scale: 0.88 }}
      transition={SNAPPY}
      className={cn(
        "flex h-8 w-8 items-center justify-center rounded-full border transition-colors",
        "border-ink-900/15 text-ink-700 hover:border-ink-900 hover:bg-ink-900 hover:text-sand-50",
        "dark:border-sand-100/20 dark:text-sand-200 dark:hover:bg-sand-100 dark:hover:text-ink-950",
        "disabled:cursor-not-allowed disabled:opacity-35 disabled:hover:border-ink-900/15 disabled:hover:bg-transparent disabled:hover:text-ink-700 dark:disabled:hover:border-sand-100/20 dark:disabled:hover:bg-transparent dark:disabled:hover:text-sand-200",
      )}
    >
      {children}
    </motion.button>
  );
}
