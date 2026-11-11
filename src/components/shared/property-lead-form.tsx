"use client";

import { useState, type FormEvent } from "react";
import { CheckCircle2 } from "lucide-react";

export function PropertyLeadForm() {
  const [previewReady, setPreviewReady] = useState(false);

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setPreviewReady(true);
  }

  return (
    <div className="rounded-2xl border border-ink-900/10 bg-white p-5 shadow-soft dark:border-sand-100/10 dark:bg-ink-900 sm:p-8">
      {previewReady ? (
        <div className="py-6" role="status" aria-live="polite">
          <CheckCircle2 className="h-10 w-10 text-sage-500" aria-hidden />
          <h2 className="mt-5 font-display text-2xl text-ink-950 dark:text-sand-50">Your preview is complete.</h2>
          <p className="mt-3 max-w-lg text-sm leading-6 text-ink-600 dark:text-ink-300">
            This frontend does not send or store submissions. Once your backend is ready, this form can submit the same details to your onboarding workflow.
          </p>
          <button
            type="button"
            onClick={() => setPreviewReady(false)}
            className="mt-6 text-sm font-semibold text-gold-700 underline underline-offset-4 hover:text-gold-600 dark:text-gold-300"
          >
            Edit details
          </button>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-5">
          <div className="grid gap-5 sm:grid-cols-2">
            <label className="block text-sm font-medium text-ink-700 dark:text-sand-200">
              Property name
              <input
                name="propertyName"
                required
                autoComplete="organization"
                className="mt-2 h-12 w-full rounded-lg border border-ink-900/15 bg-sand-50 px-3 text-ink-900 outline-none transition focus:border-gold-500 focus:ring-2 focus:ring-gold-500/20 dark:border-sand-100/15 dark:bg-ink-950 dark:text-sand-100"
                placeholder="Your hotel or apartment"
              />
            </label>
            <label className="block text-sm font-medium text-ink-700 dark:text-sand-200">
              Property type
              <select
                name="propertyType"
                required
                defaultValue=""
                className="mt-2 h-12 w-full rounded-lg border border-ink-900/15 bg-sand-50 px-3 text-ink-900 outline-none transition focus:border-gold-500 focus:ring-2 focus:ring-gold-500/20 dark:border-sand-100/15 dark:bg-ink-950 dark:text-sand-100"
              >
                <option value="" disabled>Select property type</option>
                <option value="hotel">Hotel</option>
                <option value="shortlet">Shortlet apartment</option>
              </select>
            </label>
            <label className="block text-sm font-medium text-ink-700 dark:text-sand-200">
              Area or nearest landmark
              <input
                name="area"
                required
                autoComplete="address-level2"
                className="mt-2 h-12 w-full rounded-lg border border-ink-900/15 bg-sand-50 px-3 text-ink-900 outline-none transition focus:border-gold-500 focus:ring-2 focus:ring-gold-500/20 dark:border-sand-100/15 dark:bg-ink-950 dark:text-sand-100"
                placeholder="Ijebu Ode or nearby area"
              />
            </label>
            <label className="block text-sm font-medium text-ink-700 dark:text-sand-200">
              Number of rooms or units
              <input
                name="units"
                type="number"
                min="1"
                required
                className="mt-2 h-12 w-full rounded-lg border border-ink-900/15 bg-sand-50 px-3 text-ink-900 outline-none transition focus:border-gold-500 focus:ring-2 focus:ring-gold-500/20 dark:border-sand-100/15 dark:bg-ink-950 dark:text-sand-100"
                placeholder="e.g. 12"
              />
            </label>
            <label className="block text-sm font-medium text-ink-700 dark:text-sand-200">
              Contact name
              <input
                name="contactName"
                required
                autoComplete="name"
                className="mt-2 h-12 w-full rounded-lg border border-ink-900/15 bg-sand-50 px-3 text-ink-900 outline-none transition focus:border-gold-500 focus:ring-2 focus:ring-gold-500/20 dark:border-sand-100/15 dark:bg-ink-950 dark:text-sand-100"
                placeholder="Your full name"
              />
            </label>
            <label className="block text-sm font-medium text-ink-700 dark:text-sand-200">
              Phone number
              <input
                name="phone"
                type="tel"
                required
                autoComplete="tel"
                inputMode="tel"
                className="mt-2 h-12 w-full rounded-lg border border-ink-900/15 bg-sand-50 px-3 text-ink-900 outline-none transition focus:border-gold-500 focus:ring-2 focus:ring-gold-500/20 dark:border-sand-100/15 dark:bg-ink-950 dark:text-sand-100"
                placeholder="+234"
              />
            </label>
          </div>
          <p className="text-xs leading-5 text-ink-400">
            Preview only. Do not enter sensitive documents or payment details.
          </p>
          <button type="submit" className="inline-flex h-12 w-full items-center justify-center rounded-full bg-gold-500 px-6 text-sm font-semibold text-white transition-colors hover:bg-gold-600 sm:w-auto">
            Preview partner onboarding
          </button>
        </form>
      )}
    </div>
  );
}
