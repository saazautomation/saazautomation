# SAAZ Automation — Next.js Website

Agency marketing site for **SAAZ Automation**, converted from a single HTML file into a **Next.js 15 + TypeScript** project with the App Router.

## Stack

- Next.js 15 (App Router)
- React 19
- TypeScript
- CSS (global styles, no Tailwind)

## Features preserved from original

- Custom cursor (desktop)
- Preloader animation
- Sticky navigation with dropdowns
- Hero particle canvas
- Marquee, stats counter, scroll reveals
- Service card 3D tilt
- Booking modal (mailto fallback)
- Full responsive layout

## Getting started

```bash
cd saaz-automation
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Project structure

```
app/              Layout, page, global CSS
components/       UI sections + client interactivity
context/          Booking modal state
hooks/            Scroll reveal, smooth anchors
lib/data.tsx      Site content (nav, services, reviews, etc.)
```

## Production notes

- Replace the booking form `mailto:` handler with Formspree, Resend, or your API route.
- Add real social URLs in `Footer.tsx`.
- Optional: mobile nav menu (hamburger is styled but not wired yet).

## Build

```bash
npm run build
npm start
```
