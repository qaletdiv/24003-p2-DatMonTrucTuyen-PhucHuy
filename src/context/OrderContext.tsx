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
  loading: boolean;
  placeOrder: (input: PlaceOrderInput) => Promise<Order | null>;
  getOrderById: (id: string) => Order | undefined;
  refreshOrders: () => Promise<void>;
}

const OrderContext = createContext<OrderContextType | undefined>(undefined);

export function OrderProvider({ children }: { children: ReactNode }) {
  const { user } = useAuth();
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(false);

  const fetchOrders = useCallback(async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/orders");
      if (!res.ok) {
        setOrders([]);
        return;
      }
      const data = await res.json();
      setOrders(data.orders ?? []);
    } catch {
      setOrders([]);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    if (user) {
      fetchOrders();
    } else {
      setOrders([]);
    }
  }, [user?.id, fetchOrders]);

  const placeOrder = useCallback(
    async (input: PlaceOrderInput): Promise<Order | null> => {
      try {
        const res = await fetch("/api/orders", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(input),
        });

        if (!res.ok) return null;

        const data = await res.json();
        const order: Order = data.order;
        setOrders((prev) => [order, ...prev]);
        return order;
      } catch {
        return null;
      }
    },
    [],
  );

  const getOrderById = useCallback(
    (id: string) => orders.find((o) => o.id === id),
    [orders],
  );

  return (
    <OrderContext.Provider
      value={{ orders, loading, placeOrder, getOrderById, refreshOrders: fetchOrders }}
    >
      {children}
    </OrderContext.Provider>
  );
}

export function useOrders() {
  const ctx = useContext(OrderContext);
  if (!ctx) throw new Error("useOrders must be used within OrderProvider");
  return ctx;
}
