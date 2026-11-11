"use client";

import { useState, type FormEvent } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowRight, Check } from "lucide-react";
import { EASE, SNAPPY } from "@/animations/variants";
import { cn } from "@/lib/utils";

/** Inline newsletter form with a validating success transition. */
export function FooterNewsletter() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "error" | "done">("idle");

  const submit = (event: FormEvent) => {
    event.preventDefault();
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setStatus("error");
      return;
    }
    setStatus("done");
  };

  return (
    <div className="max-w-sm">
      <AnimatePresence mode="wait">
        {status === "done" ? (
          <motion.div
            key="done"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={SNAPPY}
            className="flex items-center gap-3 rounded-2xl border border-gold-500/30 bg-gold-500/10 px-4 py-3.5"
          >
            <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-gold-500 text-white">
              <Check className="h-4 w-4" />
            </span>
            <p className="text-sm text-sand-100">
              You're on the list — destinations worth waking up for, monthly.
            </p>
          </motion.div>
        ) : (
          <motion.form
            key="form"
            onSubmit={submit}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.25, ease: EASE }}
            className={cn("space-y-2", status === "error" && "animate-shake")}
          >
            <div className="flex items-center gap-2 rounded-full border border-white/15 bg-white/[0.04] p-1.5 pl-5 transition-colors focus-within:border-gold-500/70">
              <input
                type="email"
                value={email}
                onChange={(event) => {
                  setEmail(event.target.value);
                  if (status === "error") setStatus("idle");
                }}
                placeholder="Your email address"
                aria-label="Email address"
                className="w-full bg-transparent text-sm text-sand-100 placeholder:text-sand-500 focus:outline-none"
              />
              <button
                type="submit"
                aria-label="Subscribe"
                className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-gold-500 text-white transition-all duration-300 hover:bg-gold-600"
              >
                <ArrowRight className="h-4 w-4" />
              </button>
            </div>
            <p
              className={cn(
                "px-4 text-xs",
                status === "error" ? "text-claret-100" : "text-sand-500",
              )}
            >
              {status === "error"
                ? "Please enter a valid email address."
                : "One considered email a month. Unsubscribe anytime."}
            </p>
          </motion.form>
        )}
      </AnimatePresence>
    </div>
  );
}
