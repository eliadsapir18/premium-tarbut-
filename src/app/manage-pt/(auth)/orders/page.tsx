import Link from "next/link";
import { desc, eq } from "drizzle-orm";
import { db } from "@/db";
import { orders, users, type OrderStatus } from "@/db/schema";
import { updateOrderStatusAction } from "./actions";

export const dynamic = "force-dynamic";

const STATUS_LABELS: Record<OrderStatus, string> = {
  pending: "ממתין",
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

function formatTime(d: Date): string {
  return d.toLocaleTimeString("he-IL", {
    hour: "2-digit",
    minute: "2-digit",
  });
}

export default async function AdminOrdersPage() {
  const rows = await db
    .select({
      id: orders.id,
      eventId: orders.eventId,
      eventTitle: orders.eventTitleSnapshot,
      tierName: orders.ticketTierName,
      tierPrice: orders.ticketPriceSnapshot,
      quantity: orders.quantity,
      notes: orders.notes,
      status: orders.status,
      createdAt: orders.createdAt,
      userName: users.name,
      userEmail: users.email,
      userPhone: users.phone,
    })
    .from(orders)
    .innerJoin(users, eq(orders.userId, users.id))
    .orderBy(desc(orders.createdAt));

  const pendingCount = rows.filter((r) => r.status === "pending").length;

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <h1 className="font-display text-2xl font-semibold gold-text sm:text-3xl">
            כל ההזמנות
          </h1>
          <p className="mt-1 text-sm text-gray-400">
            {rows.length} סה״כ ·{" "}
            <span className="text-amber-300">{pendingCount} ממתינות לטיפול</span>
          </p>
        </div>
        <nav className="flex gap-2 text-sm">
          <Link href="/manage-pt" className="text-gold-300 hover:text-gold-100">
            אירועים
          </Link>
          <span className="text-gray-600">·</span>
          <Link href="/manage-pt/users" className="text-gold-300 hover:text-gold-100">
            משתמשים
          </Link>
        </nav>
      </div>

      {rows.length === 0 ? (
        <div className="card-prem p-10 text-center">
          <p className="text-gray-300">עדיין אין הזמנות.</p>
        </div>
      ) : (
        <ul className="space-y-4">
          {rows.map((r) => {
            const total = r.tierPrice * r.quantity;
            return (
              <li key={r.id} className="card-prem p-5">
                <div className="flex flex-wrap items-start justify-between gap-3">
                  <div>
                    <Link
                      href={`/events/${r.eventId}`}
                      target="_blank"
                      className="font-display text-lg font-semibold text-gold-100 hover:text-gold-50"
                    >
                      {r.eventTitle} ↗
                    </Link>
                    <p className="mt-1 text-sm text-gray-300">
                      {r.tierName} · {r.quantity}×₪{r.tierPrice} ={" "}
                      <span className="font-semibold text-gold-200">₪{total}</span>
                    </p>
                  </div>
                  <span
                    className={`rounded-full border px-3 py-1 text-xs ${STATUS_STYLES[r.status]}`}
                  >
                    {STATUS_LABELS[r.status]}
                  </span>
                </div>

                <div className="mt-4 grid gap-3 rounded-xl border border-gold-400/15 bg-ink-900 p-4 sm:grid-cols-3">
                  <div>
                    <div className="text-xs uppercase tracking-wider text-gold-300/80">
                      שם
                    </div>
                    <div className="mt-1 text-sm text-gold-100">{r.userName}</div>
                  </div>
                  <div>
                    <div className="text-xs uppercase tracking-wider text-gold-300/80">
                      אימייל
                    </div>
                    <div className="mt-1 text-xs">
                      <a
                        href={`mailto:${r.userEmail}`}
                        className="text-gold-300 hover:text-gold-100"
                      >
                        {r.userEmail}
                      </a>
                    </div>
                  </div>
                  <div>
                    <div className="text-xs uppercase tracking-wider text-gold-300/80">
                      טלפון
                    </div>
                    <div className="mt-1 text-xs" dir="ltr">
                      <a
                        href={`tel:${r.userPhone}`}
                        className="text-gold-300 hover:text-gold-100"
                      >
                        {r.userPhone}
                      </a>{" "}
                      ·{" "}
                      <a
                        href={`https://wa.me/${r.userPhone.replace(/[^\d]/g, "").replace(/^0/, "972")}?text=${encodeURIComponent(`שלום ${r.userName}, התקבלה בקשתך לרכישת ${r.quantity} כרטיסי "${r.tierName}" ל-${r.eventTitle}.`)}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-emerald-300 hover:text-emerald-200"
                      >
                        WhatsApp
                      </a>
                    </div>
                  </div>
                </div>

                {r.notes && (
                  <p className="mt-3 rounded-lg border border-gold-400/15 bg-ink-900 p-3 text-xs text-gray-300">
                    הערה: {r.notes}
                  </p>
                )}

                <div className="mt-4 flex flex-wrap items-center justify-between gap-3">
                  <p className="text-[11px] text-gray-500">
                    הוזמן ב-{formatDate(r.createdAt)} · {formatTime(r.createdAt)}
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {(["pending", "confirmed", "cancelled"] as OrderStatus[])
                      .filter((s) => s !== r.status)
                      .map((s) => (
                        <form key={s} action={updateOrderStatusAction}>
                          <input type="hidden" name="id" value={r.id} />
                          <input type="hidden" name="status" value={s} />
                          <button
                            type="submit"
                            className={`rounded-lg border px-3 py-1.5 text-xs hover:border-current ${STATUS_STYLES[s]}`}
                          >
                            סמן כ{STATUS_LABELS[s]}
                          </button>
                        </form>
                      ))}
                  </div>
                </div>
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
}
