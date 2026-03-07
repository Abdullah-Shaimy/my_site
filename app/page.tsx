"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { Linkedin, Instagram, Github, ArrowRight, Eye } from "lucide-react";
import AnimatedText from "./components/AnimatedText";
import ScrollReveal from "./components/ScrollReveal";

const socialLinks = [
  { href: "https://www.linkedin.com/in/abdullahshaimy/", icon: Linkedin, label: "LinkedIn" },
  { href: "https://www.instagram.com/abdullahshaimy/", icon: Instagram, label: "Instagram" },
  { href: "https://www.behance.net/abdullahshaimy", icon: Github, label: "Behance" },
];

const stats = [
  { value: "50+", label: "Projects Managed" },
  { value: "4+", label: "Years Experience" },
  { value: "40+", label: "Happy Clients" },
  { value: "100%", label: "Satisfaction Rate" },
];

export default function HomePage() {
  return (
    <div style={{ minHeight: "100vh", background: "var(--bg-primary)" }}>
      {/* ─── Hero Section ─────────────────────────────────────── */}
      <section
        style={{
          minHeight: "100vh",
          display: "flex",
          alignItems: "center",
          position: "relative",
          overflow: "hidden",
          padding: "100px 24px 80px",
          background: "transparent",
        }}
      >
        {/* Background orbs */}
        <div className="hero-orb-1" style={{ opacity: 0.6, filter: "blur(80px)" }} />
        <div className="hero-orb-2" style={{ opacity: 0.4, filter: "blur(60px)" }} />

        {/* Grid pattern */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            backgroundImage:
              "linear-gradient(rgba(139,92,246,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(139,92,246,0.03) 1px, transparent 1px)",
            backgroundSize: "80px 80px",
            pointerEvents: "none",
          }}
        />

        <div style={{ maxWidth: 1200, margin: "0 auto", width: "100%", position: "relative" }}>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "1fr 1fr",
              gap: 60,
              alignItems: "center",
            }}
            className="hero-grid"
          >
            {/* Left Content */}
            <div>
              {/* Badge */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.1 }}
                style={{ marginBottom: 24 }}
              >
                <span className="section-badge">
                  <span style={{ color: "#22c55e", fontSize: "0.7rem" }}>●</span>
                  Available for Work · Sri Lanka 🇱🇰
                </span>
              </motion.div>

              {/* Heading */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.2 }}
              >
                <h1
                  style={{
                    fontFamily: "var(--font-josefin), sans-serif",
                    fontWeight: 800,
                    fontSize: "clamp(2.4rem, 5vw, 4rem)",
                    lineHeight: 1.1,
                    color: "var(--text-primary)",
                    marginBottom: 4,
                  }}
                >
                  Hi, I&apos;m
                </h1>
                <h1
                  style={{
                    fontFamily: "var(--font-josefin), sans-serif",
                    fontWeight: 800,
                    fontSize: "clamp(2.4rem, 5vw, 4rem)",
                    lineHeight: 1.1,
                    color: "var(--text-primary)",
                    marginBottom: 4,
                  }}
                >
                  Abdullah Shaimy,
                </h1>
                <h1
                  style={{
                    fontFamily: "var(--font-josefin), sans-serif",
                    fontWeight: 800,
                    fontSize: "clamp(2.4rem, 5vw, 4rem)",
                    lineHeight: 1.1,
                    marginBottom: 4,
                  }}
                >
                  <AnimatedText />
                </h1>
              </motion.div>

              {/* Tagline */}
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.4 }}
                style={{
                  fontSize: "1.05rem",
                  color: "var(--text-secondary)",
                  lineHeight: 1.7,
                  margin: "20px 0 36px",
                  maxWidth: 460,
                }}
              >
                CEO & Freelance Graphic Designer crafting <strong>Visually Engaging & User-Focused</strong> designs for global brands and startups.
              </motion.p>

              {/* CTAs */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.5 }}
                style={{ display: "flex", flexWrap: "wrap", gap: 12, marginBottom: 36 }}
              >
                <Link href="/portfolio" className="btn-primary">
                  <Eye size={16} />
                  View Portfolio
                </Link>
                <Link href="/contact" className="btn-secondary">
                  Hire Me
                  <ArrowRight size={16} />
                </Link>
              </motion.div>

              {/* Social Icons */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.6 }}
                style={{ display: "flex", alignItems: "center", gap: 12 }}
              >
                <span style={{ fontSize: "0.82rem", color: "var(--text-muted)", marginRight: 4 }}>
                  Follow:
                </span>
                {socialLinks.map(({ href, icon: Icon, label }) => (
                  <a
                    key={label}
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={label}
                    style={{
                      width: 38,
                      height: 38,
                      borderRadius: 10,
                      border: "1px solid var(--glass-border)",
                      background: "var(--glass-bg)",
                      backdropFilter: "blur(12px)",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      color: "var(--text-secondary)",
                      transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
                      textDecoration: "none",
                      boxShadow: "var(--shadow-sm)",
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.background = "var(--gradient-primary)";
                      e.currentTarget.style.color = "white";
                      e.currentTarget.style.borderColor = "transparent";
                      e.currentTarget.style.transform = "translateY(-4px)";
                      e.currentTarget.style.boxShadow = "0 8px 20px rgba(139, 92, 246, 0.25)";
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.background = "var(--glass-bg)";
                      e.currentTarget.style.color = "var(--text-secondary)";
                      e.currentTarget.style.borderColor = "var(--glass-border)";
                      e.currentTarget.style.transform = "none";
                      e.currentTarget.style.boxShadow = "var(--shadow-sm)";
                    }}
                  >
                    <Icon size={15} />
                  </a>
                ))}
              </motion.div>
            </div>

            {/* Right — Avatar */}
            <motion.div
              initial={{ opacity: 0, scale: 0.85 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.3, ease: [0.4, 0, 0.2, 1] }}
              style={{ display: "flex", justifyContent: "center" }}
            >
              <div style={{ position: "relative" }} className="animate-float">
                {/* Outer glow ring */}
                <div
                  style={{
                    position: "absolute",
                    inset: -20,
                    borderRadius: "50%",
                    background:
                      "radial-gradient(circle, rgba(139,92,246,0.15) 0%, transparent 70%)",
                    animation: "glowPulse 3s ease-in-out infinite",
                  }}
                />
                {/* Inner circling light border */}
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
                  style={{
                    position: "absolute",
                    inset: -5,
                    borderRadius: "50%",
                    background: "conic-gradient(from 0deg, transparent 70%, #3b82f6, #8b5cf6, #ec4899)",
                    zIndex: 0,
                  }}
                />

                {/* Avatar container with gradient border */}
                <div
                  style={{
                    width: 320,
                    height: 320,
                    borderRadius: "50%",
                    background: "var(--bg-primary)",
                    padding: 4,
                    boxShadow: "0 20px 60px rgba(139,92,246,0.25)",
                    overflow: "hidden",
                    position: "relative",
                    zIndex: 1,
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
                      transform: "scale(1.1)",
                      objectPosition: "center 0%",
                      userSelect: "none",
                    }}
                  />
                </div>

                {/* Floating badges */}
                <motion.div
                  animate={{ y: [0, -8, 0] }}
                  transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                  style={{
                    position: "absolute",
                    top: 40,
                    right: -30,
                    background: "var(--glass-bg)",
                    backdropFilter: "blur(var(--glass-blur))",
                    borderRadius: 12,
                    padding: "8px 14px",
                    boxShadow: "var(--shadow-md), inset 0 1px 1px -1px var(--glass-highlight)",
                    border: "1px solid var(--glass-border)",
                    fontSize: "0.82rem",
                    fontWeight: 600,
                    color: "var(--accent-blue)",
                    display: "flex",
                    alignItems: "center",
                    gap: 6,
                    zIndex: 10,
                  }}
                >
                  <span>🚀</span> Creative CEO
                </motion.div>

                <motion.div
                  animate={{ y: [0, 8, 0] }}
                  transition={{ duration: 3.5, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
                  style={{
                    position: "absolute",
                    bottom: 40,
                    left: -40,
                    background: "var(--glass-bg)",
                    backdropFilter: "blur(var(--glass-blur))",
                    borderRadius: 12,
                    padding: "8px 14px",
                    boxShadow: "var(--shadow-md), inset 0 1px 1px -1px var(--glass-highlight)",
                    border: "1px solid var(--glass-border)",
                    fontSize: "0.82rem",
                    fontWeight: 600,
                    color: "var(--accent-purple)",
                    display: "flex",
                    alignItems: "center",
                    gap: 6,
                    zIndex: 10,
                  }}
                >
                  <span>🎨</span> Graphic Designer
                </motion.div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ─── Stats Bar ─────────────────────────────────────────── */}
      <ScrollReveal>
        <div
          style={{
            background: "var(--glass-bg)",
            backdropFilter: "blur(var(--glass-blur))",
            WebkitBackdropFilter: "blur(var(--glass-blur))",
            borderTop: "1px solid var(--glass-border)",
            borderBottom: "1px solid var(--glass-border)",
            padding: "40px 24px",
            boxShadow: "inset 0 1px 1px -1px var(--glass-highlight)",
          }}
        >
          <div
            style={{
              maxWidth: 1200,
              margin: "0 auto",
              display: "grid",
              gridTemplateColumns: "repeat(4, 1fr)",
              gap: 24,
              textAlign: "center",
            }}
            className="stats-grid"
          >
            {stats.map((stat, i) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
              >
                <p
                  style={{
                    fontFamily: "var(--font-josefin), sans-serif",
                    fontWeight: 800,
                    fontSize: "2rem",
                    background: "linear-gradient(135deg, #3b82f6, #8b5cf6)",
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                    backgroundClip: "text",
                    marginBottom: 4,
                  }}
                >
                  {stat.value}
                </p>
                <p style={{ fontSize: "0.85rem", color: "var(--text-muted)" }}>
                  {stat.label}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </ScrollReveal>

      {/* ─── Featured Work Preview ─────────────────────────────── */}
      <section
        className="section-padding"
        style={{ background: "var(--bg-primary)" }}
      >
        <div className="container-custom">
          <ScrollReveal>
            <div style={{ textAlign: "center", marginBottom: 56 }}>
              <span className="section-badge">✦ Featured Work</span>
              <h2
                style={{
                  fontFamily: "var(--font-josefin), sans-serif",
                  fontWeight: 800,
                  fontSize: "clamp(1.8rem, 4vw, 2.8rem)",
                  color: "var(--text-primary)",
                  marginBottom: 12,
                }}
              >
                Recent Projects
              </h2>
              <p
                style={{
                  color: "var(--text-secondary)",
                  fontSize: "1rem",
                  maxWidth: 500,
                  margin: "0 auto",
                }}
              >
                A selection of development and design work I&apos;m proud of.
              </p>
            </div>
          </ScrollReveal>

          {/* Quick project teasers */}
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(3, 1fr)",
              gap: 24,
            }}
            className="projects-preview-grid"
          >
            {[
              {
                emoji: "💻",
                title: "Nexus SaaS Web App",
                cat: "Development",
                slug: "nexus-web-app",
              },
              {
                emoji: "🤖",
                title: "Aria AI Chat Interface",
                cat: "Development",
                slug: "ai-chat-interface",
              },
              {
                emoji: "🎨",
                title: "Nova UI Design System",
                cat: "Designing",
                slug: "nova-ui-kit",
              },
            ].map((item, i) => (
              <ScrollReveal key={item.slug} delay={i * 0.15}>
                <Link
                  href={`/portfolio/${item.slug}`}
                  style={{ textDecoration: "none" }}
                >
                  <div
                    className="glass-card"
                    style={{
                      padding: "28px",
                      cursor: "pointer",
                    }}
                  >
                    <div
                      style={{
                        fontSize: "2.5rem",
                        marginBottom: 12,
                      }}
                    >
                      {item.emoji}
                    </div>
                    <span
                      style={{
                        fontSize: "0.75rem",
                        fontWeight: 600,
                        color:
                          item.cat === "Designing" ? "#8b5cf6" : "#3b82f6",
                        textTransform: "uppercase",
                        letterSpacing: "0.05em",
                      }}
                    >
                      {item.cat}
                    </span>
                    <h3
                      style={{
                        fontFamily: "var(--font-josefin), sans-serif",
                        fontWeight: 700,
                        fontSize: "1rem",
                        color: "var(--text-primary)",
                        marginTop: 6,
                      }}
                    >
                      {item.title}
                    </h3>
                  </div>
                </Link>
              </ScrollReveal>
            ))}
          </div>

          <ScrollReveal delay={0.4}>
            <div style={{ textAlign: "center", marginTop: 40 }}>
              <Link href="/portfolio" className="btn-primary">
                View All Projects
                <ArrowRight size={16} />
              </Link>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* ─── Services Teaser ───────────────────────────────────── */}
      <section
        style={{
          background: "transparent",
          padding: "96px 24px",
        }}
      >
        <div className="container-custom">
          <ScrollReveal>
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "1fr 1fr",
                gap: 60,
                alignItems: "center",
              }}
              className="cta-grid"
            >
              <div>
                <span className="section-badge">✦ Services</span>
                <h2
                  style={{
                    fontFamily: "var(--font-josefin), sans-serif",
                    fontWeight: 800,
                    fontSize: "clamp(1.8rem, 4vw, 2.6rem)",
                    color: "var(--text-primary)",
                    marginBottom: 16,
                  }}
                >
                  What I Can Do For You
                </h2>
                <p
                  style={{
                    color: "var(--text-secondary)",
                    lineHeight: 1.7,
                    marginBottom: 28,
                    fontSize: "1rem",
                  }}
                >
                  From full-stack web applications and AI integrations to brand identity and UI/UX design — I bring your digital vision to life.
                </p>
                <Link href="/services" className="btn-primary">
                  Explore Services
                  <ArrowRight size={16} />
                </Link>
              </div>

              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "1fr 1fr",
                  gap: 16,
                }}
              >
                {[
                  { emoji: "💻", label: "Web Development" },
                  { emoji: "🤖", label: "AI Integration" },
                  { emoji: "🎨", label: "UI/UX Design" },
                  { emoji: "🏷️", label: "Brand Identity" },
                ].map((s) => (
                  <div
                    key={s.label}
                    className="glass-card"
                    style={{ padding: "20px", textAlign: "center" }}
                  >
                    <div style={{ fontSize: "2rem", marginBottom: 8 }}>{s.emoji}</div>
                    <p
                      style={{
                        fontFamily: "var(--font-josefin), sans-serif",
                        fontWeight: 600,
                        fontSize: "0.85rem",
                        color: "var(--text-primary)",
                      }}
                    >
                      {s.label}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* ─── CTA Section ──────────────────────────────────────── */}
      <section className="section-padding">
        <div className="container-custom">
          <ScrollReveal>
            <div
              className="glass-panel"
              style={{
                maxWidth: 700,
                margin: "0 auto",
                textAlign: "center",
                padding: "60px 40px",
              }}
            >
              <p
                style={{
                  fontSize: "2rem",
                  marginBottom: 16,
                }}
              >
                🚀
              </p>
              <h2
                style={{
                  fontFamily: "var(--font-josefin), sans-serif",
                  fontWeight: 800,
                  fontSize: "clamp(1.6rem, 4vw, 2.4rem)",
                  color: "var(--text-primary)",
                  marginBottom: 12,
                }}
              >
                Have a Project in Mind?
              </h2>
              <p
                style={{
                  color: "var(--text-secondary)",
                  fontSize: "1rem",
                  lineHeight: 1.7,
                  marginBottom: 28,
                  maxWidth: 480,
                  margin: "0 auto 28px",
                }}
              >
                Let&apos;s collaborate to build something extraordinary. I&apos;m
                available for freelance projects worldwide.
              </p>
              <div style={{ display: "flex", gap: 12, justifyContent: "center", flexWrap: "wrap" }}>
                <Link href="/contact" className="btn-primary">
                  Start a Project
                  <ArrowRight size={16} />
                </Link>
                <Link href="/about" className="btn-secondary">
                  Learn More About Me
                </Link>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </section>

      <style>{`
        @media (max-width: 768px) {
          .hero-grid { grid-template-columns: 1fr !important; text-align: center; }
          .stats-grid { grid-template-columns: repeat(2, 1fr) !important; }
          .projects-preview-grid { grid-template-columns: 1fr !important; }
          .cta-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </div>
  );
}
