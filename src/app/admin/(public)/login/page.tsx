import { redirect } from "next/navigation";
import AuthShell from "@/components/AuthShell";
import { isAdminAuthed } from "@/lib/admin-auth";
import LoginForm from "./LoginForm";

export const metadata = {
  title: "כניסה לאדמין — פרימיום תרבות",
};

export default async function AdminLoginPage() {
  if (await isAdminAuthed()) {
    redirect("/admin");
  }

  return (
    <AuthShell
      title="כניסת מנהל"
      subtitle="כניסה לפאנל ניהול האירועים"
      footer={<>גישה מוגבלת — לבעל האתר בלבד</>}
    >
      <LoginForm />
    </AuthShell>
  );
}
