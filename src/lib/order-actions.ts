"use server";

import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import { db } from "@/db";
import { orders, events } from "@/db/schema";
import { eq } from "drizzle-orm";
import { getCurrentUser } from "@/lib/user-auth";
import type { TicketTier } from "@/lib/types";

interface ActionState {
  error?: string;
  success?: string;
}

export async function createOrderAction(
  _prev: ActionState,
  formData: FormData,
): Promise<ActionState> {
  const user = await getCurrentUser();
  const eventSlug = formData.get("eventSlug") as string;

  if (!user) {
    redirect(`/login?next=${encodeURIComponent(`/events/${eventSlug}`)}`);
  }

  const tierName = (formData.get("tierName") as string)?.trim();
  const quantity = Number(formData.get("quantity"));
  const notes = (formData.get("notes") as string)?.trim() || null;

  if (!tierName) return { error: "יש לבחור סוג כרטיס" };
  if (!Number.isFinite(quantity) || quantity < 1 || quantity > 20) {
    return { error: "כמות לא תקינה (1-20)" };
  }

  const [event] = await db
    .select({
      id: events.id,
      title: events.title,
      tickets: events.tickets,
    })
    .from(events)
    .where(eq(events.slug, eventSlug))
    .limit(1);

  if (!event) return { error: "האירוע לא נמצא" };

  const tier = (event.tickets as TicketTier[]).find((t) => t.name === tierName);
  if (!tier) return { error: "סוג הכרטיס לא נמצא" };
  if (!tier.available) return { error: "סוג הכרטיס אזל" };

  await db.insert(orders).values({
    userId: user!.id,
    eventId: event.id,
    eventTitleSnapshot: event.title,
    ticketTierName: tier.name,
    ticketPriceSnapshot: tier.price,
    quantity,
    notes,
    status: "pending",
  });

  revalidatePath("/account");
  redirect("/account?ordered=1");
}
