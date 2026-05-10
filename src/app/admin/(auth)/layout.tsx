import Link from "next/link";
import { redirect } from "next/navigation";
import { isAdminAuthed, clearAdminCookie } from "@/lib/admin-auth";

export const metadata = {
  title: "אדמין — פרימיום תרבות",
  robots: { index: false, follow: false },
};

async function logoutAction() {
  "use server";
  await clearAdminCookie();
  redirect("/admin/login");
}

export default async function AdminAuthedLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const authed = await isAdminAuthed();
  if (!authed) redirect("/admin/login");

  return (
    <div className="min-h-[calc(100vh-4rem)]">
      <header className="border-b border-gold-400/15 bg-ink-950/60 backdrop-blur">
        <div className="container-prem flex flex-wrap items-center justify-between gap-3 py-4">
          <div className="flex items-center gap-3">
            <Link
              href="/admin"
              className="font-display text-lg font-semibold gold-text"
            >
              פאנל אדמין
            </Link>
            <span className="hidden text-xs text-gray-500 sm:inline">
              ניהול אירועים
            </span>
          </div>
          <div className="flex items-center gap-3 text-sm">
            <Link
              href="/"
              className="text-gold-300 hover:text-gold-100"
              target="_blank"
            >
              צפה באתר ↗
            </Link>
            <form action={logoutAction}>
              <button
                type="submit"
                className="rounded-lg border border-gold-400/30 px-3 py-1.5 text-xs text-gold-200 hover:border-gold-400 hover:text-gold-100"
              >
                יציאה
              </button>
            </form>
          </div>
        </div>
      </header>
      <main className="container-prem py-8 sm:py-10">{children}</main>
    </div>
  );
}
