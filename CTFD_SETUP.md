# Setting up CTFd for CSeC Weekly Challenges

This is a from-scratch walkthrough: getting a real CTFd instance running on
a server, then pointing this website at it. Once done, the "Weekly
Challenges" buttons and the homepage CTFd panel switch from mock data to
live data automatically — no code changes needed (see `ARCHITECTURE.md`).

Two parts: **Part 1** stands up CTFd itself. **Part 2** connects it to the
site.

**CSeC currently runs everything on one machine** — CTFd, the website, and
public HTTPS links via Cloudflare quick tunnels — with a single script (see
Part 1 below). Part 1A (VPS) is kept as the path to a permanent server.

---

## Part 1 — Running on this machine (current setup)

Needs Docker or Podman. From the repo root:

```bash
deploy/local-server.sh up       # start/refresh everything, print public links
deploy/local-server.sh urls     # print the current links again
deploy/local-server.sh status   # container status
deploy/local-server.sh down     # stop (CTFd data stays in the csec-ctfd-data volume)
```

This starts `csec-ctfd` (SQLite in the `csec-ctfd-data` volume), `csec-web`
(the site, talking to CTFd over the internal network), and one Cloudflare
quick tunnel for each. The CTFd `SECRET_KEY` and the current URLs are kept
in `deploy/.state/` (gitignored).

- **Fresh instance = open setup wizard.** On a brand-new CTFd volume, finish
  `/setup` (step 5 of Part 1A) *immediately*, before sharing the link —
  whoever completes it first becomes admin.
- **Quick-tunnel URLs are random and change** whenever the tunnel containers
  restart (including a reboot). Re-run `up`; the site's "Weekly Challenges"
  links go through `/ctf`, which redirects to the current CTFd URL, so no
  rebuild is needed. For a fixed URL, use a named Cloudflare tunnel with a
  domain instead.
- Tunnels use `--protocol http2` because UDP/QUIC is blocked on some
  networks (e.g. campus Wi-Fi).
- The machine has to stay on and online for the links to work.

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

**Not required if Visibility is set to Public** (recommended, see step 6)
— challenges/scoreboard work with zero auth in that case, which is exactly
why Public is the recommended setting: no contributor needs a token for
the site to show real data. Only generate one if you want the live event
name/dates pulled automatically from CTFd's config, or if you set
Visibility to Private instead. As the admin user:

1. Go to `/settings` → **Access Tokens** tab.
2. Set an expiration (or "never", though rotating it periodically is
   better practice) and click **Generate**.
3. Copy the token immediately — CTFd only shows it once.
4. Put it in your own local `.env.local` only (see Part 2) — never commit
   it, and never paste it into chat/Slack/screenshots. If one ever does
   leak, revoke it immediately (same Access Tokens tab) and generate a
   fresh one.

### 8. Add your first challenges

**Admin Panel → Challenges → +** to add a category and challenges (name,
description, points, flag). This is the actual "weekly" workflow going
forward: add a new challenge (or a themed batch) each week, and it shows
up on the site automatically next time the homepage panel refreshes
(within ~60 seconds, see `http-client.ts`).

---

## Part 2 — Connecting the website

With `deploy/local-server.sh` this is wired up automatically. Running the
site any other way (e.g. `npm run dev`), these env vars point it at CTFd:

```
CTFD_BASE_URL=http://localhost:8000      # server-side API calls (default)
CTFD_PUBLIC_URL=https://ctf.example.com  # where "Weekly Challenges" (/ctf) redirects
CTFD_API_TOKEN=<only if you have a reason to use one>
```

The challenges/scoreboard panel works without a token as long as CTFd's
Visibility is Public (step 6).

If the panel ever shows empty scoreboard/challenges instead of real data,
check the terminal running `npm run dev` — `http-client.ts` logs a
`[ctfd] ... failed, falling back` line with the actual error (Visibility
flipped back to Private, CTFd container not running, etc.)
rather than crashing the page.

### When you deploy the website itself

Whatever hosts the production site (Vercel, your own server, etc.) needs
the same env vars set in its environment/project settings — `.env.local`
only applies locally.

---

## Ongoing maintenance

- **Adding weekly challenges**: Admin Panel → Challenges, as in step 8.
  No website changes needed.
- **Updating CTFd**: `docs.ctfd.io/docs/deployment/updating` — generally
  `git pull && docker compose up -d --build` in the CTFd directory (VPS)
  or `deploy/local-server.sh down && docker pull ctfd/ctfd && deploy/local-server.sh up`
  for the local setup.
- **Backups**: back up the database periodically either way — Admin Panel
  has an Exports feature for a full JSON/zip export of the whole CTF
  (challenges, users, submissions, config), independent of hosting method.

---

## Part 3 — Branding CTFd to match csec.iitb.ac.in

CTFd's default theme is plain Bootstrap. Self-hosted
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
