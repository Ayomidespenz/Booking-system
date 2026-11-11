"use client";

import { useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { MapPin, Search } from "lucide-react";
import { ijebuAreas } from "@/lib/data/ijebu-areas";
import { cn } from "@/lib/utils";
import { SNAPPY, staggerChildren, fadeUpSmall } from "@/animations/variants";
import { useClickOutside } from "@/hooks/use-click-outside";
import { useRef } from "react";

/** Landmark-led autocomplete for the Ijebu Ode service area. */
export function DestinationField({
  value,
  onChange,
  label = "Destination",
  placeholder = "Where to next?",
  compact = false,
  className,
}: {
  value: string;
  onChange: (value: string) => void;
  label?: string;
  placeholder?: string;
  compact?: boolean;
  className?: string;
}) {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const rootRef = useRef<HTMLDivElement>(null);

  useClickOutside([rootRef], () => setOpen(false), open);

  const results = useMemo(() => {
    const needle = query.trim().toLowerCase();
    if (!needle) return ijebuAreas;
    return ijebuAreas
      .filter((area) => `${area.name} ${area.kind} ${area.description}`.toLowerCase().includes(needle))
      .slice(0, 6);
  }, [query]);

  const select = (name: string) => {
    onChange(name);
    setQuery("");
    setOpen(false);
  };

  return (
    <div ref={rootRef} className={cn("relative", className)}>
      <div
        className={cn(
          "flex items-center gap-3 rounded-2xl px-4 transition-colors duration-300 ring-1",
          compact ? "h-12" : "h-14",
          open
            ? "bg-white ring-2 ring-gold-500/60 dark:bg-ink-800 dark:ring-gold-400/50"
            : "bg-white/70 ring-ink-900/10 hover:bg-white dark:bg-ink-900/60 dark:ring-sand-100/10 dark:hover:bg-ink-800",
        )}
      >
        <MapPin className="h-4 w-4 shrink-0 text-gold-600 dark:text-gold-400" />
        <input
          value={open ? query : value}
          onChange={(event) => {
            setQuery(event.target.value);
            if (!open) setOpen(true);
          }}
          onFocus={() => setOpen(true)}
          placeholder={value && !open ? value : placeholder}
          aria-label={label}
          className="w-full bg-transparent text-sm font-medium text-ink-900 placeholder:font-normal placeholder:text-ink-400 focus:outline-none dark:text-sand-100"
        />
        {value && !open ? (
          <span className="shrink-0 rounded-full bg-ink-900/[0.06] px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider text-ink-500 dark:bg-sand-100/10 dark:text-sand-300">
            Any
          </span>
        ) : null}
      </div>

      <AnimatePresence>
        {open ? (
          <motion.div
            initial={{ opacity: 0, y: 10, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 6, scale: 0.98, transition: { duration: 0.18 } }}
            transition={SNAPPY}
            className="absolute left-0 right-0 z-50 mt-3 overflow-hidden rounded-3xl border border-ink-900/8 bg-sand-50 p-2 shadow-lift dark:border-sand-100/10 dark:bg-ink-900"
          >
            <motion.ul
              variants={staggerChildren(0.045)}
              initial="hidden"
              animate="show"
              className="space-y-0.5"
            >
              <motion.li variants={fadeUpSmall}>
                <button
                  type="button"
                  onClick={() => select("")}
                  className="flex w-full items-center gap-3 rounded-2xl px-3 py-2.5 text-left transition-colors hover:bg-white dark:hover:bg-ink-800"
                >
                  <span className="flex h-9 w-9 items-center justify-center rounded-full bg-ink-900 text-sand-50 dark:bg-sand-100 dark:text-ink-950">
                    <Search className="h-4 w-4" />
                  </span>
                  <span>
                    <span className="block text-sm font-medium text-ink-900 dark:text-sand-100">
                      Any destination
                    </span>
                    <span className="block text-xs text-ink-400">
                      Search the Ijebu Ode area
                    </span>
                  </span>
                </button>
              </motion.li>
              {results.map((area) => (
                <motion.li key={area.id} variants={fadeUpSmall}>
                  <button
                    type="button"
                    onClick={() => select(area.name)}
                    className="flex w-full items-center gap-3 rounded-2xl px-3 py-2.5 text-left transition-colors hover:bg-white dark:hover:bg-ink-800"
                  >
                    <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-sand-200 text-gold-700 dark:bg-ink-700 dark:text-gold-300">
                      <MapPin className="h-4 w-4" aria-hidden />
                    </span>
                    <span className="min-w-0">
                      <span className="block truncate text-sm font-medium text-ink-900 dark:text-sand-100">
                        {area.name}
                      </span>
                      <span className="block text-xs text-ink-400">
                        {area.kind}
                      </span>
                    </span>
                  </button>
                </motion.li>
              ))}
              {results.length === 0 ? (
                <li className="px-3 py-6 text-center text-sm text-ink-400">
                  No destinations match “{query}”.
                </li>
              ) : null}
            </motion.ul>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </div>
  );
}
