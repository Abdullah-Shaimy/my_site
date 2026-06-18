"use client";

import React, { useState } from "react";
import { Send, Trash2, LogOut, CheckCircle2, XCircle, Mail, FileText, MessageSquare, Loader2 } from "lucide-react";
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
    } catch (error) {
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
    } catch (error) {
      addToast("error", "Failed to complete logout");
    }
  };

  return (
    <div className="container-custom min-h-[90vh] py-12 px-4 relative flex flex-col justify-center items-center">
      {/* Decorative Orbs */}
      <div className="absolute top-10 right-10 w-96 h-96 rounded-full bg-radial from-cyan-500/10 to-transparent blur-3xl pointer-events-none" />
      <div className="absolute bottom-10 left-10 w-96 h-96 rounded-full bg-radial from-violet-500/10 to-transparent blur-3xl pointer-events-none" />

      {/* Main Mail Composer Dashboard */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-2xl glass-card border border-white/10 p-6 md:p-10 shadow-2xl relative overflow-visible"
      >
        {/* Header with Logout */}
        <div className="flex justify-between items-center border-b border-white/10 pb-6 mb-8">
          <div>
            <span className="section-badge mb-1">Control Center</span>
            <h1 className="text-3xl font-extrabold text-white tracking-tight">
              Mail Composer
            </h1>
          </div>
          <button
            onClick={handleLogout}
            className="btn-secondary py-2 px-4 text-xs font-semibold flex items-center gap-2 border-white/5 hover:border-violet-500/30 text-gray-300 hover:text-white"
            title="Secure Logout"
          >
            <LogOut className="w-4 h-4 text-violet-400" />
            <span className="hidden sm:inline">Logout</span>
          </button>
        </div>

        {/* Composer Form */}
        <form onSubmit={handleSend} className="space-y-6">
          {/* Recipient Address */}
          <div className="space-y-2">
            <label className="text-gray-300 text-sm font-semibold flex items-center gap-2">
              <Mail className="w-4 h-4 text-cyan-400" />
              <span>To Email</span>
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
          <div className="space-y-2">
            <label className="text-gray-300 text-sm font-semibold flex items-center gap-2">
              <FileText className="w-4 h-4 text-cyan-400" />
              <span>Subject</span>
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
          <div className="space-y-2">
            <label className="text-gray-300 text-sm font-semibold flex items-center gap-2">
              <MessageSquare className="w-4 h-4 text-cyan-400" />
              <span>Message</span>
            </label>
            <textarea
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              disabled={loading}
              placeholder="Write your secure message here..."
              rows={6}
              className="form-input resize-none py-4 leading-relaxed"
              required
            />
          </div>

          {/* Form Actions */}
          <div className="flex flex-col sm:flex-row gap-4 pt-4">
            <button
              type="submit"
              disabled={loading || !to || !subject || !message}
              className="btn-primary flex-1 justify-center disabled:opacity-50 disabled:cursor-not-allowed text-base"
            >
              {loading ? (
                <>
                  <Loader2 className="w-5 h-5 animate-spin" />
                  <span>Sending Securely...</span>
                </>
              ) : (
                <>
                  <Send className="w-5 h-5" />
                  <span>Send Email</span>
                </>
              )}
            </button>
            <button
              type="button"
              onClick={handleClear}
              disabled={loading}
              className="btn-secondary justify-center border-white/5 text-gray-300 hover:text-white"
            >
              <Trash2 className="w-5 h-5 text-gray-400" />
              <span>Clear Form</span>
            </button>
          </div>
        </form>
      </motion.div>

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
    </div>
  );
}
