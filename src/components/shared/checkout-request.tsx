"use client";

import { useState, type FormEvent } from "react";
import { useSearchParams } from "next/navigation";
import { ArrowLeft, Check, Mail, ShieldCheck } from "lucide-react";
import Link from "next/link";
import { Price } from "@/components/shared/price";
import { SmartImage } from "@/components/ui/smart-image";
import { TextArea, TextInput } from "@/components/ui/field";
import { Select } from "@/components/ui/field";
import { Stepper } from "@/components/ui/stepper";
import { useSearch } from "@/context/search-provider";
import { SITE } from "@/lib/data/site";
import type { Hotel } from "@/lib/types";
import { formatDate } from "@/lib/utils";

export function CheckoutRequest({ hotel }: { hotel: Hotel }) {
  const searchParams = useSearchParams();
  const { checkIn, checkOut, setDates, guests, setGuests } = useSearch();
  const availableSpaces = hotel.propertyType === "shortlet"
    ? hotel.rooms.filter((room) => room.wholeProperty)
    : hotel.rooms;
  const initialRoom = availableSpaces.find((room) => room.id === searchParams.get("room")) ?? availableSpaces[0];
  const [roomId, setRoomId] = useState(initialRoom.id);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [notes, setNotes] = useState("");
  const [prepared, setPrepared] = useState(false);
  const room = availableSpaces.find((item) => item.id === roomId) ?? availableSpaces[0];
  const nights = checkIn && checkOut
    ? Math.max(0, Math.round((new Date(`${checkOut}T00:00:00`).getTime() - new Date(`${checkIn}T00:00:00`).getTime()) / 86_400_000))
    : 0;
  const estimate = room.pricePerNight * nights;

  const submitRequest = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!checkIn || !checkOut || nights < 1) return;

    const subject = `Availability request: ${hotel.name}`;
    const body = [
      `Hello Velora concierge,`,
      ``,
      `Please check availability for the following stay:`,
      `Hotel: ${hotel.name}`,
      `${hotel.propertyType === "shortlet" ? "Accommodation" : "Room"}: ${room.name}`,
      `Check-in: ${checkIn}`,
      `Check-out: ${checkOut}`,
      `Guests: ${guests.adults} adults, ${guests.children} children, ${guests.rooms} room(s)`,
      `Guest name: ${name}`,
      `Guest email: ${email}`,
      `Guest phone: ${phone || "Not provided"}`,
      `Additional notes: ${notes || "None"}`,
      ``,
      `I understand this is an availability request and not a confirmed reservation.`,
    ].join("\n");

    window.location.href = `mailto:${SITE.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    setPrepared(true);
  };

  return (
    <div className="container-x w-full flex-1 py-10 sm:py-14">
      <Link href={`/hotels/${hotel.id}`} className="inline-flex items-center gap-2 text-sm font-medium text-ink-500 transition-colors hover:text-gold-700 dark:text-ink-300 dark:hover:text-gold-300">
        <ArrowLeft className="h-4 w-4" aria-hidden />Back to {hotel.name}
      </Link>

      <div className="mx-auto mt-8 grid max-w-6xl gap-10 lg:grid-cols-[minmax(0,1fr)_360px] lg:gap-16">
        <div>
          <div className="mb-8 flex items-center gap-3">
            <span className="flex h-10 w-10 items-center justify-center rounded-full bg-gold-100 text-gold-700 dark:bg-gold-500/15 dark:text-gold-300"><Mail className="h-5 w-5" aria-hidden /></span>
            <div>
              <p className="text-[10px] font-bold uppercase tracking-[0.22em] text-gold-700 dark:text-gold-400">A note to our concierge</p>
              <h1 className="font-display text-3xl text-ink-950 dark:text-sand-50 sm:text-4xl">Request availability</h1>
            </div>
          </div>

          <p className="mb-6 text-sm text-ink-500 dark:text-ink-300">
            Have a guest account? <Link href="/guest/login" className="font-semibold text-gold-700 hover:text-gold-600 dark:text-gold-300">Sign in</Link>
            {" "}or <Link href="/guest/register" className="font-semibold text-gold-700 hover:text-gold-600 dark:text-gold-300">create one</Link>.
            {" "}Account access is a frontend preview and is not connected to this request.
          </p>

          {prepared ? (
            <div className="border border-sage-500/25 bg-sage-100/70 p-6 dark:bg-sage-500/10 sm:p-8" role="status" aria-live="polite">
              <span className="flex h-11 w-11 items-center justify-center rounded-full bg-sage-500 text-white"><Check className="h-5 w-5" aria-hidden /></span>
              <h2 className="mt-5 font-display text-2xl text-ink-950 dark:text-sand-50">Your request is ready to send.</h2>
              <p className="mt-3 text-sm leading-6 text-ink-600 dark:text-ink-300">We opened a message to {SITE.email} in your email app. Send it to reach our concierge. Your stay is not booked until the team confirms availability and the final price.</p>
              <a href={`mailto:${SITE.email}`} className="mt-5 inline-flex h-11 items-center gap-2 rounded-full bg-ink-900 px-5 text-sm font-semibold text-sand-50 dark:bg-sand-100 dark:text-ink-950"><Mail className="h-4 w-4" aria-hidden />Open email</a>
            </div>
          ) : (
            <form onSubmit={submitRequest} className="space-y-8">
              <section className="border-t border-ink-900/10 pt-6 dark:border-sand-100/10" aria-labelledby="stay-details-title">
                <h2 id="stay-details-title" className="font-display text-2xl text-ink-950 dark:text-sand-50">Your stay</h2>
                <div className="mt-5 grid gap-5 sm:grid-cols-2">
                  <Select
                    label={hotel.propertyType === "shortlet" ? "Accommodation" : "Room type"}
                    name="room"
                    value={roomId}
                    onChange={(event) => setRoomId(event.target.value)}
                    options={availableSpaces.map((item) => ({ value: item.id, label: `${item.name} · ${item.sleeps} guests` }))}
                  />
                  <div className="grid grid-cols-2 gap-3">
                    <TextInput label="Check-in" name="checkIn" type="date" required value={checkIn ?? ""} min={new Date().toISOString().slice(0, 10)} onChange={(event) => {
                      const nextCheckIn = event.target.value || null;
                      setDates(nextCheckIn, checkOut && nextCheckIn && checkOut > nextCheckIn ? checkOut : null);
                    }} />
                    <TextInput label="Check-out" name="checkOut" type="date" required value={checkOut ?? ""} min={checkIn ?? new Date().toISOString().slice(0, 10)} onChange={(event) => setDates(checkIn, event.target.value || null)} />
                  </div>
                </div>
                <div className="mt-5 divide-y divide-ink-900/10 border-y border-ink-900/10 dark:divide-sand-100/10 dark:border-sand-100/10">
                  <Stepper label="Adults" hint="Ages 13 or above" min={1} value={guests.adults} onChange={(adults) => setGuests({ ...guests, adults })} />
                  <Stepper label="Children" hint="Ages 0–12" value={guests.children} onChange={(children) => setGuests({ ...guests, children })} />
                  <Stepper label="Rooms" min={1} value={guests.rooms} onChange={(rooms) => setGuests({ ...guests, rooms })} />
                </div>
              </section>

              <section className="border-t border-ink-900/10 pt-6 dark:border-sand-100/10" aria-labelledby="contact-title">
                <h2 id="contact-title" className="font-display text-2xl text-ink-950 dark:text-sand-50">Your contact details</h2>
                <p className="mt-2 text-sm text-ink-500 dark:text-ink-300">We&apos;ll use these details to respond to your request.</p>
                <div className="mt-5 grid gap-5 sm:grid-cols-2">
                  <TextInput label="Full name" name="name" autoComplete="name" required value={name} onChange={(event) => setName(event.target.value)} />
                  <TextInput label="Email address" name="email" type="email" autoComplete="email" required value={email} onChange={(event) => setEmail(event.target.value)} />
                  <TextInput label="Phone (optional)" name="phone" type="tel" autoComplete="tel" value={phone} onChange={(event) => setPhone(event.target.value)} />
                </div>
                <div className="mt-5">
                  <TextArea label="Anything else we should know?" name="notes" value={notes} onChange={(event) => setNotes(event.target.value)} hint="Accessibility needs, arrival times, or a special occasion." />
                </div>
              </section>

              <button type="submit" className="inline-flex h-12 w-full items-center justify-center gap-2 rounded-full bg-gold-500 px-6 text-sm font-semibold text-white transition-colors hover:bg-gold-600 sm:w-auto">
                <Mail className="h-4 w-4" aria-hidden />Prepare email request
              </button>
              <p className="text-xs leading-5 text-ink-400">No payment is taken here. Your request is sent only when you send the email opened by your device.</p>
            </form>
          )}
        </div>

        <aside className="lg:sticky lg:top-24 lg:self-start">
          <div className="overflow-hidden border border-ink-900/10 bg-white dark:border-sand-100/10 dark:bg-ink-900">
            <SmartImage
              src={hotel.gallery[0]}
              alt={hotel.name}
              sizes="(max-width: 1024px) 100vw, 360px"
              className="aspect-[16/10] w-full"
            />
            <div className="p-5 sm:p-6">
              <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-gold-700 dark:text-gold-400">{hotel.propertyType === "shortlet" ? "Private shortlet" : hotel.category}</p>
              <h2 className="mt-2 font-display text-2xl text-ink-950 dark:text-sand-50">{hotel.name}</h2>
              <p className="mt-1 text-sm text-ink-500 dark:text-ink-300">{hotel.city}, {hotel.country}</p>
              <div className="mt-5 space-y-3 border-t border-ink-900/10 pt-4 text-sm dark:border-sand-100/10">
                <div className="flex justify-between gap-4"><span className="text-ink-500 dark:text-ink-300">{hotel.propertyType === "shortlet" ? "Accommodation" : "Room"}</span><span className="text-right font-medium text-ink-900 dark:text-sand-100">{room.name}</span></div>
                <div className="flex justify-between gap-4"><span className="text-ink-500 dark:text-ink-300">Dates</span><span className="text-right font-medium text-ink-900 dark:text-sand-100">{checkIn && checkOut ? `${formatDate(checkIn)} – ${formatDate(checkOut)}` : "Choose your dates"}</span></div>
                <div className="flex justify-between gap-4"><span className="text-ink-500 dark:text-ink-300">Guests</span><span className="text-right font-medium text-ink-900 dark:text-sand-100">{guests.adults + guests.children} guests · {guests.rooms} room(s)</span></div>
                {nights > 0 ? <div className="flex justify-between gap-4 border-t border-ink-900/10 pt-3 dark:border-sand-100/10"><span className="text-ink-500 dark:text-ink-300">Estimated room total · {nights} nights</span><span className="font-semibold text-ink-900 dark:text-sand-100"><Price amount={estimate} /></span></div> : null}
              </div>
              <p className="mt-4 text-[11px] leading-5 text-ink-400">Estimate only. Final availability, taxes, and price are confirmed by the concierge before booking.</p>
            </div>
          </div>
          <p className="mt-4 flex gap-2 text-xs leading-5 text-ink-400"><ShieldCheck className="mt-0.5 h-4 w-4 shrink-0 text-sage-500" aria-hidden />Your details are included in an email to our concierge only when you choose to send it.</p>
        </aside>
      </div>
    </div>
  );
}