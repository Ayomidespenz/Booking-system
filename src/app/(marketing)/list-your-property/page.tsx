import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft, ArrowRight, ShieldCheck } from "lucide-react";
import { PropertyLeadForm } from "@/components/shared/property-lead-form";

export const metadata: Metadata = {
  title: "List your property",
  description: "Preview the property partner onboarding experience for Ijebu Ode.",
};

export default function ListYourPropertyPage() {
  return (
    <div className="container-x flex-1 py-10 sm:py-16">
      <Link href="/" className="inline-flex items-center gap-2 text-sm font-medium text-ink-500 hover:text-gold-700 dark:text-ink-300 dark:hover:text-gold-300">
        <ArrowLeft className="h-4 w-4" aria-hidden />
        Back to home
      </Link>
      <div className="mx-auto mt-8 grid max-w-6xl gap-10 lg:grid-cols-[0.8fr_1.2fr] lg:gap-16">
        <div>
          <p className="text-xs font-bold uppercase tracking-[0.24em] text-gold-700 dark:text-gold-400">For local property owners</p>
          <h1 className="mt-3 font-display text-4xl leading-tight text-ink-950 dark:text-sand-50 sm:text-5xl">
            Bring your property online, with local support.
          </h1>
          <p className="mt-5 text-base leading-7 text-ink-600 dark:text-ink-300">
            The Ijebu Ode marketplace is being prepared with local hotels and shortlet hosts. Share a few basic details to preview the partner onboarding flow.
          </p>
          <ul className="mt-7 space-y-4 text-sm text-ink-600 dark:text-sand-200">
            {[
              "Build a clear property profile and room or apartment list.",
              "Manage bookings, availability, and day-to-day operations.",
              "Review performance and keep your team aligned.",
            ].map((item) => (
              <li key={item} className="flex items-start gap-3">
                <ShieldCheck className="mt-0.5 h-4 w-4 shrink-0 text-sage-500" aria-hidden />
                {item}
              </li>
            ))}
          </ul>
          <div className="mt-8 flex flex-wrap gap-x-5 gap-y-3">
            <Link href="/partner/register" className="inline-flex items-center gap-2 text-sm font-semibold text-gold-700 hover:text-gold-600 dark:text-gold-300">
              Register as a partner <ArrowRight className="h-4 w-4" aria-hidden />
            </Link>
            <Link href="/partner/login" className="inline-flex items-center gap-2 text-sm font-semibold text-ink-600 hover:text-gold-700 dark:text-sand-200 dark:hover:text-gold-300">
              Partner sign in
            </Link>
          </div>
        </div>
        <PropertyLeadForm />
      </div>
    </div>
  );
}
