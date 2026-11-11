import Link from "next/link";
import { Headphones, Lock } from "lucide-react";
import { Logo } from "@/components/shared/logo";
import { SITE } from "@/lib/data/site";

/** Slim, reassurance-first chrome for the booking flow (no marketing nav). */
export function CheckoutBar() {
  return (
    <header className="sticky top-0 z-[70] border-b border-ink-900/[0.07] bg-sand-50/85 backdrop-blur-xl dark:border-sand-100/10 dark:bg-ink-950/85">
      <div className="container-x flex h-16 items-center justify-between gap-4">
        <Logo />

        <span className="hidden items-center gap-2 text-[11px] font-bold uppercase tracking-[0.22em] text-sage-500 sm:inline-flex">
          <Lock className="h-3.5 w-3.5" />
          Secure booking
        </span>

        <Link
          href={`tel:${SITE.phone.replace(/[^+\d]/g, "")}`}
          className="link-underline inline-flex items-center gap-2 text-sm font-medium text-ink-600 transition-colors hover:text-ink-950 dark:text-sand-300 dark:hover:text-sand-50"
        >
          <Headphones className="h-4 w-4 text-gold-600 dark:text-gold-400" />
          <span className="hidden sm:inline">Concierge</span>
        </Link>
      </div>
    </header>
  );
}
