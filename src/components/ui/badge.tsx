import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

type BadgeVariant = "gold" | "ink" | "outline" | "glass" | "success";

const variants: Record<BadgeVariant, string> = {
  gold: "bg-gold-500/15 text-gold-700 ring-1 ring-gold-500/30 dark:text-gold-300",
  ink: "bg-ink-900 text-sand-50 dark:bg-sand-100 dark:text-ink-950",
  outline:
    "border border-ink-900/15 text-ink-700 dark:border-sand-100/20 dark:text-sand-200",
  glass:
    "bg-white/75 text-ink-900 backdrop-blur-md ring-1 ring-black/5 dark:bg-ink-900/75 dark:text-sand-100 dark:ring-white/10",
  success:
    "bg-sage-100 text-sage-500 ring-1 ring-sage-500/25 dark:bg-sage-500/15 dark:text-sage-500",
};

export function Badge({
  children,
  variant = "glass",
  className,
  icon,
}: {
  children: ReactNode;
  variant?: BadgeVariant;
  className?: string;
  icon?: ReactNode;
}) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.14em]",
        variants[variant],
        className,
      )}
    >
      {icon}
      {children}
    </span>
  );
}
