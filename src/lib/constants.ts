export const site = {
  name: "CSeC",
  fullName: "Cyber Security Club, IIT Bombay",
  tagline: "Gotta Hack 'em All",
  description:
    "The Cyber Security Club at IIT Bombay — CTF players, workshop hosts, and the team behind IITBreachers.",
  url: "https://csec.iitb.ac.in",
};

export const socials = {
  github: "https://github.com/CSeCIITB",
  discord: "https://discord.gg/hYthhnGVdN",
  instagram: "https://www.instagram.com/csec.iitb/",
  linkedin: "https://in.linkedin.com/company/cseciitb",
};

// Real, public URL of the CSeC CTFd instance — not a secret, this is
// exactly what every "Weekly Challenges" link is supposed to point at, so
// it's a checked-in default rather than something every contributor has to
// set up in their own .env.local. NEXT_PUBLIC_CTFD_URL / CTFD_BASE_URL can
// still override this (e.g. to point at a local CTFd instance for testing),
// but nobody needs to for the site to work correctly out of the box.
export const DEFAULT_CTFD_URL = "https://ctf-csec.up.railway.app";

export const ctfdUrl = process.env.NEXT_PUBLIC_CTFD_URL || DEFAULT_CTFD_URL;

export const primaryNav = [
  { label: "About", href: "/about" },
  { label: "Events", href: "/events" },
  { label: "Resources", href: "/resources" },
  { label: "Writeups", href: "/blog" },
  { label: "Gallery", href: "/gallery" },
  { label: "Team", href: "/team" },
  { label: "Contact", href: "/contact" },
] as const;
