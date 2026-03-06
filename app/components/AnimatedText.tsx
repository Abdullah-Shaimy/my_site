"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

const roles = ["Developer", "Designer", "Freelancer"];

export default function AnimatedText() {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % roles.length);
    }, 2500);
    return () => clearInterval(interval);
  }, []);

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
            fontFamily: "var(--font-josefin), sans-serif",
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
