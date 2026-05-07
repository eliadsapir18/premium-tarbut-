import Link from "next/link";
import Logo from "./Logo";

export default function Footer() {
  return (
    <footer className="relative mt-24 border-t border-gold-400/20 bg-ink-950">
      <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gold-gradient opacity-60" />
      <div className="container-prem py-16">
        <div className="grid gap-12 lg:grid-cols-4">
          {/* Brand */}
          <div className="lg:col-span-2">
            <Logo size="md" />
            <p className="mt-6 max-w-md text-sm leading-7 text-gray-300">
              <span className="block font-display text-xl text-gold-200">פרימיום תרבות</span>
              הבית לאירועי תרבות ובידור נבחרים. רכישת כרטיסים מאובטחת לאירועים
              היוקרתיים בישראל — חוויה פרימיום, שירות אישי וזמינות מלאה.
            </p>
            <a
              href="https://wa.me/972546503587"
              target="_blank"
              rel="noopener noreferrer"
              className="mt-6 inline-flex items-center gap-2 rounded-full border border-gold-400/40 px-4 py-2 text-sm text-gold-200 hover:bg-gold-400/10"
            >
              <WaIcon />
              <span dir="ltr">054-650-3587</span>
              <span>/ וואטסאפ</span>
            </a>
          </div>

          {/* Nav */}
          <div>
            <h3 className="mb-4 text-sm font-semibold uppercase tracking-wider text-gold-200">
              ניווט
            </h3>
            <ul className="space-y-2 text-sm text-gray-300">
              <li><Link className="hover:text-gold-200" href="/">דף הבית</Link></li>
              <li><Link className="hover:text-gold-200" href="/events">כל האירועים</Link></li>
              <li><Link className="hover:text-gold-200" href="/events?cat=concerts">הופעות</Link></li>
              <li><Link className="hover:text-gold-200" href="/events?cat=theater">הצגות</Link></li>
              <li><Link className="hover:text-gold-200" href="/events?cat=standup">סטנדאפ</Link></li>
              <li><Link className="hover:text-gold-200" href="/events?cat=kids">ילדים</Link></li>
              <li><Link className="hover:text-gold-200" href="/contact">צור קשר</Link></li>
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h3 className="mb-4 text-sm font-semibold uppercase tracking-wider text-gold-200">
              מידע ושירות
            </h3>
            <ul className="space-y-2 text-sm text-gray-300">
              <li><Link className="hover:text-gold-200" href="/privacy">מדיניות פרטיות</Link></li>
              <li><Link className="hover:text-gold-200" href="/terms">תנאי שימוש</Link></li>
              <li><Link className="hover:text-gold-200" href="/cancellation">מדיניות ביטולים</Link></li>
              <li><Link className="hover:text-gold-200" href="/secure">רכישה מאובטחת</Link></li>
              <li><Link className="hover:text-gold-200" href="/contact">צור קשר</Link></li>
            </ul>
          </div>
        </div>

        <div className="mt-12 flex flex-col items-center justify-between gap-4 border-t border-gold-400/15 pt-6 md:flex-row">
          <p className="text-xs text-gray-400">
            © {new Date().getFullYear()} פרימיום תרבות — כל הזכויות שמורות.
          </p>
          <div className="flex items-center gap-3 text-xs text-gray-400">
            <span className="inline-flex items-center gap-1.5">
              <LockIcon /> תשלום מאובטח SSL
            </span>
            <span className="h-3 w-px bg-gold-400/30" />
            <span>שירות לקוחות בעברית</span>
          </div>
        </div>
      </div>
    </footer>
  );
}

function WaIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
      <path d="M12.04 2C6.58 2 2.13 6.45 2.13 11.91c0 2.1.55 4.15 1.6 5.96L2 22l4.27-1.12a9.86 9.86 0 0 0 5.77 1.83h.01c5.46 0 9.91-4.45 9.91-9.91 0-2.65-1.03-5.14-2.9-7.01A9.84 9.84 0 0 0 12.04 2Zm5.77 14.05c-.24.67-1.41 1.28-1.97 1.36-.5.07-1.13.1-1.83-.12-.42-.13-.97-.31-1.66-.6-2.93-1.27-4.84-4.22-4.99-4.42-.15-.2-1.18-1.57-1.18-3 0-1.42.74-2.12 1-2.42.27-.3.58-.37.78-.37l.56.01c.18.01.42-.07.66.5.24.6.83 2.07.9 2.22.07.15.12.32.02.52-.1.2-.15.32-.3.5-.15.17-.32.39-.46.52-.15.15-.31.31-.13.6.18.3.78 1.29 1.67 2.08 1.15 1.03 2.12 1.34 2.42 1.5.3.15.47.12.65-.07.18-.2.75-.87.95-1.17.2-.3.4-.25.66-.15.27.1 1.7.8 1.99.95.3.15.5.22.57.35.07.13.07.74-.16 1.41Z" />
    </svg>
  );
}

function LockIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" aria-hidden>
      <rect x="4" y="10" width="16" height="11" rx="2" stroke="currentColor" strokeWidth="1.6" />
      <path d="M8 10V7a4 4 0 1 1 8 0v3" stroke="currentColor" strokeWidth="1.6" />
    </svg>
  );
}
