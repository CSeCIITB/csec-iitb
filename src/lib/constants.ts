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

// CTFd runs alongside the site (see deploy/). CTFD_BASE_URL overrides this
// for server-side API calls, e.g. http://ctfd:8000 inside the container network.
export const DEFAULT_CTFD_URL = "http://localhost:8000";

// Every "Weekly Challenges" link goes through /ctf, which redirects to the
// public CTFd URL at request time (CTFD_PUBLIC_URL). That keeps the link
// correct when the public URL changes without needing a rebuild.
export const ctfdUrl = "/ctf";

export const primaryNav = [
  { label: "About", href: "/about" },
  { label: "Events", href: "/events" },
  { label: "Resources", href: "/resources" },
  { label: "Writeups", href: "/blog" },
  { label: "Gallery", href: "/gallery" },
  { label: "Team", href: "/team" },
  { label: "Contact", href: "/contact" },
] as const;
