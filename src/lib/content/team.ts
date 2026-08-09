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
  department: "CME", programme: "BS", batch: "2028"
};

export const conveners: TeamMember[] = [
  { name: "Abhinav Verma", role: "Convener", image: "/team/Abhinav.jpg", department: "CSE", programme: "B. Tech.", batch: "2029" },
  { name: "Jahanvi Gahlout", role: "Convener", image: "/team/Jahanvi.jpg", department: "EE", programme: "Dual Degree (B. Tech. + M. Tech.)", batch: "2030"  },
  { name: "Kavyam Agrawal", role: "Convener", image: "/team/Kavyam.jpg", department: "EE", programme: "B. Tech.", batch: "2029" },
  { name: "Sahithi", role: "Convener", image: "/team/Sahithi.jpg", department: "EP", programme: "B. Tech.", batch: "2029" },
  { name: "Vishad Jain", role: "Convener", image: "/team/Vishad.jpg", department: "CSE", programme: "B. Tech.", batch: "2029" },
];

export const archives: Tenure[] = [
  {
    year: "2025 — 26",
    manager: { 
      name: "Niral Charan", 
      role: "Manager",
      tagline: "Segmentation | Fault | Core | Dumped",
      image: "/team/Niral.jpeg",
      department: "CSE", programme: "B. Tech.", batch: "2027" 
    },
    conveners: [
      { name: "Aakash Tarang", role: "CTM", image: "/team/AakashTarang.jpeg", department: "CSE", programme: "B. Tech.", batch: "2028" },
      { name: "Advait Gupta", role: "CTM", image: "/team/Advait.jpg", department: "CSE", programme: "B. Tech.", batch: "2028" },
      { name: "Bibaswan Biswas", role: "CTM", image: "/team/BibaswanBiswas.jpg", department: "CSE", programme: "B. Tech.", batch: "2028" },
      { name: "Jishnu Sai", role: "CTM", image: "/team/JishnuSai.jpg", department: "CSE", programme: "B. Tech.", batch: "2028" },
      { name: "Ansh Agrawal", role: "CTM", image: "/team/AnshAggrawal.jpg", department: "CSE", programme: "B. Tech.", batch: "2028" },
      { name: "Keshav Kumar", role: "CTM", image: "/team/Keshav.jpeg" },
    ],
  },
  {
    year: "2024 — 25",
    manager: { 
      name: "Lakshya Gadhwal (DarthVishnu)", 
      role: "Manager",
      tagline: "Rev | Pwn | Game Hacking",
      image: "/team/Lakshya.jpeg",
      department: "CSE", programme: "B. Tech.", batch: "2026"
    },
    conveners: [
      { name: "Aayush Borkar", role: "CTM", tagline: "Pwn | Rev | Crypto", image: "/team/Aayush.jpg", department: "CSE", programme: "B. Tech.", batch: "2027" },
      { name: "Harsh Suthar (DustOfNow)", role: "CTM", tagline: "Web Exp | Chess", image: "/team/Harsh.jpg", department: "CSE", programme: "B. Tech.", batch: "2027" },
      { name: "Evuri Mohana Sreedhara Reddy (rennaMAhcuS)", role: "CTM", tagline: "Sleep | Forensics | OSINT | The BOYS", image: "/team/Mohana.jpg", department: "CSE", programme: "B. Tech.", batch: "2027" },
      { name: "Niral Charan (Chiral Naran)", role: "CTM", tagline: "Segmentation | Fault | Core | Dumped", image: "/team/Niral.jpeg", department: "CSE", programme: "B. Tech.", batch: "2027" },
      { name: "Ratan Kokal", role: "CTM", tagline: "Cryptography | Digital Forensics | Gaming", image: "/team/Ratan.png", department: "AE", programme: "B. Tech.", batch: "2027" },
      { name: "Samanth Martis (AlmightyMortal)", role: "CTM", tagline: "SCP | 40K | Rev", image: "/team/Samanth.jpg", department: "AE", programme: "B. Tech.", batch: "2027" },
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
