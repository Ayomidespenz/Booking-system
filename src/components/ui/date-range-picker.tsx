"use client";

import { useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { CalendarDays, ChevronLeft, ChevronRight, X } from "lucide-react";
import { cn, formatDateRange, fromISODate, toISODate, addDays } from "@/lib/utils";
import { SNAPPY, EASE } from "@/animations/variants";
import { Button } from "@/components/ui/button";

const WEEKDAYS = ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"];

type CalendarProps = {
  checkIn: string | null;
  checkOut: string | null;
  onChange: (checkIn: string | null, checkOut: string | null) => void;
  onClose?: () => void;
  /** Hide the footer (used when the field provides its own actions). */
  bare?: boolean;
};

/** Standalone month grid with direction-aware page transitions. */
export function Calendar({ checkIn, checkOut, onChange, onClose, bare }: CalendarProps) {
  const today = useMemo(() => {
    const now = new Date();
    return new Date(now.getFullYear(), now.getMonth(), now.getDate());
  }, []);

  const initialMonth = useMemo(() => {
    const base = checkIn ? fromISODate(checkIn) : today;
    return new Date(base.getFullYear(), base.getMonth(), 1);
  }, [checkIn, today]);

  const [cursor, setCursor] = useState(initialMonth);
  const [direction, setDirection] = useState(1);

  const minMonth = new Date(today.getFullYear(), today.getMonth(), 1);
  const maxMonth = new Date(today.getFullYear(), today.getMonth() + 14, 1);
  const canGoPrev = cursor > minMonth;
  const canGoNext = cursor < maxMonth;

  const go = (delta: number) => {
    setDirection(delta);
    setCursor((current) =>
      new Date(current.getFullYear(), current.getMonth() + delta, 1),
    );
  };

  const handleDay = (iso: string) => {
    if (!checkIn || (checkIn && checkOut)) {
      onChange(iso, null);
      return;
    }
    if (iso <= checkIn) {
      onChange(iso, null);
      return;
    }
    onChange(checkIn, iso);
    onClose?.();
  };

  const days = useMemo(() => {
    const year = cursor.getFullYear();
    const month = cursor.getMonth();
    const firstWeekday = new Date(year, month, 1).getDay();
    const totalDays = new Date(year, month + 1, 0).getDate();
    const cells: Array<string | null> = Array.from({ length: firstWeekday }, () => null);
    for (let day = 1; day <= totalDays; day++) {
      cells.push(toISODate(new Date(year, month, day)));
    }
    return cells;
  }, [cursor]);

  const todayISO = toISODate(today);

  return (
    <div className="w-[19rem] select-none">
      <div className="mb-3 flex items-center justify-between px-1">
        <button
          type="button"
          onClick={() => go(-1)}
          disabled={!canGoPrev}
          aria-label="Previous month"
          className="flex h-8 w-8 items-center justify-center rounded-full text-ink-600 transition hover:bg-ink-900/[0.07] hover:text-ink-900 disabled:opacity-25 dark:text-sand-300 dark:hover:bg-sand-100/10 dark:hover:text-sand-100"
        >
          <ChevronLeft className="h-4 w-4" />
        </button>
        <div className="relative h-5 w-44 overflow-hidden text-center">
          <AnimatePresence mode="popLayout" initial={false} custom={direction}>
            <motion.p
              key={`${cursor.getFullYear()}-${cursor.getMonth()}`}
              custom={direction}
              initial={{ x: direction * 28, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: direction * -28, opacity: 0 }}
              transition={{ duration: 0.3, ease: EASE }}
              className="absolute inset-0 text-sm font-semibold tracking-wide text-ink-900 dark:text-sand-100"
            >
              {new Intl.DateTimeFormat("en-US", {
                month: "long",
                year: "numeric",
              }).format(cursor)}
            </motion.p>
          </AnimatePresence>
        </div>
        <button
          type="button"
          onClick={() => go(1)}
          disabled={!canGoNext}
          aria-label="Next month"
          className="flex h-8 w-8 items-center justify-center rounded-full text-ink-600 transition hover:bg-ink-900/[0.07] hover:text-ink-900 disabled:opacity-25 dark:text-sand-300 dark:hover:bg-sand-100/10 dark:hover:text-sand-100"
        >
          <ChevronRight className="h-4 w-4" />
        </button>
      </div>

      <div className="mb-1 grid grid-cols-7 px-1">
        {WEEKDAYS.map((day) => (
          <span
            key={day}
            className="py-1 text-center text-[10px] font-semibold uppercase tracking-wider text-ink-400"
          >
            {day}
          </span>
        ))}
      </div>

      <div className="relative overflow-hidden">
        <AnimatePresence mode="wait" initial={false} custom={direction}>
          <motion.div
            key={`${cursor.getFullYear()}-${cursor.getMonth()}`}
            custom={direction}
            initial={{ x: direction * 36, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: direction * -36, opacity: 0 }}
            transition={{ duration: 0.28, ease: EASE }}
            className="grid grid-cols-7 gap-y-1"
          >
            {days.map((iso, index) => {
              if (!iso) return <span key={`pad-${index}`} />;

              const past = iso < todayISO;
              const isStart = iso === checkIn;
              const isEnd = iso === checkOut;
              const selected = isStart || isEnd;
              const inRange =
                Boolean(checkIn && checkOut) && iso > checkIn! && iso < checkOut!;
              const isToday = iso === todayISO;

              return (
                <button
                  key={iso}
                  type="button"
                  disabled={past}
                  onClick={() => handleDay(iso)}
                  aria-label={new Intl.DateTimeFormat("en-US", {
                    dateStyle: "full",
                  }).format(fromISODate(iso))}
                  className={cn(
                    "relative flex h-9 items-center justify-center",
                    past && "cursor-not-allowed",
                  )}
                >
                  {(inRange || (isStart && checkOut)) && (
                    <span className="absolute inset-y-0 left-1/2 right-0 bg-gold-100 dark:bg-gold-500/20" />
                  )}
                  {inRange || isEnd ? (
                    <span className="absolute inset-y-0 left-0 right-1/2 bg-gold-100 dark:bg-gold-500/20" />
                  ) : null}
                  <span
                    className={cn(
                      "relative z-10 flex h-8 w-8 items-center justify-center rounded-full text-[13px] transition-all duration-200",
                      past && "text-ink-300/60 dark:text-ink-600",
                      !past &&
                        !selected &&
                        "text-ink-700 hover:bg-white hover:shadow-soft dark:text-sand-200 dark:hover:bg-ink-800",
                      selected &&
                        "bg-ink-900 font-semibold text-sand-50 dark:bg-sand-100 dark:text-ink-950",
                      isToday &&
                        !selected &&
                        "ring-1 ring-gold-500/70 dark:ring-gold-400/70",
                    )}
                  >
                    {Number(iso.slice(-2))}
                  </span>
                </button>
              );
            })}
          </motion.div>
        </AnimatePresence>
      </div>

      {!bare ? (
        <div className="mt-4 flex items-center justify-between border-t border-ink-900/8 px-1 pt-3 dark:border-sand-100/10">
          <button
            type="button"
            onClick={() => onChange(null, null)}
            className="text-xs font-semibold uppercase tracking-[0.16em] text-ink-400 transition hover:text-ink-900 dark:hover:text-sand-100"
          >
            Clear
          </button>
          <span className="text-xs font-medium text-ink-500 dark:text-ink-300">
            {checkIn && checkOut ? formatDateRange(checkIn, checkOut) : "Select dates"}
          </span>
          <Button size="sm" variant="gold" onClick={onClose}>
            Done
          </Button>
        </div>
      ) : null}
    </div>
  );
}

/* --------------------------- composed field ------------------------------- */

/**
 * Pill field that opens the calendar. Used in the hero search panel and the
 * hotel booking widget.
 */
export function DateRangeField({
  checkIn,
  checkOut,
  onChange,
  label = "Dates",
  compact = false,
  align = "left",
  className,
}: {
  checkIn: string | null;
  checkOut: string | null;
  onChange: (checkIn: string | null, checkOut: string | null) => void;
  label?: string;
  compact?: boolean;
  align?: "left" | "right";
  className?: string;
}) {
  const [open, setOpen] = useState(false);

  const nights =
    checkIn && checkOut
      ? Math.max(
          1,
          Math.round(
            (fromISODate(checkOut).getTime() - fromISODate(checkIn).getTime()) /
              86_400_000,
          ),
        )
      : 0;

  const summary = checkIn && checkOut ? formatDateRange(checkIn, checkOut) : "Add dates";

  return (
    <div className={cn("relative", className)}>
      <button
        type="button"
        onClick={() => setOpen((value) => !value)}
        aria-expanded={open}
        className={cn(
          "group flex w-full items-center gap-3 rounded-2xl px-4 text-left transition-colors duration-300",
          compact ? "h-12" : "h-14",
          open
            ? "bg-white ring-2 ring-gold-500/60 dark:bg-ink-800 dark:ring-gold-400/50"
            : "bg-white/70 hover:bg-white dark:bg-ink-900/60 dark:hover:bg-ink-800",
          "ring-1 ring-ink-900/10 dark:ring-sand-100/10",
        )}
      >
        <CalendarDays className="h-4 w-4 shrink-0 text-gold-600 dark:text-gold-400" />
        <span className="min-w-0">
          <span className="block text-[10px] font-semibold uppercase tracking-[0.18em] text-ink-400">
            {label}
          </span>
          <span
            className={cn(
              "block truncate text-sm font-medium",
              checkIn && checkOut
                ? "text-ink-900 dark:text-sand-100"
                : "text-ink-400",
            )}
          >
            {summary}
          </span>
        </span>
        {nights > 0 ? (
          <span className="ml-auto shrink-0 rounded-full bg-gold-100 px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider text-gold-700 dark:bg-gold-500/15 dark:text-gold-300">
            {nights}n
          </span>
        ) : null}
        <span
          className={cn(
            "ml-auto shrink-0 overflow-hidden transition-all duration-300",
            nights > 0 ? "w-0 opacity-0" : "w-4 opacity-100",
          )}
        />
        <X
          className={cn(
            "h-3.5 w-3.5 shrink-0 text-ink-400 transition-all hover:text-claret-500",
            checkIn || checkOut ? "opacity-100" : "pointer-events-none opacity-0",
          )}
          onClick={(event) => {
            event.stopPropagation();
            onChange(null, null);
          }}
        />
      </button>

      <AnimatePresence>
        {open ? (
          <motion.div
            initial={{ opacity: 0, y: 10, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 6, scale: 0.98, transition: { duration: 0.18 } }}
            transition={SNAPPY}
            className={cn(
              "absolute z-50 mt-3 rounded-3xl border border-ink-900/8 bg-sand-50 p-4 shadow-lift dark:border-sand-100/10 dark:bg-ink-900",
              align === "right" ? "right-0" : "left-0",
            )}
          >
            <Calendar
              checkIn={checkIn}
              checkOut={checkOut}
              onChange={onChange}
              onClose={() => setOpen(false)}
            />
          </motion.div>
        ) : null}
      </AnimatePresence>
    </div>
  );
}
