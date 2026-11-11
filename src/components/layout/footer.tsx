"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, Link as LinkIcon, Pin } from "lucide-react";
import { Logo, LogoMark } from "@/components/shared/logo";
import { LinkButton } from "@/components/ui/button";
import { FooterLink } from "@/components/layout/footer-link";
import { FooterNewsletter } from "@/components/layout/footer-newsletter";
import { ACCEPTED_CARD_BADGES, FOOTER_COLUMNS, SITE } from "@/lib/data/site";
import { fadeUp, staggerChildren } from "@/animations/variants";

const socialIcons: Record<string, typeof LinkIcon> = {
  Instagram: LinkIcon,
  X: LinkIcon,
  LinkedIn: LinkIcon,
  Pinterest: Pin,
};

export function Footer() {
  return (
    <footer className="relative overflow-hidden bg-ink-950 text-sand-200">
      {/* ambient gold glow */}
      <div
        aria-hidden
        className="pointer-events-none absolute -left-40 -top-40 h-96 w-96 rounded-full bg-gold-500/15 blur-3xl"
      />
      {/* oversized watermark */}
      <span
        aria-hidden
        className="pointer-events-none absolute -bottom-16 left-1/2 hidden -translate-x-1/2 select-none font-display text-[16rem] leading-none text-white/[0.03] lg:block"
      >
        Velora
      </span>

      <div className="container-x relative pb-10 pt-20 lg:pt-28">
        {/* CTA line */}
        <motion.div
          variants={staggerChildren(0.09)}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-60px" }}
          className="flex flex-col gap-8 border-b border-white/10 pb-16 lg:flex-row lg:items-end lg:justify-between"
        >
          <div className="max-w-xl space-y-4">
            <motion.p
              variants={fadeUp}
              className="text-[11px] font-bold uppercase tracking-[0.3em] text-gold-400"
            >
              Ready when you are
            </motion.p>
            <motion.h2
              variants={fadeUp}
              className="font-display text-4xl leading-[1.06] tracking-tight text-sand-50 sm:text-5xl"
            >
              Where will you wake up next?
            </motion.h2>
          </div>
          <motion.div variants={fadeUp}>
            <LinkButton
              href="/hotels"
              variant="gold"
              size="lg"
              iconRight={<ArrowRight className="h-4 w-4" />}
            >
              Explore the collection
            </LinkButton>
          </motion.div>
        </motion.div>

        {/* columns */}
        <motion.div
          variants={staggerChildren(0.07)}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-60px" }}
          className="grid gap-12 py-16 sm:grid-cols-2 lg:grid-cols-[1.5fr_1fr_1fr_1fr]"
        >
          <motion.div variants={fadeUp} className="space-y-5">
            <Logo tone="light" />
            <p className="max-w-xs text-sm leading-relaxed text-sand-400">
              {SITE.description}
            </p>
            <FooterNewsletter />
          </motion.div>

          {FOOTER_COLUMNS.map((column) => (
            <motion.div key={column.title} variants={fadeUp}>
              <h3 className="mb-5 text-[11px] font-bold uppercase tracking-[0.24em] text-sand-400">
                {column.title}
              </h3>
              <ul className="space-y-3">
                {column.links.map((link) => (
                  <FooterLink key={link.label} href={link.href}>
                    {link.label}
                  </FooterLink>
                ))}
              </ul>
            </motion.div>
          ))}
        </motion.div>

        {/* bottom bar */}
        <div className="flex flex-col gap-6 border-t border-white/10 pt-8 text-xs text-sand-500 md:flex-row md:items-center md:justify-between">
          <div className="flex items-center gap-4">
            <LogoMark className="h-9 w-9 text-base" />
            <p>© 2026 Velora Travel House. All rights reserved.</p>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            {ACCEPTED_CARD_BADGES.map((badge) => (
              <span
                key={badge}
                className="rounded-md border border-white/15 px-2.5 py-1 text-[10px] font-bold tracking-widest text-sand-400"
              >
                {badge}
              </span>
            ))}
          </div>

          <div className="flex items-center gap-3">
            {SITE.socials.map((social) => {
              const Icon = socialIcons[social.label] ?? LinkIcon;
              return (
                <a
                  key={social.label}
                  href={social.href}
                  aria-label={social.label}
                  className="flex h-9 w-9 items-center justify-center rounded-full border border-white/12 text-sand-400 transition-all duration-300 hover:border-gold-500 hover:text-gold-400"
                >
                  <Icon className="h-4 w-4" />
                </a>
              );
            })}
          </div>
        </div>

        <div className="mt-6 flex flex-wrap gap-x-6 gap-y-2 text-[11px] text-sand-500">
          <Link href="#" className="transition-colors hover:text-sand-300">Privacy</Link>
          <Link href="#" className="transition-colors hover:text-sand-300">Terms</Link>
          <Link href="#" className="transition-colors hover:text-sand-300">Cookies</Link>
          <span className="md:ml-auto">Velora — {SITE.tagline}</span>
        </div>
      </div>
    </footer>
  );
}
