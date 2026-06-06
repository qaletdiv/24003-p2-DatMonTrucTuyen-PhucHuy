import { CartItem, Order } from "@/types";
import { menuItems } from "./menuItems";

const sampleItems: CartItem[] = [
  {
    userId: "user_1",
    item: menuItems[0],
    quantity: 2,
  },
  {
    userId: "user_1",
    item: menuItems[5],
    quantity: 1,
  },
];

export const historyOrder: Order[] = [
  {
    id: "order_1",
    userId: "user_1",
    items: sampleItems,
    total: sampleItems.reduce(
      (sum, entry) => sum + entry.item.price * entry.quantity,
      0,
    ),
    status: "pending",
    orderType: {
      type: "dine-in",
      tableNumber: "5",
    },
    paymentMethod: "online",
    customerName: "Nguyen Van A",
    customerPhone: "0912345678",
    customerAddress: "123 Le Loi, District 1, HCMC",
    createdAt: "2026-06-05T14:30:00.000Z",
  },
];

export default historyOrder;
