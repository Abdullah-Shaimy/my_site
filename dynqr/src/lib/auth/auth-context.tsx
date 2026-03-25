"use client";

import { createContext, useContext, useMemo } from "react";

type AuthContextValue = {
  userId: string;
  isAuthenticated: boolean;
};

const AuthContext = createContext<AuthContextValue>({
  userId: "demo-user",
  isAuthenticated: true,
});

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const value = useMemo<AuthContextValue>(() => ({
    userId: "demo-user",
    isAuthenticated: true,
  }), []);

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  return useContext(AuthContext);
}