# Life RPG — Frontend

Turn real-life tasks into RPG quests. React + Vite + Tailwind frontend for the Life RPG API.

## Stack
- React 18 + Vite
- React Router v6
- Tailwind CSS
- Axios (httpOnly-cookie auth against the backend)

## Setup

\`\`\`bash
npm install
cp .env.example .env
# set VITE_API_BASE_URL to your backend URL
npm run dev
\`\`\`

## Environment variables

| Variable | Description |
|---|---|
| `VITE_API_BASE_URL` | Base URL of the Life RPG backend API, e.g. `http://localhost:5000/api/v1` |

## Folder structure

See `src/` — organized by `components/<domain>`, `pages/`, `api/` (one file per backend resource),
`context/` (Auth + Game state), `hooks/`, and `utils/`. Mirrors the API contract in `API_CONTRACT.md`.

## Key flows
- **Auth**: register/login set an httpOnly cookie server-side; frontend never touches the token directly.
- **Quests**: create → complete → backend returns XP/Gold/Level/Achievement deltas in one response.
- **Shop**: frontend sends only `itemId`; price is always resolved server-side.
- **AI Advisor**: `POST /ai/advisor` with an empty body; backend assembles the player profile.

## Scripts
\`\`\`bash
npm run dev       # local dev server
npm run build     # production build
npm run preview   # preview the production build locally
\`\`\`