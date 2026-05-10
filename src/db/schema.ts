import {
  pgTable,
  text,
  integer,
  boolean,
  timestamp,
  jsonb,
} from "drizzle-orm/pg-core";
import type { TicketTier, EventCategory } from "@/lib/types";

export const events = pgTable("events", {
  id: text("id").primaryKey(),
  slug: text("slug").notNull().unique(),
  title: text("title").notNull(),
  artist: text("artist"),
  category: text("category").$type<EventCategory>().notNull(),
  categoryLabel: text("category_label").notNull(),
  date: timestamp("date", { withTimezone: true }).notNull(),
  dateLabel: text("date_label").notNull(),
  specialLabel: text("special_label"),
  timeLabel: text("time_label").notNull(),
  venue: text("venue").notNull(),
  city: text("city").notNull(),
  description: text("description").notNull(),
  longDescription: text("long_description").notNull(),
  image: text("image").notNull(),
  imagePosition: text("image_position"),
  priceFrom: integer("price_from").notNull(),
  featured: boolean("featured").notNull().default(false),
  tickets: jsonb("tickets").$type<TicketTier[]>().notNull(),
});

export type EventRow = typeof events.$inferSelect;
export type EventInsert = typeof events.$inferInsert;
