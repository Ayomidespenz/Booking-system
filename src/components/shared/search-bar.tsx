"use client";

import { useRouter } from "next/navigation";
import type { FormEvent } from "react";
import { Search } from "lucide-react";
import { DestinationField } from "@/components/ui/destination-field";
import { DateRangeField } from "@/components/ui/date-range-picker";
import { GuestsField } from "@/components/ui/guests-field";
import { Button } from "@/components/ui/button";
import { useSearch } from "@/context/search-provider";
import { cn } from "@/lib/utils";

/**
 * The canonical stay search: destination + dates + guests → /hotels.
 * State lives in SearchProvider, so values follow the visitor across pages.
 */
export function SearchBar({
  variant = "hero",
  className,
  submitLabel = "Search stays",
}: {
  variant?: "hero" | "inline";
  className?: string;
  submitLabel?: string;
}) {
  const router = useRouter();
  const search = useSearch();
  const compact = variant === "inline";

  const submit = (event: FormEvent) => {
    event.preventDefault();
    router.push("/hotels");
  };

  return (
    <form
      onSubmit={submit}
      className={cn(
        "grid gap-2 rounded-3xl border border-ink-900/[0.08] p-2",
        "bg-white/85 shadow-lift backdrop-blur-xl dark:border-sand-100/10 dark:bg-ink-900/70",
        compact
          ? "lg:grid-cols-[1.2fr_1.3fr_1fr_auto]"
          : "lg:grid-cols-[1.3fr_1.4fr_1fr_auto]",
        className,
      )}
    >
      <DestinationField
        value={search.destination}
        onChange={search.setDestination}
        compact={compact}
        className="min-w-0"
      />
      <DateRangeField
        checkIn={search.checkIn}
        checkOut={search.checkOut}
        onChange={search.setDates}
        compact={compact}
        className="min-w-0"
      />
      <GuestsField
        guests={search.guests}
        onChange={search.setGuests}
        compact={compact}
        className="min-w-0"
      />
      <Button
        type="submit"
        variant="gold"
        size={compact ? "md" : "lg"}
        className="w-full shrink-0 lg:w-auto"
        icon={<Search className="h-4 w-4" aria-hidden />}
      >
        {submitLabel}
      </Button>
    </form>
  );
}
