export interface MenuItem {
  id: string;
  name: string;
  price: number;
  image: string;
  category: string;
  description?: string;
  special: boolean;
}

export interface CartItem {
  item: MenuItem;
  quantity: number;
}

export type OrderStatus = "pending" | "completed" | "cancelled";

export type OrderType =
  | { type: "dine-in"; tableNumber: string }
  | { type: "pickup"; branchId: string; pickupTime: string };

export interface Order {
  id: string;
  userId: string;
  items: CartItem[];
  total: number;
  status: OrderStatus;
  orderType: OrderType;
  paymentMethod: "cash" | "online";
  customerName: string;
  customerPhone: string;
  customerAddress: string;
  createdAt: string;
}

export interface User {
  id: string;
  name: string;
  email: string;
  password: string;
  avatar?: string;
}

export interface Store {
  id: string;
  name: string;
  city: string;
  district: string;
  address: string;
  phone: string;
  openingHours: string;
  lat: number;
  lng: number;
}

export interface NewsItem {
  id: string;
  title: string;
  image: string;
  date: string;
  excerpt: string;
}
