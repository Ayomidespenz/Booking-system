"use client";

import { Suspense, type ReactNode } from "react";
import { MotionConfig } from "framer-motion";
import { ThemeProvider } from "@/context/theme-provider";
import { CurrencyProvider } from "@/context/currency-provider";
import { SearchProvider } from "@/context/search-provider";
import { RouteProgress } from "@/components/layout/route-progress";

/**
 * Root client shell: providers + global overlays.
 * Page chrome (header/footer/sidebar) lives in the route-group layouts.
 */
export function Providers({ children }: { children: ReactNode }) {
  return (
    <MotionConfig reducedMotion="user">
      <ThemeProvider>
        <CurrencyProvider>
          <SearchProvider>
            <div className="grain" aria-hidden />
            <Suspense fallback={null}>
              <RouteProgress />
            </Suspense>
            {children}
          </SearchProvider>
        </CurrencyProvider>
      </ThemeProvider>
    </MotionConfig>
  );
}
