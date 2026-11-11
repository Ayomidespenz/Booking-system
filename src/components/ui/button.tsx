"use client";

import Link from "next/link";
import { forwardRef, type ButtonHTMLAttributes, type ReactNode } from "react";
import { motion } from "framer-motion";
import { Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";
import { SPRING } from "@/animations/variants";

export type ButtonVariant = "primary" | "gold" | "outline" | "ghost" | "soft";
export type ButtonSize = "sm" | "md" | "lg";

type SharedProps = {
  variant?: ButtonVariant;
  size?: ButtonSize;
  full?: boolean;
  loading?: boolean;
  icon?: ReactNode;
  iconRight?: ReactNode;
};

export const buttonStyles = (
  {
    variant = "primary",
    size = "md",
    full,
    className,
  }: SharedProps & { className?: string },
) =>
  cn(
    "group relative inline-flex select-none items-center justify-center gap-2 rounded-full font-medium tracking-tight transition-colors duration-300",
    "disabled:pointer-events-none disabled:opacity-50",
    {
      primary:
        "bg-ink-900 text-sand-50 hover:bg-ink-800 dark:bg-sand-100 dark:text-ink-950 dark:hover:bg-white",
      gold: "bg-gold-500 text-white shadow-gold hover:bg-gold-600",
      outline:
        "border border-ink-900/15 text-ink-900 hover:border-ink-900/45 hover:bg-ink-900/[0.04] dark:border-sand-100/20 dark:text-sand-100 dark:hover:border-sand-100/50",
      ghost:
        "text-ink-700 hover:bg-ink-900/[0.06] dark:text-sand-200 dark:hover:bg-sand-100/10",
      soft: "bg-sand-100 text-ink-900 hover:bg-sand-200 dark:bg-ink-800 dark:text-sand-100 dark:hover:bg-ink-700",
    }[variant],
    {
      sm: "h-10 px-4 text-sm",
      md: "h-12 px-6 text-sm",
      lg: "h-14 px-8 text-[15px]",
    }[size],
    full && "w-full",
    className,
  );

type ButtonProps = SharedProps &
  Omit<
    ButtonHTMLAttributes<HTMLButtonElement>,
    | "onDrag"
    | "onDragStart"
    | "onDragEnd"
    | "onAnimationStart"
    | "onAnimationEnd"
    | "onAnimationIteration"
    | "onTransitionEnd"
  > & { className?: string };

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(function Button(
  {
    variant,
    size,
    full,
    loading = false,
    icon,
    iconRight,
    className,
    children,
    disabled,
    ...rest
  },
  ref,
) {
  return (
    <motion.button
      ref={ref}
      whileHover={{ y: -1 }}
      whileTap={{ scale: 0.97 }}
      transition={SPRING}
      className={buttonStyles({ variant, size, full, className })}
      disabled={disabled || loading}
      {...rest}
    >
      {loading ? (
        <Loader2 className="h-4 w-4 animate-spin" aria-hidden />
      ) : (
        icon
      )}
      <span>{children}</span>
      {iconRight && !loading ? (
        <span className="transition-transform duration-300 group-hover:translate-x-0.5">
          {iconRight}
        </span>
      ) : null}
    </motion.button>
  );
});

type LinkButtonProps = SharedProps & {
  href: string;
  className?: string;
  children?: ReactNode;
  onClick?: () => void;
  target?: string;
  rel?: string;
  ariaLabel?: string;
  prefetch?: boolean;
};

export function LinkButton({
  href,
  variant,
  size,
  full,
  icon,
  iconRight,
  className,
  children,
  onClick,
  target,
  rel,
  ariaLabel,
  prefetch,
}: LinkButtonProps) {
  return (
    <motion.span
      whileHover={{ y: -1 }}
      whileTap={{ scale: 0.97 }}
      transition={SPRING}
      className={cn("inline-flex", full && "w-full")}
    >
      <Link
        href={href}
        onClick={onClick}
        target={target}
        rel={rel}
        aria-label={ariaLabel}
        prefetch={prefetch}
        className={buttonStyles({ variant, size, full, className })}
      >
        {icon}
        <span>{children}</span>
        {iconRight ? (
          <span className="transition-transform duration-300 group-hover:translate-x-0.5">
            {iconRight}
          </span>
        ) : null}
      </Link>
    </motion.span>
  );
}
