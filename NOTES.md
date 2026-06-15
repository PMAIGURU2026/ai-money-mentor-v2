# Development Notes — AI Money Mentor V2

## Plain English: What This App Does

AI Money Mentor is a financial education web app for people earning $0–$62K/year who want real money guidance but can't afford a financial advisor. You open it like any website, and you're greeted by Charlotte — an AI financial mentor built on Anthropic's Claude model.

Charlotte is designed to ask you questions first before giving advice, speak plainly (no jargon), and never shame anyone for past money decisions. She can talk through any financial topic: how to budget when you're broke, how to start building credit from zero, whether to open a Roth IRA, what to do when a medical bill shows up, how to use food savings apps, what government benefits you might qualify for.

Beyond the chat, the app teaches financial concepts across 13 sections, lets you earn XP points and level up as you learn, tracks your savings goals with a deadline and monthly contribution target, shows live mortgage rates and live ETF quotes so you can watch real financial data without buying anything, and lets you save links to useful financial resources.

New users start with zero data. Everything you do (XP you earn, goals you set, links you save) is saved to your account. If you sign out and come back, your progress is still there. If two different people use the app on the same device, their data never mixes.

---

## Key Technical Decisions

### 1. No CSS framework — all inline styles with a color token object
All design choices live in one JavaScript object called `C` (color tokens: `C.forest`, `C.gold`, `C.sage`, etc.). Every element in the app uses this object for its colors. The benefit: the whole design system is in one place, easy to update, and there's no dependency on Tailwind or any external library. The tradeoff: more verbose JSX.

### 2. One large component (`AIMoneyMentor.tsx`) instead of many small ones
The main app file is ~1,200+ lines. This was intentional: the entire UI state (active section, user, XP, navigation) lives in one place, which avoids complex prop drilling through a component tree. For a solo portfolio project this is easier to maintain. For a team project, you'd want to split this out.

### 3. Charlotte's API key never touches the browser
The `ANTHROPIC_API_KEY` only exists on the server. When the user sends Charlotte a message, the browser calls `/api/chat`, a Next.js server-side API route. That route adds the system prompt and talks to Anthropic. The API key is never in the JavaScript bundle and never visible to the user. This applies to `ALPHA_VANTAGE_API_KEY` too.

### 4. `dynamic(() => import(...), { ssr: false })` for the main component
Next.js tries to render pages at build time. The main component creates a Supabase browser client when it loads — which requires the browser to exist. At build time there is no browser. Wrapping the import in `dynamic(..., { ssr: false })` tells Next.js to only render this component on the client, which solves the build error.

### 5. Supabase Row Level Security — security at the database level
Every table in the database has RLS (Row Level Security) policies. The rules say: "a user may only read or write rows where `user_id` matches their own Supabase user ID." This is enforced by the database, not by application code. Even if there were a bug in the app that accidentally queried another user's data, the database would return nothing. This is the correct way to secure multi-user data.

### 6. PostgreSQL trigger auto-creates a profile on signup
A database trigger called `handle_new_user()` fires every time a new user is created in Supabase Auth. It automatically inserts a row into the `profiles` table with that user's ID. This means the app never needs to manually create a profile — it's always there the moment the user exists.

### 7. localStorage with UUID key prefix for client-side persistence
XP points, budget totals, and other live data are stored in the browser's `localStorage`. To prevent two different accounts from overwriting each other's data on the same device, every key is prefixed with the user's Supabase UUID:
`{user_uuid}_xp`, `{user_uuid}_budgetSpent`, etc.
When a user signs out, all 7 of their local keys are cleared. New users start from zero.

### 8. In-memory caching for external APIs to stay on free tiers
- **Mortgage rates (FRED):** data is cached in memory for 1 hour. The Federal Reserve only updates these rates weekly, so 1 hour is more than enough freshness.
- **Stock/ETF quotes (Alpha Vantage):** data is cached in memory for 5 minutes. Alpha Vantage's free tier allows only 25 requests per day. With 5-minute caching, the app can serve many users on a single daily budget of requests.

### 9. `mix-blend-mode: screen` for the logo on the dark sidebar
The brand icon (`aimm-icon.png`) has a black background. On the dark green sidebar, `mix-blend-mode: screen` makes black pixels invisible — they visually "disappear" into the dark background — while the gold and green elements of the icon remain visible. This is a CSS compositing trick that avoids needing to manually remove the background from the PNG.

### 10. iCal file export for calendar integration
When a user sets a deadline on a savings goal, they can click "Add to Calendar" to download a `.ics` file. This is a universal calendar format supported by Google Calendar, Apple Calendar, and Outlook. No API key or OAuth needed — it's just a generated file.

---

## APIs and External Services

| Service | What it does | API key required | Free tier |
|---|---|---|---|
| **Anthropic Claude** (`claude-haiku-4-5-20251001`) | Powers Charlotte's chat responses. Server-side only. | Yes — `ANTHROPIC_API_KEY` | Usage-based pricing |
| **Supabase Auth** | Email/password sign-in, magic link (passwordless) sign-in, session management, OAuth callback | Yes — `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Free tier: 50,000 monthly active users |
| **Supabase PostgreSQL** | Stores goals, links, quiz results, module progress, profiles. All tables have RLS. | Yes — same key | Free tier: 500 MB database |
| **Alpha Vantage** | Live stock and ETF quotes for SPY, VOO, VTI, QQQ. 5-minute in-memory cache. | Yes — `ALPHA_VANTAGE_API_KEY` | Free: 25 requests/day |
| **FRED (Federal Reserve)** | Live 30-year and 15-year fixed mortgage rates. 1-hour cache. | **No** — public CSV endpoint | Unlimited |
| **Vercel** | Hosting, serverless API routes, CI/CD (auto-deploy on git push to main) | Vercel account | Hobby tier: free |
| **Google Fonts** | Playfair Display (headings + logo text), DM Sans (body text) | No | Free |
| **Google Calendar / Apple Calendar** | Calendar export via `.ics` file download (iCal format) | No | Free |

### Charlotte's System Prompt (summary)
Charlotte's entire personality and knowledge base is a ~150-line system prompt in `/app/api/chat/route.ts`. It covers:
- Saving strategies for low income: thrift stores, food apps (Too Good To Go, Ibotta, Flashfood), buying in bulk, meal planning
- Banking: credit unions vs. banks, avoiding overdraft fees, building an emergency fund
- Credit: secured cards, credit-builder loans, becoming an authorized user, disputing errors
- Government benefits: SNAP, EITC, WIC, Section 8, LIHEAP, CHIP, Medicaid
- Life events: having a baby, losing a job, starting a business, going to college, buying a home
- Debt: debt avalanche vs. snowball, negotiating with creditors, when to consider bankruptcy
- Investments: index funds, Roth IRA, employer 401(k) match — explained simply
- Charlotte never tells users to buy or sell a specific stock. She shows data; the user decides.

---

## Environment Variables

```env
ANTHROPIC_API_KEY=               # Charlotte's AI — server-side only
NEXT_PUBLIC_SUPABASE_URL=        # Supabase project URL (safe to expose)
NEXT_PUBLIC_SUPABASE_ANON_KEY=   # Supabase anon key (safe to expose — RLS enforces security)
ALPHA_VANTAGE_API_KEY=           # Live stock quotes — server-side only
```

`ANTHROPIC_API_KEY` and `ALPHA_VANTAGE_API_KEY` must NEVER be prefixed with `NEXT_PUBLIC_` — that would expose them in the browser JavaScript bundle.

---

## Database Tables

| Table | Purpose |
|---|---|
| `profiles` | One row per user — display name, XP total, level. Auto-created by trigger on signup. |
| `goals` | User savings goals — name, target amount, saved amount, deadline, monthly contribution |
| `quiz_results` | Quiz answers and scores per module per user |
| `module_progress` | Which learning modules each user has completed |
| `user_links` | Saved links — URL, title, category, favorite flag |

All tables use `user_id UUID REFERENCES auth.users(id)` and have RLS policies enabled.

---

## Scheduled Jobs / Crons

**None.** The app has no scheduled jobs. Data freshness is handled by time-based in-memory caching:
- Mortgage rates: 1-hour TTL (FRED data updates weekly)
- Stock quotes: 5-minute TTL (to stay within Alpha Vantage free tier)

Future SMS reminders (not yet built) would require a cron job and a paid service like Twilio.

---

## npm Scripts

```bash
npm run dev      # Start dev server at localhost:3000
npm run build    # TypeScript check + production build
npm run lint     # ESLint
vercel --prod    # Deploy to production
```

---

## Supabase Setup Checklist

1. Create project at supabase.com
2. Copy project URL + anon key from Settings → API
3. Run `supabase-schema.sql` in the Supabase SQL Editor
4. Enable email auth: Authentication → Providers → Email
5. Set Site URL to your Vercel domain: Authentication → URL Configuration
6. Add redirect URL: `https://your-project.vercel.app/auth/callback`

## Vercel Deploy Checklist

- [ ] `ANTHROPIC_API_KEY` added in Vercel env vars (Production + Preview)
- [ ] `NEXT_PUBLIC_SUPABASE_URL` added
- [ ] `NEXT_PUBLIC_SUPABASE_ANON_KEY` added
- [ ] `ALPHA_VANTAGE_API_KEY` added
- [ ] Supabase redirect URL includes Vercel domain
- [ ] `npm run build` passes locally before pushing

---

## Pursuit Portfolio Context

Built for the Pursuit L2 Fellowship (2025–2026). Demonstrates:
- Full-stack TypeScript with Next.js 14 App Router (server + client components, API routes, middleware)
- Secure AI integration — API key stays server-side, never exposed to the browser
- Multi-user auth + PostgreSQL with Row Level Security via Supabase
- Client-side data isolation using localStorage with UUID key prefixes
- Responsive mobile-first UI built without a CSS framework
- Real-time financial data integration (FRED, Alpha Vantage)
- Vercel deployment with environment-specific configuration
- Gamification (XP, levels, quizzes, badges) without a UI library
