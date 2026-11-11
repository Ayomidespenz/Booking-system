import type { Destination } from "@/lib/types";

const img = (id: string, w = 1200) =>
  `https://images.unsplash.com/photo-${id}?auto=format&fit=crop&w=${w}&q=80`;

export const destinations: Destination[] = [
  {
    id: "paris",
    name: "Paris",
    country: "France",
    image: img("1502602898657-3e91760cbb34"),
    stayCount: 412,
    fromPrice: 280,
    blurb: "Boulevards, balconies and long dinners",
  },
  {
    id: "santorini",
    name: "Santorini",
    country: "Greece",
    image: img("1570077188670-e3a8d69ac5ff"),
    stayCount: 168,
    fromPrice: 410,
    blurb: "Caldera cliffs and white-blue light",
  },
  {
    id: "maldives",
    name: "Maldives",
    country: "Maldives",
    image: img("1514282401047-d79a71a590e8"),
    stayCount: 96,
    fromPrice: 890,
    blurb: "Overwater villas on a private lagoon",
  },
  {
    id: "kyoto",
    name: "Kyoto",
    country: "Japan",
    image: img("1493976040374-85c8e12f0c0e"),
    stayCount: 204,
    fromPrice: 240,
    blurb: "Temple mornings and river evenings",
  },
  {
    id: "bali",
    name: "Bali",
    country: "Indonesia",
    image: img("1537996194471-e657df975ab4"),
    stayCount: 351,
    fromPrice: 160,
    blurb: "Jungle valleys and volcanic beaches",
  },
  {
    id: "dubai",
    name: "Dubai",
    country: "United Arab Emirates",
    image: img("1512453979798-5ea266f8880c"),
    stayCount: 588,
    fromPrice: 220,
    blurb: "Desert silence, skyline ambition",
  },
  {
    id: "positano",
    name: "Positano",
    country: "Italy",
    image: img("1533104816931-20fa691ff6ca"),
    stayCount: 143,
    fromPrice: 390,
    blurb: "Pastel cliffs above the Tyrrhenian",
  },
  {
    id: "new-york",
    name: "New York",
    country: "United States",
    image: img("1496442226666-8d4d0e62e6e9"),
    stayCount: 977,
    fromPrice: 190,
    blurb: "The city that curates itself",
  },
  {
    id: "london",
    name: "London",
    country: "United Kingdom",
    image: img("1513635269975-59663e0ac1ad"),
    stayCount: 824,
    fromPrice: 210,
    blurb: "Royal parks and restless neighbourhoods",
  },
  {
    id: "venice",
    name: "Venice",
    country: "Italy",
    image: img("1523906834658-6e24ef2386f9"),
    stayCount: 189,
    fromPrice: 330,
    blurb: "Water streets and marble echoes",
  },
];

export function getDestination(id: string): Destination | undefined {
  return destinations.find((destination) => destination.id === id);
}
