# Eco Discovery — Setup Guide

Everything you need to get the app running locally after the backend migration.

---

## What changed

The app now runs through a Node.js/Express server instead of directly from a browser.
The server handles all database calls — **no Supabase credentials live in the frontend anymore.**

You no longer use Live Server or Python HTTP server.
One command starts everything: `npm run dev`

---

## Prerequisites

Install these once on your machine if you don't have them already:

| Tool | Download | Check if installed |
|---|---|---|
| **Node.js** (v18 or newer) | https://nodejs.org | `node -v` |
| **npm** (comes with Node) | included | `npm -v` |

You also need access to the **Supabase project dashboard**.
Ask a team member for the project URL if you do not have it.

---

## Step 1 — Clone / pull the repo

If you already have the repo, just pull the latest from `main`:

```bash
git pull origin main
```

If starting fresh:

```bash
git clone <repo-url>
cd EcoDiscovery_Development
```

---

## Step 2 — Install dependencies

Run this once inside the `EcoDiscovery_Development/` folder:

```bash
cd EcoDiscovery_Development
npm install
```

This installs Express, Supabase JS SDK, Helmet, and other packages into `node_modules/`.
You only need to re-run this if `package.json` changes.

---

## Step 3 — Create your `.env` file

The `.env` file holds the backend credentials. It is **gitignored** — each team member creates their own copy locally.

Copy the template:

```bash
cp .env.example .env
```

Then open `.env` and fill it in:

```
PORT=3000
SUPABASE_URL=https://noqbhtmutkmsbbitlgpl.supabase.co
SUPABASE_SERVICE_ROLE_KEY=<your service role key>
SUPABASE_JWT_SECRET=<your JWT secret>
```

### Where to find the credentials

1. Go to **https://supabase.com** and sign in
2. Open the **Eco Discovery project**
3. In the left sidebar click **Settings → API**

| Value to copy | Where it is on that page |
|---|---|
| `SUPABASE_URL` | **Project URL** (already filled in above — just confirm it matches) |
| `SUPABASE_SERVICE_ROLE_KEY` | Under **Project API keys** → `service_role` row → click **Reveal** to show the full key, then copy it |
| `SUPABASE_JWT_SECRET` | Scroll down to **JWT Settings** → copy the **JWT Secret** |

> **Important:** The `service_role` key has full database access. Never commit it to git.
> The `.env` file is gitignored — it will not be pushed to the repo.

---

## Step 4 — Run the app

### Development mode (recommended while working on the project)

```bash
npm run dev
```

The server auto-restarts whenever you save a backend file. Frontend changes take effect on browser refresh.

### Production / demo mode

```bash
npm start
```

### Access the app

Once the server is running you will see:

```
Eco Discovery server running on http://localhost:3000
```

Open your browser and go to:

| Page | URL |
|---|---|
| Home | http://localhost:3000 |
| Game | http://localhost:3000/game.html |
| Videos | http://localhost:3000/videos.html |
| About | http://localhost:3000/about.html |
| Sources | http://localhost:3000/sources.html |
| Admin | http://localhost:3000/admin.html |

---

## Step 5 — Set up the admin account

The admin login uses Supabase Auth. You create the admin user once in the Supabase dashboard.

1. Go to the Supabase project → **Authentication** (left sidebar) → **Users**
2. Click **Add user → Create new user**
3. Enter:
   - **Email:** any email you want to use as the admin login (e.g. `admin@ecodiscovery.com`)
   - **Password:** a strong password (at least 8 characters)
4. Click **Create User**

That email and password are what you type into the admin login form at `http://localhost:3000/admin.html`.

> Only one admin user is needed. The same credentials work for the whole team — share them over a private channel (not in the repo).

---

## Stopping the server

Press `Ctrl + C` in the terminal where the server is running.

---

## Troubleshooting

### "Cannot find module" error on startup

You have a missing `node_modules/` — run `npm install` again.

### "Missing SUPABASE_URL or SUPABASE_SERVICE_ROLE_KEY" error

Your `.env` file is missing or the values are still the placeholder text.
Open `.env` and make sure both values are filled in with real credentials from the Supabase dashboard.

### Port 3000 is already in use

Either stop the other process using port 3000, or change `PORT=3001` (or any free port) in your `.env` file and access the app at `http://localhost:3001`.

### Game page loads but no animals appear

The `SUPABASE_SERVICE_ROLE_KEY` in `.env` is wrong or the `animals` table has no rows with `is_active = true`. Check the Supabase dashboard → **Table Editor → animals**.

### Admin login says "Invalid email or password"

The user has not been created yet — go to Supabase → Authentication → Users and create one (Step 5 above). If the user exists, double-check the password you are typing.

### Feedback modal submits but nothing saves

Check that the `feedback` table exists in Supabase → **Table Editor**. The `SUPABASE_SERVICE_ROLE_KEY` must also be correct.

---

## File layout (for reference)

```
EcoDiscovery_Development/
├── .env                  ← Your local credentials (gitignored — never commit)
├── .env.example          ← Template — safe to commit
├── package.json          ← Node project config
├── backend/
│   ├── server.js         ← Express entry point
│   ├── routes/           ← URL definitions
│   ├── controllers/      ← Request handlers
│   ├── models/           ← Database queries
│   ├── middleware/        ← JWT verification
│   └── services/         ← Supabase client (service role)
└── public/               ← All frontend files served by Express
    ├── index.html
    ├── game.html
    ├── admin.html
    ├── css/
    └── js/
```
