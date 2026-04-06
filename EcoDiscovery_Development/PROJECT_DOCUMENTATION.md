# EcoDiscovery — Project Documentation

> ENSE 281 — University of Regina
> A browser-based educational game that teaches children about Saskatchewan freshwater ecosystems.

---

## Table of Contents

1. [Pages](#1-pages)
2. [Tech Stack](#2-tech-stack)
3. [MVC Structure](#3-mvc-structure)
4. [Game Architecture & Logic](#4-game-architecture--logic)

---

## 1. Pages

The project has **4 live HTML pages** and **2 planned features** (Sources page + Feedback popup).

### 1.1 Home Page — `index.html`

**Entry point and landing page for the app.**

- Displays the Eco Discovery branding, hero background image, and a three-step "How to Play" guide (Explore Animals → Collect Stickers → Watch Videos).
- Features animated floating birds, clouds, and sparkle particles around the call-to-action button.
- Navigation bar links users to all other pages.
- Controller: `homeController.js` → View: `homeView.js` → Model: `homeModel.js`

---

### 1.2 Game Page — `game.html`

**The core interactive experience of the app.**

- A timed card-matching game where players select mystery sticker cards, read animal hint clues, then click the matching fish/creature in the lake scene.
- Includes a Sticker Book panel (right side) that fills as animals are correctly identified.
- Features a 120-second countdown timer, animated fish swimming in the scene, draggable trash items for bonus time (+20s), and an animated guide overlay.
- Controller: `gameController.js` → View: `gameView.js` → Model: `gameModel.js`
- Data: animal and hint data fetched from Supabase at runtime.

---

### 1.3 Videos Page — `videos.html`

**Educational YouTube video library.**

- Displays 6 educational videos in a 2×3 grid of animated TV screens.
- Each TV screen shows a video thumbnail; clicking opens a modal overlay with an embedded YouTube iframe (autoplay).
- Modal can be dismissed via ESC, clicking the close button, or clicking the backdrop.
- Controller: `videosController.js` → View: `videosView.js` → Model: `videosModel.js`

Videos include:
| # | Title | Topic |
|---|-------|-------|
| 1 | Meet the Freshwater Fish | Species overview |
| 2 | Life in a Saskatchewan Lake | Ecosystem |
| 3 | The Amazing Dragonfly | Insects |
| 4 | How Do Fish Breathe? | Biology |
| 5 | Protecting Our Waterways | Conservation |
| 6 | The Water Cycle Adventure | Environment |

---

### 1.4 About Us Page — `about.html`

**Team introduction and mission statement.**

- Presents the project mission, three core values (Conservation, Play-Based Learning, Community), and team member cards.
- Controller: `aboutController.js` → View: `aboutView.js` → Model: `aboutModel.js`

---

### 1.5 Sources Page *(planned)*

**Academic and media attribution page.**

- Will list all image, video, and data sources used in the project.
- Linked in the footer as `href: "#"` — to be implemented as a full HTML page.

---

### 1.6 Feedback Popup *(planned)*

**In-app user feedback form.**

- Will appear as a modal/overlay when the user clicks "Feedback" in the footer.
- Intended for users to submit reviews, suggestions, or bug reports without leaving the page.
- Linked in the footer as `href: "#"` — to be implemented as a modal overlay.

---

## 2. Tech Stack

### Frontend

| Technology | Version / Source | Usage |
|------------|-----------------|-------|
| **HTML5** | Native | Page structure and semantic markup for all 4 pages |
| **CSS3** | Native | Styling, animations, keyframes, custom properties (`--card-color`), flexbox layout |
| **JavaScript (ES6+)** | Native | Application logic, DOM manipulation, event handling, async/await, ES modules |
| **Google Fonts — Nunito** | CDN (fonts.googleapis.com) | Primary typeface across all pages (weights 400–900) |
| **Google Fonts — Fredoka One** | CDN (fonts.googleapis.com) | Timer display on game page |
| **Font Awesome 6.5.2** | CDN (cdnjs.cloudflare.com) | Icons (compass, trophy, etc.) used in UI elements |

### Backend / Database

| Technology | Usage |
|------------|-------|
| **Supabase** | Backend-as-a-Service (PostgreSQL database). Provides the REST API used to fetch animal and hint data at runtime. |
| **Supabase REST API** | Called directly via `fetch()` — no SDK used. Authenticated using an anon key passed in request headers. |

#### Supabase Tables

**`animals`** — Active freshwater animals in the game
| Column | Type | Description |
|--------|------|-------------|
| `id` | UUID | Primary key |
| `name` | string | Display name (e.g. "Walleye") |
| `slug` | string | URL-safe identifier (e.g. "walleye", "lake-sturgeon") — matches `data-animal-slug` on DOM elements |
| `local_asset_key` | string | Filename of the local image asset (e.g. "walleye.png") |
| `icon_asset_key` | string | Filename of the icon asset |
| `is_active` | boolean | Filters which animals appear in the game |

**`animal_hints`** — Clue text for each animal
| Column | Type | Description |
|--------|------|-------------|
| `id` | UUID | Primary key |
| `animal_id` | UUID | Foreign key → `animals.id` |
| `hint_text` | string | The actual clue text shown to the player |
| `hint_order` | number | Order hints are revealed (0 = first, ascending) |

#### How the Database is Linked

1. `config.js` exports `SUPABASE_URL` and `SUPABASE_ANON_KEY`.
2. `supabaseService.js` imports those credentials and constructs API headers.
3. `fetchGameData()` makes **two parallel REST calls**:
   - `GET /rest/v1/animals?is_active=eq.true&select=*`
   - `GET /rest/v1/animal_hints?select=*&order=hint_order.asc`
4. Hints are grouped by `animal_id` into a lookup map `{ [animalId]: [hint, hint, ...] }`.
5. `gameController.js` calls `fetchGameData()` and stores results in `gameState.js`.
6. Images are **never fetched from Supabase** — `getAnimalImagePath()` maps `local_asset_key` to a local `/assets/images/` path.

### No Framework / No Bundler

The project uses **vanilla JavaScript with ES6 modules** (`import`/`export`). There is no React, Vue, Angular, Webpack, or Vite — modules are loaded natively in the browser via `<script type="module">`.

---

## 3. MVC Structure

The project follows a **Model-View-Controller (MVC)** pattern, split into dedicated folders under `public/js/`.

### 3.1 Folder Structure

```
EcoDiscovery_Development/
├── public/
│   ├── index.html                      # Home page
│   ├── game.html                       # Game page
│   ├── videos.html                     # Videos page
│   ├── about.html                      # About page
│   │
│   ├── css/                            # 5 CSS files
│   │   ├── main.css                    # Global shared styles (reset, top-bar, footer)
│   │   ├── home.css                    # Home page styles
│   │   ├── game.css                    # Game page styles (largest — 1709 lines)
│   │   ├── videos.css                  # Videos page styles
│   │   └── about.css                   # About page styles
│   │
│   ├── js/                             # 26 JavaScript files
│   │   ├── app.js                      # Entry point → Home page
│   │   ├── game.js                     # Entry point → Game page
│   │   ├── videos.js                   # Entry point → Videos page
│   │   ├── about.js                    # Entry point → About page
│   │   ├── config.js                   # Supabase credentials (gitignored)
│   │   ├── config.example.js           # Template for config.js
│   │   │
│   │   ├── models/                     # 4 Model files
│   │   │   ├── homeModel.js
│   │   │   ├── gameModel.js
│   │   │   ├── videosModel.js
│   │   │   └── aboutModel.js
│   │   │
│   │   ├── views/                      # 4 View files
│   │   │   ├── homeView.js
│   │   │   ├── gameView.js
│   │   │   ├── videosView.js
│   │   │   └── aboutView.js
│   │   │
│   │   ├── controllers/                # 5 Controller files
│   │   │   ├── homeController.js
│   │   │   ├── gameController.js
│   │   │   ├── videosController.js
│   │   │   ├── aboutController.js
│   │   │   └── trashDrag.js            # Specialized drag-and-drop controller
│   │   │
│   │   ├── services/                   # 1 Service file
│   │   │   └── supabaseService.js      # Supabase REST API wrapper
│   │   │
│   │   └── state/                      # 1 State file
│   │       └── gameState.js            # Runtime game state singleton
│   │
│   └── assets/
│       └── images/                     # 48 image assets
│           ├── Animals: walleye.png, lake_sturgeon.png, crayfish.png,
│           │           lake_whitefish.png, goldeye.png, northen_pike.png
│           ├── UI: game_strip.png, time_sticker.png, icon_earth.png
│           ├── Navigation: Game-button.png, Videos-button.png, About-Us-button.png
│           ├── Birds: Bird-hero.png, Bird-hero1.png, Bird-hero2.png
│           ├── Backgrounds: lake-ecosystem-bg.png, video_hero.png, about-hero.png
│           └── Brand: logo-fish.png
│
└── .gitignore                          # Excludes config.js (Supabase credentials)
```

**Total: 41 code files (4 HTML + 5 CSS + 32 JS) + 48 image assets**

---

### 3.2 Models

Models hold **static data and configuration**. They do not fetch data or manipulate the DOM.

#### `homeModel.js`
- Exports: `homePageData`
- Contains: site name, header colors, nav links, hero section data (title, subtitle, 3 feature cards with step badges), footer config.

#### `gameModel.js`
- Exports: `gamePageData`
- Contains: header/footer config, and the `stickerBook.animals` array — 6 animals with their display name and card color:

| Animal | Card Color |
|--------|-----------|
| Walleye | `#f9a8d4` (pink) |
| Lake Sturgeon | `#93c5fd` (blue) |
| Crayfish | `#fcd34d` (yellow) |
| Lake Whitefish | `#86efac` (green) |
| Goldeye | `#c4b5fd` (purple) |
| Northern Pike | `#fdba74` (orange) |

- Note: This is the *shell* data. Actual animal hints and slugs come from Supabase.

#### `videosModel.js`
- Exports: `videosPageData`
- Contains: 6 video objects, each with `title`, `description`, `category`, `color`, `icon`, and `youtubeId`.

#### `aboutModel.js`
- Exports: `aboutPageData`
- Contains: mission statement, 3 value objects (title, icon, color, description), team member array (name, role), footer config.

---

### 3.3 Views

Views **receive data and produce HTML** injected into the DOM. They do not contain business logic.

#### `homeView.js` (~164 lines)
- Exports: `renderHomePage(data)`
- Renders: header (top bar + nav), hero section with animated background, 3 feature cards, CTA button with 5 floating sparkle particles, footer.

#### `gameView.js` (~330 lines)
- Exports: `renderGamePage(data)`, `startGameTimer(duration, callback)`, `addTimerSeconds(bonus)`, `showTimerBonus()`, `stopDangerMode()`
- Renders: full game layout — HUD strip, game scene with animals/birds/trash, sticker book panel, mystery cards, hint pills, timer display.
- Manages: timer countdown interval, danger mode CSS classes, critical mode CSS classes, guide message alternation.

#### `videosView.js` (~189 lines)
- Exports: `renderVideosPage(data)`
- Renders: header, hero, 2×3 TV grid, video modal overlay.
- Contains: `renderVideoModal()`, `initVideoModal()` for iframe embedding and keyboard/click controls.
- Security: `escapeHtml()` and `safeYoutubeId()` helpers to prevent XSS.

#### `aboutView.js` (~119 lines)
- Exports: `renderAboutPage(data)`
- Renders: header, hero background, mission section, 3 value cards, team member cards with avatar icons.

---

### 3.4 Controllers

Controllers **orchestrate the Model and View**, handle user input, and manage state.

#### `homeController.js` (~6 lines)
- Exports: `initHomePage()`
- Logic: Imports `homePageData` → calls `renderHomePage(data)`. Minimal — home page has no interactive state.

#### `gameController.js` (~557 lines) — most complex
- Exports: `initGamePage()` (async)
- Initialization flow:
  1. Render static game shell via `renderGamePage()`
  2. Freeze scene, attach button handlers
  3. Fetch animals + hints from Supabase (`fetchGameData()`)
  4. Shuffle animals into card positions (`assignAnimalsToCards()`)
  5. Attach creature click handlers
  6. Wait for user to press Start
- Manages: card selection, creature matching, hint progression, correct/wrong/failure states, timer expiry, end overlay, reset flow.

#### `videosController.js` (~7 lines)
- Exports: `initVideosPage()`
- Logic: Imports `videosPageData` → calls `renderVideosPage()` (which internally initializes the modal).

#### `aboutController.js` (~7 lines)
- Exports: `initAboutPage()`
- Logic: Imports `aboutPageData` → calls `renderAboutPage()`.

#### `trashDrag.js` (~92 lines)
- Exports: `initTrashDrag()`
- Implements pointer-based drag-and-drop for sinking trash items to the trash bin.
- On successful drop: fades out trash item, calls `addTimerSeconds(20)`, triggers "+20s" popup.
- Uses Pointer Events API (supports touch and pen, not just mouse).
- Called from `gameController.initGamePage()`.

---

### 3.5 Services & State

#### `supabaseService.js` (~42 lines)
- Exports: `fetchGameData()`, `getAnimalImagePath(animal)`
- The **only module that communicates with Supabase**.
- `fetchGameData()`: Parallel `fetch()` calls to `animals` and `animal_hints` tables → groups hints by `animal_id` → returns `{ animals, hintsByAnimal }`.
- `getAnimalImagePath(animal)`: Maps `local_asset_key` → `./assets/images/{key}`.

#### `gameState.js` (~61 lines)
- Exports: `gameState` (singleton object), `assignAnimalsToCards(animals)`, `getAnimalForCard(cardIndex)`
- Central runtime state store for the game session:

| Property | Type | Description |
|----------|------|-------------|
| `animals` | Array | Supabase animal records |
| `hintsByAnimal` | Object | `{ animalId: [hint, ...] }` lookup map |
| `shuffledCards` | Array | Card index → animal mapping |
| `activeCardId` | string/null | Currently selected card's index |
| `activeAnimalId` | string/null | Supabase ID of animal on active card |
| `currentHintIndex` | number | How many hints have been revealed this turn |
| `unlockedHints` | Array | Hint texts revealed so far this turn |
| `solvedCards` | Set | Card indices the player solved correctly |
| `failedCards` | Set | Card indices the player failed |
| `gameStatus` | string | `"idle"` / `"playing"` / `"complete"` |

- `assignAnimalsToCards()`: Shuffles the Supabase animals array and stamps `data-animal-id` on each card DOM element.
- No localStorage — state resets on page reload.

---

### 3.6 How MVC Layers Communicate

```
HTML Page
    ↓ loads entry script (app.js / game.js / ...)
Controller
    ↓ imports Model data
Model → Controller: static page data object
    ↓ passes data to View
View → DOM: injects HTML string into page containers
    ↓ user interaction (click)
Controller: reads DOM data attributes, updates gameState, calls View functions
View → DOM: updates classes, text, timer display
    ↑ (for game) Supabase data loaded async
supabaseService → Controller → gameState → View
```

No event bus or central router. Navigation between pages uses standard `<a href>` links. Each page is a self-contained MVC unit.

---

## 4. Game Architecture & Logic

### 4.1 Game Overview

EcoDiscovery Game is a **timed hint-based card-matching game**:
- 6 mystery sticker cards, each secretly assigned a Saskatchewan freshwater animal.
- Player selects a card → reads a hint → clicks the matching fish in the lake scene.
- Correct: card flips and reveals the animal. Wrong: shake animation, next hint unlocks.
- 120-second timer. All cards solved/failed or timer expiry ends the game.

---

### 4.2 Initialization Chain

```
game.html
  └── game.js
        └── initGamePage()  [gameController.js]
              ├── renderGamePage()         → injects full game HTML
              ├── Freeze scene             → game-scene--frozen class
              ├── initTrashDrag()          → wires drag-drop handlers
              ├── attachCardClickHandlers()→ card selection logic
              ├── Wire Reset/Debug buttons
              ├── attachStartButton()      → start timer + unfreeze on click
              └── fetchGameData()  [async] → Supabase animals + hints
                    ├── assignAnimalsToCards() → shuffle + stamp data-animal-id
                    └── attachCreatureClickHandlers() → fish click logic
```

---

### 4.3 Functions in `gameController.js`

#### UI Update Helpers

| Function | Line | Description |
|----------|------|-------------|
| `updateGuide(message)` | 9 | Updates the purple guide overlay text (`#guide-message`) |
| `updateFishFacts(text)` | 14 | Updates the hint/fish-facts text box (`#fish-facts-text`) |
| `updateCounter()` | 19 | Recalculates and renders the sticker count, progress bar width, and lit stars |
| `renderHintHistory()` | 34 | Re-renders the 3 hint pills — locked (placeholder) or unlocked (hint text) |

#### Animation Helpers

| Function | Line | Description |
|----------|------|-------------|
| `pauseCardPulse()` | 51 | Sets `animationPlayState: paused` on all cards |
| `resumeCardPulse()` | 57 | Resumes pulse only on unsolved/unfailed cards |
| `shakeCreature(slug)` | 65 | Adds `game-creature--shake` CSS class; removes on `animationend` |
| `syncFeedbackColor(card)` | 73 | Copies `--card-color` from selected card to `--active-card-color` on the hint area |

#### Game Flow Functions

| Function | Line | Description |
|----------|------|-------------|
| `attachCardClickHandlers()` | 82 | Attaches click handlers to all 6 sticker cards. Selecting an unsolved card sets `gameState.activeCardId/activeAnimalId`, loads first hint, and pauses card pulse. Clicking a solved/failed card replays all its hints for review. |
| `attachCreatureClickHandlers()` | 144 | Attaches click handlers to all `.game-creature` elements. Compares clicked creature's slug to `gameState.activeAnimalId`. Routes to `handleCorrectGuess()` or `handleWrongGuess()`. |
| `handleCorrectGuess()` | 165 | Flips the active card to solved state. Reveals animal name, image, and green ✓. Adds to `solvedCards` Set. Calls `updateCounter()`. Checks if all cards are done → `showEndOverlay()`. |
| `handleWrongGuess(slug)` | 206 | Shakes the wrong creature. Flashes card red. If hints remain → reveals next hint. If no more hints → calls `handleFailure()`. |
| `handleFailure()` | 237 | Flips card to failed state. Shows dimmed animal image and red ✕. Adds to `failedCards` Set. Checks completion. |
| `handleTimerExpiry()` | 363 | Called at 0:00. Cancels active selection. Force-fails all remaining cards. Calls `showEndOverlay()` after 600ms delay. |
| `showEndOverlay()` | 314 | Freezes scene. Calculates score message based on % solved. Renders overlay with final count and Restart button. |
| `handleReset()` | 416 | Clears all state. Restores all cards to mystery. Restarts timer. Plays shuffle animation. Reshuffles colors and animal assignments. |
| `attachStartButton()` | 476 | Wires the Start button: unfreezes scene, starts 120s timer, animates overlay out. |
| `initGamePage()` | 504 | **Async entry point.** Orchestrates full initialization sequence (see 4.2). |

#### Reset Helpers

| Function | Line | Description |
|----------|------|-------------|
| `shuffleColors()` | 282 | Returns a shuffled copy of the 6 card colors array |
| `applyShuffledColors(colors)` | 287 | Applies `--card-color` CSS variable to each card and default hint pill colors |
| `playShuffleAnimation()` | 297 | Returns a Promise that resolves when all 6 cards finish their shuffle animation |

---

### 4.4 Functions in `gameView.js`

#### Render Functions

| Function | Line | Description |
|----------|------|-------------|
| `renderGamePage(data)` | 1 | Top-level orchestrator — calls `renderHeader`, `renderHero`, `renderFooter` |
| `renderHeader(header, siteName)` | 7 | Injects top bar + nav bar HTML into `#site-header` |
| `renderHero(navBarColor, game)` | 39 | Injects the full game layout (HUD strip, game scene, sticker book panel) into `#hero-section` |
| `renderFooter(footer)` | 325 | Injects footer HTML into `#site-footer` |

#### Timer Functions

| Function | Line | Description |
|----------|------|-------------|
| `_fmt(s)` | 214 | Internal helper — converts seconds to `MM:SS` string |
| `startGameTimer(duration, onExpire)` | 217 | Starts a 1-second interval countdown. At 60s → `_activateDangerMode()`. At 30s → `_activateCriticalMode()`. At 0s → calls `onExpire()` callback. |
| `addTimerSeconds(bonus)` | 254 | Adds bonus seconds to the running timer and updates the display |
| `showTimerBonus(label)` | 261 | Triggers a "+20s" floating text animation above the timer |
| `_activateDangerMode()` | 273 | Adds `timer-danger`, `guide-urgent`, `trash-urgent` CSS classes. Starts guide message alternation cycle. |
| `_activateCriticalMode()` | 287 | Upgrades to `timer-critical` and `guide-critical` classes (faster heartbeat animation). |
| `_startGuideAlternation()` | 294 | Cycles guide message every 5s: shows trash urgency message for 4s, then restores original. |
| `stopDangerMode()` | 313 | Clears all danger/critical classes and guide alternation intervals. Called on reset. |

---

### 4.5 Fish & Creature Animations (CSS)

All fish are positioned **absolutely** within `.game-scene`, use `cursor: pointer`, and have `z-index: 3`. Each fish has two independent animations: one for **movement** and one for **floating/bobbing**.

#### Fish Movement

| Fish | CSS Class | Width | Animation | Duration | Vertical Zone | Behavior |
|------|-----------|-------|-----------|----------|---------------|----------|
| Crayfish | `.game-crab` | clamp(60–100px) | `crabWalk` + `crabBob` | 32s + 1.4s | bottom 6% | Walks left→right, turns at 50%, bobs up/down 5px |
| Walleye | `.game-fish` | clamp(116–187px) | `fishDive` | 20s | bottom 10–26% | Mid-speed diagonal swimmer, flips at 50% |
| Lake Sturgeon | `.game-fish2` | clamp(138–231px) | `fishSwimDeep` | 42s | bottom 8–10% | Largest fish, slow deep glide near riverbed |
| Lake Whitefish | `.game-fish3` | clamp(101–160px) | `whitefishSwim` | 32s (+3s delay) | bottom 14–24% | Slow arcing path in lower-middle zone |
| Goldeye | `.game-fish4` | clamp(78–130px) | `goldeyeDart` | 14s (+1s delay) | bottom 36–44% | Smallest and fastest — nimble darting motion |
| Northern Pike | `.game-fish5` | clamp(130–209px) | `pikeStalk` | 15s (+8s delay) | bottom 28–34% | Large predator, aggressive fast passes |

#### Fish Interactions

- **Hover:** `scale(1.14)`, white glow `drop-shadow`, `brightness(1.15)` — telegraphs clickability.
- **Wrong click → Shake:** `game-creature--shake` adds `fishShake` keyframe — translates ±8px left/right with a red glow filter, lasts 0.45s, auto-removes on `animationend`.
- **Frozen state:** When `.game-scene--frozen` is on the scene container, all creatures get `animation-play-state: paused` and `opacity: 0`.

#### Birds

Three birds fly across the scene independently, each with a movement animation and a continuous flapping animation:

| Bird | CSS Class | Width | Fly Animation | Flap Animation | Direction |
|------|-----------|-------|--------------|---------------|-----------|
| Bird 1 | `.game-bird-1` | clamp(32–52px) | `gameBirdFly1` 28s | `gameBirdFlap1` 0.7s | Left → Right |
| Bird 2 | `.game-bird-2` | clamp(24–42px) | `gameBirdFly2` 35s (+5s delay) | `gameBirdFlap2` 0.6s | Right → Left (flipped via `scaleX(-1)`) |
| Bird 3 | `.game-bird-3` | clamp(18–32px) | `gameBirdFly3` 40s (+12s delay) | `gameBirdFlap3` 0.8s | Left → Right |

---

### 4.6 Sticker Cards (CSS)

Cards are laid out in a 3×2 grid inside `.sb-sticker-grid`. Each card has a `--card-color` CSS custom property applied inline.

#### Card States

| State | CSS Class | Visual |
|-------|-----------|--------|
| Mystery (default) | — | Pulsing card-color face, "?" mark, sparkles, "Click for a hint!" label |
| Active (selected) | `sb-card--active` | Scale 1.12, persistent double glow using `--card-color` |
| Wrong flash | `sb-card--wrong-flash` | Red drop-shadow + slight left/right shake, 0.42s |
| Solved | `sb-card--flipped` + `sb-card--solved` | Flips open (0.48s cubic-bezier spring), green border, checkmark, animal image |
| Failed | `sb-card--flipped` + `sb-card--failed` | Flips open, red border, dimmed image (brightness 0.55), red ✕ |
| Shuffling (reset) | `sb-card--shuffling` | Scale + rotate bounce 0.55s, staggered 60ms per card |

#### Card Glow Animation

Cards sequentially glow using `cardSequentialGlow` — each card has a `1.2s` glow slot staggered by `1.2s × card index`. The glow uses `drop-shadow(0 0 12px var(--card-color))` and peaks at `scale(1.09)`. On grid hover, all animations pause; on individual card hover, `hoverCardGlow` takes over (scale 1.13–1.17, infinite).

#### Hint Pills

Three pills inside the hint history panel, colored with `--active-card-color` (inherits from selected card):
- **Locked:** Shows "Hint 1/2/3" in dark brown text.
- **Unlocked:** `hint-pill--unlocked` class — reveals hint text with `pillReveal` bounce-in animation (0.38s cubic-bezier).
- Pills auto-clear on new card selection or game reset.

---

### 4.7 Timer & Danger System (CSS)

| Threshold | Mode | CSS Classes Added | Animation |
|-----------|------|-----------------|-----------|
| 60s remaining | Danger | `timer-danger`, `guide-urgent`, `trash-urgent` | Slow red glow pulse (1.8s), guide slow pulse (1.5s), trash breathe+shake (2.4s) |
| 30s remaining | Critical | `timer-critical`, `guide-critical` | Fast heartbeat (0.75s cubic-bezier), guide fast pulse (0.55s) with red border |

Guide message also **alternates every 5s** during danger mode, cycling between the original hint prompt and "Put trash in the bin for more time! ♻️".

---

### 4.8 Trash Drag Mechanic

Implemented in `trashDrag.js` using the **Pointer Events API** (works with mouse, touch, and pen):

1. `pointerdown` on `.sinking-trash` → captures pointer, creates a ghost clone element.
2. `pointermove` → moves ghost clone; if pointer is over `#trash-drop-zone`, bin gets `.bin-active` (happy face + bounce animation).
3. `pointerup` over bin → trash fades out (`.trash-consumed`), `addTimerSeconds(20)` called, "+20s" popup shown.
4. `pointerup` off bin → ghost clone removed, drag cancelled.

The trash items themselves sink from top to bottom using `trashSink` keyframes (7–8s, staggered starts). In danger mode, they additionally pulse with a green glow via `.trash-urgent`.

---

### 4.9 Game Flow (Step by Step)

```
1. Page loads → static UI renders → scene frozen → "Press ▶ Start" shown
2. User clicks Start → 120s timer starts → scene unfreezes → cards pulse
3. User clicks mystery card → card scales up, glows → first hint loads in hint area
4. User clicks a fish in the scene:
     ┌── CORRECT → card flips (spring animation) → reveals animal name/image/✓
     │             → counter +1 → resume card pulse
     └── WRONG   → creature shakes → next hint unlocks in pill
                   ┌── more hints → guide says "try again"
                   └── no hints left → card flips with ✕ (failure state)
5. At 60s → danger mode activates (red pulsing timer, alternating guide message)
6. At 30s → critical mode (heartbeat animation, red border on guide)
7. Drag trash to bin → +20s bonus, green popup
8. All 6 cards solved/failed → end overlay appears with score
   OR timer hits 0:00 → remaining cards auto-fail → end overlay
9. User clicks Restart → shuffle animation → new animal assignments → timer reset
```

---

### 4.10 CSS File Reference

| File | Lines | Covers |
|------|-------|--------|
| `main.css` | ~115 | CSS reset, Nunito font, `.container` width, `.top-bar`, `.top-bar-text`, `.site-footer`, footer layout |
| `home.css` | ~500+ | Nav bar, hero background, sparkle particles, feature cards, CTA button, responsive breakpoints |
| `game.css` | ~1709 | Everything game-related: layout, HUD strip, timer, all fish/bird animations, sticker book panel, cards, hint pills, guide overlay, trash drag, danger/critical modes, end overlay, responsive |
| `videos.css` | ~300+ | Nav bar, hero section, TV grid layout, YouTube thumbnails, play button, video modal, backdrop blur |
| `about.css` | ~300+ | Hero image, mission section, value cards, team member cards, gradient backgrounds |
