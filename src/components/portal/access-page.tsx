"use client";

import Link from "next/link";
import { useState, type FormEvent, type ReactNode } from "react";
import { ArrowLeft, ArrowRight, CheckCircle2 } from "lucide-react";
import { Logo } from "@/components/shared/logo";
import type { PortalKind } from "@/lib/data/portal-demo";

type AccessPageProps = {
  portal: PortalKind | "guest";
  mode: "login" | "register";
};

const accessCopy = {
  guest: {
    name: "Guest",
    loginTitle: "Welcome back.",
    registerTitle: "Create your guest account.",
    loginDescription: "Sign in to review your stays and keep your travel details together.",
    registerDescription: "Create an account to keep your booking details and guest preferences together.",
    loginHref: "/guest/login",
    registerHref: "/guest/register",
  },
  partner: {
    name: "Partner",
    loginTitle: "Welcome to your workspace.",
    registerTitle: "Register your property.",
    loginDescription: "Sign in to preview property operations, bookings, and owner insights.",
    registerDescription: "Tell us about your hotel or shortlet to preview the distinct partner onboarding experience.",
    loginHref: "/partner/login",
    registerHref: "/partner/register",
  },
  admin: {
    name: "Administrator",
    loginTitle: "Platform operations.",
    registerTitle: "",
    loginDescription: "Sign in to preview marketplace verification, payments, and support workflows.",
    registerDescription: "",
    loginHref: "/admin/login",
    registerHref: "",
  },
} as const;

function Field({
  label,
  name,
  type = "text",
  autoComplete,
  placeholder,
  required = true,
  min,
  minLength,
  children,
}: {
  label: string;
  name: string;
  type?: string;
  autoComplete?: string;
  placeholder?: string;
  required?: boolean;
  min?: number;
  minLength?: number;
  children?: ReactNode;
}) {
  const controlClassName = "mt-2 h-12 w-full rounded-lg border border-ink-900/15 bg-sand-50 px-3 text-sm text-ink-900 outline-none transition placeholder:text-ink-400 focus:border-gold-500 focus:ring-2 focus:ring-gold-500/20 dark:border-sand-100/15 dark:bg-ink-950 dark:text-sand-100";

  return (
    <label className="block text-sm font-medium text-ink-700 dark:text-sand-200">
      {label}
      {children ?? (
        <input
          className={controlClassName}
          name={name}
          type={type}
          autoComplete={autoComplete}
          placeholder={placeholder}
          required={required}
          min={min}
          minLength={minLength}
        />
      )}
    </label>
  );
}

function RegistrationFields({ portal }: { portal: "guest" | "partner" }) {
  if (portal === "guest") {
    return (
      <>
        <Field label="Full name" name="name" autoComplete="name" placeholder="Your full name" />
        <Field label="Email address" name="email" type="email" autoComplete="email" placeholder="you@example.com" />
        <Field label="Phone number" name="phone" type="tel" autoComplete="tel" placeholder="+234" />
        <Field label="Create password" name="password" type="password" autoComplete="new-password" placeholder="At least 8 characters" minLength={8} />
      </>
    );
  }

  return (
    <>
      <Field label="Your name" name="name" autoComplete="name" placeholder="Property owner or manager" />
      <Field label="Work email" name="email" type="email" autoComplete="email" placeholder="you@yourproperty.com" />
      <Field label="Phone number" name="phone" type="tel" autoComplete="tel" placeholder="+234" />
      <Field label="Property name" name="propertyName" autoComplete="organization" placeholder="Hotel or apartment name" />
      <Field label="Property type" name="propertyType">
        <select name="propertyType" required defaultValue="" className="mt-2 h-12 w-full rounded-lg border border-ink-900/15 bg-sand-50 px-3 text-sm text-ink-900 outline-none transition focus:border-gold-500 focus:ring-2 focus:ring-gold-500/20 dark:border-sand-100/15 dark:bg-ink-950 dark:text-sand-100">
          <option value="" disabled>Select property type</option>
          <option value="hotel">Hotel</option>
          <option value="shortlet">Shortlet apartment</option>
        </select>
      </Field>
      <Field label="Property area or nearest landmark" name="area" placeholder="Ijebu Ode or nearby area" />
      <Field label="Number of rooms or units" name="unitCount" type="number" placeholder="e.g. 12" min={1} />
      <Field label="Create password" name="password" type="password" autoComplete="new-password" placeholder="At least 8 characters" minLength={8} />
    </>
  );
}

export function AccessPage({ portal, mode }: AccessPageProps) {
  const [previewSubmitted, setPreviewSubmitted] = useState(false);
  const isRegister = mode === "register";
  const copy = accessCopy[portal];
  const isGuest = portal === "guest";
  const isAdmin = portal === "admin";
  const title = isRegister ? copy.registerTitle : copy.loginTitle;
  const description = isRegister ? copy.registerDescription : copy.loginDescription;

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setPreviewSubmitted(true);
  }

  return (
    <main className="min-h-screen bg-sand-100/70 px-4 py-8 dark:bg-ink-950 sm:py-12">
      <div className="mx-auto w-full max-w-5xl">
        <div className="flex items-center justify-between gap-4">
          <Logo />
          <Link href="/" className="inline-flex items-center gap-2 text-sm font-medium text-ink-500 hover:text-gold-700 dark:text-ink-300 dark:hover:text-gold-300">
            <ArrowLeft className="h-4 w-4" aria-hidden />
            Guest site
          </Link>
        </div>

        <div className={`mt-8 grid overflow-hidden rounded-2xl border border-ink-900/10 bg-white shadow-soft dark:border-sand-100/10 dark:bg-ink-900 ${isGuest ? "lg:grid-cols-[0.85fr_1.15fr]" : "lg:grid-cols-[0.95fr_1.05fr]"}`}>
          <aside className="relative overflow-hidden bg-ink-900 p-6 text-sand-50 sm:p-9 lg:p-11">
            <div className="absolute -right-20 -top-20 h-60 w-60 rounded-full bg-gold-500/20 blur-3xl" aria-hidden />
            <div className="relative">
              <span className="inline-flex rounded-full border border-white/15 bg-white/5 px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.18em] text-gold-300">
                {copy.name} {isRegister ? "registration" : "access"} · preview
              </span>
              <h1 className="mt-6 font-display text-3xl leading-tight sm:text-4xl">{title}</h1>
              <p className="mt-4 max-w-md text-sm leading-6 text-sand-300">{description}</p>

              <div className="mt-8 rounded-xl border border-white/10 bg-white/5 p-4">
                <p className="text-sm font-semibold text-sand-100">
                  {isGuest ? "For people planning a stay" : isAdmin ? "Restricted platform access" : "For hotels and shortlet hosts"}
                </p>
                <p className="mt-2 text-xs leading-5 text-sand-300">
                  {isGuest
                    ? "Guest accounts keep traveller details separate from property operations."
                    : isAdmin
                      ? "Admin accounts are created by the platform team. There is no public admin registration."
                      : "Partner onboarding collects business and property details, separately from guest registration."}
                </p>
              </div>

              {portal === "partner" ? (
                <Link href="/list-your-property" className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-gold-300 hover:text-gold-200">
                  Learn about listing a property <ArrowRight className="h-4 w-4" aria-hidden />
                </Link>
              ) : null}
            </div>
          </aside>

          <section className="p-6 sm:p-9 lg:p-11">
            <div className="mb-6">
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-gold-700 dark:text-gold-400">
                {isRegister ? "New account" : "Secure sign in"} · {portal === "admin" ? "Platform team" : portal === "partner" ? "Ijebu Ode partners" : "Guest account"}
              </p>
              <h2 className="mt-2 font-display text-2xl text-ink-950 dark:text-sand-50">
                {isRegister ? (isGuest ? "Your travel profile" : "Your property details") : "Your sign-in details"}
              </h2>
            </div>

            {previewSubmitted ? (
              <div className="rounded-xl border border-sage-500/25 bg-sage-100/70 p-5 dark:bg-sage-500/10" role="status" aria-live="polite">
                <CheckCircle2 className="h-8 w-8 text-sage-500" aria-hidden />
                <h3 className="mt-4 font-semibold text-ink-900 dark:text-sand-100">Preview form submitted.</h3>
                <p className="mt-2 text-sm leading-6 text-ink-600 dark:text-ink-300">
                  No account was {isRegister ? "created" : "authenticated"} and no information was sent or saved. Connect this form to your {copy.name.toLowerCase()} API when the backend is ready.
                </p>
                <button type="button" onClick={() => setPreviewSubmitted(false)} className="mt-4 text-sm font-semibold text-gold-700 underline underline-offset-4 hover:text-gold-600 dark:text-gold-300">
                  Return to form
                </button>
              </div>
            ) : (
              <>
                <form onSubmit={handleSubmit} className="space-y-4">
                  {isRegister && !isAdmin ? (
                    <RegistrationFields portal={portal} />
                  ) : (
                    <>
                      <Field label={isAdmin ? "Administrator email" : "Email address"} name="email" type="email" autoComplete="username" placeholder={isAdmin ? "admin@yourcompany.com" : "you@example.com"} />
                      <Field label="Password" name="password" type="password" autoComplete="current-password" placeholder="Enter your password" />
                    </>
                  )}
                  {!isRegister && !isAdmin ? (
                    <div className="flex justify-end">
                      <Link href={`${copy.loginHref}?help=password`} className="text-xs font-semibold text-gold-700 hover:text-gold-600 dark:text-gold-300">
                        Forgot password?
                      </Link>
                    </div>
                  ) : null}
                  {isAdmin ? (
                    <p className="rounded-lg bg-sand-100 p-3 text-xs leading-5 text-ink-500 dark:bg-ink-800 dark:text-ink-300">
                      Admin access is provisioned internally. There is no public administrator registration.
                    </p>
                  ) : null}
                  <button type="submit" className="inline-flex h-12 w-full items-center justify-center gap-2 rounded-full bg-gold-500 px-5 text-sm font-semibold text-white transition-colors hover:bg-gold-600">
                    {isRegister ? (isGuest ? "Preview guest registration" : "Preview partner registration") : "Preview sign in"}
                    <ArrowRight className="h-4 w-4" aria-hidden />
                  </button>
                </form>

                <p className="mt-4 text-center text-xs leading-5 text-ink-400">
                  Frontend-only preview. Authentication and account data are not connected.
                </p>

                {!isAdmin ? (
                  <p className="mt-6 border-t border-ink-900/10 pt-5 text-center text-sm text-ink-500 dark:border-sand-100/10 dark:text-ink-300">
                    {isRegister ? "Already have an account?" : "New to the platform?"}{" "}
                    <Link href={isRegister ? copy.loginHref : copy.registerHref} className="font-semibold text-gold-700 hover:text-gold-600 dark:text-gold-300">
                      {isRegister ? "Sign in" : (isGuest ? "Create a guest account" : "Register as a partner")}
                    </Link>
                  </p>
                ) : null}

                {isGuest ? (
                  <p className="mt-4 text-center text-xs text-ink-400">
                    Managing a property? <Link href="/partner/login" className="font-semibold text-ink-600 hover:text-gold-700 dark:text-sand-200 dark:hover:text-gold-300">Partner sign in</Link>
                  </p>
                ) : null}
                {portal === "partner" ? (
                  <p className="mt-4 text-center text-xs text-ink-400">
                    Looking for a stay? <Link href="/guest/login" className="font-semibold text-ink-600 hover:text-gold-700 dark:text-sand-200 dark:hover:text-gold-300">Guest sign in</Link>
                  </p>
                ) : null}
              </>
            )}
          </section>
        </div>

        <p className="mt-5 text-center text-xs text-ink-400">
          Separate guest, partner, and administrator access · demo data only
        </p>
      </div>
    </main>
  );
}
