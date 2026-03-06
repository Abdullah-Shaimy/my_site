"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowUpRight, Layers, Palette, Grid3X3, Code2, Monitor, Cpu } from "lucide-react";
import { Service } from "../data/services";

const iconMap: Record<string, React.ElementType> = {
  Layers,
  Palette,
  Grid3X3,
  Code2,
  Monitor,
  Cpu,
};

interface ServiceCardProps {
  service: Service;
  index?: number;
}

export default function ServiceCard({ service, index = 0 }: ServiceCardProps) {
  const IconComp = iconMap[service.icon] || Layers;
  const isDesign = service.category === "Designing";

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1, ease: [0.4, 0, 0.2, 1] }}
    >
      <Link href={`/services/${service.slug}`} style={{ textDecoration: "none" }}>
        <div
          className="glass-card"
          style={{
            padding: "28px",
            height: "100%",
            display: "flex",
            flexDirection: "column",
            cursor: "pointer",
            position: "relative",
            overflow: "hidden",
          }}
        >
          {/* BG Glow */}
          <div
            style={{
              position: "absolute",
              top: -20,
              right: -20,
              width: 100,
              height: 100,
              borderRadius: "50%",
              background: isDesign
                ? "radial-gradient(circle, rgba(139,92,246,0.08) 0%, transparent 70%)"
                : "radial-gradient(circle, rgba(59,130,246,0.08) 0%, transparent 70%)",
              pointerEvents: "none",
            }}
          />

          {/* Icon */}
          <div
            style={{
              width: 52,
              height: 52,
              borderRadius: 14,
              background: isDesign
                ? "linear-gradient(135deg, #8b5cf6, #ec4899)"
                : "linear-gradient(135deg, #3b82f6, #06b6d4)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              marginBottom: 16,
              boxShadow: isDesign
                ? "0 8px 24px rgba(139,92,246,0.3)"
                : "0 8px 24px rgba(59,130,246,0.3)",
            }}
          >
            <IconComp size={24} color="white" strokeWidth={1.8} />
          </div>

          {/* Category tag */}
          <div style={{ marginBottom: 8 }}>
            <span
              style={{
                padding: "3px 10px",
                borderRadius: 50,
                fontSize: "0.72rem",
                fontWeight: 600,
                background: isDesign
                  ? "rgba(139,92,246,0.08)"
                  : "rgba(59,130,246,0.08)",
                color: isDesign ? "#8b5cf6" : "#3b82f6",
                border: `1px solid ${isDesign ? "rgba(139,92,246,0.2)" : "rgba(59,130,246,0.2)"}`,
              }}
            >
              {service.category}
            </span>
          </div>

          <h3
            style={{
              fontFamily: "var(--font-josefin), sans-serif",
              fontWeight: 700,
              fontSize: "1.05rem",
              color: "var(--text-primary)",
              marginBottom: 8,
            }}
          >
            {service.title}
          </h3>
          <p
            style={{
              fontSize: "0.88rem",
              color: "var(--text-secondary)",
              lineHeight: 1.6,
              marginBottom: 20,
              flex: 1,
            }}
          >
            {service.shortDesc}
          </p>

          {/* Footer Row */}
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              borderTop: "1px solid rgba(139,92,246,0.08)",
              paddingTop: 16,
              marginTop: "auto",
            }}
          >
            <div>
              <p style={{ fontSize: "0.75rem", color: "var(--text-muted)", marginBottom: 2 }}>
                Starting from
              </p>
              <p
                style={{
                  fontFamily: "var(--font-josefin), sans-serif",
                  fontWeight: 700,
                  fontSize: "1rem",
                  color: isDesign ? "#8b5cf6" : "#3b82f6",
                }}
              >
                {service.startingPrice}
              </p>
            </div>
            <div
              style={{
                width: 36,
                height: 36,
                borderRadius: 10,
                background: isDesign
                  ? "rgba(139,92,246,0.1)"
                  : "rgba(59,130,246,0.1)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                color: isDesign ? "#8b5cf6" : "#3b82f6",
              }}
            >
              <ArrowUpRight size={16} />
            </div>
          </div>
        </div>
      </Link>
    </motion.div>
  );
}
