"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";
import { useTheme } from "./ThemeProvider";

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About" },
  { href: "/resume", label: "Resume" },
  { href: "/portfolio", label: "Portfolio" },
  { href: "/services", label: "Services" },
  { href: "/contact", label: "Contact" },
];

export default function Navbar() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  useTheme(); // keep context subscription; no values needed

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      <motion.header
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: [0.4, 0, 0.2, 1] }}
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          right: 0,
          zIndex: 1000,
          padding: "0 24px",
          transition: "all 0.4s cubic-bezier(0.4, 0, 0.2, 1)",
          background: scrolled
            ? "var(--glass-bg)"
            : "transparent",
          backdropFilter: scrolled ? "blur(20px)" : "none",
          WebkitBackdropFilter: scrolled ? "blur(20px)" : "none",
          borderBottom: scrolled
            ? "1px solid var(--glass-border)"
            : "1px solid transparent",
          boxShadow: scrolled ? "var(--shadow-sm)" : "none",
        }}
        className={scrolled ? "glass-nav" : ""}
      >
        <div
          style={{
            maxWidth: 1200,
            margin: "0 auto",
            display: "grid",
            gridTemplateColumns: "1fr auto 1fr",
            alignItems: "center",
            height: 70,
          }}
        >
          {/* Left: Logo */}
          <div style={{ display: "flex", justifyContent: "flex-start" }}>
            <Link href="/" style={{ textDecoration: "none" }}>
              <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <Image
                    src="/logo.png"
                    alt="Logo"
                    width={34}
                    height={34}
                    style={{
                      objectFit: "contain",
                      filter: "drop-shadow(0 0 4px rgba(139, 92, 246, 0.5)) drop-shadow(0 0 1px rgba(255, 255, 255, 0.4))",
                      transition: "filter 0.3s ease",
                    }}
                  />
                </div>
                <span
                  className="navbar-brand-name"
                  style={{
                    fontFamily: "var(--font-josefin), sans-serif",
                    fontWeight: 700,
                    fontSize: "1.05rem",
                    background: "linear-gradient(135deg, #3b82f6, #8b5cf6)",
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                    backgroundClip: "text",
                    display: "inline-block",
                  }}
                >
                  Abdullah
                </span>
              </div>
            </Link>
          </div>

          {/* Center: Desktop Nav Links */}
          <nav
            style={{
              display: "flex",
              alignItems: "center",
              gap: 4,
              padding: "6px",
              background: scrolled ? "var(--glass-bg)" : "transparent",
              borderRadius: "50px",
              border: scrolled ? "1px solid var(--glass-border)" : "1px solid transparent",
              backdropFilter: scrolled ? "blur(10px)" : "none",
              transition: "all 0.3s ease",
            }}
            className="desktop-nav"
          >
            {navLinks.map((link) => {
              const isActive = pathname === link.href;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`nav-link${isActive ? " active" : ""}`}
                  style={{
                    padding: "8px 16px",
                    borderRadius: "50px",
                    transition: "all 0.2s",
                  }}
                  onClick={() => setMobileOpen(false)}
                >
                  {link.label}
                </Link>
              );
            })}
          </nav>

          {/* Right: CTA & Mobile Hamburger */}
          <div style={{ display: "flex", alignItems: "center", justifyContent: "flex-end", gap: 12 }}>

            <a
              href="https://wa.me/94771367326"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-whatsapp-glass"
            >
              <svg
                viewBox="0 0 24 24"
                width="16"
                height="16"
                fill="currentColor"
                style={{ flexShrink: 0 }}
              >
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
              </svg>
              Chat
            </a>

            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              style={{
                background: scrolled ? "var(--glass-bg)" : "var(--glass-bg)",
                border: "1px solid var(--glass-border)",
                borderRadius: "12px",
                cursor: "pointer",
                color: "var(--text-primary)",
                padding: "8px",
                display: "none",
                alignItems: "center",
                justifyContent: "center",
                backdropFilter: "blur(10px)",
                transition: "all 0.2s",
              }}
              className="mobile-menu-btn"
              aria-label="Toggle menu"
            >
              {mobileOpen ? <X size={22} /> : <Menu size={22} />}
            </button>
          </div>
        </div>
      </motion.header>

      {/* Mobile Overlay */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            style={{
              position: "fixed",
              top: 70,
              left: 0,
              right: 0,
              zIndex: 999,
              background: "var(--glass-bg)",
              backdropFilter: "blur(20px)",
              borderBottom: "1px solid var(--glass-border)",
              padding: "16px 24px 24px",
              display: "flex",
              flexDirection: "column",
              gap: 4,
            }}
          >
            {navLinks.map((link) => {
              const isActive = pathname === link.href;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`nav-link${isActive ? " active" : ""}`}
                  style={{ padding: "12px 8px", fontSize: "1rem" }}
                  onClick={() => setMobileOpen(false)}
                >
                  {link.label}
                </Link>
              );
            })}
          </motion.div>
        )}
      </AnimatePresence>

      <style>{`
        @media (max-width: 768px) {
          .desktop-nav { display: none !important; }
          .mobile-menu-btn { display: flex !important; }
        }
        @media (max-width: 480px) {
          .navbar-brand-name { display: none !important; }
        }
        @media (min-width: 769px) {
          .mobile-menu-btn { display: none !important; }
        }
      `}</style>
    </>
  );
}
