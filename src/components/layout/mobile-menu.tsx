"use client";

import Link from "next/link";
import { useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { X } from "lucide-react";
import { Logo } from "@/components/shared/logo";
import { LinkButton } from "@/components/ui/button";
import { NAV_LINKS, SITE } from "@/lib/data/site";
import { EASE, staggerChildren, fadeUp, SNAPPY } from "@/animations/variants";

/** Full-screen navigation overlay with staggered editorial links. */
export function MobileMenu({
  open,
  onClose,
}: {
  open: boolean;
  onClose: () => void;
}) {
  useEffect(() => {
    if (!open) return;
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
    };
    document.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = previous;
      document.removeEventListener("keydown", onKey);
    };
  }, [open, onClose]);

  return (
    <AnimatePresence>
      {open ? (
        <motion.div
          key="mobile-menu"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          className="fixed inset-0 z-[80] flex flex-col bg-sand-50/95 backdrop-blur-xl dark:bg-ink-950/95 2xl:hidden"
        >
          <div className="container-x flex h-20 items-center justify-between">
            <Logo />
            <button
              type="button"
              onClick={onClose}
              aria-label="Close menu"
              className="flex h-10 w-10 items-center justify-center rounded-full text-ink-700 transition-colors hover:bg-ink-900/[0.07] dark:text-sand-200 dark:hover:bg-sand-100/10"
            >
              <X className="h-5 w-5" />
            </button>
          </div>

          <nav
            className="container-x flex flex-1 flex-col justify-center gap-2"
            aria-label="Mobile"
          >
            <motion.ul
              variants={staggerChildren(0.07, 0.1)}
              initial="hidden"
              animate="show"
              exit="hidden"
              className="space-y-2"
            >
              {NAV_LINKS.map((link) => (
                <motion.li key={link.href} variants={fadeUp}>
                  <Link
                    href={link.href}
                    onClick={onClose}
                    className="group flex items-baseline gap-4 py-2"
                  >
                    <span className="h-px w-6 bg-gold-500 transition-all duration-500 group-hover:w-12" />
                    <span className="font-display text-4xl tracking-tight text-ink-950 transition-colors group-hover:text-gold-600 sm:text-5xl dark:text-sand-50 dark:group-hover:text-gold-400">
                      {link.label}
                    </span>
                  </Link>
                </motion.li>
              ))}
            </motion.ul>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ ...SNAPPY, delay: 0.45 }}
              className="mt-10 space-y-4"
            >
              <LinkButton
                href="/hotels"
                variant="gold"
                size="lg"
                full
                onClick={onClose}
              >
                Explore all stays
              </LinkButton>
              <LinkButton
                href="/guest/login"
                variant="outline"
                size="lg"
                full
                onClick={onClose}
              >
                Guest sign in
              </LinkButton>
              <div className="flex flex-wrap justify-center gap-x-5 gap-y-2 text-xs">
                <Link href="/guest/register" onClick={onClose} className="font-semibold text-gold-700 hover:text-gold-600 dark:text-gold-300">Create guest account</Link>
                <Link href="/partner/login" onClick={onClose} className="text-ink-500 hover:text-gold-700 dark:text-ink-300 dark:hover:text-gold-300">Partner sign in</Link>
                <Link href="/partner/register" onClick={onClose} className="text-ink-500 hover:text-gold-700 dark:text-ink-300 dark:hover:text-gold-300">Partner registration</Link>
                <Link href="/admin/login" onClick={onClose} className="text-ink-500 hover:text-gold-700 dark:text-ink-300 dark:hover:text-gold-300">Admin sign in</Link>
              </div>
              <p className="text-center text-xs uppercase tracking-[0.25em] text-ink-400">
                {SITE.tagline}
              </p>
            </motion.div>
          </nav>

          <div className="container-x flex items-center justify-between border-t border-ink-900/[0.07] py-5 dark:border-sand-100/10">
            <p className="text-xs text-ink-400">
              {SITE.email}
            </p>
            <div className="flex gap-4">
              {SITE.socials.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  className="text-xs font-semibold uppercase tracking-wider text-ink-500 transition-colors hover:text-gold-600 dark:text-sand-400"
                >
                  {social.label}
                </a>
              ))}
            </div>
          </div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}
