import type { Metadata } from "next";
import { Suspense } from "react";
import { notFound } from "next/navigation";
import { CheckoutRequest } from "@/components/shared/checkout-request";
import { hotels } from "@/lib/data/hotels";

type CheckoutPageProps = PageProps<"/checkout/[hotelId]">;

export const metadata: Metadata = {
  title: "Request availability",
  description: "Share your travel details with the Velora concierge team.",
};

export function generateStaticParams() {
  return hotels.map((hotel) => ({ hotelId: hotel.id }));
}

export default function CheckoutPage({ params }: CheckoutPageProps) {
  return (
    <Suspense fallback={<CheckoutFallback />}>
      <CheckoutContent params={params} />
    </Suspense>
  );
}

async function CheckoutContent({ params }: { params: CheckoutPageProps["params"] }) {
  const { hotelId } = await params;
  const hotel = hotels.find((item) => item.id === hotelId);
  if (!hotel) notFound();

  return <CheckoutRequest hotel={hotel} />;
}

function CheckoutFallback() {
  return (
    <div className="container-x w-full flex-1 py-10 sm:py-14">
      <div className="mx-auto grid max-w-6xl animate-pulse gap-10 lg:grid-cols-[minmax(0,1fr)_360px] lg:gap-16">
        <div className="space-y-5">
          <div className="h-10 w-64 rounded bg-sand-200 dark:bg-ink-800" />
          <div className="h-52 rounded bg-sand-200 dark:bg-ink-800" />
          <div className="h-52 rounded bg-sand-200 dark:bg-ink-800" />
        </div>
        <div className="h-96 rounded bg-sand-200 dark:bg-ink-800" />
      </div>
    </div>
  );
}