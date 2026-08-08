/**
 * Types intentionally mirror CTFd's own /api/v1 response shapes
 * (see https://docs.ctfd.io/docs/api/redoc/) wherever practical, so that
 * swapping `MockCtfdClient` for a real HTTP-backed client later requires
 * no changes to consuming components — only to `client.ts`.
 */

export interface CtfdCompetition {
  id: string;
  name: string;
  status: "live" | "upcoming" | "ended";
  startsAt: string; // ISO
  endsAt: string; // ISO
  format: "Jeopardy" | "Attack-Defense";
  description: string;
  ctfdUrl: string;
}

export interface CtfdChallenge {
  id: string;
  name: string;
  category: string;
  value: number; // points
  solves: number;
  difficulty: "easy" | "medium" | "hard" | "insane";
}

export interface CtfdScoreboardEntry {
  rank: number;
  teamName: string;
  score: number;
  // CTFd's /api/v1/scoreboard doesn't return a per-entry last-solve
  // timestamp, so this is only populated when a source can supply it.
  lastSolveAt?: string; // ISO
}

export interface CtfdAnnouncement {
  id: string;
  title: string;
  body: string;
  postedAt: string; // ISO
}

export interface CtfdUserSummary {
  handle: string;
  teamName: string;
  globalRank: number;
  score: number;
  profileUrl: string;
}
