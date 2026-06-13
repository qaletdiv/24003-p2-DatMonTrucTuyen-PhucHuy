import fs from "fs";
import path from "path";
import crypto from "crypto";
import { Order, OrderStatus, OrderType, CartItem } from "@/types";

const DATA_DIR = path.join(process.cwd(), ".data");
const ORDERS_DIR = path.join(DATA_DIR, "orders");

function ensureDir() {
  if (!fs.existsSync(ORDERS_DIR)) {
    fs.mkdirSync(ORDERS_DIR, { recursive: true });
  }
}

function ordersFile(userId: string) {
  return path.join(ORDERS_DIR, `${userId}.json`);
}

export function getOrders(userId: string): Order[] {
  ensureDir();
  const file = ordersFile(userId);
  if (!fs.existsSync(file)) return [];
  try {
    return JSON.parse(fs.readFileSync(file, "utf-8"));
  } catch {
    return [];
  }
}

function saveOrders(userId: string, orders: Order[]) {
  ensureDir();
  fs.writeFileSync(ordersFile(userId), JSON.stringify(orders, null, 2));
}

export function getOrderById(
  userId: string,
  orderId: string,
): Order | undefined {
  return getOrders(userId).find((o) => o.id === orderId);
}

export interface CreateOrderInput {
  items: CartItem[];
  total: number;
  status: OrderStatus;
  orderType: OrderType;
  paymentMethod: "cash" | "online";
  customerName: string;
  customerPhone: string;
  customerAddress: string;
}

export function createOrder(userId: string, input: CreateOrderInput): Order {
  const order: Order = {
    id: crypto.randomUUID(),
    userId,
    items: input.items,
    total: input.total,
    status: input.status,
    orderType: input.orderType,
    paymentMethod: input.paymentMethod,
    customerName: input.customerName,
    customerPhone: input.customerPhone,
    customerAddress: input.customerAddress,
    createdAt: new Date().toISOString(),
  };

  const existing = getOrders(userId);
  const updated = [order, ...existing];
  saveOrders(userId, updated);
  return order;
}
