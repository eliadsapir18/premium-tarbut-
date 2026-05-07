# פרימיום תרבות

> הבית לאירועי תרבות ובידור נבחרים

A premium Hebrew RTL ticketing & culture-events website built with Next.js 15, TypeScript and Tailwind CSS.

## Stack

- **Next.js 15** (App Router)
- **TypeScript** (strict)
- **Tailwind CSS 3** with a custom black & gold theme
- **Hebrew RTL** layout (`<html dir="rtl">`)
- **Heebo** + **Cormorant Garamond** Google Fonts
- Mock event data — ready to swap for a real backend / CMS

## Features

- Cinematic hero with separated background image + transparent logo overlay
- Featured events, categories, trust section, final CTA
- Events listing with search + filters (category / city / date window)
- Event details pages (SSG via `generateStaticParams`)
- Personal area mock UI — tickets / orders / details
- Auth pages — login, register, forgot password
- Contact page with form + WhatsApp/email/phone cards
- Floating WhatsApp button (`wa.me/972546503587`)
- Floating accessibility panel — text size, contrast, link emphasis, motion off, reset (persisted to `localStorage`)
- Subtle motion: drifting glow orbs, twinkling stars, sweep, pulse-glow halo (auto-disabled by motion-off toggle)
- Policy stubs — privacy, terms, cancellation, secure-purchase

## Local development

```bash
npm install
npm run dev
```

The app will be available at <http://localhost:3000>.

## Production build

```bash
npm run build
npm run start
```

## Project structure

```
src/
├── app/                    # App Router pages
│   ├── page.tsx            # Homepage
│   ├── events/             # Listing + [id] details
│   ├── login/              # Auth
│   ├── register/
│   ├── forgot-password/
│   ├── account/            # Personal area
│   ├── contact/
│   ├── privacy/ terms/ cancellation/ secure/   # Policy
│   └── globals.css
├── components/             # Header, Hero, EventCard, CategoryCard, Footer …
├── data/events.ts          # Mock event data
└── lib/types.ts            # Shared types
```

## Replacing mock data

Swap `src/data/events.ts` with a fetch from your CMS / DB. Keep the same `CultureEvent` and `Category` shape (see `src/lib/types.ts`).

## License

Proprietary — © Premium Tarbut.
