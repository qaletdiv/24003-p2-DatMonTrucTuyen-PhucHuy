"use client";
import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
  useCallback,
  ReactNode,
} from "react";
import { CartItem, MenuItem } from "@/types";

interface CartContextType {
  items: CartItem[];
  totalCount: number;
  totalPrice: number;
  addItem: (item: MenuItem, quantity?: number) => void;
  removeItem: (itemId: string) => void;
  updateQuantity: (itemId: string, quantity: number) => void;
  clearCart: () => void;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);

  useEffect(() => {
    fetch("/api/cart")
      .then((res) => res.json())
      .then((data) => setItems(data.items ?? []))
      .catch(() => setItems([]));
  }, []);

  const addItem = useCallback((item: MenuItem, quantity = 1) => {
    setItems((prev) => {
      const existing = prev.find((c) => c.item.id === item.id);
      if (existing) {
        return prev.map((c) =>
          c.item.id === item.id
            ? { ...c, quantity: c.quantity + quantity }
            : c,
        );
      }
      return [...prev, { userId: "", item, quantity }];
    });

    fetch("/api/cart", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ item, quantity }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.items) setItems(data.items);
      })
      .catch(() => {});
  }, []);

  const removeItem = useCallback((itemId: string) => {
    setItems((prev) => prev.filter((c) => c.item.id !== itemId));

    fetch(`/api/cart?itemId=${itemId}`, { method: "DELETE" })
      .then((res) => res.json())
      .then((data) => {
        if (data.items) setItems(data.items);
      })
      .catch(() => {});
  }, []);

  const updateQuantity = useCallback((itemId: string, quantity: number) => {
    if (quantity <= 0) {
      setItems((prev) => prev.filter((c) => c.item.id !== itemId));
    } else {
      setItems((prev) =>
        prev.map((c) => (c.item.id === itemId ? { ...c, quantity } : c)),
      );
    }

    if (quantity <= 0) {
      fetch(`/api/cart?itemId=${itemId}`, { method: "DELETE" })
        .then((res) => res.json())
        .then((data) => {
          if (data.items) setItems(data.items);
        })
        .catch(() => {});
    } else {
      fetch("/api/cart", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ itemId, quantity }),
      })
        .then((res) => res.json())
        .then((data) => {
          if (data.items) setItems(data.items);
        })
        .catch(() => {});
    }
  }, []);

  const clearCart = useCallback(() => {
    setItems([]);

    fetch("/api/cart", { method: "DELETE" }).catch(() => {});
  }, []);

  const { totalCount, totalPrice } = useMemo(() => {
    const totalCount = items.reduce((sum, c) => sum + c.quantity, 0);
    const totalPrice = items.reduce(
      (sum, c) => sum + c.quantity * c.item.price,
      0,
    );
    return { totalCount, totalPrice };
  }, [items]);

  return (
    <CartContext.Provider
      value={{
        items,
        totalCount,
        totalPrice,
        addItem,
        removeItem,
        updateQuantity,
        clearCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used within CartProvider");
  return ctx;
}
