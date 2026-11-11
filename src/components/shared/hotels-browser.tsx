"use client";

import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { ArrowDownUp, SlidersHorizontal } from "lucide-react";
import { HotelCard } from "@/components/shared/hotel-card";
import { Reveal } from "@/components/shared/reveal";
import { SearchBar } from "@/components/shared/search-bar";
import { Button } from "@/components/ui/button";
import { hotels } from "@/lib/data/hotels";
import { useSearch } from "@/context/search-provider";
import type { Hotel } from "@/lib/types";

type SortOption = "recommended" | "price-asc" | "price-desc" | "rating";
type PropertyFilter = "all" | "hotel" | "shortlet";

function sortStays(stays: Hotel[], sort: SortOption) {
  return [...stays].sort((a, b) => {
    if (sort === "price-asc") return a.pricePerNight - b.pricePerNight;
    if (sort === "price-desc") return b.pricePerNight - a.pricePerNight;
    if (sort === "rating") return b.rating - a.rating || b.reviewCount - a.reviewCount;
    return Number(Boolean(b.featured)) - Number(Boolean(a.featured)) || b.rating - a.rating;
  });
}

export function HotelsBrowser() {
  const searchParams = useSearchParams();
  const { destination, setDestination } = useSearch();
  const [sort, setSort] = useState<SortOption>("recommended");
  const [propertyFilter, setPropertyFilter] = useState<PropertyFilter>("all");
  const queryDestination = searchParams.get("destination");

  useEffect(() => {
    if (!queryDestination) return;
    const found = hotels.find((hotel) => hotel.tags.includes(queryDestination.toLowerCase()));
    setDestination(found?.city ?? queryDestination.replaceAll("-", " "));
  }, [queryDestination, setDestination]);

  const normalizedDestination = destination.trim().toLowerCase();
  const matchingHotels = normalizedDestination
    ? hotels.filter((hotel) =>
        [hotel.city, hotel.country, hotel.region, hotel.name, ...hotel.tags]
          .some((value) => value.toLowerCase().includes(normalizedDestination)),
      )
    : hotels;
  const propertyCounts = {
    all: matchingHotels.length,
    hotel: matchingHotels.filter((hotel) => hotel.propertyType === "hotel").length,
    shortlet: matchingHotels.filter((hotel) => hotel.propertyType === "shortlet").length,
  };
  const visibleHotels = propertyFilter === "all"
    ? matchingHotels
    : matchingHotels.filter((hotel) => hotel.propertyType === propertyFilter);
  const sortedHotels = sortStays(visibleHotels, sort);

  return (
    <div className="flex-1 pb-20 pt-8 sm:pt-12">
      <div className="container-x">
        <Reveal>
          <p className="mb-3 text-[11px] font-bold uppercase tracking-[0.28em] text-gold-600 dark:text-gold-400">The Velora collection</p>
          <div className="flex flex-col justify-between gap-5 lg:flex-row lg:items-end">
            <div>
              <h1 className="font-display text-4xl leading-tight text-ink-950 dark:text-sand-50 sm:text-5xl">Find your kind of somewhere.</h1>
              <p className="mt-3 max-w-2xl text-sm leading-6 text-ink-500 dark:text-ink-300">A considered collection of distinctive hotels and private shortlets, each chosen for its character and sense of place.</p>
            </div>
            <p className="shrink-0 text-sm text-ink-500 dark:text-ink-300"><span className="font-semibold text-ink-900 dark:text-sand-100">{sortedHotels.length}</span> stays to explore</p>
          </div>
        </Reveal>

        <Reveal delay={0.08} className="mt-8">
          <SearchBar variant="inline" />
        </Reveal>

        <div className="mt-6 flex flex-wrap items-center gap-2" role="group" aria-label="Filter by property type">
          {(["all", "hotel", "shortlet"] as const).map((filter) => {
            const label = filter === "all" ? "All stays" : filter === "hotel" ? "Hotels" : "Shortlets";
            return (
              <button
                key={filter}
                type="button"
                aria-pressed={propertyFilter === filter}
                onClick={() => setPropertyFilter(filter)}
                className={`inline-flex h-10 items-center gap-2 rounded-full border px-4 text-sm font-medium transition-colors ${propertyFilter === filter ? "border-ink-900 bg-ink-900 text-sand-50 dark:border-sand-100 dark:bg-sand-100 dark:text-ink-950" : "border-ink-900/15 text-ink-600 hover:bg-ink-900/[0.04] dark:border-sand-100/20 dark:text-sand-200 dark:hover:bg-sand-100/10"}`}
              >
                {label}<span className="text-xs opacity-70">{propertyCounts[filter]}</span>
              </button>
            );
          })}
        </div>

        <div className="mt-5 flex flex-col gap-4 border-b border-ink-900/10 pb-4 dark:border-sand-100/10 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-center gap-2 text-sm text-ink-500 dark:text-ink-300">
            <SlidersHorizontal className="h-4 w-4" aria-hidden />
            {normalizedDestination ? <>Showing stays for <span className="font-semibold capitalize text-ink-900 dark:text-sand-100">{destination}</span></> : "Every stay, selected with care"}
          </div>
          <label className="flex items-center gap-2 text-sm text-ink-500 dark:text-ink-300">
            <ArrowDownUp className="h-4 w-4" aria-hidden />
            <span>Sort by</span>
            <select
              value={sort}
              onChange={(event) => setSort(event.target.value as SortOption)}
              className="h-10 rounded-md border border-ink-900/10 bg-sand-50 px-3 text-sm font-medium text-ink-900 focus-visible:outline focus-visible:outline-2 focus-visible:outline-gold-500 dark:border-sand-100/15 dark:bg-ink-900 dark:text-sand-100"
            >
              <option value="recommended">Recommended</option>
              <option value="price-asc">Price: low to high</option>
              <option value="price-desc">Price: high to low</option>
              <option value="rating">Guest rating</option>
            </select>
          </label>
        </div>

        {sortedHotels.length ? (
          <div className="mt-6 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {sortedHotels.map((hotel, index) => (
              <Reveal key={hotel.id} delay={Math.min(index % 3, 2) * 0.06}>
                <HotelCard hotel={hotel} />
              </Reveal>
            ))}
          </div>
        ) : (
          <div className="flex min-h-80 flex-col items-center justify-center py-16 text-center">
            <h2 className="font-display text-3xl text-ink-950 dark:text-sand-50">No stays found just yet.</h2>
            <p className="mt-3 max-w-md text-sm leading-6 text-ink-500 dark:text-ink-300">Try another destination, country, or hotel name and we&apos;ll look again.</p>
            <Button className="mt-6" variant="outline" onClick={() => setDestination("")}>Clear destination</Button>
          </div>
        )}
      </div>
    </div>
  );
}