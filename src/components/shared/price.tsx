"use client";

import { useCurrency } from "@/context/currency-provider";

/**
 * Renders a base-USD amount in the visitor's selected currency.
 * Client component — keep it a leaf in server-rendered trees.
 */
export function Price({
  amount,
  className,
  short = false,
}: {
  amount: number;
  className?: string;
  short?: boolean;
}) {
  const { format, formatShort } = useCurrency();
  return (
    <span className={className}>{short ? formatShort(amount) : format(amount)}</span>
  );
}
