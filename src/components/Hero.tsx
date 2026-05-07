import Image from "next/image";
import Link from "next/link";

export default function Hero() {
  return (
    <section
      className="relative flex min-h-[75vh] items-center justify-center overflow-hidden bg-ink-950 md:min-h-[85vh]"
      aria-label="ברוכים הבאים לפרימיום תרבות"
    >
      {/* Background image */}
      <div
        aria-hidden
        className="absolute inset-0 bg-cover bg-center opacity-90"
        style={{ backgroundImage: "url('/images/hero-bg.png')" }}
      />
      {/* Dark overlay for legibility */}
      <div aria-hidden className="absolute inset-0 bg-black/35" />
      {/* Vignette / radial pull-down */}
      <div
        aria-hidden
        className="absolute inset-0 bg-[radial-gradient(closest-side,transparent_45%,rgba(0,0,0,0.6))]"
      />

      {/* Subtle drifting glow lights to add motion */}
      <div
        aria-hidden
        className="pointer-events-none absolute -top-24 right-[-6%] h-[460px] w-[460px] rounded-full bg-gold-400/12 blur-[130px] animate-drift-a"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute bottom-[-10%] left-[-6%] h-[400px] w-[400px] rounded-full bg-gold-600/12 blur-[120px] animate-drift-b"
      />

      {/* Twinkling stars */}
      <span aria-hidden className="absolute right-[10%] top-[16%] h-1.5 w-1.5 rounded-full bg-gold-200 shadow-[0_0_12px_rgba(236,213,150,0.9)] animate-twinkle" />
      <span aria-hidden className="absolute right-[28%] top-[72%] h-1 w-1 rounded-full bg-gold-300 shadow-[0_0_10px_rgba(212,175,55,0.8)] animate-twinkle [animation-delay:600ms]" />
      <span aria-hidden className="absolute left-[15%] top-[24%] h-1 w-1 rounded-full bg-gold-200 shadow-[0_0_8px_rgba(236,213,150,0.8)] animate-twinkle [animation-delay:1200ms]" />
      <span aria-hidden className="absolute left-[30%] top-[80%] h-1.5 w-1.5 rounded-full bg-gold-300 shadow-[0_0_12px_rgba(212,175,55,0.9)] animate-twinkle [animation-delay:1800ms]" />

      {/* Content */}
      <div className="relative z-10 flex w-full flex-col items-center px-6 text-center">
        {/* Top divider with star */}
        <div className="mb-8 flex items-center gap-3 text-gold-400/80 animate-fade-up">
          <span className="h-px w-10 bg-gold-gradient" />
          <Star />
          <span className="h-px w-10 bg-gold-gradient" />
        </div>

        {/* Logo with soft halo */}
        <div className="relative animate-fade-up [animation-delay:100ms]">
          <div
            aria-hidden
            className="pointer-events-none absolute inset-0 -z-10 -m-12 rounded-full bg-[radial-gradient(closest-side,rgba(212,175,55,0.35),transparent_70%)] blur-2xl animate-pulse-glow"
          />
          <Image
            src="/images/premium-tarbut-logo.png"
            alt="פרימיום תרבות"
            width={1536}
            height={310}
            priority
            sizes="(max-width: 640px) 82vw, (max-width: 1024px) 70vw, 55vw"
            className="mx-auto h-auto w-[82vw] max-w-[320px] drop-shadow-[0_0_35px_rgba(212,175,55,0.35)] sm:max-w-[480px] md:w-[70vw] lg:w-[55vw] lg:max-w-[620px]"
          />
        </div>

        {/* Slogan */}
        <h1 className="mt-8 font-display text-3xl font-bold gold-text sm:text-4xl md:text-5xl animate-fade-up [animation-delay:200ms]">
          הבית לאירועי תרבות ובידור נבחרים
        </h1>

        {/* Description */}
        <p className="mt-4 max-w-2xl text-base leading-relaxed text-white/80 md:text-lg animate-fade-up [animation-delay:300ms]">
          מועדון פרימיום של הופעות, הצגות, סטנדאפ ופסטיבלים. חוויית הזמנה מהירה,
          מאובטחת ויוקרתית.
        </p>

        {/* CTAs */}
        <div className="mt-8 flex flex-col gap-3 sm:flex-row animate-fade-up [animation-delay:400ms]">
          <Link href="/events" className="btn-gold shimmer-gold animate-shimmer">
            <TicketIcon />
            לצפייה באירועים
          </Link>
          <a
            href="https://wa.me/972546503587"
            target="_blank"
            rel="noopener noreferrer"
            className="btn-ghost"
          >
            <WaIcon />
            יצירת קשר בוואטסאפ
          </a>
        </div>

        {/* Trust strip */}
        <div className="mt-12 flex flex-wrap items-center justify-center gap-x-8 gap-y-3 text-xs text-gold-300/80 sm:text-sm animate-fade-up [animation-delay:500ms]">
          <span className="inline-flex items-center gap-2">
            <DotGold /> רכישה מאובטחת SSL
          </span>
          <span className="inline-flex items-center gap-2">
            <DotGold /> שירות לקוחות בעברית
          </span>
          <span className="inline-flex items-center gap-2">
            <DotGold /> מאות אירועים פעילים
          </span>
          <span className="inline-flex items-center gap-2">
            <DotGold /> חוויה פרימיום
          </span>
        </div>
      </div>

      {/* Subtle horizontal sweep at the bottom */}
      <div className="pointer-events-none absolute bottom-0 left-0 right-0 h-px overflow-hidden">
        <div
          aria-hidden
          className="h-full w-1/3 bg-gradient-to-r from-transparent via-gold-300/70 to-transparent animate-sweep"
        />
      </div>
    </section>
  );
}

function Star() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
      <path d="M12 2l1.6 5.6L19 9l-4.5 3.3L16 18l-4-3-4 3 1.5-5.7L5 9l5.4-1.4L12 2Z" />
    </svg>
  );
}

function DotGold() {
  return <span className="inline-block h-1.5 w-1.5 rounded-full bg-gold-400" aria-hidden />;
}

function TicketIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden>
      <path
        d="M3 8a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2v2a2 2 0 0 0 0 4v2a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-2a2 2 0 0 0 0-4V8Z"
        stroke="currentColor"
        strokeWidth="1.6"
      />
      <path d="M11 6v12" stroke="currentColor" strokeWidth="1.6" strokeDasharray="2 2" />
    </svg>
  );
}

function WaIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
      <path d="M12.04 2C6.58 2 2.13 6.45 2.13 11.91c0 2.1.55 4.15 1.6 5.96L2 22l4.27-1.12a9.86 9.86 0 0 0 5.77 1.83h.01c5.46 0 9.91-4.45 9.91-9.91 0-2.65-1.03-5.14-2.9-7.01A9.84 9.84 0 0 0 12.04 2Z" />
    </svg>
  );
}
