import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Terms & Conditions | Abdullah Shaimy",
  description: "Terms & Conditions for Abdullah Shaimy Portfolio website",
};

export default function TermsConditionsPage() {
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
              Terms & Conditions
            </h1>
            <p style={{ color: "var(--text-muted)", fontSize: "0.95rem" }}>
              Last Updated: June 27, 2026
            </p>
          </div>

          <p style={{ marginBottom: 32 }}>
            Welcome to Abdullah Shaimy Portfolio (&quot;Website&quot;, &quot;we&quot;, &quot;our&quot;, or &quot;us&quot;). By accessing or using this website, you agree to comply with these Terms &amp; Conditions. If you do not agree, please discontinue using the website.
          </p>

          <section style={{ marginBottom: 32 }}>
            <h2 style={{ fontSize: "1.4rem", color: "var(--text-primary)", marginBottom: 16 }}>1. Website Purpose</h2>
            <p style={{ marginBottom: 12 }}>This website is intended to:</p>
            <ul style={{ paddingLeft: 24, listStyleType: "disc", display: "flex", flexDirection: "column", gap: 8 }}>
              <li>Showcase our portfolio and previous projects.</li>
              <li>Provide information about our services.</li>
              <li>Allow visitors to contact us.</li>
              <li>Enable clients to request quotations or services.</li>
              <li>Share updates, blogs, and technical information.</li>
            </ul>
          </section>

          <section style={{ marginBottom: 32 }}>
            <h2 style={{ fontSize: "1.4rem", color: "var(--text-primary)", marginBottom: 16 }}>2. Intellectual Property</h2>
            <p style={{ marginBottom: 12 }}>
              Unless otherwise stated, all content on this website, including but not limited to:
            </p>
            <ul style={{ paddingLeft: 24, listStyleType: "disc", display: "flex", flexDirection: "column", gap: 8, marginBottom: 12 }}>
              <li>Logos, Graphics, and UI/UX Designs</li>
              <li>Images, Videos, and Documents</li>
              <li>Source Code Samples and Text Content</li>
              <li>Branding</li>
            </ul>
            <p>
              are the intellectual property of Abdullah Shaimy and are protected under applicable copyright and intellectual property laws. You may not copy, reproduce, modify, distribute, sell, or republish any content without prior written permission.
            </p>
          </section>

          <section style={{ marginBottom: 32 }}>
            <h2 style={{ fontSize: "1.4rem", color: "var(--text-primary)", marginBottom: 16 }}>3. Portfolio Projects</h2>
            <ul style={{ paddingLeft: 24, listStyleType: "disc", display: "flex", flexDirection: "column", gap: 8 }}>
              <li>Projects displayed on this website may include work completed for clients.</li>
              <li>Some project details, designs, screenshots, or descriptions may be displayed only with client permission.</li>
              <li>Confidential information belonging to clients will never be published.</li>
            </ul>
          </section>

          <section style={{ marginBottom: 32 }}>
            <h2 style={{ fontSize: "1.4rem", color: "var(--text-primary)", marginBottom: 16 }}>4. Service Requests</h2>
            <p style={{ marginBottom: 12 }}>
              Submitting an inquiry or quotation request does not create a contractual agreement. A project officially begins only after:
            </p>
            <ul style={{ paddingLeft: 24, listStyleType: "disc", display: "flex", flexDirection: "column", gap: 8 }}>
              <li>Both parties agree to the project scope.</li>
              <li>Pricing has been accepted.</li>
              <li>Required payments (if applicable) have been received.</li>
            </ul>
          </section>

          <section style={{ marginBottom: 32 }}>
            <h2 style={{ fontSize: "1.4rem", color: "var(--text-primary)", marginBottom: 16 }}>5. Pricing</h2>
            <p style={{ marginBottom: 12 }}>
              Prices displayed (if any) are estimates and may change depending on:
            </p>
            <ul style={{ paddingLeft: 24, listStyleType: "disc", display: "flex", flexDirection: "column", gap: 8, marginBottom: 12 }}>
              <li>Project complexity and features requested</li>
              <li>Delivery timeline and third-party integrations</li>
              <li>Revisions requested</li>
            </ul>
            <p>Final quotations will be provided individually.</p>
          </section>

          <section style={{ marginBottom: 32 }}>
            <h2 style={{ fontSize: "1.4rem", color: "var(--text-primary)", marginBottom: 16 }}>6. Payments</h2>
            <p style={{ marginBottom: 12 }}>For paid projects:</p>
            <ul style={{ paddingLeft: 24, listStyleType: "disc", display: "flex", flexDirection: "column", gap: 8 }}>
              <li>Payments may be requested before work begins.</li>
              <li>Milestone payments may be required.</li>
              <li>Final deliverables may be released after full payment.</li>
              <li>Refund policies, if applicable, will be communicated before the project starts.</li>
            </ul>
          </section>

          <section style={{ marginBottom: 32 }}>
            <h2 style={{ fontSize: "1.4rem", color: "var(--text-primary)", marginBottom: 16 }}>7. User Responsibilities</h2>
            <p style={{ marginBottom: 12 }}>You agree not to:</p>
            <ul style={{ paddingLeft: 24, listStyleType: "disc", display: "flex", flexDirection: "column", gap: 8 }}>
              <li>Submit false information.</li>
              <li>Attempt unauthorized access to the website.</li>
              <li>Upload malicious software.</li>
              <li>Interfere with website functionality.</li>
              <li>Use the website for unlawful purposes.</li>
            </ul>
          </section>

          <section style={{ marginBottom: 32 }}>
            <h2 style={{ fontSize: "1.4rem", color: "var(--text-primary)", marginBottom: 16 }}>8. Third-Party Services</h2>
            <p style={{ marginBottom: 12 }}>
              This website may use third-party services including but not limited to:
            </p>
            <ul style={{ paddingLeft: 24, listStyleType: "disc", display: "flex", flexDirection: "column", gap: 8, marginBottom: 12 }}>
              <li>Google Authentication &amp; Supabase</li>
              <li>Cloudflare &amp; Vercel</li>
              <li>Zoho Mail &amp; GitHub</li>
              <li>Analytics services</li>
            </ul>
            <p>These services operate under their own terms and privacy policies.</p>
          </section>

          <section style={{ marginBottom: 32 }}>
            <h2 style={{ fontSize: "1.4rem", color: "var(--text-primary)", marginBottom: 16 }}>9. External Links</h2>
            <p style={{ marginBottom: 12 }}>
              Our website may contain links to third-party websites. We are not responsible for:
            </p>
            <ul style={{ paddingLeft: 24, listStyleType: "disc", display: "flex", flexDirection: "column", gap: 8, marginBottom: 12 }}>
              <li>Their content and availability</li>
              <li>Their security and privacy practices</li>
            </ul>
            <p>Accessing third-party websites is at your own risk.</p>
          </section>

          <section style={{ marginBottom: 32 }}>
            <h2 style={{ fontSize: "1.4rem", color: "var(--text-primary)", marginBottom: 16 }}>10. Limitation of Liability</h2>
            <p style={{ marginBottom: 12 }}>
              We strive to keep all information accurate and up to date. However, we do not guarantee:
            </p>
            <ul style={{ paddingLeft: 24, listStyleType: "disc", display: "flex", flexDirection: "column", gap: 8, marginBottom: 12 }}>
              <li>Continuous availability and error-free operation</li>
              <li>Complete accuracy and compatibility with every device or browser</li>
            </ul>
            <p>
              We are not liable for any direct, indirect, incidental, or consequential damages arising from the use of this website.
            </p>
          </section>

          <section style={{ marginBottom: 32 }}>
            <h2 style={{ fontSize: "1.4rem", color: "var(--text-primary)", marginBottom: 16 }}>11. Availability</h2>
            <p style={{ marginBottom: 12 }}>We reserve the right to:</p>
            <ul style={{ paddingLeft: 24, listStyleType: "disc", display: "flex", flexDirection: "column", gap: 8 }}>
              <li>Modify website content and update services.</li>
              <li>Remove pages and suspend access temporarily for maintenance.</li>
              <li>Discontinue features without prior notice.</li>
            </ul>
          </section>

          <section style={{ marginBottom: 32 }}>
            <h2 style={{ fontSize: "1.4rem", color: "var(--text-primary)", marginBottom: 16 }}>12. Privacy</h2>
            <p>
              Your use of this website is also governed by our Privacy Policy. Information submitted through contact forms or service requests will be handled responsibly and used only for legitimate business purposes.
            </p>
          </section>

          <section style={{ marginBottom: 32 }}>
            <h2 style={{ fontSize: "1.4rem", color: "var(--text-primary)", marginBottom: 16 }}>13. Cookies</h2>
            <p style={{ marginBottom: 12 }}>This website may use cookies to:</p>
            <ul style={{ paddingLeft: 24, listStyleType: "disc", display: "flex", flexDirection: "column", gap: 8, marginBottom: 12 }}>
              <li>Improve user experience and remember preferences.</li>
              <li>Analyze website traffic and enhance performance.</li>
            </ul>
            <p>You may disable cookies through your browser settings.</p>
          </section>

          <section style={{ marginBottom: 32 }}>
            <h2 style={{ fontSize: "1.4rem", color: "var(--text-primary)", marginBottom: 16 }}>14. Changes to These Terms</h2>
            <p>
              We reserve the right to modify these Terms &amp; Conditions at any time. Updated versions will be posted on this page with a revised &quot;Last Updated&quot; date. Continued use of the website constitutes acceptance of the updated Terms.
            </p>
          </section>

          <section style={{ marginBottom: 32 }}>
            <h2 style={{ fontSize: "1.4rem", color: "var(--text-primary)", marginBottom: 16 }}>15. Governing Law</h2>
            <p>
              These Terms &amp; Conditions shall be governed by and interpreted in accordance with the laws of Sri Lanka, without regard to conflict of law principles.
            </p>
          </section>

          <section style={{ marginBottom: 32 }}>
            <h2 style={{ fontSize: "1.4rem", color: "var(--text-primary)", marginBottom: 16 }}>16. Contact Information</h2>
            <p style={{ marginBottom: 12 }}>For questions regarding these Terms &amp; Conditions, please contact us:</p>
            <div style={{ background: "rgba(139, 92, 246, 0.05)", padding: 16, borderRadius: 8, border: "1px solid rgba(139, 92, 246, 0.1)" }}>
              <p style={{ margin: 0, marginBottom: 8 }}>
                <strong>Abdullah Shaimy</strong>
              </p>
              <p style={{ margin: 0, marginBottom: 8 }}>
                <strong>Website:</strong>{" "}
                <a href="https://abdullahshaimy.lk" target="_blank" rel="noopener noreferrer" style={{ color: "var(--accent-purple)", textDecoration: "none" }}>
                  https://abdullahshaimy.lk
                </a>
              </p>
              <p style={{ margin: 0 }}>
                <strong>Email:</strong>{" "}
                <a href="mailto:dev@abdullahshaimy.lk" style={{ color: "var(--accent-purple)", textDecoration: "none" }}>
                  dev@abdullahshaimy.lk
                </a>
              </p>
            </div>
          </section>

          <div style={{ borderTop: "1px solid var(--glass-border)", paddingTop: 24, marginTop: 40, textAlign: "center" }}>
            <p style={{ fontWeight: 600, color: "var(--text-primary)", margin: 0 }}>
              Acceptance
            </p>
            <p style={{ margin: 0, fontSize: "0.95rem" }}>
              By using this website, you acknowledge that you have read, understood, and agreed to these Terms &amp; Conditions.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
