"use client";

import { useEffect, useRef, useState } from "react";

type Settings = {
  textSize: "small" | "default" | "large" | "xlarge";
  contrast: boolean;
  links: boolean;
  noMotion: boolean;
};

const DEFAULTS: Settings = {
  textSize: "default",
  contrast: false,
  links: false,
  noMotion: false,
};

const STORAGE_KEY = "premium-tarbut-a11y";

function applySettings(s: Settings) {
  const html = document.documentElement;
  html.classList.remove("a11y-small", "a11y-large", "a11y-xlarge");
  if (s.textSize === "small") html.classList.add("a11y-small");
  if (s.textSize === "large") html.classList.add("a11y-large");
  if (s.textSize === "xlarge") html.classList.add("a11y-xlarge");
  html.classList.toggle("a11y-contrast", s.contrast);
  html.classList.toggle("a11y-links", s.links);
  html.classList.toggle("a11y-no-motion", s.noMotion);
}

export default function AccessibilityButton() {
  const [open, setOpen] = useState(false);
  const [settings, setSettings] = useState<Settings>(DEFAULTS);
  const panelRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) {
        const parsed = { ...DEFAULTS, ...JSON.parse(raw) };
        setSettings(parsed);
        applySettings(parsed);
      }
    } catch {}
  }, []);

  useEffect(() => {
    applySettings(settings);
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(settings));
    } catch {}
  }, [settings]);

  useEffect(() => {
    if (!open) return;
    const onClick = (e: MouseEvent) => {
      if (panelRef.current && !panelRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    document.addEventListener("mousedown", onClick);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("mousedown", onClick);
      document.removeEventListener("keydown", onKey);
    };
  }, [open]);

  const setSize = (textSize: Settings["textSize"]) =>
    setSettings((s) => ({ ...s, textSize }));
  const toggle = (key: keyof Settings) =>
    setSettings((s) => ({ ...s, [key]: !s[key] }));
  const reset = () => setSettings(DEFAULTS);

  return (
    <div ref={panelRef} className="fixed bottom-5 right-5 z-40">
      <button
        type="button"
        aria-label="הגדרות נגישות"
        aria-expanded={open}
        onClick={() => setOpen((v) => !v)}
        className="group relative inline-flex h-14 w-14 items-center justify-center rounded-full border border-gold-400/40 bg-ink-900 text-gold-300 shadow-2xl transition-all duration-300 hover:-translate-y-0.5 hover:border-gold-400 hover:bg-ink-800 sm:h-16 sm:w-16"
      >
        <svg width="28" height="28" viewBox="0 0 24 24" fill="none" aria-hidden>
          <circle cx="12" cy="4.5" r="1.6" fill="currentColor" />
          <path
            d="M5 8.5h14M9 22l3-8 3 8M12 12v-3.5"
            stroke="currentColor"
            strokeWidth="1.7"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </button>

      {open && (
        <div
          role="dialog"
          aria-label="הגדרות נגישות"
          className="absolute bottom-20 right-0 w-[300px] rounded-2xl border border-gold-400/30 bg-ink-900/95 p-4 shadow-gold-lg backdrop-blur-md animate-fade-up"
        >
          <div className="mb-3 flex items-center justify-between">
            <h3 className="text-sm font-semibold text-gold-200">הגדרות נגישות</h3>
            <button
              type="button"
              onClick={() => setOpen(false)}
              aria-label="סגירה"
              className="rounded-full p-1 text-gold-300 hover:bg-gold-400/10"
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden>
                <path d="M6 6l12 12M18 6L6 18" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
              </svg>
            </button>
          </div>

          <div className="mb-2 text-xs font-medium uppercase tracking-wider text-gray-400">
            גודל טקסט
          </div>
          <div className="mb-4 grid grid-cols-4 gap-1.5">
            {(["small", "default", "large", "xlarge"] as const).map((s) => (
              <button
                key={s}
                type="button"
                onClick={() => setSize(s)}
                className={`rounded-lg border px-2 py-2 text-xs transition-colors ${
                  settings.textSize === s
                    ? "border-gold-400 bg-gold-400/15 text-gold-100"
                    : "border-gold-400/20 text-gray-300 hover:bg-gold-400/5"
                }`}
                aria-pressed={settings.textSize === s}
              >
                {s === "small" ? "א" : s === "default" ? "א" : s === "large" ? "א" : "א"}
                <span className="block text-[10px] text-gray-400">
                  {s === "small" ? "קטן" : s === "default" ? "רגיל" : s === "large" ? "גדול" : "ענק"}
                </span>
              </button>
            ))}
          </div>

          <div className="space-y-1.5">
            <ToggleRow
              label="ניגודיות גבוהה"
              active={settings.contrast}
              onClick={() => toggle("contrast")}
            />
            <ToggleRow
              label="הדגשת קישורים"
              active={settings.links}
              onClick={() => toggle("links")}
            />
            <ToggleRow
              label="עצירת אנימציות"
              active={settings.noMotion}
              onClick={() => toggle("noMotion")}
            />
          </div>

          <button
            type="button"
            onClick={reset}
            className="mt-4 w-full rounded-full border border-gold-400/30 px-3 py-2 text-xs text-gold-200 transition-colors hover:bg-gold-400/10"
          >
            איפוס הגדרות
          </button>

          <p className="mt-3 text-[11px] leading-5 text-gray-400">
            האתר תומך בניווט מקלדת מלא, תוויות ARIA ופוקוס נראה לעין. לתמיכה בנושאי נגישות —
            ניתן לפנות בוואטסאפ.
          </p>
        </div>
      )}
    </div>
  );
}

function ToggleRow({
  label,
  active,
  onClick,
}: {
  label: string;
  active: boolean;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={active}
      className={`flex w-full items-center justify-between rounded-xl border px-3 py-2 text-sm transition-colors ${
        active
          ? "border-gold-400 bg-gold-400/15 text-gold-100"
          : "border-gold-400/20 text-gray-200 hover:bg-gold-400/5"
      }`}
    >
      <span>{label}</span>
      <span
        className={`relative inline-flex h-5 w-9 items-center rounded-full transition-colors ${
          active ? "bg-gold-400" : "bg-ink-600"
        }`}
        aria-hidden
      >
        <span
          className={`absolute top-0.5 h-4 w-4 rounded-full bg-ink-900 shadow transition-all ${
            active ? "right-0.5" : "right-[18px]"
          }`}
        />
      </span>
    </button>
  );
}
