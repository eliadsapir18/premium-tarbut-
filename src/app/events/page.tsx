import { getAllEvents } from "@/lib/events";
import EventsClient from "./EventsClient";

export const revalidate = 60;

export default async function EventsPage() {
  const events = await getAllEvents();
  return <EventsClient events={events} />;
}
