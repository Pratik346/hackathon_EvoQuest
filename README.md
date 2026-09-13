# ⚔️ Life RPG — Turn Your Real Life Into a Game

Life RPG transforms everyday tasks and personal goals into RPG-style quests. Complete real-world activities to earn XP, level up your character, improve attributes, earn Gold, unlock achievements, and get personalized AI recommendations.

## 🎮 What It Does

Instead of a boring to-do list, Life RPG turns tasks into quests:

- Complete quests → earn **XP**, **Gold**, and **Attribute** points
- Level up your character with a non-linear XP curve
- Build **streaks** by completing at least one quest daily
- Unlock **achievements** automatically as you progress
- Spend Gold in the **shop** on cosmetic items
- Get an **AI Advisor** (powered by Gemini) that analyzes your progress and recommends quests based on neglected attributes

## 🏗️ Tech Stack

**Frontend:** React (Vite), Tailwind CSS, React Router, Axios
**Backend:** Node.js, Express, MongoDB, Mongoose, JWT (httpOnly cookies)
**AI:** Google Gemini API
**Deployment:** Vercel (frontend), Render (backend), MongoDB Atlas (database)

## 📁 Project Structure
QuestForge/
├── frontend/ # React + Vite app
├── backend/ # Express + MongoDB API
├── .gitignore
└── README.md 

## 🚀 Quickstart (local development)

### Backend

```bash
cd backend
npm install
cp .env.example .env
npm run seed
npm run dev
```

Runs on `http://localhost:5000`

### Frontend

```bash
cd frontend
npm install
cp .env.example .env
npm run dev
```

Runs on `http://localhost:5173`

## 🔑 Environment Variables

### Backend (`backend/.env`)

## 📡 API

Full route contract lives in `API_CONTRACT.md`. Base URL: `/api/v1`.

| Group | Routes |
|---|---|
| Auth | `POST /auth/register`, `POST /auth/login`, `POST /auth/logout`, `GET /auth/me` |
| Character | `GET /character` |
| Quests | `GET/POST /quests`, `GET/PATCH/DELETE /quests/:id`, `POST /quests/:id/complete` |
| Achievements | `GET /achievements` |
| Shop | `GET /shop/items`, `POST /shop/purchase` |
| Inventory | `GET /inventory` |
| Activity | `GET /activity` |
| AI | `POST /ai/advisor` |

## 🛡️ Anti-Cheat

All rewards (XP, Gold, attributes, level, item prices) are calculated and enforced entirely server-side. The frontend never sends and the backend never trusts client-provided values for these.

## 🌐 Live Deployment

- Frontend: https://evoquestgamifiedproductivitypersona.vercel.app/
- Backend: https://hackathon-evoquest.onrender.com/
