"use client";

import Link from "next/link";
import Image from "next/image";
import { Heart, Zap } from "lucide-react";

const footerLinks = [
  { href: "/about", label: "About" },
  { href: "/services", label: "Services" },
  { href: "/resume", label: "Resume" },
  { href: "/contact", label: "Contact" },
];

const socialLinks = [
  { href: "https://www.linkedin.com/in/abdullahshaimy/", icon: "/icons/linkedin.png", label: "LinkedIn" },
  { href: "https://www.instagram.com/shaimy_twenty4/", icon: "/icons/instagram.png", label: "Instagram" },
  { href: "https://www.behance.net/abdullahshaimy/", icon: "/icons/behance.png", label: "Behance" },
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
                  background: "linear-gradient(135deg, #00d2ff, #8b5cf6)",
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
                  background: "linear-gradient(135deg, #00d2ff, #8b5cf6)",
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
                  className="social-link-container"
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
                  <Image
                    src={Icon}
                    alt={label}
                    width={18}
                    height={18}
                    className="social-icon-img"
                  />
                </a>
              ))}
            </div>
          </div>

          {/* Certification Badge */}
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
              Certification
            </p>
            <a
              href="https://verify.openedg.org/?id=ioef.b3bP.jYSm"
              target="_blank"
              rel="noopener noreferrer"
              title="PCEP – Certified Entry-Level Python Programmer"
              style={{
                display: "inline-block",
                transition: "transform 0.3s cubic-bezier(0.4, 0, 0.2, 1), filter 0.3s ease",
                borderRadius: 12,
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = "translateY(-4px) scale(1.05)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = "none";
              }}
            >
              <Image
                src="/pcep-badge.png"
                alt="PCEP Certified Entry-Level Python Programmer Badge"
                width={100}
                height={100}
                style={{
                  objectFit: "contain",
                  filter: "drop-shadow(0 6px 16px rgba(139, 92, 246, 0.3))",
                }}
              />
            </a>
          </div>
        </div>

        {/* Divider */}
        <div
          style={{
            height: 1,
            background:
              "linear-gradient(90deg, transparent, rgba(139, 92, 246,0.2), transparent)",
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
            gap: 16,
          }}
        >
          <p
            style={{
              fontSize: "0.85rem",
              color: "var(--text-muted)",
              margin: 0,
            }}
          >
            © {new Date().getFullYear()} Abdullah Shaimy | Founder of NanoVext | All rights reserved.
          </p>
          <div style={{ display: "flex", gap: 16, fontSize: "0.8rem", color: "var(--text-muted)" }}>
            <Link 
              href="/privacy-policy" 
              style={{ color: "var(--text-muted)", textDecoration: "none", transition: "color 0.2s" }}
              onMouseEnter={(e) => e.currentTarget.style.color = "var(--text-primary)"}
              onMouseLeave={(e) => e.currentTarget.style.color = "var(--text-muted)"}
            >
              Privacy Policy
            </Link>
            <span>•</span>
            <Link 
              href="/terms-conditions" 
              style={{ color: "var(--text-muted)", textDecoration: "none", transition: "color 0.2s" }}
              onMouseEnter={(e) => e.currentTarget.style.color = "var(--text-primary)"}
              onMouseLeave={(e) => e.currentTarget.style.color = "var(--text-muted)"}
            >
              Terms & Conditions
            </Link>
            <span>•</span>
            <Link 
              href="/refund-policy" 
              style={{ color: "var(--text-muted)", textDecoration: "none", transition: "color 0.2s" }}
              onMouseEnter={(e) => e.currentTarget.style.color = "var(--text-primary)"}
              onMouseLeave={(e) => e.currentTarget.style.color = "var(--text-muted)"}
            >
              Refund Policy
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
