import type { CSSProperties, ReactNode } from "react";
import { cn } from "@/lib/utils";

/**
 * Seamless horizontal rail — content is duplicated once and translated −50 %.
 * Pause on hover via the `marquee-pausable` parent class.
 */
export function Marquee({
  children,
  duration = 46,
  reverse = false,
  className,
  fade = true,
}: {
  children: ReactNode;
  duration?: number;
  reverse?: boolean;
  className?: string;
  fade?: boolean;
}) {
  return (
    <div
      className={cn("marquee-pausable overflow-hidden", fade && "edge-fade-x", className)}
      style={{ "--marquee-duration": `${duration}s` } as CSSProperties}
    >
      <div
        className={cn(
          "flex w-max animate-marquee items-center",
          reverse && "[animation-direction:reverse]",
        )}
      >
        <div className="flex shrink-0 items-center">{children}</div>
        <div className="flex shrink-0 items-center" aria-hidden>
          {children}
        </div>
      </div>
    </div>
  );
}
