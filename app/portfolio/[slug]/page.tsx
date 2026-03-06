"use client";

import { use } from "react";
import { notFound } from "next/navigation";
import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowLeft, ExternalLink, Github, Tag, Calendar, User } from "lucide-react";
import { projects } from "../../data/projects";
import ScrollReveal from "../../components/ScrollReveal";

export default function ProjectDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = use(params);
  const project = projects.find((p) => p.slug === slug);
  if (!project) notFound();

  const isDesign = project.category === "Designing";

  return (
    <div style={{ minHeight: "100vh", paddingTop: 70 }}>
      {/* Hero */}
      <section
        style={{
          background: isDesign
            ? "linear-gradient(135deg, #f5f3ff 0%, #ede9fe 50%, #fdf2f8 100%)"
            : "linear-gradient(135deg, #eff6ff 0%, #dbeafe 50%, #f0f9ff 100%)",
          padding: "64px 24px 56px",
          position: "relative",
          overflow: "hidden",
        }}
      >
        <div
          style={{
            position: "absolute",
            top: -60,
            right: -60,
            width: 300,
            height: 300,
            borderRadius: "50%",
            background: isDesign
              ? "radial-gradient(circle, rgba(139,92,246,0.12) 0%, transparent 70%)"
              : "radial-gradient(circle, rgba(59,130,246,0.12) 0%, transparent 70%)",
          }}
        />
        <div className="container-custom">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <Link
              href="/portfolio"
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: 6,
                color: "var(--text-muted)",
                textDecoration: "none",
                fontSize: "0.88rem",
                marginBottom: 20,
                transition: "color 0.2s",
              }}
              onMouseEnter={(e) => (e.currentTarget.style.color = "var(--accent-purple)")}
              onMouseLeave={(e) => (e.currentTarget.style.color = "var(--text-muted)")}
            >
              <ArrowLeft size={14} /> Back to Portfolio
            </Link>

            <div style={{ display: "flex", gap: 10, marginBottom: 12, flexWrap: "wrap" }}>
              <span
                style={{
                  padding: "4px 14px",
                  borderRadius: 50,
                  background: isDesign ? "rgba(139,92,246,0.1)" : "rgba(59,130,246,0.1)",
                  border: `1px solid ${isDesign ? "rgba(139,92,246,0.25)" : "rgba(59,130,246,0.25)"}`,
                  color: isDesign ? "#8b5cf6" : "#3b82f6",
                  fontSize: "0.78rem",
                  fontWeight: 600,
                }}
              >
                {project.category}
              </span>
              {project.featured && (
                <span
                  style={{
                    padding: "4px 14px",
                    borderRadius: 50,
                    background: "rgba(236,72,153,0.08)",
                    border: "1px solid rgba(236,72,153,0.2)",
                    color: "#ec4899",
                    fontSize: "0.78rem",
                    fontWeight: 600,
                  }}
                >
                  ⭐ Featured
                </span>
              )}
            </div>

            <h1
              style={{
                fontFamily: "var(--font-josefin), sans-serif",
                fontWeight: 800,
                fontSize: "clamp(1.8rem, 5vw, 3rem)",
                color: "var(--text-primary)",
                marginBottom: 12,
              }}
            >
              {project.title}
            </h1>
            <p style={{ color: "var(--text-secondary)", fontSize: "1rem", maxWidth: 600, lineHeight: 1.7, marginBottom: 24 }}>
              {project.shortDesc}
            </p>

            {/* Meta */}
            <div style={{ display: "flex", gap: 24, flexWrap: "wrap" }}>
              <span style={{ display: "flex", alignItems: "center", gap: 6, fontSize: "0.85rem", color: "var(--text-muted)" }}>
                <Calendar size={13} /> {project.year}
              </span>
              {project.client && (
                <span style={{ display: "flex", alignItems: "center", gap: 6, fontSize: "0.85rem", color: "var(--text-muted)" }}>
                  <User size={13} /> {project.client}
                </span>
              )}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Content */}
      <section className="section-padding">
        <div className="container-custom">
          <div
            style={{ display: "grid", gridTemplateColumns: "1fr 320px", gap: 48 }}
            className="project-detail-grid"
          >
            {/* Main */}
            <div>
              {/* Project image placeholder */}
              <ScrollReveal>
                <div
                  style={{
                    width: "100%",
                    height: "auto",
                    aspectRatio: "16/9",
                    borderRadius: "var(--radius-lg)",
                    overflow: "hidden",
                    marginBottom: 40,
                    border: "1px solid rgba(139,92,246,0.1)",
                    boxShadow: "0 20px 40px rgba(0,0,0,0.05)",
                  }}
                >
                  <img
                    src={project.image}
                    alt={project.title}
                    style={{
                      width: "100%",
                      height: "100%",
                      objectFit: "cover",
                    }}
                  />
                </div>
              </ScrollReveal>

              <ScrollReveal delay={0.1}>
                <h2
                  style={{
                    fontFamily: "var(--font-josefin), sans-serif",
                    fontWeight: 700,
                    fontSize: "1.4rem",
                    color: "var(--text-primary)",
                    marginBottom: 16,
                  }}
                >
                  Project Overview
                </h2>
                <p
                  style={{
                    color: "var(--text-secondary)",
                    lineHeight: 1.8,
                    fontSize: "0.95rem",
                  }}
                >
                  {project.description}
                </p>
              </ScrollReveal>
            </div>

            {/* Sidebar */}
            <div>
              <ScrollReveal delay={0.15}>
                <div className="glass-card" style={{ padding: "24px" }}>
                  {/* Tags */}
                  <div style={{ marginBottom: 24 }}>
                    <h4
                      style={{
                        fontFamily: "var(--font-josefin), sans-serif",
                        fontWeight: 600,
                        fontSize: "0.85rem",
                        color: "var(--text-secondary)",
                        marginBottom: 12,
                        display: "flex",
                        alignItems: "center",
                        gap: 6,
                      }}
                    >
                      <Tag size={14} /> Technologies
                    </h4>
                    <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
                      {project.tags.map((tag) => (
                        <span key={tag} className="tag tag-purple" style={{ fontSize: "0.78rem" }}>
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Links */}
                  <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
                    {project.liveUrl && (
                      <a
                        href={project.liveUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="btn-primary"
                        style={{ justifyContent: "center" }}
                      >
                        <ExternalLink size={15} /> View Live
                      </a>
                    )}
                    {project.githubUrl && (
                      <a
                        href={project.githubUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="btn-secondary"
                        style={{ justifyContent: "center" }}
                      >
                        <Github size={15} /> View Code
                      </a>
                    )}
                  </div>
                </div>
              </ScrollReveal>
            </div>
          </div>
        </div>
      </section>

      <style>{`
        @media (max-width: 768px) {
          .project-detail-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </div>
  );
}
