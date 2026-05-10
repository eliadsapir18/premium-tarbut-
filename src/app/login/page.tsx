import Link from "next/link";
import { redirect } from "next/navigation";
import AuthShell from "@/components/AuthShell";
import { getCurrentUser } from "@/lib/user-auth";
import LoginForm from "./LoginForm";

export default async function LoginPage({
  searchParams,
}: {
  searchParams: Promise<{ next?: string }>;
}) {
  const user = await getCurrentUser();
  const { next } = await searchParams;
  const nextSafe =
    typeof next === "string" && next.startsWith("/") ? next : "/account";

  if (user) redirect(nextSafe);

  return (
    <AuthShell
      title="התחברות"
      subtitle="ברוכים השבים למועדון פרימיום תרבות"
      footer={
        <>
          חדשים כאן?{" "}
          <Link
            href={`/register${next ? `?next=${encodeURIComponent(nextSafe)}` : ""}`}
            className="font-semibold text-gold-300 hover:text-gold-100"
          >
            פתחו חשבון
          </Link>
        </>
      }
    >
      <LoginForm next={nextSafe} />
    </AuthShell>
  );
}
