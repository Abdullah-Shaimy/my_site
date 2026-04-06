"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";

const roles = ["Learner", "Developer", "Designer", "Freelancer"];

export default function AnimatedText() {
  const [index, setIndex] = useState(0);
  const shouldReduceMotion = useReducedMotion();

  useEffect(() => {
    if (shouldReduceMotion) return;

    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % roles.length);
    }, 2500);

    return () => clearInterval(interval);
  }, [shouldReduceMotion]);

  if (shouldReduceMotion) {
    return (
      <span
        className="gradient-text"
        style={{
          fontFamily: "var(--font-inter), sans-serif",
          fontWeight: 800,
          display: "inline-block",
        }}
      >
        Developer
      </span>
    );
  }

  return (
    <div
      style={{
        display: "inline-flex",
        alignItems: "center",
        height: "1.2em",
        overflow: "hidden",
      }}
    >
      <AnimatePresence mode="wait">
        <motion.span
          key={roles[index]}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.4, ease: [0.4, 0, 0.2, 1] }}
          className="gradient-text"
          style={{
            fontFamily: "var(--font-inter), sans-serif",
            fontWeight: 800,
            display: "inline-block",
          }}
        >
          {roles[index]}
        </motion.span>
      </AnimatePresence>
    </div>
  );
}
