"use client";

import { useEffect, useRef } from "react";
import { motion, useInView, useAnimation } from "framer-motion";

interface SkillBarProps {
  name: string;
  level: number;
  delay?: number;
}

export default function SkillBar({ name, level, delay = 0 }: SkillBarProps) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-60px" });
  const controls = useAnimation();

  useEffect(() => {
    if (isInView) {
      controls.start({
        scaleX: 1,
        transition: {
          duration: 1.2,
          delay,
          ease: [0.4, 0, 0.2, 1],
        },
      });
    }
  }, [isInView, controls, delay]);

  return (
    <div ref={ref} style={{ marginBottom: 20 }}>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: 8,
        }}
      >
        <span
          style={{
            fontFamily: "Inter, sans-serif",
            fontWeight: 500,
            fontSize: "0.9rem",
            color: "var(--text-primary)",
          }}
        >
          {name}
        </span>
        <span
          style={{
            fontFamily: "var(--font-josefin), sans-serif",
            fontWeight: 600,
            fontSize: "0.85rem",
            color: "var(--accent-purple)",
          }}
        >
          {level}%
        </span>
      </div>
      <div className="skill-bar-bg">
        <motion.div
          initial={{ scaleX: 0 }}
          animate={controls}
          className="skill-bar-fill"
          style={{ width: `${level}%` }}
        />
      </div>
    </div>
  );
}
