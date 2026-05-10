import "server-only";
import crypto from "crypto";
import bcrypt from "bcryptjs";
import { cookies } from "next/headers";
import { eq, and, gt } from "drizzle-orm";
import { db } from "@/db";
import { users, sessions, type UserRow } from "@/db/schema";

const COOKIE_NAME = "pt-user";
const SESSION_DAYS = 30;

export async function hashPassword(plain: string): Promise<string> {
  return bcrypt.hash(plain, 10);
}

export async function verifyPasswordHash(
  plain: string,
  hash: string,
): Promise<boolean> {
  return bcrypt.compare(plain, hash);
}

function generateSessionId(): string {
  return crypto.randomBytes(32).toString("hex");
}

export async function createSession(userId: string): Promise<void> {
  const id = generateSessionId();
  const expiresAt = new Date(Date.now() + SESSION_DAYS * 24 * 60 * 60 * 1000);
  await db.insert(sessions).values({ id, userId, expiresAt });
  const cookieStore = await cookies();
  cookieStore.set(COOKIE_NAME, id, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    expires: expiresAt,
  });
}

export async function destroyCurrentSession(): Promise<void> {
  const cookieStore = await cookies();
  const sessionId = cookieStore.get(COOKIE_NAME)?.value;
  if (sessionId) {
    await db.delete(sessions).where(eq(sessions.id, sessionId));
    cookieStore.delete(COOKIE_NAME);
  }
}

export async function getCurrentUser(): Promise<UserRow | null> {
  const cookieStore = await cookies();
  const sessionId = cookieStore.get(COOKIE_NAME)?.value;
  if (!sessionId) return null;

  const rows = await db
    .select({
      user: users,
      session: sessions,
    })
    .from(sessions)
    .innerJoin(users, eq(sessions.userId, users.id))
    .where(and(eq(sessions.id, sessionId), gt(sessions.expiresAt, new Date())))
    .limit(1);

  return rows[0]?.user ?? null;
}

export async function findUserByEmail(email: string): Promise<UserRow | null> {
  const rows = await db
    .select()
    .from(users)
    .where(eq(users.email, email.toLowerCase()))
    .limit(1);
  return rows[0] ?? null;
}
