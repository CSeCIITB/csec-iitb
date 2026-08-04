# CSeC IIT Bombay — Website

The official website for the Cyber Security Community (CSeC), IIT Bombay.
Next.js 14 (App Router), TypeScript, Tailwind CSS, Framer Motion.

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
