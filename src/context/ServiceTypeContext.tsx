"use client";

import {
  createContext,
  useContext,
  useEffect,
  useState,
  ReactNode,
} from "react";
import { OrderType } from "@/types";

interface ServiceTypeContextType {
  orderType: OrderType | null;
  setOrderType: (type: OrderType | null) => void;
  clearOrderType: () => void;
  hydrated: boolean;
}

const ServiceTypeContext = createContext<ServiceTypeContextType | undefined>(
  undefined,
);

const SERVICE_TYPE_KEY = "fos_service_type";

export function ServiceTypeProvider({ children }: { children: ReactNode }) {
  const [orderType, setOrderTypeState] = useState<OrderType | null>(null);
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    try {
      const raw = localStorage.getItem(SERVICE_TYPE_KEY);
      if (raw) setOrderTypeState(JSON.parse(raw) as OrderType);
    } catch {
      setOrderTypeState(null);
    }
    setHydrated(true);
  }, []);

  const setOrderType = (type: OrderType | null) => {
    setOrderTypeState(type);
    if (type) {
      localStorage.setItem(SERVICE_TYPE_KEY, JSON.stringify(type));
    } else {
      localStorage.removeItem(SERVICE_TYPE_KEY);
    }
  };

  const clearOrderType = () => setOrderType(null);

  return (
    <ServiceTypeContext.Provider
      value={{ orderType, setOrderType, clearOrderType, hydrated }}
    >
      {children}
    </ServiceTypeContext.Provider>
  );
}

export function useServiceType() {
  const ctx = useContext(ServiceTypeContext);
  if (!ctx) {
    throw new Error("useServiceType must be used within ServiceTypeProvider");
  }
  return ctx;
}
