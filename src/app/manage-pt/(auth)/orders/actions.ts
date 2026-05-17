"use server";

import { revalidatePath } from "next/cache";
import { eq } from "drizzle-orm";
import { db } from "@/db";
import { orders, users, type OrderStatus } from "@/db/schema";
import { isAdminAuthed } from "@/lib/admin-auth";
import { sendOrderStatusCustomerEmail } from "@/lib/email";

export async function updateOrderStatusAction(formData: FormData) {
  if (!(await isAdminAuthed())) throw new Error("Unauthorized");
  const id = formData.get("id") as string;
  const status = formData.get("status") as OrderStatus;
  if (!id || !["pending", "confirmed", "cancelled"].includes(status)) return;

  await db.update(orders).set({ status }).where(eq(orders.id, id));
  revalidatePath("/manage-pt/orders");
  revalidatePath("/account");

  // Notify the customer only on a decisive status (not "pending").
  if (status === "confirmed" || status === "cancelled") {
    const [r] = await db
      .select({
        eventId: orders.eventId,
        eventTitle: orders.eventTitleSnapshot,
        tierName: orders.ticketTierName,
        unitPrice: orders.ticketPriceSnapshot,
        quantity: orders.quantity,
        notes: orders.notes,
        customerName: users.name,
        customerEmail: users.email,
        customerPhone: users.phone,
      })
      .from(orders)
      .innerJoin(users, eq(orders.userId, users.id))
      .where(eq(orders.id, id))
      .limit(1);

    if (r) {
      // never throws — safe to await before the action returns
      await sendOrderStatusCustomerEmail(r, status);
    }
  }
}
