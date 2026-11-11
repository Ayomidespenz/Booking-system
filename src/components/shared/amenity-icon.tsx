import {
  Bell,
  Briefcase,
  Bus,
  CircleParking,
  Coffee,
  Dumbbell,
  Flower2,
  HeartHandshake,
  PawPrint,
  Shirt,
  Snowflake,
  Umbrella,
  UtensilsCrossed,
  Waves,
  Wifi,
  Wine,
  type LucideIcon,
} from "lucide-react";
import type { AmenityKey } from "@/lib/types";
import { cn } from "@/lib/utils";

/** Human labels + icons for every amenity in the domain model. */
export const AMENITY_META: Record<AmenityKey, { label: string; icon: LucideIcon }> = {
  wifi: { label: "High-speed WiFi", icon: Wifi },
  pool: { label: "Pool", icon: Waves },
  spa: { label: "Spa & wellness", icon: Flower2 },
  gym: { label: "Fitness centre", icon: Dumbbell },
  restaurant: { label: "Restaurant", icon: UtensilsCrossed },
  bar: { label: "Bar", icon: Wine },
  breakfast: { label: "Breakfast", icon: Coffee },
  parking: { label: "Parking", icon: CircleParking },
  ac: { label: "Air conditioning", icon: Snowflake },
  roomService: { label: "Room service", icon: Bell },
  beach: { label: "Private beach", icon: Umbrella },
  shuttle: { label: "Airport shuttle", icon: Bus },
  concierge: { label: "Concierge", icon: HeartHandshake },
  workspace: { label: "Workspace", icon: Briefcase },
  petFriendly: { label: "Pet friendly", icon: PawPrint },
  laundry: { label: "Laundry", icon: Shirt },
};

export function amenityLabel(key: AmenityKey): string {
  return AMENITY_META[key].label;
}

/** Icon for a single amenity (decorative — pair with a text label). */
export function AmenityIcon({
  amenity,
  className,
}: {
  amenity: AmenityKey;
  className?: string;
}) {
  const Icon = AMENITY_META[amenity].icon;
  return <Icon className={cn("h-4 w-4", className)} aria-hidden />;
}
