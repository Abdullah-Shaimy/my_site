import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Privacy Policy | Abdullah Shaimy",
  description: "Privacy Policy for abdullahshaimy.lk",
};

export default function PrivacyPolicyPage() {
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
              Privacy Policy
            </h1>
            <p style={{ color: "var(--text-muted)", fontSize: "0.95rem" }}>
              Effective Date: April 6, 2026
            </p>
          </div>

          <p style={{ marginBottom: 32 }}>
            Welcome to abdullahshaimy.lk. Your privacy is important to us. This Privacy Policy explains how we collect, use, and protect your information.
          </p>

          <section style={{ marginBottom: 32 }}>
            <h2 style={{ fontSize: "1.4rem", color: "var(--text-primary)", marginBottom: 16 }}>1. Information We Collect</h2>
            <p style={{ marginBottom: 12 }}>We may collect the following information:</p>
            <ul style={{ paddingLeft: 24, listStyleType: "disc", display: "flex", flexDirection: "column", gap: 8 }}>
              <li>Personal details (Name, Email, Phone Number)</li>
              <li>Account login details</li>
              <li>Payment information (processed securely via third-party services)</li>
              <li>Usage data (pages visited, time spent, device info)</li>
            </ul>
          </section>

          <section style={{ marginBottom: 32 }}>
            <h2 style={{ fontSize: "1.4rem", color: "var(--text-primary)", marginBottom: 16 }}>2. How We Use Your Information</h2>
            <p style={{ marginBottom: 12 }}>We use your information to:</p>
            <ul style={{ paddingLeft: 24, listStyleType: "disc", display: "flex", flexDirection: "column", gap: 8 }}>
              <li>Provide and manage our services</li>
              <li>Process payments</li>
              <li>Improve user experience</li>
              <li>Communicate updates or support</li>
            </ul>
          </section>

          <section style={{ marginBottom: 32 }}>
            <h2 style={{ fontSize: "1.4rem", color: "var(--text-primary)", marginBottom: 16 }}>3. Data Protection</h2>
            <p>
              We implement security measures to protect your data. However, no method of transmission over the internet is 100% secure.
            </p>
          </section>

          <section style={{ marginBottom: 32 }}>
            <h2 style={{ fontSize: "1.4rem", color: "var(--text-primary)", marginBottom: 16 }}>4. Sharing Information</h2>
            <p style={{ marginBottom: 12 }}>We do NOT sell your personal data. We may share data with:</p>
            <ul style={{ paddingLeft: 24, listStyleType: "disc", display: "flex", flexDirection: "column", gap: 8 }}>
              <li>Payment providers</li>
              <li>Service partners (only when necessary)</li>
            </ul>
          </section>

          <section style={{ marginBottom: 32 }}>
            <h2 style={{ fontSize: "1.4rem", color: "var(--text-primary)", marginBottom: 16 }}>5. Cookies</h2>
            <p>We may use cookies to enhance your browsing experience.</p>
          </section>

          <section style={{ marginBottom: 32 }}>
            <h2 style={{ fontSize: "1.4rem", color: "var(--text-primary)", marginBottom: 16 }}>6. Your Rights</h2>
            <p style={{ marginBottom: 12 }}>You have the right to:</p>
            <ul style={{ paddingLeft: 24, listStyleType: "disc", display: "flex", flexDirection: "column", gap: 8 }}>
              <li>Access your data</li>
              <li>Request corrections</li>
              <li>Request deletion of your data</li>
            </ul>
          </section>

          <section style={{ marginBottom: 32 }}>
            <h2 style={{ fontSize: "1.4rem", color: "var(--text-primary)", marginBottom: 16 }}>7. Changes to Policy</h2>
            <p>We may update this policy anytime. Updates will be posted on this page.</p>
          </section>

          <section style={{ marginBottom: 32 }}>
            <h2 style={{ fontSize: "1.4rem", color: "var(--text-primary)", marginBottom: 16 }}>8. Contact Us</h2>
            <p style={{ marginBottom: 12 }}>If you have any questions, contact us at:</p>
            <div style={{ background: "rgba(139, 92, 246, 0.05)", padding: 16, borderRadius: 8, border: "1px solid rgba(139, 92, 246, 0.1)" }}>
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
