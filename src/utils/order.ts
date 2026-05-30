import { OrderStatus, OrderType } from "@/types";
import { stores } from "@/data/stores";

export function getOrderStatusLabel(status: OrderStatus): string {
  switch (status) {
    case "pending":
      return "Pending Payment";
    case "completed":
      return "Completed";
    case "cancelled":
      return "Cancelled";
  }
}

export function getOrderStatusColor(status: OrderStatus): string {
  switch (status) {
    case "pending":
      return "bg-yellow-50 text-yellow-700";
    case "completed":
      return "bg-green-50 text-green-600";
    case "cancelled":
      return "bg-red-50 text-red-600";
  }
}

export function getPaymentMethodLabel(method: "cash" | "online"): string {
  return method === "cash" ? "Cash" : "Online Payment";
}

export function getOrderTypeLabel(orderType: OrderType): string {
  if (orderType.type === "dine-in") {
    return `Dine-in — Table ${orderType.tableNumber}`;
  }
  const branch = stores.find((s) => s.id === orderType.branchId);
  const branchName = branch?.name ?? "Unknown branch";
  const time = orderType.pickupTime.replace("T", " ");
  return `Pickup — ${branchName} at ${time}`;
}
