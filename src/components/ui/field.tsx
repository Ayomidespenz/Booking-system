"use client";

import {
  forwardRef,
  useEffect,
  useState,
  type InputHTMLAttributes,
  type ReactNode,
  type SelectHTMLAttributes,
  type TextareaHTMLAttributes,
} from "react";
import { cn } from "@/lib/utils";

/* ------------------------------- field shell ------------------------------ */

function useShake(error?: string) {
  const [shaking, setShaking] = useState(false);

  useEffect(() => {
    if (!error) return;
    setShaking(true);
    const timer = setTimeout(() => setShaking(false), 600);
    return () => clearTimeout(timer);
  }, [error]);

  return shaking;
}

const labelClass =
  "mb-2 block text-[11px] font-semibold uppercase tracking-[0.18em] text-ink-500 dark:text-ink-400";

const controlClass = (hasIcon: boolean, invalid: boolean) =>
  cn(
    "w-full rounded-xl border bg-white/70 px-4 text-[15px] text-ink-900 backdrop-blur-sm transition-all duration-300",
    "placeholder:text-ink-400 focus:outline-none focus:ring-2",
    "dark:bg-ink-900/60 dark:text-sand-100 dark:placeholder:text-ink-400",
    hasIcon && "pl-11",
    invalid
      ? "border-claret-500/60 focus:border-claret-500 focus:ring-claret-500/20"
      : "border-ink-900/12 focus:border-gold-500 focus:ring-gold-500/20 dark:border-sand-100/12 dark:focus:border-gold-400",
  );

function FieldMessage({
  error,
  hint,
}: {
  error?: string;
  hint?: ReactNode;
}) {
  if (error) {
    return (
      <p className="mt-1.5 text-xs font-medium text-claret-500" role="alert">
        {error}
      </p>
    );
  }
  if (hint) {
    return <p className="mt-1.5 text-xs text-ink-400">{hint}</p>;
  }
  return null;
}

/* --------------------------------- inputs --------------------------------- */

type TextInputProps = InputHTMLAttributes<HTMLInputElement> & {
  label?: string;
  error?: string;
  hint?: ReactNode;
  icon?: ReactNode;
  containerClassName?: string;
};

export const TextInput = forwardRef<HTMLInputElement, TextInputProps>(
  function TextInput(
    { label, error, hint, icon, containerClassName, className, id, ...rest },
    ref,
  ) {
    const shaking = useShake(error);
    const inputId = id ?? rest.name;

    return (
      <div className={cn(shaking && "animate-shake", containerClassName)}>
        {label ? (
          <label htmlFor={inputId} className={labelClass}>
            {label}
          </label>
        ) : null}
        <div className="relative">
          {icon ? (
            <span className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-ink-400">
              {icon}
            </span>
          ) : null}
          <input
            ref={ref}
            id={inputId}
            aria-invalid={Boolean(error)}
            className={cn(controlClass(Boolean(icon), Boolean(error)), "h-12", className)}
            {...rest}
          />
        </div>
        <FieldMessage error={error} hint={hint} />
      </div>
    );
  },
);

type TextAreaProps = TextareaHTMLAttributes<HTMLTextAreaElement> & {
  label?: string;
  error?: string;
  hint?: ReactNode;
};

export const TextArea = forwardRef<HTMLTextAreaElement, TextAreaProps>(
  function TextArea({ label, error, hint, className, id, ...rest }, ref) {
    const shaking = useShake(error);
    const inputId = id ?? rest.name;

    return (
      <div className={shaking ? "animate-shake" : undefined}>
        {label ? (
          <label htmlFor={inputId} className={labelClass}>
            {label}
          </label>
        ) : null}
        <textarea
          ref={ref}
          id={inputId}
          aria-invalid={Boolean(error)}
          className={cn(
            controlClass(false, Boolean(error)),
            "min-h-28 resize-none py-3.5 leading-relaxed",
            className,
          )}
          {...rest}
        />
        <FieldMessage error={error} hint={hint} />
      </div>
    );
  },
);

type SelectProps = SelectHTMLAttributes<HTMLSelectElement> & {
  label?: string;
  error?: string;
  options: Array<{ value: string; label: string }>;
  containerClassName?: string;
};

export function Select({
  label,
  error,
  options,
  containerClassName,
  className,
  id,
  ...rest
}: SelectProps) {
  const shaking = useShake(error);
  const selectId = id ?? rest.name;

  return (
    <div className={cn(shaking && "animate-shake", containerClassName)}>
      {label ? (
        <label htmlFor={selectId} className={labelClass}>
          {label}
        </label>
      ) : null}
      <div className="relative">
        <select
          id={selectId}
          aria-invalid={Boolean(error)}
          className={cn(
            controlClass(false, Boolean(error)),
            "h-12 appearance-none pr-10",
            className,
          )}
          {...rest}
        >
          {options.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
        <svg
          className="pointer-events-none absolute right-4 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-ink-400"
          viewBox="0 0 12 8"
          fill="none"
          aria-hidden
        >
          <path
            d="M1 1.5 6 6.5 11 1.5"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
          />
        </svg>
      </div>
      <FieldMessage error={error} />
    </div>
  );
}
