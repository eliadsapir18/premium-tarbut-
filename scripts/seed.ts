import { neon } from "@neondatabase/serverless";
import { drizzle } from "drizzle-orm/neon-http";
import { events } from "../src/db/schema";
import { EVENTS } from "../src/data/events";

if (!process.env.DATABASE_URL) {
  throw new Error("DATABASE_URL is not set");
}

const sql = neon(process.env.DATABASE_URL);
const db = drizzle(sql);

async function run() {
  console.log(`Seeding ${EVENTS.length} events...`);

  await db.delete(events);

  await db.insert(events).values(
    EVENTS.map((e) => ({
      id: e.id,
      slug: e.slug,
      title: e.title,
      artist: e.artist ?? null,
      category: e.category,
      categoryLabel: e.categoryLabel,
      date: new Date(e.date),
      dateLabel: e.dateLabel,
      specialLabel: e.specialLabel ?? null,
      timeLabel: e.timeLabel,
      venue: e.venue,
      city: e.city,
      description: e.description,
      longDescription: e.longDescription,
      image: e.image,
      imagePosition: e.imagePosition ?? null,
      priceFrom: e.priceFrom,
      featured: e.featured ?? false,
      tickets: e.tickets,
    })),
  );

  console.log("Seed complete.");
}

run().catch((err) => {
  console.error(err);
  process.exit(1);
});
