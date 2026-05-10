"use client";

import { useActionState } from "react";
import Link from "next/link";
import AuthFormField from "@/components/AuthFormField";
import { registerAction } from "@/lib/auth-actions";

export default function RegisterForm({ next }: { next: string }) {
  const [state, formAction, pending] = useActionState(registerAction, {
    error: "",
  });

  return (
    <form action={formAction} className="space-y-4">
      <input type="hidden" name="next" value={next} />

      <div className="grid grid-cols-2 gap-3">
        <AuthFormField
          id="firstName"
          label="שם פרטי"
          autoComplete="given-name"
          required
        />
        <AuthFormField
          id="lastName"
          label="שם משפחה"
          autoComplete="family-name"
          required
        />
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
        required
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
        אני מסכים/ה ל
        <Link href="/terms" className="text-gold-300 hover:text-gold-100">
          תנאי השימוש
        </Link>
        ו
        <Link href="/privacy" className="text-gold-300 hover:text-gold-100">
          מדיניות הפרטיות
        </Link>
      </label>

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
        {pending ? "פותח חשבון..." : "פתיחת חשבון"}
      </button>
    </form>
  );
}
