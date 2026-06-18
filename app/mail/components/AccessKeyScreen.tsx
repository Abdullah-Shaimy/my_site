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
    <div className="min-h-[80vh] flex items-center justify-center px-4 relative overflow-hidden">
      {/* Dynamic Background Glows */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-72 h-72 rounded-full bg-radial from-violet-600/20 to-transparent blur-3xl pointer-events-none" />
      <div className="absolute bottom-1/4 left-1/3 w-80 h-80 rounded-full bg-radial from-cyan-600/15 to-transparent blur-3xl pointer-events-none" />

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="w-full max-w-md"
      >
        <div className="glass-card p-8 text-center border-t border-white/10">
          {/* Glowing Lock Icon */}
          <div className="relative mx-auto w-16 h-16 mb-6 flex items-center justify-center bg-white/5 rounded-2xl border border-white/10 shadow-inner">
            <div className="absolute inset-0 bg-gradient-to-tr from-cyan-500/10 to-violet-500/10 rounded-2xl animate-pulse" />
            <motion.div
              animate={error ? { x: [-4, 4, -4, 4, 0] } : {}}
              transition={{ duration: 0.4 }}
            >
              <Lock className="w-8 h-8 text-cyan-400 drop-shadow-[0_0_8px_rgba(6,182,212,0.5)]" />
            </motion.div>
          </div>

          <h1 className="text-2xl font-bold mb-2 tracking-tight text-white">
            Secure Mail System
          </h1>
          <p className="text-gray-400 text-sm mb-6 max-w-[280px] mx-auto">
            This workspace is private. Enter your authorization key to access the mail composer.
          </p>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="relative">
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
              <div className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500">
                <KeyRound className="w-5 h-5" />
              </div>
            </div>

            <AnimatePresence mode="wait">
              {error && (
                <motion.div
                  initial={{ opacity: 0, y: -8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -8 }}
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
