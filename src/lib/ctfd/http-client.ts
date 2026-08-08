import type {
  CtfdAnnouncement,
  CtfdChallenge,
  CtfdCompetition,
  CtfdScoreboardEntry,
  CtfdUserSummary,
} from "./types";
import type { CtfdClient } from "./client";

/**
 * Live implementation of `CtfdClient`, backed by a real CTFd instance's
 * `/api/v1` REST API (https://docs.ctfd.io/docs/api/getting-started).
 *
 * This file only ever runs server-side (it's imported by `client.ts`,
 * which is only ever imported by Server Components) — `CTFD_API_TOKEN`
 * never reaches the browser.
 *
 * A few notes on what CTFd's API can and can't cleanly answer, since they
 * shape the mappings below:
 *
 * - `/api/v1/challenges` and `/api/v1/scoreboard` are the two endpoints
 *   this integration actually depends on. Whether they work *without* an
 *   API token depends on the instance's Visibility Settings
 *   (Admin Panel → Config → Visibility). If challenges/scores are set to
 *   "Public", no token is needed for reads. If "Private", requests will
 *   401 without `CTFD_API_TOKEN` (an admin access token — CTFd doesn't
 *   have a read-only service-account concept, see
 *   https://docs.ctfd.io/docs/settings/visibility-settings).
 * - CTFd doesn't expose a native "difficulty" field — `difficulty` below
 *   is inferred from point value, same heuristic the previous mock data
 *   used.
 * - CTFd's `/api/v1/scoreboard` doesn't return a last-solve timestamp per
 *   entry, so `lastSolveAt` is left undefined (see `types.ts`).
 * - A single CTFd instance models one ongoing event, not a list of named
 *   competitions — so `getFeaturedCompetition`/`getCompetitions` are
 *   driven by the `CTFD_EVENT_*` env vars (human-authored, same spirit as
 *   `src/lib/content/events.ts`) rather than fetched, unless an admin
 *   token is present, in which case `/api/v1/configs` is tried first and
 *   used to fill in whatever it returns.
 */

const CTFD_BASE_URL = (process.env.CTFD_BASE_URL ?? "").replace(/\/+$/, "");
const CTFD_API_TOKEN = process.env.CTFD_API_TOKEN;

// How long Next.js may serve a cached response before refetching. CTFd
// content changes on a "new challenge dropped" cadence, not per-request,
// so this doesn't need to be low.
const CHALLENGES_REVALIDATE_SECONDS = 60;
const SCOREBOARD_REVALIDATE_SECONDS = 60;
const ANNOUNCEMENTS_REVALIDATE_SECONDS = 60;
const CONFIG_REVALIDATE_SECONDS = 300;

class CtfdApiError extends Error {
  constructor(
    public readonly path: string,
    public readonly status: number,
    message: string,
  ) {
    super(`CTFd API ${path} → ${status}: ${message}`);
    this.name = "CtfdApiError";
  }
}

async function ctfdFetch<T>(
  path: string,
  { revalidate }: { revalidate: number },
): Promise<T> {
  if (!CTFD_BASE_URL) {
    throw new Error("CTFD_BASE_URL is not set");
  }

  const res = await fetch(`${CTFD_BASE_URL}${path}`, {
    headers: {
      Accept: "application/json",
      ...(CTFD_API_TOKEN ? { Authorization: `Token ${CTFD_API_TOKEN}` } : {}),
    },
    next: { revalidate },
  });

  if (!res.ok) {
    throw new CtfdApiError(path, res.status, await res.text().catch(() => res.statusText));
  }

  const contentType = res.headers.get("content-type") ?? "";
  if (!contentType.includes("application/json")) {
    // CTFd doesn't 401 unauthenticated/unauthorized API requests — it
    // redirects to /login, which `fetch` follows silently and returns as a
    // normal 200 HTML page. That's almost always what this means: a
    // missing/invalid CTFD_API_TOKEN, or Private visibility blocking a
    // request the token isn't actually authorized for.
    const hint = res.redirected && res.url.includes("/login")
      ? " (redirected to CTFd's login page — check CTFD_API_TOKEN and Visibility Settings)"
      : "";
    throw new CtfdApiError(
      path,
      res.status,
      `expected JSON, got "${contentType || "unknown"}"${hint}`,
    );
  }

  const body = await res.json();
  if (body?.success === false) {
    throw new CtfdApiError(path, res.status, JSON.stringify(body?.errors ?? body));
  }

  return (body?.data ?? body) as T;
}

/** Best-effort read that never throws — logs and returns `fallback` instead. */
async function safe<T>(label: string, fn: () => Promise<T>, fallback: T): Promise<T> {
  try {
    return await fn();
  } catch (err) {
    console.error(`[ctfd] ${label} failed, falling back:`, err);
    return fallback;
  }
}

/**
 * Same as `safe`, but for fallback paths that are *expected* rather than
 * exceptional — e.g. `/api/v1/configs` legitimately rejecting token auth on
 * some CTFd instances. Logs quietly (won't trigger Next's dev error
 * overlay, which specifically watches console.error) instead of looking
 * like a bug.
 */
async function safeQuiet<T>(label: string, fn: () => Promise<T>, fallback: T): Promise<T> {
  try {
    return await fn();
  } catch (err) {
    console.warn(`[ctfd] ${label} unavailable, using fallback (this is expected on some CTFd setups):`, err);
    return fallback;
  }
}

function inferDifficulty(value: number): CtfdChallenge["difficulty"] {
  if (value <= 150) return "easy";
  if (value <= 250) return "medium";
  if (value <= 350) return "hard";
  return "insane";
}

// Shapes are intentionally typed loosely (`Record<string, unknown>` style
// reads below) — CTFd's exact field set varies slightly by version and by
// what the requesting user/token is allowed to see, so we read defensively
// rather than asserting a strict shape.

interface RawChallenge {
  id: number | string;
  name: string;
  category: string;
  value: number;
  solves?: number;
}

interface RawScoreboardEntry {
  pos: number;
  name: string;
  score: number;
}

interface RawNotification {
  id: number | string;
  title?: string;
  content?: string;
  date?: string;
}

interface RawAccount {
  id: number | string;
  name: string;
  score?: number;
}

interface RawConfigs {
  ctf_name?: string;
  ctf_description?: string;
  start?: string | number | null;
  end?: string | number | null;
}

function toIso(value: string | number | null | undefined): string | undefined {
  if (value === null || value === undefined || value === "") return undefined;
  // CTFd stores start/end as unix timestamps (seconds) in config.
  const date = typeof value === "number" ? new Date(value * 1000) : new Date(value);
  return Number.isNaN(date.getTime()) ? undefined : date.toISOString();
}

function envCompetition(): CtfdCompetition {
  const startsAt = process.env.CTFD_EVENT_STARTS_AT ?? "";
  const endsAt = process.env.CTFD_EVENT_ENDS_AT ?? "";
  const now = Date.now();
  const status: CtfdCompetition["status"] = endsAt && new Date(endsAt).getTime() < now
    ? "ended"
    : startsAt && new Date(startsAt).getTime() > now
      ? "upcoming"
      : "live";

  return {
    id: "ctfd-weekly",
    name: process.env.CTFD_EVENT_NAME || "CSeC Weekly Challenges",
    status,
    startsAt: startsAt || new Date().toISOString(),
    endsAt: endsAt || new Date().toISOString(),
    format: (process.env.CTFD_EVENT_FORMAT as CtfdCompetition["format"]) || "Jeopardy",
    description:
      process.env.CTFD_EVENT_DESCRIPTION ||
      "New challenges land on our CTFd instance every week — jump in any time.",
    ctfdUrl: process.env.NEXT_PUBLIC_CTFD_URL || CTFD_BASE_URL || "#",
  };
}

async function fetchConfigCompetition(): Promise<CtfdCompetition | null> {
  if (!CTFD_API_TOKEN) return null; // /api/v1/configs is admin-only
  const configs = await ctfdFetch<RawConfigs>("/api/v1/configs", {
    revalidate: CONFIG_REVALIDATE_SECONDS,
  });

  const base = envCompetition();
  const startsAt = toIso(configs.start) ?? base.startsAt;
  const endsAt = toIso(configs.end) ?? base.endsAt;
  const now = Date.now();
  const status: CtfdCompetition["status"] =
    new Date(endsAt).getTime() < now
      ? "ended"
      : new Date(startsAt).getTime() > now
        ? "upcoming"
        : "live";

  return {
    ...base,
    name: configs.ctf_name || base.name,
    description: configs.ctf_description || base.description,
    startsAt,
    endsAt,
    status,
  };
}

export class HttpCtfdClient implements CtfdClient {
  async getFeaturedCompetition() {
    const fromConfig = await safeQuiet("getFeaturedCompetition", fetchConfigCompetition, null);
    return fromConfig ?? envCompetition();
  }

  async getCompetitions() {
    return [await this.getFeaturedCompetition()];
  }

  async getRecentChallenges(limit = 6) {
    return safe(
      "getRecentChallenges",
      async () => {
        const challenges = await ctfdFetch<RawChallenge[]>("/api/v1/challenges", {
          revalidate: CHALLENGES_REVALIDATE_SECONDS,
        });
        return challenges.slice(0, limit).map(
          (c): CtfdChallenge => ({
            id: String(c.id),
            name: c.name,
            category: c.category,
            value: c.value,
            solves: c.solves ?? 0,
            difficulty: inferDifficulty(c.value),
          }),
        );
      },
      [],
    );
  }

  async getScoreboard(limit = 5) {
    return safe(
      "getScoreboard",
      async () => {
        const entries = await ctfdFetch<RawScoreboardEntry[]>("/api/v1/scoreboard", {
          revalidate: SCOREBOARD_REVALIDATE_SECONDS,
        });
        return entries.slice(0, limit).map(
          (e): CtfdScoreboardEntry => ({
            rank: e.pos,
            teamName: e.name,
            score: e.score,
          }),
        );
      },
      [],
    );
  }

  async getAnnouncements(limit = 3) {
    return safe(
      "getAnnouncements",
      async () => {
        const notifications = await ctfdFetch<RawNotification[]>("/api/v1/notifications", {
          revalidate: ANNOUNCEMENTS_REVALIDATE_SECONDS,
        });
        return notifications.slice(0, limit).map(
          (n): CtfdAnnouncement => ({
            id: String(n.id),
            title: n.title || "Announcement",
            body: n.content || "",
            postedAt: n.date || new Date().toISOString(),
          }),
        );
      },
      [],
    );
  }

  async getUserByHandle(handle: string) {
    return safe<CtfdUserSummary | null>(
      "getUserByHandle",
      async () => {
        const results = await ctfdFetch<RawAccount[]>(
          `/api/v1/teams?field=name&q=${encodeURIComponent(handle)}`,
          { revalidate: SCOREBOARD_REVALIDATE_SECONDS },
        );
        const match = results.find((r) => r.name.toLowerCase() === handle.toLowerCase());
        if (!match) return null;

        return {
          handle: match.name,
          teamName: match.name,
          globalRank: 0,
          score: match.score ?? 0,
          profileUrl: `${CTFD_BASE_URL}/teams/${match.id}`,
        };
      },
      null,
    );
  }
}
