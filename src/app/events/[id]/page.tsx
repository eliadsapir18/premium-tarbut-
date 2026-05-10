import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  getAllEvents,
  getEventById,
  getEventBySlug,
  getRelatedEvents,
} from "@/lib/events";
import { getCurrentUser } from "@/lib/user-auth";
import EventCard from "@/components/EventCard";
import OrderForm from "./OrderForm";

export const revalidate = 60;

export async function generateStaticParams() {
  const all = await getAllEvents();
  return all.map((e) => ({ id: e.slug }));
}

export default async function EventDetailsPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const event = (await getEventBySlug(id)) ?? (await getEventById(id));
  if (!event) notFound();

  const [related, currentUser] = await Promise.all([
    getRelatedEvents(event.category, event.id, 3),
    getCurrentUser(),
  ]);

  return (
    <>
      {/* Cinematic hero */}
      <section className="relative">
        <div className="relative h-[60vh] min-h-[420px] w-full overflow-hidden">
          <Image
            src={event.image}
            alt={event.title}
            fill
            priority
            sizes="100vw"
            className="object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-ink-950 via-ink-950/70 to-ink-950/20" />
          <div className="absolute inset-x-0 bottom-0 container-prem pb-10">
            <Link
              href="/events"
              className="mb-4 inline-flex items-center gap-1 text-sm text-gold-300 hover:text-gold-100"
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" aria-hidden>
                <path d="M10 17l5-5-5-5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
              חזרה לאירועים
            </Link>
            <span className="chip mb-3 inline-flex">{event.categoryLabel}</span>
            <h1 className="font-display text-4xl font-semibold gold-text sm:text-5xl md:text-6xl">
              {event.title}
            </h1>
            {event.artist && (
              <p className="mt-2 text-lg text-gold-200/90">{event.artist}</p>
            )}
          </div>
        </div>
      </section>

      <section className="container-prem grid gap-10 py-14 lg:grid-cols-[1.6fr_1fr]">
        {/* Main content */}
        <div>
          <div className="card-prem grid grid-cols-1 gap-4 p-5 sm:grid-cols-3 sm:p-6">
            <InfoTile
              title="תאריך"
              value={event.dateLabel}
              sub={event.timeLabel}
              icon="cal"
            />
            <InfoTile title="מיקום" value={event.venue} sub={event.city} icon="pin" />
            <InfoTile
              title="החל מ"
              value={`₪${event.priceFrom}`}
              sub="לכרטיס"
              icon="ticket"
            />
          </div>

          <div className="mt-10">
            <h2 className="font-display text-2xl font-semibold text-gold-100">
              על האירוע
            </h2>
            <div className="divider-gold mt-3 mr-0 ml-auto" style={{ marginLeft: 0 }} />
            <p className="mt-5 whitespace-pre-line text-base leading-8 text-gray-200">
              {event.longDescription}
            </p>
          </div>

          {/* Important event info */}
          <div className="mt-12">
            <h2 className="font-display text-2xl font-semibold text-gold-100">
              מידע חשוב
            </h2>
            <div className="divider-gold mt-3 mr-0 ml-auto" style={{ marginLeft: 0 }} />
            <ul className="mt-5 grid gap-3 sm:grid-cols-2">
              <InfoItem
                icon="door"
                title="פתיחת דלתות"
                body={`כשעה לפני תחילת המופע (${event.timeLabel})`}
              />
              <InfoItem
                icon="age"
                title="גיל מומלץ"
                body={
                  event.category === "kids"
                    ? "מתאים לכל המשפחה — מגיל 3 ומעלה"
                    : "מגיל 14 ומעלה (קטינים בליווי מבוגר)"
                }
              />
              <InfoItem
                icon="access"
                title="נגישות"
                body="האולם נגיש לכיסאות גלגלים. לתיאום מראש דברו איתנו בוואטסאפ."
              />
              <InfoItem
                icon="park"
                title="חניה"
                body="חניה זמינה במתחם או בקרבת מקום. מומלץ להגיע מוקדם."
              />
            </ul>
          </div>

          {related.length > 0 && (
            <div className="mt-14">
              <h2 className="font-display text-2xl font-semibold text-gold-100">
                אירועים דומים
              </h2>
              <div className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {related.map((r) => (
                  <EventCard key={r.id} event={r} />
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Tickets sidebar */}
        <aside className="lg:sticky lg:top-28 lg:self-start">
          <div className="card-prem p-6">
            <h2 className="font-display text-xl font-semibold text-gold-100">
              בחירת כרטיסים
            </h2>
            <p className="mt-1 text-xs text-gray-400">
              בחרו סוג כרטיס וכמות. נחזור אליכם לסיום הרכישה.
            </p>

            <OrderForm
              eventSlug={event.slug}
              tickets={event.tickets}
              isLoggedIn={!!currentUser}
            />

            <a
              href={`https://wa.me/972546503587?text=${encodeURIComponent(
                "שלום, אשמח לקבל פרטים על " + event.title
              )}`}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-ghost mt-3 w-full"
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
                <path d="M12.04 2C6.58 2 2.13 6.45 2.13 11.91c0 2.1.55 4.15 1.6 5.96L2 22l4.27-1.12a9.86 9.86 0 0 0 5.77 1.83h.01c5.46 0 9.91-4.45 9.91-9.91 0-2.65-1.03-5.14-2.9-7.01A9.84 9.84 0 0 0 12.04 2Z" />
              </svg>
              שאלה בוואטסאפ
            </a>

            <ul className="mt-5 space-y-2 text-[11px] text-gray-400">
              <li className="flex items-center gap-2">
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" aria-hidden>
                  <rect x="4" y="10" width="16" height="11" rx="2" stroke="currentColor" strokeWidth="1.6" />
                  <path d="M8 10V7a4 4 0 1 1 8 0v3" stroke="currentColor" strokeWidth="1.6" />
                </svg>
                תשלום מאובטח SSL — פרטי הכרטיס לא נשמרים
              </li>
              <li className="flex items-center gap-2">
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" aria-hidden>
                  <path d="M3 8a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2v2a2 2 0 0 0 0 4v2a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-2a2 2 0 0 0 0-4V8Z" stroke="currentColor" strokeWidth="1.6" />
                </svg>
                כרטיס דיגיטלי לאימייל מיד לאחר התשלום
              </li>
              <li className="flex items-center gap-2">
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" aria-hidden>
                  <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="1.6" />
                  <path d="M12 7v5l3 2" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
                </svg>
                ביטול אפשרי לפי{" "}
                <Link href="/cancellation" className="text-gold-300 hover:text-gold-100 underline">
                  מדיניות הביטולים
                </Link>
              </li>
            </ul>
          </div>

          <Link
            href="/events"
            className="mt-4 block text-center text-sm text-gold-300 hover:text-gold-100"
          >
            ← חזרה לכל האירועים
          </Link>
        </aside>
      </section>
    </>
  );
}

function InfoTile({
  title,
  value,
  sub,
  icon,
}: {
  title: string;
  value: string;
  sub?: string;
  icon: "cal" | "pin" | "ticket";
}) {
  return (
    <div className="flex items-center gap-4 p-1">
      <div className="flex h-12 w-12 flex-none items-center justify-center rounded-xl border border-gold-400/30 bg-ink-900 text-gold-300">
        {icon === "cal" && (
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden>
            <rect x="3.5" y="5" width="17" height="15" rx="2" stroke="currentColor" strokeWidth="1.5" />
            <path d="M3.5 9.5h17M8 3.5v3M16 3.5v3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
          </svg>
        )}
        {icon === "pin" && (
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden>
            <path d="M12 21s7-5.5 7-11.5A7 7 0 1 0 5 9.5C5 15.5 12 21 12 21Z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
            <circle cx="12" cy="9.5" r="2.4" stroke="currentColor" strokeWidth="1.5" />
          </svg>
        )}
        {icon === "ticket" && (
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden>
            <path d="M3 8a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2v2a2 2 0 0 0 0 4v2a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-2a2 2 0 0 0 0-4V8Z" stroke="currentColor" strokeWidth="1.6" />
            <path d="M11 6v12" stroke="currentColor" strokeWidth="1.6" strokeDasharray="2 2" />
          </svg>
        )}
      </div>
      <div>
        <div className="text-xs uppercase tracking-wider text-gold-300/80">{title}</div>
        <div className="font-display text-lg text-gold-100">{value}</div>
        {sub && <div className="text-xs text-gray-400">{sub}</div>}
      </div>
    </div>
  );
}

function InfoItem({
  icon,
  title,
  body,
}: {
  icon: "door" | "age" | "access" | "park";
  title: string;
  body: string;
}) {
  return (
    <li className="card-prem flex items-start gap-3 p-4">
      <div className="flex h-10 w-10 flex-none items-center justify-center rounded-lg border border-gold-400/25 bg-ink-900 text-gold-300">
        {icon === "door" && (
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden>
            <path d="M5 21V5a2 2 0 0 1 2-2h7a2 2 0 0 1 2 2v16" stroke="currentColor" strokeWidth="1.6" />
            <path d="M3 21h16M13 12h.01" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
          </svg>
        )}
        {icon === "age" && (
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden>
            <circle cx="12" cy="8" r="4" stroke="currentColor" strokeWidth="1.6" />
            <path d="M4 21c0-4 4-7 8-7s8 3 8 7" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
          </svg>
        )}
        {icon === "access" && (
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden>
            <circle cx="12" cy="4.5" r="2" stroke="currentColor" strokeWidth="1.6" />
            <path d="M9 9l6 0M9 9l1 5h5l1 4M14 14l3 5" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
            <circle cx="11" cy="17" r="4" stroke="currentColor" strokeWidth="1.6" />
          </svg>
        )}
        {icon === "park" && (
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden>
            <rect x="4" y="4" width="16" height="16" rx="3" stroke="currentColor" strokeWidth="1.6" />
            <path d="M10 16V8h3a2.5 2.5 0 0 1 0 5h-3" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        )}
      </div>
      <div>
        <div className="text-sm font-semibold text-gold-100">{title}</div>
        <div className="mt-0.5 text-xs leading-5 text-gray-400">{body}</div>
      </div>
    </li>
  );
}
