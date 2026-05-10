import {
  pgTable,
  text,
  integer,
  boolean,
  timestamp,
  jsonb,
  uuid,
  index,
} from "drizzle-orm/pg-core";
import type { TicketTier, EventCategory } from "@/lib/types";

export const users = pgTable(
  "users",
  {
    id: uuid("id").primaryKey().defaultRandom(),
    email: text("email").notNull().unique(),
    name: text("name").notNull(),
    phone: text("phone").notNull(),
    passwordHash: text("password_hash").notNull(),
    createdAt: timestamp("created_at", { withTimezone: true })
      .notNull()
      .defaultNow(),
  },
  (t) => [index("users_email_idx").on(t.email)],
);

export type UserRow = typeof users.$inferSelect;
export type UserInsert = typeof users.$inferInsert;

export const sessions = pgTable("sessions", {
  id: text("id").primaryKey(),
  userId: uuid("user_id")
    .notNull()
    .references(() => users.id, { onDelete: "cascade" }),
  expiresAt: timestamp("expires_at", { withTimezone: true }).notNull(),
  createdAt: timestamp("created_at", { withTimezone: true })
    .notNull()
    .defaultNow(),
});

export type SessionRow = typeof sessions.$inferSelect;

export const orderStatuses = ["pending", "confirmed", "cancelled"] as const;
export type OrderStatus = (typeof orderStatuses)[number];

export const orders = pgTable(
  "orders",
  {
    id: uuid("id").primaryKey().defaultRandom(),
    userId: uuid("user_id")
      .notNull()
      .references(() => users.id, { onDelete: "cascade" }),
    eventId: text("event_id").notNull(),
    eventTitleSnapshot: text("event_title_snapshot").notNull(),
    ticketTierName: text("ticket_tier_name").notNull(),
    ticketPriceSnapshot: integer("ticket_price_snapshot").notNull(),
    quantity: integer("quantity").notNull(),
    notes: text("notes"),
    status: text("status").$type<OrderStatus>().notNull().default("pending"),
    createdAt: timestamp("created_at", { withTimezone: true })
      .notNull()
      .defaultNow(),
  },
  (t) => [
    index("orders_user_idx").on(t.userId),
    index("orders_event_idx").on(t.eventId),
  ],
);

export type OrderRow = typeof orders.$inferSelect;
export type OrderInsert = typeof orders.$inferInsert;

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
