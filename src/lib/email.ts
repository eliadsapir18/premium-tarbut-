import "server-only";
import { Resend } from "resend";

/**
 * Email layer (Resend).
 *
 * Designed to NEVER throw and NEVER block an order: if RESEND_API_KEY is
 * missing or Resend fails, every function logs a warning and resolves
 * `false`. Callers can fire-and-forget safely.
 *
 * Required env to actually send:
 *  - RESEND_API_KEY    Resend API key
 *  - EMAIL_FROM        verified sender, e.g. 'פרימיום תרבות <orders@your-domain>'
 *                      (defaults to onboarding@resend.dev — Resend's sandbox
 *                       sender, which only delivers to the account owner)
 *  - ADMIN_NOTIFY_EMAIL  where new-order alerts go
 * Optional:
 *  - NEXT_PUBLIC_SITE_URL  links in emails (defaults to the Vercel URL)
 */

const RESEND_API_KEY = process.env.RESEND_API_KEY;
const EMAIL_FROM =
  process.env.EMAIL_FROM || "פרימיום תרבות <onboarding@resend.dev>";
const ADMIN_NOTIFY_EMAIL = process.env.ADMIN_NOTIFY_EMAIL;
const SITE_URL = (
  process.env.NEXT_PUBLIC_SITE_URL || "https://premium-tarbut.vercel.app"
).replace(/\/$/, "");

const resend = RESEND_API_KEY ? new Resend(RESEND_API_KEY) : null;

const BRAND = "פרימיום תרבות";
const SLOGAN = "הבית לאירועי תרבות ובידור נבחרים";

interface SendArgs {
  to: string;
  subject: string;
  html: string;
}

async function safeSend({ to, subject, html }: SendArgs): Promise<boolean> {
  if (!resend) {
    console.warn(
      `[email] RESEND_API_KEY missing — skipped "${subject}" → ${to}`,
    );
    return false;
  }
  try {
    const { error } = await resend.emails.send({
      from: EMAIL_FROM,
      to,
      subject,
      html,
    });
    if (error) {
      console.error(`[email] Resend rejected "${subject}" → ${to}:`, error);
      return false;
    }
    return true;
  } catch (err) {
    console.error(`[email] send failed "${subject}" → ${to}:`, err);
    return false;
  }
}

/* ---------- branded HTML shell ---------- */

const C = {
  bg: "#0a0a0b",
  card: "#141416",
  border: "#3a2f17",
  gold: "#d4af37",
  goldSoft: "#e6c878",
  text: "#e8e6e0",
  muted: "#9a9690",
};

function shell(heading: string, bodyHtml: string): string {
  return `<!DOCTYPE html>
<html lang="he" dir="rtl">
<body style="margin:0;padding:0;background:${C.bg};font-family:'Heebo',Arial,Helvetica,sans-serif;color:${C.text};">
  <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:${C.bg};padding:32px 16px;">
    <tr><td align="center">
      <table role="presentation" width="560" cellpadding="0" cellspacing="0" style="max-width:560px;width:100%;">
        <tr><td align="center" style="padding-bottom:24px;">
          <div style="font-family:Georgia,'Times New Roman',serif;font-size:26px;letter-spacing:1px;color:${C.gold};font-weight:bold;">${BRAND}</div>
          <div style="font-size:12px;color:${C.muted};margin-top:6px;">${SLOGAN}</div>
        </td></tr>
        <tr><td style="background:${C.card};border:1px solid ${C.border};border-radius:16px;padding:32px;">
          <h1 style="margin:0 0 20px;font-family:Georgia,'Times New Roman',serif;font-size:22px;color:${C.goldSoft};font-weight:bold;">${heading}</h1>
          ${bodyHtml}
        </td></tr>
        <tr><td align="center" style="padding-top:24px;">
          <a href="${SITE_URL}" style="color:${C.gold};text-decoration:none;font-size:13px;">premium-tarbut.vercel.app</a>
          <div style="font-size:11px;color:${C.muted};margin-top:10px;line-height:1.6;">
            וואטסאפ / טלפון: <a href="https://wa.me/972546503587" style="color:${C.muted};">054-650-3587</a><br/>
            מייל זה נשלח אוטומטית — נא לא להשיב אליו ישירות.
          </div>
        </td></tr>
      </table>
    </td></tr>
  </table>
</body>
</html>`;
}

function row(label: string, value: string): string {
  return `<tr>
    <td style="padding:8px 0;font-size:13px;color:${C.muted};white-space:nowrap;vertical-align:top;">${label}</td>
    <td style="padding:8px 0 8px 0;font-size:14px;color:${C.text};font-weight:600;">${value}</td>
  </tr>`;
}

function detailsTable(rows: string): string {
  return `<table role="presentation" width="100%" cellpadding="0" cellspacing="0"
    style="border-top:1px solid ${C.border};border-bottom:1px solid ${C.border};margin:8px 0 20px;">
    ${rows}</table>`;
}

function p(text: string): string {
  return `<p style="margin:0 0 14px;font-size:14px;line-height:1.7;color:${C.text};">${text}</p>`;
}

function esc(s: string): string {
  return String(s)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");
}

/* ---------- order payload ---------- */

export interface OrderEmailData {
  customerName: string;
  customerEmail: string;
  customerPhone: string;
  eventTitle: string;
  eventId: string;
  tierName: string;
  unitPrice: number;
  quantity: number;
  notes?: string | null;
}

function orderRows(d: OrderEmailData, withCustomer: boolean): string {
  const total = d.unitPrice * d.quantity;
  return [
    row("אירוע", esc(d.eventTitle)),
    row("סוג כרטיס", esc(d.tierName)),
    row(
      "כמות",
      `${d.quantity} × ₪${d.unitPrice} = <span style="color:${C.goldSoft};">₪${total}</span>`,
    ),
    d.notes ? row("הערה", esc(d.notes)) : "",
    withCustomer ? row("שם הלקוח", esc(d.customerName)) : "",
    withCustomer
      ? row(
          "אימייל",
          `<a href="mailto:${esc(d.customerEmail)}" style="color:${C.gold};">${esc(d.customerEmail)}</a>`,
        )
      : "",
    withCustomer
      ? row(
          "טלפון",
          `<a href="tel:${esc(d.customerPhone)}" style="color:${C.gold};" dir="ltr">${esc(d.customerPhone)}</a>`,
        )
      : "",
  ].join("");
}

/* ---------- public senders ---------- */

/** Alert to the business: a new order request just came in. */
export async function sendNewOrderAdminEmail(
  d: OrderEmailData,
): Promise<boolean> {
  if (!ADMIN_NOTIFY_EMAIL) {
    console.warn("[email] ADMIN_NOTIFY_EMAIL missing — admin alert skipped");
    return false;
  }
  const body =
    p("התקבלה בקשת הזמנה חדשה באתר. הפרטים:") +
    detailsTable(orderRows(d, true)) +
    p(
      `לניהול ההזמנה: <a href="${SITE_URL}/manage-pt/orders" style="color:${C.gold};">פאנל ההזמנות</a>`,
    );
  return safeSend({
    to: ADMIN_NOTIFY_EMAIL,
    subject: `הזמנה חדשה · ${d.eventTitle} · ${d.customerName}`,
    html: shell("הזמנה חדשה התקבלה", body),
  });
}

/** Confirmation to the customer: we received your request. */
export async function sendOrderReceivedCustomerEmail(
  d: OrderEmailData,
): Promise<boolean> {
  const body =
    p(`שלום ${esc(d.customerName.split(" ")[0])},`) +
    p(
      "קיבלנו את בקשת ההזמנה שלך. הנציג שלנו ייצור איתך קשר בהקדם לתיאום ולהשלמת הרכישה.",
    ) +
    detailsTable(orderRows(d, false)) +
    p(
      `אפשר לעקוב אחרי סטטוס ההזמנה ב<a href="${SITE_URL}/account" style="color:${C.gold};">אזור האישי</a>.`,
    );
  return safeSend({
    to: d.customerEmail,
    subject: `קיבלנו את בקשתך · ${d.eventTitle}`,
    html: shell("בקשת ההזמנה התקבלה", body),
  });
}

/** Update to the customer when an admin confirms or cancels. */
export async function sendOrderStatusCustomerEmail(
  d: OrderEmailData,
  status: "confirmed" | "cancelled",
): Promise<boolean> {
  const isConfirmed = status === "confirmed";
  const heading = isConfirmed ? "ההזמנה שלך אושרה" : "עדכון לגבי ההזמנה שלך";
  const lead = isConfirmed
    ? "ההזמנה שלך אושרה. ניצור איתך קשר לתיאום אופן קבלת הכרטיסים והתשלום."
    : "לצערנו ההזמנה שלך בוטלה. נשמח לעמוד לרשותך לכל שאלה או לעזרה במציאת אירוע חלופי.";
  const body =
    p(`שלום ${esc(d.customerName.split(" ")[0])},`) +
    p(lead) +
    detailsTable(orderRows(d, false)) +
    p(
      `לכל שאלה אפשר לפנות אלינו ב<a href="https://wa.me/972546503587" style="color:${C.gold};">וואטסאפ</a> או בטלפון 054-650-3587.`,
    );
  return safeSend({
    to: d.customerEmail,
    subject: isConfirmed
      ? `ההזמנה אושרה · ${d.eventTitle}`
      : `עדכון הזמנה · ${d.eventTitle}`,
    html: shell(heading, body),
  });
}
