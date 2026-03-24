"use client";

import { useEffect, useRef } from "react";

interface Segment {
  x: number;
  y: number;
  dx: number;
  dy: number;
  len: number;
  traveled: number;
  alpha: number;
  fadeIn: boolean;
  fadeOut: boolean;
  speed: number;
  color: string;
  width: number;
}

interface Node {
  x: number;
  y: number;
  r: number;
  alpha: number;
  pulse: number;
  pulseSpeed: number;
  color: string;
}

const GRID = 40;

function snap(v: number) {
  return Math.round(v / GRID) * GRID;
}

function rgba(c: string, a: number) {
  return `${c}${Math.min(1, Math.max(0, a)).toFixed(3)})`;
}

export default function CircuitLines() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const canvasEl = canvas;

    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReducedMotion) return;

    const ctx = canvasEl.getContext("2d");
    if (!ctx) return;

    let raf = 0;
    let frame = 0;
    let isPageVisible = !document.hidden;
    const segs: Segment[] = [];
    const nodes: Node[] = [];

    function getDensity() {
      const isMobile = window.innerWidth < 768;
      return {
        initialSegments: isMobile ? 24 : 44,
        maxSegments: isMobile ? 48 : 86,
        spawnInterval: isMobile ? 24 : 15,
      };
    }

    function resize() {
      canvasEl.width = window.innerWidth;
      canvasEl.height = window.innerHeight;
    }

    function isDark() {
      return document.documentElement.getAttribute("data-theme") === "dark";
    }

    function colors() {
      return isDark()
        ? ["rgba(96,165,250,", "rgba(167,139,250,", "rgba(244,114,182,", "rgba(52,211,153,"]
        : ["rgba(59,130,246,", "rgba(139,92,246,", "rgba(236,72,153,", "rgba(16,185,129,"];
    }

    function spawn() {
      const palette = colors();
      const color = palette[Math.floor(Math.random() * palette.length)];
      const side = Math.floor(Math.random() * 4);
      const gW = Math.floor(canvasEl.width / GRID);
      const gH = Math.floor(canvasEl.height / GRID);
      const gx = Math.floor(Math.random() * gW) * GRID;
      const gy = Math.floor(Math.random() * gH) * GRID;

      let x = 0;
      let y = 0;
      let dx = 0;
      let dy = 0;

      if (side === 0) {
        x = 0;
        y = gy;
        dx = 1;
      } else if (side === 1) {
        x = canvasEl.width;
        y = gy;
        dx = -1;
      } else if (side === 2) {
        x = gx;
        y = 0;
        dy = 1;
      } else {
        x = gx;
        y = canvasEl.height;
        dy = -1;
      }

      segs.push({
        x,
        y,
        dx,
        dy,
        len: (Math.floor(Math.random() * 10) + 4) * GRID,
        traveled: 0,
        alpha: 0,
        fadeIn: true,
        fadeOut: false,
        speed: Math.random() * 0.5 + 0.25,
        color,
        width: Math.random() < 0.2 ? 2 : 1,
      });
    }

    function draw() {
      if (!isPageVisible) {
        raf = requestAnimationFrame(draw);
        return;
      }

      ctx.clearRect(0, 0, canvasEl.width, canvasEl.height);
      frame += 1;

      const density = getDensity();
      if (frame % density.spawnInterval === 0 && segs.length < density.maxSegments) {
        spawn();
      }

      const darkMode = isDark();
      const trailA = darkMode ? 0.025 : 0.02;
      const peakA = darkMode ? 0.1 : 0.07;
      const nodeA = darkMode ? 0.12 : 0.08;

      for (let i = segs.length - 1; i >= 0; i--) {
        const s = segs[i];

        if (s.fadeIn) {
          s.alpha = Math.min(1, s.alpha + 0.04);
          if (s.alpha >= 1) s.fadeIn = false;
        }

        if (s.fadeOut) {
          s.alpha = Math.max(0, s.alpha - 0.018);
          if (s.alpha <= 0) {
            segs.splice(i, 1);
            continue;
          }
        }

        s.traveled += s.speed;
        const cl = Math.min(s.traveled, s.len);
        const ex = s.x + s.dx * cl;
        const ey = s.y + s.dy * cl;

        ctx.beginPath();
        ctx.moveTo(s.x, s.y);
        ctx.lineTo(ex, ey);
        ctx.strokeStyle = rgba(s.color, s.alpha * trailA);
        ctx.lineWidth = s.width;
        ctx.lineCap = "round";
        ctx.stroke();

        const tailLen = Math.min(GRID * 5, cl);
        if (tailLen > 1) {
          const t0x = ex - s.dx * tailLen;
          const t0y = ey - s.dy * tailLen;

          const gradient = ctx.createLinearGradient(t0x, t0y, ex, ey);
          gradient.addColorStop(0, rgba(s.color, 0));
          gradient.addColorStop(0.5, rgba(s.color, s.alpha * peakA * 0.3));
          gradient.addColorStop(0.85, rgba(s.color, s.alpha * peakA * 0.8));
          gradient.addColorStop(1, rgba(s.color, s.alpha * peakA));

          ctx.beginPath();
          ctx.moveTo(t0x, t0y);
          ctx.lineTo(ex, ey);
          ctx.strokeStyle = gradient;
          ctx.lineWidth = s.width + 5;
          ctx.globalAlpha = 0.35;
          ctx.stroke();
          ctx.globalAlpha = 1;

          ctx.beginPath();
          ctx.moveTo(t0x, t0y);
          ctx.lineTo(ex, ey);
          ctx.strokeStyle = gradient;
          ctx.lineWidth = s.width;
          ctx.stroke();

          const dotR = s.width + 5;
          const tipGradient = ctx.createRadialGradient(ex, ey, 0, ex, ey, dotR);
          tipGradient.addColorStop(0, rgba(s.color, s.alpha * peakA));
          tipGradient.addColorStop(0.5, rgba(s.color, s.alpha * peakA * 0.5));
          tipGradient.addColorStop(1, rgba(s.color, 0));
          ctx.beginPath();
          ctx.arc(ex, ey, dotR, 0, Math.PI * 2);
          ctx.fillStyle = tipGradient;
          ctx.fill();
        }

        if (s.traveled > 0 && s.traveled % GRID < s.speed + 1 && !s.fadeOut) {
          const nx = s.x + s.dx * Math.round(s.traveled / GRID) * GRID;
          const ny = s.y + s.dy * Math.round(s.traveled / GRID) * GRID;
          if (Math.random() < 0.3) {
            nodes.push({
              x: snap(nx),
              y: snap(ny),
              r: Math.random() * 3 + 2,
              alpha: 1,
              pulse: 0,
              pulseSpeed: Math.random() * 0.035 + 0.015,
              color: s.color,
            });
          }
        }

        if (s.traveled >= s.len && !s.fadeOut) {
          s.fadeOut = true;
        }
      }

      for (let i = nodes.length - 1; i >= 0; i--) {
        const n = nodes[i];
        n.alpha -= 0.004;
        n.pulse += n.pulseSpeed;
        if (n.alpha <= 0) {
          nodes.splice(i, 1);
          continue;
        }

        const pA = (Math.sin(n.pulse) * 0.5 + 0.5) * n.alpha * nodeA;
        ctx.beginPath();
        ctx.arc(n.x, n.y, n.r + 4, 0, Math.PI * 2);
        ctx.fillStyle = rgba(n.color, pA * 0.2);
        ctx.fill();
        ctx.beginPath();
        ctx.arc(n.x, n.y, n.r, 0, Math.PI * 2);
        ctx.fillStyle = rgba(n.color, pA);
        ctx.fill();
      }

      raf = requestAnimationFrame(draw);
    }

    function onVisibilityChange() {
      isPageVisible = !document.hidden;
    }

    resize();
    const density = getDensity();
    for (let i = 0; i < density.initialSegments; i++) spawn();

    window.addEventListener("resize", resize);
    document.addEventListener("visibilitychange", onVisibilityChange);
    draw();

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
      document.removeEventListener("visibilitychange", onVisibilityChange);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100vw",
        height: "100vh",
        pointerEvents: "none",
        zIndex: 0,
        opacity: 0.3,
      }}
      aria-hidden="true"
    />
  );
}
