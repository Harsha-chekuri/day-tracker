# 🔥 KALNET Daily Learning Streak Tracker

A full-stack web application built with **Next.js 14 (App Router)**, **TypeScript**, and **Tailwind CSS** that helps students track daily study habits and maintain learning streaks.

---

## 🚀 Live Demo

> Deploy to Vercel and paste your URL here.

---

## 📋 Features

- **Mark "I Studied Today"** — one tap to log a session
- **Streak counter** — consecutive day tracking with automatic reset logic
- **Total study days** — cumulative count of all sessions
- **Last studied date** — always know when you last opened the books
- **Study history page** — full list of sessions, newest first
- **Duplicate prevention** — can't log the same day twice
- **Fully server-rendered** — fast, no client-side data fetching on load

---

## 🛠 Tech Stack

| Layer     | Technology                        |
|-----------|-----------------------------------|
| Framework | Next.js 14 (App Router)           |
| Language  | TypeScript                        |
| Styling   | Tailwind CSS                      |
| Backend   | Next.js API Routes                |
| Storage   | Local JSON file (`data/study.json`) |
| Deployment| Vercel                            |

---

## 📁 Project Structure

```
app/
├── page.tsx              # Dashboard (Home)
├── history/
│   └── page.tsx          # Study History page
├── api/
│   ├── study/route.ts    # POST  /api/study   — log today's session
│   ├── streak/route.ts   # GET   /api/streak  — current stats
│   └── history/route.ts  # GET   /api/history — list of dates
├── layout.tsx            # Root layout + Navbar
└── globals.css           # Tailwind base styles

components/
├── Navbar.tsx            # Top navigation bar
├── StreakCard.tsx        # Stat display card
├── StudyButton.tsx      # "I Studied Today" button with state
└── HistoryList.tsx      # Ordered list of study dates

lib/
└── streakLogic.ts       # Pure streak logic + file I/O helpers

data/
└── study.json           # Persistent storage (auto-created)
```

---

## ⚙️ Setup & Running Locally

### Prerequisites
- Node.js 18+
- npm or yarn

### Steps

```bash
# 1. Clone the repo
git clone https://github.com/YOUR_USERNAME/kalnet-streak-tracker.git
cd kalnet-streak-tracker

# 2. Install dependencies
npm install

# 3. Start development server
npm run dev

# 4. Open in browser
open http://localhost:3000
```

---

## 🔌 API Endpoints

### `POST /api/study`
Logs today's study session.

**Response (200):**
```json
{
  "success": true,
  "message": "Great work! Study session recorded. 🔥",
  "streak": 5,
  "totalDays": 12
}
```

**Response (409 — already marked today):**
```json
{
  "success": false,
  "message": "You have already marked today."
}
```

---

### `GET /api/streak`
Returns current streak statistics.

**Response:**
```json
{
  "streak": 5,
  "totalDays": 12,
  "lastStudied": "13 March 2026"
}
```

---

### `GET /api/history`
Returns all study dates, newest first.

**Response:**
```json
{
  "history": [
    { "iso": "2026-03-13", "formatted": "13 March 2026" },
    { "iso": "2026-03-12", "formatted": "12 March 2026" }
  ]
}
```

---

## 🧠 Streak Logic

Streak calculation is handled in `lib/streakLogic.ts`:

1. Dates are stored as `YYYY-MM-DD` strings in `data/study.json`
2. On each request, dates are sorted ascending
3. Starting from the most recent date, the algorithm walks backwards
4. If consecutive dates are exactly 1 day apart → streak continues
5. If there's a gap → streak count stops
6. If the last study date is not today or yesterday → streak = 0

**Example:**

```
Studied: Mar 10, Mar 11, Mar 12  →  Streak = 3
Missed: Mar 13
Studied: Mar 14                   →  Streak resets to 1
```

---

## ☁️ Deploying to Vercel

1. Push code to a GitHub repository
2. Go to [vercel.com](https://vercel.com) and click **New Project**
3. Import your GitHub repository
4. Leave all settings as default (Vercel auto-detects Next.js)
5. Click **Deploy**
6. Your live URL will be: `https://your-project.vercel.app`

> **Note:** Vercel's serverless functions don't persist files between requests. For a production deployment, replace the JSON file storage in `lib/streakLogic.ts` with a database like [Vercel Postgres](https://vercel.com/storage/postgres), [PlanetScale](https://planetscale.com), or [Supabase](https://supabase.com).

---

## 📄 License

Built for the KALNET Full Stack Internship Task.
