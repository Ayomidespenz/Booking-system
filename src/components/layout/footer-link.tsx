"use client";

import Link from "next/link";
import type { ReactNode } from "react";
import { motion } from "framer-motion";

/** Footer link that draws a gold rule on hover. */
export function FooterLink({
  href,
  children,
}: {
  href: string;
  children: ReactNode;
}) {
  return (
    <li>
      <Link
        href={href}
        className="group inline-flex w-fit items-center gap-2 text-sm text-sand-300 transition-colors hover:text-sand-50"
      >
        <span className="h-px w-0 bg-gold-500 transition-all duration-500 group-hover:w-4" />
        <span className="transition-transform duration-500 group-hover:translate-x-0.5">
          {children}
        </span>
      </Link>
    </li>
  );
}
