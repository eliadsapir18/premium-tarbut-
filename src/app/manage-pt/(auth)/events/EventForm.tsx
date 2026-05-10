"use client";

import { useActionState, useState } from "react";
import Link from "next/link";
import type { CultureEvent, EventCategory, TicketTier } from "@/lib/types";

const CATEGORIES: { id: EventCategory; label: string }[] = [
  { id: "concerts", label: "הופעות" },
  { id: "standup", label: "סטנדאפ" },
  { id: "theater", label: "הצגות" },
  { id: "kids", label: "ילדים" },
  { id: "lectures", label: "הרצאות" },
  { id: "festivals", label: "פסטיבלים" },
];

interface ActionState {
  error?: string;
}

interface Props {
  initial?: CultureEvent;
  mode: "create" | "edit";
  action: (
    prev: ActionState,
    formData: FormData,
  ) => Promise<ActionState>;
}

function emptyTicket(): TicketTier {
  return { name: "", price: 0, available: true };
}

function isoForDateInput(iso: string): string {
  if (!iso) return "";
  const d = new Date(iso);
  if (Number.isNaN(d.getTime())) return "";
  const tz = d.getTimezoneOffset();
  const local = new Date(d.getTime() - tz * 60000);
  return local.toISOString().slice(0, 16);
}

export default function EventForm({ initial, mode, action }: Props) {
  const [state, formAction, pending] = useActionState(action, { error: "" });
  const [tickets, setTickets] = useState<TicketTier[]>(
    initial?.tickets ?? [emptyTicket()],
  );

  const updateTicket = (i: number, patch: Partial<TicketTier>) => {
    setTickets((arr) => arr.map((t, idx) => (idx === i ? { ...t, ...patch } : t)));
  };
  const addTicket = () => setTickets((a) => [...a, emptyTicket()]);
  const removeTicket = (i: number) =>
    setTickets((a) => (a.length > 1 ? a.filter((_, idx) => idx !== i) : a));

  return (
    <form action={formAction} className="space-y-8">
      <input type="hidden" name="tickets" value={JSON.stringify(tickets)} />

      <Section title="פרטים בסיסיים">
        <div className="grid gap-4 sm:grid-cols-2">
          <Field label="שם האירוע" required>
            <input
              name="title"
              required
              defaultValue={initial?.title ?? ""}
              className="form-input"
            />
          </Field>
          <Field label="אמן/יוצר" hint="אופציונלי">
            <input
              name="artist"
              defaultValue={initial?.artist ?? ""}
              className="form-input"
            />
          </Field>
          <Field
            label="slug (URL)"
            required
            hint="באנגלית, אותיות קטנות, מקפים. למשל: matan-hasan-live"
          >
            <input
              name="slug"
              required
              pattern="[a-z0-9-]+"
              defaultValue={initial?.slug ?? ""}
              disabled={mode === "edit"}
              className="form-input disabled:opacity-60"
            />
          </Field>
          <Field label="קטגוריה" required>
            <select
              name="category"
              required
              defaultValue={initial?.category ?? ""}
              className="form-input"
            >
              <option value="" disabled>
                בחרו קטגוריה
              </option>
              {CATEGORIES.map((c) => (
                <option key={c.id} value={c.id}>
                  {c.label}
                </option>
              ))}
            </select>
          </Field>
          <Field label="תאריך ושעה" required>
            <input
              name="date"
              type="datetime-local"
              required
              defaultValue={isoForDateInput(initial?.date ?? "")}
              className="form-input"
            />
          </Field>
          <Field label="תווית מיוחדת" hint="למשל: יום ירושלים">
            <input
              name="specialLabel"
              defaultValue={initial?.specialLabel ?? ""}
              className="form-input"
            />
          </Field>
          <Field label="אולם" required>
            <input
              name="venue"
              required
              defaultValue={initial?.venue ?? ""}
              className="form-input"
            />
          </Field>
          <Field label="עיר" required>
            <input
              name="city"
              required
              defaultValue={initial?.city ?? ""}
              className="form-input"
            />
          </Field>
        </div>
      </Section>

      <Section title="תיאור">
        <Field label="תיאור קצר" required hint="2-3 משפטים שיופיעו ברשימה">
          <textarea
            name="description"
            required
            rows={2}
            defaultValue={initial?.description ?? ""}
            className="form-input min-h-[80px]"
          />
        </Field>
        <Field label="תיאור מלא" required hint="טקסט שיופיע בדף האירוע">
          <textarea
            name="longDescription"
            required
            rows={6}
            defaultValue={initial?.longDescription ?? ""}
            className="form-input min-h-[160px]"
          />
        </Field>
      </Section>

      <Section title="תמונה ומחיר">
        <Field
          label="כתובת תמונה (URL)"
          required
          hint="העלו ל-Imgur/Cloudinary או כל CDN ותדביקו URL"
        >
          <input
            name="image"
            type="url"
            required
            defaultValue={initial?.image ?? ""}
            placeholder="https://..."
            className="form-input"
          />
        </Field>
        <div className="grid gap-4 sm:grid-cols-2">
          <Field label="מיקום בתמונה" hint="למשל: center top">
            <input
              name="imagePosition"
              defaultValue={initial?.imagePosition ?? ""}
              className="form-input"
            />
          </Field>
          <Field label="מחיר מינימלי (₪)" required>
            <input
              name="priceFrom"
              type="number"
              required
              min={0}
              defaultValue={initial?.priceFrom ?? ""}
              className="form-input"
            />
          </Field>
        </div>
        <label className="inline-flex items-center gap-2 text-sm text-gray-200">
          <input
            type="checkbox"
            name="featured"
            defaultChecked={initial?.featured ?? false}
            className="h-4 w-4 rounded border-gold-400/40 bg-ink-900 text-gold-400 focus:ring-gold-400"
          />
          להציג בעמוד הבית כאירוע נבחר
        </label>
      </Section>

      <Section title="כרטיסים">
        <div className="space-y-3">
          {tickets.map((t, i) => (
            <div
              key={i}
              className="card-prem grid gap-3 p-4 sm:grid-cols-[1.4fr_1fr_1.6fr_auto_auto] sm:items-center"
            >
              <input
                placeholder="שם הכרטיס"
                value={t.name}
                onChange={(e) => updateTicket(i, { name: e.target.value })}
                className="form-input"
              />
              <input
                type="number"
                min={0}
                placeholder="מחיר ₪"
                value={t.price || ""}
                onChange={(e) =>
                  updateTicket(i, { price: Number(e.target.value) })
                }
                className="form-input"
              />
              <input
                placeholder="הערה (אופציונלי)"
                value={t.description ?? ""}
                onChange={(e) =>
                  updateTicket(i, { description: e.target.value })
                }
                className="form-input"
              />
              <label className="inline-flex items-center gap-2 text-xs text-gray-300">
                <input
                  type="checkbox"
                  checked={t.available}
                  onChange={(e) =>
                    updateTicket(i, { available: e.target.checked })
                  }
                  className="h-4 w-4 rounded border-gold-400/40 bg-ink-900 text-gold-400 focus:ring-gold-400"
                />
                זמין
              </label>
              <button
                type="button"
                onClick={() => removeTicket(i)}
                disabled={tickets.length === 1}
                className="rounded-lg border border-red-400/30 px-3 py-2 text-xs text-red-300 hover:border-red-400 disabled:opacity-40"
              >
                הסר
              </button>
            </div>
          ))}
        </div>
        <button
          type="button"
          onClick={addTicket}
          className="rounded-lg border border-gold-400/30 px-4 py-2 text-sm text-gold-200 hover:border-gold-400 hover:text-gold-100"
        >
          + הוסף סוג כרטיס
        </button>
      </Section>

      {state?.error && (
        <p className="text-sm text-red-400" role="alert">
          {state.error}
        </p>
      )}

      <div className="flex flex-wrap gap-3">
        <button
          type="submit"
          disabled={pending}
          className="btn-gold disabled:opacity-60"
        >
          {pending
            ? "שומר..."
            : mode === "create"
              ? "יצירת אירוע"
              : "שמירת שינויים"}
        </button>
        <Link href="/manage-pt" className="btn-ghost">
          ביטול
        </Link>
      </div>
    </form>
  );
}

function Section({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section className="space-y-4">
      <h2 className="font-display text-xl font-semibold text-gold-100">
        {title}
      </h2>
      <div className="space-y-4">{children}</div>
    </section>
  );
}

function Field({
  label,
  required,
  hint,
  children,
}: {
  label: string;
  required?: boolean;
  hint?: string;
  children: React.ReactNode;
}) {
  return (
    <label className="block">
      <span className="mb-1.5 block text-xs font-medium text-gold-200">
        {label}
        {required && <span className="ms-1 text-gold-400">*</span>}
      </span>
      {children}
      {hint && <span className="mt-1 block text-[11px] text-gray-500">{hint}</span>}
    </label>
  );
}
