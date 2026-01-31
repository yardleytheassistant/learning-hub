# Supabase Setup for Learning Hub

## Credentials (from Chris)

- **URL:** https://gjpyxskuqluokzrxqkby.supabase.co
- **Anon Key:** sb_publishable_YGFPm0WYFmfBAXHvrHxe6A_UMiJVckd

## Setup Instructions

### 1. Create Supabase Project
- Go to https://supabase.com
- Click "New Project"
- Enter project name: "Learning Hub"
- Wait for project to provision

### 2. Run Database Schema
1. In Supabase Dashboard, click **SQL Editor** (left sidebar)
2. Click **New Query**
3. Copy contents of `supabase/schema.sql`
4. Click **Run** to execute

### 3. Connect App to Supabase
The credentials are already in `.env.example`. For local development:

```bash
# Create .env.local with credentials
cp .env.example .env.local
```

For Vercel deployment:
1. Go to https://vercel.com/dashboard
2. Select your project (learning-hub)
3. Click **Settings** → **Environment Variables**
4. Add:
   - `NEXT_PUBLIC_SUPABASE_URL` = `https://gjpyxskuqluokzrxqkby.supabase.co`
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY` = `sb_publishable_YGFPm0WYFmfBAXHvrHxe6A_UMiJVckd`

### 4. Test Connection
Run locally:
```bash
npm run dev
```

Visit http://localhost:3000/quiz - should load from Supabase instead of static JSON.

---

## Database Structure

| Table | Purpose |
|-------|---------|
| `users` | User profiles and preferences |
| `courses` | Course information |
| `chapters` | Chapters within courses |
| `quizzes` | Quiz metadata |
| `questions` | Quiz questions with options |
| `user_progress` | Track completed lessons |
| `quiz_attempts` | Store quiz scores |
| `goals` | User learning goals |
| `daily_study` | Daily study logs |

---

## Quiz Generation Flow

### Automatic (When OpenAI API is configured)
1. User clicks "Generate Quiz"
2. App reads PDF from `~/Desktop/IS Powerpoints/`
3. Sends to OpenAI API → generates questions
4. Saves to Supabase automatically

### Manual (Current State)
1. Admin runs SQL in Supabase SQL Editor
2. Questions inserted directly to database

---

## Next Steps

1. ✅ Supabase project created
2. ✅ Credentials provided
3. ⏳ Run schema in SQL Editor (needs manual step)
4. ⏳ Deploy to Vercel with env vars
5. ⏳ Connect quiz pages to fetch from Supabase

---

*Created: 2026-01-30*
