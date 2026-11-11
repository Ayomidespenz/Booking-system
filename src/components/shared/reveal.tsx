"use client";

import { motion, type Variants } from "framer-motion";
import type { ReactNode } from "react";
import { EASE, fadeUp, staggerChildren } from "@/animations/variants";

/** Reveals children once, when scrolled into view. */
export function Reveal({
  children,
  className,
  delay = 0,
  y = 28,
  once = true,
  margin = "-60px 0px",
}: {
  children: ReactNode;
  className?: string;
  delay?: number;
  y?: number;
  once?: boolean;
  margin?: string;
}) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once, margin }}
      transition={{ duration: 0.75, delay, ease: EASE }}
    >
      {children}
    </motion.div>
  );
}

/** Container that staggers direct children when it enters the viewport. */
export function StaggerGroup({
  children,
  className,
  stagger = 0.08,
  delay = 0,
  viewportMargin = "-80px 0px",
  as = "div",
}: {
  children: ReactNode;
  className?: string;
  stagger?: number;
  delay?: number;
  viewportMargin?: string;
  as?: "div" | "ul" | "section";
}) {
  const variants: Variants = staggerChildren(stagger, delay);
  const Component = motion[as] as typeof motion.div;

  return (
    <Component
      className={className}
      variants={variants}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: viewportMargin }}
    >
      {children}
    </Component>
  );
}

/** Child item for use inside `StaggerGroup`. */
export function RevealItem({
  children,
  className,
  custom,
}: {
  children: ReactNode;
  className?: string;
  custom?: number;
}) {
  return (
    <motion.div className={className} variants={fadeUp} custom={custom}>
      {children}
    </motion.div>
  );
}
