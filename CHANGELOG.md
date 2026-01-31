# Changelog

All notable changes to the Learning Hub project.

## [0.1.0] - 2026-01-30

### Added
- **Project Setup**
  - Next.js 14+ with App Router, TypeScript, Tailwind CSS
  - shadcn/ui component library initialized
  - Folder structure for features and components

- **Core Features**
  - MainLayout with responsive sidebar navigation
  - Progress tracking (daily minutes, streak, completed lessons)
  - Dashboard with stats cards and progress overview
  - Courses page with search, filtering, and enrollment

- **Infrastructure**
  - Supabase client setup with TypeScript types
  - Zustand store for persistent state management
  - Environment configuration template (.env.example)

### Installed Dependencies
- `@supabase/supabase-js` - Database and auth
- `zustand` - State management
- `react-hook-form` + `zod` - Form handling
- `@tanstack/react-query` - Data fetching
- `lucide-react` - Icons
- `clsx`, `tailwind-merge` - Utility libraries

### UI Components (shadcn/ui)
- button, card, input, form, progress
- badge, avatar, dropdown-menu
- label, select, textarea, sonner (toast)

### Git Status
- 2 commits
- 24 files tracked
- Local repository ready for GitHub push

## Next Steps
- Set up Supabase project and run migrations
- Install Clawdbot skills (coding-agent, vercel-deploy, supabase, github)
- Push to GitHub and connect to Vercel
- Build lesson detail and quiz features
- Implement authentication
