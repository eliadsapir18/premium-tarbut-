"use client";

import { useActionState, useState } from "react";
import type { TicketTier } from "@/lib/types";
import { createOrderAction } from "@/lib/order-actions";

interface Props {
  eventSlug: string;
  tickets: TicketTier[];
  isLoggedIn: boolean;
}

export default function OrderForm({ eventSlug, tickets, isLoggedIn }: Props) {
  const [state, formAction, pending] = useActionState(createOrderAction, {});
  const availableTickets = tickets.filter((t) => t.available);
  const [tierName, setTierName] = useState(
    availableTickets[0]?.name ?? tickets[0]?.name ?? "",
  );
  const [quantity, setQuantity] = useState(1);
  const selectedTier = tickets.find((t) => t.name === tierName);

  const total = (selectedTier?.price ?? 0) * quantity;

  return (
    <form action={formAction} className="mt-6 space-y-3">
      <input type="hidden" name="eventSlug" value={eventSlug} />
      <input type="hidden" name="tierName" value={tierName} />

      <ul className="space-y-3">
        {tickets.map((t) => {
          const selected = t.name === tierName;
          return (
            <li key={t.name}>
              <button
                type="button"
                disabled={!t.available}
                onClick={() => t.available && setTierName(t.name)}
                className={`w-full rounded-xl border p-4 text-start transition-colors ${
                  selected
                    ? "border-gold-400 bg-gold-400/5"
                    : "border-gold-400/20 hover:border-gold-400/60"
                } ${!t.available ? "opacity-40 cursor-not-allowed" : ""}`}
              >
                <div className="flex items-center justify-between gap-3">
                  <div>
                    <div className="text-sm font-semibold text-gold-100">
                      {t.name}
                    </div>
                    {t.description && (
                      <div className="mt-0.5 text-xs text-gray-400">
                        {t.description}
                      </div>
                    )}
                  </div>
                  <div className="text-end">
                    <div className="font-display text-lg text-gold-300">
                      ₪{t.price}
                    </div>
                    <div className="text-[11px] text-gray-500">
                      {t.available ? "זמין" : "אזל"}
                    </div>
                  </div>
                </div>
              </button>
            </li>
          );
        })}
      </ul>

      <div className="flex items-center justify-between gap-3 rounded-xl border border-gold-400/20 bg-ink-900 p-3">
        <label htmlFor="quantity" className="text-sm text-gold-100">
          כמות
        </label>
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => setQuantity((q) => Math.max(1, q - 1))}
            className="h-8 w-8 rounded-lg border border-gold-400/30 text-gold-200 hover:border-gold-400"
            aria-label="פחות"
          >
            −
          </button>
          <input
            id="quantity"
            name="quantity"
            type="number"
            min={1}
            max={20}
            value={quantity}
            onChange={(e) =>
              setQuantity(Math.max(1, Math.min(20, Number(e.target.value))))
            }
            className="w-14 rounded-lg border border-gold-400/20 bg-ink-950 px-2 py-1.5 text-center text-sm text-gold-100"
          />
          <button
            type="button"
            onClick={() => setQuantity((q) => Math.min(20, q + 1))}
            className="h-8 w-8 rounded-lg border border-gold-400/30 text-gold-200 hover:border-gold-400"
            aria-label="עוד"
          >
            +
          </button>
        </div>
      </div>

      <details className="rounded-xl border border-gold-400/15 bg-ink-900">
        <summary className="cursor-pointer p-3 text-xs text-gold-300/80">
          הערה (אופציונלי)
        </summary>
        <div className="px-3 pb-3">
          <textarea
            name="notes"
            rows={2}
            placeholder="למשל: בקשה לישיבה צמודה"
            className="w-full rounded-lg border border-gold-400/20 bg-ink-950 px-3 py-2 text-sm text-gold-100 placeholder:text-gray-500 focus:border-gold-400 focus:outline-none"
          />
        </div>
      </details>

      <div className="flex items-center justify-between rounded-xl border border-gold-400/20 bg-gradient-to-l from-gold-400/5 to-transparent p-4">
        <span className="text-sm text-gold-100">סך הכל</span>
        <span className="font-display text-2xl gold-text">₪{total}</span>
      </div>

      {state?.error && (
        <p className="text-sm text-red-400" role="alert">
          {state.error}
        </p>
      )}

      <button
        type="submit"
        disabled={pending || !selectedTier?.available}
        className="btn-gold w-full disabled:opacity-60"
      >
        {pending
          ? "שולח..."
          : isLoggedIn
            ? "שליחת בקשה לרכישה"
            : "התחברות כדי להזמין"}
      </button>

      <p className="text-[11px] text-gray-500">
        זוהי בקשת התעניינות. ניצור איתכם קשר בוואטסאפ או טלפון לסיום הרכישה
        ולתשלום מאובטח.
      </p>
    </form>
  );
}
