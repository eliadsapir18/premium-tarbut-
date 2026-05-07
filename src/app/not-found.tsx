import Link from "next/link";

export default function NotFound() {
  return (
    <section className="container-prem flex min-h-[60vh] flex-col items-center justify-center py-24 text-center">
      <span className="font-display text-7xl font-bold gold-text">404</span>
      <h1 className="mt-4 font-display text-3xl font-semibold text-gold-100">
        העמוד לא נמצא
      </h1>
      <p className="mt-3 max-w-md text-sm leading-7 text-gray-300">
        אולי הקישור פג תוקפו או הוסר. בואו נחזור למסלול ונמצא לכם אירוע מתאים.
      </p>
      <div className="mt-8 flex flex-col gap-3 sm:flex-row">
        <Link href="/" className="btn-gold">דף הבית</Link>
        <Link href="/events" className="btn-ghost">לכל האירועים</Link>
      </div>
    </section>
  );
}
