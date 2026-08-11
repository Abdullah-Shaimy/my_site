"use client";

import React, { useState, useRef } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import Image from "next/image";
import { Code2, Palette, Terminal, Sparkles } from "lucide-react";

export default function HeroAvatarVisual() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);

  // Motion values for 3D tilt interaction
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  // Smooth springs for fluid motion
  const springConfig = { damping: 25, stiffness: 200 };
  const rotateX = useSpring(useTransform(mouseY, [-0.5, 0.5], [15, -15]), springConfig);
  const rotateY = useSpring(useTransform(mouseX, [-0.5, 0.5], [-15, 15]), springConfig);

  // Parallax offsets for floating badge depth
  const badgeZ1 = useSpring(useTransform(mouseY, [-0.5, 0.5], [45, 25]), springConfig);
  const badgeZ2 = useSpring(useTransform(mouseX, [-0.5, 0.5], [55, 35]), springConfig);
  const badgeZ3 = useSpring(useTransform(mouseY, [-0.5, 0.5], [40, 60]), springConfig);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    const x = (e.clientX - rect.left) / width - 0.5;
    const y = (e.clientY - rect.top) / height - 0.5;
    mouseX.set(x);
    mouseY.set(y);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    mouseX.set(0);
    mouseY.set(0);
  };

  return (
    <div
      ref={containerRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={handleMouseLeave}
      style={{
        perspective: 1200,
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        position: "relative",
        padding: "30px 20px",
        userSelect: "none",
      }}
    >
      {/* 3D Tilt Wrapper */}
      <motion.div
        style={{
          rotateX,
          rotateY,
          transformStyle: "preserve-3d",
          position: "relative",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          width: 360,
          height: 360,
        }}
        animate={{ scale: isHovered ? 1.03 : 1 }}
        transition={{ duration: 0.4, ease: "easeOut" }}
      >
        {/* Ambient Neon Backglow */}
        <motion.div
          animate={{
            scale: isHovered ? [1, 1.12, 1] : [1, 1.06, 1],
            opacity: isHovered ? 0.85 : 0.5,
          }}
          transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
          style={{
            position: "absolute",
            inset: -40,
            borderRadius: "50%",
            background:
              "radial-gradient(circle, rgba(0, 210, 255, 0.28) 0%, rgba(139, 92, 246, 0.22) 45%, transparent 75%)",
            filter: "blur(40px)",
            transform: "translateZ(-40px)",
            pointerEvents: "none",
          }}
        />

        {/* Outer Revolving Holographic SVG Ring */}
        <motion.div
          animate={{ rotate: -360 }}
          transition={{ duration: 35, repeat: Infinity, ease: "linear" }}
          style={{
            position: "absolute",
            inset: -70,
            zIndex: 0,
            pointerEvents: "none",
            transform: "translateZ(-20px)",
          }}
        >
          <svg width="100%" height="100%" viewBox="0 0 500 500" fill="none">
            <defs>
              <linearGradient id="orbitGrad1" x1="0" y1="0" x2="1" y2="1">
                <stop offset="0%" stopColor="#00d2ff" stopOpacity="0.8" />
                <stop offset="50%" stopColor="#8b5cf6" stopOpacity="0.6" />
                <stop offset="100%" stopColor="#ec4899" stopOpacity="0.8" />
              </linearGradient>
              <filter id="glow" x="-20%" y="-20%" width="140%" height="140%">
                <feGaussianBlur stdDeviation="3" result="blur" />
                <feComposite in="SourceGraphic" in2="blur" operator="over" />
              </filter>
            </defs>

            {/* Orbit Tracks */}
            <circle cx="250" cy="250" r="220" stroke="url(#orbitGrad1)" strokeWidth="1.5" strokeDasharray="6 12" opacity="0.4" />
            <circle cx="250" cy="250" r="240" stroke="url(#orbitGrad1)" strokeWidth="1" strokeDasharray="30 60 15 45" opacity="0.6" />

            {/* Circuit Connections */}
            <g stroke="url(#orbitGrad1)" strokeWidth="2" strokeLinecap="round" filter="url(#glow)">
              <path d="M 250 10 L 250 35 L 275 60" />
              <circle cx="250" cy="10" r="4" fill="#00d2ff" />
              
              <path d="M 490 250 L 465 250 L 440 225" />
              <circle cx="490" cy="250" r="4" fill="#8b5cf6" />
              
              <path d="M 250 490 L 250 465 L 225 440" />
              <circle cx="250" cy="490" r="4" fill="#ec4899" />
              
              <path d="M 10 250 L 35 250 L 60 275" />
              <circle cx="10" cy="250" r="4" fill="#00d2ff" />

              {/* Glowing Corner Nodes */}
              <circle cx="80" cy="80" r="3.5" fill="#00d2ff" />
              <circle cx="420" cy="80" r="3.5" fill="#8b5cf6" />
              <circle cx="80" cy="420" r="3.5" fill="#ec4899" />
              <circle cx="420" cy="420" r="3.5" fill="#00d2ff" />
            </g>
          </svg>
        </motion.div>

        {/* Counter-rotating Radar Sweep Ring */}
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 18, repeat: Infinity, ease: "linear" }}
          style={{
            position: "absolute",
            inset: -25,
            borderRadius: "50%",
            background:
              "conic-gradient(from 0deg, transparent 70%, rgba(0, 210, 255, 0.4) 85%, rgba(139, 92, 246, 0.8) 100%)",
            padding: 2,
            maskImage: "radial-gradient(circle, transparent 65%, black 67%)",
            WebkitMaskImage: "radial-gradient(circle, transparent 65%, black 67%)",
            pointerEvents: "none",
            transform: "translateZ(-10px)",
          }}
        />

        {/* Main Avatar Glass Circle Frame */}
        <motion.div
          style={{
            width: 320,
            height: 320,
            borderRadius: "50%",
            position: "relative",
            zIndex: 2,
            padding: 5,
            background: "linear-gradient(135deg, rgba(0, 210, 255, 0.5), rgba(139, 92, 246, 0.5), rgba(236, 72, 153, 0.3))",
            boxShadow: isHovered
              ? "0 25px 70px rgba(0, 210, 255, 0.35), 0 0 40px rgba(139, 92, 246, 0.3)"
              : "0 20px 50px rgba(0, 210, 255, 0.2), 0 0 25px rgba(139, 92, 246, 0.15)",
            transition: "box-shadow 0.4s ease",
            transform: "translateZ(20px)",
          }}
        >
          {/* Inner avatar viewport */}
          <div
            style={{
              width: "100%",
              height: "100%",
              borderRadius: "50%",
              overflow: "hidden",
              position: "relative",
              background: "var(--bg-primary)",
            }}
          >
            <Image
              src="/profile.jpg"
              alt="Abdullah Shaimy"
              fill
              priority
              sizes="(max-width: 768px) 260px, 320px"
              onContextMenu={(e) => e.preventDefault()}
              onDragStart={(e) => e.preventDefault()}
              style={{
                borderRadius: "50%",
                objectFit: "cover",
                transform: isHovered ? "scale(1.12) translateY(-2px)" : "scale(1.08)",
                transition: "transform 0.5s cubic-bezier(0.2, 0.8, 0.2, 1)",
                objectPosition: "center 0%",
                userSelect: "none",
              }}
            />

            {/* Subtle cyber scanline & glass gradient overlay */}
            <div
              style={{
                position: "absolute",
                inset: 0,
                borderRadius: "50%",
                background:
                  "linear-gradient(180deg, rgba(255, 255, 255, 0.08) 0%, transparent 40%, rgba(0, 210, 255, 0.1) 100%)",
                pointerEvents: "none",
              }}
            />
          </div>
        </motion.div>

        {/* ─── FLOATING BADGE 1: Developer (Top Right) ─── */}
        <motion.div
          style={{
            position: "absolute",
            top: 15,
            right: -45,
            zIndex: 10,
            transform: `translateZ(${badgeZ1.get()}px)`,
          }}
          animate={{ y: [0, -6, 0] }}
          transition={{ duration: 3.2, repeat: Infinity, ease: "easeInOut" }}
        >
          <div
            style={{
              background: "rgba(12, 14, 28, 0.78)",
              backdropFilter: "blur(16px)",
              WebkitBackdropFilter: "blur(16px)",
              borderRadius: 14,
              padding: "10px 16px",
              border: "1px solid rgba(0, 210, 255, 0.3)",
              boxShadow: "0 10px 30px rgba(0, 0, 0, 0.35), 0 0 15px rgba(0, 210, 255, 0.2)",
              display: "flex",
              alignItems: "center",
              gap: 10,
              cursor: "default",
            }}
          >
            <div
              style={{
                width: 34,
                height: 34,
                borderRadius: 10,
                background: "linear-gradient(135deg, rgba(0, 210, 255, 0.25), rgba(139, 92, 246, 0.25))",
                border: "1px solid rgba(0, 210, 255, 0.4)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                color: "#00d2ff",
              }}
            >
              <Code2 size={18} />
            </div>
            <div>
              <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
                <span style={{ fontSize: "0.85rem", fontWeight: 700, color: "#ffffff" }}>
                  Full-Stack Dev
                </span>
                <span
                  style={{
                    width: 7,
                    height: 7,
                    borderRadius: "50%",
                    backgroundColor: "#22c55e",
                    boxShadow: "0 0 8px #22c55e",
                  }}
                />
              </div>
              <span style={{ fontSize: "0.72rem", color: "#94a3b8", fontWeight: 500 }}>
                Next.js • React • TS
              </span>
            </div>
          </div>
        </motion.div>

        {/* ─── FLOATING BADGE 2: Designer (Bottom Left) ─── */}
        <motion.div
          style={{
            position: "absolute",
            bottom: 25,
            left: -45,
            zIndex: 10,
            transform: `translateZ(${badgeZ2.get()}px)`,
          }}
          animate={{ y: [0, 6, 0] }}
          transition={{ duration: 3.8, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
        >
          <div
            style={{
              background: "rgba(12, 14, 28, 0.78)",
              backdropFilter: "blur(16px)",
              WebkitBackdropFilter: "blur(16px)",
              borderRadius: 14,
              padding: "10px 16px",
              border: "1px solid rgba(139, 92, 246, 0.35)",
              boxShadow: "0 10px 30px rgba(0, 0, 0, 0.35), 0 0 15px rgba(139, 92, 246, 0.2)",
              display: "flex",
              alignItems: "center",
              gap: 10,
              cursor: "default",
            }}
          >
            <div
              style={{
                width: 34,
                height: 34,
                borderRadius: 10,
                background: "linear-gradient(135deg, rgba(139, 92, 246, 0.25), rgba(236, 72, 153, 0.25))",
                border: "1px solid rgba(139, 92, 246, 0.4)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                color: "#a855f7",
              }}
            >
              <Palette size={18} />
            </div>
            <div>
              <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
                <span style={{ fontSize: "0.85rem", fontWeight: 700, color: "#ffffff" }}>
                  UI/UX Designer
                </span>
                <div style={{ display: "flex", gap: 3 }}>
                  <span style={{ width: 6, height: 6, borderRadius: "50%", background: "#00d2ff" }} />
                  <span style={{ width: 6, height: 6, borderRadius: "50%", background: "#8b5cf6" }} />
                  <span style={{ width: 6, height: 6, borderRadius: "50%", background: "#ec4899" }} />
                </div>
              </div>
              <span style={{ fontSize: "0.72rem", color: "#94a3b8", fontWeight: 500 }}>
                NanoVext • Aesthetic
              </span>
            </div>
          </div>
        </motion.div>

        {/* ─── FLOATING BADGE 3: Live Code / Tech Snippet Pill (Bottom Right) ─── */}
        <motion.div
          style={{
            position: "absolute",
            bottom: -20,
            right: -20,
            zIndex: 11,
            transform: `translateZ(${badgeZ3.get()}px)`,
          }}
          animate={{ y: [0, -5, 0] }}
          transition={{ duration: 4, repeat: Infinity, ease: "easeInOut", delay: 1 }}
        >
          <div
            style={{
              background: "rgba(8, 10, 20, 0.88)",
              backdropFilter: "blur(18px)",
              WebkitBackdropFilter: "blur(18px)",
              borderRadius: 12,
              padding: "7px 14px",
              border: "1px solid rgba(255, 255, 255, 0.12)",
              boxShadow: "0 8px 24px rgba(0, 0, 0, 0.4)",
              display: "flex",
              alignItems: "center",
              gap: 8,
              fontFamily: "monospace",
              fontSize: "0.74rem",
              color: "#e2e8f0",
            }}
          >
            <Terminal size={14} style={{ color: "#00d2ff" }} />
            <span>
              <span style={{ color: "#8b5cf6", fontWeight: 600 }}>stack</span> = [<span style={{ color: "#00d2ff" }}>&apos;Next.js&apos;</span>, <span style={{ color: "#ec4899" }}>&apos;Tailwind&apos;</span>]
            </span>
          </div>
        </motion.div>

        {/* ─── FLOATING BADGE 4: Quality / Status Tag (Top Left) ─── */}
        <motion.div
          style={{
            position: "absolute",
            top: -15,
            left: -20,
            zIndex: 11,
            transform: "translateZ(30px)",
          }}
          animate={{ y: [0, 5, 0] }}
          transition={{ duration: 3.5, repeat: Infinity, ease: "easeInOut", delay: 1.5 }}
        >
          <div
            style={{
              background: "rgba(8, 10, 20, 0.85)",
              backdropFilter: "blur(16px)",
              borderRadius: 20,
              padding: "5px 12px",
              border: "1px solid rgba(34, 197, 94, 0.3)",
              boxShadow: "0 4px 16px rgba(0, 0, 0, 0.3)",
              display: "flex",
              alignItems: "center",
              gap: 6,
              fontSize: "0.73rem",
              fontWeight: 600,
              color: "#4ade80",
            }}
          >
            <Sparkles size={13} style={{ color: "#22c55e" }} />
            <span>High Performance</span>
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
}
