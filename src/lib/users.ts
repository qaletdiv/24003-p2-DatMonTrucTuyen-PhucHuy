import fs from "fs";
import path from "path";
import crypto from "crypto";

export interface StoredUser {
  id: string;
  name: string;
  email: string;
  passwordHash: string;
  avatar?: string;
}

export type SafeUser = Omit<StoredUser, "passwordHash">;

const DATA_DIR = path.join(process.cwd(), ".data");
const USERS_FILE = path.join(DATA_DIR, "users.json");

function ensureDataDir() {
  if (!fs.existsSync(DATA_DIR)) {
    fs.mkdirSync(DATA_DIR, { recursive: true });
  }
}

function readUsers(): StoredUser[] {
  ensureDataDir();
  if (!fs.existsSync(USERS_FILE)) return [];
  try {
    return JSON.parse(fs.readFileSync(USERS_FILE, "utf-8"));
  } catch {
    return [];
  }
}

function writeUsers(users: StoredUser[]) {
  ensureDataDir();
  fs.writeFileSync(USERS_FILE, JSON.stringify(users, null, 2));
}

function hashPassword(password: string): string {
  return crypto.createHash("sha256").update(password).digest("hex");
}

function verifyPassword(password: string, hash: string): boolean {
  return hashPassword(password) === hash;
}

export function generateId(): string {
  return crypto.randomUUID();
}

export function findUserByEmail(email: string): StoredUser | undefined {
  return readUsers().find(
    (u) => u.email.toLowerCase() === email.toLowerCase(),
  );
}

export function findUserById(id: string): StoredUser | undefined {
  return readUsers().find((u) => u.id === id);
}

export function createUser(
  name: string,
  email: string,
  password: string,
): { success: boolean; user?: SafeUser; message: string } {
  if (findUserByEmail(email)) {
    return { success: false, message: "Email is already in use." };
  }

  const newUser: StoredUser = {
    id: generateId(),
    name,
    email,
    passwordHash: hashPassword(password),
  };

  const users = readUsers();
  users.push(newUser);
  writeUsers(users);

  const { passwordHash: _, ...safe } = newUser;
  return { success: true, user: safe, message: "Registration successful." };
}

export function authenticateUser(
  email: string,
  password: string,
): { success: boolean; user?: SafeUser; message: string } {
  const found = findUserByEmail(email);
  if (!found || !verifyPassword(password, found.passwordHash)) {
    return { success: false, message: "Incorrect email or password." };
  }

  const { passwordHash: _, ...safe } = found;
  return { success: true, user: safe, message: "Logged in successfully." };
}

export function getSafeUser(id: string): SafeUser | null {
  const user = findUserById(id);
  if (!user) return null;
  const { passwordHash: _, ...safe } = user;
  return safe;
}
