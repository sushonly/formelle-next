# Formelle — Next.js Website

Premium workwear brand website for Formelle, rebuilt from static HTML to Next.js + TypeScript.

## Stack
- Next.js (App Router) + TypeScript
- Supabase (products, testimonials, waitlist, restock requests)
- Vercel (hosting)

## Structure
- `app/page.tsx` — homepage
- `app/about/page.tsx` — founder story page
- `app/product/[slug]/page.tsx` — individual product pages (server-rendered for SEO)
- `components/` — Nav, ProductCard, ProductDetail, TestimonialsCarousel, UpcomingSection
- `lib/supabase.ts` — Supabase client
- `lib/types.ts` — TypeScript types

## Development
```bash
npm install
npm run dev
```

## Deployment
Connected to Vercel — pushes to `main` auto-deploy.
