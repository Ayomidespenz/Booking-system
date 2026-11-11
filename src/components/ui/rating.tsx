import { Star } from "lucide-react";
import { cn } from "@/lib/utils";

/** Star row with precise fractional fills (e.g. 4.7 ★★★★★). */
export function Rating({
  value,
  count,
  size = 14,
  className,
  showValue = true,
}: {
  value: number;
  count?: number;
  size?: number;
  className?: string;
  showValue?: boolean;
}) {
  return (
    <span
      className={cn("inline-flex items-center gap-1.5", className)}
      aria-label={`${value} out of 5 stars`}
    >
      <span className="relative inline-flex" aria-hidden>
        <span className="flex text-ink-900/15 dark:text-sand-100/15">
          {Array.from({ length: 5 }).map((_, i) => (
            <Star key={i} size={size} fill="currentColor" strokeWidth={0} />
          ))}
        </span>
        <span
          className="absolute inset-0 overflow-hidden text-gold-500"
          style={{ width: `${(value / 5) * 100}%` }}
        >
          <span className="flex">
            {Array.from({ length: 5 }).map((_, i) => (
              <Star key={i} size={size} fill="currentColor" strokeWidth={0} />
            ))}
          </span>
        </span>
      </span>
      {showValue ? (
        <span className="text-xs font-semibold tabular-nums text-ink-700 dark:text-sand-200">
          {value.toFixed(1)}
        </span>
      ) : null}
      {typeof count === "number" ? (
        <span className="text-xs text-ink-400">
          ({count.toLocaleString("en-US")})
        </span>
      ) : null}
    </span>
  );
}
