import { cn } from "@/lib/utils";

/** Shimmering placeholder block — matches the ivory/ink surfaces. */
export function Skeleton({
  className,
  rounded = "rounded-xl",
}: {
  className?: string;
  rounded?: string;
}) {
  return <div className={cn("animate-shimmer", rounded, className)} aria-hidden />;
}
