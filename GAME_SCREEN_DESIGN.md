# Game Screen Design — Eco Discovery

## Reference Design Overview

The target game screen (from the reference screenshot) is a two-panel layout with a HUD strip
at the top. It should feel like a kids' educational game app — warm, illustrated, notebook-themed,
and full of life. Think PBS Kids / National Geographic Kids meets a cozy sticker book.

---

## Screen Layout

```
┌──────────────────────────────────────────────────────────────────────┐
│  🌍  Play and Save the Planet!                     ⏱ TIME LEFT 04:58 │  ← HUD Strip (full-width golden bar)
├────────────────────────────────────┬─────────────────────────────────┤
│  🔷 Ecosystem Discovery App        │  ○ ○ ○ ○ ○ ○ ○ ○ ○ ○ ○ ○ ○ ○  │  ← Spiral binding
│  Explore the freshwater ecosystem… │ ┌───────────────────────────────┐│
│ ┌──────────────────────────────┐   │ │  📚 Sticker Book!         🐞  ││  ← Header
│ │                              │   │ ├───────────────────────────────┤│
│ │   [ Game Scene Illustration ]│   │ │  💡 Hint                      ││  ← Purple button
│ │   [ Animated Birds / Fish   ]│   │ │  📖 Fish Facts                ││  ← Green button
│ │   [ Walking Crab            ]│   │ ├───────────────────────────────┤│
│ │                              │   │ │  Your Collection    0 / 6     ││  ← Counter
│ └──────────────────────────────┘   │ │  [?] [?] [?]                  ││  ← Sticker grid
│          (70% width)               │ │  [?] [?] [?]                  ││
│                                    │ ├───────────────────────────────┤│
│                                    │ │  Great job!                   ││  ← Feedback area
│                                    │ │  Pick a mystery sticker first ││
│                                    │ ├───────────────────────────────┤│
│                                    │ │  [ Reset Sticker Book ]       ││  ← Orange button
│                                    │ └───────────────────────────────┘│
│                                    │          (30% width)             │
└────────────────────────────────────┴─────────────────────────────────┘
```

---

## Zone Breakdown

### Zone 1 — HUD Title Strip
A golden gradient bar that sits above the two-column layout inside the left game panel.

| Part | Description |
|---|---|
| Left deco | SVG illustration: a globe with green continent blobs + white/pink/yellow flowers and leaf stems |
| Center text | "Play and Save the Planet!" — bold dark brown, weight 900 |
| Right timer | Stopwatch icon + dark green pill capsule showing "TIME LEFT" label above and "04:58" countdown below |

---

### Zone 2 — Game Canvas (Left Panel, 70% width)

#### 2a. Scene Title Bar
A compact bar sitting between the HUD strip and the game scene image:
- Small earth/compass icon on the left
- Title: **"Ecosystem Discovery Application"** — small, bold, dark navy
- Subtitle: *"Explore the freshwater ecosystem and find the hidden creatures!"* — smaller, muted blue-grey

#### 2b. Game Scene
The main illustrated game area where creatures are discovered:
- Background image: richly illustrated freshwater river/lake ecosystem (`Game-page-image.png`)
- Decorative natural frame: the image itself includes a border of trees, vines, and foliage
- The scene container has a subtle rounded border, slight drop shadow, and fills the remaining height

#### 2c. Animated Creatures (already implemented)
Creatures move continuously using CSS keyframe animations:

| Creature | Animation |
|---|---|
| Bird 1 | Flies left → right across top portion, slow flap |
| Bird 2 | Flies right → left, mirrored, slightly faster |
| Bird 3 | Flies left → right at lower altitude, slowest |
| Crab | Walks left ↔ right along river bank, bobs up/down |
| Fish 1 | Dives from river bed up to surface and back |
| Fish 2 | Long diagonal swim path across deeper water |

---

### Zone 3 — Sticker Book Panel (Right Panel, 30% width)

A notebook-themed side panel with warm parchment tones and hand-crafted feel.
Divided top-to-bottom into 6 sub-sections:

#### 3a. Spiral Binding
A decorative row of metallic ring shapes across the very top edge of the panel, simulating
a real spiral-bound notebook.

- ~14 evenly spaced oval/circle shapes
- Silver-grey gradient with a subtle highlight on top
- Sits on a warm tan background strip

#### 3b. Panel Header
Amber/golden gradient background strip immediately below the binding:
- **"Sticker Book!"** — large, weight 900, warm dark brown
- Small ladybug emoji decoration in the top-right corner for playfulness

#### 3c. Action Buttons
Two full-width pill-shaped buttons stacked vertically with icons:

**Hint Button (Purple)**
- Left: lightbulb icon (`fa-lightbulb`)
- Title: **"Hint"**
- Subtitle: *"Select a mystery sticker to get a fun hint!"*
- Background: purple gradient (`#9b59b6` → `#7d3c98`)

**Fish Facts Button (Green)**
- Left: open book icon (`fa-book-open`)
- Title: **"Fish Facts"**
- Subtitle: *"Click a fish to unlock facts in your Sticker Book!"*
- Background: green gradient (`#27ae60` → `#1e8449`)

Both buttons have a white icon, white title, and slightly transparent white subtitle text.
On hover: lift up 2px with slight brightness increase.

#### 3d. Your Collection
The sticker collection area:

- **Header row**: "Your Collection" label (left) + "0 / 6 found" counter (right)
- **Grid**: 3 columns × 2 rows = 6 mystery sticker slots

**Locked Sticker Card (mystery state):**
- Colored square card face with a glossy shine overlay
- Large white "?" centered on the card face
- "Mystery" label below in small dark text
- "Click for a hint!" in even smaller italic text beneath that
- On hover: spring scale-up (`cubic-bezier(0.34, 1.56, 0.64, 1)`)
- Focus ring for keyboard accessibility

The 6 card colors (one per animal, from the model data):

| Slot | Animal | Card Color |
|---|---|---|
| 1 | Lake Sturgeon | Soft pink `#f9a8d4` |
| 2 | Yellow Perch | Soft blue `#93c5fd` |
| 3 | Mallard Duck | Soft yellow `#fcd34d` |
| 4 | Beaver | Soft green `#86efac` |
| 5 | Dragonfly | Soft lavender `#c4b5fd` |
| 6 | Painted Turtle | Soft orange `#fdba74` |

#### 3e. Feedback Area
A small light-toned box with rounded corners between the sticker grid and the reset button:
- **"Great job!"** heading in bold green
- Feedback message body text — updates dynamically based on user actions
- Default message: *"Pick a mystery sticker first to get hint!"*
- Background: very light warm white (`#fff8ee`) with a tan border

#### 3f. Reset Button
A full-width rounded button at the very bottom of the panel:
- Text: **"Reset Sticker Book"**
- Background: orange gradient (`#f97316` → `#ea6008`)
- White text, weight 800
- On hover: lift + brightness increase
- Has a warm orange drop shadow beneath

---

## Color Palette

| Element | Color | Hex |
|---|---|---|
| HUD strip | Golden gradient | `#f7d93c` → `#f0bc10` |
| HUD strip border | Amber | `#c9960a` |
| Timer pill | Dark forest green | `#1a5c4a` |
| Panel background | Warm parchment | `#fef9ef` |
| Panel left border | Warm tan | `#d4a96a` |
| Spiral binding bg | Muted tan | `#d4b896` |
| Spiral dot | Silver gradient | `#e0e0e0` → `#bdbdbd` |
| Panel header | Amber gradient | `#f5c842` → `#e8a020` |
| Panel header border | Deep amber | `#c98010` |
| Hint button | Purple gradient | `#9b59b6` → `#7d3c98` |
| Fish Facts button | Green gradient | `#27ae60` → `#1e8449` |
| Feedback area bg | Warm white | `#fff8ee` |
| Feedback area border | Tan | `#e8d5b0` |
| Feedback title | Forest green | `#2e7d32` |
| Feedback text | Warm brown | `#5c3d1e` |
| Reset button | Orange gradient | `#f97316` → `#ea6008` |
| Collection label | Dark warm brown | `#4a3018` |
| Collection counter | Medium brown | `#7a5030` |
| Scene title text | Dark navy | `#1a3a5c` |
| Scene subtitle text | Muted blue-grey | `#4a6a8a` |
| Scene title bar bg | Near-white | `rgba(255,255,255,0.9)` |

---

## Typography

All text uses **Nunito** (Google Fonts — already loaded on home page, needs adding to `game.html`).

| Element | Size | Weight | Style |
|---|---|---|---|
| HUD strip title | `clamp(0.85rem, 1.3vw, 1.1rem)` | 900 | Normal |
| Timer label | `0.58rem` | 700 | Uppercase, tracked |
| Timer value | `1.05rem` | 900 | Tabular nums |
| Scene title | `0.82rem` | 800 | Normal |
| Scene subtitle | `0.7rem` | 600 | Normal |
| Panel header title | `1.2rem` | 900 | Normal |
| Button title | `0.88rem` | 800 | Normal |
| Button subtitle | `0.68rem` | 600 | Normal |
| Collection label | `0.82rem` | 700 | Normal |
| Collection counter | `0.72rem` | 600 | Normal |
| Card name | `0.62rem` | 700 | Normal |
| Card hint label | `0.55rem` | 600 | Italic |
| Feedback title | `1rem` | 800 | Normal |
| Feedback text | `0.78rem` | 600 | Normal |
| Reset button | `0.88rem` | 800 | Normal |

---

## Animations — Full Inventory

### Existing (Already Implemented)
| Name | Target | Description |
|---|---|---|
| `gameBirdFly1/2/3` | Birds | Linear left/right flight path across scene |
| `gameBirdFlap1/2/3` | Birds | Vertical scaleY oscillation (wing flap illusion) |
| `crabWalk` | Crab | Horizontal patrol across river bank, flip on turnaround |
| `crabBob` | Crab | Slight vertical bounce while walking |
| `fishDive` | Fish 1 | Diagonal dive from bed to surface and back |
| `fishSwimDeep` | Fish 2 | Long S-path swim across deeper water |

### To Be Added

#### Stage 2 — Sticker Panel UI
| Name | Target | Description |
|---|---|---|
| None needed | — | Panel is static UI; hover uses CSS `transition` only |

#### Stage 4 — Animal Click & Unlock
| Name | Target | Description |
|---|---|---|
| `cardUnlock` | Sticker card | Card flips/scales with golden glow burst when animal found |
| `glowPop` | Sticker card | Short radial glow emanates from unlocked card |
| `feedbackSlide` | Feedback text | New text fades + slides up when message changes |
| `hotspotPulse` | Animal hotspot | Soft ripple ring pulses on clickable creature |

#### Stage 5 — Hint System
| Name | Target | Description |
|---|---|---|
| `hintBounce` | Selected sticker | Card wiggles to confirm hint selection |
| `feedbackSlide` | Feedback text | Reused: hint text slides in |

#### Stage 8 — Timer Warning & Game Over
| Name | Target | Description |
|---|---|---|
| `timerFlash` | Timer value | Red color pulse when under 30 seconds remaining |
| `overlayFadeIn` | Game over overlay | Full-scene overlay fades in |
| `scoreBounce` | Final score text | Score number bounces in with spring easing |

---

## Implementation Stages

### Stage 1 — Game Canvas & HUD Strip ✅ COMPLETE
**What was built:**
- Golden HUD strip with SVG globe + flowers, "Play and Save the Planet!" title, countdown timer pill
- Game scene container with `Game-page-image.png` background
- 3 animated flying birds, walking crab with bob, 2 swimming fish with path animations
- Two-column 70/30 layout skeleton
- Empty sticker book panel placeholder with parchment background

**Files touched:** `game.html`, `gameModel.js`, `gameView.js`, `game.css`, `gameController.js`

---

### Stage 2 — Sticker Book Panel & Scene Title Bar ← NEXT
**Goal:** Build the complete visual sticker book panel and scene title bar with pure HTML/CSS.
No interactivity — everything is static and visually complete.

**Deliverables:**
- Add Google Fonts Nunito link to `game.html`
- Add `game` section to `gameModel.js` with scene title/subtitle + 6 animal sticker entries (id, name, color, hint text)
- Update `gameView.js`:
  - Pass `data.game` into `renderHero()`
  - Generate `spiralDotsHTML` (14 dots) and `stickerCardsHTML` (6 locked cards from model) before the innerHTML template
  - Insert scene title bar HTML between the HUD strip and the game scene container
  - Replace the empty sticker panel placeholder with the full sticker book HTML (spiral → header → buttons → collection → feedback → reset)
- Add all new CSS classes to `game.css`:
  - `.game-scene-title-bar`, `.scene-title-icon`, `.scene-title-text`, `.scene-subtitle-text`
  - `.sb-spiral`, `.sb-spiral-dot`
  - `.sb-header`, `.sb-header-title`, `.sb-header-deco`
  - `.sb-actions`, `.sb-btn`, `.sb-btn-hint`, `.sb-btn-facts`, `.sb-btn-icon`, `.sb-btn-body`, `.sb-btn-title`, `.sb-btn-sub`
  - `.sb-collection`, `.sb-collection-hdr`, `.sb-collection-label`, `.sb-collection-count`
  - `.sb-sticker-grid`, `.sb-card`, `.sb-card-locked`, `.sb-card-face`, `.sb-card-qmark`, `.sb-card-name`, `.sb-card-hint-label`
  - `.sb-feedback`, `.sb-feedback-title`, `.sb-feedback-text`
  - `.sb-reset-btn`

**Files to change:** `game.html`, `gameModel.js`, `gameView.js`, `game.css`

---

### Stage 3 — Animal Clickable Hotspots
**Goal:** Make each of the 6 creatures clickable in the game scene, triggering sticker discovery.

**Deliverables:**
- Add `hotspots` array to `gameModel.js` for each animal — stores `{ id, x, y, width, height }` as percentages of scene dimensions
- In `gameView.js`, generate hotspot `<button>` overlay elements positioned absolutely over each creature in the scene
- Each hotspot has a soft pulsing ring animation (`hotspotPulse`) to hint at interactivity
- On click: dispatch a custom `animalFound` event with the animal's id
- In `gameController.js`, listen for `animalFound` events and call `unlockSticker(id)`
- `unlockSticker(id)` updates the matching `.sb-card` from locked state to revealed state
- Revealed state: replaces "?" with the animal's actual image (or colored checkmark as placeholder)
- Updates the `#sb-count` counter text (e.g. "1 / 6 found")
- Plays the `cardUnlock` + `glowPop` CSS animations on the newly revealed card

**Files to change:** `gameModel.js`, `gameView.js`, `gameController.js`, `game.css`

---

### Stage 4 — Animal Info Pop-up Card
**Goal:** When a creature is clicked, show a pop-up card with its name, image, and facts.

**Deliverables:**
- Add `facts` array (2–3 strings) to each animal entry in `gameModel.js`
- In `gameView.js`, add a `renderAnimalPopup(animal)` function that injects a modal overlay into the game scene
- Pop-up card contains: animal name, illustration image, 2–3 Grade 3-level fact bullets, "Close" button
- Pop-up appears with a scale-in bounce animation
- Clicking outside the card or pressing the close button dismisses it
- Pop-up is triggered from `gameController.js` after sticker unlock

**Files to change:** `gameModel.js`, `gameView.js`, `gameController.js`, `game.css`

---

### Stage 5 — Hint System
**Goal:** Clicking a locked sticker card (or the "Hint" button) shows a location hint for that creature.

**Behaviour:**
- Clicking a locked `.sb-card` marks it as "selected" (adds a highlight ring)
- The feedback area updates: shows the animal's hint text (e.g. "I swim in groups near the shore!")
- The "Hint" button, when clicked, shows the hint for the currently selected sticker
- If no sticker is selected and the Hint button is clicked, the feedback area stays at the default message
- The feedback text animates in with a `feedbackSlide` transition

**Files to change:** `gameView.js`, `gameController.js`, `game.css`

---

### Stage 6 — Fish Facts Panel
**Goal:** The "Fish Facts" button opens a detailed facts view for the most recently discovered animal.

**Behaviour:**
- Button is disabled/greyed out until at least one animal is discovered
- On click: the sticker grid area transitions to a facts view
- Facts view shows: animal name, larger illustration, 2–3 fact bullets, a "Back" button to return to the sticker grid
- If no animal discovered yet, show: *"Discover your first creature to unlock facts!"*

**Files to change:** `gameView.js`, `gameController.js`, `game.css`

---

### Stage 7 — Local Storage Persistence
**Goal:** Save and restore game progress across page refreshes.

**Behaviour:**
- On every sticker unlock, save the set of discovered animal IDs to `localStorage` key `eco_discovered`
- On page load in `gameController.js`, read `eco_discovered` and restore all previously unlocked stickers
- The `#sb-count` counter and all card states restore from saved data
- "Reset Sticker Book" button clears `localStorage` and resets all stickers back to locked state
- Timer state is NOT persisted — always starts fresh at 5:00

**Files to change:** `gameController.js`, `gameModel.js`

---

### Stage 8 — Timer End State & Game Over
**Goal:** When the timer reaches 0:00, freeze the game and show a results overlay.

**Behaviour:**
- When timer hits 0, call `triggerGameOver(foundCount, totalCount)` in `gameController.js`
- A semi-transparent overlay fades in over the entire game scene (not the sticker panel)
- Overlay shows:
  - "Time's Up!" heading
  - "You found **X / 6** animals!" with the number animated/bounced in
  - A "Play Again" button that reloads the page
- Sticker book panel remains visible and interactive during game over

**Files to change:** `gameView.js`, `gameController.js`, `game.css`

---

## Data Model Plan (gameModel.js)

The `gamePageData` object will grow across stages:

```
gamePageData
├── siteName
├── header { topBarText, topBarColor, navBarColor, navLinks[] }
├── footer { frog, audienceLinks[], socialLinks[], utilityLinks[], quote, copyright }
└── game  ← NEW
    ├── scene { title, subtitle }
    └── stickerBook
        └── animals[]
            ├── id          (e.g. "sturgeon")
            ├── name        (e.g. "Lake Sturgeon")
            ├── color       (card background hex)
            ├── hint        (location clue text)
            ├── image       (asset path — added in Stage 4)
            ├── facts[]     (2–3 strings — added in Stage 4)
            └── hotspot     ({ x, y, width, height } — added in Stage 3)
```

---

## File Change Summary Per Stage

| Stage | `game.html` | `gameModel.js` | `gameView.js` | `gameController.js` | `game.css` |
|---|---|---|---|---|---|
| 1 ✅ | ✅ | ✅ | ✅ | ✅ | ✅ |
| 2 | Add font | Add game section | Update renderHero | — | Add ~100 lines |
| 3 | — | Add hotspots | Add hotspot HTML | Add event listeners | Add hotspot styles |
| 4 | — | Add facts/images | Add popup render fn | Trigger popup | Add popup styles |
| 5 | — | — | Add hint logic to UI | Add hint handler | Add selected state |
| 6 | — | — | Add facts panel render | Add facts handler | Add facts panel styles |
| 7 | — | — | — | Add localStorage read/write | — |
| 8 | — | — | Add game over render | Add timer end handler | Add overlay styles |

---

## Responsive Breakpoints

### Desktop (> 768px)
- Two-column layout: 70% game canvas / 30% sticker panel
- Sticker grid: 3 columns × 2 rows
- All text at full size

### Tablet (≤ 768px)
- Stack to single column: game canvas on top, sticker panel below
- Game canvas fixed to `55vw` height
- Sticker panel border moves from left to top
- Sticker grid: 6 columns × 1 row (cards smaller, labels hidden)

### Mobile (≤ 480px) — Future consideration
- Game scene compressed
- Sticker grid scrollable horizontally
- Popup cards take full screen width
