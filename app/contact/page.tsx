"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { Mail, MapPin, Clock, Send, CheckCircle, AlertCircle } from "lucide-react";
import ScrollReveal from "../components/ScrollReveal";
import { supabase } from "../lib/supabase";

interface FormData {
  name: string;
  email: string;
  subject: string;
  message: string;
}

interface FormErrors {
  name?: string;
  email?: string;
  subject?: string;
  message?: string;
}

export default function ContactPage() {
  const [form, setForm] = useState<FormData>({ name: "", email: "", subject: "", message: "" });
  const [errors, setErrors] = useState<FormErrors>({});
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");

  const validate = (): boolean => {
    const errs: FormErrors = {};
    if (!form.name.trim() || form.name.trim().length < 2) errs.name = "Name must be at least 2 characters.";
    if (!form.email.trim() || !/\S+@\S+\.\S+/.test(form.email)) errs.email = "Please enter a valid email address.";
    if (!form.subject.trim() || form.subject.trim().length < 3) errs.subject = "Subject must be at least 3 characters.";
    
    const wordCount = form.message.trim().split(/\s+/).filter(Boolean).length;
    if (!form.message.trim() || wordCount < 10) errs.message = "Message must be at least 10 words.";
    
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;
    setStatus("loading");

    try {
      const { error } = await supabase.from("contacts").insert([
        {
          name: form.name,
          email: form.email,
          subject: form.subject,
          message: form.message,
        },
      ]);

      if (error) throw error;
      setStatus("success");
    } catch (err) {
      console.error("Error submitting form:", err);
      setStatus("error");
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    if (errors[name as keyof FormErrors]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }));
    }
  };

  return (
    <div style={{ minHeight: "100vh", paddingTop: 70 }}>
      {/* Header */}
      <section
        style={{
          padding: "64px 24px 56px",
          textAlign: "center",
          position: "relative",
          overflow: "hidden",
        }}
      >
        <div
          style={{
            position: "absolute",
            top: -60,
            right: -60,
            width: 280,
            height: 280,
            borderRadius: "50%",
            background: "radial-gradient(circle, rgba(236,72,153,0.08) 0%, transparent 70%)",
          }}
        />
        <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
          <span className="section-badge">✦ Contact</span>
          <h1
            style={{
              fontFamily: "var(--font-josefin), sans-serif",
              fontWeight: 800,
              fontSize: "clamp(2rem, 5vw, 3rem)",
              color: "var(--text-primary)",
              marginBottom: 12,
            }}
          >
            Let&apos;s Work Together
          </h1>
          <p style={{ color: "var(--text-secondary)", fontSize: "1rem", maxWidth: 480, margin: "0 auto" }}>
            Have a project in mind? I&apos;d love to hear about it. Send me a message and let&apos;s create something amazing.
          </p>
        </motion.div>
      </section>

      {/* Main Content */}
      <section className="section-padding">
        <div className="container-custom">
          <div
            style={{ display: "grid", gridTemplateColumns: "1fr 1.6fr", gap: 48 }}
            className="contact-grid"
          >
            {/* Contact Info */}
            <div>
              <ScrollReveal>
                <h2
                  style={{
                    fontFamily: "var(--font-josefin), sans-serif",
                    fontWeight: 700,
                    fontSize: "1.4rem",
                    color: "var(--text-primary)",
                    marginBottom: 24,
                  }}
                >
                  Contact Information
                </h2>
              </ScrollReveal>

              {[
                { icon: Mail, label: "Email", value: "abdullahshaimyofficial@gmail.com", color: "#3b82f6" },
                { icon: MapPin, label: "Location", value: "Sri Lanka 🇱🇰 • Available Worldwide", color: "#8b5cf6" },
                { icon: Clock, label: "Response Time", value: "Within 24 hours", color: "#ec4899" },
              ].map(({ icon: Icon, label, value, color }, i) => (
                <ScrollReveal key={label} delay={i * 0.1}>
                  <div
                    className="glass-card"
                    style={{
                      padding: "18px 20px",
                      display: "flex",
                      alignItems: "center",
                      gap: 16,
                      marginBottom: 16,
                    }}
                  >
                    <div
                      style={{
                        width: 44,
                        height: 44,
                        borderRadius: 12,
                        background: `${color}15`,
                        border: `1px solid ${color}25`,
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        flexShrink: 0,
                      }}
                    >
                      <Icon size={18} color={color} />
                    </div>
                    <div>
                      <p style={{ fontSize: "0.75rem", color: "var(--text-muted)", marginBottom: 2 }}>{label}</p>
                      <p style={{ fontSize: "0.9rem", fontWeight: 600, color: "var(--text-primary)" }}>{value}</p>
                    </div>
                  </div>
                </ScrollReveal>
              ))}

              <ScrollReveal delay={0.3}>
                <div style={{ marginTop: 28 }}>
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
                    Follow Me
                  </p>
                  <div style={{ display: "flex", gap: 10 }}>
                    {[
                      { href: "https://www.linkedin.com/in/abdullahshaimy/", icon: "/icons/linkedin.png", label: "LinkedIn" },
                      { href: "https://www.behance.net/abdullahshaimy/", icon: "/icons/behance.png", label: "Behance" },
                    ].map(({ href, icon: Icon, label }) => (
                      <a
                        key={label}
                        href={href}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label={label}
                        style={{
                          width: 42,
                          height: 42,
                          borderRadius: 12,
                          background: "var(--glass-bg)",
                          border: "1px solid var(--glass-border)",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          color: "var(--text-secondary)",
                          transition: "all 0.2s",
                          textDecoration: "none",
                        }}
                        onMouseEnter={(e) => {
                          e.currentTarget.style.background = "linear-gradient(135deg, #3b82f6, #8b5cf6)";
                          e.currentTarget.style.color = "white";
                          e.currentTarget.style.borderColor = "transparent";
                          e.currentTarget.style.transform = "translateY(-2px)";
                        }}
                        onMouseLeave={(e) => {
                          e.currentTarget.style.background = "var(--glass-bg)";
                          e.currentTarget.style.color = "var(--text-secondary)";
                          e.currentTarget.style.borderColor = "var(--glass-border)";
                          e.currentTarget.style.transform = "none";
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
              </ScrollReveal>
            </div>

            {/* Form */}
            <ScrollReveal delay={0.1}>
              <div className="glass-card" style={{ padding: "36px 32px" }}>
                <AnimatePresence mode="wait">
                      {status === "success" ? (
                        <motion.div
                          key="success"
                          initial={{ opacity: 0, scale: 0.9 }}
                          animate={{ opacity: 1, scale: 1 }}
                          style={{
                            display: "flex",
                            flexDirection: "column",
                            alignItems: "center",
                            justifyContent: "center",
                            textAlign: "center",
                            padding: "40px 0",
                          }}
                        >
                          <motion.div
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
                            style={{
                              width: 80,
                              height: 80,
                              borderRadius: "50%",
                              background: "linear-gradient(135deg, #22c55e, #16a34a)",
                              display: "flex",
                              alignItems: "center",
                              justifyContent: "center",
                              marginBottom: 20,
                              boxShadow: "0 12px 32px rgba(34,197,94,0.35)",
                            }}
                          >
                            <CheckCircle size={36} color="white" strokeWidth={2.5} />
                          </motion.div>
                          <h3
                            style={{
                              fontFamily: "var(--font-josefin), sans-serif",
                              fontWeight: 700,
                              fontSize: "1.4rem",
                              color: "var(--text-primary)",
                              marginBottom: 8,
                            }}
                          >
                            Message Sent! 🎉
                          </h3>
                          <p style={{ color: "var(--text-secondary)", fontSize: "0.95rem", maxWidth: 380 }}>
                            Thank you for reaching out! I&apos;ll get back to you within 24 hours.
                          </p>
                        </motion.div>
                      ) : status === "error" ? (
                        <motion.div
                          key="error"
                          initial={{ opacity: 0, scale: 0.9 }}
                          animate={{ opacity: 1, scale: 1 }}
                          style={{
                            display: "flex",
                            flexDirection: "column",
                            alignItems: "center",
                            justifyContent: "center",
                            textAlign: "center",
                            padding: "40px 0",
                          }}
                        >
                          <motion.div
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
                            style={{
                              width: 80,
                              height: 80,
                              borderRadius: "50%",
                              background: "linear-gradient(135deg, #ef4444, #dc2626)",
                              display: "flex",
                              alignItems: "center",
                              justifyContent: "center",
                              marginBottom: 20,
                              boxShadow: "0 12px 32px rgba(239,68,68,0.35)",
                            }}
                          >
                            <AlertCircle size={36} color="white" strokeWidth={2.5} />
                          </motion.div>
                          <h3
                            style={{
                              fontFamily: "var(--font-josefin), sans-serif",
                              fontWeight: 700,
                              fontSize: "1.4rem",
                              color: "var(--text-primary)",
                              marginBottom: 8,
                            }}
                          >
                            Oops! Something went wrong.
                          </h3>
                          <p style={{ color: "var(--text-secondary)", fontSize: "0.95rem", maxWidth: 380, marginBottom: 24 }}>
                            Failed to send your message. Please try again or email me directly at abdullahshaimyofficial@gmail.com.
                          </p>
                          <button
                            onClick={() => setStatus("idle")}
                            className="btn-secondary"
                            style={{ padding: "10px 24px" }}
                          >
                            Try Again
                          </button>
                        </motion.div>
                      ) : (
                    <motion.form key="form" onSubmit={handleSubmit} noValidate>
                      <h2
                        style={{
                          fontFamily: "var(--font-josefin), sans-serif",
                          fontWeight: 700,
                          fontSize: "1.3rem",
                          color: "var(--text-primary)",
                          marginBottom: 24,
                        }}
                      >
                        Send a Message
                      </h2>

                      <div
                        style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16, marginBottom: 16 }}
                        className="form-row"
                      >
                        {/* Name */}
                        <div>
                          <label htmlFor="contact-name" style={{ display: "block", fontSize: "0.85rem", fontWeight: 600, color: "var(--text-secondary)", marginBottom: 6 }}>
                            Your Name *
                          </label>
                          <input
                            type="text"
                            name="name"
                            id="contact-name"
                            value={form.name}
                            onChange={handleChange}
                            placeholder="John Doe"
                            className="form-input"
                            style={{ borderColor: errors.name ? "#ef4444" : undefined }}
                          />
                          {errors.name && (
                            <p style={{ color: "#ef4444", fontSize: "0.75rem", marginTop: 4, display: "flex", alignItems: "center", gap: 4 }}>
                              <AlertCircle size={11} /> {errors.name}
                            </p>
                          )}
                        </div>

                        {/* Email */}
                        <div>
                          <label htmlFor="contact-email" style={{ display: "block", fontSize: "0.85rem", fontWeight: 600, color: "var(--text-secondary)", marginBottom: 6 }}>
                            Email Address *
                          </label>
                          <input
                            type="email"
                            name="email"
                            id="contact-email"
                            value={form.email}
                            onChange={handleChange}
                            placeholder="john@example.com"
                            className="form-input"
                            style={{ borderColor: errors.email ? "#ef4444" : undefined }}
                          />
                          {errors.email && (
                            <p style={{ color: "#ef4444", fontSize: "0.75rem", marginTop: 4, display: "flex", alignItems: "center", gap: 4 }}>
                              <AlertCircle size={11} /> {errors.email}
                            </p>
                          )}
                        </div>
                      </div>

                      {/* Subject */}
                      <div style={{ marginBottom: 16 }}>
                        <label htmlFor="contact-subject" style={{ display: "block", fontSize: "0.85rem", fontWeight: 600, color: "var(--text-secondary)", marginBottom: 6 }}>
                          Subject *
                        </label>
                        <input
                          type="text"
                          name="subject"
                          id="contact-subject"
                          value={form.subject}
                          onChange={handleChange}
                          placeholder="I need a website..."
                          className="form-input"
                          style={{ borderColor: errors.subject ? "#ef4444" : undefined }}
                        />
                        {errors.subject && (
                          <p style={{ color: "#ef4444", fontSize: "0.75rem", marginTop: 4, display: "flex", alignItems: "center", gap: 4 }}>
                            <AlertCircle size={11} /> {errors.subject}
                          </p>
                        )}
                      </div>

                      {/* Message */}
                      <div style={{ marginBottom: 24 }}>
                        <label htmlFor="contact-message" style={{ display: "block", fontSize: "0.85rem", fontWeight: 600, color: "var(--text-secondary)", marginBottom: 6 }}>
                          Message *
                        </label>
                        <textarea
                          name="message"
                          id="contact-message"
                          value={form.message}
                          onChange={handleChange}
                          placeholder="Tell me about your project — what are you looking to build?"
                          rows={5}
                          className="form-input"
                          style={{
                            resize: "vertical",
                            minHeight: 120,
                            borderColor: errors.message ? "#ef4444" : undefined,
                          }}
                        />
                        {errors.message && (
                          <p style={{ color: "#ef4444", fontSize: "0.75rem", marginTop: 4, display: "flex", alignItems: "center", gap: 4 }}>
                            <AlertCircle size={11} /> {errors.message}
                          </p>
                        )}
                      </div>

                      <button
                        type="submit"
                        disabled={status === "loading"}
                        className="btn-primary"
                        style={{ width: "100%", justifyContent: "center", opacity: status === "loading" ? 0.75 : 1 }}
                      >
                        {status === "loading" ? (
                          <>
                            <motion.div
                              animate={{ rotate: 360 }}
                              transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                              style={{
                                width: 16,
                                height: 16,
                                border: "2px solid white",
                                borderTopColor: "transparent",
                                borderRadius: "50%",
                              }}
                            />
                            Sending...
                          </>
                        ) : (
                          <>
                            <Send size={16} /> Send Message
                          </>
                        )}
                      </button>
                    </motion.form>
                  )}
                </AnimatePresence>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      <style>{`
        @media (max-width: 768px) {
          .contact-grid { grid-template-columns: 1fr !important; }
          .form-row { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </div>
  );
}
