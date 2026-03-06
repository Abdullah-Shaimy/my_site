export interface Skill {
  name: string;
  level: number;
  category: "design" | "development" | "tool";
}

export const skills: Skill[] = [
  // Design
  { name: "Photoshop", level: 85, category: "design" },
  { name: "Illustrator", level: 79, category: "design" },
  { name: "InDesign", level: 70, category: "design" },
  { name: "UI/UX & Figma", level: 75, category: "design" },
  // Development
  { name: "Web Development", level: 60, category: "development" },
  // Tools & Certification
  { name: "Brand Identity", level: 85, category: "tool" },
  { name: "Creative Branding", level: 80, category: "tool" },
  { name: "Social Media Visuals", level: 90, category: "tool" },
];

export const coreSkills = [
  "Graphic Design",
  "UI/UX Design",
  "Brand Identity",
  "Creative Branding",
  "Product Packaging",
  "Web Design",
  "Social Media Visuals",
  "Typography",
];
