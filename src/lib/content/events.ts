export type EventKind = "ctf" | "workshop" | "talk";
export type EventStatus = "upcoming" | "past";

export interface ClubEvent {
  slug: string;
  title: string;
  kind: EventKind;
  status: EventStatus;
  dateLabel: string;
  location?: string;
  description: string;
}

/**
 * Sourced and modernized from cseciitb.github.io/about and the club's
 * InstiApp listing. Dates for the recurring flagship events are annual —
 * exact dates should be pulled live from InstiApp / the future backend
 * once that integration lands.
 */
export const events: ClubEvent[] = [
  {
    slug: "tyro-ctf",
    title: "TyroCTF",
    kind: "ctf",
    status: "upcoming",
    dateLabel: "November · 48 hours",
    location: "Lecture Hall Complex, IIT Bombay",
    description:
      "A 48-hour, beginner-friendly jeopardy CTF for freshers — the first on-ramp into competitive hacking for new members every year.",
  },
  {
    slug: "basics-of-hacking",
    title: "Basics of Hacking",
    kind: "workshop",
    status: "upcoming",
    dateLabel: "October",
    location: "Lecture Hall Complex, IIT Bombay",
    description:
      "An introductory session covering the mindset and fundamentals of offensive security before diving into CTFs.",
  },
  {
    slug: "hacking-via-ctfs",
    title: "Hacking via CTFs",
    kind: "workshop",
    status: "upcoming",
    dateLabel: "October",
    location: "Lecture Hall Complex, IIT Bombay",
    description:
      "A hands-on walkthrough of how Capture The Flag competitions work, from reading a challenge to submitting a flag.",
  },
  {
    slug: "hardware-hacking",
    title: "Hardware Hacking",
    kind: "workshop",
    status: "past",
    description:
      "A practical introduction to hardware security — probing boards, dumping firmware, and finding bugs outside of software.",
    dateLabel: "Past tenure",
  },
  {
    slug: "advanced-ctf",
    title: "Advanced CTF",
    kind: "ctf",
    status: "past",
    description:
      "A harder-difficulty internal CTF for members who have outgrown TyroCTF and want tournament-grade challenges.",
    dateLabel: "Past tenure",
  },
];
