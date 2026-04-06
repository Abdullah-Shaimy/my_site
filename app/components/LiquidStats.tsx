"use client";

import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import React, { useRef, useState } from "react";

const statsData = [
  { value: "100+", label: "Projects Managed", color: "#8b5cf6" },
  { value: "90+", label: "Happy Clients", color: "#8b5cf6" },
  { value: "2+", label: "Years Experience", color: "#8b5cf6" },
  { value: "24h", label: "Response Time", color: "#22c55e" },
];

const StatCard = ({ stat, index }: { stat: typeof statsData[0], index: number }) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);

  // Mouse tracking for "Liquid" effect
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  // Smoothing springs
  const springConfig = { damping: 25, stiffness: 200 };
  const smoothX = useSpring(mouseX, springConfig);
  const smoothY = useSpring(mouseY, springConfig);

  // Translation values for the internal liquid blob
  const blobX = useTransform(smoothX, [0, 400], [-30, 30]);
  const blobY = useTransform(smoothY, [0, 200], [-20, 20]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    mouseX.set(e.clientX - rect.left);
    mouseY.set(e.clientY - rect.top);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.8, delay: index * 0.1 }}
      className="relative"
    >
      <div
        ref={cardRef}
        onMouseMove={handleMouseMove}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => {
          setIsHovered(false);
          mouseX.set(200); // Reset to center
          mouseY.set(100);
        }}
        className="glass-card group relative py-4 px-6 flex flex-col items-center justify-center text-center overflow-hidden"
        style={{
          borderRadius: "100px", // Full pill shape
          minHeight: "90px",
          cursor: "pointer",
        }}
      >
        {/* Dynamic Liquid Mesh Blob */}
        <motion.div
          animate={{ opacity: isHovered ? 0.6 : 0.2 }}
          transition={{ duration: 0.5 }}
          style={{
            position: "absolute",
            width: "250px",
            height: "250px",
            background: `radial-gradient(circle, ${stat.color}33 0%, transparent 70%)`,
            filter: "blur(40px)",
            x: blobX,
            y: blobY,
            z: 0,
            pointerEvents: "none",
          }}
        />

        {/* Content Layer */}
        <div className="relative z-10 pointer-events-none">
          <motion.h3
            animate={{ scale: isHovered ? 1.1 : 1 }}
            transition={{ type: "spring", stiffness: 300, damping: 10 }}
            className="text-3xl md:text-4xl font-extrabold mb-0.5 font-josefin"
            style={{
              fontFamily: "var(--font-inter), sans-serif",
              fontWeight: 800,
              background: `linear-gradient(135deg, ${stat.color}, #fff)`,
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
            }}
          >
            {stat.value}
          </motion.h3>
          <p 
            className="text-[0.65rem] md:text-[0.75rem] font-bold uppercase tracking-[0.2em] text-muted opacity-80"
            style={{ 
              color: "var(--text-muted)",
              fontWeight: 700
            }}
          >
            {stat.label}
          </p>
        </div>

        {/* Shine Sweep Effect */}
        <motion.div 
          className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent -translate-x-full group-hover:animate-shine-sweep pointer-events-none"
          initial={false}
          animate={isHovered ? { x: "100%" } : { x: "-100%" }}
          transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
        />

        {/* Bottom Refraction Line */}
        <motion.div 
          animate={{ 
            width: isHovered ? "60%" : "30%",
            opacity: isHovered ? 0.8 : 0.2 
          }}
          className="absolute bottom-4 h-[2px] rounded-full blur-[1px]"
          style={{ 
            background: stat.color,
            boxShadow: `0 0 15px ${stat.color}`,
          }}
        />
      </div>
    </motion.div>
  );
};

const LiquidStats = () => {
  return (
    <section className="relative py-12">
      <div className="container-custom">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
          {statsData.map((stat, index) => (
            <StatCard key={index} stat={stat} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default LiquidStats;
