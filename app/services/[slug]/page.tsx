"use client";

import { use } from "react";
import { notFound } from "next/navigation";
import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import {
  ArrowLeft,
  Clock,
  CheckCircle,
  Package,
  Layers,
  Palette,
  Grid3X3,
  Code2,
  Monitor,
  Cpu,
  Terminal,
  Briefcase,
} from "lucide-react";
import { services } from "../../data/services";
import ScrollReveal from "../../components/ScrollReveal";

const iconMap: Record<string, React.ElementType> = {
  Layers,
  Palette,
  Grid3X3,
  Code2,
  Monitor,
  Cpu,
  Terminal,
  Briefcase,
};

export default function ServiceDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = use(params);
  const service = services.find((s) => s.slug === slug);
  if (!service) notFound();

  const isDesign = service.category === "Designing";
  const IconComp = iconMap[service.icon] || Layers;

  return (
    <div style={{ minHeight: "100vh", paddingTop: 70 }}>
      {/* Hero */}
      <section
        style={{
          background: isDesign
            ? "linear-gradient(135deg, var(--bg-secondary) 0%, rgba(139, 92, 246, 0.05) 50%, rgba(236, 72, 153, 0.05) 100%)"
            : "linear-gradient(135deg, var(--bg-secondary) 0%, rgba(59, 130, 246, 0.05) 50%, rgba(8, 8, 18, 0.05) 100%)",
          padding: "64px 24px 56px",
          position: "relative",
          overflow: "hidden",
          borderBottom: "1px solid var(--glass-border)",
        }}
      >
        <div className="container-custom">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
            <Link
              href="/services"
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: 6,
                color: "var(--text-muted)",
                textDecoration: "none",
                fontSize: "0.88rem",
                marginBottom: 24,
                transition: "color 0.2s",
              }}
              onMouseEnter={(e) => (e.currentTarget.style.color = "var(--accent-purple)")}
              onMouseLeave={(e) => (e.currentTarget.style.color = "var(--text-muted)")}
            >
              <ArrowLeft size={14} /> Back to Services
            </Link>

            <div style={{ display: "flex", alignItems: "flex-start", gap: 24, flexWrap: "wrap" }}>
              <div
                style={{
                  width: 72,
                  height: 72,
                  borderRadius: 20,
                  background: isDesign
                    ? "linear-gradient(135deg, #8b5cf6, #ec4899)"
                    : "linear-gradient(135deg, #3b82f6, #06b6d4)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  boxShadow: isDesign
                    ? "0 12px 32px rgba(139,92,246,0.35)"
                    : "0 12px 32px rgba(59,130,246,0.35)",
                  flexShrink: 0,
                }}
              >
                <IconComp size={32} color="white" strokeWidth={1.8} />
              </div>
              <div>
                <span
                  style={{
                    display: "inline-block",
                    padding: "4px 14px",
                    borderRadius: 50,
                    background: isDesign ? "rgba(139,92,246,0.1)" : "rgba(59,130,246,0.1)",
                    border: `1px solid ${isDesign ? "rgba(139,92,246,0.25)" : "rgba(59,130,246,0.25)"}`,
                    color: isDesign ? "#8b5cf6" : "#3b82f6",
                    fontSize: "0.78rem",
                    fontWeight: 600,
                    marginBottom: 8,
                  }}
                >
                  {service.category}
                </span>
                <h1
                  style={{
                    fontFamily: "var(--font-josefin), sans-serif",
                    fontWeight: 800,
                    fontSize: "clamp(1.8rem, 5vw, 2.8rem)",
                    color: "var(--text-primary)",
                    marginBottom: 8,
                  }}
                >
                  {service.title}
                </h1>
                <p style={{ color: "var(--text-secondary)", fontSize: "1rem", lineHeight: 1.7, maxWidth: 560 }}>
                  {service.shortDesc}
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Content */}
      <section className="section-padding">
        <div className="container-custom">
          <div
            style={{ display: "grid", gridTemplateColumns: "1fr 300px", gap: 48 }}
            className="service-detail-grid"
          >
            {/* Main */}
            <div>
              <ScrollReveal>
                <div
                  style={{
                    width: "100%",
                    height: "auto",
                    aspectRatio: "21/9",
                    borderRadius: "var(--radius-lg)",
                    overflow: "hidden",
                    position: "relative",
                    marginBottom: 40,
                    border: "1px solid rgba(139,92,246,0.1)",
                  }}
                >
                  <Image
                    src={
                      isDesign
                        ? "https://images.unsplash.com/photo-1558655146-d09347e92766?auto=format&fit=crop&q=80&w=1200"
                        : "https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&q=80&w=1200"
                    }
                    alt={service.title}
                    fill
                    sizes="(max-width: 768px) 100vw, 900px"
                    style={{
                      objectFit: "cover",
                    }}
                  />
                </div>
                <h2
                  style={{
                    fontFamily: "var(--font-josefin), sans-serif",
                    fontWeight: 700,
                    fontSize: "1.4rem",
                    color: "var(--text-primary)",
                    marginBottom: 12,
                  }}
                >
                  About This Service
                </h2>
                <p style={{ color: "var(--text-secondary)", lineHeight: 1.8, fontSize: "0.95rem", marginBottom: 36 }}>
                  {service.description}
                </p>
              </ScrollReveal>

              <ScrollReveal delay={0.1}>
                <h3
                  style={{
                    fontFamily: "var(--font-josefin), sans-serif",
                    fontWeight: 700,
                    fontSize: "1.1rem",
                    color: "var(--text-primary)",
                    marginBottom: 16,
                  }}
                >
                  What&apos;s Included
                </h3>
                <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
                  {service.features.map((feature) => (
                    <div
                      key={feature}
                      className="glass-card"
                      style={{
                        display: "flex",
                        alignItems: "flex-start",
                        gap: 12,
                        padding: "14px 18px",
                        borderRadius: 12,
                        background: "var(--glass-bg)",
                        border: "1px solid var(--glass-border)",
                      }}
                    >
                      <CheckCircle
                        size={16}
                        color={isDesign ? "#8b5cf6" : "#3b82f6"}
                        style={{ flexShrink: 0, marginTop: 1 }}
                      />
                      <span style={{ fontSize: "0.9rem", color: "var(--text-secondary)" }}>{feature}</span>
                    </div>
                  ))}
                </div>
              </ScrollReveal>

              <ScrollReveal delay={0.2}>
                <h3
                  style={{
                    fontFamily: "var(--font-josefin), sans-serif",
                    fontWeight: 700,
                    fontSize: "1.1rem",
                    color: "var(--text-primary)",
                    margin: "32px 0 16px",
                    display: "flex",
                    alignItems: "center",
                    gap: 8,
                  }}
                >
                  <Package size={18} /> Deliverables
                </h3>
                <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
                  {service.deliverables.map((d) => (
                    <span key={d} className="tag tag-purple" style={{ fontSize: "0.82rem" }}>
                      {d}
                    </span>
                  ))}
                </div>
              </ScrollReveal>
            </div>

            {/* Sidebar */}
            <div>
              <ScrollReveal delay={0.15}>
                <div className="glass-card" style={{ padding: "24px", marginBottom: 16 }}>
                  <div style={{ marginBottom: 20 }}>
                    <p style={{ fontSize: "0.78rem", color: "var(--text-muted)", marginBottom: 4 }}>Starting Price</p>
                    <p
                      style={{
                        fontFamily: "var(--font-josefin), sans-serif",
                        fontWeight: 800,
                        fontSize: "2rem",
                        color: isDesign ? "#8b5cf6" : "#3b82f6",
                      }}
                    >
                      {service.startingPrice}
                    </p>
                  </div>
                  <div style={{ borderTop: "1px solid rgba(139,92,246,0.08)", paddingTop: 16, marginBottom: 16 }}>
                    <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 8 }}>
                      <Clock size={14} color="var(--text-muted)" />
                      <span style={{ fontSize: "0.85rem", color: "var(--text-muted)" }}>Timeline</span>
                    </div>
                    <p style={{ fontFamily: "var(--font-josefin), sans-serif", fontWeight: 600, fontSize: "0.95rem", color: "var(--text-primary)" }}>
                      {service.duration}
                    </p>
                  </div>
                  <Link href="/contact" className="btn-primary" style={{ width: "100%", justifyContent: "center" }}>
                    Get Started
                  </Link>
                </div>
              </ScrollReveal>
            </div>
          </div>
        </div>
      </section>

      <style>{`
        @media (max-width: 768px) {
          .service-detail-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </div>
  );
}
