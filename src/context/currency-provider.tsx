"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react";
import { formatCurrency } from "@/lib/utils";

export type CurrencyCode = "USD" | "EUR" | "GBP" | "JPY" | "AED";

type CurrencyMeta = {
  code: CurrencyCode;
  symbol: string;
  label: string;
  /** Multiplier applied to base USD amounts. */
  rate: number;
};

export const CURRENCIES: CurrencyMeta[] = [
  { code: "USD", symbol: "$", label: "US Dollar", rate: 1 },
  { code: "EUR", symbol: "€", label: "Euro", rate: 0.92 },
  { code: "GBP", symbol: "£", label: "British Pound", rate: 0.79 },
  { code: "JPY", symbol: "¥", label: "Japanese Yen", rate: 157 },
  { code: "AED", symbol: "د.إ", label: "UAE Dirham", rate: 3.67 },
];

type CurrencyContextValue = {
  currency: CurrencyCode;
  setCurrency: (code: CurrencyCode) => void;
  currencies: CurrencyMeta[];
  /** Convert a base USD amount to the active currency. */
  convert: (usd: number) => number;
  /** Format a base USD amount in the active currency. */
  format: (usd: number) => string;
  /** Formatting used in dense contexts, e.g. `$1.2k`. */
  formatShort: (usd: number) => string;
};

const CurrencyContext = createContext<CurrencyContextValue | null>(null);

const STORAGE_KEY = "velora-currency";

export function CurrencyProvider({ children }: { children: ReactNode }) {
  const [currency, setCurrencyState] = useState<CurrencyCode>("USD");

  useEffect(() => {
    const stored = window.localStorage.getItem(STORAGE_KEY) as CurrencyCode | null;
    if (stored && CURRENCIES.some((c) => c.code === stored)) {
      setCurrencyState(stored);
    }
  }, []);

  const setCurrency = useCallback((code: CurrencyCode) => {
    setCurrencyState(code);
    window.localStorage.setItem(STORAGE_KEY, code);
  }, []);

  const convert = useCallback(
    (usd: number) => {
      const meta = CURRENCIES.find((c) => c.code === currency)!;
      return usd * meta.rate;
    },
    [currency],
  );

  const format = useCallback(
    (usd: number) => formatCurrency(convert(usd), currency),
    [convert, currency],
  );

  const formatShort = useCallback(
    (usd: number) => {
      const amount = convert(usd);
      const symbol = CURRENCIES.find((c) => c.code === currency)!.symbol;
      if (Math.abs(amount) >= 1000) {
        return `${symbol}${(amount / 1000).toFixed(1)}k`;
      }
      return `${symbol}${Math.round(amount)}`;
    },
    [convert, currency],
  );

  return (
    <CurrencyContext.Provider
      value={{ currency, setCurrency, currencies: CURRENCIES, convert, format, formatShort }}
    >
      {children}
    </CurrencyContext.Provider>
  );
}

export function useCurrency(): CurrencyContextValue {
  const context = useContext(CurrencyContext);
  if (!context) {
    throw new Error("useCurrency must be used within CurrencyProvider");
  }
  return context;
}
