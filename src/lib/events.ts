import "server-only";
import { eq } from "drizzle-orm";
import { db } from "@/db";
import { events } from "@/db/schema";
import type { CultureEvent } from "@/lib/types";
import type { EventRow } from "@/db/schema";

function rowToEvent(row: EventRow): CultureEvent {
  return {
    id: row.id,
    slug: row.slug,
    title: row.title,
    artist: row.artist ?? undefined,
    category: row.category,
    categoryLabel: row.categoryLabel,
    date: row.date.toISOString(),
    dateLabel: row.dateLabel,
    specialLabel: row.specialLabel ?? undefined,
    timeLabel: row.timeLabel,
    venue: row.venue,
    city: row.city,
    description: row.description,
    longDescription: row.longDescription,
    image: row.image,
    imagePosition: row.imagePosition ?? undefined,
    priceFrom: row.priceFrom,
    featured: row.featured,
    tickets: row.tickets,
  };
}

export async function getAllEvents(): Promise<CultureEvent[]> {
  const rows = await db.select().from(events).orderBy(events.date);
  return rows.map(rowToEvent);
}

export async function getFeaturedEvents(): Promise<CultureEvent[]> {
  const rows = await db
    .select()
    .from(events)
    .where(eq(events.featured, true))
    .orderBy(events.date);
  return rows.map(rowToEvent);
}

export async function getEventBySlug(
  slug: string,
): Promise<CultureEvent | null> {
  const rows = await db
    .select()
    .from(events)
    .where(eq(events.slug, slug))
    .limit(1);
  return rows[0] ? rowToEvent(rows[0]) : null;
}

export async function getEventById(id: string): Promise<CultureEvent | null> {
  const rows = await db
    .select()
    .from(events)
    .where(eq(events.id, id))
    .limit(1);
  return rows[0] ? rowToEvent(rows[0]) : null;
}

export async function getRelatedEvents(
  category: string,
  excludeId: string,
  limit = 3,
): Promise<CultureEvent[]> {
  const rows = await db
    .select()
    .from(events)
    .where(eq(events.category, category as EventRow["category"]))
    .orderBy(events.date);
  return rows
    .filter((r) => r.id !== excludeId)
    .slice(0, limit)
    .map(rowToEvent);
}
