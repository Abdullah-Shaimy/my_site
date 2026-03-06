"use client";

import Link from "next/link";
import { Github, Linkedin, Instagram, Heart, Zap } from "lucide-react";

const footerLinks = [
  { href: "/about", label: "About" },
  { href: "/portfolio", label: "Portfolio" },
  { href: "/services", label: "Services" },
  { href: "/resume", label: "Resume" },
  { href: "/contact", label: "Contact" },
];

const socialLinks = [
  { href: "#", icon: Linkedin, label: "LinkedIn" },
  { href: "#", icon: Instagram, label: "Instagram" },
  { href: "#", icon: Github, label: "GitHub" },
];

export default function Footer() {
  return (
    <footer
      style={{
        background: "var(--glass-bg)",
        backdropFilter: "blur(var(--glass-blur))",
        WebkitBackdropFilter: "blur(var(--glass-blur))",
        borderTop: "1px solid var(--glass-border)",
        padding: "60px 24px 32px",
      }}
    >
      <div style={{ maxWidth: 1200, margin: "0 auto" }}>
        {/* Top Row */}
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "flex-start",
            flexWrap: "wrap",
            gap: 32,
            marginBottom: 40,
          }}
        >
          {/* Brand */}
          <div>
            <Link
              href="/"
              style={{
                display: "flex",
                alignItems: "center",
                gap: 8,
                textDecoration: "none",
                marginBottom: 12,
              }}
            >
              <div
                style={{
                  width: 34,
                  height: 34,
                  borderRadius: 10,
                  background: "linear-gradient(135deg, #3b82f6, #8b5cf6)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <Zap size={18} color="white" strokeWidth={2.5} />
              </div>
              <span
                style={{
                  fontFamily: "var(--font-josefin), sans-serif",
                  fontWeight: 700,
                  fontSize: "1.1rem",
                  background: "linear-gradient(135deg, #3b82f6, #8b5cf6)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  backgroundClip: "text",
                }}
              >
                Abdullah Shaimy
              </span>
            </Link>
            <p
              style={{
                color: "var(--text-muted)",
                fontSize: "0.9rem",
                maxWidth: 260,
                lineHeight: 1.6,
              }}
            >
              Crafting High-Impact Visual Identities & Digital Experiences from Sri Lanka
              🇱🇰
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <p
              style={{
                fontFamily: "var(--font-josefin), sans-serif",
                fontWeight: 600,
                fontSize: "0.85rem",
                color: "var(--text-secondary)",
                marginBottom: 12,
                textTransform: "uppercase",
                letterSpacing: "0.05em",
              }}
            >
              Quick Links
            </p>
            <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
              {footerLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  style={{
                    color: "var(--text-muted)",
                    textDecoration: "none",
                    fontSize: "0.9rem",
                    transition: "color 0.2s",
                  }}
                  onMouseEnter={(e) =>
                    (e.currentTarget.style.color = "var(--accent-purple)")
                  }
                  onMouseLeave={(e) =>
                    (e.currentTarget.style.color = "var(--text-muted)")
                  }
                >
                  {link.label}
                </Link>
              ))}
            </div>
          </div>

          {/* Social */}
          <div>
            <p
              style={{
                fontFamily: "var(--font-josefin), sans-serif",
                fontWeight: 600,
                fontSize: "0.85rem",
                color: "var(--text-secondary)",
                marginBottom: 12,
                textTransform: "uppercase",
                letterSpacing: "0.05em",
              }}
            >
              Connect
            </p>
            <div style={{ display: "flex", gap: 12 }}>
              {socialLinks.map(({ href, icon: Icon, label }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  style={{
                    width: 40,
                    height: 40,
                    borderRadius: 10,
                    background: "var(--glass-bg)",
                    border: "1px solid var(--glass-border)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    color: "var(--text-secondary)",
                    transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
                    textDecoration: "none",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.background = "var(--gradient-primary)";
                    e.currentTarget.style.color = "white";
                    e.currentTarget.style.borderColor = "transparent";
                    e.currentTarget.style.transform = "translateY(-4px)";
                    e.currentTarget.style.boxShadow = "var(--shadow-md)";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.background = "var(--glass-bg)";
                    e.currentTarget.style.color = "var(--text-secondary)";
                    e.currentTarget.style.borderColor = "var(--glass-border)";
                    e.currentTarget.style.transform = "none";
                    e.currentTarget.style.boxShadow = "none";
                  }}
                >
                  <Icon size={16} />
                </a>
              ))}
            </div>
            <p
              style={{
                marginTop: 16,
                fontSize: "0.85rem",
                color: "var(--text-muted)",
              }}
            >
              📍 Sri Lanka
            </p>
            <p style={{ fontSize: "0.85rem", color: "var(--text-muted)" }}>
              🌐 Available Worldwide
            </p>
          </div>
        </div>

        {/* Divider */}
        <div
          style={{
            height: 1,
            background:
              "linear-gradient(90deg, transparent, rgba(139,92,246,0.2), transparent)",
            marginBottom: 24,
          }}
        />

        {/* Bottom */}
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            flexWrap: "wrap",
            gap: 12,
          }}
        >
          <p
            style={{
              fontSize: "0.85rem",
              color: "var(--text-muted)",
              display: "flex",
              alignItems: "center",
              gap: 6,
            }}
          >
            © 2025 Abdullah Shaimy. Made with{" "}
            <Heart
              size={14}
              style={{ color: "#ec4899", fill: "#ec4899" }}
            />{" "}
            from Sri Lanka
          </p>
          <p style={{ fontSize: "0.85rem", color: "var(--text-muted)" }}>
            Designed & Developed by{" "}
            <span
              style={{
                background: "linear-gradient(135deg, #3b82f6, #8b5cf6)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
                fontWeight: 600,
              }}
            >
              Abdullah Shaimy
            </span>
          </p>
        </div>
      </div>
    </footer>
  );
}
