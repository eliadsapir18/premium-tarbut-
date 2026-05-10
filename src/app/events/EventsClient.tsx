"use client";

import { useMemo, useState } from "react";
import EventCard from "@/components/EventCard";
import EventFilters, { type FilterState } from "@/components/EventFilters";
import SectionHeading from "@/components/SectionHeading";
import type { CultureEvent, EventCategory } from "@/lib/types";

interface Props {
  events: CultureEvent[];
  initialCategory: EventCategory | "all";
}

export default function EventsClient({ events, initialCategory }: Props) {
  const [filters, setFilters] = useState<FilterState>({
    q: "",
    category: initialCategory,
    city: "all",
    when: "all",
  });

  const filtered = useMemo(() => {
    const now = new Date();
    return events.filter((ev) => {
      if (
        filters.q &&
        !`${ev.title} ${ev.artist ?? ""} ${ev.venue}`
          .toLowerCase()
          .includes(filters.q.toLowerCase())
      ) {
        return false;
      }
      if (filters.category !== "all" && ev.category !== filters.category)
        return false;
      if (filters.city !== "all" && ev.city !== filters.city) return false;

      if (filters.when !== "all") {
        const evDate = new Date(ev.date);
        const days =
          filters.when === "month" ? 30 : filters.when === "quarter" ? 90 : 365;
        const limit = new Date(now);
        limit.setDate(limit.getDate() + days);
        if (evDate > limit) return false;
      }
      return true;
    });
  }, [events, filters]);

  const reset = () =>
    setFilters({ q: "", category: "all", city: "all", when: "all" });

  return (
    <>
      <section className="relative overflow-hidden border-b border-gold-400/15">
        <div className="pointer-events-none absolute inset-0 -z-10 bg-radial-gold opacity-60" />
        <div className="container-prem py-14 sm:py-20">
          <SectionHeading
            eyebrow="כל האירועים"
            title="האירועים שלנו"
            subtitle="סלקציה איכותית של אירועי תרבות נבחרים — חיפשו, סננו ובחרו."
          />
        </div>
      </section>

      <section className="container-prem py-10 sm:py-12">
        <EventFilters
          value={filters}
          onChange={setFilters}
          resultCount={filtered.length}
        />

        {events.length === 0 ? (
          <EmptyState
            title="אין אירועים פעילים כרגע"
            body="אנחנו מוסיפים אירועים חדשים כל הזמן. חזרו אלינו בקרוב או דברו איתנו בוואטסאפ."
          />
        ) : filtered.length === 0 ? (
          <EmptyState
            title="לא נמצאו אירועים בסינון הנוכחי"
            body="נסו לאפס את הסינון כדי לראות את כל האירועים."
            action={
              <button onClick={reset} className="btn-ghost mt-4">
                איפוס סינון
              </button>
            }
          />
        ) : (
          <div className="mt-8 grid gap-6 sm:mt-10 md:grid-cols-2 lg:grid-cols-3">
            {filtered.map((ev) => (
              <EventCard key={ev.id} event={ev} />
            ))}
          </div>
        )}
      </section>
    </>
  );
}

function EmptyState({
  title,
  body,
  action,
}: {
  title: string;
  body: string;
  action?: React.ReactNode;
}) {
  return (
    <div className="card-prem mt-10 flex flex-col items-center gap-2 p-10 text-center">
      <h3 className="font-display text-xl font-semibold text-gold-100">
        {title}
      </h3>
      <p className="max-w-md text-sm leading-6 text-gray-300">{body}</p>
      {action}
    </div>
  );
}
