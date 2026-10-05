# CSeC IIT Bombay — Website

The official website for the Cyber Security Community (CSeC), IIT Bombay.
Next.js 16 (App Router), TypeScript, Tailwind CSS, Framer Motion.

## Getting started

```bash
npm install
npm run dev
```

Open http://localhost:3000.

> **Fonts note:** the project uses `next/font/google` (Space Grotesk, Inter,
> JetBrains Mono), which downloads and self-hosts font files at build/dev
> time. This requires outbound access to `fonts.googleapis.com` /
> `fonts.gstatic.com` — make sure that's reachable in your environment.

## Scripts

| Command           | Description                          |
| ------------------ | ------------------------------------ |
| `npm run dev`       | Start the dev server                 |
| `npm run build`     | Production build                     |
| `npm run start`     | Serve the production build           |
| `npm run lint`      | ESLint                               |
| `npm run typecheck` | `tsc --noEmit`                       |

## Deployment (Docker)

The app builds as a Next.js [standalone](https://nextjs.org/docs/app/api-reference/config/next-config-js/output)
server and ships in a small, non-root `node:22-alpine` image.

```bash
docker build -t csec-iitb .
docker run -p 3000:3000 --env-file .env csec-iitb   # --env-file is optional
```

or with Compose (reads `.env` if present):

```bash
docker compose up -d --build
```

- CTFd settings (`CTFD_BASE_URL`, `CTFD_PUBLIC_URL`, `CTFD_API_TOKEN`,
  `CTFD_EVENT_*`) are all read at runtime — pass them with `-e` / `--env-file`.
- The container listens on `PORT` (default `3000`) — put it behind a reverse
  proxy / load balancer that terminates TLS.

### Self-hosting everything on one machine

`deploy/local-server.sh up` runs the site **and** CTFd in containers and
prints public HTTPS links (Cloudflare quick tunnels). See `CTFD_SETUP.md`,
Part 1.

## Project structure

```
src/
├── app/                    # Routes (App Router)
│   ├── about/ events/ workshops/ resources/
│   ├── blog/ blog/[slug]/
│   ├── gallery/ team/ contact/
│   ├── layout.tsx          # Fonts, metadata, nav/footer shell
│   └── page.tsx            # Home
├── components/
│   ├── layout/              # Navbar, Footer
│   ├── ui/                  # Button, Badge, Card (shadcn-style atoms)
│   ├── shared/               # Reveal, DecryptText, SectionHeading, Logo…
│   ├── home/                 # Homepage-only sections
│   └── contact/              # Contact form
├── lib/
│   ├── content/               # Typed, real CSeC content (achievements,
│   │                            team, events, resources, writeups)
│   ├── ctfd/                  # CtfdClient interface + mock implementation
│   ├── constants.ts            # Nav, socials, site metadata
│   └── utils.ts                 # cn() helper
└── hooks/, types/
```

See `ARCHITECTURE.md` for how this connects to CTFd and the future Google
Cloud backend, auth, and admin dashboard.

## Content sourcing

Copy and data throughout the site are sourced and modernized from the
current CSeC site (cseciitb.github.io) — achievements, team roster,
workshop names, the resources taxonomy, and recent write-up titles are all
real. A few sections are explicitly marked as placeholders where source
data wasn't available (see inline comments in `src/lib/content/team.ts` and
`src/app/gallery/page.tsx`) rather than inventing names or photos.
