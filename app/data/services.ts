export interface Service {
  id: string;
  slug: string;
  category: "Designing" | "Development";
  title: string;
  shortDesc: string;
  description: string;
  icon: string;
  features: string[];
  deliverables: string[];
  duration: string;
  startingPrice: string;
}

export const services: Service[] = [
  {
    id: "1",
    slug: "graphic-design",
    category: "Designing",
    title: "Graphic Design",
    shortDesc: "High-quality visual communication for brands and businesses.",
    description:
      "I provide professional graphic design services tailored to your needs. From posters and banners to social media visuals, I ensure your message is communicated visually and effectively.",
    icon: "Palette",
    features: [
      "Poster & Banner Design",
      "Social Media Content",
      "Brochure & Leaflet Layout",
      "Advertising Graphics",
      "Event Branding Assets",
      "Print-ready Designs",
    ],
    deliverables: ["Visual Assets (SVG, PNG, PDF)", "Print-ready Files", "Design Source Files", "Creative Consultation"],
    duration: "1–2 weeks",
    startingPrice: "$200",
  },
  {
    id: "2",
    slug: "brand-identity",
    category: "Designing",
    title: "Brand Identity Design",
    shortDesc: "Cohesive and memorable brand systems that stand out.",
    description:
      "Your brand is your story. I design powerful brand identities from the ground up, ensuring your visual language resonates with your audience and communicates your core values.",
    icon: "Layers",
    features: [
      "Logo Design & Variations",
      "Color Palette Selection",
      "Typography Systems",
      "Brand Guidelines (Style Guides)",
      "Stationery & Business Collateral",
      "Social Media Kits",
    ],
    deliverables: ["Logo Suite (SVG, AI, PNG)", "Brand Guidelines PDF", "Business Card Template", "Social Media Graphics"],
    duration: "2–4 weeks",
    startingPrice: "$500",
  },
  {
    id: "3",
    slug: "ui-ux-design",
    category: "Designing",
    title: "UI/UX & Web Design",
    shortDesc: "User-centered digital interface design that delights.",
    description:
      "I create intuitive, beautiful digital interfaces grounded in user experience principles. I focus on creating designs that are not only visually pleasing but also highly functional and accessible.",
    icon: "Monitor",
    features: [
      "Website UI Design (Figma)",
      "Mobile App UI Design",
      "User Research & Flows",
      "Interactive Prototyping",
      "Landing Page Optimization",
      "Design-to-Dev Handoff",
    ],
    deliverables: ["Figma Design File", "Clickable Prototypes", "Developer Handoff Specs", "User Flow Diagrams"],
    duration: "2-6 weeks",
    startingPrice: "$800",
  },
  {
    id: "4",
    slug: "product-packaging",
    category: "Designing",
    title: "Product Packaging Design",
    shortDesc: "Creative and impactful packaging for retail and e-commerce.",
    description:
      "I design physical product packaging that shines on shelves and creates a memorable unboxing experience for your customers, ensuring your product is perceived as premium.",
    icon: "Grid3X3",
    features: [
      "Product Box Design",
      "Label & Sticker Design",
      "3D Packaging Mockups",
      "Retail Packaging Strategy",
      "Sustainability-focused Designs",
      "Print Specification Management",
    ],
    deliverables: ["Print-ready Dielines", "3D Rendered Mockups", "Material Consultations", "Final Print Files"],
    duration: "2–5 weeks",
    startingPrice: "$400",
  },
];
