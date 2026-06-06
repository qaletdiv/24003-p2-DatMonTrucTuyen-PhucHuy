import fs from "fs";
import path from "path";
import { CartItem } from "@/types";

const DATA_DIR = path.join(process.cwd(), ".data");
const CARTS_DIR = path.join(DATA_DIR, "carts");

function ensureDir() {
  if (!fs.existsSync(CARTS_DIR)) {
    fs.mkdirSync(CARTS_DIR, { recursive: true });
  }
}

function cartFile(userId: string) {
  return path.join(CARTS_DIR, `${userId}.json`);
}

export function getCart(userId: string): CartItem[] {
  ensureDir();
  const file = cartFile(userId);
  if (!fs.existsSync(file)) return [];
  try {
    return JSON.parse(fs.readFileSync(file, "utf-8"));
  } catch {
    return [];
  }
}

function saveCart(userId: string, items: CartItem[]) {
  ensureDir();
  fs.writeFileSync(cartFile(userId), JSON.stringify(items, null, 2));
}

export function addToCart(
  userId: string,
  item: CartItem["item"],
  quantity: number,
): CartItem[] {
  const items = getCart(userId);
  const existing = items.find((c) => c.item.id === item.id);
  if (existing) {
    existing.quantity += quantity;
  } else {
    items.push({ userId, item, quantity });
  }
  saveCart(userId, items);
  return items;
}

export function updateCartQuantity(
  userId: string,
  itemId: string,
  quantity: number,
): CartItem[] {
  let items = getCart(userId);
  if (quantity <= 0) {
    items = items.filter((c) => c.item.id !== itemId);
  } else {
    items = items.map((c) =>
      c.item.id === itemId ? { ...c, quantity } : c,
    );
  }
  saveCart(userId, items);
  return items;
}

export function removeFromCart(userId: string, itemId: string): CartItem[] {
  const items = getCart(userId).filter((c) => c.item.id !== itemId);
  saveCart(userId, items);
  return items;
}

export function clearCart(userId: string): CartItem[] {
  saveCart(userId, []);
  return [];
}
