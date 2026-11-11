import Link from "next/link";
import { ArrowRight, ArrowUpRight, Check, Compass, Headphones, MapPin, ShieldCheck } from "lucide-react";
import { HotelCard } from "@/components/shared/hotel-card";
import { Reveal } from "@/components/shared/reveal";
import { SearchBar } from "@/components/shared/search-bar";
import { SectionHeading } from "@/components/shared/section-heading";
import { SmartImage } from "@/components/ui/smart-image";
import { LinkButton } from "@/components/ui/button";
import { hotels } from "@/lib/data/hotels";
import { ijebuAreas } from "@/lib/data/ijebu-areas";

export default function HomePage() {
  const featuredProperties = [
    ...hotels.filter((hotel) => hotel.featured && hotel.propertyType === "hotel").slice(0, 2),
    ...hotels.filter((hotel) => hotel.propertyType === "shortlet").slice(0, 1),
  ];
  const searchAreas = ijebuAreas.slice(0, 4);

  return (
    <>
      <section className="relative isolate flex min-h-[760px] items-center overflow-hidden bg-ink-950 text-sand-50 sm:min-h-[820px] lg:min-h-[min(900px,100svh)]">
        <SmartImage
          src={hotels[1].gallery[0]}
          alt="Illustrative sample stay image, not a verified local property"
          priority
          sizes="100vw"
          position="center 58%"
          className="absolute inset-0 h-full w-full"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-ink-950/80 via-ink-950/45 to-ink-950/10" aria-hidden />
        <div className="absolute inset-0 bg-gradient-to-t from-ink-950/80 via-transparent to-ink-950/20" aria-hidden />

        <div className="container-x relative z-10 flex w-full flex-col justify-center pb-14 pt-32 sm:pb-20 lg:pt-36">
          <div className="max-w-3xl">
            <Reveal y={18}>
              <p className="mb-5 flex items-center gap-3 text-[11px] font-bold uppercase tracking-[0.3em] text-gold-300">
                <span className="h-px w-9 bg-gold-400" aria-hidden />
                IJEBU ODE · OGUN STATE
              </p>
            </Reveal>
            <Reveal delay={0.08} y={24}>
              <h1 className="font-display text-6xl leading-[0.98] tracking-tight text-white sm:text-7xl lg:text-[6.5rem]">
                Velora<span className="text-gold-300">.</span>
              </h1>
            </Reveal>
            <Reveal delay={0.16} y={20}>
              <p className="mt-5 max-w-xl font-display text-2xl leading-snug text-sand-100 sm:text-3xl">
                A more trusted way to find your stay.
              </p>
              <p className="mt-4 max-w-lg text-sm leading-7 text-sand-100/80 sm:text-base">
                Discover hotels and shortlets across Ijebu Ode. This preview uses sample listings; availability and booking are not live.
              </p>
            </Reveal>
          </div>

          <Reveal delay={0.24} y={20} className="mt-10 w-full max-w-5xl">
            <SearchBar className="rounded-2xl border-white/30 bg-sand-50/95 p-2 shadow-lift" />
            <div className="mt-4 flex flex-wrap items-center gap-x-6 gap-y-2 text-xs font-medium text-white/85">
              <span className="inline-flex items-center gap-2"><Check className="h-3.5 w-3.5 text-gold-300" />Search by local landmarks</span>
              <span className="inline-flex items-center gap-2"><Check className="h-3.5 w-3.5 text-gold-300" />Hotels and whole apartments</span>
              <span className="inline-flex items-center gap-2"><Check className="h-3.5 w-3.5 text-gold-300" />Preview only · no live bookings</span>
            </div>
          </Reveal>
        </div>

        <div className="absolute bottom-8 right-8 hidden items-center gap-3 text-[10px] font-semibold uppercase tracking-[0.22em] text-white/75 lg:flex">
          <span className="h-px w-10 bg-gold-300/80" />Ijebu Ode, Nigeria
        </div>
      </section>

      <section id="destinations" className="container-x py-20 sm:py-28">
        <SectionHeading
          eyebrow="Search the Ijebu Ode axis"
          title="Stay close to what brings you here."
          description="Start with the town, a university, or a local landmark. Exact location and distance details will come from verified partner listings."
          actions={<LinkButton href="/hotels" variant="outline" iconRight={<ArrowRight className="h-4 w-4" />}>Explore all stays</LinkButton>}
        />
        <div className="mt-10 grid grid-cols-2 gap-3 sm:mt-14 sm:gap-5 lg:grid-cols-4">
          {searchAreas.map((area, index) => (
            <Reveal key={area.id} delay={index * 0.06} className={index === 1 ? "sm:translate-y-8" : ""}>
              <Link
                href={`/hotels?destination=${encodeURIComponent(area.name)}`}
                className="group relative flex min-h-56 flex-col justify-between overflow-hidden rounded-lg border border-ink-900/10 bg-white p-5 transition-all hover:-translate-y-1 hover:shadow-lift dark:border-sand-100/10 dark:bg-ink-900 sm:min-h-64 sm:p-6"
              >
                <span className="flex h-11 w-11 items-center justify-center rounded-full bg-gold-100 text-gold-700 dark:bg-gold-500/15 dark:text-gold-300">
                  <MapPin className="h-5 w-5" aria-hidden />
                </span>
                <div>
                  <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-gold-700 dark:text-gold-400">{area.kind}</p>
                  <h3 className="mt-2 font-display text-2xl text-ink-950 dark:text-sand-50 sm:text-3xl">{area.name}</h3>
                  <p className="mt-2 text-xs leading-5 text-ink-500 dark:text-ink-300">{area.description}</p>
                </div>
                <span className="mt-4 inline-flex items-center gap-2 text-xs font-semibold text-ink-700 dark:text-sand-200">
                  Search this area <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" aria-hidden />
                </span>
              </Link>
            </Reveal>
          ))}
        </div>
      </section>

      <section className="bg-sand-100/75 py-20 dark:bg-ink-900/40 sm:py-28">
        <div className="container-x">
          <SectionHeading
            eyebrow="Marketplace preview"
            title="Hotels and shortlets, together."
            description="These example cards show how hotel rooms and whole-apartment stays will appear. The listings below are sample content, not verified Ijebu Ode properties."
            actions={<LinkButton href="/hotels" variant="outline" iconRight={<ArrowRight className="h-4 w-4" />}>View the collection</LinkButton>}
          />
          <div className="mt-10 grid gap-5 md:grid-cols-2 lg:mt-14 lg:grid-cols-3">
            {featuredProperties.map((hotel) => <HotelCard key={hotel.id} hotel={hotel} />)}
          </div>
        </div>
      </section>

      <section id="why" className="container-x grid gap-12 py-20 sm:py-28 lg:grid-cols-[0.9fr_1.1fr] lg:items-center lg:gap-20">
        <Reveal className="relative min-h-[420px] overflow-hidden rounded-lg bg-ink-800 sm:min-h-[560px]">
          <SmartImage
            src={hotels[2].gallery[0]}
            alt="Illustrative sample hotel image, not a verified local property"
            sizes="(max-width: 1024px) 100vw, 45vw"
            className="absolute inset-0 h-full w-full"
            position="center"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-ink-950/65 via-transparent to-transparent" aria-hidden />
          <p className="absolute bottom-5 left-5 font-display text-xl italic text-white sm:bottom-7 sm:left-7 sm:text-2xl">A slower kind of discovery.</p>
        </Reveal>
        <div>
          <SectionHeading
            eyebrow="Travel, thoughtfully"
            title="Good journeys start with good judgement."
            description="We keep the collection considered and the advice personal, so choosing well feels easy from the very first search."
          />
          <div className="mt-9 divide-y divide-ink-900/10 dark:divide-sand-100/10">
            {[
              { icon: Compass, title: "A smaller, better collection", body: "Each stay earns its place through character, care, and a sense of place." },
              { icon: ShieldCheck, title: "Clarity at every step", body: "See the room details, cancellation terms, and full price before you commit." },
              { icon: Headphones, title: "A human when it matters", body: "Our concierge is here for the unexpected and the little things worth arranging." },
            ].map(({ icon: Icon, title, body }, index) => (
              <Reveal key={title} delay={index * 0.06} className="flex gap-4 py-5 first:pt-0">
                <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-gold-100 text-gold-700 dark:bg-gold-500/15 dark:text-gold-300">
                  <Icon className="h-5 w-5" aria-hidden />
                </span>
                <div>
                  <h3 className="font-display text-xl text-ink-950 dark:text-sand-50">{title}</h3>
                  <p className="mt-1.5 max-w-md text-sm leading-6 text-ink-500 dark:text-ink-300">{body}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section id="stories" className="border-y border-ink-900/[0.07] bg-sand-100/75 py-20 dark:border-sand-100/10 dark:bg-ink-900/40 sm:py-28">
        <div className="container-x">
          <SectionHeading
            eyebrow="Guest confidence"
            title="Trust is earned, stay by stay."
            description="Reviews should come from completed stays only. There are no live guest reviews in this frontend preview."
            align="center"
          />
          <div className="mx-auto mt-10 flex max-w-2xl items-start gap-4 border-t border-gold-500/50 bg-sand-50 p-6 dark:bg-ink-950 sm:p-8">
            <ShieldCheck className="mt-1 h-5 w-5 shrink-0 text-sage-500" aria-hidden />
            <div>
              <h3 className="font-display text-xl text-ink-950 dark:text-sand-50">Verified-stay reviews</h3>
              <p className="mt-2 text-sm leading-6 text-ink-500 dark:text-ink-300">Review content and eligibility will be connected to completed bookings through the separate backend.</p>
            </div>
          </div>
        </div>
      </section>

      <section className="container-x py-20 sm:py-28">
        <div className="relative overflow-hidden rounded-lg bg-ink-900 px-6 py-12 text-center text-sand-50 sm:px-12 sm:py-16">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_80%_0%,rgb(181_137_78_/_0.2),transparent_48%)]" aria-hidden />
          <div className="relative mx-auto max-w-2xl">
            <p className="text-[11px] font-bold uppercase tracking-[0.28em] text-gold-300">Planning a visit?</p>
            <h2 className="mt-4 font-display text-3xl leading-tight sm:text-5xl">Find your stay in Ijebu Ode.</h2>
            <p className="mx-auto mt-4 max-w-lg text-sm leading-6 text-sand-300">Search stays around local landmarks, or help us bring more trusted properties online.</p>
            <LinkButton href="/hotels" variant="gold" size="lg" className="mt-7" iconRight={<ArrowRight className="h-4 w-4" />}>Find your stay</LinkButton>
            <LinkButton href="/list-your-property" variant="outline" size="lg" className="mt-3 sm:ml-3" iconRight={<ArrowRight className="h-4 w-4" />}>List your property</LinkButton>
          </div>
        </div>
      </section>
    </>
  );
}
