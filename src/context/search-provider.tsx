"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
  type ReactNode,
} from "react";
import type { GuestCounts, SearchState } from "@/lib/types";
import { addDays, toISODate } from "@/lib/utils";

type SearchContextValue = SearchState & {
  setDestination: (value: string) => void;
  setDates: (checkIn: string | null, checkOut: string | null) => void;
  setGuests: (guests: GuestCounts) => void;
  patch: (partial: Partial<SearchState>) => void;
};

const SearchContext = createContext<SearchContextValue | null>(null);

export function SearchProvider({ children }: { children: ReactNode }) {
  const [state, setState] = useState<SearchState>({
    destination: "",
    checkIn: null,
    checkOut: null,
    guests: { adults: 2, children: 0, rooms: 1 },
  });
  const seeded = useRef(false);

  // Demo defaults arrive after hydration so server + client markup match.
  useEffect(() => {
    if (seeded.current) return;
    seeded.current = true;
    const today = new Date();
    setState((current) =>
      current.checkIn && current.checkOut
        ? current
        : {
            ...current,
            checkIn: toISODate(addDays(today, 7)),
            checkOut: toISODate(addDays(today, 10)),
          },
    );
  }, []);

  const setDestination = useCallback((destination: string) => {
    setState((current) => ({ ...current, destination }));
  }, []);

  const setDates = useCallback((checkIn: string | null, checkOut: string | null) => {
    setState((current) => ({ ...current, checkIn, checkOut }));
  }, []);

  const setGuests = useCallback((guests: GuestCounts) => {
    setState((current) => ({ ...current, guests }));
  }, []);

  const patch = useCallback((partial: Partial<SearchState>) => {
    setState((current) => ({ ...current, ...partial }));
  }, []);

  return (
    <SearchContext.Provider
      value={{ ...state, setDestination, setDates, setGuests, patch }}
    >
      {children}
    </SearchContext.Provider>
  );
}

export function useSearch(): SearchContextValue {
  const context = useContext(SearchContext);
  if (!context) throw new Error("useSearch must be used within SearchProvider");
  return context;
}
