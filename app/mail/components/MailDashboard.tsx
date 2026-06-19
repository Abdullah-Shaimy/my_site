"use client";
import React, { useState } from "react";
import {
  Send,
  Trash2,
  LogOut,
  CheckCircle2,
  XCircle,
  Mail,
  FileText,
  MessageSquare,
  Loader2,
  Sparkles
} from "lucide-react";
import { sendEmailAction, logoutAction } from "../../lib/mailActions";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";

interface Toast {
  id: string;
  type: "success" | "error";
  message: string;
}

export default function MailDashboard() {
  const [to, setTo] = useState("");
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [toasts, setToasts] = useState<Toast[]>([]);
  const router = useRouter();

  // Character limit warning/indicators
  const maxMessageLength = 5000;

  const addToast = (type: "success" | "error", msg: string) => {
    const id = Math.random().toString(36).substring(2, 9);
    setToasts((prev) => [...prev, { id, type, message: msg }]);

    // Auto-remove toast after 4 seconds
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, 4000);
  };

  const removeToast = (id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  };

  const handleSend = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!to || !subject || !message || loading) return;

    setLoading(true);

    try {
      const result = await sendEmailAction({ to, subject, message });
      if (result.success) {
        addToast("success", "Email dispatched successfully!");
        // Clear form fields
        setTo("");
        setSubject("");
        setMessage("");
      } else {
        addToast("error", result.error || "Failed to send email");
      }
    } catch {
      addToast("error", "An unexpected error occurred");
    } finally {
      setLoading(false);
    }
  };

  const handleClear = () => {
    setTo("");
    setSubject("");
    setMessage("");
    addToast("success", "Form cleared");
  };

  const handleLogout = async () => {
    try {
      const result = await logoutAction();
      if (result.success) {
        router.refresh();
      } else {
        addToast("error", "Logout failed");
      }
    } catch {
      addToast("error", "Failed to complete logout");
    }
  };

  // Quick preset handlers
  const selectPresetRecipient = (email: string) => {
    setTo(email);
    addToast("success", `Set recipient to ${email}`);
  };

  const selectPresetTemplate = (title: string, body: string) => {
    setSubject(title);
    setMessage(body);
    addToast("success", `Loaded template: "${title}"`);
  };

  return (
    <div style={{ minHeight: "100vh", paddingTop: 70, position: "relative" }}>
      {/* Ambient background glows */}
      <div
        style={{
          position: "absolute",
          top: 96,
          right: 40,
          width: 384,
          height: 384,
          borderRadius: "50%",
          background: "radial-gradient(circle, rgba(6, 182, 212, 0.08) 0%, transparent 70%)",
          filter: "blur(40px)",
          pointerEvents: "none",
        }}
      />
      <div
        style={{
          position: "absolute",
          bottom: 80,
          left: 40,
          width: 384,
          height: 384,
          borderRadius: "50%",
          background: "radial-gradient(circle, rgba(139, 92, 246, 0.08) 0%, transparent 70%)",
          filter: "blur(40px)",
          pointerEvents: "none",
        }}
      />

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
            background: "radial-gradient(circle, rgba(6, 182, 212, 0.05) 0%, transparent 70%)",
          }}
        />
        
        {/* Absolute Logout Button */}
        <button
          onClick={handleLogout}
          style={{
            position: "absolute",
            top: 24,
            zIndex: 20,
          }}
          className="btn-secondary py-2.5 px-5 text-xs font-semibold flex items-center gap-2 border-white/5 hover:border-rose-500/30 text-gray-300 hover:text-white transition-all shadow-lg hover:bg-rose-500/10 right-6 md:right-12"
          title="Secure Logout"
        >
          <LogOut className="w-4 h-4 text-rose-400" />
          <span>Logout Session</span>
        </button>

        <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
          <span className="section-badge">
            <span className="relative flex h-1.5 w-1.5 mr-1.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-cyan-500"></span>
            </span>
            System Live
          </span>
          <h1
            style={{
              fontFamily: "var(--font-inter), sans-serif",
              fontWeight: 800,
              fontSize: "clamp(2rem, 5vw, 3rem)",
              color: "var(--text-primary)",
              marginBottom: 12,
            }}
          >
            Secure Mail Gateway
          </h1>
          <p style={{ color: "var(--text-secondary)", fontSize: "1rem", maxWidth: 480, margin: "0 auto" }}>
            Private mailing system control panel for verified domains.
          </p>
        </motion.div>
      </section>

      {/* Main Content */}
      <section className="section-padding pt-0">
        <div className="container-custom">
          <div
            style={{ display: "grid", gridTemplateColumns: "1.6fr 1fr", gap: 48 }}
            className="mail-grid"
          >
            {/* Left Column: Mail Composer Form */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="glass-panel"
              style={{ padding: "36px 32px" }}
            >
              <div style={{ marginBottom: 28 }} className="border-b border-white/5 pb-4">
                <h2 className="text-xl font-bold text-white mb-1">Compose Message</h2>
                <p className="text-xs text-gray-400">Draft a secure, encrypted transit email to any destination.</p>
              </div>

              {/* Composer Form */}
              <form onSubmit={handleSend}>
                {/* Recipient Address */}
                <div style={{ marginBottom: 20 }}>
                  <label 
                    style={{ 
                      display: "flex", 
                      justifyContent: "space-between", 
                      alignItems: "center", 
                      marginBottom: 8 
                    }} 
                    className="text-gray-300 text-xs font-semibold"
                  >
                    <span className="flex items-center gap-2">
                      <Mail className="w-4 h-4 text-cyan-400" />
                      <span>To Email</span>
                    </span>
                    <span className="text-[10px] text-gray-500 font-normal">Recipient Address</span>
                  </label>
                  <input
                    type="email"
                    value={to}
                    onChange={(e) => setTo(e.target.value)}
                    disabled={loading}
                    placeholder="recipient@example.com"
                    className="form-input"
                    required
                  />
                </div>

                {/* Subject Field */}
                <div style={{ marginBottom: 20 }}>
                  <label 
                    style={{ 
                      display: "flex", 
                      justifyContent: "space-between", 
                      alignItems: "center", 
                      marginBottom: 8 
                    }} 
                    className="text-gray-300 text-xs font-semibold"
                  >
                    <span className="flex items-center gap-2">
                      <FileText className="w-4 h-4 text-cyan-400" />
                      <span>Subject</span>
                    </span>
                    <span className="text-[10px] text-gray-500 font-normal">Email Title</span>
                  </label>
                  <input
                    type="text"
                    value={subject}
                    onChange={(e) => setSubject(e.target.value)}
                    disabled={loading}
                    placeholder="Enter email subject"
                    className="form-input"
                    required
                  />
                </div>

                {/* Message Content */}
                <div style={{ marginBottom: 24 }}>
                  <label 
                    style={{ 
                      display: "flex", 
                      justifyContent: "space-between", 
                      alignItems: "center", 
                      marginBottom: 8 
                    }} 
                    className="text-gray-300 text-xs font-semibold"
                  >
                    <span className="flex items-center gap-2">
                      <MessageSquare className="w-4 h-4 text-cyan-400" />
                      <span>Message Body</span>
                    </span>
                    <span className="text-[10px] text-gray-500 font-normal font-mono">
                      {message.length} / {maxMessageLength} chars
                    </span>
                  </label>
                  <textarea
                    value={message}
                    onChange={(e) => setMessage(e.target.value.slice(0, maxMessageLength))}
                    disabled={loading}
                    placeholder="Write your secure message here..."
                    rows={7}
                    className="form-input resize-none leading-relaxed"
                    required
                  />
                </div>

                {/* Form Actions */}
                <div style={{ paddingTop: 8 }} className="flex flex-col sm:flex-row gap-4">
                  <button
                    type="submit"
                    disabled={loading || !to || !subject || !message}
                    className="btn-primary flex-1 justify-center disabled:opacity-40 disabled:cursor-not-allowed"
                  >
                    {loading ? (
                      <>
                        <Loader2 className="w-4 h-4 animate-spin" />
                        <span>Transmitting Securely...</span>
                      </>
                    ) : (
                      <>
                        <Send className="w-4 h-4" />
                        <span>Send Message</span>
                      </>
                    )}
                  </button>
                  <button
                    type="button"
                    onClick={handleClear}
                    disabled={loading}
                    className="btn-secondary justify-center"
                  >
                    <Trash2 className="w-4 h-4" />
                    <span>Clear Form</span>
                  </button>
                </div>
              </form>
            </motion.div>

            {/* Right Column: System Stats & Quick Tools */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.15 }}
              className="w-full flex flex-col gap-6"
            >

              {/* Card 3: Quick Templates & Presets */}
              <div className="glass-panel" style={{ padding: "32px 28px", position: "relative" }}>
                {/* Ambient indicator glow */}
                <div className="absolute -right-8 -bottom-8 w-24 h-24 rounded-full bg-violet-500/5 blur-xl pointer-events-none" />

                <div style={{ marginBottom: 20 }} className="flex items-center gap-3">
                  <Sparkles className="w-5 h-5 text-violet-400" />
                  <h2 className="text-lg font-bold text-white">Presets & Templates</h2>
                </div>

                <div>
                  {/* Recipient Presets */}
                  <div style={{ marginBottom: 20 }}>
                    <span style={{ display: "block", marginBottom: 8 }} className="text-[10px] text-gray-500 uppercase tracking-wider font-bold">Quick Recipients</span>
                    <div className="flex flex-wrap gap-2">
                      <button
                        type="button"
                        onClick={() => selectPresetRecipient("abdullahshaimy.dev@gmail.com")}
                        className="px-3 py-1.5 rounded-lg text-xs bg-white/[0.02] border border-white/5 hover:border-violet-500/40 hover:bg-violet-500/10 text-gray-300 hover:text-white transition-all duration-200 cursor-pointer"
                      >
                        abdullahshaimy.dev
                      </button>
                      <button
                        type="button"
                        onClick={() => selectPresetRecipient("abdullahshaimyofficial@gmail.com")}
                        className="px-3 py-1.5 rounded-lg text-xs bg-white/[0.02] border border-white/5 hover:border-violet-500/40 hover:bg-violet-500/10 text-gray-300 hover:text-white transition-all duration-200 cursor-pointer"
                      >
                        abdullahshaimyofficial
                      </button>
                    </div>
                  </div>

                  {/* Template Presets */}
                  <div style={{ marginBottom: 4 }}>
                    <span style={{ display: "block", marginBottom: 8 }} className="text-[10px] text-gray-500 uppercase tracking-wider font-bold">Draft Templates</span>
                    <div style={{ display: "grid", gridTemplateColumns: "1fr", gap: 10 }}>
                      <button
                        type="button"
                        onClick={() => selectPresetTemplate(
                          "Connection Diagnostic Test",
                          "Hi Abdullah,\n\nThis is an automated system diagnostic test to verify the secure email delivery pathway.\n\nSender: dev@abdullahshaimy.lk\nStatus: Secure / Fully Operational."
                        )}
                        className="group min-w-0 p-3 rounded-xl bg-white/[0.02] border border-white/5 hover:border-cyan-500/30 hover:bg-cyan-500/[0.02] text-left text-gray-300 hover:text-white transition-all duration-200 flex flex-col gap-1 cursor-pointer"
                      >
                        <span className="block max-w-full truncate font-bold text-cyan-300 group-hover:text-cyan-200 text-xs">Connection Diagnostic Test</span>
                        <span className="block max-w-full truncate text-[10px] text-gray-500 group-hover:text-gray-400">automated system diagnostic test to verify...</span>
                      </button>

                      <button
                        type="button"
                        onClick={() => selectPresetTemplate(
                          "Portfolio Update Notification",
                          "Hi Abdullah,\n\nYour portfolio website contact and email components have been successfully configured with production settings.\n\nAll DNS records (SPF, DKIM, DMARC) are fully aligned."
                        )}
                        className="group min-w-0 p-3 rounded-xl bg-white/[0.02] border border-white/5 hover:border-cyan-500/30 hover:bg-cyan-500/[0.02] text-left text-gray-300 hover:text-white transition-all duration-200 flex flex-col gap-1 cursor-pointer"
                      >
                        <span className="block max-w-full truncate font-bold text-cyan-300 group-hover:text-cyan-200 text-xs">Portfolio Update Notification</span>
                        <span className="block max-w-full truncate text-[10px] text-gray-500 group-hover:text-gray-400">Your portfolio website contact and email...</span>
                      </button>

                      <button
                        type="button"
                        onClick={() => selectPresetTemplate(
                          "Scheduled Server Maintenance Alert",
                          "Hi Abdullah,\n\nPlease be informed that the primary API routing and web servers will undergo scheduled maintenance to deploy OS patches.\n\nDate: Tomorrow\nDuration: 30 minutes (2:00 AM - 2:30 AM UTC)\nExpected Impact: Temporary routing latency."
                        )}
                        className="group min-w-0 p-3 rounded-xl bg-white/[0.02] border border-white/5 hover:border-cyan-500/30 hover:bg-cyan-500/[0.02] text-left text-gray-300 hover:text-white transition-all duration-200 flex flex-col gap-1 cursor-pointer"
                      >
                        <span className="block max-w-full truncate font-bold text-cyan-300 group-hover:text-cyan-200 text-xs">Server Maintenance Alert</span>
                        <span className="block max-w-full truncate text-[10px] text-gray-500 group-hover:text-gray-400">scheduled maintenance to deploy OS patches...</span>
                      </button>

                      <button
                        type="button"
                        onClick={() => selectPresetTemplate(
                          "Project Discussion Follow-up",
                          "Hi [Name],\n\nThanks for taking the time to connect today. I’ve summarized our initial ideas and drafted a roadmap proposal for your project.\n\nLet me know if this works for you, and we can schedule a quick review call to align on details.\n\nBest regards,\nAbdullah Shaimy"
                        )}
                        className="group min-w-0 p-3 rounded-xl bg-white/[0.02] border border-white/5 hover:border-cyan-500/30 hover:bg-cyan-500/[0.02] text-left text-gray-300 hover:text-white transition-all duration-200 flex flex-col gap-1 cursor-pointer"
                      >
                        <span className="block max-w-full truncate font-bold text-cyan-300 group-hover:text-cyan-200 text-xs">Project Discussion Follow-up</span>
                        <span className="block max-w-full truncate text-[10px] text-gray-500 group-hover:text-gray-400">Roadmap proposal and schedule a quick review...</span>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Glassmorphic Toast Notifications Container */}
      <div className="fixed bottom-5 right-5 z-50 flex flex-col gap-3 max-w-sm w-full px-4">
        <AnimatePresence>
          {toasts.map((toast) => (
            <motion.div
              key={toast.id}
              initial={{ opacity: 0, y: 30, scale: 0.9 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -20, scale: 0.9, transition: { duration: 0.2 } }}
              className={`flex items-start gap-3 p-4 rounded-xl border backdrop-blur-xl shadow-lg relative overflow-hidden cursor-pointer ${
                toast.type === "success"
                  ? "bg-emerald-950/40 border-emerald-500/30 text-emerald-200"
                  : "bg-rose-950/40 border-rose-500/30 text-rose-200"
              }`}
              onClick={() => removeToast(toast.id)}
            >
              {/* Internal Accent Glow */}
              <div
                className={`absolute inset-0 opacity-10 pointer-events-none ${
                  toast.type === "success" ? "bg-emerald-400" : "bg-rose-400"
                }`}
              />

              {toast.type === "success" ? (
                <CheckCircle2 className="w-5 h-5 shrink-0 text-emerald-400 drop-shadow-[0_0_4px_rgba(52,211,153,0.4)]" />
              ) : (
                <XCircle className="w-5 h-5 shrink-0 text-rose-400 drop-shadow-[0_0_4px_rgba(251,113,133,0.4)]" />
              )}

              <div className="flex-1 text-sm font-medium leading-relaxed pr-2">
                {toast.message}
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      <style>{`
        @media (max-width: 991px) {
          .mail-grid { grid-template-columns: 1fr !important; gap: 32px !important; }
        }
      `}</style>
    </div>
  );
}
