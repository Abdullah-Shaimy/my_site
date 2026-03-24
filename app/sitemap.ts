import type { MetadataRoute } from "next";
import { projects } from "./data/projects";
import { services } from "./data/services";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://abdullahshaimy.dev";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  const staticRoutes: MetadataRoute.Sitemap = [
    { url: `${siteUrl}/`, lastModified: now, changeFrequency: "weekly", priority: 1 },
    { url: `${siteUrl}/about`, lastModified: now, changeFrequency: "monthly", priority: 0.8 },
    { url: `${siteUrl}/portfolio`, lastModified: now, changeFrequency: "weekly", priority: 0.9 },
    { url: `${siteUrl}/services`, lastModified: now, changeFrequency: "weekly", priority: 0.9 },
    { url: `${siteUrl}/resume`, lastModified: now, changeFrequency: "monthly", priority: 0.7 },
    { url: `${siteUrl}/contact`, lastModified: now, changeFrequency: "monthly", priority: 0.8 },
  ];

  const projectRoutes: MetadataRoute.Sitemap = projects.map((project) => ({
    url: `${siteUrl}/portfolio/${project.slug}`,
    lastModified: now,
    changeFrequency: "monthly",
    priority: 0.7,
  }));

  const serviceRoutes: MetadataRoute.Sitemap = services.map((service) => ({
    url: `${siteUrl}/services/${service.slug}`,
    lastModified: now,
    changeFrequency: "monthly",
    priority: 0.7,
  }));

  return [...staticRoutes, ...projectRoutes, ...serviceRoutes];
}
