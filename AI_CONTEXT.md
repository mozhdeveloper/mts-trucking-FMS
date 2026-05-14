# AI_CONTEXT.md — MTS Trucking Incorporated

> **For AI Assistants:** This file provides complete context about this codebase. Read it fully before making any suggestions or modifications.

---

## 1. Platform Origin

This project is a **white-label fork** of the **NexLogistics MVP platform**, originally built by **NexVision Innovations** as a reusable enterprise logistics SaaS foundation.

- **Parent platform:** NexLogistics (by NexVision Innovations)
- **This instance:** MTS Trucking Incorporated
- **Fork type:** Full white-label rebrand — all NexVision/NEX branding has been replaced with MTS Trucking branding
- **Do NOT reintroduce:** any "Nex", "NEX", "NexVision", "NexLogistics", or "nex-" strings anywhere in code, UI text, or data
- **Git:** NOT initialized (intentional). Do not run `git init` unless explicitly instructed.

---

## 2. What This Platform Is

NexLogistics (and by extension, MTS Trucking Incorporated) is an **enterprise-grade logistics and fleet management SaaS MVP** built to feel like:

- Uber Freight
- Samsara
- Motive / KeepTruckin
- Fleetio
- SAP Transportation Management
- Oracle Logistics Cloud

**It must never look like:** a student project, a generic admin template, or a low-quality CRUD system.

**It must feel:** premium, modern, sleek, corporate, operationally realistic, and presentation-ready for enterprise clients and investors.

---

## 3. Tech Stack

| Layer | Technology |
|---|---|
| Framework | Next.js 14 App Router (TypeScript strict) |
| Styling | Tailwind CSS + shadcn/ui |
| Icons | Lucide React |
| Charts | Recharts |
| Animation | Framer Motion |
| State | Zustand + persist (localStorage, prefix `mts-*`) |
| Fonts | Inter (body), Montserrat (display/headings), Roboto (secondary) |
| Backend (planned) | Supabase (PostgreSQL + Auth + Storage) |
| Maps (planned) | Mapbox or Google Maps API |
| Deployment (planned) | Vercel (frontend) + Supabase (backend) |

**Current MVP state:** All data is local/demo (Zustand + seeded static data). No live database or API connection yet. Supabase integration is a future phase.

---

## 4. Application Architecture

```
app/
  (auth)/           # Login page — role-based demo account selector
  (app)/            # All authenticated routes (protected layout)
    dashboard/      # Main KPI dashboard
    fleet/          # Fleet management CRUD
    drivers/        # Driver management CRUD
    trips/          # Trip & dispatch management
    gps-tracking/   # Simulated live GPS map
    maintenance/    # PMS / preventive maintenance
    expenses/       # Fuel & expense tracking
    payroll/        # Payroll computation module
    proof-of-delivery/ # POD upload + signature
    reports/        # Reports & analytics
    ai-insights/    # AI insight cards (demo/preview)
    attendance/     # Demo preview module
    client-portal/  # Demo preview module
    billing/        # Demo preview module
    warehouse/      # Demo preview module
    route-optimization/ # Demo preview module
    settings/       # System settings
components/
  Brand/            # Logo component (uses /public/logo.jpg)
  layout/           # Sidebar, TopNavbar, shared layout
  ui/               # shadcn/ui primitives
lib/
  store/            # Zustand stores (all keys prefixed mts-*)
  data/             # Seeded demo data (vehicles, drivers, users, etc.)
public/
  logo.jpg          # MTS Trucking logo (black/red chevron + wordmark)
  favicon.svg       # MTS brand favicon
```

---

## 5. User Roles

| Role | Slug | Access |
|---|---|---|
| Super Admin | `super_admin` | Everything |
| Company Admin | `company_admin` | Company, users, vehicles, drivers, payroll, reports |
| Dispatcher | `dispatcher` | Trips, dispatching, assignments, statuses |
| Driver | `driver` | Assigned trips, status updates, POD upload |
| Accounting/HR | `accounting` | Payroll, attendance, expenses, salary records |
| Client/Customer | `client` | Track deliveries, view invoices, download POD |

Demo login accounts: all use `@mtstrucking.demo` email domain. Password is `password` for all demo accounts.

---

## 6. Core Modules

### Functional (fully built)
- **Dashboard** — Animated KPI cards (vehicles, trips, fuel cost, payroll, revenue), charts, activity feed
- **Fleet Management** — CRUD (add/edit/archive vehicles, assign drivers, upload documents, vehicle profile pages)
- **Driver Management** — CRUD (driver profiles, license tracking, performance, payroll summary)
- **Trip & Dispatch** — Kanban board, trip creation, status pipeline, activity timeline, trip detail pages
- **PMS / Maintenance** — Maintenance schedules, mileage reminders, overdue alerts, repair logs
- **Fuel & Expenses** — Fuel entries, repair/toll/cash advance expenses, per-vehicle reports
- **Payroll** — Salary computation, incentives, overtime, deductions, payslip preview (Draft/Approved/Paid)
- **Proof of Delivery** — Photo upload, signature pad, receiver details, GPS timestamp
- **Reports & Analytics** — Trip, vehicle, driver performance, fuel, maintenance, payroll, delivery performance reports

### Demo Preview (beautiful placeholder pages)
- **AI Insights** — Futuristic insight cards (uses "MTS AI Engine" branding)
- **Attendance** — Preview module
- **Client Portal** — Preview module
- **Billing & Invoices** — Preview module
- **Warehouse** — Preview module
- **Route Optimization** — Preview module

---

## 7. Demo Data

All demo data is in `lib/data/`. It is seeded with MTS Trucking branding:

**Vehicles:** `MTS-101` through `MTS-110` (Trucks, Vans, Reefer Van, Wing Van, Motorcycle, Trailer, Pickup)

**Drivers:** Mark Santos, John Cruz, Allan Reyes, Carlo Mendoza, Ryan Garcia, Joseph Tan, Miguel Dela Cruz, Ronnie Bautista, Edwin Ramos, Paolo Lim

**Clients:** ABC Construction, Manila Fresh Foods, Northline Distribution, QuickMart Retail, Prime Medical Supply, Pampanga Builders Depot

**Users (demo login):**
- `admin@mtstrucking.demo` — Super Admin
- `operations@mtstrucking.demo` — Company Admin
- `dispatcher@mtstrucking.demo` — Dispatcher
- `driver.mark@mtstrucking.demo` — Driver
- `finance@mtstrucking.demo` — Accounting/HR

**Trips:** 20+ trips with mixed statuses (Scheduled, In Transit, Delivered, Delayed, Completed, Cancelled)

---

## 8. State Management

Zustand stores in `lib/store/`. All localStorage keys are prefixed `mts-*` to avoid conflicts if multiple client deployments run in the same browser.

Key stores:
- `mts-fleet` — vehicles
- `mts-drivers` — drivers
- `mts-trips` — trips
- `mts-payroll` — payroll records
- `mts-expenses` — fuel & expenses
- `mts-maintenance` — PMS records
- `mts-ui` — UI state (sidebar collapse, dark mode, etc.)

---

## 9. GPS Tracking

Currently simulated (no real GPS hardware). Architecture supports future integration with:
- Traccar
- Teltonika
- Any third-party GPS/telematics API

Vehicle marker legend:
- 🟢 Green = Active / In Transit
- 🟡 Yellow = Idle
- 🔴 Red = Delayed
- ⚫ Gray = Offline

---

## 10. Design System Principles

- **Spacing:** Clean, generous. Industrial feel — precise grid alignment.
- **Cards:** Hard-edged offset shadows (industrial style), hover elevation. KPI widgets with sparklines and trend indicators.
- **Tables:** Sharp, legible with status badges, hover rows, pagination.
- **Animations:** Framer Motion — subtle transitions, loading skeletons, animated chart entries. No excessive motion.
- **Shadows:** Industrial hard-offset style: `box-shadow: 4px 4px 0px #111111` on featured cards. No soft blurry shadows for primary elements.
- **Border Radius:** Minimal — `2px` max on buttons and inputs to maintain the sharp industrial geometry of the logo.
- **Badges:** Color-coded status badges (custom Tailwind variants).
- **Chevron Pattern:** Subtle repeating diagonal/chevron CSS pattern available as `bg-chevron-pattern` for section backgrounds and dividers.
- **Dark Mode:** Supported via Zustand `mts-ui` store + Tailwind dark class strategy.

---

## 11. MTS Trucking Branding

> Source: `mtstruckingbranding.md` (NexVision Innovations design spec)

### Brand Personality
Industrial · Powerful · Reliable · Forward-momentum · Modern · No-nonsense

### Logo
- File: `public/logo.jpg`
- Design: Bold black/charcoal forward-pointing chevrons forming "MTS", Chevron Red accent, "TRUCKING INCORPORATED" wordmark in clean sans-serif beneath
- Component: `components/Brand/Logo.tsx` (accepts `size`, `showWordmark`, `light`, `wordmarkSize` props)
- Usage: Sidebar header (collapsed = icon only, expanded = icon + wordmark), Login page header

### Color Palette

| Token | Color | Hex | Usage |
|---|---|---|---|
| `brand-black` | Industrial Black | `#111111` | Primary headings, strong backgrounds |
| `brand-red` | Chevron Red | `#E3000F` | Primary CTA, active states, key accents |
| `brand-red-dark` | Deep Red | `#B00009` | Hover states, gradient end |
| `brand-red-light` | Light Red Tint | `#FCE5E7` | Backgrounds, highlights |
| `brand-charcoal` | Charcoal Gray | `#4A4A4A` | Secondary buttons, dark mode borders |
| `brand-steel` | Steel Gray | `#7A7A7A` | Subtitle text, inactive states, subtle borders |
| `brand-ash` | Light Ash | `#F4F4F5` | Alternating section backgrounds |
| `brand-white` | Pristine White | `#FFFFFF` | Primary background, button text |

**Backward-compat aliases** (so existing shadcn/ui components using `brand-teal`/`brand-navy` auto-render in MTS colors):
- `brand-teal` → `#E3000F` (maps to Chevron Red)
- `brand-teal-dark` → `#B00009`
- `brand-navy` → `#111111` (maps to Industrial Black)
- `brand-navy-light` → `#1F1F1F`

### Gradients & Textures
```css
/* Brand gradient */
background-image: linear-gradient(135deg, #E3000F 0%, #B00009 100%);
/* Tailwind: bg-brand-gradient */

/* Chevron pattern (diagonal lines texture) */
background-image: repeating-linear-gradient(45deg, #111111 0 1px, transparent 1px 8px);
/* Tailwind: bg-chevron-pattern */
```

### Typography
| Role | Font | Weight | Notes |
|---|---|---|---|
| Display / Headings | Montserrat | Bold / Black | Uppercase for high-impact statements |
| Body / UI | Inter | Regular / Medium | Paragraphs, tables, navigation, data |
| Secondary | Roboto | Regular | Dense data tables, secondary labels |

### UI Component Rules
- **Buttons (Primary):** Solid `#E3000F` (Chevron Red) background, white Montserrat Bold uppercase text, `border-radius: 2px` max (sharp/industrial)
- **Shadows:** Hard-edged industrial offset: `4px 4px 0px rgba(17,17,17,1)` on primary cards; `4px 4px 0px rgba(227,0,15,1)` for red-accented elements
- **Borders:** `border-radius: 0` or `2px` maximum — no round corners on primary UI elements
- **Accents:** Use diagonal/chevron CSS patterns as background textures or section dividers
- **Section Backgrounds:** Alternate between `#FFFFFF` and `#F4F4F5` (light ash)
- **Sidebar:** Dark background using `brand-black` (#111111), Chevron Red active state

---

## 12. Development Rules for AI

1. **Never add** `Nex`, `NEX`, `NexVision`, `NexLogistics`, or `nex-` anywhere.
2. **Brand colors** — always use the `brand-*` Tailwind tokens defined in `tailwind.config.ts`. Do not hardcode hex values.
3. **Fonts** — use `font-display` (Montserrat) for headings, `font-sans` (Inter) for body.
4. **Border radius** — keep minimal (`rounded-sm` or none). Do not use `rounded-xl` or `rounded-full` on primary components — this violates the industrial design spec.
5. **Shadows** — use `shadow-industrial` or `shadow-industrial-red` (defined in `tailwind.config.ts`) for primary cards, not soft `shadow-md`.
6. **Logo** — always use the `<Logo>` component from `components/Brand/Logo.tsx`, never inline brand name text.
7. **localStorage keys** — always prefix with `mts-`.
8. **Demo data emails** — always use `@mtstrucking.demo` domain.
9. **Vehicle plates** — always use `MTS-XXX` format.
10. **Git** — NOT initialized. Do not run `git init` unless the user explicitly requests it.
11. **Supabase** — not yet connected. Keep all data in Zustand stores until integration is explicitly requested.
12. **Build** — run `npm run build` after significant changes to verify 0 TypeScript errors.
