export type PortalKind = "partner" | "admin";

export type PortalRow = {
  primary: string;
  secondary: string;
  status: string;
  detail: string;
};

export type PortalSection = {
  title: string;
  description: string;
  rows: PortalRow[];
};

export const partnerSections: Record<string, PortalSection> = {
  properties: {
    title: "Property inventory",
    description: "A sample view of property details, room types, and listing readiness.",
    rows: [
      { primary: "Sample Hotel", secondary: "Hotel · Ijebu Ode", status: "Draft preview", detail: "24 sample rooms" },
      { primary: "Sample Family Apartment", secondary: "Shortlet · Ijebu Ode", status: "Draft preview", detail: "3 bedrooms · 6 guests" },
    ],
  },
  bookings: {
    title: "Bookings",
    description: "Example guest and walk-in records. No reservations are being created or changed.",
    rows: [
      { primary: "BK-1042 · A. Adeyemi", secondary: "Sample Hotel · Standard room", status: "Awaiting payment", detail: "12–14 May · 2 guests" },
      { primary: "BK-1041 · K. Okafor", secondary: "Sample Family Apartment", status: "Confirmed", detail: "12–15 May · 5 guests" },
      { primary: "WI-028 · Walk-in", secondary: "Sample Hotel · Deluxe room", status: "Checked in", detail: "11–12 May · 1 guest" },
    ],
  },
  housekeeping: {
    title: "Housekeeping",
    description: "Example room-readiness tasks for a phone-friendly daily operations view.",
    rows: [
      { primary: "Room 204 · Deluxe", secondary: "Sample Hotel", status: "Needs cleaning", detail: "Checkout · 10:00" },
      { primary: "Room 108 · Standard", secondary: "Sample Hotel", status: "In progress", detail: "Arrival · 14:00" },
      { primary: "Family Apartment", secondary: "Sample Family Apartment", status: "Ready", detail: "Arrival · 15:00" },
    ],
  },
  reports: {
    title: "Owner insights",
    description: "Illustrative occupancy and revenue metrics; these figures are not connected to live transactions.",
    rows: [
      { primary: "Occupancy", secondary: "Sample Hotel", status: "74%", detail: "This month" },
      { primary: "Average room rate", secondary: "Sample Hotel", status: "₦28,500", detail: "This month" },
      { primary: "Revenue recorded", secondary: "Sample Hotel", status: "₦2,394,000", detail: "This month" },
      { primary: "Reconciliation alert", secondary: "Sample Hotel · Room 204", status: "Needs review", detail: "No matching payment in preview data" },
    ],
  },
  team: {
    title: "Team and access",
    description: "Example role assignments. Access controls must be enforced by your backend.",
    rows: [
      { primary: "Property owner", secondary: "Owner role", status: "Full access", detail: "1 sample account" },
      { primary: "Front desk", secondary: "Receptionist role", status: "Daily operations", detail: "1 sample account" },
      { primary: "Room care", secondary: "Housekeeping role", status: "Task updates", detail: "1 sample account" },
    ],
  },
};

export const adminSections: Record<string, PortalSection> = {
  properties: {
    title: "Property verification",
    description: "Example onboarding queue for document checks and physical inspections.",
    rows: [
      { primary: "Sample Hotel", secondary: "Hotel · Ijebu Ode", status: "Documents pending", detail: "Licence and ownership evidence" },
      { primary: "Sample Family Apartment", secondary: "Shortlet · Ijebu Ode", status: "Inspection pending", detail: "Address and condition review" },
    ],
  },
  bookings: {
    title: "Booking oversight",
    description: "Example booking exceptions for support and operations review.",
    rows: [
      { primary: "BK-1042", secondary: "Sample Hotel · Availability request", status: "Payment pending", detail: "Created 10 minutes ago" },
      { primary: "BK-1041", secondary: "Sample Family Apartment", status: "Confirmed", detail: "Guest details withheld in preview" },
      { primary: "BK-1038", secondary: "Sample Hotel · Room 204", status: "Exception", detail: "Occupancy and payment need reconciliation" },
    ],
  },
  payments: {
    title: "Payments and settlements",
    description: "Illustrative reconciliation rows. No money is collected, moved, or refunded here.",
    rows: [
      { primary: "TX-2204", secondary: "Sample Hotel · BK-1041", status: "Matched", detail: "₦57,000 · Sample transfer" },
      { primary: "TX-2203", secondary: "Sample Family Apartment · BK-1040", status: "Review needed", detail: "₦18,000 · Sample deposit" },
      { primary: "PO-031", secondary: "Sample Hotel · Settlement", status: "Queued", detail: "₦231,000 · Example payout" },
    ],
  },
  reviews: {
    title: "Review moderation",
    description: "Example moderation queue; review eligibility and audit history belong to the backend.",
    rows: [
      { primary: "Sample stay feedback", secondary: "Sample Hotel", status: "Awaiting moderation", detail: "Reported for review" },
      { primary: "Sample apartment feedback", secondary: "Sample Family Apartment", status: "Published", detail: "Partner reply requested" },
    ],
  },
  events: {
    title: "Events and demand",
    description: "A planning view for local events, campaign timing, and guest interest.",
    rows: [
      { primary: "Ojude Oba", secondary: "Ijebu Ode", status: "Planning calendar", detail: "Festival date to be confirmed" },
      { primary: "OOU and TASUED events", secondary: "Regional demand", status: "Recurring", detail: "Dates to be supplied by the platform team" },
      { primary: "Guest early-access list", secondary: "Festival campaign", status: "Preview", detail: "No signups are stored" },
    ],
  },
};

export const partnerNavigation = [
  { label: "Overview", href: "/partner" },
  { label: "Properties", href: "/partner/properties" },
  { label: "Bookings", href: "/partner/bookings" },
  { label: "Housekeeping", href: "/partner/housekeeping" },
  { label: "Reports", href: "/partner/reports" },
  { label: "Team", href: "/partner/team" },
] as const;

export const adminNavigation = [
  { label: "Overview", href: "/admin" },
  { label: "Verification", href: "/admin/properties" },
  { label: "Bookings", href: "/admin/bookings" },
  { label: "Payments", href: "/admin/payments" },
  { label: "Reviews", href: "/admin/reviews" },
  { label: "Events", href: "/admin/events" },
] as const;
