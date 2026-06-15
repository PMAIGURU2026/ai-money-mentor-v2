# AI Money Mentor — Charlotte

**A free, AI-powered financial education app that gives warm, judgment-free money guidance to people earning $0–$62K/year.**

Live demo: [ai-money-mentor-v2.vercel.app](https://ai-money-mentor-v2.vercel.app)

---

## The Problem This Project Solves

Millions of Americans earning under $62K/year cannot afford a financial advisor, don't trust banks, and were never taught personal finance in school. When life hits — a baby, buying a first home, a medical bill, a car breaking down — they have no trusted guide. Traditional financial apps and tools are built for people who already have money. Everyone else gets ignored.

AI Money Mentor exists for those people. It gives anyone with a phone or computer access to the kind of personalized, non-judgmental financial guidance that used to cost hundreds of dollars an hour — for free.

---

## What We Built

**Charlotte** — an AI financial mentor who asks questions first and gives advice second. She never shames past money choices. She speaks at a 7th-grade reading level and always explains the *why* behind every recommendation.

The app includes:

- **AI Chat (Charlotte)** — real-time conversation powered by Anthropic Claude. Charlotte is context-aware: if you're on the Home Buying section, she gives home buying advice. She knows your name and what part of the app you're in.
- **13 Financial Education Sections** organized into two groups:
  - *Dashboard:* Home, Budget Builder, Ask Charlotte, Learn & Earn XP, Progress, Savings Goals, My Links
  - *Life Goals:* Buying a Home, Credit & Debt, Investments, Retirement, 529 College Savings, Personal Taxes, Business Taxes, Estate Planning
- **Gamified Curriculum** — 6 levels (Budget Rookie → Savings Starter → Apprentice Saver → Financial Explorer → Money Master → Financial Elite) with XP points, quizzes, and badges
- **Live Financial Data** — real mortgage rates from the Federal Reserve, live ETF/stock quotes from Alpha Vantage
- **Savings Goals Tracker** — create goals with target amounts, deadlines, and monthly contributions; export deadlines to Google Calendar or Apple Calendar
- **Link Saver** — bookmark financial resources with categories and favorites
- **Secure Auth** — email/password sign-in, magic link (passwordless), and full account creation; all user data is completely isolated
- **Guest Mode** — the app is fully usable without an account; sign in to persist progress

---

## How We Built It

The app is a **Next.js 14 full-stack application** deployed on Vercel. The frontend is a single-page React app with all styles written as inline CSS using a design token object — no CSS framework needed. The backend is a set of Next.js API routes that handle Charlotte's AI responses, savings goals, links, quiz progress, and live market data.

**Charlotte's AI** lives in a server-side API route. The Anthropic API key never touches the browser. The route receives the conversation history, adds context about which section the user is viewing, and streams a response through Claude Haiku. Charlotte's personality and knowledge — thrift stores, food savings apps, government benefit programs, every savings strategy — is encoded in a 150-line system prompt.

**User data** is stored in Supabase PostgreSQL with Row Level Security enforced at the database level. A PostgreSQL trigger auto-creates a user profile row the moment someone signs up. XP, progress, and budget data are also stored locally in `localStorage` using the user's Supabase UUID as a key prefix so no two accounts share data on the same device.

**Live data** is fetched server-side with in-memory caching: mortgage rates from the Federal Reserve (FRED) API cache for 1 hour since the data only updates weekly; stock quotes from Alpha Vantage cache for 5 minutes to stay within the free tier limit.

---

## Full Tech Stack

| Layer | Technology |
|---|---|
| Framework | Next.js 14 (App Router) |
| Language | TypeScript 5, SQL |
| UI | React 18, inline CSS-in-JS (no Tailwind) |
| AI Model | Anthropic Claude — `claude-haiku-4-5-20251001` |
| AI SDK | `@anthropic-ai/sdk` v0.39 |
| Auth | Supabase Auth (email/password + magic link) |
| Database | PostgreSQL via Supabase |
| Supabase clients | `@supabase/supabase-js` v2, `@supabase/ssr` v0.10 |
| Session management | Next.js middleware + Supabase SSR cookie handling |
| Hosting | Vercel (serverless functions + CDN) |
| Live market data | Alpha Vantage API (stock/ETF quotes) |
| Live mortgage data | FRED — Federal Reserve Economic Data (no key required) |
| Calendar export | iCal `.ics` file generation (Google Calendar + Apple Calendar) |
| Typography | Google Fonts — Playfair Display, DM Sans |
| Local persistence | `localStorage` with Supabase UUID key prefix |
| Build tool | Next.js built-in (Turbopack-compatible) |
| Package manager | npm |
| Type checking | TypeScript strict mode |
| Linting | ESLint (Next.js config) |

**Database tables:** `profiles`, `goals`, `quiz_results`, `module_progress`, `user_links`

**API routes built:**
- `POST /api/chat` — Charlotte AI proxy (Anthropic)
- `GET/POST/PATCH/DELETE /api/goals` — savings goals CRUD
- `GET/POST/DELETE /api/links` — saved links CRUD
- `GET/POST /api/progress` — XP, quiz results, module progress
- `GET /api/mortgage` — live mortgage rates via FRED
- `GET /api/stocks` — live ETF quotes via Alpha Vantage
- `GET /auth/callback` — Supabase magic link handler

---

## Impact & What We Learned

**Impact:**
- Built a real tool for an underserved population — people earning under $62K/year who have been ignored by every major financial app
- Charlotte's knowledge base covers thrift shopping, food savings apps (Too Good To Go, Ibotta), government benefits (SNAP, EITC, WIC, Section 8), credit unions, debt strategies, and every major life event
- The app is fully functional without an account — no barrier to getting help

**What We Learned:**
- How to keep AI API keys server-side only in a Next.js app — never in `NEXT_PUBLIC_` variables, always behind an API route
- How Row Level Security works in Supabase — security enforced at the database layer, not just application code; users literally cannot query another user's rows
- How to solve the Next.js static generation problem when a component needs runtime auth state — solved with `dynamic(() => import(...), { ssr: false })`
- How to build a working gamification system (XP, levels, quizzes, badges) without a UI library
- How to use the FRED API (Federal Reserve) for free real-time financial data — no key required, just a CSV endpoint
- How to handle multi-user data isolation with `localStorage` using UUID-prefixed keys
- How PostgreSQL triggers work — a `handle_new_user()` trigger auto-provisions a profile row on every signup
- How to build a complete design system using only a JavaScript color token object and inline styles

---

## Getting Started

### 1. Clone and install

```bash
git clone https://github.com/PMAIGURU2026/ai-money-mentor-v2.git
cd ai-money-mentor-v2
npm install
```

### 2. Set environment variables

```bash
cp .env.local.example .env.local
```

Fill in `.env.local`:

```env
ANTHROPIC_API_KEY=sk-ant-...
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
ALPHA_VANTAGE_API_KEY=your-key
```

### 3. Set up the database

Run `supabase-schema.sql` in your Supabase project's SQL Editor. This creates all tables, enables Row Level Security, and sets up the auto-profile trigger.

### 4. Run locally

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000)

### 5. Deploy

```bash
vercel --prod
```

Add the same four environment variables in Vercel → Project → Settings → Environment Variables.

---

> **Disclaimer:** Charlotte is an AI financial education guide — not a licensed financial advisor, CPA, or attorney. For major financial, tax, legal, or investment decisions, always consult a qualified professional.

---

*Built by Paula Lawton for the Pursuit L2 Fellowship (2025–2026)*
