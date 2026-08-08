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

// Points every "Weekly Challenges" link/button at the real CTFd instance
// once it exists (see NEXT_PUBLIC_CTFD_URL in .env.example). Falls back to
// "#" so the site still builds and runs before CTFd is deployed.
export const ctfdUrl = process.env.NEXT_PUBLIC_CTFD_URL || "#";

export const primaryNav = [
  { label: "About", href: "/about" },
  { label: "Events", href: "/events" },
  { label: "Resources", href: "/resources" },
  { label: "Writeups", href: "/blog" },
  { label: "Gallery", href: "/gallery" },
  { label: "Team", href: "/team" },
  { label: "Contact", href: "/contact" },
] as const;
