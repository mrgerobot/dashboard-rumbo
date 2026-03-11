import { createContext, useContext, useState, useCallback } from "react";

export type Role = "admin" | "mentor";

export interface AuthSession {
  email: string;
  role: Role;
  campus: string | null;
  nombre: string;
}

interface AuthContextType {
  session: AuthSession | null;
  login: (session: AuthSession) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | null>(null);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [session, setSession] = useState<AuthSession | null>(null);

  const login = useCallback((s: AuthSession) => setSession(s), []);
  const logout = useCallback(() => setSession(null), []);

  return (
    <AuthContext.Provider value={{ session, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within AuthProvider");
  return ctx;
}
