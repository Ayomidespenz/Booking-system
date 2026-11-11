/** Brand, navigation and marketing copy for the Velora storefront. */

export const SITE = {
  name: "Velora",
  tagline: "Hotels and shortlets in Ijebu Ode",
  description:
    "A frontend preview for a hotel and shortlet booking marketplace focused on Ijebu Ode, Nigeria. Listings and booking details are sample content while local inventory is prepared.",
  email: "concierge@velora.travel",
  phone: "+1 (212) 555-0184",
  socials: [
    { label: "Instagram", href: "#" },
    { label: "X", href: "#" },
    { label: "LinkedIn", href: "#" },
    { label: "Pinterest", href: "#" },
  ],
} as const;

export const NAV_LINKS = [
  { label: "Stays", href: "/hotels" },
  { label: "Destinations", href: "/#destinations" },
  { label: "Why Velora", href: "/#why" },
  { label: "Stories", href: "/#stories" },
  { label: "List your property", href: "/list-your-property" },
] as const;

export const HERO_STATS = [
  { value: 1240, suffix: "+", label: "Handpicked hotels" },
  { value: 96, suffix: "%", label: "Guests who return" },
  { value: 72, suffix: "", label: "Countries covered" },
  { value: 4.9, suffix: "/5", label: "Average guest rating", decimals: 1 },
] as const;

export const VALUES = [
  {
    icon: "gem",
    title: "Curated, never listed",
    body: "Every stay is visited, reviewed and re-reviewed by our scouts. Fewer than 4% of applications make the collection.",
  },
  {
    icon: "badgeCheck",
    title: "Price promise",
    body: "Find the same room cheaper within 48 hours and we refund the difference — plus 10% in travel credit.",
  },
  {
    icon: "headset",
    title: "Concierge around the clock",
    body: "Real humans in every timezone. Airport transfers, late check-ins, last-minute changes — one message away.",
  },
  {
    icon: "sparkles",
    title: "Member privileges",
    body: "Room upgrades, early check-in and nightly rates reserved for members, on up to 35% of the collection.",
  },
] as const;

export const PROCESS_STEPS = [
  {
    number: "01",
    title: "Tell us how you travel",
    body: "Dates, destination, the kind of trip you're after. Two minutes, no account required.",
  },
  {
    number: "02",
    title: "We surface the right rooms",
    body: "Our engine ranks availability by real value — not by who paid us the most.",
  },
  {
    number: "03",
    title: "Book with total confidence",
    body: "Transparent totals, free cancellation windows and a concierge on standby after you pay.",
  },
] as const;

export const FOOTER_COLUMNS = [
  {
    title: "Explore",
    links: [
      { label: "All stays", href: "/hotels" },
      { label: "Destinations", href: "/#destinations" },
      { label: "Member privileges", href: "/#why" },
      { label: "Guest stories", href: "/#stories" },
    ],
  },
  {
    title: "Company",
    links: [
      { label: "Our standard", href: "#" },
      { label: "Careers", href: "#" },
      { label: "Press room", href: "#" },
      { label: "Sustainability", href: "#" },
      { label: "List your property", href: "/list-your-property" },
    ],
  },
  {
    title: "Support",
    links: [
      { label: "Guest sign in", href: "/guest/login" },
      { label: "Create guest account", href: "/guest/register" },
      { label: "Partner sign in", href: "/partner/login" },
      { label: "Partner registration", href: "/partner/register" },
      { label: "Admin sign in", href: "/admin/login" },
    ],
  },
] as const;

export const ACCEPTED_CARD_BADGES = ["VISA", "MASTERCARD", "AMEX", "APPLE PAY"] as const;
