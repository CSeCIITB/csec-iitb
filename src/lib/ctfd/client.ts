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
 * `CTFD_BASE_URL` is the switch: unset (e.g. CTFd isn't deployed yet), the
 * site keeps running on mock data with zero code changes needed. Once it's
 * set (see `.env.example`), every consumer of `ctfdClient` automatically
 * starts reading from the real CTFd instance instead.
 */
export const ctfdClient: CtfdClient = process.env.CTFD_BASE_URL
  ? new HttpCtfdClient()
  : new MockCtfdClient();
