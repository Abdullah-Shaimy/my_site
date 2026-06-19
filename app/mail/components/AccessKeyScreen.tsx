"use client";

import React, { useState } from "react";
import { KeyRound, ShieldAlert, Loader2, Lock } from "lucide-react";
import { verifyAccessKeyAction } from "../../lib/mailActions";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";

export default function AccessKeyScreen() {
  const [key, setKey] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!key.trim() || loading) return;

    setLoading(true);
    setError(null);

    try {
      const res = await verifyAccessKeyAction(key);
      if (res.success) {
        // Trigger server components to re-run and detect the cookies
        router.refresh();
      } else {
        setError(res.error || "Authentication failed");
      }
    } catch (err) {
      setError("An unexpected error occurred. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ minHeight: "100vh", paddingTop: 70, display: "flex", alignItems: "center", justifyContent: "center", position: "relative" }}>
      {/* Dynamic Background Glows */}
      <div
        style={{
          position: "absolute",
          top: "25%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: 288,
          height: 288,
          borderRadius: "50%",
          background: "radial-gradient(circle, rgba(139, 92, 246, 0.12) 0%, transparent 70%)",
          filter: "blur(40px)",
          pointerEvents: "none",
        }}
      />
      <div
        style={{
          position: "absolute",
          bottom: "25%",
          left: "33%",
          width: 320,
          height: 320,
          borderRadius: "50%",
          background: "radial-gradient(circle, rgba(6, 182, 212, 0.1) 0%, transparent 70%)",
          filter: "blur(40px)",
          pointerEvents: "none",
        }}
      />

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="w-full max-w-md"
        style={{ padding: "0 24px", zIndex: 10 }}
      >
        <div className="glass-panel text-center" style={{ padding: "40px 36px" }}>
          {/* Glowing Lock Icon */}
          <div 
            style={{ 
              position: "relative", 
              margin: "0 auto", 
              width: 64, 
              height: 64, 
              marginBottom: 24, 
              display: "flex", 
              alignItems: "center", 
              justifyContent: "center", 
              backgroundColor: "rgba(255, 255, 255, 0.05)", 
              borderRadius: 16, 
              border: "1px solid rgba(255, 255, 255, 0.1)" 
            }}
          >
            <div className="absolute inset-0 bg-gradient-to-tr from-cyan-500/10 to-violet-500/10 rounded-2xl animate-pulse" />
            <motion.div
              animate={error ? { x: [-4, 4, -4, 4, 0] } : {}}
              transition={{ duration: 0.4 }}
              style={{ display: "flex", alignItems: "center", justifyContent: "center" }}
            >
              <Lock className="w-8 h-8 text-cyan-400 drop-shadow-[0_0_8px_rgba(6,182,212,0.5)]" />
            </motion.div>
          </div>

          <h1 
            style={{ 
              fontFamily: "var(--font-inter), sans-serif", 
              fontWeight: 800, 
              fontSize: "1.5rem", 
              color: "var(--text-primary)", 
              marginBottom: 12, 
              letterSpacing: "-0.02em" 
            }}
          >
            Secure Mail System
          </h1>
          <p style={{ color: "var(--text-secondary)", fontSize: "0.875rem", marginBottom: 28, maxWidth: 280, marginLeft: "auto", marginRight: "auto" }}>
            This workspace is private. Enter your authorization key to access the mail composer.
          </p>

          <form onSubmit={handleSubmit}>
            <div style={{ marginBottom: 20 }} className="relative">
              <input
                type="password"
                value={key}
                onChange={(e) => {
                  setKey(e.target.value);
                  if (error) setError(null);
                }}
                disabled={loading}
                placeholder="Enter access secret key"
                className="form-input pr-12 text-center tracking-widest text-lg font-mono focus:tracking-normal placeholder:font-sans placeholder:tracking-normal placeholder:text-sm"
                required
              />
              <div 
                style={{ 
                  position: "absolute", 
                  right: 16, 
                  top: "50%", 
                  transform: "translateY(-50%)", 
                  color: "var(--text-muted)",
                  display: "flex",
                  alignItems: "center"
                }}
              >
                <KeyRound className="w-5 h-5" />
              </div>
            </div>

            <AnimatePresence mode="wait">
              {error && (
                <motion.div
                  initial={{ opacity: 0, y: -8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -8 }}
                  style={{ marginBottom: 20 }}
                  className="flex items-center gap-2 text-rose-400 text-sm bg-rose-500/10 border border-rose-500/20 p-3 rounded-lg text-left"
                >
                  <ShieldAlert className="w-4 h-4 shrink-0" />
                  <span>{error}</span>
                </motion.div>
              )}
            </AnimatePresence>

            <button
              type="submit"
              disabled={loading || !key.trim()}
              className="btn-primary w-full justify-center disabled:opacity-50 disabled:cursor-not-allowed group transition-all"
            >
              {loading ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  <span>Authenticating...</span>
                </>
              ) : (
                <>
                  <span>Verify Authorization</span>
                </>
              )}
            </button>
          </form>
        </div>
      </motion.div>
    </div>
  );
}
