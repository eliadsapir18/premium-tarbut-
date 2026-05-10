import Link from "next/link";
import { desc, sql } from "drizzle-orm";
import { db } from "@/db";
import { users, orders } from "@/db/schema";

export const dynamic = "force-dynamic";

function formatDate(d: Date): string {
  return d.toLocaleDateString("he-IL", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  });
}

export default async function AdminUsersPage() {
  const rows = await db
    .select({
      id: users.id,
      name: users.name,
      email: users.email,
      phone: users.phone,
      createdAt: users.createdAt,
      orderCount: sql<number>`(
        SELECT COUNT(*)::int FROM ${orders} WHERE ${orders.userId} = ${users.id}
      )`,
    })
    .from(users)
    .orderBy(desc(users.createdAt));

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <h1 className="font-display text-2xl font-semibold gold-text sm:text-3xl">
            משתמשים רשומים
          </h1>
          <p className="mt-1 text-sm text-gray-400">
            סה״כ {rows.length} משתמשים במערכת
          </p>
        </div>
        <nav className="flex gap-2 text-sm">
          <Link href="/manage-pt" className="text-gold-300 hover:text-gold-100">
            אירועים
          </Link>
          <span className="text-gray-600">·</span>
          <Link href="/manage-pt/orders" className="text-gold-300 hover:text-gold-100">
            הזמנות
          </Link>
        </nav>
      </div>

      {rows.length === 0 ? (
        <div className="card-prem p-10 text-center">
          <p className="text-gray-300">עדיין אין משתמשים רשומים.</p>
        </div>
      ) : (
        <div className="card-prem overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-right text-sm">
              <thead className="border-b border-gold-400/15 bg-ink-900/60 text-xs uppercase tracking-wider text-gold-300/80">
                <tr>
                  <th className="p-3 font-medium">שם</th>
                  <th className="p-3 font-medium">אימייל</th>
                  <th className="p-3 font-medium">טלפון</th>
                  <th className="p-3 font-medium">הזמנות</th>
                  <th className="p-3 font-medium">הצטרף ב</th>
                </tr>
              </thead>
              <tbody>
                {rows.map((u) => (
                  <tr
                    key={u.id}
                    className="border-b border-gold-400/10 last:border-b-0 hover:bg-ink-900/40"
                  >
                    <td className="p-3 font-medium text-gold-100">{u.name}</td>
                    <td className="p-3 text-xs text-gray-300">
                      <a
                        href={`mailto:${u.email}`}
                        className="text-gold-300 hover:text-gold-100"
                      >
                        {u.email}
                      </a>
                    </td>
                    <td className="p-3 text-xs text-gray-300" dir="ltr">
                      <a
                        href={`tel:${u.phone}`}
                        className="text-gold-300 hover:text-gold-100"
                      >
                        {u.phone}
                      </a>
                    </td>
                    <td className="p-3 text-xs text-gold-200">
                      {u.orderCount}
                    </td>
                    <td className="p-3 text-xs text-gray-400">
                      {formatDate(u.createdAt)}
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
