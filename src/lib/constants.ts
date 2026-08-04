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

export const ctfdUrl = "#"; // TODO: replace with the live CTFd instance URL

export const primaryNav = [
  { label: "About", href: "/about" },
  { label: "Events", href: "/events" },
  { label: "Resources", href: "/resources" },
  { label: "Writeups", href: "/blog" },
  { label: "Gallery", href: "/gallery" },
  { label: "Team", href: "/team" },
  { label: "Contact", href: "/contact" },
] as const;
