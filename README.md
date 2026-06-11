# AI Money Mentor — Charlotte

A free, AI-powered financial education app for people earning $0–$62K/year. Charlotte is your warm, judgment-free AI money guide.

**Live demo:** [ai-money-mentor-v2.vercel.app](https://ai-money-mentor-v2.vercel.app)

---

## Features

- **Charlotte AI Chat** — powered by Claude (Anthropic), Charlotte asks leading questions and gives personalized financial guidance in plain language
- **13 Sections** across two nav groups:
  - **Dashboard:** Home, Budget Builder, Ask Charlotte, Learn & Earn XP, Progress, Savings Goals, My Links
  - **Life Goals:** Buying a Home, Credit & Debt, Investments, Retirement, 529 College Savings, Personal Taxes, Business Taxes, Estate Planning
- **Gamified Curriculum** — 6 levels from Budget Rookie → Financial Elite with XP points and quizzes
- **Savings Goals Tracker** — set targets, log deposits, add deadlines to Google Calendar or Apple Calendar
- **Auth (Supabase)** — sign in to persist goals and progress across devices; app is fully usable without an account

## Tech Stack

| Layer | Choice |
|-------|--------|
| Framework | Next.js 14 (App Router) |
| Language | TypeScript |
| Styling | Inline CSS-in-JS (no Tailwind) |
| AI | `@anthropic-ai/sdk` — `claude-haiku-4-5-20251001` |
| Auth + DB | Supabase (auth, goals, links, progress tables) |
| Hosting | Vercel |

## Getting Started

### 1. Clone & install

```bash
git clone https://github.com/PMAIGURU2026/ai-money-mentor-v2.git
cd ai-money-mentor-v2
npm install
```

### 2. Set environment variables

```bash
cp .env.local.example .env.local
```

Edit `.env.local` and fill in:

```env
ANTHROPIC_API_KEY=sk-ant-...          # from console.anthropic.com
NEXT_PUBLIC_SUPABASE_URL=https://...  # from Supabase project settings
NEXT_PUBLIC_SUPABASE_ANON_KEY=...     # from Supabase project settings
```

### 3. Run locally

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000)

## Deploy to Vercel

```bash
vercel login
vercel --prod
```

Then add env vars via Vercel dashboard → Project → Settings → Environment Variables, or:

```bash
vercel env add ANTHROPIC_API_KEY production
vercel env add NEXT_PUBLIC_SUPABASE_URL production
vercel env add NEXT_PUBLIC_SUPABASE_ANON_KEY production
```

## Database (Supabase)

The schema is in `supabase-schema.sql`. Run it in your Supabase SQL editor to create the `goals`, `links`, and `progress` tables with Row Level Security enabled.

## Project Structure

```
ai-money-mentor-v2/
├── app/
│   ├── api/
│   │   ├── chat/route.ts        # Charlotte AI proxy (Anthropic)
│   │   ├── goals/route.ts       # CRUD for savings goals
│   │   ├── links/route.ts       # CRUD for saved links
│   │   └── progress/route.ts    # XP + streak tracking
│   ├── auth/callback/route.ts   # Supabase magic link callback
│   ├── layout.tsx
│   └── page.tsx
├── components/
│   ├── AIMoneyMentor.tsx        # Main app shell + all tabs (~1000 lines)
│   ├── AuthModal.tsx            # Sign in / sign up / magic link
│   ├── GoalsSection.tsx         # Savings goals tracker
│   └── LinksSection.tsx         # Link saver
├── lib/
│   ├── supabase-client.ts       # Browser Supabase client
│   └── supabase-server.ts       # Server Supabase client
├── middleware.ts                 # Supabase session refresh
├── public/
│   └── aimm-logo-v2.png        # App logo
└── supabase-schema.sql          # DB schema with RLS
```

## Pursuit Program — Portfolio Note

This app was built as part of the **Pursuit L2 program** (2025–2026). It represents:
- Full-stack Next.js with App Router and TypeScript
- Secure AI API integration (server-side, key never exposed to client)
- Supabase auth + database with Row Level Security
- Responsive mobile-first design (no UI library)
- Deployment and CI/CD via Vercel

---

> **Disclaimer:** Charlotte is an AI financial education guide only — not a licensed financial advisor, CPA, or attorney. Always consult a qualified professional for major financial, tax, or legal decisions.
