# Eco Discovery

**An interactive educational web application for children to explore Saskatchewan's freshwater ecosystems.**

Built for **ENSE 281 — Introduction to Software Engineering** at the **University of Regina**.  
Children learn about native freshwater animals through a timed card-matching game, animated scenes, educational videos, and an animal reference library — all backed by a live Supabase database.

> **Desktop only.** This application is designed and optimized exclusively for desktop screens (1024 px and wider). It will not display correctly on mobile or tablet devices.

---

## Table of Contents

1. [Project Overview](#project-overview)
2. [Tech Stack](#tech-stack)
3. [Pages & Features](#pages--features)
4. [Prerequisites](#prerequisites)
5. [Installation & Setup](#installation--setup)
6. [Environment Variables](#environment-variables)
7. [Running the Application](#running-the-application)
8. [Project Structure](#project-structure)
9. [API Reference](#api-reference)
10. [Architecture](#architecture)
11. [Game Mechanics](#game-mechanics)
12. [Database Schema](#database-schema)
13. [Development Notes](#development-notes)
14. [Team](#team)

---

## Project Overview

Eco Discovery teaches children about the freshwater creatures found in Saskatchewan's lakes and rivers. The experience is built around three pillars:

| Pillar | Description |
|---|---|
| **Play** | A 2-minute timed card-matching game where children read progressive hints and identify the correct fish |
| **Watch** | A curated library of 6 embedded educational YouTube videos displayed inside animated TV-screen cards |
| **Discover** | An animal reference library (sticker book) that unlocks as cards are solved |

A global **Feedback** modal lets users submit star-rated comments, which are stored in Supabase and viewable through a password-protected Admin dashboard.

---

## Tech Stack

| Layer | Technology | Notes |
|---|---|---|
| **Frontend — Structure** | HTML5 | 6 separate page files |
| **Frontend — Styling** | CSS3 (custom, no framework) | Page-scoped stylesheets + shared `main.css` |
| **Frontend — Logic** | Vanilla JavaScript (ES Modules) | No build tools, no bundler |
| **Architecture Pattern** | MVC | Models → Views → Controllers in `/js/` |
| **Runtime / Server** | Node.js v18+ | Express serves static files + API |
| **Web Framework** | Express 4.x | Routes, middleware, static serving |
| **Database** | Supabase (PostgreSQL) | Animals, hints, feedback tables |
| **Auth** | Supabase Auth + JWT | Admin-only routes protected by JWT middleware |
| **Security** | Helmet, express-rate-limit, CORS | Headers hardened; login rate-limited to 10/15 min |
| **Environment Config** | dotenv | `.env` file — never committed |
| **Fonts** | Google Fonts — Nunito | Loaded via CDN |
| **Icons** | Font Awesome 6.5 | Loaded via CDN |
| **Media** | YouTube iframes | Embedded in modal on the Videos page |
| **Dev Server** | nodemon | Auto-restarts on file changes |

---

## Pages & Features

### Home (`index.html`)
- Animated hero section with lake background, flying birds, and floating clouds
- Two mascot characters (Froggy + Ducky) with animated speech-bubble banner reveals
- Wooden slate panels showing "What You'll Learn" and "Your Mission"
- Ambient rising bubble effects and cursor glow trail
- How-to-Play cards linking to the game, videos, and discovery sections

### Game (`game.html`)
- **2-minute countdown timer** with colour-coded danger modes (60 s → yellow, 30 s → red)
- 6 mystery sticker cards that shuffle on every reset
- Progressive hint system — each wrong guess unlocks the next hint
- Animated freshwater scene: swimming fish, flying birds, an animated crab, and sinking trash
- **Trash drag-and-drop** mini-game (drag trash to the bin for bonus seconds)
- Sticker book sidebar tracking solved / failed cards with a progress bar and star rating
- End-game overlay showing score and a Restart button
- Timer stops automatically when all 6 cards are resolved

### Videos (`videos.html`)
- 6 animated TV-screen cards, each representing an educational video
- Click a TV to open a full-screen modal YouTube player (autoplay enabled)
- Video categories: Wildlife, Ecosystems, Insects, Science, Conservation
- Sparkle particle effects on card hover

### About (`about.html`)
- Project description and team member profiles
- Animated hero section matching the site's visual theme

### Sources (`sources.html`)
- Full citations and references for all animal data, images, and videos used in the app

### Admin (`admin.html`) — protected
- Accessible only with a valid Supabase admin login
- View all feedback submissions with star ratings, timestamps, and user messages
- Delete individual submissions
- Session checked on page load via `GET /api/auth/me`

### Feedback Modal — global
- Available on every page via the footer "Feedback" link
- Fields: name, role (Student / Teacher / Parent / Other), message, optional email, 1–5 star rating
- Submissions stored in Supabase `feedback` table

---

## Prerequisites

Before you begin, ensure you have the following installed:

| Requirement | Minimum Version | Check |
|---|---|---|
| [Node.js](https://nodejs.org/) | v18.0.0 | `node --version` |
| npm | v9.0.0 (bundled with Node) | `npm --version` |
| Git | Any recent version | `git --version` |

You will also need:
- A **[Supabase](https://supabase.com/) account** with a project set up (free tier is sufficient)
- A modern **desktop browser** — Chrome, Firefox, Edge, or Safari (latest version)
- An active **internet connection** — required at runtime for Google Fonts, Font Awesome, and Supabase API calls

---

## Installation & Setup

### 1. Clone the Repository

```bash
git clone https://github.com/Rayansh-Chowatia/Ense_281_eco_discovery_app.git
cd Ense_281_eco_discovery_app/EcoDiscovery_Development
```

### 2. Install Dependencies

```bash
npm install
```

This installs all packages listed in `package.json`:

| Package | Version | Purpose |
|---|---|---|
| `express` | ^4.21.2 | Web server and static file serving |
| `@supabase/supabase-js` | ^2.49.4 | Supabase database client |
| `dotenv` | ^16.5.0 | Loads `.env` variables into `process.env` |
| `cors` | ^2.8.5 | Cross-origin request handling (dev only) |
| `helmet` | ^8.0.0 | Sets secure HTTP response headers |
| `express-rate-limit` | ^7.5.0 | Brute-force protection on the login route |
| `nodemon` *(dev)* | ^3.1.9 | Auto-restarts server on file save |

### 3. Configure Environment Variables

Create a `.env` file in the `EcoDiscovery_Development/` root folder:

```bash
# From inside EcoDiscovery_Development/
touch .env
```

Then paste and fill in the following values (see [Environment Variables](#environment-variables) below):

```env
PORT=3000
SUPABASE_URL=your_supabase_project_url
SUPABASE_SERVICE_ROLE_KEY=your_supabase_service_role_key
SUPABASE_JWT_SECRET=your_supabase_jwt_secret
```

> **Never commit `.env` to version control.** It contains secret keys. Ensure `.env` is listed in `.gitignore`.

### 4. Run the Application

See [Running the Application](#running-the-application) below.

---

## Environment Variables

All environment variables are loaded from `.env` at startup via `dotenv`.

| Variable | Required | Description | Where to find it |
|---|---|---|---|
| `PORT` | No | Port the Express server listens on. Defaults to `3000` if omitted. | Set to any available port |
| `SUPABASE_URL` | Yes | Your Supabase project URL | Supabase Dashboard → Project Settings → API → Project URL |
| `SUPABASE_SERVICE_ROLE_KEY` | Yes | Service role key (bypasses Row Level Security — server-side only) | Supabase Dashboard → Project Settings → API → service_role key |
| `SUPABASE_JWT_SECRET` | Yes | Used to verify admin JWTs on protected routes | Supabase Dashboard → Project Settings → API → JWT Secret |

**Example `.env`:**

```env
PORT=3000
SUPABASE_URL=https://xxxxxxxxxxxxxxxxxxx.supabase.co
SUPABASE_SERVICE_ROLE_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
SUPABASE_JWT_SECRET=your-jwt-secret-here
```

> The `SUPABASE_SERVICE_ROLE_KEY` has full database access. Keep it secret and never expose it in frontend code.

---

## Running the Application

### Development Mode (recommended)

Uses `nodemon` — the server restarts automatically whenever you save a backend file.

```bash
npm run dev
```

### Production Mode

```bash
npm start
```

### Open in Browser

Once the server is running, open:

```
http://localhost:3000
```

The Express server serves the `public/` folder as static files, so all HTML pages are accessible directly:

| Page | URL |
|---|---|
| Home | `http://localhost:3000/` |
| Game | `http://localhost:3000/game.html` |
| Videos | `http://localhost:3000/videos.html` |
| About | `http://localhost:3000/about.html` |
| Sources | `http://localhost:3000/sources.html` |
| Admin | `http://localhost:3000/admin.html` |

---

## Project Structure

```
Ense_281_eco_discovery_app/
└── EcoDiscovery_Development/
    │
    ├── .env                          # Secret environment variables (gitignored)
    ├── package.json                  # npm scripts and dependency list
    │
    ├── backend/                      # Node.js / Express server (never sent to browser)
    │   ├── server.js                 # Entry point — starts Express, mounts routes
    │   ├── controllers/
    │   │   ├── authController.js     # Login, logout, session check
    │   │   ├── gameController.js     # Fetches animals + hints from Supabase
    │   │   ├── feedbackController.js # Saves feedback submissions to Supabase
    │   │   └── adminController.js    # Admin: read + delete feedback
    │   ├── middleware/
    │   │   └── authMiddleware.js     # Validates JWT on protected routes
    │   ├── models/
    │   │   ├── animalModel.js        # Supabase queries for animals and hints
    │   │   └── feedbackModel.js      # Supabase queries for feedback table
    │   ├── routes/
    │   │   ├── authRoutes.js         # POST /api/auth/login, POST /api/auth/logout
    │   │   ├── gameRoutes.js         # GET /api/animals, GET /api/hints
    │   │   ├── feedbackRoutes.js     # POST /api/feedback
    │   │   └── adminRoutes.js        # GET/DELETE /api/admin/feedback
    │   └── services/
    │       └── supabaseClient.js     # Initialises the Supabase JS client
    │
    └── public/                       # Static frontend (served by Express)
        │
        ├── index.html                # Home page
        ├── game.html                 # Game page
        ├── videos.html               # Videos page
        ├── about.html                # About page
        ├── sources.html              # Sources / citations page
        │
        ├── css/
        │   ├── main.css              # Global shared styles (nav, footer, typography, layout)
        │   ├── home.css              # Home page styles (hero, mascots, bubbles, how-to-play)
        │   ├── game.css              # Game page styles (sticker book, timer, scene, cards)
        │   ├── cursor-glow.css       # Custom glowing cursor trail effect
        │   ├── feedback.css          # Feedback modal styles
        │   └── admin.css             # Admin dashboard styles
        │
        ├── assets/
        │   └── images/               # All local image assets (PNGs)
        │       ├── Animals           walleye.png, crayfish.png, lake_sturgeon.png,
        │       │                     northen_pike.png, lake_whitefish.png, goldeye.png
        │       ├── Backgrounds       lake-ecosystem-bg.png, game_background.png, video_hero.png
        │       ├── Characters        Frog_explorer_1.png, Frog_explorer_2.png
        │       ├── UI / Icons        home-icon.png, Game-button.png, Videos-button.png,
        │       │                     About-Us-button.png, logo-fish.png, sticker-icon.png
        │       ├── Game assets       game_strip.png, time_sticker.png, trash_bin.png,
        │       │                     trash_1/2/3.png, trash_happy.png, bubble.png
        │       ├── TV screens        tv1.png – tv6.png
        │       └── Clouds / Birds    cloud1/2/3.png, Bird-hero.png, Bird-hero1/2.png
        │
        └── js/
            ├── app.js                # Home page entry point
            ├── game.js               # Game page entry point
            ├── videos.js             # Videos page entry point
            ├── about.js              # About page entry point
            ├── sources.js            # Sources page entry point
            ├── adminApp.js           # Admin page entry point
            ├── cursor-glow.js        # Cursor glow trail logic
            ├── feedback.js           # Feedback modal logic (global)
            │
            ├── controllers/
            │   ├── homeController.js     # Home page event handling
            │   ├── gameController.js     # Full game loop logic (guesses, hints, timer, reset)
            │   ├── videosController.js   # Video modal open/close
            │   ├── aboutController.js    # About page logic
            │   ├── sourcesController.js  # Sources page logic
            │   └── trashDrag.js          # Drag-and-drop trash mini-game
            │
            ├── models/
            │   ├── homeModel.js          # Static data for the home page
            │   ├── gameModel.js          # Animal list, card colors, game config
            │   ├── videosModel.js        # Video titles, descriptions, YouTube IDs
            │   ├── aboutModel.js         # Team member data
            │   └── sourcesModel.js       # Citation data
            │
            ├── views/
            │   ├── homeView.js           # Renders home page DOM (header, hero, mascots, footer)
            │   ├── gameView.js           # Renders game DOM; manages timer, danger mode, bonuses
            │   ├── videosView.js         # Renders TV cards and video modal
            │   ├── aboutView.js          # Renders about page DOM
            │   └── sourcesView.js        # Renders sources page DOM
            │
            ├── services/
            │   └── apiService.js         # Fetches /api/animals and /api/hints from backend
            │
            └── state/
                └── gameState.js          # Central game state (animals, hints, scores, timer ref)
```

---

## API Reference

All API endpoints are served by the Express backend at `http://localhost:3000`.

### Public Endpoints

| Method | Endpoint | Auth | Description |
|---|---|---|---|
| `GET` | `/api/animals` | None | Returns all active animals from Supabase |
| `GET` | `/api/hints` | None | Returns all hints, sorted by `hint_order` |
| `POST` | `/api/feedback` | None | Submits a user feedback entry |

#### `GET /api/animals` — Response
```json
[
  {
    "id": "uuid",
    "name": "Walleye",
    "slug": "walleye",
    "description": "...",
    "local_asset_key": "walleye.png",
    "icon_asset_key": "walleye-icon.png",
    "is_active": true
  }
]
```

#### `GET /api/hints` — Response
```json
[
  {
    "id": "uuid",
    "animal_id": "uuid",
    "hint_text": "I have sharp teeth and golden eyes...",
    "hint_order": 1
  }
]
```

#### `POST /api/feedback` — Request body
```json
{
  "name": "Alex",
  "role": "Student",
  "message": "This game was so fun!",
  "email": "alex@example.com",
  "rating": 5
}
```

---

### Auth Endpoints (rate-limited: 10 requests / 15 min per IP)

| Method | Endpoint | Auth | Description |
|---|---|---|---|
| `POST` | `/api/auth/login` | None | Logs in with Supabase credentials, returns JWT |
| `POST` | `/api/auth/logout` | JWT | Invalidates the current session |
| `GET` | `/api/auth/me` | JWT | Checks if the current session is valid |

---

### Admin Endpoints (JWT required)

| Method | Endpoint | Auth | Description |
|---|---|---|---|
| `GET` | `/api/admin/feedback` | JWT | Returns all feedback submissions |
| `DELETE` | `/api/admin/feedback/:id` | JWT | Deletes a specific feedback entry by ID |

---

## Architecture

This project follows the **MVC (Model-View-Controller)** pattern across both the frontend and backend.

```
Browser Request
      │
      ▼
  Express Server (backend/server.js)
      │
      ├── Static files ──────────────────► public/ (HTML, CSS, JS, images)
      │
      └── /api/* routes
            │
            ▼
        Backend Controllers
        (authController, gameController, feedbackController, adminController)
            │
            ▼
        Backend Models
        (animalModel, feedbackModel)
            │
            ▼
        Supabase Client ──────────────────► Supabase PostgreSQL Database


Frontend Flow (inside browser):
  Page HTML loads → entry point JS (app.js / game.js / etc.)
      │
      ▼
  Controller calls Model (static data) + apiService (live data)
      │
      ▼
  Controller passes data to View
      │
      ▼
  View renders DOM
      │
      ▼
  Controller attaches event listeners → user interactions loop back
```

### Key Design Decisions

- **No frontend framework** — the app uses only native browser APIs (DOM, fetch, ES modules). This keeps the codebase simple and avoids build tooling.
- **Backend owns all Supabase credentials** — the frontend never has direct database access. All data flows through `/api/*` endpoints.
- **Central game state** — `gameState.js` is the single source of truth for all runtime game data (animals loaded, cards solved, timer reference, hint progress). No data is duplicated across controllers.
- **Page-scoped CSS** — each page has its own stylesheet to prevent style leakage and keep files manageable.

---

## Game Mechanics

### Overview
The game presents 6 mystery sticker cards. Each card hides a Saskatchewan freshwater animal. The player reads progressive hints and clicks the matching fish in the animated lake scene.

### Turn Flow

```
1. Player clicks a mystery card
       ↓
2. First hint is revealed in the Fish Facts panel
       ↓
3. Player clicks a fish in the scene
       ↓
   ┌─ Correct ──────────────────────────────────────────────────────────┐
   │  Card flips and reveals the animal name + image (✓ green)          │
   │  Sticker book updates (counter, progress bar, stars)               │
   │  If all 6 done → timer stops → end-game overlay appears            │
   └────────────────────────────────────────────────────────────────────┘
       ↓
   ┌─ Wrong ────────────────────────────────────────────────────────────┐
   │  Card flashes red. Fish shakes.                                    │
   │  Next hint is unlocked.                                            │
   │  If all hints exhausted → card fails (✕ red), move to next card   │
   └────────────────────────────────────────────────────────────────────┘
```

### Timer
- Starts at **2:00 (120 seconds)** when the player presses Start
- At **1:00 remaining** → danger mode activates (yellow pulsing timer)
- At **0:30 remaining** → critical mode activates (red pulsing timer + urgency messages)
- At **0:00** → all unsolved cards auto-fail, end-game overlay appears
- Timer **stops immediately** when all 6 cards are resolved (win or fail)

### Trash Drag-and-Drop Bonus
- Sinking trash items appear in the lake scene during gameplay
- Dragging a trash item to the bin awards **+20 seconds** to the timer
- A bonus popup animation plays on successful drops

### Reset
- The Reset button (or the Restart button in the end overlay) shuffles animal assignments across all 6 cards
- Card colors are also reshuffled independently
- The timer restarts from 2:00

---

## Database Schema

All tables are hosted in Supabase (PostgreSQL).

### `animals`
| Column | Type | Description |
|---|---|---|
| `id` | uuid (PK) | Unique animal identifier |
| `name` | text | Display name (e.g. "Walleye") |
| `slug` | text | URL-safe identifier (e.g. "walleye") |
| `description` | text | Short educational description |
| `local_asset_key` | text | Filename of the local image (e.g. `walleye.png`) |
| `icon_asset_key` | text | Filename of the icon image |
| `is_active` | boolean | Whether this animal appears in the game |

### `hints`
| Column | Type | Description |
|---|---|---|
| `id` | uuid (PK) | Unique hint identifier |
| `animal_id` | uuid (FK → animals) | The animal this hint belongs to |
| `hint_text` | text | The hint displayed to the player |
| `hint_order` | integer | Display order (1 = first hint, shown earliest) |

### `feedback`
| Column | Type | Description |
|---|---|---|
| `id` | uuid (PK) | Unique feedback entry |
| `name` | text | Submitter's name |
| `role` | text | Student / Teacher / Parent / Other |
| `message` | text | Feedback message body |
| `email` | text (nullable) | Optional contact email |
| `rating` | integer (1–5) | Star rating |
| `created_at` | timestamptz | Auto-set on insert |

---

## Development Notes

### Adding or Changing Animals
1. Add the animal row to the `animals` table in Supabase
2. Add hint rows to the `hints` table linked to the new `animal_id`
3. Place the animal's image in `public/assets/images/`
4. Update `gameModel.js` if you need to change card colors

### Adding or Changing Videos
1. Find a YouTube video that **allows embedding** (test by opening `https://www.youtube.com/embed/VIDEO_ID` in a browser)
2. Copy the 11-character video ID from the YouTube URL
3. Update the `youtubeId` field in the relevant entry in `public/js/models/videosModel.js`

> YouTube Error 153 ("Video player configuration error") means the video owner has disabled embedding. The only fix is to use a different video ID.

### Security Reminders
- Never commit `.env` — it contains the Supabase service role key which has full database access
- The `SUPABASE_SERVICE_ROLE_KEY` is **server-side only** and is never sent to the browser
- Admin routes are protected by JWT middleware — a valid Supabase session token is required
- Login is rate-limited to 10 attempts per 15 minutes per IP to prevent brute-force attacks

### Running Without Node.js
If you only need to view the frontend (no Supabase data, no feedback), you can serve the `public/` folder with any static server:

```bash
# Python 3
cd EcoDiscovery_Development/public
python -m http.server 8000
# Open http://localhost:8000
```

The game cards will render but animal data will not load (no backend API available).

---

## Team

Built by students in **ENSE 281 — Introduction to Software Engineering**  
University of Regina — Winter 2026

| Name | Role |
|---|---|
| Rayansh Chowatia | Project Lead / Full-Stack Development |
| Aubin Izere | Frontend Development / UI & Animation |
| *(additional team members)* | *(roles)* |

---

*Eco Discovery © 2026 — University of Regina, ENSE 281*
