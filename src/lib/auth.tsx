import { createContext, useContext, useEffect, useState, type ReactNode } from "react";

export type Role = "student" | "teacher" | "admin" | "guest";

export interface AppUser {
  name: string;
  email: string;
  role: Role;
  avatar?: string;
}

const DEMO_USERS: Record<string, { password: string; user: AppUser }> = {
  "student@demo.com": {
    password: "123456",
    user: { name: "Aarav Sharma", email: "student@demo.com", role: "student" },
  },
  "teacher@demo.com": {
    password: "123456",
    user: { name: "Dr. Meera Iyer", email: "teacher@demo.com", role: "teacher" },
  },
  "admin@demo.com": {
    password: "123456",
    user: { name: "System Admin", email: "admin@demo.com", role: "admin" },
  },
};

const GUEST: AppUser = { name: "Guest User", email: "guest@local", role: "guest" };

interface AuthValue {
  user: AppUser | null;
  ready: boolean;
  login: (email: string, password: string) => Promise<AppUser>;
  register: (name: string, email: string, password: string) => Promise<AppUser>;
  loginAsGuest: () => AppUser;
  loginDemo: (role: Exclude<Role, "guest">) => AppUser;
  logout: () => void;
}

const AuthContext = createContext<AuthValue>(null!);
const KEY = "sapp-user";

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<AppUser | null>(null);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const raw = window.localStorage.getItem(KEY);
    if (raw) {
      try {
        setUser(JSON.parse(raw) as AppUser);
      } catch {
        /* ignore */
      }
    }
    setReady(true);
  }, []);

  const persist = (u: AppUser | null) => {
    setUser(u);
    if (u) window.localStorage.setItem(KEY, JSON.stringify(u));
    else window.localStorage.removeItem(KEY);
    return u as AppUser;
  };

  const value: AuthValue = {
    user,
    ready,
    login: async (email, password) => {
      await new Promise((r) => setTimeout(r, 700));
      const found = DEMO_USERS[email.trim().toLowerCase()];
      if (!found || found.password !== password) throw new Error("Invalid email or password");
      return persist(found.user);
    },
    register: async (name, email) => {
      await new Promise((r) => setTimeout(r, 800));
      return persist({ name, email, role: "student" });
    },
    loginAsGuest: () => persist(GUEST),
    loginDemo: (role) => persist(DEMO_USERS[`${role}@demo.com`].user),
    logout: () => persist(null),
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export const useAuth = () => useContext(AuthContext);