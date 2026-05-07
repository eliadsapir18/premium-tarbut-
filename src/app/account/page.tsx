"use client";

import Link from "next/link";
import { useState } from "react";

type Tab = "tickets" | "orders" | "details";

const MOCK_TICKETS = [
  {
    id: "T-2401",
    title: "עברי לידר — הופעה מיוחדת",
    date: "12 ביוני 2026, 21:00",
    venue: "היכל מנורה מבטחים, תל אביב",
    seat: "אולם · שורה 4 · מקום 12",
    code: "PRT-EVRI-04812",
  },
  {
    id: "T-2398",
    title: "פסטיבל קיסריה — לילות הים",
    date: "5 באוגוסט 2026, 21:00",
    venue: "אמפיתיאטרון קיסריה",
    seat: "VIP · שולחן 3",
    code: "PRT-CSR-VIP3",
  },
];

const MOCK_ORDERS = [
  { id: "ORD-10245", date: "01.04.2026", total: 598, items: 2, status: "שולם" },
  { id: "ORD-10212", date: "12.03.2026", total: 1290, items: 1, status: "שולם" },
  { id: "ORD-10199", date: "28.02.2026", total: 219, items: 1, status: "בוטל" },
];

export default function AccountPage() {
  const [tab, setTab] = useState<Tab>("tickets");

  return (
    <section className="container-prem py-14">
      <header className="card-prem flex flex-col items-start justify-between gap-4 p-6 sm:flex-row sm:items-center sm:p-8">
        <div className="flex items-center gap-4">
          <div className="flex h-14 w-14 items-center justify-center rounded-full border border-gold-400/40 bg-ink-900 text-gold-200">
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden>
              <path
                d="M12 12a4.5 4.5 0 1 0 0-9 4.5 4.5 0 0 0 0 9Zm0 2.25c-3.728 0-9 1.866-9 5.625V21h18v-1.125c0-3.759-5.272-5.625-9-5.625Z"
                stroke="currentColor"
                strokeWidth="1.5"
              />
            </svg>
          </div>
          <div>
            <h1 className="font-display text-3xl font-semibold gold-text">
              שלום, אליעד
            </h1>
            <p className="text-sm text-gray-300">ברוך הבא לאיזור האישי</p>
          </div>
        </div>
        <Link href="/login" className="btn-ghost">
          יציאה
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" aria-hidden>
            <path d="M14 8V5a2 2 0 0 0-2-2H5a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h7a2 2 0 0 0 2-2v-3M19 12H10m9 0l-3-3m3 3l-3 3" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </Link>
      </header>

      <div className="mt-8 grid gap-8 lg:grid-cols-[260px_1fr]">
        <nav className="card-prem flex flex-row flex-wrap gap-1 p-2 lg:flex-col" aria-label="ניווט אזור אישי">
          <TabBtn active={tab === "tickets"} onClick={() => setTab("tickets")} icon="ticket">
            הכרטיסים שלי
          </TabBtn>
          <TabBtn active={tab === "orders"} onClick={() => setTab("orders")} icon="orders">
            ההזמנות שלי
          </TabBtn>
          <TabBtn active={tab === "details"} onClick={() => setTab("details")} icon="user">
            פרטים אישיים
          </TabBtn>
          <Link
            href="/login"
            className="mt-1 inline-flex items-center gap-3 rounded-xl px-3 py-3 text-sm text-gray-300 hover:bg-gold-400/10 lg:mt-2"
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden>
              <path d="M14 8V5a2 2 0 0 0-2-2H5a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h7a2 2 0 0 0 2-2v-3M19 12H10m9 0l-3-3m3 3l-3 3" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            יציאה
          </Link>
        </nav>

        <div>
          {tab === "tickets" && <TicketsTab />}
          {tab === "orders" && <OrdersTab />}
          {tab === "details" && <DetailsTab />}
        </div>
      </div>
    </section>
  );
}

function TabBtn({
  active,
  onClick,
  children,
  icon,
}: {
  active: boolean;
  onClick: () => void;
  children: React.ReactNode;
  icon: "ticket" | "orders" | "user";
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`inline-flex items-center gap-3 rounded-xl px-3 py-3 text-sm transition-colors ${
        active
          ? "bg-gold-400/15 text-gold-100"
          : "text-gray-300 hover:bg-gold-400/10 hover:text-gold-200"
      }`}
    >
      {icon === "ticket" && (
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden>
          <path d="M3 8a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2v2a2 2 0 0 0 0 4v2a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-2a2 2 0 0 0 0-4V8Z" stroke="currentColor" strokeWidth="1.5" />
          <path d="M11 6v12" stroke="currentColor" strokeWidth="1.5" strokeDasharray="2 2" />
        </svg>
      )}
      {icon === "orders" && (
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden>
          <path d="M5 4h14l-1 16H6L5 4Z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
          <path d="M9 8h6M9 12h6M9 16h4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
        </svg>
      )}
      {icon === "user" && (
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden>
          <circle cx="12" cy="8" r="4" stroke="currentColor" strokeWidth="1.5" />
          <path d="M4 21c0-4 4-7 8-7s8 3 8 7" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
        </svg>
      )}
      <span>{children}</span>
    </button>
  );
}

function TicketsTab() {
  return (
    <div className="space-y-4">
      <h2 className="font-display text-2xl font-semibold text-gold-100">הכרטיסים שלי</h2>
      <p className="text-sm text-gray-400">כל הכרטיסים הפעילים שלכם, מוכנים להצגה בכניסה.</p>

      {MOCK_TICKETS.map((t) => (
        <article key={t.id} className="card-prem flex flex-col gap-4 overflow-hidden p-0 sm:flex-row">
          <div className="relative flex flex-col items-center justify-center bg-gold-gradient p-6 sm:w-48">
            <span className="font-display text-3xl font-bold text-ink-900">VIP</span>
            <span className="text-xs uppercase tracking-wider text-ink-900/80">פרימיום תרבות</span>
            <span className="absolute -bottom-2 left-0 right-0 h-4 bg-[radial-gradient(circle_at_8px_50%,_transparent_4px,_currentColor_4px)] text-ink-900 [background-size:16px_16px]" />
          </div>
          <div className="flex-1 p-5 sm:py-6">
            <div className="text-xs uppercase tracking-wider text-gold-300">{t.id}</div>
            <h3 className="mt-1 font-display text-xl font-semibold text-gold-100">{t.title}</h3>
            <ul className="mt-3 space-y-1 text-sm text-gray-300">
              <li>📅 {t.date}</li>
              <li>📍 {t.venue}</li>
              <li>🎟️ {t.seat}</li>
            </ul>
            <div className="mt-4 flex flex-wrap items-center gap-2">
              <code className="rounded-lg border border-gold-400/30 bg-ink-900 px-3 py-1.5 text-xs text-gold-200" dir="ltr">
                {t.code}
              </code>
              <button type="button" className="btn-ghost px-4 py-2 text-xs">
                הורדת PDF
              </button>
              <button type="button" className="btn-ghost px-4 py-2 text-xs">
                שליחה במייל
              </button>
            </div>
          </div>
        </article>
      ))}
    </div>
  );
}

function OrdersTab() {
  return (
    <div className="space-y-4">
      <h2 className="font-display text-2xl font-semibold text-gold-100">ההזמנות שלי</h2>
      <p className="text-sm text-gray-400">היסטוריית הרכישות שלכם, מהחדש לישן.</p>
      <div className="card-prem overflow-hidden">
        <table className="w-full text-right text-sm">
          <thead className="bg-ink-700/60 text-xs uppercase tracking-wider text-gold-200">
            <tr>
              <th className="px-5 py-3">מספר הזמנה</th>
              <th className="px-5 py-3">תאריך</th>
              <th className="px-5 py-3">פריטים</th>
              <th className="px-5 py-3">סכום</th>
              <th className="px-5 py-3">סטטוס</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gold-400/10">
            {MOCK_ORDERS.map((o) => (
              <tr key={o.id} className="text-gray-200 hover:bg-gold-400/5">
                <td className="px-5 py-4 font-medium text-gold-100">{o.id}</td>
                <td className="px-5 py-4">{o.date}</td>
                <td className="px-5 py-4">{o.items}</td>
                <td className="px-5 py-4">₪{o.total}</td>
                <td className="px-5 py-4">
                  <span
                    className={`inline-flex rounded-full border px-3 py-1 text-xs ${
                      o.status === "שולם"
                        ? "border-gold-400/40 text-gold-200"
                        : "border-red-400/30 text-red-300"
                    }`}
                  >
                    {o.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

function DetailsTab() {
  return (
    <div className="space-y-4">
      <h2 className="font-display text-2xl font-semibold text-gold-100">פרטים אישיים</h2>
      <p className="text-sm text-gray-400">עדכון פרטי הקשר וההעדפות שלכם.</p>
      <form className="card-prem grid gap-4 p-6 sm:grid-cols-2">
        <Field id="firstName" label="שם פרטי" defaultValue="אליעד" />
        <Field id="lastName" label="שם משפחה" defaultValue="ספיר" />
        <Field id="email" label="אימייל" type="email" defaultValue="eliadsapir18@gmail.com" />
        <Field id="phone" label="טלפון" type="tel" defaultValue="054-650-3587" />
        <div className="sm:col-span-2 flex items-center justify-end gap-3">
          <button type="button" className="btn-ghost">ביטול</button>
          <button type="submit" className="btn-gold">שמירה</button>
        </div>
      </form>
    </div>
  );
}

function Field({
  id,
  label,
  type = "text",
  defaultValue,
}: {
  id: string;
  label: string;
  type?: string;
  defaultValue?: string;
}) {
  return (
    <div>
      <label htmlFor={id} className="mb-1.5 block text-xs font-medium text-gold-200">
        {label}
      </label>
      <input
        id={id}
        name={id}
        type={type}
        defaultValue={defaultValue}
        className="w-full rounded-xl border border-gold-400/20 bg-ink-900 px-4 py-3 text-sm text-gold-100 focus:border-gold-400 focus:outline-none"
      />
    </div>
  );
}
