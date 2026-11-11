"use client";

import type { ReactNode } from "react";
import { Reveal } from "@/components/shared/reveal";
import { cn } from "@/lib/utils";

/** Editorial section header: gold eyebrow rule + serif display title. */
export function SectionHeading({
  eyebrow,
  title,
  description,
  align = "left",
  className,
  actions,
}: {
  eyebrow: string;
  title: ReactNode;
  description?: ReactNode;
  align?: "left" | "center";
  className?: string;
  actions?: ReactNode;
}) {
  return (
    <div
      className={cn(
        "flex flex-col gap-5",
        align === "center" && "items-center text-center",
        actions && "lg:flex-row lg:items-end lg:justify-between",
        className,
      )}
    >
      <div className={cn("max-w-2xl space-y-4", align === "center" && "mx-auto")}>
        <Reveal y={16}>
          <p className="flex items-center gap-3 text-[11px] font-bold uppercase tracking-[0.3em] text-gold-600 dark:text-gold-400">
            <span className="h-px w-8 bg-gold-500/60" aria-hidden />
            {eyebrow}
          </p>
        </Reveal>
        <Reveal delay={0.06}>
          <h2 className="font-display text-4xl leading-[1.05] tracking-tight text-ink-950 sm:text-5xl dark:text-sand-50">
            {title}
          </h2>
        </Reveal>
        {description ? (
          <Reveal delay={0.12}>
            <p className="text-base leading-relaxed text-ink-500 dark:text-ink-300">
              {description}
            </p>
          </Reveal>
        ) : null}
      </div>
      {actions ? (
        <Reveal delay={0.15} y={16}>
          <div className="shrink-0">{actions}</div>
        </Reveal>
      ) : null}
    </div>
  );
}
