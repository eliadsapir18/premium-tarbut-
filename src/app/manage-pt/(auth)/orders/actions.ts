"use server";

import { revalidatePath } from "next/cache";
import { eq } from "drizzle-orm";
import { db } from "@/db";
import { orders, type OrderStatus } from "@/db/schema";
import { isAdminAuthed } from "@/lib/admin-auth";

export async function updateOrderStatusAction(formData: FormData) {
  if (!(await isAdminAuthed())) throw new Error("Unauthorized");
  const id = formData.get("id") as string;
  const status = formData.get("status") as OrderStatus;
  if (!id || !["pending", "confirmed", "cancelled"].includes(status)) return;

  await db.update(orders).set({ status }).where(eq(orders.id, id));
  revalidatePath("/manage-pt/orders");
  revalidatePath("/account");
}
