"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { Project } from "../data/projects";

interface ProjectCardProps {
  project: Project;
  index?: number;
}

const categoryColors: Record<string, { bg: string; text: string; border: string }> = {
  Designing: {
    bg: "rgba(139, 92, 246,0.08)",
    text: "#8b5cf6",
    border: "rgba(139, 92, 246,0.2)",
  },
  Development: {
    bg: "rgba(139, 92, 246,0.08)",
    text: "#8b5cf6",
    border: "rgba(139, 92, 246,0.2)",
  },
};

export default function ProjectCard({ project, index = 0 }: ProjectCardProps) {
  const catStyle = categoryColors[project.category] || categoryColors.Development;

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1, ease: [0.4, 0, 0.2, 1] }}
    >
      <Link href={`/portfolio/${project.slug}`} style={{ textDecoration: "none" }}>
        <div
          className="glass-card"
          style={{
            overflow: "hidden",
            cursor: "pointer",
            height: "100%",
            display: "flex",
            flexDirection: "column",
          }}
        >
          {/* Image Placeholder */}
          <div
            style={{
              height: 200,
              background:
                project.category === "Designing"
                  ? "linear-gradient(135deg, #f5f3ff, #ede9fe, #ddd6fe)"
                  : "linear-gradient(135deg, #eff6ff, #dbeafe, #bfdbfe)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              position: "relative",
              overflow: "hidden",
            }}
          >
            <div
              style={{
                width: 80,
                height: 80,
                borderRadius: 20,
                background:
                  project.category === "Designing"
                    ? "linear-gradient(135deg, #8b5cf6, #8b5cf6)"
                    : "linear-gradient(135deg, #8b5cf6, #00d2ff)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: "2rem",
                opacity: 0.7,
              }}
            >
              {project.category === "Designing" ? "🎨" : "💻"}
            </div>
            {/* Category Badge */}
            <div
              style={{
                position: "absolute",
                top: 12,
                left: 12,
                padding: "4px 12px",
                borderRadius: 50,
                background: catStyle.bg,
                border: `1px solid ${catStyle.border}`,
                color: catStyle.text,
                fontSize: "0.75rem",
                fontWeight: 600,
                backdropFilter: "blur(10px)",
              }}
            >
              {project.category}
            </div>
            {/* Arrow */}
            <div
              style={{
                position: "absolute",
                top: 12,
                right: 12,
                width: 32,
                height: 32,
                borderRadius: 8,
                background: "rgba(255,255,255,0.9)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                color: "var(--accent-purple)",
              }}
            >
              <ArrowUpRight size={16} />
            </div>
          </div>

          {/* Content */}
          <div style={{ padding: "20px 24px 24px", flex: 1, display: "flex", flexDirection: "column" }}>
            <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 6 }}>
              <span style={{ fontSize: "0.8rem", color: "var(--text-muted)" }}>
                {project.year}
              </span>
              {project.client && (
                <>
                  <span style={{ color: "var(--text-muted)" }}>·</span>
                  <span style={{ fontSize: "0.8rem", color: "var(--text-muted)" }}>
                    {project.client}
                  </span>
                </>
              )}
            </div>
            <h3
              style={{
                fontFamily: "var(--font-inter), sans-serif",
                fontWeight: 700,
                fontSize: "1.05rem",
                color: "var(--text-primary)",
                marginBottom: 8,
              }}
            >
              {project.title}
            </h3>
            <p
              style={{
                fontSize: "0.88rem",
                color: "var(--text-secondary)",
                lineHeight: 1.6,
                marginBottom: 16,
                flex: 1,
              }}
            >
              {project.shortDesc}
            </p>
            {/* Tags */}
            <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
              {project.tags.slice(0, 3).map((tag) => (
                <span key={tag} className="tag" style={{ fontSize: "0.72rem" }}>
                  {tag}
                </span>
              ))}
              {project.tags.length > 3 && (
                <span className="tag" style={{ fontSize: "0.72rem" }}>
                  +{project.tags.length - 3}
                </span>
              )}
            </div>
          </div>
        </div>
      </Link>
    </motion.div>
  );
}
