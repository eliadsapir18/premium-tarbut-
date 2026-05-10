import { getAllEvents } from "@/lib/events";
import EventsClient from "./EventsClient";
import type { EventCategory } from "@/lib/types";

export const revalidate = 60;

const VALID_CATS: EventCategory[] = [
  "concerts",
  "standup",
  "theater",
  "kids",
  "lectures",
  "festivals",
];

export default async function EventsPage({
  searchParams,
}: {
  searchParams: Promise<{ cat?: string }>;
}) {
  const events = await getAllEvents();
  const { cat } = await searchParams;
  const initialCategory = VALID_CATS.includes(cat as EventCategory)
    ? (cat as EventCategory)
    : "all";
  return <EventsClient events={events} initialCategory={initialCategory} />;
}
