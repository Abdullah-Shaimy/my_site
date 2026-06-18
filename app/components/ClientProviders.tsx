"use client";

import { ThemeProvider } from "./ThemeProvider";
import { AuthProvider } from "../lib/AuthContext";

export function ClientProviders({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider>
      <AuthProvider>
        {children}
      </AuthProvider>
    </ThemeProvider>
  );
}
