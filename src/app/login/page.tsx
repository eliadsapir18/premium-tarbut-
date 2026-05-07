import Link from "next/link";
import AuthShell from "@/components/AuthShell";
import AuthFormField from "@/components/AuthFormField";

export default function LoginPage() {
  return (
    <AuthShell
      title="התחברות"
      subtitle="ברוכים השבים למועדון פרימיום תרבות"
      footer={
        <>
          חדשים כאן?{" "}
          <Link href="/register" className="font-semibold text-gold-300 hover:text-gold-100">
            פתחו חשבון
          </Link>
        </>
      }
    >
      <form className="space-y-4" action="/account">
        <AuthFormField
          id="email"
          label="אימייל"
          type="email"
          autoComplete="email"
          inputMode="email"
          required
          placeholder="name@example.com"
        />
        <AuthFormField
          id="password"
          label="סיסמה"
          type="password"
          autoComplete="current-password"
          required
          placeholder="••••••••"
        />

        <div className="flex items-center justify-between text-xs">
          <label className="inline-flex items-center gap-2 text-gray-300">
            <input
              type="checkbox"
              className="h-4 w-4 rounded border-gold-400/40 bg-ink-900 text-gold-400 focus:ring-gold-400"
            />
            זכרו אותי
          </label>
          <Link href="/forgot-password" className="text-gold-300 hover:text-gold-100">
            שכחתי סיסמה
          </Link>
        </div>

        <button type="submit" className="btn-gold w-full">
          התחברות
        </button>
      </form>
    </AuthShell>
  );
}
