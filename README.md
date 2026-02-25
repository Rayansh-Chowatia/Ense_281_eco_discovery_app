# Ecosystem Discovery Application 🌿🐟

<p align="center">
  <img src="assets/hero.png" alt="Ecosystem Discovery App Hero" width="900">
</p>

> A web-based educational application for **elementary school children (ages 5–9)** to explore a **Saskatchewan-inspired freshwater ecosystem**, discover animals, and learn conservation through a **sticker-book style** experience.

---

## 🔗 Quick Links
- 📄 **Activity 1 Documents:** [Go to docs/activity-1](docs/activity-1)
- 📌 **Project Board (Kanban):** *(add link once created)*
- 🌐 **Live Demo:** *(add link once deployed)*

---

## 📚 Table of Contents
- [Project Summary](#project-summary)
- [Team](#team)
- [Problem / Opportunity](#problem--opportunity)
- [Target Users](#target-users)
- [Core Experience](#core-experience)
- [Scope Control](#scope-control)
- [MVP](#mvp)
- [MVC Architecture Overview](#mvc-architecture-overview)
- [Planned Technology](#planned-technology)
- [Project Status Tracker](#project-status-tracker)
- [Project Activity 1 – Deliverables](#project-activity-1--deliverables)

---

## Project Summary
The **Ecosystem Discovery Application** is a web-based learning project focused on **elementary-level environmental education**.  
Kids explore a **single freshwater scene**, click animals to “discover” them, and collect them in a **sticker book** with short, age-appropriate facts.

This project is developed for **ENSE 281** and emphasizes:
- Domain-driven design (ecosystem concepts as clear domain objects)
- **Model–View–Controller (MVC)** architecture
- Agile planning and progress tracking (GitHub Projects / Kanban)
- Team collaboration using GitHub

---

## Team
**Group G**
- Jeremiah Onunkwo  
- Rayansh Chowatia  
- Abrianna Primavera  
- Aubin Chriss Izere  

---

## Problem / Opportunity
Environmental education for young learners is often **text-heavy** or **too abstract**, making ecosystem concepts hard to understand and remember.  
This project creates a **simple, visual, interactive** learning experience that helps children learn freshwater animals and conservation in a fun way.

---

## Target Users
### Primary Users
- Elementary school children (**ages 5–9**)

### Secondary Users
- Teachers (classroom use / demos)
- Parents/guardians (learning at home)

### Classroom Stakeholders
- ENSE 281 instructor + TAs (evaluation and feedback)
- Class peers (peer review / usability feedback during milestones)

---

## Core Experience
On one screen:
- **Left:** a freshwater ecosystem scene (animals visible / animated movement later)
- **Right:** a sticker book panel with:
  - silhouettes / hints for undiscovered animals
  - discovered stickers
  - simple facts (reading level ~9 years)

**Interaction loop:**
1) Child sees a hint in the sticker book  
2) Child finds the animal in the ecosystem  
3) Child clicks it → sticker appears + facts shown

---

## Scope Control
To keep scope realistic and high-quality, we will:
- Build **ONE** ecosystem scene only (Saskatchewan-inspired freshwater)
- Include **6–8 animals max**
- Keep interactions **simple and clear** (click → reveal → collect)
- Avoid accounts/login, multiplayer, and complex simulations

✅ **In Scope**
- Single ecosystem scene + 6–8 animals
- Sticker book collection
- Animal fact cards (kid-friendly language)
- One negative event + one positive action (simple cause/effect)
- MVC structure with database-backed model

❌ **Out of Scope**
- Multiple ecosystems
- User accounts/authentication
- Physics-heavy simulation, 3D game engine complexity
- Multiplayer

---

## MVP
A working web app where a user can:
- Explore the ecosystem scene
- Discover **at least 6 animals**
- Open a fact card for each discovered animal
- See collected animals in the sticker book
- Save progress via database-backed model

---

## MVC Architecture Overview
- **Model:** Animals, facts, discovery status (database-backed)
- **View:** Ecosystem scene + sticker book UI
- **Controller:** Click interactions, reveal logic, collect logic, progress saving

---

## Planned Technology
**Frontend (View + interactions)**
- HTML, CSS (Bootstrap optional)
- JavaScript (animations via CSS + JS)

**Backend (Controller + API)**
- Node.js + Express *(recommended for team collaboration)*

**Database (Model)**
- MongoDB *(simple JSON-like documents for animals/facts/progress)*

**Project Management**
- GitHub Issues + GitHub Projects (Kanban)

> Note: We will prioritize a polished 2D experience (cartoon style) rather than complex 3D.

---

## 📊 Project Status Tracker

### Overall Project Completion
**Overall:** 20% (Activity 1 complete)
<progress value="20" max="100"></progress>

**Milestone Levels**
- ✅ Activity 1 complete → **20%**
- ⏳ Activity 2 complete → **50%**
- ⏳ Activity 3 complete → **75%**
- ⏳ Activity 4 complete → **100%**

### Activity Progress
**Activity 1 (Project Initialization):** 100%
<progress value="100" max="100"></progress>

**Activity 2 (Prerequisites & System Design):** 0%
<progress value="0" max="100"></progress>

---

## Project Activity 1 – Deliverables

> All Activity 1 deliverables are stored in: **docs/activity-1/**

### 📄 Documents (PDF)
- [Business Case (PDF)](docs/activity-1/Business_Case_GroupG_EcosystemApp.pdf)
- [Project Charter (PDF)](docs/activity-1/Charter_Document_GroupG_EcosystemApp.pdf)
- [Pitch Deck (PDF)](docs/activity-1/Pitch_Deck_GroupG_EcosystemApp_Activity1.pdf)

### 📝 Documents (DOCX)
- [Business Case (DOCX)](docs/activity-1/Business_Case_GroupG_EcosystemApp.docx)
- [Project Charter (DOCX)](docs/activity-1/Charter_Document_GroupG_EcosystemApp.docx)
- [Pitch Deck (DOCX)](docs/activity-1/Pitch_Deck_GroupG_EcosystemApp_Activity1.docx)

---

## 📁 Repository Structure (Current)
```text
/
├─ README.md
├─ assets/
│  └─ hero.png
└─ docs/
   └─ activity-1/
      ├─ Business_Case_GroupG_EcosystemApp.pdf
      ├─ Business_Case_GroupG_EcosystemApp.docx
      ├─ Charter_Document_GroupG_EcosystemApp.pdf
      ├─ Charter_Document_GroupG_EcosystemApp.docx
      ├─ Pitch_Deck_GroupG_EcosystemApp_Activity1.pdf
      └─ Pitch_Deck_GroupG_EcosystemApp_Activity1.docx