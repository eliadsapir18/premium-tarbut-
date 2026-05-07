export type EventCategory =
  | "concerts"
  | "standup"
  | "theater"
  | "kids"
  | "lectures"
  | "festivals";

export interface TicketTier {
  name: string;
  price: number;
  description?: string;
  available: boolean;
}

export interface CultureEvent {
  id: string;
  slug: string;
  title: string;
  artist?: string;
  category: EventCategory;
  categoryLabel: string;
  date: string;            // ISO
  dateLabel: string;       // Hebrew display
  specialLabel?: string;   // e.g. "יום ירושלים"
  timeLabel: string;       // e.g. "21:00"
  venue: string;
  city: string;
  description: string;
  longDescription: string;
  image: string;           // URL or local path
  imagePosition?: string;  // CSS object-position, e.g. "center left"
  priceFrom: number;
  featured?: boolean;
  tickets: TicketTier[];
}

export interface Category {
  id: EventCategory;
  label: string;
  description: string;
  count: number;
  icon: string; // svg name key
}
