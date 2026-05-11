"use client";
import {
  createContext,
  useContext,
  useEffect,
  useState,
  ReactNode,
} from "react";
import { User } from "@/types";
import { generateId } from "@/utils/format";

interface AuthContextType {
  user: User | null;
  login: (
    email: string,
    password: string,
  ) => { success: boolean; message: string };
  register: (
    name: string,
    email: string,
    password: string,
  ) => { success: boolean; message: string };
  logout: () => void;
  isAuthenticated: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const USERS_KEY = "fos_users";
const SESSION_KEY = "fos_session";

function readUsers(): User[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = localStorage.getItem(USERS_KEY);
    return raw ? (JSON.parse(raw) as User[]) : [];
  } catch {
    return [];
  }
}

function writeUsers(users: User[]) {
  localStorage.setItem(USERS_KEY, JSON.stringify(users));
}

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    try {
      const raw = localStorage.getItem(SESSION_KEY);
      //cach 1
      if (raw) {
        const userData: User = JSON.parse(raw);
        setUser(userData);
      }
      //cach 2
      // if(raw)setUser(JSON.parse(raw) as User);
    } catch {
      setUser(null);
    }
  }, []);

  const login = (email: string, password: string) => {
    const users = readUsers();
    const found = users.find(
      (u) =>
        u.email.toLowerCase() === email.toLowerCase() &&
        u.password === password,
    );
    if (!found) {
      return { success: false, message: "Email hoặc mật khẩu không đúng." };
    }
    setUser(found);
    localStorage.setItem(SESSION_KEY, JSON.stringify(found));
    return { success: true, message: "Đăng nhập thành công." };
  };

  const register = (name: string, email: string, password: string) => {
    const users = readUsers();
    if (users.some((u) => u.email.toLowerCase() === email.toLowerCase())) {
      return { success: false, message: "Email đã được sử dụng." };
    }
    const newUser: User = {
      id: generateId(),
      name,
      email,
      password,
    };
    const updated = [...users, newUser];
    writeUsers(updated);
    setUser(newUser);
    localStorage.setItem(SESSION_KEY, JSON.stringify(newUser));
    return { success: true, message: "Đăng ký thành công." };
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem(SESSION_KEY);
  };

  return (
    <AuthContext.Provider
      value={{ user, login, register, logout, isAuthenticated: !!user }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within AuthProvider");
  return ctx;
}
