"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { MapPin, Calendar, Download, CheckCircle, ArrowRight } from "lucide-react";
import ScrollReveal from "../components/ScrollReveal";
import SkillBar from "../components/SkillBar";
import { skills, coreSkills } from "../data/skills";

const devSkills = skills.filter((s) => s.category === "development");
const designSkills = skills.filter((s) => s.category === "design");
const toolSkills = skills.filter((s) => s.category === "tool");

export default function AboutPage() {
  return (
    <div style={{ minHeight: "100vh", paddingTop: 70 }}>
      {/* ─── Hero ─────────────────────────────────────────────── */}
      <section
        style={{
          padding: "80px 24px",
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
            background: "radial-gradient(circle, rgba(139,92,246,0.1) 0%, transparent 70%)",
          }}
        />
        <div className="container-custom">
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "auto 1fr",
              gap: 48,
              alignItems: "center",
            }}
            className="about-hero-grid"
          >
            {/* Avatar */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6 }}
            >
              <div
                style={{
                  width: 180,
                  height: 180,
                  borderRadius: "50%",
                  background: "linear-gradient(135deg, #3b82f6, #8b5cf6, #ec4899)",
                  padding: 4,
                  boxShadow: "0 20px 60px rgba(139,92,246,0.3)",
                  overflow: "hidden",
                }}
              >
                  <img
                    src="/profile.jpg"
                    alt="Professional Avatar"
                    onContextMenu={(e) => e.preventDefault()}
                    onDragStart={(e) => e.preventDefault()}
                    style={{
                      width: "100%",
                      height: "100%",
                      borderRadius: "50%",
                      objectFit: "cover",
                      transform: "scale(1.2)",
                      objectPosition: "center 0%",
                      userSelect: "none",
                    }}
                  />
              </div>
            </motion.div>

            {/* Info */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 12, flexWrap: "wrap" }}>
                <span className="section-badge" style={{ margin: 0 }}>About Me</span>
                <span
                  style={{
                    display: "inline-flex",
                    alignItems: "center",
                    gap: 6,
                    padding: "5px 14px",
                    borderRadius: 50,
                    background: "rgba(34,197,94,0.1)",
                    border: "1px solid rgba(34,197,94,0.3)",
                    color: "#16a34a",
                    fontSize: "0.8rem",
                    fontWeight: 600,
                  }}
                >
                  <span style={{ width: 7, height: 7, borderRadius: "50%", background: "#22c55e", display: "inline-block" }} />
                  Open to Work
                </span>
              </div>
              <h1
                style={{
                  fontFamily: "var(--font-josefin), sans-serif",
                  fontWeight: 800,
                  fontSize: "clamp(1.8rem, 4vw, 2.8rem)",
                  color: "var(--text-primary)",
                  marginBottom: 8,
                }}
              >
                Abdullah Shaimy
              </h1>
              <div
                style={{
                  display: "flex",
                  gap: 20,
                  flexWrap: "wrap",
                  marginBottom: 16,
                }}
              >
                <span style={{ display: "flex", alignItems: "center", gap: 6, color: "var(--text-muted)", fontSize: "0.9rem" }}>
                  <MapPin size={14} color="#8b5cf6" /> Sri Lanka 🇱🇰
                </span>
                <span style={{ display: "flex", alignItems: "center", gap: 6, color: "var(--text-muted)", fontSize: "0.9rem" }}>
                  <Calendar size={14} color="#3b82f6" /> 4+ Years Experience
                </span>
              </div>
              <p style={{ color: "var(--text-secondary)", fontSize: "1rem", lineHeight: 1.7, maxWidth: 560, marginBottom: 24 }}>
                I&apos;m a passionate Graphic Designer and CEO from Sri Lanka, crafting intelligent and beautiful visual experiences for clients worldwide. I bridge the gap between creative storytelling and modern design to build identities that are both visually stunning and strategically effective.
              </p>
              <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
                <a href="/cv.pdf" download className="btn-primary">
                  <Download size={16} /> Download CV
                </a>
                <Link href="/contact" className="btn-secondary">
                  Hire Me <ArrowRight size={16} />
                </Link>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ─── About Content ─────────────────────────────────────── */}
      <section className="section-padding">
        <div className="container-custom">
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "1fr 1fr",
              gap: 60,
            }}
            className="about-content-grid"
          >
            {/* Left: Story */}
            <div>
              <ScrollReveal>
                <span className="section-badge">✦ My Story</span>
                <h2
                  style={{
                    fontFamily: "var(--font-josefin), sans-serif",
                    fontWeight: 700,
                    fontSize: "1.8rem",
                    color: "var(--text-primary)",
                    marginBottom: 16,
                  }}
                >
                  Crafting Visual Stories at the Intersection of Art & Strategy
                </h2>
                <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
                  {[
                    "My journey started with a deep curiosity for how visual language could empower brands to tell their stories and connect with their audience. Today, I combine strong creative skills with 4+ years of professional experience to build high-impact brand identities.",
                    "Based in Sri Lanka and working globally, I&apos;ve collaborated with startups and established businesses — delivering projects that make a lasting impression.",
                    "Whether it&apos;s a complex brand identity, a sleek packaging design, or a user-focused UI — I approach every project with strategic thinking, creative excellence, and meticulous attention to detail.",
                  ].map((para, i) => (
                    <p
                      key={i}
                      style={{
                        color: "var(--text-secondary)",
                        lineHeight: 1.75,
                        fontSize: "0.95rem",
                      }}
                      dangerouslySetInnerHTML={{ __html: para }}
                    />
                  ))}
                </div>
              </ScrollReveal>

              {/* Core Skills Chips */}
              <ScrollReveal delay={0.2}>
                <div style={{ marginTop: 32 }}>
                  <h3
                    style={{
                      fontFamily: "var(--font-josefin), sans-serif",
                      fontWeight: 600,
                      fontSize: "1rem",
                      color: "var(--text-primary)",
                      marginBottom: 14,
                    }}
                  >
                    Core Skills
                  </h3>
                  <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
                    {coreSkills.map((skill) => (
                      <span key={skill} className="tag tag-purple">
                        <CheckCircle size={11} style={{ display: "inline", marginRight: 4, verticalAlign: "middle" }} />
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              </ScrollReveal>
            </div>

            {/* Right: Skills */}
            <div>
              <ScrollReveal delay={0.1}>
                <span className="section-badge">✦ Proficiency</span>
                <h2
                  style={{
                    fontFamily: "var(--font-josefin), sans-serif",
                    fontWeight: 700,
                    fontSize: "1.8rem",
                    color: "var(--text-primary)",
                    marginBottom: 24,
                  }}
                >
                  Technical Skills
                </h2>
              </ScrollReveal>

              {/* Dev Skills */}
              <ScrollReveal delay={0.15}>
                <h4
                  style={{
                    fontFamily: "var(--font-josefin), sans-serif",
                    fontWeight: 600,
                    fontSize: "0.85rem",
                    textTransform: "uppercase",
                    letterSpacing: "0.06em",
                    color: "#3b82f6",
                    marginBottom: 16,
                  }}
                >
                  Development
                </h4>
                {devSkills.map((skill, i) => (
                  <SkillBar key={skill.name} name={skill.name} level={skill.level} delay={i * 0.08} />
                ))}
              </ScrollReveal>

              {/* Design Skills */}
              <ScrollReveal delay={0.2}>
                <h4
                  style={{
                    fontFamily: "var(--font-josefin), sans-serif",
                    fontWeight: 600,
                    fontSize: "0.85rem",
                    textTransform: "uppercase",
                    letterSpacing: "0.06em",
                    color: "#8b5cf6",
                    marginBottom: 16,
                    marginTop: 24,
                  }}
                >
                  Design
                </h4>
                {designSkills.map((skill, i) => (
                  <SkillBar key={skill.name} name={skill.name} level={skill.level} delay={i * 0.08} />
                ))}
              </ScrollReveal>

              {/* Tools */}
              <ScrollReveal delay={0.25}>
                <h4
                  style={{
                    fontFamily: "var(--font-josefin), sans-serif",
                    fontWeight: 600,
                    fontSize: "0.85rem",
                    textTransform: "uppercase",
                    letterSpacing: "0.06em",
                    color: "#ec4899",
                    marginBottom: 16,
                    marginTop: 24,
                  }}
                >
                  Tools &amp; AI
                </h4>
                {toolSkills.map((skill, i) => (
                  <SkillBar key={skill.name} name={skill.name} level={skill.level} delay={i * 0.08} />
                ))}
              </ScrollReveal>
            </div>
          </div>
        </div>
      </section>

      {/* ─── Values ────────────────────────────────────────────── */}
      <section
        style={{
          padding: "80px 24px",
          background: "var(--bg-secondary)",
        }}
      >
        <div className="container-custom">
          <ScrollReveal>
            <div style={{ textAlign: "center", marginBottom: 48 }}>
              <span className="section-badge">✦ My Values</span>
              <h2
                style={{
                  fontFamily: "var(--font-josefin), sans-serif",
                  fontWeight: 700,
                  fontSize: "2rem",
                  color: "var(--text-primary)",
                }}
              >
                What I Stand For
              </h2>
            </div>
          </ScrollReveal>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(3, 1fr)",
              gap: 24,
            }}
            className="values-grid"
          >
            {[
              { emoji: "⚡", title: "Efficiency", desc: "Fast, performant, and optimized digital products that deliver value quickly." },
              { emoji: "🎯", title: "Precision", desc: "Meticulous attention to detail in both logic and aesthetics — quality without compromise." },
              { emoji: "✨", title: "Innovation", desc: "Leveraging cutting-edge tech (AI, modern frameworks) to solve complex problems elegantly." },
            ].map((v, i) => (
              <ScrollReveal key={v.title} delay={i * 0.15}>
                <div className="glass-card" style={{ padding: "28px", textAlign: "center" }}>
                  <div style={{ fontSize: "2.5rem", marginBottom: 12 }}>{v.emoji}</div>
                  <h3
                    style={{
                      fontFamily: "var(--font-josefin), sans-serif",
                      fontWeight: 700,
                      fontSize: "1.05rem",
                      color: "var(--text-primary)",
                      marginBottom: 8,
                    }}
                  >
                    {v.title}
                  </h3>
                  <p style={{ color: "var(--text-secondary)", fontSize: "0.88rem", lineHeight: 1.6 }}>
                    {v.desc}
                  </p>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      <style>{`
        @media (max-width: 768px) {
          .about-hero-grid { grid-template-columns: 1fr !important; text-align: center; justify-items: center; }
          .about-content-grid { grid-template-columns: 1fr !important; }
          .values-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </div>
  );
}
