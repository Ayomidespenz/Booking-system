"use client";

import { useCountUp } from "@/hooks/use-count-up";
import { cn } from "@/lib/utils";

/** Number that counts up in view — e.g. `1,240+` or `4.9/5`. */
export function AnimatedNumber({
  value,
  decimals = 0,
  prefix = "",
  suffix = "",
  duration = 1700,
  className,
}: {
  value: number;
  decimals?: number;
  prefix?: string;
  suffix?: string;
  duration?: number;
  className?: string;
}) {
  const { ref, displayString } = useCountUp(value, { decimals, duration });

  return (
    <span ref={ref} className={cn("tabular-nums", className)}>
      {prefix}
      {decimals > 0
        ? Number(displayString).toLocaleString("en-US", {
            minimumFractionDigits: decimals,
            maximumFractionDigits: decimals,
          })
        : Number(displayString).toLocaleString("en-US")}
      {suffix}
    </span>
  );
}
