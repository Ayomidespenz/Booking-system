"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Check, ChevronDown, Menu, Moon, Sun } from "lucide-react";
import { Logo } from "@/components/shared/logo";
import { LinkButton } from "@/components/ui/button";
import { Dropdown } from "@/components/ui/dropdown";
import { MobileMenu } from "@/components/layout/mobile-menu";
import { useCurrency, type CurrencyCode } from "@/context/currency-provider";
import { useTheme } from "@/context/theme-provider";
import { NAV_LINKS } from "@/lib/data/site";

export function Header() {
  const pathname = usePathname();
  const { theme, toggleTheme } = useTheme();
  const { currency, setCurrency, currencies } = useCurrency();
  const [menuOpen, setMenuOpen] = useState(false);

  const isActive = (href: string) =>
    href === "/" ? pathname === "/" : pathname.startsWith(href);

  return (
    <>
      <motion.header
        className="sticky top-0 z-[70] border-b border-ink-900/[0.07] bg-sand-50/95 shadow-soft backdrop-blur-xl transition-colors duration-300 dark:border-sand-100/10 dark:bg-ink-950/95"
      >
        <div className="container-x flex h-[4.5rem] items-center justify-between gap-3 sm:gap-5">
          <Logo tone="dark" className="shrink-0" />

          <nav className="hidden 2xl:flex items-center gap-5" aria-label="Primary">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                data-active={isActive(link.href)}
                className="link-underline whitespace-nowrap py-1 text-[11px] font-semibold uppercase tracking-[0.12em] text-ink-600 transition-colors duration-300 hover:text-ink-950 data-[active=true]:text-ink-950 dark:text-sand-300 dark:hover:text-sand-50 dark:data-[active=true]:text-sand-50"
              >
                {link.label}
              </Link>
            ))}
          </nav>

          <div className="flex items-center gap-2 sm:gap-3">
            {/* Currency */}
            <Dropdown
              align="right"
              className="hidden xl:block"
              panelClassName="w-44 rounded-2xl border border-ink-900/8 bg-sand-50 p-1.5 shadow-lift dark:border-sand-100/10 dark:bg-ink-900"
              trigger={
                <span
                  className="flex h-10 items-center gap-1.5 rounded-full px-3 text-[12px] font-bold tracking-wider text-ink-600 transition-colors hover:bg-ink-900/[0.06] dark:text-sand-300 dark:hover:bg-sand-100/10"
                >
                  {currency}
                  <ChevronDown className="h-3 w-3 opacity-60" />
                </span>
              }
            >
              {({ close }) =>
                currencies.map((meta) => (
                  <button
                    key={meta.code}
                    type="button"
                    onClick={() => {
                      setCurrency(meta.code as CurrencyCode);
                      close();
                    }}
                    className="flex w-full items-center justify-between rounded-xl px-3 py-2 text-sm text-ink-700 transition-colors hover:bg-white dark:text-sand-200 dark:hover:bg-ink-800"
                  >
                    <span className="font-medium">
                      {meta.code}
                      <span className="ml-2 text-xs font-normal text-ink-400">
                        {meta.symbol}
                      </span>
                    </span>
                    {currency === meta.code ? (
                      <Check className="h-3.5 w-3.5 text-gold-600 dark:text-gold-400" />
                    ) : null}
                  </button>
                ))
              }
            </Dropdown>

            {/* Theme */}
            <button
              type="button"
              onClick={toggleTheme}
              aria-label="Toggle colour theme"
              className="flex h-10 w-10 items-center justify-center rounded-full text-ink-600 transition-colors hover:bg-ink-900/[0.06] dark:text-sand-300 dark:hover:bg-sand-100/10"
            >
              <AnimatePresence mode="wait" initial={false}>
                <motion.span
                  key={theme}
                  initial={{ rotate: -90, scale: 0.5, opacity: 0 }}
                  animate={{ rotate: 0, scale: 1, opacity: 1 }}
                  exit={{ rotate: 90, scale: 0.5, opacity: 0 }}
                  transition={{ duration: 0.28 }}
                >
                  {theme === "dark" ? (
                    <Moon className="h-[17px] w-[17px]" />
                  ) : (
                    <Sun className="h-[17px] w-[17px]" />
                  )}
                </motion.span>
              </AnimatePresence>
            </button>

            <LinkButton href="/guest/login" variant="outline" size="sm" className="hidden sm:inline-flex">
              Sign in
            </LinkButton>

            <LinkButton
              href="/hotels"
              variant="gold"
              size="sm"
              className="hidden md:inline-flex"
            >
              Book now
            </LinkButton>

            <button
              type="button"
              onClick={() => setMenuOpen(true)}
              aria-label="Open menu"
              className="flex h-10 w-10 items-center justify-center rounded-full text-ink-700 transition-colors hover:bg-ink-900/[0.06] dark:text-sand-200 dark:hover:bg-sand-100/10 2xl:hidden"
            >
              <Menu className="h-5 w-5" />
            </button>
          </div>
        </div>
      </motion.header>

      <MobileMenu open={menuOpen} onClose={() => setMenuOpen(false)} />
    </>
  );
}
