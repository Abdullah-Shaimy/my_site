"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import {
  ShieldCheck,
  CreditCard,
  Lock,
  ArrowRight,
  User,
  Mail,
  Phone,
  FileText,
  CheckCircle2,
  AlertCircle,
  Loader2,
  Sparkles,
  RefreshCw,
  Info,
} from "lucide-react";
import Navbar from "../components/Navbar";
import {
  POPULAR_CURRENCIES,
  OTHER_CURRENCIES,
  DEFAULT_FALLBACK_TO_LKR_RATES,
  calculatePaymentDetails,
  GATEWAY_FEE_PERCENT,
} from "../lib/currencies";

export default function PaymentPage() {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    amount: "",
    currency: "LKR",
    message: "",
  });

  const [rates, setRates] = useState<Record<string, number>>(DEFAULT_FALLBACK_TO_LKR_RATES);
  const [ratesLoading, setRatesLoading] = useState(true);
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  // Fetch live exchange rates on mount
  useEffect(() => {
    let isMounted = true;
    async function fetchRates() {
      try {
        const res = await fetch("/api/currency/rates");
        if (res.ok) {
          const data = await res.json();
          if (data.success && data.rates && isMounted) {
            setRates(data.rates);
          }
        }
      } catch (err) {
        console.warn("Using fallback exchange rates:", err);
      } finally {
        if (isMounted) setRatesLoading(false);
      }
    }
    fetchRates();
    return () => {
      isMounted = false;
    };
  }, []);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errorMessage) setErrorMessage("");
  };

  const getPhonePlaceholder = (currency: string) => {
    switch (currency) {
      case "USD":
      case "CAD":
        return "+1 555 123 4567";
      case "GBP":
        return "+44 7911 123456";
      case "EUR":
        return "+49 151 12345678";
      case "AUD":
        return "+61 412 345 678";
      case "AED":
        return "+971 50 123 4567";
      case "SAR":
        return "+966 50 123 4567";
      case "INR":
        return "+91 98765 43210";
      case "SGD":
        return "+65 9123 4567";
      case "LKR":
      default:
        return "+94 77 123 4567";
    }
  };

  // Real-time calculation of converted amounts and 3.3% transaction fee
  const calc = calculatePaymentDetails(formData.amount, formData.currency, rates);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage("");

    // Basic frontend validation
    if (!formData.fullName.trim()) {
      setErrorMessage("Please enter your full name.");
      return;
    }
    if (!formData.email.trim() || !formData.email.includes("@")) {
      setErrorMessage("Please enter a valid email address.");
      return;
    }
    if (!formData.phone.trim()) {
      setErrorMessage("Please enter your phone number.");
      return;
    }
    const parsedAmount = parseFloat(formData.amount);
    if (isNaN(parsedAmount) || parsedAmount <= 0) {
      setErrorMessage("Please enter a valid payment amount greater than 0.");
      return;
    }

    setLoading(true);

    try {
      // Send converted LKR total (with 3.3% fee) to backend PayHere checkout
      const res = await fetch("/api/payhere/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          fullName: formData.fullName,
          email: formData.email,
          phone: formData.phone,
          amount: calc.totalPayableLkr.toFixed(2),
          currency: "LKR", // Merchant payout is in LKR
          message: formData.message,
          originalAmount: calc.inputAmount,
          originalCurrency: calc.inputCurrency,
          exchangeRate: calc.rateToLkr,
          feeAmount: calc.feeInLkr.toFixed(2),
          baseLkrAmount: calc.baseInLkr.toFixed(2),
        }),
      });

      const data = await res.json();

      if (!res.ok || !data.success) {
        throw new Error(data.error || "Failed to initialize payment.");
      }

      // 2. Dynamically construct hidden HTML form & submit directly to PayHere Checkout URL
      const form = document.createElement("form");
      form.method = "POST";
      form.action = data.payhereUrl;

      const fields: Record<string, string> = {
        merchant_id: data.merchantId,
        return_url: data.returnUrl,
        cancel_url: data.cancelUrl,
        notify_url: data.notifyUrl,
        order_id: data.orderId,
        items: data.items,
        currency: data.currency,
        amount: data.amount,
        first_name: data.firstName,
        last_name: data.lastName,
        email: data.email,
        phone: data.phone,
        address: "N/A",
        city: "Colombo",
        country: "Sri Lanka",
        hash: data.hash,
        custom_1: data.custom1 || "",
      };

      Object.entries(fields).forEach(([key, val]) => {
        const input = document.createElement("input");
        input.type = "hidden";
        input.name = key;
        input.value = val;
        form.appendChild(input);
      });

      document.body.appendChild(form);
      form.submit();
    } catch (err: any) {
      setErrorMessage(err.message || "An unexpected error occurred. Please try again.");
      setLoading(false);
    }
  };

  const formattedLkrTotal = calc.totalPayableLkr.toLocaleString("en-US", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });

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

      {/* Decorative Glow Backgrounds */}
      <div
        style={{
          position: "absolute",
          top: "10%",
          left: "50%",
          transform: "translateX(-50%)",
          width: "600px",
          height: "600px",
          background:
            "radial-gradient(circle, rgba(139, 92, 246, 0.15) 0%, rgba(0, 210, 255, 0.08) 50%, transparent 70%)",
          filter: "blur(80px)",
          pointerEvents: "none",
          zIndex: 0,
        }}
      />

      <div
        style={{
          maxWidth: "1150px",
          margin: "0 auto",
          padding: "120px 24px 80px",
          position: "relative",
          zIndex: 1,
        }}
      >
        {/* Header Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          style={{ textAlign: "center", marginBottom: "48px" }}
        >
          <div
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "8px",
              padding: "6px 16px",
              borderRadius: "50px",
              background: "rgba(139, 92, 246, 0.12)",
              border: "1px solid rgba(139, 92, 246, 0.25)",
              color: "#a78bfa",
              fontSize: "0.85rem",
              fontWeight: 600,
              marginBottom: "16px",
            }}
          >
            <Sparkles size={16} />
            Direct Global Portfolio Payment Gateway
          </div>

          <h1
            style={{
              fontSize: "clamp(2.2rem, 4vw, 3.2rem)",
              fontWeight: 800,
              letterSpacing: "-0.02em",
              marginBottom: "12px",
              lineHeight: 1.2,
            }}
          >
            Secure Payment Portal
          </h1>
          <p
            style={{
              fontSize: "1.05rem",
              color: "var(--text-secondary, #94a3b8)",
              maxWidth: "600px",
              margin: "0 auto",
            }}
          >
            Accepting payments worldwide. Select your preferred currency, review real-time conversion to LKR, and pay securely via PayHere.
          </p>
        </motion.div>

        {/* Main Grid Layout */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))",
            gap: "32px",
            alignItems: "start",
          }}
        >
          {/* Left Column: Form Card */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            style={{
              background: "var(--glass-bg, rgba(15, 23, 42, 0.75))",
              border: "1px solid var(--glass-border, rgba(255, 255, 255, 0.1))",
              borderRadius: "24px",
              padding: "36px",
              backdropFilter: "blur(20px)",
              WebkitBackdropFilter: "blur(20px)",
              boxShadow: "0 20px 50px rgba(0, 0, 0, 0.3)",
            }}
          >
            <div style={{ display: "flex", alignItems: "center", gap: "12px", marginBottom: "28px" }}>
              <div
                style={{
                  width: "42px",
                  height: "42px",
                  borderRadius: "12px",
                  background: "linear-gradient(135deg, rgba(0, 210, 255, 0.2), rgba(139, 92, 246, 0.2))",
                  border: "1px solid rgba(139, 92, 246, 0.3)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  color: "#a78bfa",
                }}
              >
                <CreditCard size={22} />
              </div>
              <div>
                <h2 style={{ fontSize: "1.3rem", fontWeight: 700, margin: 0 }}>Client & Payment Details</h2>
                <p style={{ fontSize: "0.85rem", color: "#94a3b8", margin: 0 }}>No registration or login required</p>
              </div>
            </div>

            {errorMessage && (
              <motion.div
                initial={{ opacity: 0, y: -8 }}
                animate={{ opacity: 1, y: 0 }}
                style={{
                  padding: "12px 16px",
                  borderRadius: "12px",
                  background: "rgba(239, 68, 68, 0.12)",
                  border: "1px solid rgba(239, 68, 68, 0.3)",
                  color: "#f87171",
                  fontSize: "0.9rem",
                  display: "flex",
                  alignItems: "center",
                  gap: "10px",
                  marginBottom: "24px",
                }}
              >
                <AlertCircle size={18} style={{ flexShrink: 0 }} />
                <span>{errorMessage}</span>
              </motion.div>
            )}

            <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
              {/* Full Name */}
              <div>
                <label style={{ display: "block", fontSize: "0.85rem", fontWeight: 600, color: "#cbd5e1", marginBottom: "8px" }}>
                  Full Name <span style={{ color: "#ef4444" }}>*</span>
                </label>
                <div style={{ position: "relative" }}>
                  <User size={18} style={{ position: "absolute", left: "14px", top: "50%", transform: "translateY(-50%)", color: "#64748b" }} />
                  <input
                    type="text"
                    name="fullName"
                    value={formData.fullName}
                    onChange={handleChange}
                    placeholder="e.g. John Doe"
                    required
                    style={{
                      width: "100%",
                      padding: "12px 14px 12px 44px",
                      borderRadius: "12px",
                      background: "rgba(15, 23, 42, 0.6)",
                      border: "1px solid rgba(255, 255, 255, 0.12)",
                      color: "#fff",
                      fontSize: "0.95rem",
                      outline: "none",
                      transition: "border-color 0.2s, box-shadow 0.2s",
                    }}
                    onFocus={(e) => (e.target.style.borderColor = "#8b5cf6")}
                    onBlur={(e) => (e.target.style.borderColor = "rgba(255, 255, 255, 0.12)")}
                  />
                </div>
              </div>

              {/* Email Address */}
              <div>
                <label style={{ display: "block", fontSize: "0.85rem", fontWeight: 600, color: "#cbd5e1", marginBottom: "8px" }}>
                  Email Address <span style={{ color: "#ef4444" }}>*</span>
                </label>
                <div style={{ position: "relative" }}>
                  <Mail size={18} style={{ position: "absolute", left: "14px", top: "50%", transform: "translateY(-50%)", color: "#64748b" }} />
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="john@example.com"
                    required
                    style={{
                      width: "100%",
                      padding: "12px 14px 12px 44px",
                      borderRadius: "12px",
                      background: "rgba(15, 23, 42, 0.6)",
                      border: "1px solid rgba(255, 255, 255, 0.12)",
                      color: "#fff",
                      fontSize: "0.95rem",
                      outline: "none",
                      transition: "border-color 0.2s",
                    }}
                    onFocus={(e) => (e.target.style.borderColor = "#8b5cf6")}
                    onBlur={(e) => (e.target.style.borderColor = "rgba(255, 255, 255, 0.12)")}
                  />
                </div>
              </div>

              {/* Phone Number */}
              <div>
                <label style={{ display: "block", fontSize: "0.85rem", fontWeight: 600, color: "#cbd5e1", marginBottom: "8px" }}>
                  Phone Number <span style={{ color: "#ef4444" }}>*</span>
                </label>
                <div style={{ position: "relative" }}>
                  <Phone size={18} style={{ position: "absolute", left: "14px", top: "50%", transform: "translateY(-50%)", color: "#64748b" }} />
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    placeholder={getPhonePlaceholder(formData.currency)}
                    required
                    style={{
                      width: "100%",
                      padding: "12px 14px 12px 44px",
                      borderRadius: "12px",
                      background: "rgba(15, 23, 42, 0.6)",
                      border: "1px solid rgba(255, 255, 255, 0.12)",
                      color: "#fff",
                      fontSize: "0.95rem",
                      outline: "none",
                      transition: "border-color 0.2s",
                    }}
                    onFocus={(e) => (e.target.style.borderColor = "#8b5cf6")}
                    onBlur={(e) => (e.target.style.borderColor = "rgba(255, 255, 255, 0.12)")}
                  />
                </div>
              </div>

              {/* Payment Amount & Currency */}
              <div>
                <div style={{ display: "grid", gridTemplateColumns: "1fr 140px", gap: "12px" }}>
                  <div>
                    <label style={{ display: "block", fontSize: "0.85rem", fontWeight: 600, color: "#cbd5e1", marginBottom: "8px" }}>
                      Payment Amount <span style={{ color: "#ef4444" }}>*</span>
                    </label>
                    <div style={{ position: "relative" }}>
                      <span
                        style={{
                          position: "absolute",
                          left: "14px",
                          top: "50%",
                          transform: "translateY(-50%)",
                          color: "#a78bfa",
                          fontSize: "0.9rem",
                          fontWeight: 700,
                          pointerEvents: "none",
                        }}
                      >
                        {calc.currencySymbol}
                      </span>
                      <input
                        type="number"
                        name="amount"
                        value={formData.amount}
                        onChange={handleChange}
                        placeholder={calc.isLkr ? "e.g. 50000" : "e.g. 150"}
                        min="1"
                        step="any"
                        required
                        style={{
                          width: "100%",
                          padding: "12px 14px 12px 44px",
                          borderRadius: "12px",
                          background: "rgba(15, 23, 42, 0.6)",
                          border: "1px solid rgba(255, 255, 255, 0.12)",
                          color: "#fff",
                          fontSize: "0.95rem",
                          outline: "none",
                          transition: "border-color 0.2s",
                        }}
                        onFocus={(e) => (e.target.style.borderColor = "#8b5cf6")}
                        onBlur={(e) => (e.target.style.borderColor = "rgba(255, 255, 255, 0.12)")}
                      />
                    </div>
                  </div>

                  <div>
                    <label style={{ display: "block", fontSize: "0.85rem", fontWeight: 600, color: "#cbd5e1", marginBottom: "8px" }}>
                      Currency
                    </label>
                    <select
                      name="currency"
                      value={formData.currency}
                      onChange={handleChange}
                      style={{
                        width: "100%",
                        padding: "12px 10px",
                        borderRadius: "12px",
                        background: "rgba(15, 23, 42, 0.8)",
                        border: "1px solid rgba(255, 255, 255, 0.12)",
                        color: "#fff",
                        fontSize: "0.9rem",
                        fontWeight: 600,
                        outline: "none",
                        cursor: "pointer",
                      }}
                    >
                      <optgroup label="Popular Currencies">
                        {POPULAR_CURRENCIES.map((c) => (
                          <option key={c.code} value={c.code}>
                            {c.code} ({c.symbol})
                          </option>
                        ))}
                      </optgroup>
                      <optgroup label="All Global Currencies">
                        {OTHER_CURRENCIES.map((c) => (
                          <option key={c.code} value={c.code}>
                            {c.code} ({c.symbol}) - {c.name}
                          </option>
                        ))}
                      </optgroup>
                    </select>
                  </div>
                </div>

                {/* Real-Time Conversion & Fee Hint Badge */}
                <div
                  style={{
                    marginTop: "10px",
                    padding: "9px 14px",
                    borderRadius: "10px",
                    background: "rgba(139, 92, 246, 0.08)",
                    border: "1px solid rgba(139, 92, 246, 0.2)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    fontSize: "0.8rem",
                    color: "#cbd5e1",
                    flexWrap: "wrap",
                    gap: "6px",
                  }}
                >
                  {calc.isLkr ? (
                    <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
                      <span>🇱🇰</span>
                      <span>Domestic Sri Lankan Rupee (LKR)</span>
                    </div>
                  ) : (
                    <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
                      <RefreshCw size={12} className={ratesLoading ? "animate-spin text-purple-400" : "text-purple-400"} />
                      <span>
                        Live Rate: 1 {calc.inputCurrency} ≈{" "}
                        <strong style={{ color: "#a78bfa" }}>
                          {calc.rateToLkr.toFixed(2)} LKR
                        </strong>
                      </span>
                    </div>
                  )}

                  <div style={{ display: "flex", alignItems: "center", gap: "5px", color: "#10b981", fontSize: "0.76rem", fontWeight: 600 }}>
                    <span style={{ width: "6px", height: "6px", borderRadius: "50%", background: "#10b981" }} />
                    +3.3% gateway transaction fee
                  </div>
                </div>
              </div>

              {/* Optional Message / Project Name */}
              <div>
                <label style={{ display: "block", fontSize: "0.85rem", fontWeight: 600, color: "#cbd5e1", marginBottom: "8px" }}>
                  Project Name / Optional Note
                </label>
                <div style={{ position: "relative" }}>
                  <FileText size={18} style={{ position: "absolute", left: "14px", top: "14px", color: "#64748b" }} />
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    placeholder="e.g. Website Development Deposit / Invoice #104"
                    rows={3}
                    style={{
                      width: "100%",
                      padding: "12px 14px 12px 44px",
                      borderRadius: "12px",
                      background: "rgba(15, 23, 42, 0.6)",
                      border: "1px solid rgba(255, 255, 255, 0.12)",
                      color: "#fff",
                      fontSize: "0.95rem",
                      outline: "none",
                      resize: "none",
                      transition: "border-color 0.2s",
                    }}
                    onFocus={(e) => (e.target.style.borderColor = "#8b5cf6")}
                    onBlur={(e) => (e.target.style.borderColor = "rgba(255, 255, 255, 0.12)")}
                  />
                </div>
              </div>

              {/* Pay Now Button */}
              <button
                type="submit"
                disabled={loading}
                style={{
                  marginTop: "8px",
                  width: "100%",
                  padding: "16px 24px",
                  borderRadius: "14px",
                  background: "linear-gradient(135deg, #00d2ff, #8b5cf6)",
                  border: "none",
                  color: "#fff",
                  fontSize: "1.05rem",
                  fontWeight: 700,
                  cursor: loading ? "not-allowed" : "pointer",
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: "4px",
                  boxShadow: "0 10px 25px rgba(139, 92, 246, 0.35)",
                  transition: "all 0.2s ease",
                  opacity: loading ? 0.8 : 1,
                }}
                onMouseEnter={(e) => {
                  if (!loading) e.currentTarget.style.transform = "translateY(-2px)";
                }}
                onMouseLeave={(e) => {
                  if (!loading) e.currentTarget.style.transform = "translateY(0)";
                }}
              >
                {loading ? (
                  <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                    <Loader2 size={20} className="animate-spin" />
                    Initializing PayHere Checkout...
                  </div>
                ) : (
                  <>
                    <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                      <Lock size={18} />
                      Pay LKR {formattedLkrTotal} Now
                      <ArrowRight size={18} />
                    </div>
                    <span style={{ fontSize: "0.75rem", fontWeight: 500, color: "rgba(255,255,255,0.85)" }}>
                      {calc.isLkr
                        ? "Includes 3.3% payment gateway processing fee"
                        : `Equivalent to ${calc.currencySymbol}${calc.inputAmount.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 })} ${calc.inputCurrency} + 3.3% transaction fee`}
                    </span>
                  </>
                )}
              </button>
            </form>
          </motion.div>

          {/* Right Column: Order Summary & Trust Card */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            style={{
              display: "flex",
              flexDirection: "column",
              gap: "24px",
            }}
          >
            {/* Payment Summary Box */}
            <div
              style={{
                background: "linear-gradient(145deg, rgba(30, 41, 59, 0.8), rgba(15, 23, 42, 0.85))",
                border: "1px solid rgba(139, 92, 246, 0.25)",
                borderRadius: "24px",
                padding: "32px",
                backdropFilter: "blur(20px)",
                position: "relative",
                overflow: "hidden",
              }}
            >
              <div
                style={{
                  position: "absolute",
                  top: 0,
                  right: 0,
                  width: "140px",
                  height: "140px",
                  background: "radial-gradient(circle, rgba(0, 210, 255, 0.15), transparent 70%)",
                  pointerEvents: "none",
                }}
              />

              <h3 style={{ fontSize: "1.1rem", fontWeight: 700, marginBottom: "20px", color: "#cbd5e1" }}>
                Payment Summary
              </h3>

              <div style={{ display: "flex", flexDirection: "column", gap: "12px", borderBottom: "1px solid rgba(255, 255, 255, 0.1)", paddingBottom: "18px", marginBottom: "18px" }}>
                <div style={{ display: "flex", justifyContent: "space-between", fontSize: "0.88rem", color: "#94a3b8" }}>
                  <span>Service Provider</span>
                  <span style={{ color: "#fff", fontWeight: 600 }}>Abdullah Shaimy</span>
                </div>
                <div style={{ display: "flex", justifyContent: "space-between", fontSize: "0.88rem", color: "#94a3b8" }}>
                  <span>Client Name</span>
                  <span style={{ color: "#fff", fontWeight: 500 }}>{formData.fullName || "—"}</span>
                </div>
                <div style={{ display: "flex", justifyContent: "space-between", fontSize: "0.88rem", color: "#94a3b8" }}>
                  <span>Project / Note</span>
                  <span style={{ color: "#fff", fontWeight: 500, maxWidth: "160px", textOverflow: "ellipsis", overflow: "hidden", whiteSpace: "nowrap" }}>
                    {formData.message || "Standard Payment"}
                  </span>
                </div>
              </div>

              {/* Fee and Conversion Breakdown */}
              <div style={{ display: "flex", flexDirection: "column", gap: "10px", borderBottom: "1px solid rgba(255, 255, 255, 0.1)", paddingBottom: "18px", marginBottom: "18px" }}>
                <div style={{ display: "flex", justifyContent: "space-between", fontSize: "0.88rem", color: "#94a3b8" }}>
                  <span>Client Entered Amount</span>
                  <span style={{ color: "#e2e8f0", fontWeight: 600 }}>
                    {calc.currencySymbol} {calc.inputAmount.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 })} {calc.inputCurrency}
                  </span>
                </div>

                {!calc.isLkr && (
                  <>
                    <div style={{ display: "flex", justifyContent: "space-between", fontSize: "0.84rem", color: "#94a3b8" }}>
                      <span>Live Exchange Rate</span>
                      <span style={{ color: "#a78bfa", fontWeight: 500 }}>
                        1 {calc.inputCurrency} = {calc.rateToLkr.toFixed(2)} LKR
                      </span>
                    </div>

                    <div style={{ display: "flex", justifyContent: "space-between", fontSize: "0.88rem", color: "#94a3b8" }}>
                      <span>Converted Subtotal (LKR)</span>
                      <span style={{ color: "#fff", fontWeight: 600 }}>
                        LKR {calc.baseInLkr.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                      </span>
                    </div>
                  </>
                )}

                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", fontSize: "0.88rem", color: "#94a3b8" }}>
                  <span style={{ display: "inline-flex", alignItems: "center", gap: "6px" }}>
                    Transaction Fee ({GATEWAY_FEE_PERCENT}%)
                  </span>
                  <span style={{ color: "#10b981", fontWeight: 600 }}>
                    + LKR {calc.feeInLkr.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                  </span>
                </div>
              </div>

              {/* Total Payable in LKR */}
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", marginBottom: "12px" }}>
                <div>
                  <span style={{ fontSize: "0.95rem", color: "#cbd5e1", fontWeight: 600, display: "block" }}>
                    Total Payable
                  </span>
                  <span style={{ fontSize: "0.75rem", color: "#94a3b8" }}>
                    Settled in Sri Lankan Rupees
                  </span>
                </div>
                <div style={{ textAlign: "right" }}>
                  <span style={{ fontSize: "0.95rem", color: "#a78bfa", fontWeight: 700, marginRight: "5px" }}>
                    LKR
                  </span>
                  <span style={{ fontSize: "2.1rem", fontWeight: 800, color: "#00d2ff" }}>
                    {formattedLkrTotal}
                  </span>
                </div>
              </div>

              {/* Friendly Note for International Clients */}
              <div
                style={{
                  padding: "10px 12px",
                  borderRadius: "10px",
                  background: "rgba(255, 255, 255, 0.04)",
                  border: "1px solid rgba(255, 255, 255, 0.06)",
                  fontSize: "0.76rem",
                  color: "#94a3b8",
                  lineHeight: 1.4,
                  display: "flex",
                  gap: "8px",
                  alignItems: "flex-start",
                }}
              >
                <Info size={14} color="#a78bfa" style={{ flexShrink: 0, marginTop: "2px" }} />
                <span>
                  Payouts are settled directly in <strong>LKR</strong>. All international cards (Visa, Mastercard, AMEX) are accepted and your bank will automatically process the LKR transaction.
                </span>
              </div>
            </div>

            {/* Security & Trust Highlights */}
            <div
              style={{
                background: "var(--glass-bg, rgba(15, 23, 42, 0.6))",
                border: "1px solid var(--glass-border, rgba(255, 255, 255, 0.08))",
                borderRadius: "24px",
                padding: "28px",
              }}
            >
              <h4 style={{ fontSize: "0.95rem", fontWeight: 700, marginBottom: "16px", color: "#cbd5e1", display: "flex", alignItems: "center", gap: "8px" }}>
                <ShieldCheck size={18} color="#10b981" />
                Guaranteed Security
              </h4>

              <div style={{ display: "flex", flexDirection: "column", gap: "12px", fontSize: "0.88rem", color: "#94a3b8" }}>
                <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                  <CheckCircle2 size={16} color="#10b981" />
                  <span>Official PayHere Payment Gateway</span>
                </div>
                <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                  <CheckCircle2 size={16} color="#10b981" />
                  <span>256-bit SSL End-to-End Encryption</span>
                </div>
                <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                  <CheckCircle2 size={16} color="#10b981" />
                  <span>Supports Visa, Mastercard, AMEX & Mobile Wallets</span>
                </div>
                <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                  <CheckCircle2 size={16} color="#10b981" />
                  <span>Instant Email Payment Confirmation</span>
                </div>
              </div>

              {/* Supported Payment Logos / Badges */}
              <div
                style={{
                  marginTop: "20px",
                  paddingTop: "16px",
                  borderTop: "1px solid rgba(255, 255, 255, 0.08)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  color: "#64748b",
                  fontSize: "0.78rem",
                  fontWeight: 600,
                }}
              >
                <span>SECURE PAYHERE CHECKOUT</span>
                <div style={{ display: "flex", gap: "8px" }}>
                  <span style={{ padding: "3px 8px", background: "rgba(255,255,255,0.06)", borderRadius: "6px" }}>VISA</span>
                  <span style={{ padding: "3px 8px", background: "rgba(255,255,255,0.06)", borderRadius: "6px" }}>MASTER</span>
                  <span style={{ padding: "3px 8px", background: "rgba(255,255,255,0.06)", borderRadius: "6px" }}>AMEX</span>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
