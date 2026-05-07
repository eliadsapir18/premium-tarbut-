# פרימיום תרבות — מידע פרויקט

> סיכום מצב הפרויקט נכון ל-2026-05-08

## 🔗 קישורים חשובים

| מה | URL |
|---|---|
| 🌐 אתר חי (production) | https://premium-tarbut.vercel.app |
| 📦 קוד מקור (GitHub) | https://github.com/eliadsapir18/premium-tarbut- |
| ⚙️ דשבורד Vercel | https://vercel.com/eliadsapir18s-projects/premium-tarbut |
| 🛠️ הגדרות דומיין | https://vercel.com/eliadsapir18s-projects/premium-tarbut/settings/domains |
| 🔑 ניהול GitHub Tokens | https://github.com/settings/tokens |

## 📁 מיקום מקומי

```
/Users/prodby.eliadsapir/Desktop/פרימיום תרבות/website/
```

## 🚀 התחלה מהירה

```bash
cd "/Users/prodby.eliadsapir/Desktop/פרימיום תרבות/website"
npm run dev
# פתח: http://localhost:3000
```

## 🔁 זרימת עבודה (auto-deploy)

```
שינוי קוד → git commit → git push → GitHub
                                       ↓
                                    Vercel מזהה אוטומטית
                                       ↓
                                  Build + Deploy (~50s)
                                       ↓
                       https://premium-tarbut.vercel.app מתעדכן
```

אין צורך בשום פעולה ידנית. כל push ל-`main` מתפרסם אוטומטית.

## 🧱 Stack

- **Next.js 15.5.18** (App Router, mostly SSG)
- **TypeScript** strict
- **Tailwind CSS 3** עם תמת black & gold מותאמת
- **Hebrew RTL** מלא (`<html dir="rtl">`)
- Heebo + Cormorant Garamond (Google Fonts)
- ללא DB, ללא auth — mock data ב-`src/data/events.ts`

## ✅ מה כבר נבנה (MVP)

- דף בית עם hero קולנועי (תמונת רקע + לוגו שקוף שכבתי), 2 אירועים נבחרים, קטגוריות, trust section, CTA
- `/events` רשימה עם חיפוש + סינון קטגוריה / עיר / תאריך
- `/events/[slug]` פרטי אירוע + sidebar רכישה (SSG עם generateStaticParams)
- אזור אישי `/account` — 3 טאבים: כרטיסים, הזמנות, פרטים אישיים
- `/login` `/register` `/forgot-password` — UI בלבד, ללא auth אמיתי
- `/contact` — טופס + ערוצי קשר (וואטסאפ, טלפון, אימייל)
- `/privacy`, `/terms`, `/cancellation`, `/secure` — דפי מדיניות
- כפתורי וואטסאפ ונגישות צפים
- אנימציות עדינות (drift orbs, twinkles, sweep, halo)
- שני אירועים נבחרים בולטים: אלייצור (יום ירושלים) + מתן חסן (אמפי קיסריה)

## 📋 רעיונות לעתיד

- חיבור אימות אמיתי (Stack/Clerk)
- DB אמיתי (Postgres על Vercel/Neon) להחלפת `src/data/events.ts`
- סליקה (Tranzila / PayPlus / Stripe)
- פאנל אדמין לניהול אירועים
- שליחת PDF של כרטיסים במייל
- חיבור דומיין מותאם (`premium-tarbut.co.il` או similar)
- SEO: sitemap.xml, robots.txt, OG images דינמיים

## 📞 פרטים עסקיים

- **וואטסאפ / טלפון:** 054-650-3587
- **WhatsApp link:** https://wa.me/972546503587
- **אימייל:** info@premium-tarbut.co.il (placeholder — לא מוגדר עדיין)

## 🗂️ מבנה ספריות

```
src/
├── app/                    # App Router pages
│   ├── page.tsx            # דף בית
│   ├── events/             # רשימה + [id] פרטים
│   ├── login/ register/ forgot-password/
│   ├── account/            # אזור אישי
│   ├── contact/
│   ├── privacy/ terms/ cancellation/ secure/
│   └── globals.css
├── components/             # Header, Hero, EventCard, CategoryCard, Footer …
├── data/events.ts          # 14 אירועים מדומים
└── lib/types.ts            # Shared TypeScript types
public/
├── logo.png                # לוגו ישן (לא בשימוש כרגע)
└── images/
    ├── hero-bg.png             # רקע מסך הפתיחה
    ├── premium-tarbut-logo.png # לוגו שקוף (5:1 banner)
    └── events/
        ├── elaytzur.jpg        # תמונת אלייצור
        └── matan-hasan.jpg     # תמונת מתן חסן
```

## 🛠️ פקודות שימושיות

```bash
# פיתוח מקומי
npm run dev

# בדיקת build לפני deploy
npm run build && npm run start

# deploy ידני (אם רוצים)
npx vercel --prod

# לראות logs מהאתר החי
npx vercel logs https://premium-tarbut.vercel.app

# למשוך environment variables (אם נוסיף)
npx vercel env pull
```
