import type { Metadata } from "next";
import { Suspense } from "react";
import { HotelsBrowser } from "@/components/shared/hotels-browser";

export const metadata: Metadata = {
  title: "Find your stay",
  description: "Explore Velora's considered collection of distinctive hotels and private shortlets around the world.",
};

function ResultsFallback() {
  return (
    <div className="container-x min-h-[70vh] animate-pulse py-32">
      <div className="h-9 w-72 rounded bg-sand-200 dark:bg-ink-800" />
      <div className="mt-8 h-20 rounded-2xl bg-sand-200 dark:bg-ink-800" />
      <div className="mt-10 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
        {Array.from({ length: 6 }, (_, index) => <div key={index} className="aspect-[4/5] rounded-lg bg-sand-200 dark:bg-ink-800" />)}
      </div>
    </div>
  );
}

export default function HotelsPage() {
  return (
    <Suspense fallback={<ResultsFallback />}>
      <HotelsBrowser />
    </Suspense>
  );
}