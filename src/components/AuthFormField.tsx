"use client";

import { useState } from "react";

interface Props {
  id: string;
  label: string;
  type?: string;
  placeholder?: string;
  autoComplete?: string;
  required?: boolean;
  inputMode?: "text" | "email" | "tel" | "numeric";
}

export default function AuthFormField({
  id,
  label,
  type = "text",
  placeholder,
  autoComplete,
  required,
  inputMode,
}: Props) {
  const isPassword = type === "password";
  const [reveal, setReveal] = useState(false);
  const inputType = isPassword && reveal ? "text" : type;

  return (
    <div>
      <label
        htmlFor={id}
        className="mb-1.5 block text-xs font-medium text-gold-200"
      >
        {label}
        {required && <span className="ms-1 text-gold-400">*</span>}
      </label>
      <div className="relative">
        <input
          id={id}
          name={id}
          type={inputType}
          placeholder={placeholder}
          autoComplete={autoComplete}
          required={required}
          inputMode={inputMode}
          className={`w-full rounded-xl border border-gold-400/20 bg-ink-900 px-4 py-3 text-sm text-gold-100 placeholder:text-gray-500 focus:border-gold-400 focus:outline-none ${
            isPassword ? "pe-12" : ""
          }`}
        />
        {isPassword && (
          <button
            type="button"
            onClick={() => setReveal((v) => !v)}
            aria-label={reveal ? "הסתר סיסמה" : "הצג סיסמה"}
            aria-pressed={reveal}
            className="absolute inset-y-0 end-0 flex items-center justify-center px-3 text-gold-300 transition-colors hover:text-gold-100 focus:outline-none focus:text-gold-100"
          >
            {reveal ? (
              <svg
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                aria-hidden
              >
                <path
                  d="M3 3l18 18"
                  stroke="currentColor"
                  strokeWidth="1.6"
                  strokeLinecap="round"
                />
                <path
                  d="M10.58 10.58a2 2 0 0 0 2.83 2.83"
                  stroke="currentColor"
                  strokeWidth="1.6"
                  strokeLinecap="round"
                />
                <path
                  d="M9.88 5.09A10.94 10.94 0 0 1 12 5c5 0 9.27 3.11 11 7-.45 1.01-1.07 1.95-1.83 2.78M6.61 6.61C4.62 7.83 3.05 9.55 2 12c1.73 3.89 6 7 11 7 1.81 0 3.5-.41 5-1.13"
                  stroke="currentColor"
                  strokeWidth="1.6"
                  strokeLinecap="round"
                />
              </svg>
            ) : (
              <svg
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                aria-hidden
              >
                <path
                  d="M2 12s4-7 11-7 11 7 11 7-4 7-11 7-11-7-11-7Z"
                  stroke="currentColor"
                  strokeWidth="1.6"
                  strokeLinejoin="round"
                />
                <circle
                  cx="12"
                  cy="12"
                  r="3"
                  stroke="currentColor"
                  strokeWidth="1.6"
                />
              </svg>
            )}
          </button>
        )}
      </div>
    </div>
  );
}
