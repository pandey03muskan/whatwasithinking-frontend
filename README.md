# WhatWasIThinking

A minimal, beautiful notes app to capture thoughts before they slip away. Built with Next.js 16 (App Router) + Go backend deployed on Railway.

---

## Features

- Register & login with JWT authentication
- Create, view, edit, delete notes
- Right-side drawer for full note view
- Clean landing page with cream/brown design system
- Fully responsive

## Tech Stack

| Layer | Tech |
|-------|------|
| Framework | Next.js 16 (Turbopack) |
| Styling | Tailwind CSS v4 |
| Icons | Iconify (Phosphor) |
| Fonts | Poppins (sans) + Lora (serif) |
| Backend | Go (deployed on Railway) |

## Project Structure

```
app/
  page.tsx                  # Landing page
  (auth)/
    login/page.tsx          # Login
    register/page.tsx       # Register
  (protected)/
    layout.tsx              # Auth guard + header
    notes/page.tsx          # Notes dashboard
lib/
  apiClient.ts              # Fetch interceptor (auto token injection)
  storage.ts                # localStorage wrapper
  services/
    authService.ts          # register, login, logout
    notesService.ts         # getAll, create, update, delete
components/
  LoginForm.tsx
  RegisterForm.tsx
  NotesList.tsx
  NoteCard.tsx              # Card with edit/delete + title click → drawer
  CreateNote.tsx            # Modal to create note
  EditNote.tsx              # Modal to edit note
  NoteDrawer.tsx            # Right-side drawer for full note view
```

## Getting Started

### 1. Clone & install

```bash
git clone https://github.com/your-username/whatwasithinking.git
cd whatwasithinking
npm install
```

### 3. Run dev server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000)

## API Endpoints

All requests go to `NEXT_PUBLIC_API_URL`.

| Method | Endpoint | Auth | Description |
|--------|----------|------|-------------|
| POST | `/api/v1/register` | No | Register user |
| POST | `/api/v1/login` | No | Login, returns JWT in `user.token` |
| GET | `/api/v1/notes` | Yes | Get all notes |
| POST | `/api/v1/notes` | Yes | Create note |
| PUT | `/api/v1/notes/:id` | Yes | Update note |
| DELETE | `/api/v1/notes/:id` | Yes | Delete note |

Auth header: `Authorization: <token>`

## User Flow

```
/ (landing)
  ├── /register → fill form → redirects to /login
  └── /login    → fill form → redirects to /notes

/notes (protected)
  ├── View all notes (grid)
  ├── Click title → drawer opens from right
  ├── Pencil icon → edit modal
  └── Trash icon → inline confirm → delete
```

## Scripts

```bash
npm run dev      # Start dev server
npm run build    # Production build
npm run start    # Start production server
npm run lint     # Lint
```
