import type { Metadata } from "next";
import { Heebo, Cormorant_Garamond } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import WhatsAppButton from "@/components/WhatsAppButton";
import AccessibilityButton from "@/components/AccessibilityButton";

const heebo = Heebo({
  subsets: ["hebrew", "latin"],
  weight: ["300", "400", "500", "600", "700", "800"],
  variable: "--font-heebo",
  display: "swap",
});

const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-cormorant",
  display: "swap",
});

export const metadata: Metadata = {
  title: "פרימיום תרבות — הבית לאירועי תרבות ובידור נבחרים",
  description:
    "פרימיום תרבות — מועדון ה-VIP של אירועי התרבות בישראל. הופעות, הצגות, סטנדאפ, מופעי ילדים, הרצאות ופסטיבלים. רכישת כרטיסים מאובטחת בחוויית הזמנה פרימיום.",
  keywords: [
    "כרטיסים",
    "אירועים",
    "הופעות",
    "תיאטרון",
    "סטנדאפ",
    "פסטיבלים",
    "פרימיום תרבות",
  ],
  openGraph: {
    title: "פרימיום תרבות",
    description: "הבית לאירועי תרבות ובידור נבחרים",
    locale: "he_IL",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="he" dir="rtl" className={`${heebo.variable} ${cormorant.variable}`}>
      <body className="min-h-screen bg-ink-900 font-sans antialiased selection:bg-gold-400/30 selection:text-gold-100">
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:right-4 focus:top-4 focus:z-[100] focus:rounded-full focus:bg-gold-400 focus:px-4 focus:py-2 focus:text-ink-900"
        >
          דלג לתוכן הראשי
        </a>
        <Header />
        <main id="main" className="relative">
          {children}
        </main>
        <Footer />
        <WhatsAppButton />
        <AccessibilityButton />
      </body>
    </html>
  );
}
