import Link from "next/link";
import AuthShell from "@/components/AuthShell";
import AuthFormField from "@/components/AuthFormField";

export default function RegisterPage() {
  return (
    <AuthShell
      title="הרשמה"
      subtitle="הצטרפו למועדון, וקבלו עדכונים על אירועים נבחרים"
      footer={
        <>
          כבר יש לכם חשבון?{" "}
          <Link href="/login" className="font-semibold text-gold-300 hover:text-gold-100">
            התחברות
          </Link>
        </>
      }
    >
      <form className="space-y-4" action="/account">
        <div className="grid grid-cols-2 gap-3">
          <AuthFormField id="firstName" label="שם פרטי" autoComplete="given-name" required />
          <AuthFormField id="lastName" label="שם משפחה" autoComplete="family-name" required />
        </div>
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
          id="phone"
          label="טלפון"
          type="tel"
          autoComplete="tel"
          inputMode="tel"
          placeholder="050-0000000"
        />
        <AuthFormField
          id="password"
          label="סיסמה"
          type="password"
          autoComplete="new-password"
          required
          placeholder="לפחות 8 תווים"
        />

        <label className="inline-flex items-start gap-2 text-xs text-gray-300">
          <input
            type="checkbox"
            className="mt-0.5 h-4 w-4 rounded border-gold-400/40 bg-ink-900 text-gold-400 focus:ring-gold-400"
          />
          אני מאשר/ת קבלת עדכונים על אירועים נבחרים והצעות מיוחדות
        </label>

        <button type="submit" className="btn-gold w-full">
          פתיחת חשבון
        </button>
      </form>
    </AuthShell>
  );
}
