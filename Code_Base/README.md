# Eco Discovery — Developer Reference

This is the technical reference for the Eco Discovery codebase.
For the project overview, demo video, and team information see the [root README](../README.md).

---

## Table of Contents

1. [Tech Stack](#tech-stack)
2. [Architecture — MVC](#architecture--mvc)
3. [Folder Tree](#folder-tree)
4. [Pages & Features](#pages--features)
5. [Prerequisites](#prerequisites)
6. [Installation & Running](#installation--running)
7. [API Endpoints](#api-endpoints)
8. [Database Schema](#database-schema)
9. [Security Notes](#security-notes)

---

## Tech Stack

| Layer | Technology | Version |
|---|---|---|
| Frontend | HTML5, CSS3, Vanilla JavaScript (ES6 modules) | — |
| UI Fonts | Google Fonts — Nunito, Fredoka One | — |
| UI Icons | Font Awesome | 6.5.2 |
| Backend | Node.js + Express | Express 4.21.2 |
| Database | Supabase (PostgreSQL) | SDK 2.49.4 |
| Auth | Supabase Auth (JWT) | — |
| Security | Helmet (HTTP headers) | 8.0.0 |
| Rate Limiting | express-rate-limit | 7.5.0 |
| CORS | cors | 2.8.5 |
| Env Variables | dotenv | 16.5.0 |
| Dev Server | nodemon | 3.1.9 |

**No frontend framework** — the app uses a hand-rolled MVC pattern in vanilla JavaScript with ES6 modules. This keeps the browser bundle zero-dependency and gives full control over rendering, state, and animations.

---

## Architecture — MVC

The project follows a strict **Model-View-Controller** pattern on both the backend and the frontend.

```
Browser Request
      │
      ▼
  Express Server (server.js)
      │
      ├── Middleware: Helmet → CORS → JSON parser → Static files
      │
      ├── Routes  ──►  Controllers  ──►  Models  ──►  Supabase DB
      │                                                    │
      │                                              (PostgreSQL)
      │
      └── Static /public ──► HTML pages
                                  │
                                  ▼
                         JS Entry Point (app.js / game.js / ...)
                                  │
                         Controller (init, event handling)
                                  │
                    ┌─────────────┴─────────────┐
                    ▼                           ▼
                 Model                        View
           (static page data)          (DOM rendering)
                                             │
                                        gameState.js
                                    (central game state)
                                             │
                                       apiService.js
                                    (fetch from backend)
```

### Backend MVC

| Layer | Location | Responsibility |
|---|---|---|
| **Models** | `backend/models/` | Supabase query functions only — no business logic |
| **Controllers** | `backend/controllers/` | Request handling, validation, response shaping |
| **Routes** | `backend/routes/` | HTTP verb + path → controller mapping |
| **Middleware** | `backend/middleware/` | JWT Bearer token verification for protected routes |
| **Services** | `backend/services/` | Supabase client initialization (service role key) |

### Frontend MVC

| Layer | Location | Responsibility |
|---|---|---|
| **Models** | `public/js/models/` | Static page data objects (nav links, hero text, card data) |
| **Views** | `public/js/views/` | DOM rendering functions — generate all HTML strings and inject into page |
| **Controllers** | `public/js/controllers/` | Page init, event binding, game flow orchestration |
| **State** | `public/js/state/gameState.js` | Single source of truth for all runtime game state |
| **Services** | `public/js/services/apiService.js` | Fetch animals + hints from the Express backend |

Each HTML page has exactly one JS entry point that imports and calls its controller:

```
index.html  →  app.js  →  homeController.js  →  homeModel.js  +  homeView.js
game.html   →  game.js  →  gameController.js  →  gameModel.js  +  gameView.js  +  gameState.js  +  apiService.js
videos.html →  videos.js →  videosController.js →  videosModel.js + videosView.js
about.html  →  about.js  →  aboutController.js  →  aboutModel.js  +  aboutView.js
sources.html → sources.js → sourcesController.js → sourcesModel.js + sourcesView.js
admin.html  →  adminApp.js  (standalone — no model/view split, handles auth + CRUD directly)
```

---

## Folder Tree

```
Code_Base/
├── package.json                          # Project manifest, npm scripts, all dependencies
├── package-lock.json
├── .gitignore
│
├── backend/
│   ├── server.js                         # Express app entry point — middleware, routes, static serving (port 3000)
│   │
│   ├── controllers/
│   │   ├── adminController.js            # getFeedback(), deleteFeedback() — admin only
│   │   ├── authController.js             # login(), logout(), getMe()
│   │   ├── feedbackController.js         # submitFeedback() — public
│   │   └── gameController.js             # getAnimals(), getHints() — public
│   │
│   ├── middleware/
│   │   └── authMiddleware.js             # Verifies Bearer JWT via supabase.auth.getUser(), attaches req.user
│   │
│   ├── models/
│   │   ├── animalModel.js                # fetchActiveAnimals(), fetchAllHints()
│   │   └── feedbackModel.js              # insertFeedback(), listFeedback(), deleteFeedbackById()
│   │
│   ├── routes/
│   │   ├── adminRoutes.js                # GET /feedback, DELETE /feedback/:id  (mounted at /api/admin)
│   │   ├── authRoutes.js                 # POST /login (rate-limited), POST /logout, GET /me  (mounted at /api/auth)
│   │   ├── feedbackRoutes.js             # POST /feedback  (mounted at /api)
│   │   └── gameRoutes.js                 # GET /animals, GET /hints  (mounted at /api)
│   │
│   └── services/
│       └── supabaseClient.js             # Supabase SDK init with service role key — server-side only
│
└── public/                               # Static files served directly by Express
    ├── index.html                        # Home page
    ├── game.html                         # Game page
    ├── about.html                        # About Us page
    ├── sources.html                      # Sources/Citations page
    ├── videos.html                       # Educational Videos page
    ├── admin.html                        # Admin dashboard (login-gated)
    │
    ├── css/
    │   ├── main.css                      # Global styles: reset, nav, footer, container
    │   ├── home.css                      # Hero, birds, clouds, bubbles, CTA sparkles, wooden slates
    │   ├── game.css                      # Full game UI: layout, sticker cards, timer, creatures, trash, guide overlay (2224 lines)
    │   ├── about.css                     # Glassmorphic mission + values + team cards
    │   ├── sources.css                   # Source cards, swimming fish, video citation list
    │   ├── videos.css                    # TV frame gallery, lightbox modal, companion froggy
    │   ├── admin.css                     # Dark-theme login screen + dashboard, role badges, stats cards
    │   ├── feedback.css                  # Feedback modal overlay, star rating, success state
    │   └── cursor-glow.css              # Cursor sparkle trail (cs-sparkle keyframe)
    │
    ├── js/
    │   ├── app.js                        # Entry → homeController.initHomePage()
    │   ├── game.js                       # Entry → gameController.initGamePage()
    │   ├── about.js                      # Entry → aboutController.initAboutPage()
    │   ├── sources.js                    # Entry → sourcesController.initSourcesPage()
    │   ├── videos.js                     # Entry → videosController.initVideosPage()
    │   ├── adminApp.js                   # Standalone admin: auth flow, feedback table, delete, stats
    │   ├── feedback.js                   # Global feedback modal loaded on every page
    │   ├── cursor-glow.js               # Spawns sparkle dots near cursor (throttled, touch/motion aware)
    │   │
    │   ├── controllers/
    │   │   ├── homeController.js         # Calls renderHomePage(homePageData)
    │   │   ├── gameController.js         # Full game orchestration: 13 stages, event handlers, state machine (~800 lines)
    │   │   ├── aboutController.js        # Calls renderAboutPage(aboutPageData)
    │   │   ├── sourcesController.js      # Calls renderSourcesPage(sourcesPageData)
    │   │   ├── videosController.js       # Calls renderVideosPage(videosPageData)
    │   │   ├── gameGuide.js              # Froggy companion: 5-step guide overlay + persistent game state machine
    │   │   └── trashDrag.js              # Pointer-based drag-and-drop: trash → bin → +20s timer bonus
    │   │
    │   ├── models/
    │   │   ├── homeModel.js              # { header, hero (background, CTA), footer, cards[] }
    │   │   ├── gameModel.js              # { header, footer, 6 animal card slot colors }
    │   │   ├── aboutModel.js             # { header, hero, mission, values[3], team[4] }
    │   │   ├── sourcesModel.js           # { 6 fish sections with source links, 6 video citations }
    │   │   └── videosModel.js            # { hero TV images, 5 video objects (title, mp4, color, icon) }
    │   │
    │   ├── views/
    │   │   ├── homeView.js               # Renders header + animated hero (birds, clouds, mascot, CTA) + footer
    │   │   ├── gameView.js               # Renders game layout + timer system (startGameTimer, addTimerSeconds, danger/critical modes)
    │   │   ├── aboutView.js              # Renders header + glassmorphic mission/values/team + footer
    │   │   ├── sourcesView.js            # Renders header + fish source grid + video citation list + footer
    │   │   └── videosView.js             # Renders header + TV gallery + video modal + froggy guide + footer
    │   │
    │   ├── state/
    │   │   └── gameState.js              # Singleton: { animals, hintsByAnimal, shuffledCards, activeCardId,
    │   │                                 #   currentHintIndex, unlockedHints, solvedCards(Set), failedCards(Set),
    │   │                                 #   timerSeconds, gameStatus }
    │   │                                 # + assignAnimalsToCards(), getAnimalForCard()
    │   │
    │   └── services/
    │       └── apiService.js             # fetchGameData() — parallel fetch /api/animals + /api/hints, groups hints by animal_id
    │
    └── assets/
        ├── images/                       # 65 PNG assets
        │   ├── game_background.png       # Underwater scene
        │   ├── crayfish.png              # Clickable creature
        │   ├── goldeye.png               # Clickable creature
        │   ├── lake_sturgeon.png         # Clickable creature
        │   ├── lake_whitefish.png        # Clickable creature
        │   ├── northen_pike.png          # Clickable creature
        │   ├── trash_bin.png / trash_happy.png  # Drop zone (normal + active)
        │   ├── trash_1.png / trash_2.png / trash_3.png  # Draggable trash items
        │   ├── Frog_explorer_*.png       # Froggy mascot variants (guide, companion, end-game)
        │   ├── tv1.png – tv4.png         # TV frame images for videos page
        │   └── ...                       # Backgrounds, birds, clouds, UI chrome
        │
        └── videos/                       # 5 local educational MP4s
            ├── walleye-vid.mp4
            ├── fresheco-vid.mp4
            ├── sturg-vid.mp4
            ├── crayfish-vid.mp4
            └── rivdelta-vid.mp4
```

---

## Pages & Features

### 1. Home (`index.html`)

Landing page with an animated nature scene and Froggy the mascot.

- 3 animated flying birds + 2 drifting clouds in hero background
- Bubble burst animation on every page load (26 staggered bubbles)
- Froggy mascot speech bubble with entrance animation
- Golden pulsing "Start Exploring" CTA with 5 floating sparkles
- Wooden slate panels: "What You'll Learn" and "Your Mission"

---

### 2. Game (`game.html`)

The core interactive experience. Children pick mystery sticker cards, read hints, and click the matching creature in the animated underwater scene.

**13-stage game flow:**
1. Page shell renders — underwater scene + 6 mystery cards
2. Animals + hints fetched from backend in parallel
3. Animals randomly shuffled and assigned to card slots
4. Scene freezes — Froggy's 5-step guide overlay appears
5. User progresses through guide, clicks "Let's Play"
6. 2-minute countdown starts, scene unfreezes
7. User clicks a mystery card → first hint revealed
8. User clicks a creature in the scene:
   - **Correct** → card flips, sticker unlocked, all hints revealed, progress updates
   - **Wrong** → creature shakes, next hint unlocked (up to 3), red card flash
   - **All hints exhausted** → card marked failed with dimmed image + X
9. Repeat until all 6 cards are resolved
10. Timer expiry force-fails remaining unsolved cards
11. End screen: Froggy presents score + message + restart button

**Key mechanics:**
- **Hint pills** — 3 progressive pills per card; locked show placeholder, unlocked show text
- **Timer** — 120s countdown; danger mode at ≤60s (red + heartbeat); critical at ≤30s (faster pulse)
- **Trash bonus** — drag 3 sinking trash items to bin for +20s each; recovering above 60s exits danger mode
- **Froggy companion** — state machine: `start → pick-card → find-fish → celebrate → read-hint → next-card → complete`; pins to trash bin in danger mode
- **Progress** — counter `X / 6`, progress bar, and star indicators
- **Reset** — reshuffles animal assignments and card colors, clears all state, restarts timer

**Animals:**
| Animal | Card Color |
|---|---|
| Walleye | Blue |
| Lake Sturgeon | Dark green |
| Crayfish | Orange-red |
| Lake Whitefish | Teal |
| Goldeye | Gold |
| Northern Pike | Olive green |

---

### 3. Educational Videos (`videos.html`)

TV-themed gallery with 5 local educational videos.

- TV set mockup frames; click the screen to open video in lightbox modal
- Backdrop blurs while video plays; Escape or backdrop click closes modal
- Froggy corner guide companion with speech bubble

---

### 4. About Us (`about.html`)

Mission and team page with glassmorphic card design.

- Mission statement in glass card
- 3 value cards: Conservation, Play-Based Learning, Community
- Team grid: 4 members (ENSE 281 Group G)

---

### 5. Sources (`sources.html`)

Educational citations page.

- 6 fish-species cards with external source links (Frontenac Arch, Saskatchewan Polytechnic, USFWS, DFO, etc.)
- 6 video source cards linking to YouTube
- 2 animated swimming fish in the hero background

---

### 6. Admin Dashboard (`admin.html`)

Protected management interface for feedback.

- Email + password login (Supabase Auth, rate-limited to 10 req / 15 min)
- Token stored in `sessionStorage` (auto-clears on tab close)
- Stats row: total submissions, parents count, kids count, average star rating
- Feedback table: role badges, star ratings, expandable messages, per-row delete with live stat update
- All rendered content is XSS-sanitized via `escapeHtml()`

---

## Prerequisites

| Tool | Version | Notes |
|---|---|---|
| **Node.js** | v14 or higher | Includes npm |
| **npm** | v6 or higher | Bundled with Node.js |
| **Git** | Any | For cloning |
| **Supabase account** | — | Free tier works. Need: Project URL + Service Role Key |

**Supabase setup:**
1. Create a project at [supabase.com](https://supabase.com)
2. Create the three tables using the schema in the [Database Schema](#database-schema) section below
3. Populate `animals` and `animal_hints` with your data
4. Go to Project Settings → API and copy:
   - **Project URL** → `SUPABASE_URL`
   - **Service Role Key** (secret key, not the anon key) → `SUPABASE_SERVICE_ROLE_KEY`

---

## Installation & Running

### 1. Clone and enter the codebase

```bash
git clone https://github.com/Rayansh-Chowatia/Ense_281_eco_discovery_app.git
cd Ense_281_eco_discovery_app/Code_Base
```

### 2. Install dependencies

```bash
npm install
```

### 3. Create the `.env` file

Create a file named `.env` inside `Code_Base/` (same level as `package.json`):

```env
SUPABASE_URL=https://your-project-id.supabase.co
SUPABASE_SERVICE_ROLE_KEY=your-service-role-key-here
PORT=3000
NODE_ENV=development
```

> This file is already in `.gitignore`. Never commit it.

### 4. Start the server

**Development** (auto-restarts on file changes via nodemon):
```bash
npm run dev
```

**Production:**
```bash
npm start
```

Server starts at **http://localhost:3000**

### 5. Access the pages

| Page | URL |
|---|---|
| Home | http://localhost:3000 |
| Game | http://localhost:3000/game.html |
| Videos | http://localhost:3000/videos.html |
| About Us | http://localhost:3000/about.html |
| Sources | http://localhost:3000/sources.html |
| Admin Dashboard | http://localhost:3000/admin.html |

---

## API Endpoints

All endpoints are served from the Express server. The frontend communicates with these via `apiService.js` or inline `fetch()` calls.

### Authentication — `/api/auth`

| Method | Path | Auth Required | Rate Limit | Description |
|---|---|---|---|---|
| POST | `/api/auth/login` | No | 10 req / 15 min per IP | Login with email + password, returns JWT |
| POST | `/api/auth/logout` | Bearer JWT | No | Logout (stateless — client drops token) |
| GET | `/api/auth/me` | Bearer JWT | No | Verify token, returns `{ email }` |

**Login request body:**
```json
{ "email": "admin@example.com", "password": "yourpassword" }
```
**Login response:**
```json
{ "accessToken": "<jwt>", "email": "admin@example.com" }
```

---

### Game Data — `/api`

| Method | Path | Auth Required | Description |
|---|---|---|---|
| GET | `/api/animals` | No | Returns all animals where `is_active = true` |
| GET | `/api/hints` | No | Returns all hints ordered by `hint_order` ASC |

**Animal object shape:**
```json
{
  "id": "uuid",
  "name": "Walleye",
  "slug": "walleye",
  "local_asset_key": "walleye.png",
  "icon_asset_key": "walleye-icon.png",
  "is_active": true
}
```

**Hint object shape:**
```json
{
  "id": "uuid",
  "animal_id": "uuid",
  "hint_text": "I have large glassy eyes that help me see in murky water.",
  "hint_order": 1
}
```

---

### Feedback — `/api`

| Method | Path | Auth Required | Description |
|---|---|---|---|
| POST | `/api/feedback` | No | Submit a feedback entry |

**Request body:**
```json
{ "name": "Jane", "role": "parent", "message": "My kid loved it!", "email": "jane@example.com", "rating": 5 }
```

`name`, `role`, and `message` are required. `email` and `rating` are optional.

---

### Admin — `/api/admin`

| Method | Path | Auth Required | Description |
|---|---|---|---|
| GET | `/api/admin/feedback` | Bearer JWT | Returns all feedback, newest first |
| DELETE | `/api/admin/feedback/:id` | Bearer JWT | Deletes a feedback entry by UUID |

---

## Database Schema

Hosted on **Supabase (PostgreSQL)**. All queries run server-side using the service role key — it is never sent to the browser.

### `animals`

| Column | Type | Notes |
|---|---|---|
| `id` | UUID | Primary key |
| `name` | text | Display name, e.g. `"Walleye"` |
| `slug` | text | URL-safe identifier, e.g. `"walleye"` |
| `local_asset_key` | text | Image filename in `public/assets/images/` |
| `icon_asset_key` | text | Icon filename |
| `is_active` | boolean | Only `true` rows are returned by the game |

### `animal_hints`

| Column | Type | Notes |
|---|---|---|
| `id` | UUID | Primary key |
| `animal_id` | UUID | Foreign key → `animals.id` |
| `hint_text` | text | The hint shown to the player |
| `hint_order` | integer | 1 = shown first, 2 = after first wrong guess, 3 = after second |

### `feedback`

| Column | Type | Notes |
|---|---|---|
| `id` | UUID | Primary key |
| `name` | text | Submitter display name |
| `role` | text | `"parent"`, `"kid"`, `"teacher"`, or `"other"` |
| `message` | text | Feedback body |
| `email` | text | Optional |
| `rating` | integer | 1–5, optional |
| `created_at` | timestamp | Auto-set by Supabase on insert |

---

## Security Notes

- **Service role key** is used exclusively server-side via `supabaseClient.js`. It bypasses Supabase RLS and is never sent to the browser.
- **JWT authentication** is stateless. The access token is stored in `sessionStorage` (cleared automatically when the tab closes, not persisted across sessions).
- **Login rate limiting** — `express-rate-limit` allows max 10 login attempts per IP per 15 minutes. Exceeding this returns a 429 with a clear error message.
- **Helmet.js** sets secure HTTP response headers on every request. CSP is disabled to allow the inline styles used by the game UI.
- **Input validation** runs in every controller before any database call. Missing required fields return a 400 immediately.
- **XSS protection** — the admin dashboard sanitizes all user-generated content through `escapeHtml()` before injecting into the DOM.
- **CORS** is enabled only when `NODE_ENV !== 'production'`. In production the same-origin policy applies.
- **Error responses** never expose internal error details or stack traces to the client — only generic messages are sent; full errors are logged server-side via `console.error`.
