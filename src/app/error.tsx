"use client";

import { useEffect } from "react";
import { AlertTriangle, RotateCcw } from "lucide-react";
import { Button, LinkButton } from "@/components/ui/button";

/** Root error boundary — resets in place, links home as a fallback. */
export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="container-x flex flex-1 flex-col items-center justify-center py-32 text-center">
      <span className="flex h-14 w-14 items-center justify-center rounded-2xl bg-claret-100 text-claret-500 dark:bg-claret-500/15">
        <AlertTriangle className="h-6 w-6" aria-hidden />
      </span>
      <h1 className="mt-6 font-display text-3xl tracking-tight text-ink-950 sm:text-4xl dark:text-sand-50">
        Something went sideways
      </h1>
      <p className="mt-3 max-w-md text-base text-ink-500 dark:text-ink-300">
        Our concierge desk has been notified. Try again — or head back to the
        collection if the problem persists.
      </p>
      <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
        <Button variant="gold" onClick={reset} icon={<RotateCcw className="h-4 w-4" />}>
          Try again
        </Button>
        <LinkButton href="/" variant="outline">
          Back home
        </LinkButton>
      </div>
    </div>
  );
}
