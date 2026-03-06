"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import ScrollReveal from "../components/ScrollReveal";
import ProjectCard from "../components/ProjectCard";
import { projects } from "../data/projects";

type Category = "All" | "Designing" | "Development";

const categories: Category[] = ["All", "Development", "Designing"];

export default function PortfolioPage() {
  const [active, setActive] = useState<Category>("Development");

  const filtered = active === "All" ? projects : projects.filter((p) => p.category === active);

  return (
    <div style={{ minHeight: "100vh", paddingTop: 70 }}>
      {/* Header */}
      <section
        style={{
          padding: "64px 24px 56px",
          textAlign: "center",
          position: "relative",
          overflow: "hidden",
        }}
      >
        <div
          style={{
            position: "absolute",
            top: -80,
            right: -80,
            width: 350,
            height: 350,
            borderRadius: "50%",
            background: "radial-gradient(circle, rgba(59,130,246,0.1) 0%, transparent 70%)",
          }}
        />
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <span className="section-badge">✦ Portfolio</span>
          <h1
            style={{
              fontFamily: "var(--font-josefin), sans-serif",
              fontWeight: 800,
              fontSize: "clamp(2rem, 5vw, 3rem)",
              color: "var(--text-primary)",
              marginBottom: 12,
            }}
          >
            My Work
          </h1>
          <p style={{ color: "var(--text-secondary)", fontSize: "1rem", maxWidth: 480, margin: "0 auto" }}>
            A curated selection of design and development projects — each crafted with purpose and care.
          </p>
        </motion.div>
      </section>

      {/* Filter */}
      <div style={{ padding: "40px 24px 0" }}>
        <div style={{ maxWidth: 1200, margin: "0 auto" }}>
          <ScrollReveal>
            <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setActive(cat)}
                  style={{
                    padding: "9px 22px",
                    borderRadius: 50,
                    border: active === cat ? "none" : "1.5px solid rgba(139,92,246,0.2)",
                    background:
                      active === cat
                        ? "linear-gradient(135deg, #3b82f6, #8b5cf6)"
                        : "transparent",
                    color: active === cat ? "white" : "var(--text-secondary)",
                    fontFamily: "Inter, sans-serif",
                    fontWeight: 600,
                    fontSize: "0.88rem",
                    cursor: "pointer",
                    transition: "all 0.2s",
                    boxShadow: active === cat ? "0 4px 16px rgba(139,92,246,0.3)" : "none",
                  }}
                >
                  {cat}
                  <span
                    style={{
                      marginLeft: 6,
                      fontSize: "0.75rem",
                      opacity: 0.7,
                    }}
                  >
                    {cat === "All" ? projects.length : projects.filter((p) => p.category === cat).length}
                  </span>
                </button>
              ))}
            </div>
          </ScrollReveal>
        </div>
      </div>

      {/* Grid */}
      <section className="section-padding">
        <div className="container-custom">
          <AnimatePresence mode="wait">
            <motion.div
              key={active}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(3, 1fr)",
                gap: 24,
              }}
              className="portfolio-grid"
            >
              {filtered.map((project, i) => (
                <ProjectCard key={project.id} project={project} index={i} />
              ))}
            </motion.div>
          </AnimatePresence>
        </div>
      </section>

      <style>{`
        @media (max-width: 1024px) {
          .portfolio-grid { grid-template-columns: repeat(2, 1fr) !important; }
        }
        @media (max-width: 640px) {
          .portfolio-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </div>
  );
}
