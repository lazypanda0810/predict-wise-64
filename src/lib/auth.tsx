import { createContext, useContext, useEffect, useState, type ReactNode } from "react";

export type Role = "student" | "teacher" | "admin";

export interface AppUser {
  name: string;
  email: string;
  role: Role;
  avatar?: string;
}

interface StoredAccount extends AppUser {
  passwordHash: string;
  createdAt: string;
}

interface AuthValue {
  user: AppUser | null;
  ready: boolean;
  login: (email: string, password: string) => Promise<AppUser>;
  register: (name: string, email: string, password: string, role: Role) => Promise<AppUser>;
  resetPassword: (email: string, password: string) => Promise<void>;
  updateProfile: (patch: Partial<Pick<AppUser, "name" | "role">>) => void;
  accountExists: (email: string) => boolean;
  logout: () => void;
}

const AuthContext = createContext<AuthValue>(null!);
const SESSION_KEY = "edupredict.session";
const ACCOUNTS_KEY = "edupredict.accounts";

const normalize = (email: string) => email.trim().toLowerCase();

async function hashPassword(password: string): Promise<string> {
  const data = new TextEncoder().encode(`edupredict::${password}`);
  const digest = await crypto.subtle.digest("SHA-256", data);
  return Array.from(new Uint8Array(digest))
    .map((b) => b.toString(16).padStart(2, "0"))
    .join("");
}

function readAccounts(): Record<string, StoredAccount> {
  if (typeof window === "undefined") return {};
  try {
    return JSON.parse(window.localStorage.getItem(ACCOUNTS_KEY) ?? "{}") as Record<
      string,
      StoredAccount
    >;
  } catch {
    return {};
  }
}

function writeAccounts(accounts: Record<string, StoredAccount>) {
  window.localStorage.setItem(ACCOUNTS_KEY, JSON.stringify(accounts));
}

const delay = (ms: number) => new Promise((r) => setTimeout(r, ms));

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<AppUser | null>(null);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const raw = window.localStorage.getItem(SESSION_KEY);
    if (raw) {
      try {
        const session = JSON.parse(raw) as AppUser;
        if (readAccounts()[normalize(session.email)]) setUser(session);
        else window.localStorage.removeItem(SESSION_KEY);
      } catch {
        window.localStorage.removeItem(SESSION_KEY);
      }
    }
    setReady(true);
  }, []);

  const persist = (u: AppUser | null) => {
    setUser(u);
    if (u) window.localStorage.setItem(SESSION_KEY, JSON.stringify(u));
    else window.localStorage.removeItem(SESSION_KEY);
    return u as AppUser;
  };

  const value: AuthValue = {
    user,
    ready,
    accountExists: (email) => Boolean(readAccounts()[normalize(email)]),
    login: async (email, password) => {
      await delay(500);
      const account = readAccounts()[normalize(email)];
      if (!account) throw new Error("No account found for this email. Please register first.");
      if (account.passwordHash !== (await hashPassword(password)))
        throw new Error("Incorrect password. Please try again.");
      const { passwordHash: _h, createdAt: _c, ...profile } = account;
      return persist(profile);
    },
    register: async (name, email, password, role) => {
      await delay(600);
      const key = normalize(email);
      const accounts = readAccounts();
      if (accounts[key]) throw new Error("An account with this email already exists.");
      const account: StoredAccount = {
        name: name.trim(),
        email: key,
        role,
        passwordHash: await hashPassword(password),
        createdAt: new Date().toISOString(),
      };
      accounts[key] = account;
      writeAccounts(accounts);
      const { passwordHash: _h, createdAt: _c, ...profile } = account;
      return persist(profile);
    },
    resetPassword: async (email, password) => {
      await delay(600);
      const key = normalize(email);
      const accounts = readAccounts();
      if (!accounts[key]) throw new Error("No account found for this email.");
      accounts[key] = { ...accounts[key], passwordHash: await hashPassword(password) };
      writeAccounts(accounts);
    },
    updateProfile: (patch) => {
      if (!user) return;
      const accounts = readAccounts();
      const key = normalize(user.email);
      if (accounts[key]) {
        accounts[key] = { ...accounts[key], ...patch };
        writeAccounts(accounts);
      }
      persist({ ...user, ...patch });
    },
    logout: () => persist(null),
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export const useAuth = () => useContext(AuthContext);