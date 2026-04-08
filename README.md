# Ecosystem Discovery Application

<p align="center">
  <img src="assets/hero.png" alt="Ecosystem Discovery Application Hero" width="950">
</p>

> A web-based interactive educational application designed to help elementary school students explore a Saskatchewan-inspired freshwater ecosystem through discovery-based learning and engagement.

---

## Table of Contents

1. [Project Overview](#project-overview)
2. [Course Information](#course-information)
3. [Team Members](#team-members)
4. [Problem Definition](#problem-definition)
5. [Core Learning Experience](#core-learning-experience)
6. [Scope Summary](#scope-summary)
7. [Minimum Viable Product (MVP)](#minimum-viable-product-mvp)
8. [System Architecture](#system-architecture)
9. [Prototype (Figma)](#prototype-figma)
10. [Quick Start](#quick-start)
11. [GitHub Project Boards](#github-project-boards)
12. [Management Tasks Kanban](#management-tasks-kanban)
13. [Development Tasks Kanban](#development-tasks-kanban)
14. [Project Deliverables](#project-deliverables)

---

## Project Overview

The Ecosystem Discovery Application is developed as part of ENSE 281 – Software Engineering Management at the University of Regina.

The system is designed for Grade 3 learners and introduces freshwater ecosystems through a visual and interactive environment. Users explore an ecosystem scene, discover animals, unlock stickers, and learn ecological concepts through three core pillars:

| Pillar | Description |
|---|---|
| **Play** | A 2-minute timed card-matching game where children read progressive hints and identify the correct Saskatchewan freshwater animal |
| **Watch** | A curated library of 6 embedded educational YouTube videos displayed inside animated TV-screen cards |
| **Discover** | An animal reference sticker book that unlocks as cards are solved in the game |

A global **Feedback** modal lets users submit star-rated comments stored in Supabase, viewable through a password-protected Admin dashboard.

---

## Course Information

- **Course:** ENSE 281 – Software Engineering Management
- **Instructor:** Dr. Tim Maciag
- **Project:** Ecosystem Discovery Application
- **Team:** Group G
- **Institution:** University of Regina
- **Term:** Winter 2026

---

## Team Members

| Name | Role |
|---|---|
| Rayansh Chowatia | Project Lead / Full-Stack Development |
| Aubin Chriss Izere | Frontend Development / UI & Animation |
| Jeremiah Onunkwo | Development / Documentation |
| Abrianna Primavera | Design / Documentation |

---

## Problem Definition

Traditional learning methods rely on static diagrams and text-heavy content, which can make it difficult for younger students to understand ecosystems and environmental relationships.

This project addresses that gap by providing an interactive digital experience that allows students to explore ecosystems visually and learn through discovery.

---

## Core Learning Experience

The application follows this interaction flow:

1. User opens the application
2. User enters the ecosystem scene
3. User selects a mystery sticker card
4. Progressive hints reveal clues about a hidden animal
5. User clicks the matching fish in the animated lake scene
6. A sticker is unlocked and educational information is displayed
7. Progress is updated in the sticker book sidebar
8. The user continues exploration until all 6 animals are discovered

---

## Scope Summary

### In Scope
- Saskatchewan freshwater ecosystem scene
- 6 interactive animals with hint-based discovery
- Progressive hint system (up to 3 hints per animal)
- Sticker collection system with visual progress tracking
- 2-minute countdown timer with danger modes
- Trash drag-and-drop bonus mechanic (+20s per item)
- Educational video library (6 videos)
- Global feedback modal with star ratings
- Admin dashboard for feedback management
- MVC-based system design (frontend and backend)
- Supabase PostgreSQL backend for live animal and hint data

### Out of Scope
- Multiplayer or co-op features
- Student account system / persistent user profiles
- Multiple ecosystem types (forest, prairie, wetland)
- Advanced scoring or leaderboard system
- Mobile or tablet responsive layout
- Complex ecological simulations
- Offline / PWA functionality

---

## Minimum Viable Product (MVP)

| MVP Feature | Status |
|---|---|
| Interactive freshwater ecosystem scene | Done |
| 6 clickable mystery sticker cards | Done |
| Progressive hint system (3 hints per animal) | Done |
| Correct/wrong guess validation with visual feedback | Done |
| Sticker reward and unlock system | Done |
| 2-minute countdown timer | Done |
| Educational video library (6 videos) | Done |
| Structured animal and hint data model (Supabase) | Done |
| Global feedback modal | Done |
| Admin dashboard | Done |
| Mascot characters with animated speech bubbles | Done |
| Trash drag-and-drop bonus mechanic | Done |

---

## System Architecture

The system follows the **Model–View–Controller (MVC)** architecture across both frontend and backend layers:

```
Browser
  └── HTML Pages (index, game, videos, about, sources, admin)
        └── JavaScript ES Modules
              ├── Models     — static page data and configuration
              ├── Views      — DOM rendering functions
              ├── Controllers — event handling and game logic
              ├── Services   — fetch calls to backend API
              └── State      — central game state (gameState.js)

Express Server (Node.js)
  ├── Serves public/ as static files
  └── /api/* routes
        ├── Controllers — handle requests, call models, return JSON
        ├── Models      — Supabase query functions
        ├── Middleware  — JWT auth validation
        └── Services    — Supabase JS client initialisation

Supabase (PostgreSQL)
  ├── animals table
  ├── hints table
  └── feedback table
```

For full technical documentation, API reference, and setup instructions see:
**[`EcoDiscovery_Development/README.md`](EcoDiscovery_Development/README.md)**

---

## Prototype (Figma)

High-Fidelity Prototype:
https://www.figma.com/design/TSUWRBOK4Zgi3H7ILobe8K/ENSE-281-%E2%80%93-Ecosystem-Discovery-%E2%80%93-HiFi-Prototype

---

## Quick Start

> Full installation guide, environment variable setup, and API reference are in the developer README:
> **[`EcoDiscovery_Development/README.md`](EcoDiscovery_Development/README.md)**

```bash
# 1. Clone the repository
git clone https://github.com/Rayansh-Chowatia/Ense_281_eco_discovery_app.git
cd Ense_281_eco_discovery_app/EcoDiscovery_Development

# 2. Install dependencies
npm install

# 3. Create your .env file
#    (See EcoDiscovery_Development/README.md → Environment Variables)
touch .env

# 4. Start development server
npm run dev

# 5. Open in browser
# http://localhost:3000
```

**Requirements:** Node.js v18+, npm v9+, Supabase account, desktop browser

---

## GitHub Project Boards

| Board | Purpose | Link |
|---|---|---|
| Management Tasks | Planning, documentation, stakeholder management, deliverables | https://github.com/users/Rayansh-Chowatia/projects/2 |
| Development Tasks | All coding, implementation, and design tasks | https://github.com/users/Rayansh-Chowatia/projects/1 |

---

## Management Tasks Kanban

Tracks project management, planning, documentation, and course deliverables.

<table>
<thead>
<tr>
<th align="center">🔴 BACKLOG<br><sub>Not yet started</sub></th>
<th align="center">🔵 TODO<br><sub>Ready to be picked up</sub></th>
<th align="center">🟡 IN PROGRESS<br><sub>Actively being worked on</sub></th>
<th align="center">✅ DONE<br><sub>Completed</sub></th>
</tr>
</thead>
<tbody>
<tr valign="top">
<td width="20%">
<b>#20</b> Plan user testing sessions for MVP prototype<br>
<sub>Schedule sessions with Grade 3 users; prepare test scripts and observation forms</sub>
<br><br>
<b>#21</b> Create user guide for application<br>
<sub>Child-friendly instructions + teacher/parent companion guide</sub>
<br><br>
<b>#22</b> Prepare final project demonstration plan<br>
<sub>Demo flow, slides, and speaking roles for final presentation</sub>
<br><br>
<b>#23</b> Document system architecture for final report<br>
<sub>MVC layers, Supabase schema, API routes, and deployment overview</sub>
<br><br>
<b>#24</b> Plan deployment strategy for web application<br>
<sub>Research Vercel / Railway / Render; document production .env handling</sub>
<br><br>
<b>#42</b> Implement educational animal info popup cards<br>
<sub>Full animal modal: habitat, diet, conservation status, fun facts</sub>
</td>
<td width="20%">
<b>#25</b> Analyze user feedback collected from questionnaire<br>
<sub>Review Activity 2 responses; identify top 3 UX improvements</sub>
<br><br>
<b>#26</b> Update prototype design based on feedback<br>
<sub>Apply findings to Figma; update layout or interaction patterns</sub>
<br><br>
<b>#27</b> Define MVP implementation roadmap<br>
<sub>Break MVP features into issues with estimates and assignees</sub>
<br><br>
<b>#29</b> Plan next development iteration (Activity-3 prep)<br>
<sub>Scope and assign all Activity 3 coding tasks; update project board</sub>
</td>
<td width="20%">
<b>#30</b> Organize project documentation and diagrams in repository<br>
<sub>Move all PDFs and diagrams into correct folders; update README links</sub>
<br><br>
<b>#2</b> Update MVP documentation and feature scope<br>
<sub>Revise MVP document to reflect current implemented feature set</sub>
</td>
<td width="40%">
<b>#1</b> Set up GitHub Projects boards ✓<br>
<b>#3</b> Write Scrum Report — Activity 2 ✓<br>
<b>#4</b> Create Business Case document ✓<br>
<b>#5</b> Prepare Project Charter ✓<br>
<b>#6</b> Identify project stakeholders ✓<br>
<b>#7</b> Create Stakeholder Register document ✓<br>
<b>#8</b> Define project roles and responsibilities ✓<br>
<b>#9</b> Create RACI responsibility matrix ✓<br>
<b>#10</b> Write Project Scope document ✓<br>
<b>#11</b> Write Project Requirements document ✓<br>
<b>#12</b> Design Low Fidelity Prototype (UI sketches) ✓<br>
<b>#13</b> Design High Fidelity Prototype in Figma ✓<br>
<b>#14</b> Create GitHub repository and project structure ✓<br>
<b>#15</b> Write MVP definition document ✓<br>
<b>#16</b> Create Use Case Diagram ✓<br>
<b>#17</b> Create Class Diagram ✓<br>
<b>#18</b> Create Data Flow Diagram ✓<br>
<b>#19</b> Create MVC Architecture Diagram ✓<br>
<b>#28</b> Define MVP implementation roadmap ✓<br>
<b>#32</b> Design JSON animal data model ✓<br>
<b>#33</b> Create MVC architecture diagram ✓<br>
<b>#43</b> Prepare development structure ✓<br>
<b>#44</b> Implement Home page ✓<br>
<b>#45</b> Implement Game page ✓<br>
<b>#46</b> Implement Videos page ✓<br>
<b>#47</b> Implement About page ✓<br>
<b>#48</b> Implement Sources page ✓
</td>
</tr>
</tbody>
</table>

---

## Development Tasks Kanban

Tracks all coding, implementation, and technical design tasks for the application.

<table>
<thead>
<tr>
<th align="center">🔴 BACKLOG<br><sub>Thought Tasks</sub></th>
<th align="center">🔵 TODO<br><sub>Not yet started</sub></th>
<th align="center">🟡 IN PROGRESS<br><sub>Actively being worked on</sub></th>
<th align="center">✅ DONE<br><sub>Completed</sub></th>
</tr>
</thead>
<tbody>
<tr valign="top">
<td width="18%">
<b>#42</b> Implement educational animal information popup cards<br><br>
<sub>Full-screen modal triggered from creature clicks in the game scene. Must show: species name, habitat, diet, conservation status in Saskatchewan, fun facts, and local illustration. Grade 3 reading level. Matches sticker book visual theme.</sub><br><br>
<sub><b>Files:</b> <code>js/controllers/gameController.js</code>, <code>game.css</code>, Supabase <code>animals</code> table</sub>
</td>
<td width="14%">
<i>All scheduled items completed ✓</i>
</td>
<td width="20%">
<b>#41</b> Add animated ecosystem elements<br><br>
✅ Birds flying across hero (3, CSS keyframes)<br>
✅ Fish swimming in game scene (2 fish)<br>
✅ Animated crab at scene bottom<br>
✅ Rising ambient bubbles + sparkles<br>
✅ Mascot entrance animations<br>
✅ Mascot speech-bubble banner reveals<br>
⏳ Water shimmer &amp; light ray effects<br>
⏳ Weather / time-of-day environment layer<br>
⏳ Additional creature idle animations<br><br>
<sub><b>Files:</b> <code>css/home.css</code>, <code>css/game.css</code>, <code>js/views/homeView.js</code></sub>
</td>
<td width="48%">
<b>#34</b> Low fidelity prototype design ✓<br>
<sub>Wireframe sketches for all 6 pages; established layout and navigation flow</sub><br><br>
<b>#35</b> High fidelity prototype design ✓<br>
<sub>Full-color Figma mockups — lake theme, mascots, color palette (#2084BE, #C9A227, #4BA8A9), asset list</sub><br><br>
<b>#36</b> Link Figma interactions → system flow ✓<br>
<sub>Home→Game, Game→Sticker Book, Reset flows mapped to MVC controller events</sub><br><br>
<b>#37</b> Link Figma interactions → system flow ✓<br>
<sub>Videos modal, About nav, Feedback trigger, Sources interactions mapped</sub><br><br>
<b>#38</b> Implement animal discovery interaction ✓<br>
<sub>Full game turn: card click → hint load → fish click → correct (green flip ✓) / wrong (red flash + next hint) → all hints exhausted = fail (red ✕) → all 6 done = end overlay</sub><br><br>
<b>#31</b> Implement ecosystem animation logic ✓<br>
<sub>3 birds across hero, 2 swimming fish, crab, 3 ambient rising bubbles with sparkles, cursor glow trail</sub><br><br>
<b>#39</b> Implement sticker unlock logic — card flip states ✓<br>
<sub>3D CSS flip; solved = green ✓ + animal image; failed = red ✕ + grayscale image</sub><br><br>
<b>#40</b> Implement sticker unlock logic — sidebar ✓<br>
<sub>Progress bar, star counter, solved/failed label, per-card <code>--card-color</code> CSS variable theming</sub><br><br>
<b>#43</b> Prepare development structure ✓<br>
<sub>Full MVC structure: <code>models/</code> <code>views/</code> <code>controllers/</code> <code>services/</code> <code>state/</code> + backend <code>routes/</code> <code>controllers/</code> <code>models/</code> <code>middleware/</code>. All 6 page entry points wired.</sub><br><br>
<b>#32</b> Design JSON animal data model ✓<br>
<sub>Animal + hint schema defined in Supabase and consumed by <code>animalModel.js</code>; documented in dev README</sub><br><br>
<b>#33</b> Create MVC architecture diagram ✓<br>
<sub>Frontend + backend MVC layers documented with flow diagram in <code>EcoDiscovery_Development/README.md</code></sub><br><br>
Express backend + API routes ✓<br>
<sub>Helmet, CORS, rate-limit (10/15 min), JSON parser, static serving — <code>backend/server.js</code></sub><br><br>
Supabase integration ✓<br>
<sub>Server-side client; animals + hints fetched in parallel; feedback written; admin read/delete via JWT routes</sub><br><br>
MVC frontend architecture ✓<br>
<sub>5 models, 5 views, 6 controllers, 1 service, 1 state file — <code>public/js/</code></sub><br><br>
Global feedback modal ✓<br>
<sub>Name, role, message, email, 1–5 stars → <code>POST /api/feedback</code> — <code>feedback.js</code>, <code>feedback.css</code></sub><br><br>
Admin dashboard (JWT-protected) ✓<br>
<sub>Session check on load, view all feedback, delete entries — <code>admin.html</code>, <code>adminApp.js</code></sub><br><br>
Game countdown timer ✓<br>
<sub>120 s, MM:SS format; danger at 60 s (yellow); critical at 30 s (red); auto-fail on expiry; stops on game end</sub><br><br>
Trash drag-and-drop bonus ✓<br>
<sub>3 sinking trash items → drag to bin = +20 s bonus + popup animation — <code>trashDrag.js</code></sub><br><br>
Mascot speech-bubble banner animations ✓<br>
<sub>Froggy: LTR <code>scaleX</code> reveal at 1.3 s · Ducky: RTL reply at 2.1 s · spring easing · <code>fill-mode: both</code></sub><br><br>
Fix: Timer stops on game completion ✓<br>
<sub><code>stopGameTimer()</code> + <code>stopDangerMode()</code> called in <code>showEndOverlay()</code> — <code>gameController.js</code>, <code>gameView.js</code></sub><br><br>
Fix: Nav home button vertical alignment ✓<br>
<sub><code>.nav-menu</code> changed from <code>align-items: center</code> → <code>flex-end</code> — <code>home.css</code></sub>
</td>
</tr>
</tbody>
</table>

---

### Envisioned Future — High-Level Post-MVP Features

| Priority | Feature | Description |
|---|---|---|
| High | Mobile & tablet responsive layout | Desktop-only (1024px+) currently. Needs full CSS overhaul, touch drag-and-drop, and scaled game scene. |
| High | Educational animal info popup cards | Full modal on creature click — habitat, diet, conservation status, fun facts, illustration. (Backlog #42) |
| Medium | Student account system | Persistent profiles — progress, stickers, and scores saved across sessions via Supabase Auth. |
| Medium | Teacher / parent dashboard | Class-level progress view — most-missed animals, average scores, video watch counts. |
| Medium | Multiple Saskatchewan ecosystems | Forest, prairie, and wetland scenes with their own animal sets, hints, and visual themes. |
| Medium | Sound effects & ambient audio | Lake sounds, animal clips, success/fail chimes, ambient music. Toggle in settings. |
| Low | Accessibility (WCAG 2.1 AA) | Full keyboard nav, screen reader support, ARIA live regions for game events, high-contrast mode. |
| Low | Progressive Web App (PWA) | Service worker + manifest — installable, offline-capable with cached animal data. |
| Low | Classroom leaderboard | Top scores, fastest times, and most animals found — anonymous or named. |
| Low | Animated intro / tutorial sequence | First-visit walkthrough guided by Froggy and Ducky, with skip option for returning users. |

---

## Project Deliverables

### Project Initialization (Activity 1)
- [Business Case](Project_Initialization/Documents/Business%20Case/Business_Case_GroupG_EcosystemApp.pdf)
- [Charter Document](Project_Initialization/Documents/Charter%20Document/Charter_Document_GroupG_EcosystemApp.pdf)
- [Pitch Deck](Project_Initialization/Documents/Pitch%20Deck%20Report/Pitch_Deck_GroupG_EcosystemApp_Activity1.pdf)

### Project Planning and System Design (Activity 2)

#### Project Documents
- [Project Requirements](Project_Planning_and_System_Design/Documents/Project_Requirements/Project_Requirements_Document_GroupG_EcosystemApp_Activity2.pdf)
- [Project Scope](Project_Planning_and_System_Design/Documents/Project_Scope/Project_Scope_GroupG_EcosystemApp_Activity2.pdf)
- [Stakeholder Register](Project_Planning_and_System_Design/Documents/Project_Stakeholder_Register/Project_Stakeholder_Register_GroupG_EcosystemApp_Activity2.pdf)
- [Stakeholder Engagement Plan](Project_Planning_and_System_Design/Documents/Stakeholder_Engagement_Plan/StakeholderEngagementPlan_GroupG_EcosystemApp_Activity2.pdf)
- [Roles and Responsibilities](Project_Planning_and_System_Design/Documents/Project_Roles_and_Responsibilities/Project_Roles_and_Responsibilities_GroupG_EcosystemApp_Activity2.pdf)
- [MVP Definition](Project_Planning_and_System_Design/Documents/MVP/MVP_GroupG_EcosystemApp_Activity2.pdf)
- [RBAC](Project_Planning_and_System_Design/Documents/RBAC/RBAC_GroupG_EcosystemApp_Activity2.pdf)

#### UML Diagrams
- [Class Diagram](Project_Planning_and_System_Design/UML_Diagrams/Class_Diagram/Class_Diagram_GroupG_EcosystemApp_Activity2.pdf)
- [Data Flow Diagram](Project_Planning_and_System_Design/UML_Diagrams/Dataflow_Diagram/DataFlow_Diagram_GroupG_EcosystemApp_Activity2.pdf)
- [Use Case Diagram](Project_Planning_and_System_Design/UML_Diagrams/UseCase_Diagram/UseCase_Diagram_GroupG_EcosystemApp_Activity2.pdf)
- [MVC Architecture](Project_Planning_and_System_Design/UML_Diagrams/MVC_Architecture_Diagram/MVC_Architecture_Diagram_GroupG_EcosystemApp_Activity2.pdf)

#### Design
- [Low Fidelity Prototype](Project_Planning_and_System_Design/Design/Low_Fidelity/Lo_Fidelity_GroupG_EcosystemApp_Activity2.pdf)
- [High Fidelity Prototype](Project_Planning_and_System_Design/Design/High_Fidelity/High_Fidelity_GroupG_EcosystemApp_Activity2.pdf)

#### Scrum & Evaluation
- [Scrum Report](Project_Planning_and_System_Design/Scrum_Report/Scrum_Report_GroupG_Ecosystem_Activity2.pdf)
- [User Questionnaire](Project_Planning_and_System_Design/Evaluation/User_Questionnaire_EcosystemApp_Activity2.pdf)

---

*Eco Discovery © 2026 — University of Regina, ENSE 281, Group G*
