"use client";

import { useActionState } from "react";
import { loginAction } from "./actions";

export default function LoginForm() {
  const [state, formAction, pending] = useActionState(loginAction, {
    error: "",
  });

  return (
    <form action={formAction} className="space-y-4">
      <div>
        <label
          htmlFor="password"
          className="mb-1.5 block text-xs font-medium text-gold-200"
        >
          סיסמת מנהל <span className="ms-1 text-gold-400">*</span>
        </label>
        <input
          id="password"
          name="password"
          type="password"
          autoComplete="current-password"
          required
          autoFocus
          className="w-full rounded-xl border border-gold-400/20 bg-ink-900 px-4 py-3 text-sm text-gold-100 placeholder:text-gray-500 focus:border-gold-400 focus:outline-none"
        />
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
        {pending ? "מתחבר..." : "כניסה"}
      </button>
    </form>
  );
}
