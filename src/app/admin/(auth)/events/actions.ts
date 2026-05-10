"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { eq } from "drizzle-orm";
import { db } from "@/db";
import { events } from "@/db/schema";
import type { EventCategory, TicketTier } from "@/lib/types";
import { isAdminAuthed } from "@/lib/admin-auth";

const CATEGORY_LABELS: Record<EventCategory, string> = {
  concerts: "הופעות",
  standup: "סטנדאפ",
  theater: "הצגות",
  kids: "ילדים",
  lectures: "הרצאות",
  festivals: "פסטיבלים",
};

function pad(n: number) {
  return n.toString().padStart(2, "0");
}

function buildLabels(date: Date) {
  const d = pad(date.getDate());
  const m = pad(date.getMonth() + 1);
  const y = date.getFullYear();
  return {
    dateLabel: `${d}.${m}.${y}`,
    timeLabel: `${pad(date.getHours())}:${pad(date.getMinutes())}`,
  };
}

function parseTickets(raw: string | null): TicketTier[] {
  if (!raw) return [];
  try {
    const arr = JSON.parse(raw) as unknown;
    if (!Array.isArray(arr)) return [];
    return arr
      .map((t) => {
        const obj = t as Record<string, unknown>;
        const name = String(obj.name ?? "").trim();
        const price = Number(obj.price);
        if (!name || !Number.isFinite(price)) return null;
        const description = obj.description
          ? String(obj.description).trim()
          : undefined;
        const available = obj.available !== false;
        return {
          name,
          price,
          ...(description ? { description } : {}),
          available,
        } as TicketTier;
      })
      .filter((x): x is TicketTier => x !== null);
  } catch {
    return [];
  }
}

interface ActionState {
  error?: string;
}

async function ensureAuth() {
  if (!(await isAdminAuthed())) {
    throw new Error("Unauthorized");
  }
}

function extractFormFields(formData: FormData) {
  const slug = (formData.get("slug") as string).trim();
  const title = (formData.get("title") as string).trim();
  const artist = (formData.get("artist") as string)?.trim() || null;
  const category = formData.get("category") as EventCategory;
  const dateRaw = formData.get("date") as string;
  const specialLabel =
    (formData.get("specialLabel") as string)?.trim() || null;
  const venue = (formData.get("venue") as string).trim();
  const city = (formData.get("city") as string).trim();
  const description = (formData.get("description") as string).trim();
  const longDescription = (formData.get("longDescription") as string).trim();
  const image = (formData.get("image") as string).trim();
  const imagePosition =
    (formData.get("imagePosition") as string)?.trim() || null;
  const priceFrom = Number(formData.get("priceFrom"));
  const featured = formData.get("featured") === "on";
  const tickets = parseTickets(formData.get("tickets") as string | null);

  return {
    slug,
    title,
    artist,
    category,
    dateRaw,
    specialLabel,
    venue,
    city,
    description,
    longDescription,
    image,
    imagePosition,
    priceFrom,
    featured,
    tickets,
  };
}

function validate(fields: ReturnType<typeof extractFormFields>): string | null {
  if (!fields.slug || !/^[a-z0-9-]+$/.test(fields.slug)) {
    return "slug חייב להיות באנגלית, אותיות קטנות, מספרים ומקפים בלבד";
  }
  if (!fields.title) return "חסר שם אירוע";
  if (!fields.category || !(fields.category in CATEGORY_LABELS)) {
    return "חסרה קטגוריה";
  }
  if (!fields.dateRaw) return "חסר תאריך";
  const date = new Date(fields.dateRaw);
  if (Number.isNaN(date.getTime())) return "תאריך לא תקין";
  if (!fields.venue) return "חסר אולם";
  if (!fields.city) return "חסרה עיר";
  if (!fields.description) return "חסר תיאור קצר";
  if (!fields.longDescription) return "חסר תיאור מלא";
  if (!fields.image) return "חסרה תמונה (URL)";
  if (!Number.isFinite(fields.priceFrom) || fields.priceFrom < 0) {
    return "מחיר מינימלי לא תקין";
  }
  if (fields.tickets.length === 0) return "צריך לפחות סוג כרטיס אחד";
  return null;
}

export async function createEventAction(
  _prev: ActionState,
  formData: FormData,
): Promise<ActionState> {
  await ensureAuth();
  const fields = extractFormFields(formData);
  const error = validate(fields);
  if (error) return { error };

  const date = new Date(fields.dateRaw);
  const { dateLabel, timeLabel } = buildLabels(date);

  try {
    await db.insert(events).values({
      id: fields.slug,
      slug: fields.slug,
      title: fields.title,
      artist: fields.artist,
      category: fields.category,
      categoryLabel: CATEGORY_LABELS[fields.category],
      date,
      dateLabel,
      specialLabel: fields.specialLabel,
      timeLabel,
      venue: fields.venue,
      city: fields.city,
      description: fields.description,
      longDescription: fields.longDescription,
      image: fields.image,
      imagePosition: fields.imagePosition,
      priceFrom: fields.priceFrom,
      featured: fields.featured,
      tickets: fields.tickets,
    });
  } catch (e) {
    if (e instanceof Error && e.message.includes("duplicate")) {
      return { error: "slug כבר קיים — בחרו slug אחר" };
    }
    return { error: "שגיאה בשמירת האירוע" };
  }

  revalidatePath("/");
  revalidatePath("/events");
  revalidatePath(`/events/${fields.slug}`);
  redirect("/admin");
}

export async function updateEventAction(
  id: string,
  _prev: ActionState,
  formData: FormData,
): Promise<ActionState> {
  await ensureAuth();
  const fields = extractFormFields(formData);
  const error = validate(fields);
  if (error) return { error };

  const date = new Date(fields.dateRaw);
  const { dateLabel, timeLabel } = buildLabels(date);

  await db
    .update(events)
    .set({
      slug: fields.slug,
      title: fields.title,
      artist: fields.artist,
      category: fields.category,
      categoryLabel: CATEGORY_LABELS[fields.category],
      date,
      dateLabel,
      specialLabel: fields.specialLabel,
      timeLabel,
      venue: fields.venue,
      city: fields.city,
      description: fields.description,
      longDescription: fields.longDescription,
      image: fields.image,
      imagePosition: fields.imagePosition,
      priceFrom: fields.priceFrom,
      featured: fields.featured,
      tickets: fields.tickets,
    })
    .where(eq(events.id, id));

  revalidatePath("/");
  revalidatePath("/events");
  revalidatePath(`/events/${fields.slug}`);
  redirect("/admin");
}

export async function deleteEventAction(formData: FormData): Promise<void> {
  await ensureAuth();
  const id = formData.get("id") as string;
  if (!id) return;
  const [deleted] = await db
    .delete(events)
    .where(eq(events.id, id))
    .returning({ slug: events.slug });

  revalidatePath("/");
  revalidatePath("/events");
  if (deleted?.slug) revalidatePath(`/events/${deleted.slug}`);
  redirect("/admin");
}
