export interface TeamMember {
  name: string;
  role?: string;
  tagline?: string;
  image?: string;
  bio?: string;
  department?: string;
  programme?: string;
  batch?: string;
  interests?: string[];
  socials?: {
    github?: string;
    linkedin?: string;
    twitter?: string;
    website?: string;
  };
  github?: string;
  linkedin?: string;
}

export interface Tenure {
  year: string;
  manager: TeamMember;
  conveners: TeamMember[];
}

export const manager: TeamMember = {
  name: "Keshav Kumar",
  role: "Manager",
  image: "/team/Keshav.jpeg",
};

export const conveners: TeamMember[] = [
  { name: "Abhinav Verma", role: "Convener", image: "/team/Abhinav.jpg" },
  { name: "Jahanvi Gahlout", role: "Convener", image: "/team/Jahanvi.jpg" },
  { name: "Kavyam Agrawal", role: "Convener", image: "/team/Kavyam.jpg" },
  { name: "Sahithi", role: "Convener", image: "/team/Sahithi.jpg" },
  { name: "Vishad Jain", role: "Convener", image: "/team/Vishad.jpg" },
];

export const archives: Tenure[] = [
  {
    year: "2025 — 26",
    manager: { 
      name: "Niral Charan", 
      role: "Manager",
      tagline: "Segmentation | Fault | Core | Dumped",
      image: "/team/Niral.jpeg"
    },
    conveners: [
      { name: "Aakash Tarang", role: "CTM", image: "/team/AakashTarang.jpeg" },
      { name: "Advait Gupta", role: "CTM", image: "/team/Advait.jpg" },
      { name: "Bibaswan Biswas", role: "CTM", image: "/team/BibaswanBiswas.jpg" },
      { name: "Jishnu Sai", role: "CTM", image: "/team/JishnuSai.jpg" },
      { name: "Ansh Agrawal", role: "CTM", image: "/team/AnshAggrawal.jpg" },
      { name: "Keshav Kumar", role: "CTM", image: "/team/Keshav.jpeg" },
    ],
  },
  {
    year: "2024 — 25",
    manager: { 
      name: "Lakshya Gadhwal (DarthVishnu)", 
      role: "Manager",
      tagline: "Rev | Pwn | Game Hacking",
      image: "/team/Lakshya.jpeg"
    },
    conveners: [
      { name: "Aayush Borkar", role: "CTM", tagline: "Pwn | Rev | Crypto", image: "/team/Aayush.jpg" },
      { name: "Harsh Suthar (DustOfNow)", role: "CTM", tagline: "Web Exp | Chess", image: "/team/Harsh.jpg" },
      { name: "Evuri Mohana Sreedhara Reddy (rennaMAhcuS)", role: "CTM", tagline: "Sleep | Forensics | OSINT | The BOYS", image: "/team/Mohana.jpg" },
      { name: "Niral Charan (Chiral Naran)", role: "CTM", tagline: "Segmentation | Fault | Core | Dumped", image: "/team/Niral.jpeg" },
      { name: "Ratan Kokal", role: "CTM", tagline: "Cryptography | Digital Forensics | Gaming", image: "/team/Ratan.png" },
      { name: "Samanth Martis (AlmightyMortal)", role: "CTM", tagline: "SCP | 40K | Rev", image: "/team/Samanth.jpg" },
    ],
  }
];

export const iitBreachers = {
  name: "IITBreachers",
  description:
    "The competitive wing of CSeC — the team that represents IIT Bombay on CTFtime and at onsite finals worldwide.",
  ctftimeUrl: "https://ctftime.org/team/",
  previousTenuresUrl: "https://cseciitb.github.io/previous-tenures",
};
