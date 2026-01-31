# Learning Hub - Skills Installation

Run these commands to install Clawdbot/Moltbot skills for this project:

```bash
# Install clawdhub globally
npm install -g clawdhub

# Install coding skills
npx clawdhub@latest install coding-agent
npx clawdhub@latest install vercel-deploy
npx clawdhub@latest install supabase
npx clawdhub@latest install github

# Alternative: Manual skill installation
# Copy skill folders to ~/.openclaw/skills/ or <project>/skills/
```

## Installed Tools (Manual Setup)

| Tool | Status | Command |
|------|--------|---------|
| Codex CLI | ✅ Installed | `npm install -g @openai/codex` |
| GitHub CLI | ✅ Installed | `brew install gh` |
| Next.js | ✅ Created | `npx create-next-app@latest` |
| shadcn/ui | ✅ Initialized | `npx shadcn@latest init` |
| Supabase | ⏳ Pending | Install skill or use npm directly |

## GitHub Auth

Run this when ready to push to GitHub:
```bash
gh auth login
gh repo create learning-hub --public --source=. --push
```

## Codex Usage

```bash
# Start Codex interactive session
codex

# Or run a command directly
codex "Create a React component for course cards with thumbnail, title, and progress bar"
```
