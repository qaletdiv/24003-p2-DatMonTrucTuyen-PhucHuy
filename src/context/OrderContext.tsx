"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
  ReactNode,
} from "react";
import { CartItem, Order, OrderStatus, OrderType } from "@/types";
import { generateId } from "@/utils/format";
import { useAuth } from "./AuthContext";

export interface PlaceOrderInput {
  items: CartItem[];
  total: number;
  status: OrderStatus;
  orderType: OrderType;
  paymentMethod: "cash" | "online";
  customerName: string;
  customerPhone: string;
  customerAddress: string;
}

interface OrderContextType {
  orders: Order[];
  placeOrder: (input: PlaceOrderInput) => Order | null;
  getOrderById: (id: string) => Order | undefined;
}

const OrderContext = createContext<OrderContextType | undefined>(undefined);

function ordersKey(userId: string) {
  return `fos_orders_${userId}`;
}

function readOrders(userId: string): Order[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = localStorage.getItem(ordersKey(userId));
    return raw ? (JSON.parse(raw) as Order[]) : [];
  } catch {
    return [];
  }
}

function writeOrders(userId: string, orders: Order[]) {
  localStorage.setItem(ordersKey(userId), JSON.stringify(orders));
}

export function OrderProvider({ children }: { children: ReactNode }) {
  const { user } = useAuth();
  const [orders, setOrders] = useState<Order[]>([]);

  useEffect(() => {
    if (user) {
      setOrders(readOrders(user.id));
    } else {
      setOrders([]);
    }
  }, [user?.id]);

  const placeOrder = useCallback(
    (input: PlaceOrderInput): Order | null => {
      if (!user) return null;

      const order: Order = {
        id: generateId(),
        userId: user.id,
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

      const existing = readOrders(user.id);
      const updated = [order, ...existing];
      writeOrders(user.id, updated);
      setOrders(updated);
      return order;
    },
    [user],
  );

  const getOrderById = useCallback(
    (id: string) => orders.find((o) => o.id === id),
    [orders],
  );

  return (
    <OrderContext.Provider value={{ orders, placeOrder, getOrderById }}>
      {children}
    </OrderContext.Provider>
  );
}

export function useOrders() {
  const ctx = useContext(OrderContext);
  if (!ctx) throw new Error("useOrders must be used within OrderProvider");
  return ctx;
}
