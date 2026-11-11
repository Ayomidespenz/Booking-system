import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

/** Merge conditional class names with Tailwind conflict resolution. */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/* ---------------------------------- dates --------------------------------- */

export function addDays(date: Date, days: number): Date {
  const next = new Date(date);
  next.setDate(next.getDate() + days);
  return next;
}

/** Dates are serialised as `yyyy-mm-dd` so they travel cleanly through URLs. */
export function toISODate(date: Date): string {
  const y = date.getFullYear();
  const m = `${date.getMonth() + 1}`.padStart(2, "0");
  const d = `${date.getDate()}`.padStart(2, "0");
  return `${y}-${m}-${d}`;
}

export function fromISODate(iso: string): Date {
  const [y, m, d] = iso.split("-").map(Number);
  return new Date(y, (m ?? 1) - 1, d ?? 1);
}

export function isValidISODate(value: unknown): value is string {
  return (
    typeof value === "string" && /^\d{4}-\d{2}-\d{2}$/.test(value) &&
    !Number.isNaN(fromISODate(value).getTime())
  );
}

export function nightsBetween(checkIn: string, checkOut: string): number {
  const start = fromISODate(checkIn).getTime();
  const end = fromISODate(checkOut).getTime();
  return Math.max(1, Math.round((end - start) / 86_400_000));
}

export function formatDate(
  value: string | Date,
  options: Intl.DateTimeFormatOptions = { month: "short", day: "numeric" },
): string {
  const date = typeof value === "string" ? fromISODate(value) : value;
  return new Intl.DateTimeFormat("en-US", options).format(date);
}

/** Compact two-side label such as `Nov 12 – Nov 15`. */
export function formatDateRange(checkIn: string, checkOut: string): string {
  const inLabel = formatDate(checkIn, { month: "short", day: "numeric" });
  const outLabel = formatDate(checkOut, { month: "short", day: "numeric" });
  return `${inLabel} – ${outLabel}`;
}

export function formatMonthYear(date: Date): string {
  return new Intl.DateTimeFormat("en-US", {
    month: "long",
    year: "numeric",
  }).format(date);
}

/* --------------------------------- money ---------------------------------- */

const CURRENCY_DECIMALS: Record<string, number> = {
  JPY: 0,
  KRW: 0,
};

/** Format an amount in the given currency (no conversion — see CurrencyProvider). */
export function formatCurrency(
  amount: number,
  currency: string,
  locale = "en-US",
): string {
  const decimals = CURRENCY_DECIMALS[currency] ?? 0;
  return new Intl.NumberFormat(locale, {
    style: "currency",
    currency,
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals,
  }).format(amount);
}

/** `1234567` → `1,234,567` (used for counters). */
export function formatCompactNumber(value: number): string {
  return new Intl.NumberFormat("en-US").format(Math.round(value));
}

/* --------------------------------- text ----------------------------------- */

export function initialsOf(name: string): string {
  return name
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0]!.toUpperCase())
    .join("");
}

export function pluralise(
  count: number,
  singular: string,
  plural = `${singular}s`,
): string {
  return count === 1 ? singular : plural;
}

export function clamp(value: number, min: number, max: number): number {
  return Math.min(max, Math.max(min, value));
}
