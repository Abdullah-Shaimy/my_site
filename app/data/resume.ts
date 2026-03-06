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
}

export const experiences: Experience[] = [
  {
    id: "1",
    role: "CEO & Freelance Graphic Designer",
    company: "Abdullah Shaimy Visuals",
    location: "Sri Lanka (Remote)",
    duration: "2020 – Present",
    type: "Full-time",
    description:
      "Leading a creative studio focused on providing high-impact visual design solutions for local and international brands.",
    highlights: [
      "Specialized in brand identity, packaging, and UI/UX design",
      "Managed 50+ successful design projects with a 100% satisfaction rate",
      "Crafted visually stunning and user-focused designs using Adobe Creative Suite",
      "Built a strong online presence and reached global clients through social media",
    ],
  },
  {
    id: "2",
    role: "Freelance Graphic Designer",
    company: "Grapzy International",
    location: "Sri Lanka (Remote)",
    duration: "2021 – 2023",
    type: "Freelance",
    description:
      "Collaborated with a global creative agency to deliver high-quality branding and marketing materials.",
    highlights: [
      "Developed comprehensive brand identities for international startups",
      "Designed marketing assets for Awarding Ceremonies and Promotional Events",
      "Worked closely with clients to translate their vision into effective visual communication",
      "Optimized design workflows using Illustrator and Photoshop",
    ],
  },
];

export const education: Education[] = [
  {
    id: "1",
    degree: "Adobe Certified Professional (Photoshop & Illustrator)",
    institution: "Adobe",
    location: "Global",
    duration: "2023",
    description:
      "Official certification from Adobe validating professional-level expertise in design industry standards.",
    achievements: [
      "Mastery in digital image manipulation and vector illustration",
      "Certified in visual communication and graphic design principles",
    ],
  },
  {
    id: "2",
    degree: "UI/UX Design Fundamentals",
    institution: "Professional Certificate",
    location: "Online",
    duration: "2024",
    description:
      "Intensive course focusing on user-centered design, wireframing, and interactive prototyping in Figma.",
    achievements: [
      "Built several high-fidelity mobile and web UI prototypes",
      "Deep understanding of user psychological barriers and interface accessibility",
    ],
  },
  {
    id: "3",
    degree: "Creative Branding & Identity Design",
    institution: "Professional Certificate",
    location: "Online",
    duration: "2024",
    description:
      "Specialization in crafting cohesive brand stories and memorable identities for various market segments.",
    achievements: [
      "Developed end-to-end brand guidelines for diverse industries",
      "Expertise in color theory, typography, and brand emotional impact",
    ],
  },
];
