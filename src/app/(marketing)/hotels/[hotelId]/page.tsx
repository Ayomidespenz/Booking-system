import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowUpRight, Check, MapPin, Phone } from "lucide-react";
import { Price } from "@/components/shared/price";
import { Rating } from "@/components/ui/rating";
import { SmartImage } from "@/components/ui/smart-image";
import { Badge } from "@/components/ui/badge";
import { hotels } from "@/lib/data/hotels";
import { SITE } from "@/lib/data/site";

type HotelPageProps = PageProps<"/hotels/[hotelId]">;

export function generateStaticParams() {
  return hotels.map((hotel) => ({ hotelId: hotel.id }));
}

export async function generateMetadata({ params }: HotelPageProps): Promise<Metadata> {
  const { hotelId } = await params;
  const hotel = hotels.find((item) => item.id === hotelId);
  if (!hotel) return { title: "Stay not found" };
  return {
    title: `${hotel.name}, ${hotel.city}`,
    description: hotel.tagline,
    openGraph: { images: [hotel.gallery[0]] },
  };
}

export default async function HotelPage({ params }: HotelPageProps) {
  const { hotelId } = await params;
  const hotel = hotels.find((item) => item.id === hotelId);
  if (!hotel) notFound();

  const [heroImage, ...galleryImages] = hotel.gallery;
  const spaces = hotel.propertyType === "shortlet"
    ? hotel.rooms.filter((room) => room.wholeProperty)
    : hotel.rooms;

  return (
    <article className="flex-1 pb-20 pt-8 sm:pt-12">
      <div className="container-x">
        <Link href="/hotels" className="inline-flex items-center gap-2 text-sm font-medium text-ink-500 transition-colors hover:text-gold-700 dark:text-ink-300 dark:hover:text-gold-300">
          <ArrowLeft className="h-4 w-4" aria-hidden />Back to stays
        </Link>

        <div className="mt-7 flex flex-col justify-between gap-5 sm:flex-row sm:items-end">
          <div>
            <div className="flex flex-wrap items-center gap-2">
              <p className="text-[10px] font-bold uppercase tracking-[0.24em] text-gold-700 dark:text-gold-400">{hotel.propertyType === "shortlet" ? `Shortlet · ${hotel.category}` : hotel.category}</p>
              <Badge variant={hotel.propertyType === "shortlet" ? "gold" : "outline"}>{hotel.propertyType === "shortlet" ? "Shortlet" : "Hotel"}</Badge>
              {hotel.badge ? <Badge variant="gold">{hotel.badge}</Badge> : null}
            </div>
            <h1 className="mt-2 font-display text-4xl leading-tight text-ink-950 dark:text-sand-50 sm:text-5xl">{hotel.name}</h1>
            <p className="mt-2 font-display text-xl text-ink-500 dark:text-ink-300">{hotel.tagline}</p>
          </div>
          <div className="flex flex-col gap-2 sm:items-end">
            <Rating value={hotel.rating} count={hotel.reviewCount} />
            <p className="inline-flex items-center gap-1.5 text-sm text-ink-500 dark:text-ink-300"><MapPin className="h-4 w-4 text-gold-600" aria-hidden />{hotel.region}, {hotel.city}, {hotel.country}</p>
          </div>
        </div>

        <div className="mt-7 grid h-[420px] grid-cols-1 gap-2 overflow-hidden rounded-lg sm:h-[500px] sm:grid-cols-[1.4fr_1fr] lg:h-[560px]">
          <SmartImage src={heroImage} alt={`${hotel.name} exterior and grounds`} priority sizes="(max-width: 640px) 100vw, 58vw" className="h-full w-full" />
          <div className="hidden min-h-0 grid-cols-2 grid-rows-2 gap-2 sm:grid">
            {galleryImages.slice(0, 4).map((image, index) => (
              <SmartImage key={image} src={image} alt={`${hotel.name}, view ${index + 2}`} sizes="(max-width: 1024px) 35vw, 22vw" className="h-full w-full" />
            ))}
          </div>
        </div>

        <div className="mt-10 grid gap-12 lg:grid-cols-[minmax(0,1fr)_340px] lg:gap-16">
          <div className="min-w-0">
            <section aria-labelledby="about-title">
              <p className="text-[10px] font-bold uppercase tracking-[0.24em] text-gold-700 dark:text-gold-400">A sense of place</p>
              <h2 id="about-title" className="mt-2 font-display text-3xl text-ink-950 dark:text-sand-50">{hotel.propertyType === "shortlet" ? "A home that feels like nowhere else." : "A stay that feels like nowhere else."}</h2>
              <p className="mt-4 max-w-3xl text-base leading-7 text-ink-600 dark:text-ink-300">{hotel.description}</p>
            </section>

            <section className="mt-12 border-t border-ink-900/10 pt-8 dark:border-sand-100/10" aria-labelledby="highlights-title">
              <h2 id="highlights-title" className="font-display text-2xl text-ink-950 dark:text-sand-50">The details we love</h2>
              <ul className="mt-5 grid gap-4 sm:grid-cols-2">
                {hotel.highlights.map((highlight) => (
                  <li key={highlight} className="flex items-start gap-3 text-sm leading-6 text-ink-600 dark:text-ink-300">
                    <Check className="mt-1 h-4 w-4 shrink-0 text-gold-600 dark:text-gold-400" aria-hidden />{highlight}
                  </li>
                ))}
              </ul>
            </section>

            <section id="rooms" className="mt-12 border-t border-ink-900/10 pt-8 dark:border-sand-100/10" aria-labelledby="rooms-title">
              <div className="flex flex-wrap items-end justify-between gap-3">
                <div>
                  <p className="text-[10px] font-bold uppercase tracking-[0.24em] text-gold-700 dark:text-gold-400">{hotel.propertyType === "shortlet" ? "Choose your space" : "Find your room"}</p>
                  <h2 id="rooms-title" className="mt-2 font-display text-3xl text-ink-950 dark:text-sand-50">{hotel.propertyType === "shortlet" ? "Spaces & stays" : "Rooms & suites"}</h2>
                </div>
                <p className="text-xs text-ink-400">Rates shown per night, before taxes</p>
              </div>
              <div className="mt-6 divide-y divide-ink-900/10 dark:divide-sand-100/10">
                {spaces.map((room) => (
                  <div key={room.id} className="grid gap-5 py-5 sm:grid-cols-[180px_minmax(0,1fr)_auto] sm:items-center">
                    <div className="relative aspect-[4/3] overflow-hidden rounded-md bg-sand-200 dark:bg-ink-800">
                      <SmartImage src={room.image} alt={room.name} sizes="180px" className="absolute inset-0 h-full w-full" />
                    </div>
                    <div>
                      <div className="flex flex-wrap items-center gap-2">
                        <h3 className="font-display text-xl text-ink-950 dark:text-sand-50">{room.name}</h3>
                        <Badge variant={hotel.propertyType === "shortlet" ? "gold" : "outline"}>{hotel.propertyType === "shortlet" ? "Shortlet" : "Hotel room"}</Badge>
                      </div>
                      <p className="mt-1 text-sm text-ink-500 dark:text-ink-300">{room.tagline}</p>
                      <p className="mt-2 text-xs text-ink-400">{room.sizeSqm} m² · {room.sleeps} guests · {room.bed}</p>
                    </div>
                    <div className="flex items-center justify-between gap-4 sm:flex-col sm:items-end">
                      <p className="text-right"><span className="block text-[10px] uppercase tracking-wider text-ink-400">From</span><span className="font-display text-xl text-ink-950 dark:text-sand-50"><Price amount={room.pricePerNight} /></span><span className="block text-[10px] text-ink-400">per night</span></p>
                      <Link href={`/checkout/${hotel.id}?room=${room.id}`} className="inline-flex h-10 items-center gap-2 rounded-full bg-ink-900 px-4 text-xs font-semibold text-sand-50 transition-colors hover:bg-ink-700 dark:bg-sand-100 dark:text-ink-950 dark:hover:bg-white">
                        <ArrowUpRight className="h-3.5 w-3.5" aria-hidden />Request dates
                      </Link>
                    </div>
                  </div>
                ))}
              </div>
            </section>

            <section className="mt-12 border-t border-ink-900/10 pt-8 dark:border-sand-100/10" aria-labelledby="guest-notes-title">
              <p className="text-[10px] font-bold uppercase tracking-[0.24em] text-gold-700 dark:text-gold-400">From our guests</p>
              <h2 id="guest-notes-title" className="mt-2 font-display text-3xl text-ink-950 dark:text-sand-50">A few considered words.</h2>
              <div className="mt-5 grid gap-4 sm:grid-cols-2">
                {hotel.reviews.slice(0, 2).map((review) => (
                  <blockquote key={review.id} className="border-l-2 border-gold-500/60 pl-5">
                    <Rating value={review.rating} size={12} showValue={false} />
                    <p className="mt-3 font-display text-lg leading-relaxed text-ink-700 dark:text-sand-200">“{review.text}”</p>
                    <footer className="mt-3 text-xs text-ink-400">{review.author} · {review.country}</footer>
                  </blockquote>
                ))}
              </div>
            </section>
          </div>

          <aside className="lg:sticky lg:top-24 lg:self-start">
            <div className="border border-ink-900/10 bg-white p-5 dark:border-sand-100/10 dark:bg-ink-900 sm:p-6">
              <p className="text-[10px] font-bold uppercase tracking-[0.22em] text-gold-700 dark:text-gold-400">{hotel.propertyType === "shortlet" ? "Make yourself at home" : "Make it yours"}</p>
              <div className="mt-3 flex items-end justify-between gap-3 border-b border-ink-900/10 pb-5 dark:border-sand-100/10">
                <div><p className="font-display text-3xl text-ink-950 dark:text-sand-50"><Price amount={hotel.pricePerNight} /></p><p className="mt-1 text-xs text-ink-400">per night · taxes may apply</p></div>
                <Rating value={hotel.rating} size={12} showValue={false} />
              </div>
              <p className="mt-5 text-sm leading-6 text-ink-600 dark:text-ink-300">Talk with our concierge about dates, room availability, and the details that will make your stay personal.</p>
              <Link href={`/checkout/${hotel.id}`} className="mt-5 flex h-12 w-full items-center justify-center gap-2 rounded-full bg-gold-500 px-5 text-sm font-semibold text-white transition-colors hover:bg-gold-600">
                <ArrowUpRight className="h-4 w-4" aria-hidden />Request availability
              </Link>
              <a href={`tel:${SITE.phone.replace(/[^+\d]/g, "")}`} className="mt-3 flex h-10 w-full items-center justify-center gap-2 rounded-full border border-ink-900/15 px-5 text-xs font-semibold text-ink-700 transition-colors hover:bg-ink-900/[0.04] dark:border-sand-100/20 dark:text-sand-200 dark:hover:bg-sand-100/10">
                <Phone className="h-3.5 w-3.5" aria-hidden />Call concierge
              </a>
              <p className="mt-3 text-center text-xs text-ink-400">{SITE.phone} · Available around the clock</p>
              <Link href="/hotels" className="mt-5 flex items-center justify-center gap-1 text-xs font-semibold text-ink-500 transition-colors hover:text-gold-700 dark:text-ink-300 dark:hover:text-gold-300">
                Explore similar stays <ArrowUpRight className="h-3.5 w-3.5" aria-hidden />
              </Link>
            </div>
            <div className="mt-4 flex gap-3 border-t border-ink-900/10 pt-4 text-xs leading-5 text-ink-400 dark:border-sand-100/10">
              <Check className="mt-0.5 h-4 w-4 shrink-0 text-sage-500" aria-hidden />Personal recommendations, clear pricing, and help from a real person.
            </div>
          </aside>
        </div>
      </div>
    </article>
  );
}