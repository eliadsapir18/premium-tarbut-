import Link from "next/link";
import { redirect } from "next/navigation";
import AuthShell from "@/components/AuthShell";
import { getCurrentUser } from "@/lib/user-auth";
import RegisterForm from "./RegisterForm";

export default async function RegisterPage({
  searchParams,
}: {
  searchParams: Promise<{ next?: string }>;
}) {
  const user = await getCurrentUser();
  const { next } = await searchParams;
  const nextSafe = typeof next === "string" && next.startsWith("/") ? next : "/account";

  if (user) redirect(nextSafe);

  return (
    <AuthShell
      title="הרשמה"
      subtitle="הצטרפו למועדון, וקבלו עדכונים על אירועים נבחרים"
      footer={
        <>
          כבר יש לכם חשבון?{" "}
          <Link
            href={`/login${next ? `?next=${encodeURIComponent(nextSafe)}` : ""}`}
            className="font-semibold text-gold-300 hover:text-gold-100"
          >
            התחברות
          </Link>
        </>
      }
    >
      <RegisterForm next={nextSafe} />
    </AuthShell>
  );
}
