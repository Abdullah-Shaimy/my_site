"use client";

import { useEffect, useState, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { motion } from "framer-motion";
import { CheckCircle2, Home, CreditCard, ShieldCheck, Mail, ArrowRight, Loader2 } from "lucide-react";
import Navbar from "../../components/Navbar";

function PaymentSuccessContent() {
  const searchParams = useSearchParams();
  const orderId = searchParams.get("order_id") || "ORD-SUCCESS";

  const [paymentInfo, setPaymentInfo] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchStatus() {
      if (!orderId) {
        setLoading(false);
        return;
      }
      try {
        const res = await fetch(`/api/payhere/status?order_id=${encodeURIComponent(orderId)}`);
        if (res.ok) {
          const data = await res.json();
          setPaymentInfo(data);
        }
      } catch (err) {
        console.error("Failed to fetch payment details:", err);
      } finally {
        setLoading(false);
      }
    }
    fetchStatus();
  }, [orderId]);

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

      {/* Decorative Glow */}
      <div
        style={{
          position: "absolute",
          top: "15%",
          left: "50%",
          transform: "translateX(-50%)",
          width: "500px",
          height: "500px",
          background: "radial-gradient(circle, rgba(16, 185, 129, 0.18) 0%, transparent 70%)",
          filter: "blur(90px)",
          pointerEvents: "none",
        }}
      />

      <div
        style={{
          maxWidth: "680px",
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
            border: "1px solid rgba(16, 185, 129, 0.3)",
            borderRadius: "28px",
            padding: "48px 36px",
            backdropFilter: "blur(20px)",
            textAlign: "center",
            boxShadow: "0 25px 60px rgba(0, 0, 0, 0.4)",
          }}
        >
          {/* Success Animated Badge */}
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: "spring", stiffness: 260, damping: 20, delay: 0.1 }}
            style={{
              width: "80px",
              height: "80px",
              borderRadius: "50%",
              background: "linear-gradient(135deg, rgba(16, 185, 129, 0.2), rgba(5, 150, 105, 0.4))",
              border: "2px solid #10b981",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              margin: "0 auto 24px",
              boxShadow: "0 0 30px rgba(16, 185, 129, 0.4)",
            }}
          >
            <CheckCircle2 size={46} color="#10b981" />
          </motion.div>

          <h1 style={{ fontSize: "2rem", fontWeight: 800, marginBottom: "12px", color: "#fff" }}>
            Payment Successful!
          </h1>

          <p style={{ fontSize: "1rem", color: "#94a3b8", maxWidth: "460px", margin: "0 auto 32px", lineHeight: 1.6 }}>
            Thank you for your payment. Your transaction has been processed successfully through PayHere.
          </p>

          {/* Payment Details Box */}
          <div
            style={{
              background: "rgba(15, 23, 42, 0.6)",
              border: "1px solid rgba(255, 255, 255, 0.08)",
              borderRadius: "18px",
              padding: "24px",
              textAlign: "left",
              marginBottom: "32px",
            }}
          >
            <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "12px", fontSize: "0.9rem" }}>
              <span style={{ color: "#94a3b8" }}>Order ID Reference</span>
              <span style={{ fontFamily: "monospace", color: "#a78bfa", fontWeight: 600 }}>{orderId}</span>
            </div>

            {loading ? (
              <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: "8px", color: "#94a3b8", padding: "12px 0" }}>
                <Loader2 size={16} className="animate-spin" /> Fetching details...
              </div>
            ) : paymentInfo ? (
              <>
                {paymentInfo.full_name && (
                  <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "12px", fontSize: "0.9rem" }}>
                    <span style={{ color: "#94a3b8" }}>Payer Name</span>
                    <span style={{ color: "#fff", fontWeight: 500 }}>{paymentInfo.full_name}</span>
                  </div>
                )}
                {paymentInfo.email && (
                  <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "12px", fontSize: "0.9rem" }}>
                    <span style={{ color: "#94a3b8" }}>Email</span>
                    <span style={{ color: "#fff", fontWeight: 500 }}>{paymentInfo.email}</span>
                  </div>
                )}
                {paymentInfo.amount && (
                  <div style={{ display: "flex", justifyContent: "space-between", paddingTop: "12px", borderTop: "1px solid rgba(255, 255, 255, 0.08)", fontSize: "1rem" }}>
                    <span style={{ color: "#cbd5e1", fontWeight: 600 }}>Amount Paid</span>
                    <span style={{ color: "#10b981", fontWeight: 700 }}>
                      {paymentInfo.currency || "LKR"} {parseFloat(paymentInfo.amount).toLocaleString("en-US", { minimumFractionDigits: 2 })}
                    </span>
                  </div>
                )}
              </>
            ) : null}

            <div style={{ display: "flex", alignItems: "center", gap: "8px", marginTop: "16px", paddingTop: "16px", borderTop: "1px solid rgba(255, 255, 255, 0.08)", fontSize: "0.82rem", color: "#64748b" }}>
              <ShieldCheck size={16} color="#10b981" />
              <span>A confirmation email has been logged for this transaction.</span>
            </div>
          </div>

          {/* Actions */}
          <div style={{ display: "flex", gap: "14px", justifyContent: "center", flexWrap: "wrap" }}>
            <Link
              href="/"
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
              <Home size={18} /> Return to Home
            </Link>

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
              <CreditCard size={18} /> Make Another Payment <ArrowRight size={16} />
            </Link>
          </div>
        </motion.div>
      </div>
    </div>
  );
}

export default function PaymentSuccessPage() {
  return (
    <Suspense fallback={
      <div style={{ minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center", background: "#090d16", color: "#fff" }}>
        <Loader2 className="animate-spin" size={32} />
      </div>
    }>
      <PaymentSuccessContent />
    </Suspense>
  );
}
