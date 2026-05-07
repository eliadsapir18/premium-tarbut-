import Image from "next/image";
import Link from "next/link";
import type { CultureEvent } from "@/lib/types";

interface Props {
  event: CultureEvent;
  variant?: "default" | "featured";
}

export default function EventCard({ event, variant = "default" }: Props) {
  const isFeatured = variant === "featured";
  return (
    <article
      className={`card-prem group relative flex flex-col overflow-hidden ${
        isFeatured ? "lg:flex-row" : ""
      }`}
    >
      {/* Image */}
      <div
        className={`relative overflow-hidden ${
          isFeatured ? "aspect-[16/10] lg:aspect-auto lg:w-1/2" : "aspect-[4/3]"
        }`}
      >
        <Image
          src={event.image}
          alt={event.title}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          className="object-cover transition-transform duration-700 group-hover:scale-105"
          style={{ objectPosition: event.imagePosition ?? "center" }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-ink-950/95 via-ink-900/55 to-ink-900/10" />
        <span className="chip absolute top-3 right-3 backdrop-blur-md">
          {event.categoryLabel}
        </span>
        <span className="absolute bottom-3 left-3 rounded-full bg-ink-900/80 px-3 py-1 text-xs text-gold-200 backdrop-blur-md">
          החל מ-₪{event.priceFrom}
        </span>
      </div>

      {/* Body */}
      <div className={`flex flex-1 flex-col p-5 sm:p-6 ${isFeatured ? "lg:p-8" : ""}`}>
        <h3
          className={`font-display font-semibold leading-tight text-gold-100 transition-colors group-hover:text-gold-200 ${
            isFeatured ? "text-2xl md:text-3xl" : "text-xl"
          }`}
        >
          <Link href={`/events/${event.slug}`} className="after:absolute after:inset-0">
            {event.title}
          </Link>
        </h3>

        {event.artist && (
          <p className="mt-1 text-sm text-gold-400/80">{event.artist}</p>
        )}

        <p
          className={`mt-3 text-sm leading-7 text-gray-300 ${
            isFeatured ? "line-clamp-3" : "line-clamp-2"
          }`}
        >
          {event.description}
        </p>

        <ul className="mt-4 space-y-2 text-sm text-gray-300">
          <li className="flex flex-wrap items-center gap-x-2 gap-y-1">
            <CalendarIcon /> <span>{event.dateLabel}</span>
            <span className="text-gold-400/60">•</span>
            <span>{event.timeLabel}</span>
            {event.specialLabel && (
              <span className="rounded-full border border-gold-400/40 bg-gold-400/10 px-2 py-0.5 text-[11px] font-medium text-gold-200">
                {event.specialLabel}
              </span>
            )}
          </li>
          <li className="flex items-center gap-2">
            <PinIcon /> <span>{event.venue}{event.city ? `, ${event.city}` : ""}</span>
          </li>
        </ul>

        <div className="mt-auto flex items-center justify-between gap-3 pt-5">
          <Link
            href={`/events/${event.slug}`}
            className="btn-gold relative z-10 text-xs"
          >
            רכישת כרטיסים
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" aria-hidden>
              <path d="M14 7l-5 5 5 5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </Link>
          <span className="text-xs text-gray-400">פרטים נוספים</span>
        </div>
      </div>
    </article>
  );
}

function CalendarIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden className="text-gold-300">
      <rect x="3.5" y="5" width="17" height="15" rx="2" stroke="currentColor" strokeWidth="1.5" />
      <path d="M3.5 9.5h17M8 3.5v3M16 3.5v3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  );
}

function PinIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden className="text-gold-300">
      <path
        d="M12 21s7-5.5 7-11.5A7 7 0 1 0 5 9.5C5 15.5 12 21 12 21Z"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinejoin="round"
      />
      <circle cx="12" cy="9.5" r="2.4" stroke="currentColor" strokeWidth="1.5" />
    </svg>
  );
}
