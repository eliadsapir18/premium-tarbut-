"use server";

import { redirect } from "next/navigation";
import { db } from "@/db";
import { users } from "@/db/schema";
import {
  createSession,
  destroyCurrentSession,
  findUserByEmail,
  hashPassword,
  verifyPasswordHash,
} from "@/lib/user-auth";

interface ActionState {
  error?: string;
}

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const PHONE_RE = /^[0-9+\-\s()]{7,20}$/;

function safeNext(next: unknown, fallback: string): string {
  if (typeof next !== "string") return fallback;
  if (!next.startsWith("/")) return fallback;
  if (next.startsWith("//")) return fallback;
  return next;
}

export async function registerAction(
  _prev: ActionState,
  formData: FormData,
): Promise<ActionState> {
  const firstName = (formData.get("firstName") as string)?.trim() ?? "";
  const lastName = (formData.get("lastName") as string)?.trim() ?? "";
  const email = (formData.get("email") as string)?.trim().toLowerCase() ?? "";
  const phone = (formData.get("phone") as string)?.trim() ?? "";
  const password = (formData.get("password") as string) ?? "";
  const next = safeNext(formData.get("next"), "/account");

  if (!firstName || !lastName) return { error: "יש להזין שם פרטי ושם משפחה" };
  if (!EMAIL_RE.test(email)) return { error: "אימייל לא תקין" };
  if (!PHONE_RE.test(phone)) return { error: "מספר טלפון לא תקין" };
  if (password.length < 8) return { error: "סיסמה חייבת להיות 8 תווים לפחות" };

  const existing = await findUserByEmail(email);
  if (existing) {
    return { error: "כבר קיים חשבון עם האימייל הזה — נסו להתחבר" };
  }

  const passwordHash = await hashPassword(password);
  const [created] = await db
    .insert(users)
    .values({
      email,
      name: `${firstName} ${lastName}`.trim(),
      phone,
      passwordHash,
    })
    .returning({ id: users.id });

  if (created) await createSession(created.id);
  redirect(next);
}

export async function loginAction(
  _prev: ActionState,
  formData: FormData,
): Promise<ActionState> {
  const email = (formData.get("email") as string)?.trim().toLowerCase() ?? "";
  const password = (formData.get("password") as string) ?? "";
  const next = safeNext(formData.get("next"), "/account");

  if (!email || !password) return { error: "יש להזין אימייל וסיסמה" };

  const user = await findUserByEmail(email);
  if (!user) return { error: "אימייל או סיסמה שגויים" };

  const valid = await verifyPasswordHash(password, user.passwordHash);
  if (!valid) return { error: "אימייל או סיסמה שגויים" };

  await createSession(user.id);
  redirect(next);
}

export async function logoutAction() {
  await destroyCurrentSession();
  redirect("/");
}
