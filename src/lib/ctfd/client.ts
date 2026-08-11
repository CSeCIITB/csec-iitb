import type {
  CtfdAnnouncement,
  CtfdChallenge,
  CtfdCompetition,
  CtfdScoreboardEntry,
  CtfdUserSummary,
} from "./types";
import {
  mockAnnouncements,
  mockChallenges,
  mockCompetitions,
  mockScoreboard,
} from "./mock-data";
import { HttpCtfdClient } from "./http-client";

/**
 * Everything the site needs from CTFd, expressed as an interface.
 *
 * Today: `MockCtfdClient` returns static data so the UI can be fully built
 * and reviewed before the platform team stands up a CTFd instance.
 *
 * Later: implement `HttpCtfdClient` against `CTFD_BASE_URL` (see
 * `.env.example`) using CTFd's `/api/v1` endpoints, most of which need a
 * server-side API token — so that implementation should live behind a
 * Next.js Route Handler (`src/app/api/ctfd/*`) rather than calling CTFd
 * directly from the browser. No component below this file needs to change.
 */
export interface CtfdClient {
  getFeaturedCompetition(): Promise<CtfdCompetition | null>;
  getCompetitions(): Promise<CtfdCompetition[]>;
  getRecentChallenges(limit?: number): Promise<CtfdChallenge[]>;
  getScoreboard(limit?: number): Promise<CtfdScoreboardEntry[]>;
  getAnnouncements(limit?: number): Promise<CtfdAnnouncement[]>;
  getUserByHandle(handle: string): Promise<CtfdUserSummary | null>;
}

class MockCtfdClient implements CtfdClient {
  async getFeaturedCompetition() {
    return (
      mockCompetitions.find((c) => c.status === "live") ??
      mockCompetitions.find((c) => c.status === "upcoming") ??
      null
    );
  }

  async getCompetitions() {
    return mockCompetitions;
  }

  async getRecentChallenges(limit = 6) {
    return mockChallenges.slice(0, limit);
  }

  async getScoreboard(limit = 5) {
    return mockScoreboard.slice(0, limit);
  }

  async getAnnouncements(limit = 3) {
    return mockAnnouncements.slice(0, limit);
  }

  async getUserByHandle(handle: string) {
    return {
      handle,
      teamName: "IITBreachers",
      globalRank: 3,
      score: 4300,
      profileUrl: "#",
    };
  }
}

/**
 * CTFd is live (see `DEFAULT_CTFD_URL` in `constants.ts`), so this always
 * reads from the real instance — no env var setup required for any
 * contributor to see real data. `MockCtfdClient` above is kept around for
 * reference/offline dev; to force it, set `CTFD_USE_MOCK=1` locally.
 */
export const ctfdClient: CtfdClient = process.env.CTFD_USE_MOCK
  ? new MockCtfdClient()
  : new HttpCtfdClient();
