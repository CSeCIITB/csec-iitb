export interface ResourceLink {
  label: string;
  url: string;
  description: string;
}

export interface ResourceCategory {
  slug: string;
  title: string;
  links: ResourceLink[];
}

/**
 * Sourced and modernized from https://cseciitb.github.io/resources/ —
 * CSeC's curated set of introductory CTF resources.
 */
export const resourceCategories: ResourceCategory[] = [
  {
    slug: "general",
    title: "General",
    links: [
      { label: "PicoGym", url: "https://play.picoctf.org/practice", description: "A set of CTF challenges for beginners into CTFs." },
      { label: "PicoPrimer", url: "https://primer.picoctf.com/", description: "A primer into CTF-style challenges and the theory behind them." },
      { label: "Trail of Bits — CTF Field Guide", url: "https://trailofbits.github.io/ctf/", description: "Challenge walkthroughs, guidance, and case studies of adversarial behaviour." },
      { label: "CTF101", url: "https://ctf101.org/", description: "An introductory handbook covering the basics of each CTF category." },
      { label: "HackTheBox", url: "https://www.hackthebox.com/", description: "Interactive platform with hands-on penetration testing and exploitation challenges." },
      { label: "TryHackMe", url: "https://tryhackme.com/", description: "Beginner-friendly guided rooms across web, network, and pentesting topics." },
      { label: "Blue Team Academy", url: "https://app.letsdefend.io/academy/", description: "Training focused on defensive security techniques and strategies." },
      { label: "Awesome CyberSec", url: "https://github.com/theredditbandit/awesome-cybersec", description: "A curated list of cybersecurity resources, tools, and learning material." },
      { label: "OverTheWire: Bandit", url: "https://overthewire.org/wargames/bandit/", description: "Practice Linux command-line fundamentals, wargame style." },
    ],
  },
  {
    slug: "cryptography",
    title: "Cryptography",
    links: [
      { label: "CryptoHack", url: "https://cryptohack.org/", description: "An excellent set of CTF-style cryptography challenges." },
      { label: "RSA Common Attacks", url: "https://crypto.stanford.edu/~dabo/papers/RSA-survey.pdf", description: "A survey of common attacks against RSA and how they're implemented." },
    ],
  },
  {
    slug: "digital-forensics",
    title: "Digital Forensics",
    links: [
      { label: "MemLabs", url: "https://github.com/stuxnet999/MemLab", description: "One of the best places to get started with memory forensics." },
      { label: "Forensics Tooling Compendium", url: "https://docs.google.com/document/d/1KUy_Sh9d5lo9ozuoW2WPl3z0gOZyM4yGDZBS1S7HhJ8/edit", description: "A compilation of tools commonly used in digital forensics." },
      { label: "Awesome Forensics", url: "https://github.com/cugu/awesome-forensics", description: "An extensive list of forensics tools and resources." },
    ],
  },
  {
    slug: "reverse-engineering",
    title: "Reverse Engineering",
    links: [
      { label: "The Flare-On Challenge", url: "https://flare-on.com/", description: "An annual single-player CTF with an open archive of prior years." },
      { label: "challenges.re", url: "https://challenges.re/", description: "Reverse engineering challenges by Dennis Yurichev." },
    ],
  },
  {
    slug: "binary-exploitation",
    title: "Binary Exploitation",
    links: [
      { label: "pwn.college", url: "https://pwn.college/", description: "A deep, from-fundamentals course into binary exploitation." },
      { label: "CryptoCat — Pwn Basics", url: "https://youtube.com/playlist?list=PLHUKi1UlEgOIc07Rfk2Jgb5fZbxDPec94", description: "Foundational pwn ideas used across CTF challenges." },
      { label: "Nightmare", url: "https://guyinatuxedo.github.io/", description: "In-depth pwn concepts with worked CTF examples." },
    ],
  },
  {
    slug: "web-exploitation",
    title: "Web Exploitation",
    links: [
      { label: "PortSwigger Web Security Academy", url: "https://portswigger.net/web-security/all-labs", description: "Hands-on labs covering the breadth of web vulnerabilities." },
    ],
  },
  {
    slug: "cloud",
    title: "Cloud",
    links: [
      { label: "flAWS", url: "http://flaws.cloud/", description: "Tutorials and challenges teaching AWS security concepts." },
      { label: "flAWS2", url: "http://flaws2.cloud/", description: "The sequel to flAWS, going deeper into AWS misconfigurations." },
    ],
  },
];
