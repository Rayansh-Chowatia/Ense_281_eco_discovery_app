# Eco Discovery — Setup & Installation Guide

An interactive, browser-based educational web app for ENSE 281 at the University of Regina. It teaches children about Saskatchewan freshwater ecosystems through a timed card-matching game, educational videos, and an animal reference library.

> **Desktop only** — This application is designed and optimized exclusively for desktop screens (1024px and wider). It is not responsive and will not display correctly on mobile or tablet devices.

---

## Tech Stack

| Layer | Technology |
|---|---|
| Structure | HTML5 |
| Styling | CSS3 (custom — no framework) |
| Logic | Vanilla JavaScript (ES Modules) |
| Architecture | MVC (Model / View / Controller) |
| Backend / Database | Supabase (PostgreSQL REST API) |
| Auth | Supabase Auth (admin login via Supabase JS SDK) |
| Fonts | Google Fonts — Nunito, Fredoka One |
| Icons | Font Awesome 6 |
| Media | YouTube iframes (embedded via modal) |

No build tools, bundlers, or package managers are required. The project runs entirely in the browser using native ES module `import` statements.

---

## Pages

| Page | File | Description |
|---|---|---|
| Home | `index.html` | Landing page with hero section, how-to-play guide, and navigation |
| Game | `game.html` | Timed card-matching game with sticker book and progressive hint system |
| Videos | `videos.html` | Library of 6 educational YouTube videos displayed in animated TV-screen cards |
| About | `about.html` | About the project and the development team |
| Sources | `sources.html` | References and citations for all animal data and videos |
| Admin | `admin.html` | Password-protected dashboard to view and manage user feedback submissions |

A **Feedback modal** is also available globally on every page — triggered via the footer "Feedback" link. Users can submit their name, role, message, optional email, and a 1–5 star rating. All submissions are stored in Supabase.

---

## Requirements

Before running the project, make sure you have:

- A modern **desktop** browser — Chrome, Firefox, Edge, or Safari (latest version recommended)
- An active **internet connection** — required to load Google Fonts, Font Awesome icons, and Supabase game data
- A **local web server** — required because browsers block ES module imports from `file://` URLs (see options below)

**No Node.js, npm, or dependency installation is needed to run the app.**

---

## Running the Project

### Option 1 — VS Code Live Server (recommended, no install needed)

1. Install the [Live Server](https://marketplace.visualstudio.com/items?itemName=ritwickdey.LiveServer) extension in VS Code.
2. Open the `EcoDiscovery_Development/` folder in VS Code.
3. Right-click `public/index.html` in the Explorer panel and select **"Open with Live Server"**.
4. The app opens automatically at:
   ```
   http://127.0.0.1:5500/public/index.html
   ```

### Option 2 — Python built-in server

```bash
# Navigate to the public folder
cd EcoDiscovery_Development/public

# Python 3
python -m http.server 8000
```

Then open your browser at `http://localhost:8000`.

### Option 3 — Node.js `serve`

```bash
# Install serve globally (one-time setup)
npm install -g serve

# Navigate to the public folder and start the server
cd EcoDiscovery_Development/public
serve .
```

Then open your browser at the URL shown in the terminal (usually `http://localhost:3000`).

---

## Supabase Configuration

The game fetches live animal and hint data from a Supabase database at runtime. The credentials are stored in:

```
public/js/config.js
```

This file is **gitignored** and must be created locally before the game will work.

**Steps:**

1. Copy the example file:
   ```bash
   cp public/js/config.example.js public/js/config.js
   ```

2. Open `public/js/config.js` and fill in your Supabase project credentials (found under **Supabase Dashboard → Project Settings → API**):
   ```js
   export const SUPABASE_URL = "YOUR_SUPABASE_URL";
   export const SUPABASE_ANON_KEY = "YOUR_SUPABASE_ANON_KEY";
   ```

> Never commit `config.js` — it is gitignored to protect credentials.

---

## Project Structure

```
EcoDiscovery_Development/
└── public/
    ├── index.html              # Home page
    ├── game.html               # Game page
    ├── videos.html             # Videos page
    ├── about.html              # About page
    ├── sources.html            # Sources page
    │
    ├── css/
    │   ├── main.css            # Shared global styles (nav, footer, typography)
    │   ├── home.css
    │   ├── game.css
    │   ├── videos.css
    │   ├── about.css
    │   └── sources.css
    │
    ├── assets/
    │   └── images/             # All local image and icon assets
    │
    └── js/
        ├── config.js           # Supabase credentials (gitignored — create from config.example.js)
        ├── config.example.js   # Credential template
        ├── app.js              # Home page entry point
        ├── game.js             # Game page entry point
        ├── videos.js           # Videos page entry point
        ├── about.js            # About page entry point
        ├── sources.js          # Sources page entry point
        ├── controllers/        # Page logic — handles user events and orchestrates data + UI
        ├── models/             # Static data definitions
        ├── views/              # DOM rendering functions
        ├── services/           # Supabase API calls
        └── state/              # Game state management
```
