import SectionHeading from "@/components/SectionHeading";

export default function ContactPage() {
  return (
    <>
      <section className="relative overflow-hidden border-b border-gold-400/15">
        <div className="pointer-events-none absolute inset-0 -z-10 bg-radial-gold opacity-60" />
        <div className="container-prem py-16">
          <SectionHeading
            eyebrow="צור קשר"
            title="נשמח לעמוד לרשותכם"
            subtitle="צוות שירות הלקוחות שלנו זמין עבורכם — בוואטסאפ, בטלפון או באימייל."
          />
        </div>
      </section>

      <section className="container-prem grid gap-8 py-14 lg:grid-cols-[1.3fr_1fr]">
        {/* Form */}
        <form className="card-prem space-y-4 p-6 sm:p-8">
          <h2 className="font-display text-2xl font-semibold text-gold-100">שליחת פנייה</h2>
          <div className="grid gap-4 sm:grid-cols-2">
            <Field id="name" label="שם מלא" required />
            <Field id="phone" label="טלפון" type="tel" inputMode="tel" required />
          </div>
          <Field id="email" label="אימייל" type="email" inputMode="email" required />
          <Field id="subject" label="נושא הפנייה" />

          <div>
            <label htmlFor="message" className="mb-1.5 block text-xs font-medium text-gold-200">
              ההודעה שלך <span className="ms-1 text-gold-400">*</span>
            </label>
            <textarea
              id="message"
              name="message"
              rows={6}
              required
              className="w-full rounded-xl border border-gold-400/20 bg-ink-900 px-4 py-3 text-sm text-gold-100 focus:border-gold-400 focus:outline-none"
              placeholder="ספרו לנו כיצד נוכל לעזור…"
            />
          </div>

          <button type="submit" className="btn-gold w-full sm:w-auto">
            שליחת פנייה
          </button>
        </form>

        {/* Contact panel */}
        <aside className="space-y-4">
          <ContactCard
            title="וואטסאפ"
            subtitle="המהיר ביותר"
            value="054-650-3587"
            href="https://wa.me/972546503587"
            icon={
              <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
                <path d="M12.04 2C6.58 2 2.13 6.45 2.13 11.91c0 2.1.55 4.15 1.6 5.96L2 22l4.27-1.12a9.86 9.86 0 0 0 5.77 1.83h.01c5.46 0 9.91-4.45 9.91-9.91 0-2.65-1.03-5.14-2.9-7.01A9.84 9.84 0 0 0 12.04 2Z" />
              </svg>
            }
          />
          <ContactCard
            title="טלפון"
            subtitle="ימים א׳–ה׳, 9:00-18:00"
            value="054-650-3587"
            href="tel:0546503587"
            icon={
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden>
                <path
                  d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6A19.79 19.79 0 0 1 2.12 4.18 2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.13.96.37 1.9.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.91.33 1.85.57 2.81.7A2 2 0 0 1 22 16.92Z"
                  stroke="currentColor"
                  strokeWidth="1.6"
                  strokeLinejoin="round"
                />
              </svg>
            }
          />
          <ContactCard
            title="אימייל"
            subtitle="חזרה תוך 24 שעות"
            value="info@premium-tarbut.co.il"
            href="mailto:info@premium-tarbut.co.il"
            icon={
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden>
                <rect x="3" y="5" width="18" height="14" rx="2" stroke="currentColor" strokeWidth="1.6" />
                <path d="M3 7l9 7 9-7" stroke="currentColor" strokeWidth="1.6" />
              </svg>
            }
          />

          <div className="card-prem p-6">
            <h3 className="font-display text-lg font-semibold text-gold-100">שעות פעילות</h3>
            <ul className="mt-3 space-y-1.5 text-sm text-gray-300">
              <li className="flex justify-between"><span>ימים א׳–ה׳</span><span>09:00–20:00</span></li>
              <li className="flex justify-between"><span>יום ו׳</span><span>09:00–14:00</span></li>
              <li className="flex justify-between"><span>שבת</span><span>סגור</span></li>
            </ul>
          </div>
        </aside>
      </section>
    </>
  );
}

function Field({
  id,
  label,
  type = "text",
  required,
  inputMode,
}: {
  id: string;
  label: string;
  type?: string;
  required?: boolean;
  inputMode?: "email" | "tel";
}) {
  return (
    <div>
      <label htmlFor={id} className="mb-1.5 block text-xs font-medium text-gold-200">
        {label}
        {required && <span className="ms-1 text-gold-400">*</span>}
      </label>
      <input
        id={id}
        name={id}
        type={type}
        required={required}
        inputMode={inputMode}
        className="w-full rounded-xl border border-gold-400/20 bg-ink-900 px-4 py-3 text-sm text-gold-100 focus:border-gold-400 focus:outline-none"
      />
    </div>
  );
}

function ContactCard({
  title,
  subtitle,
  value,
  href,
  icon,
}: {
  title: string;
  subtitle: string;
  value: string;
  href: string;
  icon: React.ReactNode;
}) {
  const external = href.startsWith("http");
  return (
    <a
      href={href}
      target={external ? "_blank" : undefined}
      rel={external ? "noopener noreferrer" : undefined}
      className="card-prem flex items-center gap-4 p-5 transition-transform hover:-translate-y-0.5"
    >
      <div className="flex h-12 w-12 flex-none items-center justify-center rounded-xl border border-gold-400/30 bg-ink-900 text-gold-300">
        {icon}
      </div>
      <div>
        <div className="text-xs uppercase tracking-wider text-gold-300">{title}</div>
        <div className="font-display text-lg text-gold-100" dir="ltr">{value}</div>
        <div className="text-xs text-gray-400">{subtitle}</div>
      </div>
    </a>
  );
}
