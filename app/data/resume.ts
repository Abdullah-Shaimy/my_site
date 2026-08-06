export interface Experience {
  id: string;
  role: string;
  company: string;
  location: string;
  duration: string;
  type: string;
  description: string;
  highlights: string[];
}

export interface Education {
  id: string;
  degree: string;
  institution: string;
  location: string;
  duration: string;
  description: string;
  achievements: string[];
  certificateLink?: string;
}

export interface Certification {
  id: string;
  title: string;
  issuer: string;
  location: string;
  issueDate: string;
  description: string;
  skills: string[];
  certificateLink?: string;
  badgeUrl?: string;
}

export const experiences: Experience[] = [
  {
    id: "1",
    role: "Lead Developer & Designer",
    company: "NanoVext",
    location: "Global (Remote)",
    duration: "2024 – Present",
    type: "Freelance / Founder",
    description:
      "Leading a digital brand focused on high-performance web applications and corporate minimalist design for global and local clients.",
    highlights: [
      "Specialized in Full-Stack development using Next.js and Python",
      "Crafting clean, professional brand identities using the Adobe Creative Suite",
      "Delivering end-to-end digital solutions from UI/UX design to final deployment",
    ],
  },
];

export const certifications: Certification[] = [
  {
    id: "pcep-python",
    title: "PCEP – Certified Entry-Level Python Programmer",
    issuer: "Python Institute (OpenEDG)",
    location: "Global Certification",
    issueDate: "Certified 2026",
    description:
      "Successfully passed the Python Institute PCEP certification, validating foundational Python programming skills and problem-solving abilities.",
    skills: [
      "Procedural Programming & Data Structures",
      "Control Flow, Functions & Exceptions",
      "Official OpenEDG Certification",
    ],
    certificateLink: "https://verify.openedg.org/?id=ioef.b3bP.jYSm",
    badgeUrl: "/pcep-badge.png",
  },
];

export const education: Education[] = [
  {
    id: "1",
    degree: "Python for Full-stack Development",
    institution: "University of Moratuwa, Sri Lanka",
    location: "Sri Lanka",
    duration: "2026 – Present",
    description:
      "Mastering back-end logic, data structures, and the integration of Python into modern full-stack frameworks.",
    achievements: [
      "Advanced back-end engineering",
      "Full-stack integration systems",
    ],
  },
  {
    id: "2",
    degree: "GCE Advanced Level (Batch of 2027)",
    institution: "KM/KM/AL-ASHRAQ M.M.V (National School)",
    location: "Sri Lanka",
    duration: "2025 – Present",
    description:
      "Currently pursuing secondary higher education with a focus on future technical expertise.",
    achievements: [
      "Focus on Science/Tech stream",
    ],
  },
  {
    id: "3",
    degree: "Diploma in Graphics Design",
    institution: "Studyz Academy Pvt Ltd",
    location: "Sri Lanka",
    duration: "Completed Jan 2026",
    description:
      "Advanced training in visual communication, typography, and professional brand identity systems using Adobe tools.",
    achievements: [
      "Expertise in Adobe Creative Suite",
      "Visual Communication mastery",
    ],
  },
  {
    id: "4",
    degree: "GCE Ordinary Level",
    institution: "Km/Ak/Al-Hamra Maha Vidyalaya (National School)",
    location: "Sri Lanka",
    duration: "2025",
    description:
      "Successfully completed secondary education with strong results (3A, 2B, 4C), laying the foundation for technical and creative studies.",
    achievements: [
      "Strong academic foundation",
    ],
  },
  {
    id: "5",
    degree: "Hifz Al-Quran Completion",
    institution: "Institute of Da'wa Islamiyya",
    location: "Sri Lanka",
    duration: "2019 – 2021",
    description:
      "Fully memorized the Al-Quran, a 2-year journey that developed profound discipline, focus, and attention to detail.",
    achievements: [
      "Complete memorization",
      "Exceptional discipline & focus",
    ],
  },
];
