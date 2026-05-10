"use client";

import { useMemo, useState, useEffect, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import EventCard from "@/components/EventCard";
import EventFilters, { type FilterState } from "@/components/EventFilters";
import SectionHeading from "@/components/SectionHeading";
import type { CultureEvent, EventCategory } from "@/lib/types";

const VALID_CATS: EventCategory[] = [
  "concerts",
  "standup",
  "theater",
  "kids",
  "lectures",
  "festivals",
];

function EventsPageInner({ events }: { events: CultureEvent[] }) {
  const params = useSearchParams();
  const initialCat = params.get("cat");
  const [filters, setFilters] = useState<FilterState>({
    q: "",
    category: VALID_CATS.includes(initialCat as EventCategory)
      ? (initialCat as EventCategory)
      : "all",
    city: "all",
    when: "all",
  });

  useEffect(() => {
    const c = params.get("cat");
    if (VALID_CATS.includes(c as EventCategory)) {
      setFilters((f) => ({ ...f, category: c as EventCategory }));
    }
  }, [params]);

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

  return (
    <>
      <section className="relative overflow-hidden border-b border-gold-400/15">
        <div className="pointer-events-none absolute inset-0 -z-10 bg-radial-gold opacity-60" />
        <div className="container-prem py-16 sm:py-20">
          <SectionHeading
            eyebrow="כל האירועים"
            title="האירועים שלנו"
            subtitle="חיפשו, סיננו ובחרו את האירוע המושלם — באלפי קומבינציות אפשריות."
          />
        </div>
      </section>

      <section className="container-prem py-12">
        <EventFilters
          value={filters}
          onChange={setFilters}
          resultCount={filtered.length}
        />

        {filtered.length === 0 ? (
          <div className="mt-16 text-center text-gray-300">
            לא נמצאו אירועים בסינון הנוכחי.{" "}
            <button
              className="text-gold-300 hover:text-gold-100"
              onClick={() =>
                setFilters({ q: "", category: "all", city: "all", when: "all" })
              }
            >
              איפוס סינון
            </button>
          </div>
        ) : (
          <div className="mt-10 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {filtered.map((ev) => (
              <EventCard key={ev.id} event={ev} />
            ))}
          </div>
        )}
      </section>
    </>
  );
}

export default function EventsClient({ events }: { events: CultureEvent[] }) {
  return (
    <Suspense
      fallback={
        <div className="container-prem py-20 text-center text-gray-400">
          טוען…
        </div>
      }
    >
      <EventsPageInner events={events} />
    </Suspense>
  );
}
