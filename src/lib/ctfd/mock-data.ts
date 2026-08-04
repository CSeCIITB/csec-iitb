import type {
  CtfdAnnouncement,
  CtfdChallenge,
  CtfdCompetition,
  CtfdScoreboardEntry,
} from "./types";

export const mockCompetitions: CtfdCompetition[] = [
  {
    id: "tyro-ctf-2026",
    name: "TyroCTF 2026",
    status: "upcoming",
    startsAt: "2026-11-01T00:00:00+05:30",
    endsAt: "2026-11-03T00:00:00+05:30",
    format: "Jeopardy",
    description:
      "The annual 48-hour beginner CTF for IIT Bombay freshers — web, crypto, rev, pwn, forensics, and OSINT.",
    ctfdUrl: "#",
  },
  {
    id: "breach-ctf-2026",
    name: "BreachCTF 2026",
    status: "ended",
    startsAt: "2026-02-14T18:30:00+05:30",
    endsAt: "2026-02-16T18:30:00+05:30",
    format: "Jeopardy",
    description:
      "IITBreachers' public online jeopardy CTF, open worldwide via CTFtime.",
    ctfdUrl: "#",
  },
];

export const mockChallenges: CtfdChallenge[] = [
  { id: "c1", name: "warmup", category: "misc", value: 50, solves: 214, difficulty: "easy" },
  { id: "c2", name: "packet-inspector", category: "forensics", value: 200, solves: 61, difficulty: "medium" },
  { id: "c3", name: "off-by-none", category: "pwn", value: 350, solves: 19, difficulty: "hard" },
  { id: "c4", name: "modular-arithmetic", category: "crypto", value: 150, solves: 88, difficulty: "easy" },
  { id: "c5", name: "obfuscated", category: "rev", value: 300, solves: 22, difficulty: "hard" },
  { id: "c6", name: "sqli-101", category: "web", value: 100, solves: 156, difficulty: "easy" },
];

export const mockScoreboard: CtfdScoreboardEntry[] = [
  { rank: 1, teamName: "0x4E4F5052", score: 4820, lastSolveAt: "2026-02-16T14:02:00+05:30" },
  { rank: 2, teamName: "kernel panic", score: 4550, lastSolveAt: "2026-02-16T13:41:00+05:30" },
  { rank: 3, teamName: "IITBreachers", score: 4300, lastSolveAt: "2026-02-16T12:58:00+05:30" },
  { rank: 4, teamName: "sigsegv squad", score: 3920, lastSolveAt: "2026-02-16T11:30:00+05:30" },
  { rank: 5, teamName: "null pointer", score: 3610, lastSolveAt: "2026-02-16T09:12:00+05:30" },
];

export const mockAnnouncements: CtfdAnnouncement[] = [
  {
    id: "a1",
    title: "Registration for TyroCTF 2026 opens soon",
    body: "Team registration (max 3 members) opens two weeks before the event on our CTFd instance.",
    postedAt: "2026-10-10T10:00:00+05:30",
  },
  {
    id: "a2",
    title: "BreachCTF 2026 challenge archive published",
    body: "All challenges and official write-ups from BreachCTF 2026 are now public on CTFd.",
    postedAt: "2026-02-20T09:00:00+05:30",
  },
];
