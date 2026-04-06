import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Refund Policy | Abdullah Shaimy",
  description: "Refund Policy for abdullahshaimy.lk",
};

export default function RefundPolicyPage() {
  return (
    <div style={{ minHeight: "100vh", paddingTop: 120, paddingBottom: 80 }}>
      <div className="container-custom">
        <div
          className="glass-card"
          style={{
            maxWidth: 800,
            margin: "0 auto",
            padding: "48px",
            color: "var(--text-secondary)",
            lineHeight: 1.8,
            fontFamily: "var(--font-inter), sans-serif",
          }}
        >
          <div style={{ marginBottom: 40, borderBottom: "1px solid var(--glass-border)", paddingBottom: 24 }}>
            <h1
              style={{
                fontFamily: "var(--font-inter), sans-serif",
                fontWeight: 800,
                fontSize: "clamp(2rem, 4vw, 2.8rem)",
                color: "var(--text-primary)",
                marginBottom: 8,
              }}
            >
              Refund Policy
            </h1>
            <p style={{ color: "var(--text-muted)", fontSize: "0.95rem" }}>
              Effective Date: April 6, 2026
            </p>
          </div>

          <p style={{ marginBottom: 32 }}>
            Thank you for purchasing from abdullahshaimy.lk.
          </p>

          <section style={{ marginBottom: 32 }}>
            <h2 style={{ fontSize: "1.4rem", color: "var(--text-primary)", marginBottom: 16 }}>1. Refund Eligibility</h2>
            <p style={{ marginBottom: 12 }}>Refunds may be provided under the following conditions:</p>
            <ul style={{ paddingLeft: 24, listStyleType: "disc", display: "flex", flexDirection: "column", gap: 8 }}>
              <li>Service not delivered as promised</li>
              <li>Technical issues from our side</li>
              <li>Duplicate payment</li>
            </ul>
          </section>

          <section style={{ marginBottom: 32 }}>
            <h2 style={{ fontSize: "1.4rem", color: "var(--text-primary)", marginBottom: 16 }}>2. Non-Refundable Cases</h2>
            <p style={{ marginBottom: 12 }}>We do NOT provide refunds for:</p>
            <ul style={{ paddingLeft: 24, listStyleType: "disc", display: "flex", flexDirection: "column", gap: 8 }}>
              <li>Change of mind after purchase</li>
              <li>Partial usage of service</li>
              <li>User errors during purchase</li>
            </ul>
          </section>

          <section style={{ marginBottom: 32 }}>
            <h2 style={{ fontSize: "1.4rem", color: "var(--text-primary)", marginBottom: 16 }}>3. Refund Request</h2>
            <p style={{ marginBottom: 12 }}>To request a refund:</p>
            <ul style={{ paddingLeft: 24, listStyleType: "disc", display: "flex", flexDirection: "column", gap: 8 }}>
              <li>Contact us within 3-5 days of purchase</li>
              <li>Provide payment proof and details</li>
            </ul>
          </section>

          <section style={{ marginBottom: 32 }}>
            <h2 style={{ fontSize: "1.4rem", color: "var(--text-primary)", marginBottom: 16 }}>4. Processing Time</h2>
            <p>
              Approved refunds will be processed within 5–10 business days.
            </p>
          </section>

          <section style={{ marginBottom: 32 }}>
            <h2 style={{ fontSize: "1.4rem", color: "var(--text-primary)", marginBottom: 16 }}>5. Payment Method</h2>
            <p>
              Refunds will be issued via the original payment method.
            </p>
          </section>

          <section style={{ marginBottom: 32 }}>
            <h2 style={{ fontSize: "1.4rem", color: "var(--text-primary)", marginBottom: 16 }}>6. Contact Us</h2>
            <div style={{ background: "rgba(139, 92, 246, 0.05)", padding: 16, borderRadius: 8, border: "1px solid rgba(139, 92, 246, 0.1)", marginTop: 12 }}>
              <p style={{ margin: 0, marginBottom: 8 }}>
                <strong>Email:</strong>{" "}
                <a href="mailto:dev@abdullahshaimy.lk" style={{ color: "var(--accent-purple)", textDecoration: "none" }}>
                  dev@abdullahshaimy.lk
                </a>
              </p>
              <p style={{ margin: 0 }}>
                <strong>Phone:</strong>{" "}
                <a href="tel:+94711367326" style={{ color: "var(--text-primary)", textDecoration: "none" }}>
                  +94 711367326
                </a>
              </p>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}
