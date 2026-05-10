"use server";

import { redirect } from "next/navigation";
import { setAdminCookie, verifyPassword } from "@/lib/admin-auth";

export async function loginAction(_prev: unknown, formData: FormData) {
  const password = (formData.get("password") as string | null)?.trim() ?? "";
  if (!password) return { error: "יש להזין סיסמה" };
  if (!verifyPassword(password)) {
    return { error: "סיסמה שגויה" };
  }
  await setAdminCookie();
  redirect("/manage-pt");
}
