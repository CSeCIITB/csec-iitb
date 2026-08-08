# Architecture

This document is the map for turning the current static-content site into
the full platform (CTFd, Google Cloud backend, auth, admin dashboard, blog
CMS) without a rewrite.

## Guiding principle: swap the data layer, not the UI

Every page reads from `src/lib/content/*` or `src/lib/ctfd/*` — never from
inline arrays in components. Those modules are the seam. Each currently
exports plain, typed data or a mock client; each will later export the same
shape, backed by a real fetch. Components never change.

```
UI (src/app, src/components)
        │  imports typed data / calls a client interface
        ▼
src/lib/content/*      src/lib/ctfd/*
   (typed data)          (CtfdClient interface)
        │                       │
        ▼                       ▼
   [ today: static ]     [ today: MockCtfdClient ]
   [ later: fetch from   [ later: HttpCtfdClient calling
     the Cloud backend ]   CTFd's /api/v1 via a Route Handler ]
```

## CTFd

- `src/lib/ctfd/types.ts` mirrors CTFd's own `/api/v1` response shapes.
- `src/lib/ctfd/client.ts` defines `CtfdClient`, an interface every CTFd-aware
  component depends on — never on CTFd's HTTP API directly. It exports
  `MockCtfdClient` when `CTFD_BASE_URL` is unset, and
  `HttpCtfdClient` (`src/lib/ctfd/http-client.ts`) once it's set — see
  `.env.example` for the full list of `CTFD_*` / `NEXT_PUBLIC_CTFD_URL`
  vars this reads.
- `HttpCtfdClient` calls CTFd's `/api/v1` directly from server-side code
  (every current consumer — e.g. `CtfdPanel` — is an async Server
  Component), so `CTFD_API_TOKEN` never reaches the browser without needing
  a separate Route Handler. If a **Client Component** ever needs live CTFd
  data (e.g. an interactive scoreboard search), add
  `src/app/api/ctfd/*` Route Handlers that call `ctfdClient` server-side and
  have the client component fetch those instead of CTFd directly.
- A single CTFd instance models one ongoing event, not a list — competition
  name/dates come from `/api/v1/configs` when `CTFD_API_TOKEN` is an admin
  token, falling back to the human-authored `CTFD_EVENT_*` env vars
  otherwise.
- If CTFd supports OAuth/SSO, member "Sign in" can redirect through CTFd's
  auth and land back with a session — avoiding a second user database.

## Google Cloud backend

Suggested shape, none of it required to read this codebase:

- **Compute**: Cloud Run for the Next.js app (SSR) and any Route Handlers.
- **Database**: Firestore for content that maps naturally to documents
  (events, writeups, gallery metadata, contact submissions) — or Cloud SQL
  (Postgres) if the Blog/CMS layer wants relational queries and full-text
  search.
- **Storage**: Cloud Storage for gallery photos and writeup images, served
  through `next/image` with a `remotePatterns` entry (see
  `next.config.mjs`).
- **Auth**: NextAuth.js with the Google provider (IIT Bombay members already
  have Google accounts) is the lowest-friction path to member accounts.
  Session data gates the future admin dashboard.

## Admin dashboard

A `src/app/admin/*` route group (not yet created) protected by the auth
session above. It would be the write side of `src/lib/content/*` — CRUD for
events, writeups, and team roster, persisted to Firestore/Cloud SQL instead
of the static TypeScript modules used today. Read paths stay identical.

## Blog / CMS

`src/lib/content/writeups.ts` and `src/app/blog/[slug]/page.tsx` are
intentionally already split into **metadata** (title, category, date —
structured) and **body** (currently a placeholder). The natural next step
is Markdown/MDX files per write-up (or a headless CMS if non-technical
members should be able to publish), rendered into that same `[slug]` route.

## What this pass deliberately did not build

- Auth / sessions
- Any server-side data mutation (the contact form is still a stub)
- The admin dashboard
- Real photography in `/gallery`

CTFd is wired up (`src/lib/ctfd/http-client.ts`) but untested against a real
instance — none was deployed yet as of this pass. It was checked against
CTFd's documented API shapes and a public demo instance
(`demo.ctfd.io`) for the endpoints that don't require auth, but the
notifications/configs mappings in particular are best-effort and worth a
sanity check against your real deployment once it's live (see comments in
`http-client.ts`).
