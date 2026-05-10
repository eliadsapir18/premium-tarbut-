"use client";

import { useActionState } from "react";
import Link from "next/link";
import AuthFormField from "@/components/AuthFormField";
import { loginAction } from "@/lib/auth-actions";

export default function LoginForm({ next }: { next: string }) {
  const [state, formAction, pending] = useActionState(loginAction, {
    error: "",
  });

  return (
    <form action={formAction} className="space-y-4">
      <input type="hidden" name="next" value={next} />

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
        <Link
          href="/forgot-password"
          className="text-gold-300 hover:text-gold-100"
        >
          שכחתי סיסמה
        </Link>
      </div>

      {state?.error && (
        <p className="text-sm text-red-400" role="alert">
          {state.error}
        </p>
      )}

      <button
        type="submit"
        disabled={pending}
        className="btn-gold w-full disabled:opacity-60"
      >
        {pending ? "מתחבר..." : "התחברות"}
      </button>
    </form>
  );
}
