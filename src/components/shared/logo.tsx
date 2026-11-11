import Link from "next/link";
import { cn } from "@/lib/utils";

/** Velora wordmark — serif display type with a gold lozenge. */
export function Logo({
  className,
  href = "/",
  tone = "dark",
}: {
  className?: string;
  href?: string;
  tone?: "dark" | "light";
}) {
  return (
    <Link
      href={href}
      aria-label="Velora — home"
      className={cn("group inline-flex items-baseline gap-1.5", className)}
    >
      <span
        className={cn(
          "font-display text-[1.6rem] font-semibold leading-none tracking-[0.02em] transition-opacity duration-300 group-hover:opacity-70",
          tone === "dark"
            ? "text-ink-950 dark:text-sand-50"
            : "text-sand-50",
        )}
      >
        Velora
      </span>
      <span
        aria-hidden
        className={cn(
          "mb-0.5 h-1.5 w-1.5 rotate-45 bg-gold-500 transition-transform duration-500 group-hover:rotate-[225deg]",
        )}
      />
    </Link>
  );
}

/** Compact monogram tile — used in the footer and 404. */
export function LogoMark({ className }: { className?: string }) {
  return (
    <span
      className={cn(
        "flex h-10 w-10 items-center justify-center rounded-xl bg-ink-950 font-display text-xl text-gold-300 dark:bg-sand-100 dark:text-gold-600",
        className,
      )}
      aria-hidden
    >
      V
    </span>
  );
}
