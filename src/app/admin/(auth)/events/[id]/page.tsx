import Link from "next/link";
import { notFound } from "next/navigation";
import EventForm from "../EventForm";
import { updateEventAction } from "../actions";
import { getEventById } from "@/lib/events";

export default async function EditEventPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const event = await getEventById(id);
  if (!event) notFound();

  const boundAction = updateEventAction.bind(null, id);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="font-display text-2xl font-semibold gold-text sm:text-3xl">
          עריכת אירוע
        </h1>
        <Link
          href="/admin"
          className="text-sm text-gold-300 hover:text-gold-100"
        >
          ← חזרה לרשימה
        </Link>
      </div>
      <p className="text-sm text-gray-400">{event.title}</p>
      <EventForm mode="edit" initial={event} action={boundAction} />
    </div>
  );
}
