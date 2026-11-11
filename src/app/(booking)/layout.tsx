import type { ReactNode } from "react";
import { CheckoutBar } from "@/components/layout/checkout-bar";
import { SITE } from "@/lib/data/site";

/** Checkout chrome: focused single-column flow with a slim reassurance footer. */
export default function BookingLayout({ children }: { children: ReactNode }) {
  return (
    <div className="flex min-h-screen flex-col bg-sand-100/60 dark:bg-ink-950">
      <CheckoutBar />
      <main className="flex flex-1 flex-col">{children}</main>
      <footer className="border-t border-ink-900/[0.07] py-6 dark:border-sand-100/10">
        <div className="container-x flex flex-col items-center justify-between gap-3 text-xs text-ink-400 sm:flex-row">
          <span>
            © {SITE.name} — all rights reserved
          </span>
          <span className="inline-flex items-center gap-2">
            Need help? Call{" "}
            <a
              href={`tel:${SITE.phone.replace(/[^+\d]/g, "")}`}
              className="font-semibold text-ink-600 hover:text-gold-600 dark:text-sand-300 dark:hover:text-gold-400"
            >
              {SITE.phone}
            </a>
          </span>
        </div>
      </footer>
    </div>
  );
}
