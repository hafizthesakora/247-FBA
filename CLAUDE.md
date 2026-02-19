# 24/7 FBA Prep & Fulfillment — Project Documentation

## Overview
Marketing website + Client Portal + Admin Panel for a Nürtingen-based Amazon FBA Prep Center + Cargo Shipping (Germany→Ghana) business. Built with Next.js 14 (App Router), TypeScript, and Tailwind CSS.

Phase 1: Public marketing website (complete)
Phase 2: Client portal + Admin panel (complete)
Phase 3: Ops dashboard + Analytics (complete)

## Tech Stack
- **Framework**: Next.js 14+ (App Router) with TypeScript
- **Styling**: Tailwind CSS with custom brand theme
- **Animations**: Framer Motion (scroll-based, page transitions, micro-interactions)
- **Fonts**: Inter (body) + Plus Jakarta Sans (headings) via `next/font/google`
- **Charts**: Recharts (line, bar, pie, area)
- **Icons**: Lucide React
- **Auth**: NextAuth.js v5 (beta) with Credentials provider + JWT sessions
- **Database**: PostgreSQL via Prisma ORM (v7)
- **Email**: Nodemailer with custom SMTP
- **Utilities**: `clsx`, `tailwind-merge`, `class-variance-authority`
- **Validation**: Zod
- **Deployment**: Vercel-ready

## Project Structure
```
src/
├── app/
│   ├── layout.tsx              # Root layout (fonts, metadata, cookie consent)
│   ├── globals.css             # Tailwind + base styles + scrollbar
│   ├── not-found.tsx           # 404 page
│   ├── robots.ts               # robots.txt generation
│   ├── sitemap.ts              # sitemap.xml generation
│   ├── (marketing)/            # Route group for all marketing pages
│   │   ├── layout.tsx          # Navbar + Footer wrapper
│   │   ├── page.tsx            # Homepage
│   │   ├── services/           # /services overview + individual service pages
│   │   ├── pricing/            # Pricing tiers + add-ons
│   │   ├── how-it-works/       # 5-step process + FAQ
│   │   ├── about/              # Company story
│   │   ├── contact/            # Contact form + quote request
│   │   ├── ghana-line/         # Germany→Ghana shipping
│   │   ├── impressum/          # Legal: Impressum (DDG §5)
│   │   ├── datenschutz/        # Legal: Privacy (GDPR)
│   │   └── agb/                # Legal: Terms & Conditions
│   ├── (auth)/                 # Auth pages (login, register, forgot-password)
│   │   ├── layout.tsx          # Centered minimal layout with logo
│   │   ├── login/page.tsx      # Email + password login, role-based redirect
│   │   ├── register/page.tsx   # Client self-registration
│   │   └── forgot-password/    # Password reset request
│   ├── (portal)/               # Client portal (protected, CLIENT role)
│   │   ├── layout.tsx          # Sidebar + Header + SessionProvider
│   │   └── portal/
│   │       ├── page.tsx                  # Dashboard (stats + recent activity)
│   │       ├── shipments/page.tsx        # Shipment list with search
│   │       ├── shipments/new/page.tsx    # Create shipment + items
│   │       ├── shipments/[id]/page.tsx   # Shipment detail + timeline
│   │       ├── inventory/page.tsx        # Warehouse inventory view
│   │       ├── orders/page.tsx           # Order history
│   │       ├── invoices/page.tsx         # Invoice list + payment status
│   │       ├── settings/page.tsx         # Profile + password change
│   │       └── notifications/page.tsx    # Notification center
│   ├── (ops)/                  # Operator dashboard (protected, OPERATOR + ADMIN roles)
│   │   ├── layout.tsx          # Ops sidebar + Header + SessionProvider
│   │   └── ops/
│   │       ├── page.tsx                  # Operator dashboard (stats + tasks + live feed)
│   │       ├── tasks/page.tsx            # Task list with claim/start/complete
│   │       ├── shipments/page.tsx        # Shipments at operator's station
│   │       ├── floor/page.tsx            # Warehouse floor view (all stations)
│   │       └── settings/page.tsx         # Operator profile + password
│   ├── (admin)/                # Admin panel (protected, ADMIN role)
│   │   ├── layout.tsx          # Admin sidebar + Header + SessionProvider
│   │   └── admin/
│   │       ├── page.tsx                  # Dashboard (platform stats)
│   │       ├── clients/page.tsx          # Client list
│   │       ├── clients/[id]/page.tsx     # Client detail + shipments/orders
│   │       ├── shipments/page.tsx        # All shipments + status filter
│   │       ├── shipments/[id]/page.tsx   # Shipment detail + status update
│   │       ├── orders/page.tsx           # All orders + status management
│   │       ├── invoices/page.tsx         # Invoice management
│   │       ├── invoices/new/page.tsx     # Create invoice from order
│   │       ├── settings/page.tsx         # Platform settings
│   │       ├── analytics/page.tsx        # Revenue, throughput, SLA charts (Recharts)
│   │       ├── operators/page.tsx        # Manage operator accounts
│   │       ├── activity/page.tsx         # Platform activity log
│   │       └── floor/page.tsx            # Station management + floor map
│   └── api/
│       ├── auth/
│       │   ├── [...nextauth]/route.ts    # NextAuth handler
│       │   └── register/route.ts         # POST client registration
│       ├── portal/                       # Client API routes (auth required)
│       │   ├── dashboard/route.ts        # GET dashboard stats
│       │   ├── shipments/route.ts        # GET list, POST create
│       │   ├── shipments/[id]/route.ts   # GET detail
│       │   ├── inventory/route.ts        # GET warehouse items
│       │   ├── orders/route.ts           # GET client orders
│       │   ├── invoices/route.ts         # GET client invoices
│       │   ├── settings/route.ts         # GET/PUT profile
│       │   ├── settings/password/route.ts # PUT change password
│       │   ├── notifications/route.ts    # GET notifications
│       │   ├── notifications/[id]/route.ts # PUT mark read
│       │   └── notifications/read-all/route.ts # PUT mark all read
│       ├── ops/                          # Operator API routes (OPERATOR + ADMIN)
│       │   ├── dashboard/route.ts        # GET operator dashboard stats
│       │   ├── tasks/route.ts            # GET operator tasks (filterable)
│       │   ├── tasks/[id]/route.ts       # PUT claim/start/complete task
│       │   ├── shipments/route.ts        # GET shipments at operator's station
│       │   ├── shipments/[id]/scan/route.ts # PUT advance shipment status
│       │   ├── floor/route.ts            # GET all stations
│       │   └── activity-stream/route.ts  # GET SSE live activity feed
│       ├── admin/                        # Admin API routes (ADMIN role)
│       │   ├── stats/route.ts            # GET platform stats
│       │   ├── clients/route.ts          # GET all clients
│       │   ├── clients/[id]/route.ts     # GET client detail
│       │   ├── shipments/route.ts        # GET all shipments
│       │   ├── shipments/[id]/route.ts   # GET/PUT shipment + status
│       │   ├── orders/route.ts           # GET all orders
│       │   ├── orders/[id]/route.ts      # PUT order status
│       │   ├── invoices/route.ts         # GET all, POST create
│       │   ├── invoices/[id]/route.ts    # PUT invoice status
│       │   ├── analytics/route.ts        # GET aggregated analytics data
│       │   ├── operators/route.ts        # GET/POST operator management
│       │   ├── activity/route.ts         # GET paginated activity log
│       │   ├── floor/route.ts            # GET all stations
│       │   ├── floor/stations/route.ts   # POST create station
│       │   ├── floor/stations/[id]/route.ts # PUT update station
│       │   └── tasks/route.ts            # POST create/assign task
│       ├── contact/route.ts              # POST contact form email
│       └── quote/route.ts               # POST quote request email
├── components/
│   ├── ui/                     # Reusable UI primitives (Button, Card, Badge, etc.)
│   ├── layout/                 # Layout components (Navbar, Footer, Container, Section)
│   ├── marketing/              # Homepage sections and marketing page components
│   ├── portal/                 # Portal components
│   │   ├── sidebar.tsx         # Collapsible sidebar nav
│   │   ├── header.tsx          # Top bar with user menu
│   │   ├── mobile-sidebar.tsx  # Mobile slide-out sidebar
│   │   ├── stat-card.tsx       # Dashboard stat cards
│   │   ├── data-table.tsx      # Reusable sortable data table
│   │   ├── status-badge.tsx    # Color-coded status badges
│   │   └── empty-state.tsx     # Empty state placeholder
│   ├── ops/                    # Operator components
│   │   ├── sidebar.tsx         # Ops sidebar nav
│   │   ├── header.tsx          # Ops header with user menu
│   │   ├── mobile-sidebar.tsx  # Ops mobile sidebar
│   │   ├── task-card.tsx       # Task card with claim/complete actions
│   │   ├── station-card.tsx    # Station card with capacity bar
│   │   ├── floor-map.tsx       # CSS Grid layout of station cards
│   │   └── live-feed.tsx       # SSE-powered live activity feed
│   ├── admin/                  # Admin components
│   │   ├── sidebar.tsx         # Admin sidebar nav (+ Operations section)
│   │   ├── header.tsx          # Admin header with user menu
│   │   ├── mobile-sidebar.tsx  # Admin mobile sidebar (+ Operations section)
│   │   └── analytics-chart.tsx # Recharts wrappers (Revenue, Throughput, Pie, Area)
│   └── shared/                 # Cookie consent, AnimateIn, Toast, SessionProvider
├── lib/
│   ├── prisma.ts               # Prisma client singleton
│   ├── fonts.ts                # Font configuration
│   ├── utils.ts                # cn() helper (clsx + tailwind-merge)
│   ├── constants.ts            # Site config, stats
│   ├── email.ts                # Nodemailer transporter + email templates
│   └── activity-logger.ts      # logActivity() utility for ActivityLog entries
├── generated/prisma/           # Prisma generated client (auto-generated)
├── types/
│   ├── next-auth.d.ts          # NextAuth type augmentation (role)
│   ├── services.ts             # Service, PricingTier, Testimonial, etc.
│   └── forms.ts                # ContactForm, QuoteForm types
└── data/
    ├── services.ts             # 6 service definitions
    ├── pricing.ts              # Pricing tiers + add-ons
    ├── testimonials.ts         # Client testimonials
    ├── process-steps.ts        # How-it-works steps
    ├── navigation.ts           # Nav menu structure
    └── ghana-line.ts           # Ghana Line services

prisma/
├── schema.prisma               # Database schema (User, Shipment, Order, Invoice, etc.)
└── seed.ts                     # Seed script with sample data
```

## Authentication & Authorization

### Auth Flow
- NextAuth.js v5 with Credentials provider (email + password)
- JWT session strategy (no database sessions)
- Middleware protects `/portal/*` and `/admin/*` routes
- Role-based access: CLIENT → `/portal`, ADMIN → `/admin`
- Logged-in users redirected away from auth pages

### Roles
- **CLIENT**: Access to portal (shipments, orders, invoices, settings)
- **ADMIN**: Access to admin panel (all clients, all shipments, invoice creation) + ops dashboard
- **OPERATOR**: Access to ops dashboard (tasks, shipments, floor view, settings)

### Auth Config Files
- `src/auth.config.ts` — Edge-compatible config with route protection callbacks
- `src/auth.ts` — Full config with Prisma adapter + Credentials provider
- `src/middleware.ts` — Route protection middleware

## Database Schema (Prisma)

### Models
- **User** — id, name, email, password, role (CLIENT/ADMIN), company, phone
- **Account** + **Session** + **VerificationToken** — NextAuth adapter tables
- **Shipment** — trackingNumber, status, origin, destination, items, weight, notes
- **ShipmentItem** — productName, sku, quantity, prepType
- **Order** — userId, shipmentId, status, totalAmount, service
- **Invoice** — userId, orderId, amount, status, dueDate, paidAt
- **Notification** — userId, title, message, read, type
- **Station** — name, type, status, assignedOperatorId, capacity, currentLoad
- **Task** — title, description, status, priority, type, assignedToId, shipmentId, stationId, dueDate, completedAt
- **ActivityLog** — userId, action, entityType, entityId, metadata (JSON)

### Enums
- **ShipmentStatus**: DRAFT → RECEIVED → INSPECTING → PREPPING → QUALITY_CHECK → READY_TO_SHIP → SHIPPED → DELIVERED
- **OrderStatus**: PENDING, PROCESSING, COMPLETED, CANCELLED
- **InvoiceStatus**: DRAFT, SENT, PAID, OVERDUE, CANCELLED
- **PrepType**: LABELING, POLY_BAG, BUBBLE_WRAP, BUNDLING, INSPECTION, CUSTOM
- **StationType**: RECEIVING, INSPECTION, PREP, QC, SHIPPING
- **StationStatus**: ACTIVE, INACTIVE
- **TaskStatus**: PENDING, IN_PROGRESS, COMPLETED, CANCELLED
- **TaskPriority**: LOW, MEDIUM, HIGH, URGENT
- **TaskType**: RECEIVE, INSPECT, PREP, QC, SHIP, CUSTOM

## Design System

### Colors (defined in tailwind.config.ts)
- **Navy**: `#1e2d3d` (primary dark), `#2a3f54` (lighter), `#15202d` (darker)
- **Orange**: `#e8842c` (primary CTA), `#d4751f` (hover), `#f5a623` (light accent)
- **Surfaces**: `#ffffff`, `#f8f9fa` (offwhite), `#e5e7eb` (borders)
- **Text**: `#1a1a2e` (dark), `#6b7280` (secondary), `#ffffff` (on dark)

### Fonts
- `font-sans` → Inter (body, navigation, UI)
- `font-heading` → Plus Jakarta Sans (headings, hero text)

### Portal/Admin Components
- `StatCard` — Stats with icon, value, optional trend
- `DataTable` — Generic sortable table with column config
- `StatusBadge` — Color-coded status pills for all statuses
- `EmptyState` — Placeholder with icon, message, optional CTA
- `PortalSidebar` / `AdminSidebar` — Collapsible navigation

## Email Configuration
Email is handled via Nodemailer with custom SMTP. See `.env.example` for configuration.

In **dev mode** (no SMTP_USER set), emails are logged to console.
In **production**, emails are sent via the configured SMTP server.

## Seed Data
Run `npm run db:seed` to populate the database with:
- **Admin**: admin@247fba.de / admin123
- **Client 1**: marcus@mwtrading.de / client123
- **Client 2**: sarah@ecogoods.eu / client123
- **Operator 1**: operator1@247fba.de / operator123
- **Operator 2**: operator2@247fba.de / operator123
- Sample shipments, orders, invoices, notifications, stations, tasks, and activity logs

## Commands
```bash
npm run dev        # Start dev server
npm run build      # Production build
npm run start      # Start production server
npm run lint       # ESLint check
npm run db:generate # Generate Prisma client
npm run db:push    # Push schema to database
npm run db:seed    # Seed database with sample data
npm run db:studio  # Open Prisma Studio
```

## Environment Variables
```env
DATABASE_URL="postgresql://..."   # PostgreSQL connection string
NEXTAUTH_URL="http://localhost:3000"
NEXTAUTH_SECRET="your-secret"
SMTP_HOST, SMTP_PORT, SMTP_USER, SMTP_PASS
EMAIL_FROM, EMAIL_TO
```

## Deployment
Vercel-ready. Set all environment variables. Run `prisma db push` and `prisma db seed` for database setup.
