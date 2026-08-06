"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import ScrollReveal from "../components/ScrollReveal";
import ServiceCard from "../components/ServiceCard";
import { services } from "../data/services";

const devServices = services.filter((s) => s.category === "Development");
const designServices = services.filter((s) => s.category === "Designing");

export default function ServicesPage() {
  const [activeCategory, setActiveCategory] = useState<"all" | "Development" | "Designing">("all");

  return (
    <div style={{ minHeight: "100vh", paddingTop: 70 }}>
      {/* Header */}
      <section
        style={{
          padding: "64px 24px 40px",
          textAlign: "center",
          position: "relative",
          overflow: "hidden",
        }}
      >
        <div
          style={{
            position: "absolute",
            bottom: -80,
            left: -80,
            width: 300,
            height: 300,
            borderRadius: "50%",
            background: "radial-gradient(circle, rgba(139, 92, 246,0.1) 0%, transparent 70%)",
          }}
        />
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <span className="section-badge">✦ Services</span>
          <h1
            style={{
              fontFamily: "var(--font-inter), sans-serif",
              fontWeight: 800,
              fontSize: "clamp(2rem, 5vw, 3rem)",
              color: "var(--text-primary)",
              marginBottom: 12,
            }}
          >
            What I Offer
          </h1>
          <p style={{ color: "var(--text-secondary)", fontSize: "1rem", maxWidth: 500, margin: "0 auto" }}>
            From robust web development to stunning visual design — I bring your digital vision to life.
          </p>

          {/* Category Filter Tabs */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: 10,
              marginTop: 36,
              padding: "6px",
              borderRadius: 50,
              background: "var(--glass-bg)",
              backdropFilter: "blur(12px)",
              WebkitBackdropFilter: "blur(12px)",
              border: "1px solid var(--glass-border)",
              boxShadow: "0 8px 32px rgba(0, 0, 0, 0.12)",
              flexWrap: "wrap",
              justifyContent: "center",
            }}
          >
            {[
              { id: "all", label: "All Categories", icon: "✨", count: services.length },
              { id: "Development", label: "Development", icon: "💻", count: devServices.length },
              { id: "Designing", label: "Design & Creative", icon: "🎨", count: designServices.length },
            ].map((tab) => {
              const isActive = activeCategory === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveCategory(tab.id as any)}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: 8,
                    padding: "10px 20px",
                    borderRadius: 50,
                    background: isActive
                      ? "linear-gradient(135deg, #00d2ff, #8b5cf6)"
                      : "transparent",
                    border: "none",
                    color: isActive ? "#ffffff" : "var(--text-secondary)",
                    fontWeight: isActive ? 700 : 500,
                    fontSize: "0.88rem",
                    cursor: "pointer",
                    transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
                    boxShadow: isActive
                      ? "0 6px 20px rgba(139, 92, 246, 0.35)"
                      : "none",
                  }}
                >
                  <span style={{ fontSize: "1rem" }}>{tab.icon}</span>
                  <span>{tab.label}</span>
                  <span
                    style={{
                      fontSize: "0.74rem",
                      padding: "2px 8px",
                      borderRadius: 20,
                      background: isActive
                        ? "rgba(255, 255, 255, 0.25)"
                        : "rgba(139, 92, 246, 0.12)",
                      color: isActive ? "#ffffff" : "#8b5cf6",
                      fontWeight: 600,
                    }}
                  >
                    {tab.count}
                  </span>
                </button>
              );
            })}
          </motion.div>
        </motion.div>
      </section>

      {/* Dev Services */}
      <AnimatePresence mode="wait">
        {(activeCategory === "all" || activeCategory === "Development") && (
          <motion.section
            key="dev-section"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="section-padding"
          >
            <div className="container-custom">
              <ScrollReveal>
                <div style={{ marginBottom: 40 }}>
                  <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 8 }}>
                    <div
                      style={{
                        width: 36,
                        height: 36,
                        borderRadius: 10,
                        background: "linear-gradient(135deg, #8b5cf6, #00d2ff)",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        fontSize: "1.1rem",
                      }}
                    >
                      💻
                    </div>
                    <h2
                      style={{
                        fontFamily: "var(--font-inter), sans-serif",
                        fontWeight: 700,
                        fontSize: "1.6rem",
                        color: "var(--text-primary)",
                      }}
                    >
                      Development Services
                    </h2>
                  </div>
                  <p style={{ color: "var(--text-secondary)", fontSize: "0.95rem", marginLeft: 48 }}>
                    Building the digital backbone of your business with high-performance code and scalable architecture.
                  </p>
                </div>
              </ScrollReveal>
              <div
                style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 24 }}
                className="services-grid"
              >
                {devServices.map((service, i) => (
                  <ServiceCard key={service.id} service={service} index={i} />
                ))}
              </div>
            </div>
          </motion.section>
        )}
      </AnimatePresence>

      {/* Design Services */}
      <AnimatePresence mode="wait">
        {(activeCategory === "all" || activeCategory === "Designing") && (
          <motion.section
            key="design-section"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            style={{
              padding: "80px 24px",
              background: "var(--bg-secondary)",
            }}
          >
            <div className="container-custom">
              <ScrollReveal>
                <div style={{ marginBottom: 40 }}>
                  <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 8 }}>
                    <div
                      style={{
                        width: 36,
                        height: 36,
                        borderRadius: 10,
                        background: "linear-gradient(135deg, #8b5cf6, #8b5cf6)",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        fontSize: "1.1rem",
                      }}
                    >
                      🎨
                    </div>
                    <h2
                      style={{
                        fontFamily: "var(--font-inter), sans-serif",
                        fontWeight: 700,
                        fontSize: "1.6rem",
                        color: "var(--text-primary)",
                      }}
                    >
                      Design Services
                    </h2>
                  </div>
                  <p style={{ color: "var(--text-secondary)", fontSize: "0.95rem", marginLeft: 48 }}>
                    Transforming corporate visions into minimalist, high-impact visual identities.
                  </p>
                </div>
              </ScrollReveal>
              <div
                style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 24 }}
                className="services-grid"
              >
                {designServices.map((service, i) => (
                  <ServiceCard key={service.id} service={service} index={i} />
                ))}
              </div>
            </div>
          </motion.section>
        )}
      </AnimatePresence>

      <style>{`
        @media (max-width: 1024px) {
          .services-grid { grid-template-columns: repeat(2, 1fr) !important; }
        }
        @media (max-width: 640px) {
          .services-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </div>
  );
}
