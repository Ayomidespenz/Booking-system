"use client";

import { useState } from "react";
import Image from "next/image";
import { ImageOff } from "lucide-react";
import { cn } from "@/lib/utils";

/**
 * next/image wrapper with a shimmering load state and an editorial gradient
 * fallback if the remote asset ever fails.
 */
export function SmartImage({
  src,
  alt,
  className,
  sizes = "(max-width: 768px) 100vw, 50vw",
  priority = false,
  position = "center",
}: {
  src: string;
  alt: string;
  className?: string;
  sizes?: string;
  priority?: boolean;
  position?: string;
}) {
  const [status, setStatus] = useState<"loading" | "ready" | "error">("loading");

  return (
    <div
      className={cn(
        "relative overflow-hidden bg-gradient-to-br from-sand-200 via-sand-100 to-sand-300 dark:from-ink-800 dark:via-ink-900 dark:to-ink-800",
        className,
      )}
    >
      {status === "error" ? (
        <div className="absolute inset-0 flex flex-col items-center justify-center gap-2 text-ink-400">
          <span className="font-display text-3xl italic tracking-tight text-gold-600/70 dark:text-gold-400/70">
            V
          </span>
          <ImageOff className="h-4 w-4" />
        </div>
      ) : (
        <>
          <Image
            src={src}
            alt={alt}
            fill
            sizes={sizes}
            loading={priority ? "eager" : undefined}
            className={cn(
              "object-cover transition-all duration-700 ease-out",
              status === "ready" ? "opacity-100" : "opacity-0",
            )}
            style={{ objectPosition: position }}
            onLoad={() => setStatus("ready")}
            onError={() => setStatus("error")}
          />
          {status === "loading" ? (
            <div className="absolute inset-0 animate-shimmer" aria-hidden />
          ) : null}
        </>
      )}
    </div>
  );
}
