import Link from "next/link";
import { redirect } from "next/navigation";
import { desc, eq } from "drizzle-orm";
import { db } from "@/db";
import { orders, type OrderStatus } from "@/db/schema";
import { getCurrentUser } from "@/lib/user-auth";
import { logoutAction } from "@/lib/auth-actions";

export const dynamic = "force-dynamic";

const STATUS_LABELS: Record<OrderStatus, string> = {
  pending: "ממתין לאישור",
  confirmed: "אושר",
  cancelled: "בוטל",
};

const STATUS_STYLES: Record<OrderStatus, string> = {
  pending: "border-amber-400/40 text-amber-300 bg-amber-400/10",
  confirmed: "border-emerald-400/40 text-emerald-300 bg-emerald-400/10",
  cancelled: "border-red-400/40 text-red-300 bg-red-400/10",
};

function formatDate(d: Date): string {
  return d.toLocaleDateString("he-IL", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  });
}

export default async function AccountPage() {
  const user = await getCurrentUser();
  if (!user) redirect("/login?next=/account");

  const myOrders = await db
    .select()
    .from(orders)
    .where(eq(orders.userId, user.id))
    .orderBy(desc(orders.createdAt));

  return (
    <div className="container-prem py-12 sm:py-16">
      <div className="grid gap-8 lg:grid-cols-[1fr_2fr]">
        <aside className="space-y-4">
          <div className="card-prem p-6">
            <h1 className="font-display text-2xl font-semibold gold-text">
              שלום, {user.name.split(" ")[0]}
            </h1>
            <p className="mt-1 text-xs text-gray-400">
              חבר/ה מ-{formatDate(user.createdAt)}
            </p>

            <dl className="mt-6 space-y-4 text-sm">
              <div>
                <dt className="text-xs uppercase tracking-wider text-gold-300/80">
                  שם מלא
                </dt>
                <dd className="mt-1 text-gold-100">{user.name}</dd>
              </div>
              <div>
                <dt className="text-xs uppercase tracking-wider text-gold-300/80">
                  אימייל
                </dt>
                <dd className="mt-1 text-gold-100">{user.email}</dd>
              </div>
              <div>
                <dt className="text-xs uppercase tracking-wider text-gold-300/80">
                  טלפון
                </dt>
                <dd className="mt-1 text-gold-100">{user.phone}</dd>
              </div>
            </dl>

            <form action={logoutAction} className="mt-8">
              <button type="submit" className="btn-ghost w-full">
                יציאה
              </button>
            </form>
          </div>

          <Link href="/events" className="btn-gold w-full">
            צפייה באירועים
          </Link>
        </aside>

        <section>
          <header className="flex items-end justify-between">
            <h2 className="font-display text-2xl font-semibold text-gold-100">
              ההזמנות שלי
            </h2>
            <span className="text-xs text-gray-400">
              {myOrders.length} {myOrders.length === 1 ? "הזמנה" : "הזמנות"}
            </span>
          </header>
          <div
            className="divider-gold mt-3 mr-0"
            style={{ marginLeft: "auto" }}
          />

          {myOrders.length === 0 ? (
            <div className="card-prem mt-8 p-10 text-center">
              <p className="text-gray-300">עדיין אין לכם הזמנות</p>
              <Link
                href="/events"
                className="mt-4 inline-block text-sm text-gold-300 hover:text-gold-100"
              >
                לכל האירועים ←
              </Link>
            </div>
          ) : (
            <ul className="mt-6 space-y-4">
              {myOrders.map((order) => (
                <li key={order.id} className="card-prem p-5">
                  <div className="flex flex-wrap items-start justify-between gap-3">
                    <div>
                      <Link
                        href={`/events/${order.eventId}`}
                        className="font-display text-lg font-semibold text-gold-100 hover:text-gold-50"
                      >
                        {order.eventTitleSnapshot}
                      </Link>
                      <p className="mt-1 text-xs text-gray-400">
                        {order.ticketTierName} · {order.quantity}{" "}
                        {order.quantity === 1 ? "כרטיס" : "כרטיסים"} · ₪
                        {order.ticketPriceSnapshot * order.quantity}
                      </p>
                    </div>
                    <span
                      className={`rounded-full border px-3 py-1 text-xs ${STATUS_STYLES[order.status]}`}
                    >
                      {STATUS_LABELS[order.status]}
                    </span>
                  </div>
                  {order.notes && (
                    <p className="mt-3 rounded-lg border border-gold-400/15 bg-ink-900 p-3 text-xs text-gray-300">
                      {order.notes}
                    </p>
                  )}
                  <p className="mt-3 text-[11px] text-gray-500">
                    הוזמן ב-{formatDate(order.createdAt)}
                  </p>
                </li>
              ))}
            </ul>
          )}
        </section>
      </div>
    </div>
  );
}
