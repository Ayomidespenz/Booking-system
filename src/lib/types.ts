/** Shared domain types for the Velora booking experience. */

export type AmenityKey =
  | "wifi"
  | "pool"
  | "spa"
  | "gym"
  | "restaurant"
  | "bar"
  | "breakfast"
  | "parking"
  | "ac"
  | "roomService"
  | "beach"
  | "shuttle"
  | "concierge"
  | "workspace"
  | "petFriendly"
  | "laundry";

export type HotelCategory =
  | "Resort"
  | "Boutique Hotel"
  | "Grand Hotel"
  | "Private Villa"
  | "Lodge";

export type PropertyType = "hotel" | "shortlet";

export type Room = {
  id: string;
  name: string;
  tagline: string;
  wholeProperty?: boolean;
  sizeSqm: number;
  sleeps: number;
  bed: string;
  pricePerNight: number;
  image: string;
  amenities: AmenityKey[];
  left?: number;
};

export type Review = {
  id: string;
  author: string;
  country: string;
  rating: number;
  date: string;
  stay: string;
  text: string;
};

export type Hotel = {
  id: string;
  name: string;
  tagline: string;
  propertyType: PropertyType;
  category: HotelCategory;
  city: string;
  country: string;
  region: string;
  /** Relative position on the stylised map panel (0–100 %). */
  map: { x: number; y: number };
  rating: number;
  reviewCount: number;
  pricePerNight: number;
  originalPricePerNight?: number;
  badge?: string;
  distanceFromCenter: string;
  description: string;
  highlights: string[];
  gallery: string[];
  amenities: AmenityKey[];
  rooms: Room[];
  reviews: Review[];
  /** Filter/search tags, lowercased. */
  tags: string[];
  featured?: boolean;
};

export type Destination = {
  id: string;
  name: string;
  country: string;
  image: string;
  stayCount: number;
  fromPrice: number;
  blurb: string;
};

export type Testimonial = {
  id: string;
  name: string;
  location: string;
  hotel: string;
  rating: number;
  text: string;
  initials: string;
};

export type GuestCounts = {
  adults: number;
  children: number;
  rooms: number;
};

export type SortKey =
  | "recommended"
  | "price-asc"
  | "price-desc"
  | "rating"
  | "reviews";

export type SearchState = {
  destination: string;
  checkIn: string | null;
  checkOut: string | null;
  guests: GuestCounts;
};

export type BookingPayload = {
  hotelId: string;
  roomId: string;
  checkIn: string;
  checkOut: string;
  guests: GuestCounts;
  total: number;
  reference: string;
};
