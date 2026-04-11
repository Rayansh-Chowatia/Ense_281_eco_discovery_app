# Eco Discovery — Freshwater Ecosystem Learning App

**Course:** ENSE 281 – Software Engineering Management
**Institution:** University of Regina
**Team:** Group G

---

## 👥 Team Members

- Rayansh Chowatia
- Jeremiah Onunkwo
- Abrianna Primavera
- Aubin Chriss Izere

---

## 📌 Project Description

EcoDiscovery is a web-based educational application designed to help young learners explore freshwater ecosystems through an interactive and engaging experience.

The system allows children to discover aquatic animals, learn fun facts, and understand environmental responsibility through gameplay and exploration.

---

## ❓ The Why

Traditional learning methods are often text-heavy and difficult for children to engage with. Students struggle to understand ecosystem concepts through static diagrams and written content.

EcoDiscovery addresses this by transforming learning into an interactive and visual experience — children play their way to understanding freshwater ecosystems rather than reading about them.

---

## 👥 The Who

**Primary users:** Elementary school students (Grades 2–3)

**Secondary users:** Teachers and parents

---

## 🎯 Project Goals

- Make learning interactive
- Encourage exploration-based learning
- Promote environmental awareness
- Improve engagement for young learners

---

## 🚀 Minimum Viable Product (MVP)

The MVP scope defines what the application must deliver to be considered a working product:

- Interactive underwater ecosystem scene with animated creatures
- Hint-based animal discovery (progressive 3-hint system)
- Sticker book unlock system (one sticker per correct guess)
- Timer-based gameplay (2-minute countdown)
- Trash collection feature (+20s bonus per item dragged to bin)
- Educational video section (5 local videos about freshwater species)

Everything beyond this — the admin dashboard, Froggy companion guide, danger/critical timer modes, end-game scoring, and the feedback system — builds on top of the MVP.

---

## 🎥 Demo

[![Watch the Commercial Video](https://img.youtube.com/vi/2_klvhG9HdE/0.jpg)](https://youtu.be/2_klvhG9HdE)

The video demonstrates the interactive ecosystem exploration, animal discovery and sticker unlock system, educational gameplay experience, and the trash cleanup environmental awareness feature.

---

## 🛠 Tech Stack

| Layer | Technology |
|---|---|
| Frontend | HTML5, CSS3, Vanilla JavaScript (ES6 modules) |
| Backend | Node.js + Express |
| Database | Supabase (PostgreSQL) |
| Auth | Supabase Auth (JWT) |
| Architecture | MVC (Model-View-Controller) |
| Dev Server | nodemon |

No frontend framework is used — the app is built with a hand-rolled MVC pattern in vanilla JavaScript with full control over rendering, state, and animations.

> For the full dependency list with versions, architecture diagram, and folder breakdown see [Code_Base/README.md](Code_Base/README.md).

---

## 📄 Pages

| Page | File | Description |
|---|---|---|
| Home | `index.html` | Landing page with animated hero, Froggy mascot, CTA |
| Game | `game.html` | Core gameplay — mystery cards, hints, creature clicking |
| Videos | `videos.html` | TV-themed gallery of 5 educational videos |
| About Us | `about.html` | Mission, values, and team |
| Sources | `sources.html` | Citations for animal facts and videos |
| Admin | `admin.html` | Protected feedback management dashboard |

---

## ⚙️ Prerequisites

Before running the project you need:

| Tool | Version |
|---|---|
| Node.js | v14 or higher |
| npm | v6 or higher (bundled with Node.js) |
| Git | Any |
| Supabase account | Free tier — you need a Project URL and Service Role Key |

**Supabase setup:**
1. Create a project at [supabase.com](https://supabase.com)
2. Create the three tables: `animals`, `animal_hints`, `feedback`
3. Populate `animals` and `animal_hints` with your data
4. Copy your **Project URL** and **Service Role Key** from Project Settings → API

> Full database schema (columns, types, foreign keys) is in [Code_Base/README.md](Code_Base/README.md#database-schema).

---

## ⚙️ Installation & Setup

### Clone Repository

```bash
git clone https://github.com/Rayansh-Chowatia/Ense_281_eco_discovery_app.git
cd Ense_281_eco_discovery_app/Code_Base
```

### Install Dependencies

```bash
npm install
```

### Environment Variables

Create a `.env` file inside `Code_Base/` (never commit this file — it is already in `.gitignore`):

```env
SUPABASE_URL=https://your-project-id.supabase.co
SUPABASE_SERVICE_ROLE_KEY=your-service-role-key-here
PORT=3000
NODE_ENV=development
```

### Run the App

**Development** (auto-restarts on file changes):
```bash
npm run dev
```

**Production:**
```bash
npm start
```

The app is available at **http://localhost:3000**

---

## 📁 Repository Structure

```
Ense_281_eco_discovery_app/
├── README.md                          ← You are here (project overview)
├── Code_Base/                         ← Application source code
│   ├── README.md                      ← Full developer reference
│   ├── backend/                       ← Express server, controllers, models, routes
│   └── public/                        ← HTML pages, CSS, JS, assets
├── Project_Delivery_and_Closing/
├── Project_Initialization/
├── Project_Planning_and_System_Design/
└── Project_Progress_and_Scrum_Report/
```

---

## 📖 Developer Documentation

For full technical details — MVC architecture diagram, complete folder tree, API endpoints, database schema, and security notes — see:

**[Code_Base/README.md](Code_Base/README.md)**
