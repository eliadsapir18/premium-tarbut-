import Link from "next/link";
import EventForm from "../EventForm";
import { createEventAction } from "../actions";

export default function NewEventPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="font-display text-2xl font-semibold gold-text sm:text-3xl">
          אירוע חדש
        </h1>
        <Link
          href="/manage-pt"
          className="text-sm text-gold-300 hover:text-gold-100"
        >
          ← חזרה לרשימה
        </Link>
      </div>
      <EventForm mode="create" action={createEventAction} />
    </div>
  );
}
