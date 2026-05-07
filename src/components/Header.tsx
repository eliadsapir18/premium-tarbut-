"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import Logo from "./Logo";

const NAV_LINKS = [
  { href: "/", label: "דף הבית" },
  { href: "/events", label: "אירועים" },
  { href: "/events?cat=concerts", label: "הופעות" },
  { href: "/events?cat=theater", label: "הצגות" },
  { href: "/events?cat=standup", label: "סטנדאפ" },
  { href: "/events?cat=kids", label: "ילדים" },
  { href: "/contact", label: "צור קשר" },
];

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.documentElement.style.overflow = mobileOpen ? "hidden" : "";
    return () => {
      document.documentElement.style.overflow = "";
    };
  }, [mobileOpen]);

  return (
    <header
      className={`sticky top-0 z-50 transition-all duration-300 ${
        scrolled
          ? "border-b border-gold-400/20 bg-ink-900/85 backdrop-blur-md"
          : "border-b border-transparent bg-transparent"
      }`}
    >
      <div className="container-prem flex h-20 items-center justify-between gap-6">
        {/* Logo */}
        <Logo size="sm" />

        {/* Desktop nav */}
        <nav className="hidden items-center gap-1 lg:flex" aria-label="ניווט ראשי">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.label}
              href={link.href}
              className="relative rounded-full px-4 py-2 text-sm font-medium text-gray-200 transition-colors hover:text-gold-200"
            >
              <span>{link.label}</span>
              <span className="absolute inset-x-3 -bottom-0.5 h-px scale-x-0 bg-gold-gradient transition-transform group-hover:scale-x-100" />
            </Link>
          ))}
        </nav>

        {/* Right cluster */}
        <div className="flex items-center gap-3">
          <Link
            href="/login"
            className="hidden items-center gap-2 rounded-full border border-gold-400/40 px-4 py-2 text-sm font-medium text-gold-200 transition-all hover:border-gold-400 hover:bg-gold-400/10 hover:text-gold-100 md:inline-flex"
          >
            <UserIcon />
            <span>כניסה לאיזור האישי</span>
          </Link>

          <Link
            href="/login"
            aria-label="כניסה לאיזור האישי"
            className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-gold-400/40 text-gold-200 transition-all hover:border-gold-400 hover:bg-gold-400/10 md:hidden"
          >
            <UserIcon />
          </Link>

          {/* Mobile burger */}
          <button
            type="button"
            aria-label={mobileOpen ? "סגירת תפריט" : "פתיחת תפריט"}
            aria-expanded={mobileOpen}
            onClick={() => setMobileOpen((v) => !v)}
            className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-gold-400/40 text-gold-200 transition-all hover:bg-gold-400/10 lg:hidden"
          >
            {mobileOpen ? <CloseIcon /> : <BurgerIcon />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      <div
        className={`lg:hidden ${
          mobileOpen ? "max-h-[80vh] opacity-100" : "pointer-events-none max-h-0 opacity-0"
        } overflow-hidden border-t border-gold-400/15 bg-ink-900/95 backdrop-blur-md transition-all duration-300`}
      >
        <nav className="container-prem flex flex-col gap-1 py-4" aria-label="ניווט נייד">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.label}
              href={link.href}
              onClick={() => setMobileOpen(false)}
              className="rounded-xl px-4 py-3 text-base font-medium text-gray-100 transition-colors hover:bg-gold-400/10 hover:text-gold-100"
            >
              {link.label}
            </Link>
          ))}
          <Link
            href="/login"
            onClick={() => setMobileOpen(false)}
            className="mt-2 inline-flex items-center justify-center gap-2 rounded-full bg-gold-gradient px-4 py-3 text-sm font-semibold text-ink-900"
          >
            <UserIcon />
            כניסה לאיזור האישי
          </Link>
        </nav>
      </div>
    </header>
  );
}

function UserIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden>
      <path
        d="M12 12a4.5 4.5 0 1 0 0-9 4.5 4.5 0 0 0 0 9Zm0 2.25c-3.728 0-9 1.866-9 5.625V21h18v-1.125c0-3.759-5.272-5.625-9-5.625Z"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function BurgerIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden>
      <path d="M4 7h16M4 12h16M4 17h16" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
    </svg>
  );
}

function CloseIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden>
      <path d="M6 6l12 12M18 6L6 18" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
    </svg>
  );
}
