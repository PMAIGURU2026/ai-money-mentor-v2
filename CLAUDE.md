# CLAUDE.md — AI Money Mentor V2

## Project overview

Next.js 14 financial education app. Charlotte is the AI guide powered by Anthropic. No Tailwind — all styling is inline CSS-in-JS. App Router only.

## Commands

```bash
npm run dev      # local dev server → localhost:3000
npm run build    # production build (must pass before deploying)
npm run lint     # ESLint
vercel --prod    # deploy to production
```

## Architecture decisions

- **`ssr: false` on the main page** — `AIMoneyMentor` creates a Supabase browser client on mount; disabling SSR prevents the "URL and API key required" error at build time.
- **Charlotte lives in `app/api/chat/route.ts`** — the Anthropic API key never touches the client. The system prompt (CHARLOTTE_SYSTEM) is ~150 lines; keep it there.
- **No Tailwind** — all styles are inline React `style` props using the `C` color token object at the top of `AIMoneyMentor.tsx`. Add new colors there, not scattered throughout.
- **Single large component file** — `AIMoneyMentor.tsx` is intentionally ~1000 lines. Do not split it unless it causes a measurable performance issue.

## Environment variables

| Variable | Where | Purpose |
|---|---|---|
| `ANTHROPIC_API_KEY` | Server only | Charlotte AI |
| `NEXT_PUBLIC_SUPABASE_URL` | Client + Server | Supabase project URL |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Client + Server | Supabase public anon key |
| `ALPHA_VANTAGE_API_KEY` | Server only | Live stock/ETF quotes (Investments section) |

Never put `ANTHROPIC_API_KEY` or `ALPHA_VANTAGE_API_KEY` in a `NEXT_PUBLIC_` variable — they would be exposed to the browser.

All of these live in `.env.local` for local dev (already in `.gitignore` — never committed). For Vercel production, set them in Project → Settings → Environment Variables in the Vercel dashboard.

## Key files to know

- `components/AIMoneyMentor.tsx` — entire app UI, nav, all tabs, quiz bank, curriculum
- `components/CharlotteAvatar.tsx` — animated Charlotte avatar (floating, orbiting coin, celebrate/think states)
- `components/Logo.tsx` — inline SVG logo, dark/light adaptive
- `app/api/chat/route.ts` — Charlotte system prompt + Anthropic API call
- `app/api/mortgage/route.ts` — live 30-yr/15-yr rates from FRED (no key needed, 1hr cache)
- `app/api/stocks/route.ts` — live ETF quotes from Alpha Vantage (5-min cache, uses `ALPHA_VANTAGE_API_KEY`)
- `components/GoalsSection.tsx` — savings goals CRUD with calendar export
- `components/LinksSection.tsx` — link saver component
- `supabase-schema.sql` — run this in Supabase SQL editor to set up tables
- `public/charlotte.png` — Charlotte full-body portrait (780×1254)
- `public/charlotte-face.png` — Charlotte face/avatar crop

## Adding a new section

1. Add the `SectionId` to the type union in `AIMoneyMentor.tsx`
2. Add an entry to `NAV_GROUPS`
3. Add a `case` in the `renderSection` switch
4. (Optional) Add a quiz to `QUIZ_BANK` with the same key

## Charlotte's model

Currently using `claude-haiku-4-5-20251001` with `max_tokens: 400`. If responses feel too short, bump to 600. If costs are a concern, stay on Haiku (it's the fastest and cheapest).

## Supabase tables

- `goals` — user savings goals (title, target, current amount, target date)
- `links` — saved financial resource links
- `progress` — XP, streak, completed lessons per user

All tables have Row Level Security (RLS) — users can only read/write their own rows.

## Deployment

Hosted on Vercel. Auto-deploys on push to `main`. Env vars must be set in Vercel dashboard under Project → Settings → Environment Variables.
