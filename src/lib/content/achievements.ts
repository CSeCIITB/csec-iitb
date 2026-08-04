export interface Achievement {
  year: number;
  rank: string;
  event: string;
  ctftimeUrl: string;
  highlight?: boolean;
}

/**
 * Sourced and modernized from https://cseciitb.github.io/achievements/
 * When the Google Cloud backend lands, this module becomes a thin
 * wrapper around a `GET /api/achievements` call — the shape stays the same.
 */
export const achievements: Achievement[] = [
  {
    year: 2025,
    rank: "17th Globally",
    event: "TUCTF 2024",
    ctftimeUrl: "https://ctftime.org/event/2584",
  },
  {
    year: 2025,
    rank: "37th Globally",
    event: "Nullcon Goa HackIM 2025 CTF",
    ctftimeUrl: "https://ctftime.org/event/2642",
  },
  {
    year: 2024,
    rank: "30th Globally",
    event: "San Diego CTF 2024",
    ctftimeUrl: "https://ctftime.org/event/2325",
  },
  {
    year: 2024,
    rank: "46th Globally",
    event: "TJCTF 2024",
    ctftimeUrl: "https://ctftime.org/event/2321",
  },
  {
    year: 2024,
    rank: "40th Globally",
    event: "NahamCon CTF 2024",
    ctftimeUrl: "https://ctftime.org/event/2364",
  },
  {
    year: 2024,
    rank: "47th Globally",
    event: "vsCTF 2024",
    ctftimeUrl: "https://ctftime.org/event/2248",
  },
  {
    year: 2023,
    rank: "8th Globally · 3rd in India",
    event: "Nullcon HackIM CTF Goa 2023",
    ctftimeUrl: "https://ctftime.org/event/2065",
    highlight: true,
  },
  {
    year: 2023,
    rank: "64th Globally · 1st in India",
    event: "SekaiCTF 2023",
    ctftimeUrl: "https://ctftime.org/event/1923",
    highlight: true,
  },
  {
    year: 2023,
    rank: "13th Globally",
    event: "UrmiaCTF 2023",
    ctftimeUrl: "https://ctftime.org/event/2067",
  },
  {
    year: 2023,
    rank: "37th Globally",
    event: "BlueHens CTF 2023",
    ctftimeUrl: "https://ctftime.org/event/2126",
  },
  {
    year: 2022,
    rank: "44th Globally",
    event: "Decompetition v2.0 2022",
    ctftimeUrl: "https://ctftime.org/event/1550",
  },
  {
    year: 2021,
    rank: "28th Globally",
    event: "CSAW CTF Final Round 2021",
    ctftimeUrl: "https://ctftime.org/event/1316",
  },
  {
    year: 2021,
    rank: "26th Globally",
    event: "H@cktivityCon 2021 CTF",
    ctftimeUrl: "https://ctftime.org/event/1444",
  },
  {
    year: 2021,
    rank: "9th Globally · 1st in India",
    event: "THC CTF 2021",
    ctftimeUrl: "https://ctftime.org/event/1381",
    highlight: true,
  },
  {
    year: 2021,
    rank: "Rank 1 (Individual, Round 1B)",
    event: "NSUCRYPTO — Nilabha Saha",
    ctftimeUrl: "https://ctftime.org/",
    highlight: true,
  },
];

export const foundingYear = 2017;
export const ctfTeamName = "IITBreachers";
