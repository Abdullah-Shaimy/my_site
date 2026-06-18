"use client";

import { useState, Suspense } from "react";
import { supabase } from "../lib/supabase";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import { motion } from "framer-motion";
import { LogIn, Mail, Lock, AlertCircle, ArrowRight } from "lucide-react";

function LoginForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  
  const router = useRouter();
  const searchParams = useSearchParams();
  const redirectTo = searchParams.get("redirect") || "/";

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      setError(error.message);
      setLoading(false);
    } else {
      router.push(redirectTo);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      style={{
        width: "100%",
        maxWidth: 420,
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
            background: "linear-gradient(135deg, #00d2ff, #8b5cf6)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            margin: "0 auto 16px",
            boxShadow: "0 8px 24px rgba(139, 92, 246, 0.3)",
          }}
        >
          <LogIn color="white" size={28} />
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
          Welcome Back
        </h1>
        <p style={{ color: "var(--text-secondary)", fontSize: "0.95rem" }}>
          Log in to manage your services
        </p>
      </div>

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

      <form onSubmit={handleLogin} style={{ display: "flex", flexDirection: "column", gap: 20 }}>
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
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 8 }}>
            <label style={{ fontSize: "0.85rem", color: "var(--text-secondary)", fontWeight: 600 }}>
              Password
            </label>
            <Link href="/forgot-password" style={{ fontSize: "0.8rem", color: "#8b5cf6", textDecoration: "none" }}>
              Forgot password?
            </Link>
          </div>
          <div style={{ position: "relative" }}>
            <div style={{ position: "absolute", left: 14, top: "50%", transform: "translateY(-50%)", color: "var(--text-muted)" }}>
              <Lock size={18} />
            </div>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
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
            marginTop: 8,
            width: "100%",
            padding: "14px",
            background: "linear-gradient(135deg, #00d2ff, #8b5cf6)",
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
            boxShadow: "0 8px 16px rgba(139, 92, 246, 0.3)",
          }}
        >
          {loading ? "Logging in..." : "Log In"}
          {!loading && <ArrowRight size={18} />}
        </button>
      </form>

      <div style={{ textAlign: "center", marginTop: 24, paddingTop: 24, borderTop: "1px solid var(--glass-border)" }}>
        <p style={{ fontSize: "0.9rem", color: "var(--text-secondary)" }}>
          Don&apos;t have an account?{" "}
          <Link href="/signup" style={{ color: "#00d2ff", fontWeight: 600, textDecoration: "none" }}>
            Sign up
          </Link>
        </p>
      </div>
    </motion.div>
  );
}

export default function LoginPage() {
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
          top: "20%",
          left: "10%",
          width: 400,
          height: 400,
          background: "radial-gradient(circle, rgba(0, 210, 255, 0.15) 0%, transparent 60%)",
          borderRadius: "50%",
          filter: "blur(40px)",
          pointerEvents: "none",
        }}
      />
      <div
        style={{
          position: "absolute",
          bottom: "10%",
          right: "10%",
          width: 500,
          height: 500,
          background: "radial-gradient(circle, rgba(139, 92, 246, 0.15) 0%, transparent 60%)",
          borderRadius: "50%",
          filter: "blur(60px)",
          pointerEvents: "none",
        }}
      />
      
      <Suspense fallback={<div style={{ color: "var(--text-primary)" }}>Loading...</div>}>
        <LoginForm />
      </Suspense>
    </div>
  );
}
