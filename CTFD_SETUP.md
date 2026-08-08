# Setting up CTFd for CSeC Weekly Challenges

This is a from-scratch walkthrough: getting a real CTFd instance running on
a server, then pointing this website at it. Once done, the "Weekly
Challenges" buttons and the homepage CTFd panel switch from mock data to
live data automatically — no code changes needed (see `ARCHITECTURE.md`).

Two parts: **Part 1** stands up CTFd itself. **Part 2** connects it to the
site.

**CSeC is currently running Part 1 via Railway** (see 1B below) rather than
a self-managed VPS — cheaper to start with zero server experience, no
Docker/SSH/HTTPS setup required. Part 1A (VPS) is kept here as the
migration path for later, since it's cheaper long-term. See "Migrating off
Railway" at the bottom.

---

## Part 1B — Deploying CTFd on Railway (current setup)

1. In Railway, **New Project → Template**, search "CTFd", deploy it. This
   uses the official `ctfd/ctfd` image with SQLite (no separate database
   needed) — no Docker/server knowledge required on your end.
2. Once the service is "Online", go to its **Settings → Networking** and
   click **Generate Domain** if one isn't already assigned. That
   `https://xxxx.up.railway.app` URL is your `CTFD_BASE_URL`.
3. Visit that URL and run through the setup wizard (see step 5 in Part 1A
   below — identical either way).
4. Generate an API token (step 7 below).
5. **Important, easy to miss**: if you set User Mode to "Teams" during
   setup, CTFd requires *every* account — including the admin account this
   token belongs to — to have a team before it'll serve challenges/config
   through the API. Log in, go to `/team`, and create one (any name is
   fine). Without this, API requests get silently redirected to CTFd's
   login/team page instead of returning data — `http-client.ts` surfaces
   this clearly now (`CtfdApiError ... redirected to CTFd's login page`),
   but it's worth doing up front.
6. Also check **Admin Panel → Config → Time**: if the competition is
   Paused/Halted (or a start time in the future), the challenges endpoint
   won't serve data even with a valid admin token + team. Set it to
   running (or clear the start/end times) if you want the "weekly
   challenges" board live year-round rather than only during set windows.
7. This Railway template has no Redis, so it falls back to a slower cache.
   If something looks stale after a config change (e.g. you just created a
   team and API calls still act like you haven't), restart the service in
   Railway (Settings → the service → restart/redeploy) to clear it.
8. Optional: add a custom domain (Settings → Networking → **Custom
   Domain**) pointed at a subdomain like `ctf.csec.iitb.ac.in` instead of
   the raw `railway.app` URL — see "Migrating off Railway" for why this is
   worth doing early.

Then skip to **Part 2** below with your Railway URL (or custom domain) as
`CTFD_BASE_URL`.

---

## Part 1A — Deploying CTFd on your own server (VPS)

### 1. Get a server

CTFd needs to run somewhere with a public IP, 24/7 — not something that
lives on your laptop. Options, cheapest first:

- **Oracle Cloud "Always Free" tier** — free forever, and its free ARM
  instance (4 cores / 24 GB RAM) is more than CTFd needs. Most popular
  choice for student CTF clubs. Sign up at oracle.com/cloud/free.
- **A cheap VPS** — DigitalOcean, Hetzner, or Linode, roughly $5–6/month
  for a 1–2 GB box (CTFd's own docs list 2 GB RAM / dual-core as the
  recommended minimum).
- **Existing IITB infra** — if CSeC already has a server or hosting
  arrangement through the institute for club activities, worth checking
  with whoever manages that before paying for a new VPS.

Whichever you pick, you want: Ubuntu 22.04 (or similar), a public IPv4
address, and SSH access.

You'll also want a domain or subdomain pointed at that IP — e.g.
`ctf.csec.iitb.ac.in`. Ask whoever controls the `csec.iitb.ac.in` DNS to
add an `A` record for a subdomain pointing at your server's IP.

### 2. SSH in and install Docker

Run `ssh` from either Git Bash or PowerShell — both have it built in on
Windows. Once connected, you're in a real bash shell on the Ubuntu server,
so every command below through Part 1 runs there, not on your machine.

```bash
ssh <user>@<server-ip>

# Install Docker + Docker Compose (Ubuntu)
curl -fsSL https://get.docker.com | sh
sudo usermod -aG docker $USER
# log out and back in for the group change to apply
```

Verify:

```bash
docker --version
docker compose version
```

### 3. Get CTFd running

```bash
git clone https://github.com/CTFd/CTFd.git
cd CTFd

# Generate a random secret key CTFd needs for sessions/tokens
head -c 64 /dev/urandom > .ctfd_secret_key

docker compose up -d
```

CTFd is now running on the server at port `8000`. Confirm with:

```bash
curl -I http://localhost:8000
```

### 4. Put it behind HTTPS on your domain

Docker Compose does **not** set up HTTPS by default — that part's on you,
and you want it, since this is a public site people log into. Easiest way:
[Caddy](https://caddyserver.com), which gets you free auto-renewing
HTTPS in about five lines of config.

```bash
sudo apt install -y caddy   # or see caddyserver.com/docs/install
```

Edit `/etc/caddy/Caddyfile`:

```
ctf.csec.iitb.ac.in {
    reverse_proxy localhost:8000
}
```

```bash
sudo systemctl reload caddy
```

Visit `https://ctf.csec.iitb.ac.in` — you should land on CTFd's setup
wizard. If it doesn't load, double check the DNS record has propagated
and that port 80/443 are open on the server's firewall/security group.
To check DNS from your own machine:

```powershell
# PowerShell
Resolve-DnsName ctf.csec.iitb.ac.in
```

```bash
# Git Bash
nslookup ctf.csec.iitb.ac.in
```

It should resolve to your server's IP. If it doesn't yet, DNS changes can
take anywhere from a few minutes to a few hours to propagate.

### 5. Run the setup wizard

CTFd walks you through this on first load:

- **Event name / description** — e.g. "CSeC Weekly Challenges"
- **User mode** — "Teams" if people compete in teams, "Users" for solo.
  Most college CTF clubs use Teams.
- **Admin account** — this becomes your CTFd admin login. Use a real
  password manager for this one, it has full control of the instance.
- **Style/theme** — defaults are fine, can be changed later.

### 6. Configure visibility (matters for the website integration)

Go to **Admin Panel → Config → Visibility**. This controls whether
challenges/scoreboard are readable without an API token:

- **Public** — anyone (including this website, without a token) can read
  challenges and the scoreboard. Simplest for the integration, and typical
  for a club that wants the site to show live challenges to visitors.
- **Private** — only logged-in/registered users can see them. The website
  then needs an admin API token to read that data server-side (still works
  fine, just an extra step below).

Either is fine — pick based on whether you want challenges visible to
people who haven't registered on CTFd yet.

### 7. Generate an API token (recommended either way)

Even with Public visibility, an admin token lets the website pull the
event name/dates from CTFd's config automatically, and is required to read
notifications/team lookups. As the admin user:

1. Go to `/settings` → **Access Tokens** tab.
2. Set an expiration (or "never", though rotating it periodically is
   better practice) and click **Generate**.
3. Copy the token immediately — CTFd only shows it once.

### 8. Add your first challenges

**Admin Panel → Challenges → +** to add a category and challenges (name,
description, points, flag). This is the actual "weekly" workflow going
forward: add a new challenge (or a themed batch) each week, and it shows
up on the site automatically next time the homepage panel refreshes
(within ~60 seconds, see `http-client.ts`).

---

## Part 2 — Connecting the website

Once CTFd is live, in `csec-iitb/`:

1. Copy `.env.example` to `.env.local` if you haven't already.
2. Fill in:

   ```
   CTFD_BASE_URL=https://ctf.csec.iitb.ac.in
   CTFD_API_TOKEN=<the token from step 7>
   NEXT_PUBLIC_CTFD_URL=https://ctf.csec.iitb.ac.in
   ```

   Leave the `CTFD_EVENT_*` vars unless the config visibility means the
   token can't read `/api/v1/configs` — in that case set
   `CTFD_EVENT_NAME` / `CTFD_EVENT_DESCRIPTION` as a manual fallback (see
   comments in `.env.example`).

3. Restart the dev server:

   ```bash
   npm run dev
   ```

4. Open `http://localhost:3000` — the homepage's "Live where the club
   actually competes" section should now show your real featured
   competition, scoreboard, and recent challenges instead of the sample
   data. The "Weekly Challenges" buttons in the navbar/hero now link to
   your real CTFd URL instead of `#`.

If the panel shows empty scoreboard/challenges instead of erroring, check
the terminal running `npm run dev` — `http-client.ts` logs a
`[ctfd] ... failed, falling back` line with the actual error (wrong token,
visibility set to Private without a token, DNS/HTTPS issue, etc.) rather
than crashing the page.

### When you deploy the website itself

Whatever hosts the production site (Vercel, your own server, etc.) needs
the same three env vars set in its environment/project settings — `.env.local`
only applies locally.

---

## Ongoing maintenance

- **Adding weekly challenges**: Admin Panel → Challenges, as in step 8.
  No website changes needed.
- **Updating CTFd**: `docs.ctfd.io/docs/deployment/updating` — generally
  `git pull && docker compose up -d --build` in the CTFd directory (VPS)
  or just redeploy the service (Railway).
- **Backups**: back up the database periodically either way — Admin Panel
  has an Exports feature for a full JSON/zip export of the whole CTF
  (challenges, users, submissions, config), independent of hosting method.

---

## Part 3 — Branding CTFd to match csec.iitb.ac.in

CTFd's default theme is plain Bootstrap. Self-hosted (Railway included)
you don't get full custom theme uploads without CTFd's paid tiers, but
Admin Panel → Config gives you logo/favicon/color, and **Config → Theme**
gives you a raw CSS/JS injection point (Theme Header) — enough to fully
reskin it without touching CTFd's code. That's what's set up here.

### 1. Upload the logo and favicon

Both are in this repo:

- **Logo** (shown in the CTFd navbar): `public/csec-logo-new.png` — go to
  **Admin Panel → Config → General** and upload it under "Logo". It's
  already white/cyan on transparent, so it works as-is on CTFd's dark
  navbar, no editing needed.
- **Favicon**: a cropped, dark-background version was generated at
  `ctfd-branding/favicon.ico` (browser tab icon) — upload it under
  "Small Icon" in the same Config → General panel. `ctfd-branding/favicon_256.png`
  is a larger version if a field asks for a bigger square image instead.

### 2. Set the CSS theme override

`ctfd-theme.css` in the repo root has the full override — dark "ink"
background, "signal" blue + "cyan" accents, and the same Space Grotesk /
Inter / JetBrains Mono fonts as the main site, applied to CTFd's navbar,
buttons, cards, challenge tiles, tables, badges, and footer.

1. Open `ctfd-theme.css`, copy the **entire contents** (comment, `<link>`,
   and `<style>` block together).
2. In CTFd: **Admin Panel → Config → Theme** tab.
3. Paste the whole thing into **Theme Header**.
4. Save, then hard-refresh the site (Ctrl+Shift+R) to bypass any cached
   CSS.

### 3. Replace the landing page

CTFd's default pre-login homepage ("A cool CTF platform from ctfd.io") is
editable content, not code — **Admin Panel → Pages**, edit (or create) the
page with route `index`. `ctfd-index-page.html` in the repo root has a
branded replacement: logo, tagline, description, a "Start Solving" /
"Main Site" button pair, and links to CSeC's actual GitHub/Discord/
Instagram/LinkedIn (the original page's Facebook icon was actually mislinked
to Discord — fixed here). Read the comment at the top of that file before
pasting — the logo needs to be uploaded through the Pages editor first so
you get a working image URL, the file has a placeholder marking exactly
where that URL goes.

### 4. Set the event name

While you're in Config → General, set "CTF Name" to something real (it's
currently "Test") — this is also what `/api/v1/configs` feeds into the
website's featured-competition card when the admin token can read it.

That's it — no custom theme build, no Docker image rebuild, just config +
one CSS paste. If something looks off after pasting, the most common cause
is Theme Header content not saving fully (long paste, check it wasn't
truncated) — reopen the field and confirm the closing `</style>` tag is
still there.

---

## Migrating off Railway later

Railway's free trial is ~$5 in credit (roughly a week for this app), then
it's their Hobby plan at $5/month minimum to keep it running — fine to
start with, but a free VPS (Part 1A) is cheaper long-term once there's
time to set one up. Moving over doesn't mean starting from scratch:

1. Stand up CTFd on the new server via Part 1A.
2. On the Railway instance: Admin Panel → export a full backup.
3. On the new instance: Admin Panel → import that backup.
4. Generate a fresh API token on the new instance.
5. Update `CTFD_BASE_URL` / `CTFD_API_TOKEN` / `NEXT_PUBLIC_CTFD_URL`.

If you set up a custom domain on Railway (Part 1B, step 7) instead of using
the raw `railway.app` URL, step 5 shrinks to just the token — repoint that
domain's DNS at the new server's IP and `CTFD_BASE_URL` never has to
change.
