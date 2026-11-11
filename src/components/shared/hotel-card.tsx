import Link from "next/link";
import { ArrowUpRight, MapPin } from "lucide-react";
import type { Hotel } from "@/lib/types";
import { SmartImage } from "@/components/ui/smart-image";
import { Badge } from "@/components/ui/badge";
import { Rating } from "@/components/ui/rating";
import { Price } from "@/components/shared/price";
import { cn } from "@/lib/utils";

/**
 * Canonical stay card — used on the landing page, results grid and
 * "similar hotels" rails. Server-safe; interactive leaves are client components.
 */
export function HotelCard({
  hotel,
  className,
  sizes = "(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 33vw",
}: {
  hotel: Hotel;
  className?: string;
  sizes?: string;
}) {
  const savings = hotel.originalPricePerNight
    ? Math.round(
        ((hotel.originalPricePerNight - hotel.pricePerNight) /
          hotel.originalPricePerNight) *
          100,
      )
    : 0;

  return (
    <Link
      href={`/hotels/${hotel.id}`}
      prefetch
      className={cn(
        "group relative flex flex-col overflow-hidden rounded-card border border-ink-900/[0.08] bg-white",
        "transition-all duration-500 ease-out hover:-translate-y-1 hover:shadow-lift",
        "dark:border-sand-100/10 dark:bg-ink-900/50",
        className,
      )}
    >
      <div className="relative aspect-[4/3] overflow-hidden">
        <SmartImage
          src={hotel.gallery[0] ?? ""}
          alt={hotel.name}
          sizes={sizes}
          className="h-full w-full transition-transform duration-700 ease-out group-hover:scale-[1.05]"
        />
        <div className="absolute left-3 top-3 flex flex-wrap gap-2">
          <Badge variant={hotel.propertyType === "shortlet" ? "gold" : "glass"}>
            {hotel.propertyType === "shortlet" ? "Shortlet" : "Hotel"}
          </Badge>
          {hotel.badge ? <Badge variant="glass">{hotel.badge}</Badge> : null}
          {savings > 0 ? <Badge variant="gold">−{savings}%</Badge> : null}
        </div>
        <span className="absolute bottom-3 right-3 flex h-9 w-9 translate-y-2 items-center justify-center rounded-full bg-sand-50 text-ink-900 opacity-0 shadow-soft transition-all duration-500 ease-out group-hover:translate-y-0 group-hover:opacity-100 dark:bg-ink-950 dark:text-sand-100">
          <ArrowUpRight className="h-4 w-4" aria-hidden />
        </span>
      </div>

      <div className="flex flex-1 flex-col gap-3 p-5">
        <div className="flex items-start justify-between gap-3">
          <div className="min-w-0">
            <p className="text-[10px] font-bold uppercase tracking-[0.24em] text-gold-600 dark:text-gold-400">
              {hotel.propertyType === "shortlet" ? `Shortlet · ${hotel.category}` : hotel.category}
            </p>
            <h3 className="mt-1 truncate font-display text-xl leading-tight tracking-tight text-ink-950 dark:text-sand-50">
              {hotel.name}
            </h3>
          </div>
          <Rating value={hotel.rating} count={hotel.reviewCount} className="shrink-0" />
        </div>

        <p className="flex items-center gap-1.5 text-xs text-ink-400">
          <MapPin className="h-3.5 w-3.5 shrink-0" aria-hidden />
          <span className="truncate">
            {hotel.city}, {hotel.country} · {hotel.distanceFromCenter}
          </span>
        </p>

        <div className="mt-auto flex items-end justify-between gap-3 border-t border-ink-900/[0.08] pt-4 dark:border-sand-100/10">
          <span className="text-[11px] uppercase tracking-[0.14em] text-ink-400">
            per night
          </span>
          <span className="text-right leading-none">
            {hotel.originalPricePerNight ? (
              <s className="mr-2 text-xs font-medium text-ink-400">
                <Price amount={hotel.originalPricePerNight} />
              </s>
            ) : null}
            <span className="font-display text-xl font-semibold text-ink-950 dark:text-sand-50">
              <Price amount={hotel.pricePerNight} />
            </span>
          </span>
        </div>
      </div>
    </Link>
  );
}
