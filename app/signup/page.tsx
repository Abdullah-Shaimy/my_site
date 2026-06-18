"use client";

import { useState } from "react";
import { supabase } from "../lib/supabase";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { motion } from "framer-motion";
import { UserPlus, Mail, Lock, User, AlertCircle, ArrowRight, CheckCircle } from "lucide-react";

export default function SignupPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    setLoading(true);
    setError(null);

    const { error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: { full_name: name },
        // Will use default site URL configured in Supabase or window.location.origin
        emailRedirectTo: typeof window !== "undefined" ? `${window.location.origin}/login` : undefined,
      }
    });

    if (error) {
      setError(error.message);
      setLoading(false);
    } else {
      setSuccess(true);
      setLoading(false);
    }
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "100px 24px",
        position: "relative",
        background: "var(--bg-primary)",
      }}
    >
      {/* Background Orbs */}
      <div
        style={{
          position: "absolute",
          top: "10%",
          right: "20%",
          width: 400,
          height: 400,
          background: "radial-gradient(circle, rgba(139, 92, 246, 0.15) 0%, transparent 60%)",
          borderRadius: "50%",
          filter: "blur(40px)",
          pointerEvents: "none",
        }}
      />
      <div
        style={{
          position: "absolute",
          bottom: "10%",
          left: "15%",
          width: 450,
          height: 450,
          background: "radial-gradient(circle, rgba(0, 210, 255, 0.1) 0%, transparent 60%)",
          borderRadius: "50%",
          filter: "blur(60px)",
          pointerEvents: "none",
        }}
      />

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        style={{
          width: "100%",
          maxWidth: 460,
          background: "var(--glass-bg)",
          backdropFilter: "blur(20px)",
          border: "1px solid var(--glass-border)",
          borderRadius: 24,
          padding: "40px 32px",
          boxShadow: "0 24px 64px rgba(0, 0, 0, 0.2)",
          position: "relative",
          zIndex: 10,
        }}
      >
        <div style={{ textAlign: "center", marginBottom: 32 }}>
          <div
            style={{
              width: 56,
              height: 56,
              borderRadius: 16,
              background: "linear-gradient(135deg, #8b5cf6, #00d2ff)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              margin: "0 auto 16px",
              boxShadow: "0 8px 24px rgba(0, 210, 255, 0.3)",
            }}
          >
            <UserPlus color="white" size={28} />
          </div>
          <h1
            style={{
              fontFamily: "var(--font-josefin), sans-serif",
              fontWeight: 700,
              fontSize: "1.8rem",
              color: "var(--text-primary)",
              marginBottom: 8,
            }}
          >
            Create an Account
          </h1>
          <p style={{ color: "var(--text-secondary)", fontSize: "0.95rem" }}>
            Join to request and manage web services
          </p>
        </div>

        {success ? (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            style={{ textAlign: "center", padding: "24px 0" }}
          >
            <CheckCircle color="#10b981" size={64} style={{ margin: "0 auto 24px" }} />
            <h2 style={{ fontSize: "1.4rem", color: "var(--text-primary)", marginBottom: 12 }}>Check your email</h2>
            <p style={{ color: "var(--text-secondary)", marginBottom: 24, lineHeight: 1.6 }}>
              We&apos;ve sent a verification link to <strong>{email}</strong>. Please confirm your email address to continue.
            </p>
            <Link href="/login" className="btn-primary" style={{ width: "100%", justifyContent: "center" }}>
              Back to Login
            </Link>
          </motion.div>
        ) : (
          <>
            {error && (
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 8,
                  padding: "12px 16px",
                  background: "rgba(239, 68, 68, 0.1)",
                  border: "1px solid rgba(239, 68, 68, 0.2)",
                  borderRadius: 12,
                  color: "#ef4444",
                  fontSize: "0.85rem",
                  marginBottom: 24,
                }}
              >
                <AlertCircle size={16} style={{ flexShrink: 0 }} />
                <span>{error}</span>
              </div>
            )}

            <form onSubmit={handleSignup} style={{ display: "flex", flexDirection: "column", gap: 16 }}>
              <div>
                <label style={{ display: "block", fontSize: "0.85rem", color: "var(--text-secondary)", marginBottom: 8, fontWeight: 600 }}>
                  Full Name
                </label>
                <div style={{ position: "relative" }}>
                  <div style={{ position: "absolute", left: 14, top: "50%", transform: "translateY(-50%)", color: "var(--text-muted)" }}>
                    <User size={18} />
                  </div>
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                    placeholder="John Doe"
                    style={{
                      width: "100%",
                      padding: "12px 16px 12px 42px",
                      background: "rgba(255, 255, 255, 0.03)",
                      border: "1px solid var(--glass-border)",
                      borderRadius: 12,
                      color: "var(--text-primary)",
                      fontSize: "1rem",
                      outline: "none",
                      transition: "all 0.2s",
                    }}
                    onFocus={(e) => (e.currentTarget.style.borderColor = "#8b5cf6")}
                    onBlur={(e) => (e.currentTarget.style.borderColor = "var(--glass-border)")}
                  />
                </div>
              </div>

              <div>
                <label style={{ display: "block", fontSize: "0.85rem", color: "var(--text-secondary)", marginBottom: 8, fontWeight: 600 }}>
                  Email Address
                </label>
                <div style={{ position: "relative" }}>
                  <div style={{ position: "absolute", left: 14, top: "50%", transform: "translateY(-50%)", color: "var(--text-muted)" }}>
                    <Mail size={18} />
                  </div>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    placeholder="you@example.com"
                    style={{
                      width: "100%",
                      padding: "12px 16px 12px 42px",
                      background: "rgba(255, 255, 255, 0.03)",
                      border: "1px solid var(--glass-border)",
                      borderRadius: 12,
                      color: "var(--text-primary)",
                      fontSize: "1rem",
                      outline: "none",
                      transition: "all 0.2s",
                    }}
                    onFocus={(e) => (e.currentTarget.style.borderColor = "#8b5cf6")}
                    onBlur={(e) => (e.currentTarget.style.borderColor = "var(--glass-border)")}
                  />
                </div>
              </div>

              <div>
                <label style={{ display: "block", fontSize: "0.85rem", color: "var(--text-secondary)", marginBottom: 8, fontWeight: 600 }}>
                  Password
                </label>
                <div style={{ position: "relative" }}>
                  <div style={{ position: "absolute", left: 14, top: "50%", transform: "translateY(-50%)", color: "var(--text-muted)" }}>
                    <Lock size={18} />
                  </div>
                  <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    minLength={6}
                    placeholder="••••••••"
                    style={{
                      width: "100%",
                      padding: "12px 16px 12px 42px",
                      background: "rgba(255, 255, 255, 0.03)",
                      border: "1px solid var(--glass-border)",
                      borderRadius: 12,
                      color: "var(--text-primary)",
                      fontSize: "1rem",
                      outline: "none",
                      transition: "all 0.2s",
                    }}
                    onFocus={(e) => (e.currentTarget.style.borderColor = "#8b5cf6")}
                    onBlur={(e) => (e.currentTarget.style.borderColor = "var(--glass-border)")}
                  />
                </div>
              </div>

              <div>
                <label style={{ display: "block", fontSize: "0.85rem", color: "var(--text-secondary)", marginBottom: 8, fontWeight: 600 }}>
                  Confirm Password
                </label>
                <div style={{ position: "relative" }}>
                  <div style={{ position: "absolute", left: 14, top: "50%", transform: "translateY(-50%)", color: "var(--text-muted)" }}>
                    <Lock size={18} />
                  </div>
                  <input
                    type="password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    required
                    minLength={6}
                    placeholder="••••••••"
                    style={{
                      width: "100%",
                      padding: "12px 16px 12px 42px",
                      background: "rgba(255, 255, 255, 0.03)",
                      border: "1px solid var(--glass-border)",
                      borderRadius: 12,
                      color: "var(--text-primary)",
                      fontSize: "1rem",
                      outline: "none",
                      transition: "all 0.2s",
                    }}
                    onFocus={(e) => (e.currentTarget.style.borderColor = "#8b5cf6")}
                    onBlur={(e) => (e.currentTarget.style.borderColor = "var(--glass-border)")}
                  />
                </div>
              </div>

              <button
                type="submit"
                disabled={loading}
                style={{
                  marginTop: 12,
                  width: "100%",
                  padding: "14px",
                  background: "linear-gradient(135deg, #8b5cf6, #00d2ff)",
                  color: "white",
                  border: "none",
                  borderRadius: 12,
                  fontSize: "1rem",
                  fontWeight: 600,
                  cursor: loading ? "not-allowed" : "pointer",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: 8,
                  opacity: loading ? 0.8 : 1,
                  transition: "opacity 0.2s",
                  boxShadow: "0 8px 16px rgba(0, 210, 255, 0.3)",
                }}
              >
                {loading ? "Creating account..." : "Sign Up"}
                {!loading && <ArrowRight size={18} />}
              </button>
            </form>

            <div style={{ textAlign: "center", marginTop: 24, paddingTop: 24, borderTop: "1px solid var(--glass-border)" }}>
              <p style={{ fontSize: "0.9rem", color: "var(--text-secondary)" }}>
                Already have an account?{" "}
                <Link href="/login" style={{ color: "#8b5cf6", fontWeight: 600, textDecoration: "none" }}>
                  Log in
                </Link>
              </p>
            </div>
          </>
        )}
      </motion.div>
    </div>
  );
}
