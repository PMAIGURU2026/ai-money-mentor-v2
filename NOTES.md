# Development Notes — AI Money Mentor V2

## Build history & fixes

### June 2026

**Fix: TypeScript error — `showText` prop missing from `CharlotteLogo`**
- `CharlotteLogo` was called with `showText={true}` in sidebar and mobile drawer, but the component only accepted `size` prop
- Added `showText?: boolean` to the component signature and replaced `{false && ...}` conditional

**Fix: Supabase build error — env vars not available at static generation time**
- `AIMoneyMentor.tsx` creates a Supabase browser client on render
- Next.js tried to pre-render the page statically and threw "URL and API key required"
- Fix: changed `app/page.tsx` to use `dynamic(() => import(...), { ssr: false })` so the component only renders on the client

---

## Planned improvements (not yet built)

- [ ] Live mortgage rate widget (FRED API — free, no key needed)
- [ ] Real-time stock/ETF quote in Investments section (Alpha Vantage free tier)
- [ ] Persistent XP — currently hardcoded at 340 XP; needs `progress` table integration
- [ ] User-specific budget inputs — Budget tab is currently static demo data
- [ ] Push notifications for goal deadlines (web push API)
- [ ] Dark mode toggle

## API keys to add for live data features

| API | Key env var | Free tier |
|---|---|---|
| Alpha Vantage | `ALPHAVANTAGE_API_KEY` | 25 req/day |
| Polygon.io | `POLYGON_API_KEY` | Generous free tier |
| FRED (Federal Reserve) | None needed | Unlimited |

## Supabase setup steps

1. Create project at [supabase.com](https://supabase.com)
2. Copy project URL + anon key from Settings → API
3. Run `supabase-schema.sql` in the SQL editor
4. Enable email auth in Authentication → Providers
5. Set Site URL to your Vercel domain in Authentication → URL Configuration
6. Add redirect URL: `https://your-domain.vercel.app/auth/callback`

## Vercel deploy checklist

- [ ] `ANTHROPIC_API_KEY` set in Vercel env vars (Production + Preview)
- [ ] `NEXT_PUBLIC_SUPABASE_URL` set
- [ ] `NEXT_PUBLIC_SUPABASE_ANON_KEY` set
- [ ] Supabase redirect URL includes Vercel domain
- [ ] `npm run build` passes locally before pushing

## Pursuit portfolio context

Built for Pursuit L2 program (2025-2026) as a lookbook deliverable. Demonstrates:
- Full-stack TypeScript with Next.js App Router
- Secure AI integration (API key server-side only)
- Auth + database with Row Level Security (Supabase)
- Responsive mobile-first UI without a CSS framework
- Vercel deployment with environment-specific config
