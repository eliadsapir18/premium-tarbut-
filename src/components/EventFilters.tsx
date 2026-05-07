"use client";

import { CATEGORIES, CITIES } from "@/data/events";
import type { EventCategory } from "@/lib/types";

export interface FilterState {
  q: string;
  category: EventCategory | "all";
  city: string | "all";
  when: "all" | "month" | "quarter" | "year";
}

interface Props {
  value: FilterState;
  onChange: (next: FilterState) => void;
  resultCount: number;
}

export default function EventFilters({ value, onChange, resultCount }: Props) {
  const set = <K extends keyof FilterState>(key: K, v: FilterState[K]) =>
    onChange({ ...value, [key]: v });

  return (
    <div className="card-prem flex flex-col gap-4 p-5 sm:p-6">
      <div className="grid gap-3 lg:grid-cols-[1.5fr_1fr_1fr_1fr]">
        {/* Search */}
        <label className="relative">
          <span className="sr-only">חיפוש אירוע</span>
          <span className="absolute right-3 top-1/2 -translate-y-1/2 text-gold-400">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden>
              <circle cx="11" cy="11" r="6.5" stroke="currentColor" strokeWidth="1.6" />
              <path d="M20 20l-4-4" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
            </svg>
          </span>
          <input
            type="search"
            value={value.q}
            onChange={(e) => set("q", e.target.value)}
            placeholder="חיפוש לפי שם אמן או אירוע…"
            className="w-full rounded-xl border border-gold-400/20 bg-ink-900 py-3 pe-4 ps-10 text-sm text-gold-100 placeholder:text-gray-500 focus:border-gold-400 focus:outline-none"
          />
        </label>

        <Select
          label="קטגוריה"
          value={value.category}
          onChange={(v) => set("category", v as FilterState["category"])}
          options={[
            { value: "all", label: "כל הקטגוריות" },
            ...CATEGORIES.map((c) => ({ value: c.id, label: c.label })),
          ]}
        />

        <Select
          label="עיר"
          value={value.city}
          onChange={(v) => set("city", v)}
          options={[
            { value: "all", label: "כל הערים" },
            ...CITIES.map((c) => ({ value: c, label: c })),
          ]}
        />

        <Select
          label="תאריך"
          value={value.when}
          onChange={(v) => set("when", v as FilterState["when"])}
          options={[
            { value: "all", label: "כל התאריכים" },
            { value: "month", label: "החודש הקרוב" },
            { value: "quarter", label: "ב-3 החודשים הקרובים" },
            { value: "year", label: "השנה" },
          ]}
        />
      </div>

      <div className="flex items-center justify-between text-xs text-gray-400">
        <span>
          נמצאו <span className="text-gold-300">{resultCount}</span> אירועים
        </span>
        <button
          type="button"
          onClick={() =>
            onChange({ q: "", category: "all", city: "all", when: "all" })
          }
          className="text-gold-300 hover:text-gold-100"
        >
          איפוס סינון
        </button>
      </div>
    </div>
  );
}

function Select({
  label,
  value,
  onChange,
  options,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  options: { value: string; label: string }[];
}) {
  return (
    <label className="relative block">
      <span className="sr-only">{label}</span>
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full appearance-none rounded-xl border border-gold-400/20 bg-ink-900 py-3 ps-4 pe-10 text-sm text-gold-100 focus:border-gold-400 focus:outline-none"
      >
        {options.map((o) => (
          <option key={o.value} value={o.value}>
            {o.label}
          </option>
        ))}
      </select>
      <span className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-gold-400">
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" aria-hidden>
          <path d="M6 9l6 6 6-6" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </span>
    </label>
  );
}
