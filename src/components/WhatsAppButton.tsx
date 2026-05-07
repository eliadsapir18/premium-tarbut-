"use client";

export default function WhatsAppButton() {
  const phone = "972546503587";
  const message = encodeURIComponent("שלום, אשמח לקבל פרטים על אירועים בפרימיום תרבות");
  return (
    <a
      href={`https://wa.me/${phone}?text=${message}`}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="שליחת הודעה בוואטסאפ — 054-650-3587"
      className="group fixed bottom-5 left-5 z-40 inline-flex h-14 w-14 items-center justify-center rounded-full shadow-2xl transition-all duration-300 hover:-translate-y-0.5 hover:scale-105 sm:h-16 sm:w-16"
      style={{
        background: "linear-gradient(135deg, #25d366 0%, #128c7e 100%)",
        boxShadow: "0 10px 30px -8px rgba(37, 211, 102, 0.55)",
      }}
    >
      <span className="absolute inset-0 -z-10 rounded-full bg-[#25d366] opacity-0 blur-md transition-opacity group-hover:opacity-50" />
      <svg width="28" height="28" viewBox="0 0 24 24" fill="white" aria-hidden>
        <path d="M12.04 2C6.58 2 2.13 6.45 2.13 11.91c0 2.1.55 4.15 1.6 5.96L2 22l4.27-1.12a9.86 9.86 0 0 0 5.77 1.83h.01c5.46 0 9.91-4.45 9.91-9.91 0-2.65-1.03-5.14-2.9-7.01A9.84 9.84 0 0 0 12.04 2Zm5.77 14.05c-.24.67-1.41 1.28-1.97 1.36-.5.07-1.13.1-1.83-.12-.42-.13-.97-.31-1.66-.6-2.93-1.27-4.84-4.22-4.99-4.42-.15-.2-1.18-1.57-1.18-3 0-1.42.74-2.12 1-2.42.27-.3.58-.37.78-.37l.56.01c.18.01.42-.07.66.5.24.6.83 2.07.9 2.22.07.15.12.32.02.52-.1.2-.15.32-.3.5-.15.17-.32.39-.46.52-.15.15-.31.31-.13.6.18.3.78 1.29 1.67 2.08 1.15 1.03 2.12 1.34 2.42 1.5.3.15.47.12.65-.07.18-.2.75-.87.95-1.17.2-.3.4-.25.66-.15.27.1 1.7.8 1.99.95.3.15.5.22.57.35.07.13.07.74-.16 1.41Z" />
      </svg>
      <span className="absolute -top-2 right-full me-3 hidden whitespace-nowrap rounded-full bg-ink-800 px-3 py-1 text-xs text-gold-200 opacity-0 shadow-lg transition-opacity group-hover:opacity-100 sm:block" />
    </a>
  );
}
