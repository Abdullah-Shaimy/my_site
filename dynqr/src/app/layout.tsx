import type { Metadata } from "next";
import type { ReactNode } from "react";
import Navbar from "@/components/layout/Navbar";
import { AuthProvider } from "@/lib/auth/auth-context";
import "./globals.css";

export const metadata: Metadata = {
  title: "DynQR Free | Dynamic QR Manager",
  description: "Create editable QR codes, track scans, and manage links for free.",
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body>
        <AuthProvider>
          <div className="min-h-screen bg-[radial-gradient(circle_at_top,#dbeafe_0%,#f8fafc_45%,#f8fafc_100%)]">
            <Navbar />
            <main>{children}</main>
          </div>
        </AuthProvider>
      </body>
    </html>
  );
}
