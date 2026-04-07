# Eco Discovery — Deploy to Render (Step-by-Step)

This guide walks through putting the app live on the internet using Render.
The frontend is served by the same Express server — you only need **one** Render service.

---

## Before you start — checklist

- [ ] All latest changes are committed and pushed to GitHub (`git push origin main`)
- [ ] You have your **Supabase service role key** and **JWT secret** ready
  (Supabase dashboard → Settings → API)
- [ ] The `.env` file is **not** committed (it should be greyed-out / absent in `git status`)

---

## Part 1 — Push your code to GitHub

> Skip to Part 2 if the repo is already on GitHub.

### 1.1 Create a GitHub repository

1. Go to **https://github.com** and sign in
2. Click the **+** icon in the top-right corner
3. Click **New repository**
4. Fill in:
   - **Repository name:** `eco-discovery`
   - **Visibility:** Private (recommended) or Public
   - Leave **"Initialize this repository"** unchecked
5. Click **Create repository**
6. GitHub shows you a page with setup commands — copy the remote URL
   (looks like `https://github.com/YOUR-USERNAME/eco-discovery.git`)

### 1.2 Connect your local project and push

Open a terminal in the `EcoDiscovery_Development/` folder and run:

```bash
git init                          # only if not already a git repo
git add .
git commit -m "initial commit"
git remote add origin https://github.com/YOUR-USERNAME/eco-discovery.git
git branch -M main
git push -u origin main
```

Refresh your GitHub page — you should see all your files there.

---

## Part 2 — Create a Render account

1. Go to **https://render.com**
2. Click the **Get Started for Free** button (top-right)
3. Click **Continue with GitHub**
4. GitHub will ask you to authorise Render — click **Authorize Render**
5. You are now logged into Render

---

## Part 3 — Create the Web Service (backend + frontend together)

Your Express server already serves the `public/` folder as static files,
so one Render service handles both the API and all the HTML/CSS/JS pages.

### 3.1 Start a new Web Service

1. From the Render dashboard, click **New +** (top-right blue button)
2. Click **Web Service**

### 3.2 Connect your GitHub repository

1. You will see a "Connect a repository" screen
2. If this is your first time, click **Connect GitHub** and grant access
3. Find `eco-discovery` in the list and click **Connect**

### 3.3 Fill in the service settings

Render shows a configuration form. Fill it in exactly as follows:

| Field | What to type |
|---|---|
| **Name** | `eco-discovery` |
| **Region** | `Oregon (US West)` — or whichever is closest to you |
| **Branch** | `main` |
| **Root Directory** | `EcoDiscovery_Development` |
| **Runtime** | `Node` |
| **Build Command** | `npm install` |
| **Start Command** | `npm start` |
| **Instance Type** | `Free` |

> **Root Directory** is the most important field. Click the small pencil icon
> next to it and type `EcoDiscovery_Development` — this tells Render where
> `package.json` lives inside your repo.

### 3.4 Add environment variables

Scroll down to the **Environment Variables** section on the same page.
Click **Add Environment Variable** four times and add:

| Key | Value |
|---|---|
| `NODE_ENV` | `production` |
| `SUPABASE_URL` | `https://noqbhtmutkmsbbitlgpl.supabase.co` |
| `SUPABASE_SERVICE_ROLE_KEY` | *(your service_role key — click Reveal in Supabase to copy it)* |
| `SUPABASE_JWT_SECRET` | *(your JWT secret from Supabase → Settings → API → JWT Settings)* |

> Do **not** add a `PORT` variable. Render sets that automatically.

### 3.5 Deploy

1. Scroll to the bottom and click **Create Web Service**
2. Render starts building — you will see a live log stream
3. Wait for the log to show:
   ```
   Eco Discovery server running on http://0.0.0.0:PORT
   ```
4. At the top of the page you will see your live URL:
   `https://eco-discovery.onrender.com`

Click that URL — your app is live.

---

## Part 4 — Test every page

Open the live URL and check each route:

| Page | Path to visit |
|---|---|
| Home | `/` |
| Game | `/game.html` |
| Videos | `/videos.html` |
| About | `/about.html` |
| Sources | `/sources.html` |
| Admin | `/admin.html` |

If the game loads but fish / animals don't appear, the `SUPABASE_SERVICE_ROLE_KEY`
is likely wrong — go to Render dashboard → your service → **Environment** tab
and correct it, then click **Manual Deploy → Deploy latest commit**.

---

## Part 5 — Fix Supabase auth for the admin page

If the admin login at `/admin.html` returns an error after deploy:

1. Go to **https://supabase.com** → open your project
2. Click **Authentication** in the left sidebar
3. Click **URL Configuration**
4. In **Site URL** replace `http://localhost:3000` with your Render URL:
   `https://eco-discovery.onrender.com`
5. Under **Redirect URLs** click **Add URL** and add:
   `https://eco-discovery.onrender.com/**`
6. Click **Save**

---

## Part 6 — Automatic redeploys

Every time you run `git push origin main`, Render automatically:
1. Pulls the latest code
2. Runs `npm install`
3. Restarts the server with `npm start`

No manual steps needed after the first deploy.

---

## Part 7 — Free tier sleep behaviour

On the free plan, Render spins down the server after **15 minutes of no traffic**.
The next visitor gets a ~30 second cold-start delay.

**For a school demo or presentation**, avoid this by:

**Option A — Free uptime monitor**
1. Go to **https://uptimerobot.com** and create a free account
2. Click **Add New Monitor**
3. Monitor Type: **HTTP(s)**
4. Friendly Name: `Eco Discovery`
5. URL: `https://eco-discovery.onrender.com`
6. Monitoring Interval: **5 minutes**
7. Click **Create Monitor**

This pings the server every 5 minutes so it never sleeps.

**Option B — Upgrade to Starter ($7/month)**
In the Render dashboard, click your service → **Settings** → change instance
type from **Free** to **Starter**.

---

## Quick reference — where to find things after deploy

| Task | Where |
|---|---|
| View live logs | Render dashboard → your service → **Logs** tab |
| Change env variables | Render dashboard → your service → **Environment** tab |
| Force a redeploy | Render dashboard → your service → **Manual Deploy** → Deploy latest commit |
| View your live URL | Render dashboard → your service → top of the page under the service name |
| Change start command | Render dashboard → your service → **Settings** tab |
