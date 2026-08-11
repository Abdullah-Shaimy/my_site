"use client";

import { Suspense } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { motion } from "framer-motion";
import { XCircle, RefreshCw, MessageSquare, Home, ArrowLeft, Loader2 } from "lucide-react";
import Navbar from "../../components/Navbar";

function PaymentCancelContent() {
  const searchParams = useSearchParams();
  const orderId = searchParams.get("order_id") || "ORD-CANCELLED";

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "var(--bg-primary, #090d16)",
        color: "var(--text-primary, #f8fafc)",
        position: "relative",
        overflowX: "hidden",
      }}
    >
      <Navbar />

      {/* Decorative Red/Amber Glow */}
      <div
        style={{
          position: "absolute",
          top: "15%",
          left: "50%",
          transform: "translateX(-50%)",
          width: "500px",
          height: "500px",
          background: "radial-gradient(circle, rgba(239, 68, 68, 0.15) 0%, transparent 70%)",
          filter: "blur(90px)",
          pointerEvents: "none",
        }}
      />

      <div
        style={{
          maxWidth: "640px",
          margin: "0 auto",
          padding: "140px 24px 80px",
          position: "relative",
          zIndex: 1,
        }}
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          style={{
            background: "var(--glass-bg, rgba(15, 23, 42, 0.8))",
            border: "1px solid rgba(239, 68, 68, 0.3)",
            borderRadius: "28px",
            padding: "48px 36px",
            backdropFilter: "blur(20px)",
            textAlign: "center",
            boxShadow: "0 25px 60px rgba(0, 0, 0, 0.4)",
          }}
        >
          {/* Cancel Icon */}
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: "spring", stiffness: 260, damping: 20, delay: 0.1 }}
            style={{
              width: "80px",
              height: "80px",
              borderRadius: "50%",
              background: "linear-gradient(135deg, rgba(239, 68, 68, 0.2), rgba(185, 28, 28, 0.4))",
              border: "2px solid #ef4444",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              margin: "0 auto 24px",
              boxShadow: "0 0 30px rgba(239, 68, 68, 0.3)",
            }}
          >
            <XCircle size={46} color="#ef4444" />
          </motion.div>

          <h1 style={{ fontSize: "2rem", fontWeight: 800, marginBottom: "12px", color: "#fff" }}>
            Payment Cancelled
          </h1>

          <p style={{ fontSize: "1rem", color: "#94a3b8", maxWidth: "460px", margin: "0 auto 32px", lineHeight: 1.6 }}>
            Your transaction was cancelled or could not be completed. No funds were debited from your account.
          </p>

          <div
            style={{
              background: "rgba(15, 23, 42, 0.6)",
              border: "1px solid rgba(255, 255, 255, 0.08)",
              borderRadius: "16px",
              padding: "18px 24px",
              marginBottom: "32px",
              fontSize: "0.9rem",
              color: "#cbd5e1",
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <span style={{ color: "#94a3b8" }}>Reference Order ID</span>
            <span style={{ fontFamily: "monospace", color: "#f87171", fontWeight: 600 }}>{orderId}</span>
          </div>

          {/* Action buttons */}
          <div style={{ display: "flex", gap: "14px", justifyContent: "center", flexWrap: "wrap" }}>
            <Link
              href="/payment"
              style={{
                padding: "12px 24px",
                borderRadius: "12px",
                background: "linear-gradient(135deg, #00d2ff, #8b5cf6)",
                border: "none",
                color: "#fff",
                fontSize: "0.95rem",
                fontWeight: 600,
                textDecoration: "none",
                display: "inline-flex",
                alignItems: "center",
                gap: "8px",
                transition: "all 0.2s",
              }}
            >
              <RefreshCw size={18} /> Retry Payment
            </Link>

            <a
              href="https://wa.me/94771367326"
              target="_blank"
              rel="noopener noreferrer"
              style={{
                padding: "12px 24px",
                borderRadius: "12px",
                background: "rgba(255, 255, 255, 0.08)",
                border: "1px solid rgba(255, 255, 255, 0.15)",
                color: "#fff",
                fontSize: "0.95rem",
                fontWeight: 600,
                textDecoration: "none",
                display: "inline-flex",
                alignItems: "center",
                gap: "8px",
                transition: "all 0.2s",
              }}
            >
              <MessageSquare size={18} color="#25D366" /> Contact Support
            </a>
          </div>
        </motion.div>
      </div>
    </div>
  );
}

export default function PaymentCancelPage() {
  return (
    <Suspense fallback={
      <div style={{ minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center", background: "#090d16", color: "#fff" }}>
        <Loader2 className="animate-spin" size={32} />
      </div>
    }>
      <PaymentCancelContent />
    </Suspense>
  );
}
