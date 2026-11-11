import type { ReactNode } from "react";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";

/** Storefront chrome: fixed header (transparent over the home hero) + footer. */
export default function MarketingLayout({ children }: { children: ReactNode }) {
  return (
    <>
      <Header />
      <div className="relative z-[60] border-b border-gold-500/20 bg-gold-50 px-4 py-2 text-center text-xs leading-5 text-ink-700 dark:bg-ink-900 dark:text-sand-200" role="status">
        Preview website: listings, photos, prices, ratings, and availability are sample content only. No booking is confirmed here.
      </div>
      <main className="flex min-h-screen flex-col">{children}</main>
      <Footer />
    </>
  );
}
