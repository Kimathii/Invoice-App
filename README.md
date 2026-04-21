# Invoice App — Stage 2

A fully responsive Invoice Management Application built with React, TypeScript, Zustand, and TailwindCSS.

---

## Quick Start

### Prerequisites
- Node.js v18+
- npm v9+

### Setup

```bash
# 1. Clone the repo
git clone <your-repo-url>
cd invoice-app

# 2. Install dependencies
npm install

# 3. Start dev server
npm run dev

# 4. Open in browser
# http://localhost:5173
```

### Build for Production

```bash
npm run build
npm run preview
```

---

## Tech Stack

| Tool | Purpose |
|---|---|
| React 18 | UI framework |
| TypeScript | Type safety |
| Vite | Build tool & dev server |
| TailwindCSS v3 | Utility-first styling |
| React Router v6 | Client-side routing |
| Zustand | Global state + localStorage persistence |
| React Hook Form | Form state management |
| Zod | Schema validation |
| date-fns | Date formatting & calculations |
| Lucide React | Icon library |

---

## Architecture

```
src/
├── types/              # TypeScript interfaces (Invoice, Address, etc.)
├── store/              # Zustand store — all CRUD logic + persistence
├── hooks/              # useTheme (dark mode)
├── utils/              # Pure functions: ID gen, date format, currency
├── components/
│   ├── ui/             # Reusable primitives: Button, Badge, Input, Modal
│   ├── invoice/        # Domain components: Card, Form, DeleteModal
│   └── layout/         # Sidebar, ThemeToggle, Layout shell
├── pages/              # Route-level components
└── styles/             # Global CSS + Tailwind directives
```

### State Management
All invoice data lives in a single Zustand store (`useInvoiceStore`). The `persist` middleware automatically syncs to `localStorage` — no manual save/load needed.

### Theming
Dark mode uses Tailwind's `class` strategy. A `dark` class is toggled on `<html>` via the `useTheme` hook. Theme preference is stored in `localStorage`.

---

## Key Design Decisions

- **No backend** — localStorage is sufficient for the spec. The persistence layer is abstracted so swapping to an API later requires changing only the Zustand store.
- **Drawer (not page) for forms** — matches the Figma design; the form slides in over the invoice list without a route change.
- **Custom calendar** — built from scratch to match the Figma exactly, no third-party date picker.
- **Zod + React Hook Form** — Zod defines the validation schema as a single source of truth; RHF handles all form state without re-renders.

---

## Accessibility

- Semantic HTML throughout (`<button>`, `<label>`, `<nav>`, `<main>`)
- All form fields have associated `<label>` elements
- Delete modal traps focus and closes on `ESC`
- Status badges use color + text (not color alone)
- WCAG AA color contrast in both light and dark modes
- `aria-invalid` and `aria-describedby` on form error states

---

## Scripts

```bash
npm run dev       # Start dev server
npm run build     # TypeScript check + Vite build
npm run preview   # Preview production build
npm run lint      # ESLint check
```
