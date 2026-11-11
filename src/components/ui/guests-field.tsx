"use client";

import { Users } from "lucide-react";
import { Dropdown } from "@/components/ui/dropdown";
import { Stepper } from "@/components/ui/stepper";
import { Button } from "@/components/ui/button";
import type { GuestCounts } from "@/lib/types";
import { cn, pluralise } from "@/lib/utils";

/** Popover with animated steppers for adults, children and rooms. */
export function GuestsField({
  guests,
  onChange,
  label = "Guests",
  compact = false,
  className,
}: {
  guests: GuestCounts;
  onChange: (next: GuestCounts) => void;
  label?: string;
  compact?: boolean;
  className?: string;
}) {
  const summary = [
    `${guests.adults} ${pluralise(guests.adults, "adult")}`,
    guests.children > 0 ? `${guests.children} ${pluralise(guests.children, "child")}` : null,
    `${guests.rooms} ${pluralise(guests.rooms, "room")}`,
  ]
    .filter(Boolean)
    .join(" · ");

  return (
    <Dropdown
      className={className}
      panelClassName="w-[19rem] rounded-3xl border border-ink-900/8 bg-sand-50 p-4 shadow-lift dark:border-sand-100/10 dark:bg-ink-900"
      trigger={
        <div
          className={cn(
            "flex items-center gap-3 rounded-2xl px-4 transition-colors duration-300 ring-1",
            compact ? "h-12" : "h-14",
            "bg-white/70 ring-ink-900/10 hover:bg-white dark:bg-ink-900/60 dark:ring-sand-100/10 dark:hover:bg-ink-800",
          )}
        >
          <Users className="h-4 w-4 shrink-0 text-gold-600 dark:text-gold-400" />
          <span className="min-w-0">
            <span className="block text-[10px] font-semibold uppercase tracking-[0.18em] text-ink-400">
              {label}
            </span>
            <span className="block truncate text-sm font-medium text-ink-900 dark:text-sand-100">
              {summary}
            </span>
          </span>
        </div>
      }
    >
      {({ close }) => (
        <div>
          <div className="divide-y divide-ink-900/8 dark:divide-sand-100/10">
            <Stepper
              label="Adults"
              hint="Ages 13+"
              value={guests.adults}
              min={1}
              max={12}
              onChange={(value) => onChange({ ...guests, adults: value })}
            />
            <Stepper
              label="Children"
              hint="Ages 0–12"
              value={guests.children}
              min={0}
              max={8}
              onChange={(value) => onChange({ ...guests, children: value })}
            />
            <Stepper
              label="Rooms"
              value={guests.rooms}
              min={1}
              max={6}
              onChange={(value) => onChange({ ...guests, rooms: value })}
            />
          </div>
          <Button size="sm" variant="primary" full className="mt-3" onClick={close}>
            Apply
          </Button>
        </div>
      )}
    </Dropdown>
  );
}
