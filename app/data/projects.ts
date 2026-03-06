export interface Project {
  id: string;
  slug: string;
  title: string;
  category: "Designing" | "Development";
  shortDesc: string;
  description: string;
  tags: string[];
  image: string;
  liveUrl?: string;
  githubUrl?: string;
  featured?: boolean;
  year: string;
  client?: string;
}

export const projects: Project[] = [
  {
    id: "1",
    slug: "grapzy-branding",
    title: "Grapzy International Branding",
    category: "Designing",
    shortDesc: "Complete brand identity for for an international design agency.",
    description:
      "Developed a cohesive brand identity for Grapzy International, including logo design, color palette, and visual language that resonates with a global audience.",
    tags: ["Branding", "Logo Design", "Visual Identity"],
    image: "https://images.unsplash.com/photo-1626785774573-4b799315345d?auto=format&fit=crop&q=80&w=800",
    featured: true,
    year: "2024",
    client: "Grapzy International",
  },
  {
    id: "2",
    slug: "hotel-website-ui",
    title: "Eco-Luxury Hotel Website UI",
    category: "Designing",
    shortDesc: "Modern and intuitive UI design for a premium hotel experience.",
    description:
      "Designed a user-focused website interface for a luxury hotel, focusing on elegant aesthetics and seamless booking user flows.",
    tags: ["UI/UX", "Figma", "Web Design"],
    image: "https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&q=80&w=800",
    featured: true,
    year: "2024",
    client: "Serenity Heights Hotel",
  },
  {
    id: "3",
    slug: "keto-packaging",
    title: "Keto Product Packaging",
    category: "Designing",
    shortDesc: "Clean and impactful packaging design for a health food brand.",
    description:
      "Created minimalist yet informative packaging for a line of Keto products, ensuring high shelf-appeal and clear communication of organic values.",
    tags: ["Packaging", "Print Design", "Identity"],
    image: "https://images.unsplash.com/photo-1549462111-99911d13f51b?auto=format&fit=crop&q=80&w=800",
    featured: true,
    year: "2023",
    client: "PureKeto Foods",
  },
  {
    id: "4",
    slug: "delicious-burger-poster",
    title: "Delicious Burger Promotional Poster",
    category: "Designing",
    shortDesc: "High-impact social media and print advertisement design.",
    description:
      "Designed a vibrant and appetizing promotional poster for a local burger chain, optimized for both social media engagement and high-quality large-format print.",
    tags: ["Advertising", "Social Media", "Photoshop"],
    image: "https://images.unsplash.com/photo-1586816001966-79b736744398?auto=format&fit=crop&q=80&w=800",
    year: "2024",
    client: "Burger Haven",
  },
  {
    id: "5",
    slug: "awarding-ceremony-banner",
    title: "Awarding Ceremony Banner Design",
    category: "Designing",
    shortDesc: "Large-scale event branding and backdrop design.",
    description:
      "Crafted professional and prestigious backdrop and banner designs for a major corporate awarding ceremony, reflecting the brand's excellence.",
    tags: ["Event Design", "Print", "Illustrator"],
    image: "https://images.unsplash.com/photo-1533174072545-7a4b6ad7a6c3?auto=format&fit=crop&q=80&w=800",
    year: "2023",
    client: "Global Business Awards",
  },
  {
    id: "6",
    slug: "company-brochure",
    title: "Corporate Profile Brochure",
    category: "Designing",
    shortDesc: "8-page minimalist corporate brochure for business growth.",
    description:
      "Designed a clean and professional corporate profile brochure that effectively communicates the company's mission, values, and service offerings.",
    tags: ["Brochure", "InDesign", "Layout"],
    image: "https://images.unsplash.com/photo-1544383835-bda2bc66a55d?auto=format&fit=crop&q=80&w=800",
    year: "2024",
    client: "Vertex Solutions",
  },
];
