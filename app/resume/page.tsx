"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { Briefcase, GraduationCap, Download, MapPin, Calendar, Star } from "lucide-react";
import ScrollReveal from "../components/ScrollReveal";
import { experiences, education } from "../data/resume";

export default function ResumePage() {
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
            left: "50%",
            transform: "translateX(-50%)",
            width: 400,
            height: 400,
            borderRadius: "50%",
            background: "radial-gradient(circle, rgba(139, 92, 246,0.1) 0%, transparent 70%)",
          }}
        />
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <span className="section-badge">✦ Resume</span>
          <h1
            style={{
              fontFamily: "var(--font-inter), sans-serif",
              fontWeight: 800,
              fontSize: "clamp(2rem, 5vw, 3rem)",
              color: "var(--text-primary)",
              marginBottom: 12,
            }}
          >
            Professional Journey
          </h1>
          <p style={{ color: "var(--text-secondary)", fontSize: "1rem", maxWidth: 500, margin: "0 auto 24px" }}>
            My experiences, education, and the path that shaped who I am today.
          </p>
          <Link href="/contact" className="btn-primary">
            <Download size={16} /> Request Full CV
          </Link>
        </motion.div>
      </section>

      {/* Two-column layout */}
      <section className="section-padding">
        <div className="container-custom">
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "1fr 1fr",
              gap: 48,
            }}
            className="resume-grid"
          >
            {/* ─── Experience Column ─────────────────────── */}
            <div>
              <ScrollReveal>
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: 10,
                    marginBottom: 32,
                  }}
                >
                  <div
                    style={{
                      width: 40,
                      height: 40,
                      borderRadius: 12,
                      background: "linear-gradient(135deg, #8b5cf6, #8b5cf6)",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    <Briefcase size={20} color="white" />
                  </div>
                  <h2
                    style={{
                      fontFamily: "var(--font-inter), sans-serif",
                      fontWeight: 700,
                      fontSize: "1.5rem",
                      color: "var(--text-primary)",
                    }}
                  >
                    Experience
                  </h2>
                </div>
              </ScrollReveal>

              <div style={{ position: "relative" }}>
                {experiences.map((exp, i) => (
                  <ScrollReveal key={exp.id} delay={i * 0.15}>
                    <div
                      style={{
                        display: "flex",
                        gap: 20,
                        marginBottom: 32,
                        position: "relative",
                      }}
                    >
                      {/* Timeline */}
                      <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
                        <div className="timeline-dot" />
                        {i < experiences.length - 1 && (
                          <div
                            style={{
                              flex: 1,
                              width: 2,
                              background: "linear-gradient(to bottom, rgba(139, 92, 246,0.3), transparent)",
                              marginTop: 6,
                              minHeight: 60,
                            }}
                          />
                        )}
                      </div>

                      {/* Content */}
                      <div className="glass-card" style={{ padding: "20px 24px", flex: 1 }}>
                        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", flexWrap: "wrap", gap: 8, marginBottom: 6 }}>
                          <span
                            style={{
                              display: "inline-block",
                              padding: "3px 10px",
                              borderRadius: 50,
                              background: "rgba(139, 92, 246,0.08)",
                              border: "1px solid rgba(139, 92, 246,0.2)",
                              color: "#8b5cf6",
                              fontSize: "0.72rem",
                              fontWeight: 600,
                            }}
                          >
                            {exp.type}
                          </span>
                          <span style={{ fontSize: "0.8rem", color: "var(--text-muted)", display: "flex", alignItems: "center", gap: 4 }}>
                            <Calendar size={12} /> {exp.duration}
                          </span>
                        </div>
                        <h3
                          style={{
                            fontFamily: "var(--font-inter), sans-serif",
                            fontWeight: 700,
                            fontSize: "1rem",
                            color: "var(--text-primary)",
                            marginBottom: 4,
                          }}
                        >
                          {exp.role}
                        </h3>
                        <p style={{ fontSize: "0.85rem", color: "var(--accent-purple)", fontWeight: 600, marginBottom: 4 }}>
                          {exp.company}
                        </p>
                        <p style={{ fontSize: "0.8rem", color: "var(--text-muted)", marginBottom: 10, display: "flex", alignItems: "center", gap: 4 }}>
                          <MapPin size={11} /> {exp.location}
                        </p>
                        <p style={{ fontSize: "0.85rem", color: "var(--text-secondary)", lineHeight: 1.6, marginBottom: 12 }}>
                          {exp.description}
                        </p>
                        <ul style={{ listStyle: "none", display: "flex", flexDirection: "column", gap: 6 }}>
                          {exp.highlights.map((h) => (
                            <li key={h} style={{ fontSize: "0.82rem", color: "var(--text-secondary)", display: "flex", gap: 8, alignItems: "flex-start" }}>
                              <Star size={12} style={{ color: "#8b5cf6", flexShrink: 0, marginTop: 3 }} />
                              {h}
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </ScrollReveal>
                ))}
              </div>
            </div>

            {/* ─── Education Column ──────────────────────── */}
            <div>
              <ScrollReveal delay={0.1}>
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: 10,
                    marginBottom: 32,
                  }}
                >
                  <div
                    style={{
                      width: 40,
                      height: 40,
                      borderRadius: 12,
                      background: "linear-gradient(135deg, #8b5cf6, #8b5cf6)",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    <GraduationCap size={20} color="white" />
                  </div>
                  <h2
                    style={{
                      fontFamily: "var(--font-inter), sans-serif",
                      fontWeight: 700,
                      fontSize: "1.5rem",
                      color: "var(--text-primary)",
                    }}
                  >
                    Education
                  </h2>
                </div>
              </ScrollReveal>

              {education.map((edu, i) => (
                <ScrollReveal key={edu.id} delay={i * 0.15 + 0.1}>
                  <div style={{ display: "flex", gap: 20, marginBottom: 32 }}>
                    <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
                      <div
                        style={{
                          width: 14,
                          height: 14,
                          borderRadius: "50%",
                          background: "linear-gradient(135deg, #8b5cf6, #8b5cf6)",
                          border: "3px solid white",
                          boxShadow: "0 0 0 2px rgba(139, 92, 246,0.3)",
                          flexShrink: 0,
                          marginTop: 4,
                        }}
                      />
                      {i < education.length - 1 && (
                        <div
                          style={{
                            flex: 1,
                            width: 2,
                            background: "linear-gradient(to bottom, rgba(139, 92, 246,0.3), transparent)",
                            marginTop: 6,
                            minHeight: 60,
                          }}
                        />
                      )}
                    </div>

                    <div className="glass-card" style={{ padding: "20px 24px", flex: 1 }}>
                      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", flexWrap: "wrap", gap: 8, marginBottom: 6 }}>
                        <span style={{ fontSize: "0.8rem", color: "var(--text-muted)", display: "flex", alignItems: "center", gap: 4 }}>
                          <Calendar size={12} /> {edu.duration}
                        </span>
                        <span style={{ fontSize: "0.8rem", color: "var(--text-muted)", display: "flex", alignItems: "center", gap: 4 }}>
                          <MapPin size={12} /> {edu.location}
                        </span>
                      </div>
                      <h3
                        style={{
                          fontFamily: "var(--font-inter), sans-serif",
                          fontWeight: 700,
                          fontSize: "0.95rem",
                          color: "var(--text-primary)",
                          marginBottom: 4,
                        }}
                      >
                        {edu.degree}
                      </h3>
                      <p style={{ fontSize: "0.85rem", color: "#8b5cf6", fontWeight: 600, marginBottom: 10 }}>
                        {edu.institution}
                      </p>
                      <p style={{ fontSize: "0.82rem", color: "var(--text-secondary)", lineHeight: 1.6, marginBottom: 12 }}>
                        {edu.description}
                      </p>
                      <ul style={{ listStyle: "none", display: "flex", flexDirection: "column", gap: 6 }}>
                        {edu.achievements.map((a) => (
                          <li key={a} style={{ fontSize: "0.82rem", color: "var(--text-secondary)", display: "flex", gap: 8, alignItems: "flex-start" }}>
                            <Star size={12} style={{ color: "#8b5cf6", flexShrink: 0, marginTop: 3 }} />
                            {a}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </ScrollReveal>
              ))}
            </div>
          </div>
        </div>
      </section>

      <style>{`
        @media (max-width: 768px) {
          .resume-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </div>
  );
}
