const ITEMS = [
  {
    title: "רכישה מאובטחת",
    desc: "תשלום מוצפן ב-SSL, סליקה דרך ספקים מורשים — מבלי לאחסן פרטי כרטיס.",
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" aria-hidden>
        <rect x="4" y="10" width="16" height="11" rx="2" stroke="currentColor" strokeWidth="1.6" />
        <path d="M8 10V7a4 4 0 1 1 8 0v3" stroke="currentColor" strokeWidth="1.6" />
      </svg>
    ),
  },
  {
    title: "שירות לקוחות זמין",
    desc: "צוות שירות בעברית, זמינות גבוהה בוואטסאפ ובטלפון — כל ימות השבוע.",
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" aria-hidden>
        <path
          d="M21 15.5c0 3-2 5-5 5h-2l-3 3v-3H7c-2 0-5-1-5-5V7c0-3 2-5 5-5h9c3 0 5 2 5 5v8.5Z"
          stroke="currentColor"
          strokeWidth="1.6"
          strokeLinejoin="round"
        />
        <circle cx="8.5" cy="11" r="1" fill="currentColor" />
        <circle cx="12" cy="11" r="1" fill="currentColor" />
        <circle cx="15.5" cy="11" r="1" fill="currentColor" />
      </svg>
    ),
  },
  {
    title: "אירועי תרבות נבחרים",
    desc: "אנו עובדים רק עם מפיקים מובילים — מיטב ההופעות, ההצגות והפסטיבלים.",
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" aria-hidden>
        <path
          d="M12 2l2.4 6.7L21 9l-5 4.7L17.5 21 12 17.5 6.5 21 8 13.7 3 9l6.6-.3L12 2Z"
          stroke="currentColor"
          strokeWidth="1.6"
          strokeLinejoin="round"
        />
      </svg>
    ),
  },
  {
    title: "הזמנה פשוטה ומהירה",
    desc: "ממשק נקי בעברית, רכישה תוך דקה, כרטיס דיגיטלי שמגיע ישר לאימייל.",
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" aria-hidden>
        <path
          d="M3 8a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2v2a2 2 0 0 0 0 4v2a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-2a2 2 0 0 0 0-4V8Z"
          stroke="currentColor"
          strokeWidth="1.6"
        />
        <path d="M11 6v12" stroke="currentColor" strokeWidth="1.6" strokeDasharray="2 2" />
      </svg>
    ),
  },
];

export default function TrustSection() {
  return (
    <section className="container-prem py-20">
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {ITEMS.map((it) => (
          <div
            key={it.title}
            className="card-prem group flex flex-col items-start gap-3 p-6"
          >
            <div className="flex h-12 w-12 items-center justify-center rounded-xl border border-gold-400/30 bg-ink-900 text-gold-300 transition-colors group-hover:text-gold-100">
              {it.icon}
            </div>
            <h3 className="font-display text-xl font-semibold text-gold-100">
              {it.title}
            </h3>
            <p className="text-sm leading-6 text-gray-300">{it.desc}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
