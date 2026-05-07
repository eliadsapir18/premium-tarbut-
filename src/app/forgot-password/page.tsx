import Link from "next/link";
import AuthShell from "@/components/AuthShell";
import AuthFormField from "@/components/AuthFormField";

export default function ForgotPasswordPage() {
  return (
    <AuthShell
      title="שכחתי סיסמה"
      subtitle="הזינו את כתובת המייל ואנחנו נשלח קישור לאיפוס סיסמה"
      footer={
        <>
          זוכרים את הסיסמה?{" "}
          <Link href="/login" className="font-semibold text-gold-300 hover:text-gold-100">
            התחברות
          </Link>
        </>
      }
    >
      <form className="space-y-4">
        <AuthFormField
          id="email"
          label="אימייל"
          type="email"
          autoComplete="email"
          inputMode="email"
          required
          placeholder="name@example.com"
        />
        <button type="submit" className="btn-gold w-full">
          שליחת קישור
        </button>
      </form>
    </AuthShell>
  );
}
