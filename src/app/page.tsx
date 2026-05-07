import Link from "next/link";
import Hero from "@/components/Hero";
import SectionHeading from "@/components/SectionHeading";
import EventCard from "@/components/EventCard";
import CategoryCard from "@/components/CategoryCard";
import TrustSection from "@/components/TrustSection";
import { CATEGORIES, FEATURED_EVENTS } from "@/data/events";

export default function HomePage() {
  return (
    <>
      <Hero />

      {/* Featured events */}
      <section className="container-prem py-20">
        <SectionHeading
          eyebrow="מומלצים השבוע"
          title="אירועים נבחרים"
          subtitle="הופעות והצגות שנבחרו עבורכם — סלקציה פרימיום של אירועי התרבות הבולטים"
        />

        <div className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {FEATURED_EVENTS.map((ev) => (
            <EventCard key={ev.id} event={ev} />
          ))}
        </div>

        <div className="mt-12 flex justify-center">
          <Link href="/events" className="btn-ghost">
            לכל האירועים
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" aria-hidden>
              <path d="M14 7l-5 5 5 5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </Link>
        </div>
      </section>

      {/* Categories */}
      <section className="relative overflow-hidden py-20">
        <div className="pointer-events-none absolute inset-0 bg-radial-gold opacity-40" />
        <div
          aria-hidden
          className="pointer-events-none absolute -left-20 top-10 h-80 w-80 rounded-full bg-gold-400/10 blur-[120px] animate-drift-c"
        />
        <div
          aria-hidden
          className="pointer-events-none absolute -right-10 bottom-10 h-72 w-72 rounded-full bg-gold-600/10 blur-[110px] animate-drift-b"
        />
        <div className="container-prem relative">
          <SectionHeading
            eyebrow="קטגוריות"
            title="מה בא לכם הערב?"
            subtitle="כל הסגנונות והז׳אנרים תחת קורת גג אחת — סלקציה איכותית בלבד"
          />

          <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {CATEGORIES.map((cat) => (
              <CategoryCard key={cat.id} category={cat} />
            ))}
          </div>
        </div>
      </section>

      {/* Trust */}
      <TrustSection />

      {/* Final CTA */}
      <section className="container-prem py-20">
        <div className="card-prem relative overflow-hidden p-10 sm:p-14 text-center">
          <div className="pointer-events-none absolute inset-0 bg-radial-gold opacity-60" />
          <div
            aria-hidden
            className="pointer-events-none absolute -top-10 left-1/4 h-64 w-64 rounded-full bg-gold-400/15 blur-[110px] animate-drift-a"
          />
          <div
            aria-hidden
            className="pointer-events-none absolute -bottom-10 right-1/4 h-72 w-72 rounded-full bg-gold-600/15 blur-[120px] animate-drift-b"
          />
          {/* Diagonal sweep across CTA card */}
          <div className="pointer-events-none absolute inset-y-0 left-0 right-0 overflow-hidden">
            <div
              aria-hidden
              className="absolute top-0 h-full w-1/4 bg-gradient-to-r from-transparent via-gold-300/15 to-transparent animate-sweep"
              style={{ animationDuration: "9s" }}
            />
          </div>
          <div className="relative flex flex-col items-center gap-6">
            <span className="chip">מצטרפים למועדון פרימיום</span>
            <h2 className="font-display text-3xl font-semibold gold-text sm:text-5xl">
              חוויית כרטוס יוקרתית — בעברית, בקליק
            </h2>
            <p className="max-w-xl text-base leading-7 text-gray-300">
              הצטרפו לאלפי לקוחות מרוצים. רכישה מאובטחת, כרטיס לאימייל,
              ושירות אישי במידת הצורך.
            </p>
            <div className="flex flex-col gap-3 sm:flex-row">
              <Link href="/events" className="btn-gold">
                גלו אירועים
              </Link>
              <Link href="/register" className="btn-ghost">
                הרשמה למועדון
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
