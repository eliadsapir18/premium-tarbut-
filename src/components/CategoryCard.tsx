import Link from "next/link";
import type { Category } from "@/lib/types";

const ICONS: Record<string, React.ReactNode> = {
  music: (
    <svg width="32" height="32" viewBox="0 0 24 24" fill="none" aria-hidden>
      <path d="M9 18V5l11-2v13" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round" />
      <circle cx="6" cy="18" r="3" stroke="currentColor" strokeWidth="1.6" />
      <circle cx="17" cy="16" r="3" stroke="currentColor" strokeWidth="1.6" />
    </svg>
  ),
  mic: (
    <svg width="32" height="32" viewBox="0 0 24 24" fill="none" aria-hidden>
      <rect x="9" y="3" width="6" height="12" rx="3" stroke="currentColor" strokeWidth="1.6" />
      <path d="M5 11a7 7 0 0 0 14 0M12 18v3M9 21h6" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
    </svg>
  ),
  drama: (
    <svg width="32" height="32" viewBox="0 0 24 24" fill="none" aria-hidden>
      <path
        d="M3 4h8l-1 11a4 4 0 1 1-7-1L3 4ZM13 8h8l-1 11a4 4 0 1 1-7-1L13 8Z"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinejoin="round"
      />
    </svg>
  ),
  kids: (
    <svg width="32" height="32" viewBox="0 0 24 24" fill="none" aria-hidden>
      <circle cx="12" cy="9" r="4" stroke="currentColor" strokeWidth="1.6" />
      <path d="M5 21c0-3.866 3.134-7 7-7s7 3.134 7 7" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
      <circle cx="9" cy="8" r="0.7" fill="currentColor" />
      <circle cx="15" cy="8" r="0.7" fill="currentColor" />
    </svg>
  ),
  lecture: (
    <svg width="32" height="32" viewBox="0 0 24 24" fill="none" aria-hidden>
      <path d="M4 6h16v11H4z" stroke="currentColor" strokeWidth="1.6" />
      <path d="M9 21h6M12 17v4M8 10l3 2 3-3 3 4" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  ),
  festival: (
    <svg width="32" height="32" viewBox="0 0 24 24" fill="none" aria-hidden>
      <path d="M12 3l9 17H3L12 3Z" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round" />
      <path d="M12 9v6M9 13h6" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
    </svg>
  ),
};

interface Props {
  category: Category;
}

export default function CategoryCard({ category }: Props) {
  return (
    <Link
      href={`/events?cat=${category.id}`}
      className="card-prem group relative flex flex-col items-start gap-3 overflow-hidden p-6 transition-transform hover:-translate-y-1"
    >
      <div className="pointer-events-none absolute inset-0 bg-radial-gold opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
      <div className="relative flex h-14 w-14 items-center justify-center rounded-xl border border-gold-400/30 bg-ink-900 text-gold-300 transition-all group-hover:border-gold-400 group-hover:text-gold-100 group-hover:shadow-gold">
        {ICONS[category.icon] ?? ICONS.music}
      </div>
      <div>
        <h3 className="font-display text-xl font-semibold text-gold-100">
          {category.label}
        </h3>
        <p className="mt-1 text-sm leading-6 text-gray-300">{category.description}</p>
      </div>
      <div className="mt-2 flex items-center gap-2 text-xs text-gold-300">
        <span>{category.count} אירועים פעילים</span>
        <span className="text-gold-400">←</span>
      </div>
    </Link>
  );
}
