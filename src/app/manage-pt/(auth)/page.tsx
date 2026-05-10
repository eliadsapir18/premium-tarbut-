import Link from "next/link";
import Image from "next/image";
import { getAllEvents } from "@/lib/events";
import { deleteEventAction } from "./events/actions";
import ConfirmingDeleteButton from "./ConfirmingDeleteButton";

export const dynamic = "force-dynamic";

export default async function AdminEventsPage() {
  const events = await getAllEvents();

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <h1 className="font-display text-2xl font-semibold gold-text sm:text-3xl">
            כל האירועים
          </h1>
          <p className="mt-1 text-sm text-gray-400">
            סה״כ {events.length} אירועים במערכת
          </p>
        </div>
        <Link href="/manage-pt/events/new" className="btn-gold">
          + אירוע חדש
        </Link>
      </div>

      {events.length === 0 ? (
        <div className="card-prem p-10 text-center">
          <p className="text-gray-300">
            אין אירועים עדיין. לחצו על &quot;אירוע חדש&quot; כדי להתחיל.
          </p>
        </div>
      ) : (
        <div className="card-prem overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-right text-sm">
              <thead className="border-b border-gold-400/15 bg-ink-900/60 text-xs uppercase tracking-wider text-gold-300/80">
                <tr>
                  <th className="p-3 font-medium">תמונה</th>
                  <th className="p-3 font-medium">אירוע</th>
                  <th className="p-3 font-medium">תאריך</th>
                  <th className="p-3 font-medium">קטגוריה</th>
                  <th className="p-3 font-medium">מחיר מ</th>
                  <th className="p-3 font-medium">נבחר</th>
                  <th className="p-3 font-medium">פעולות</th>
                </tr>
              </thead>
              <tbody>
                {events.map((ev) => (
                  <tr
                    key={ev.id}
                    className="border-b border-gold-400/10 last:border-b-0 hover:bg-ink-900/40"
                  >
                    <td className="p-3">
                      <div className="relative h-12 w-16 overflow-hidden rounded-lg">
                        <Image
                          src={ev.image}
                          alt={ev.title}
                          fill
                          sizes="64px"
                          className="object-cover"
                        />
                      </div>
                    </td>
                    <td className="p-3">
                      <div className="font-medium text-gold-100">{ev.title}</div>
                      <div className="text-xs text-gray-500">
                        {ev.venue} · {ev.city}
                      </div>
                    </td>
                    <td className="p-3 text-xs text-gray-300">
                      {ev.dateLabel}
                      <div className="text-[11px] text-gray-500">
                        {ev.timeLabel}
                      </div>
                    </td>
                    <td className="p-3 text-xs text-gray-300">
                      {ev.categoryLabel}
                    </td>
                    <td className="p-3 text-xs text-gold-200">
                      ₪{ev.priceFrom}
                    </td>
                    <td className="p-3">
                      {ev.featured ? (
                        <span className="chip">★ נבחר</span>
                      ) : (
                        <span className="text-xs text-gray-500">—</span>
                      )}
                    </td>
                    <td className="p-3">
                      <div className="flex items-center gap-2">
                        <Link
                          href={`/manage-pt/events/${ev.id}`}
                          className="rounded-lg border border-gold-400/30 px-3 py-1.5 text-xs text-gold-200 hover:border-gold-400 hover:text-gold-100"
                        >
                          עריכה
                        </Link>
                        <DeleteButton id={ev.id} title={ev.title} />
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}

function DeleteButton({ id, title }: { id: string; title: string }) {
  return (
    <form action={deleteEventAction}>
      <input type="hidden" name="id" value={id} />
      <ConfirmingDeleteButton title={title} />
    </form>
  );
}
