"use client";

import Image from "next/image";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useOrders } from "@/context/OrderContext";
import { useAuth } from "@/context/AuthContext";
import { stores } from "@/data/stores";
import Button from "@/components/ui/Button";
import { formatCurrency, formatDate } from "@/utils/format";
import type { Order } from "@/types";

export default function OrderConfirmationPage() {
  const { id } = useParams();
  const router = useRouter();
  const { user } = useAuth();
  const { getOrderById } = useOrders();
  const [order, setOrder] = useState<Order | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user) {
      router.replace("/login");
      return;
    }
    const found = getOrderById(id as string);
    if (found) {
      setOrder(found);
    }
    setLoading(false);
  }, [user, id, getOrderById, router]);

  if (loading) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-20 text-center text-gray-500">
        Loading...
      </div>
    );
  }

  if (!order) {
    return (
      <div className="max-w-3xl mx-auto px-4 py-20 text-center">
        <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-red-100 flex items-center justify-center">
          <svg className="w-8 h-8 text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </div>
        <h1 className="text-2xl font-bold text-gray-900">Order Not Found</h1>
        <p className="mt-2 text-gray-500">
          We couldn&apos;t find this order. It may have been removed or the link
          is invalid.
        </p>
        <Link href="/menu" className="inline-block mt-6">
          <Button size="lg">Browse Menu</Button>
        </Link>
      </div>
    );
  }

  const isPaid = order.paymentMethod === "online";
  const orderType = order.orderType;
  const branchName =
    orderType.type === "pickup"
      ? stores.find((s) => s.id === orderType.branchId)?.name ??
        "Unknown Branch"
      : null;
  const totalItems = order.items.reduce((sum, i) => sum + i.quantity, 0);

  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      {/* ── Success notification ── */}
      <div className="text-center">
        <div className="w-20 h-20 mx-auto rounded-full bg-green-100 flex items-center justify-center animate-[bounce_0.6s_ease-in-out]">
          <svg
            className="w-10 h-10 text-green-500"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2.5}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M5 13l4 4L19 7"
            />
          </svg>
        </div>
        <h1 className="mt-5 text-3xl font-extrabold text-gray-900">
          Order Placed Successfully!
        </h1>
        <p className="mt-2 text-gray-500 max-w-md mx-auto">
          Thank you, <span className="font-medium text-gray-700">{order.customerName}</span>.
          Your order has been received and is being processed.
        </p>
      </div>

      {/* ── Order ID / Status / Time strip ── */}
      <div className="mt-8 bg-orange-50 border border-orange-100 rounded-2xl px-6 py-5">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <p className="text-xs text-gray-500 uppercase tracking-wide">
              Order ID
            </p>
            <p className="mt-0.5 font-bold text-gray-900 text-lg uppercase tracking-wide">
              #{order.id}
            </p>
          </div>
          <div className="flex items-center gap-4">
            <div>
              <p className="text-xs text-gray-500 uppercase tracking-wide">
                Placed on
              </p>
              <p className="mt-0.5 text-sm font-medium text-gray-700">
                {formatDate(order.createdAt)}
              </p>
            </div>
            <span
              className={`inline-block px-3 py-1 rounded-full text-xs font-semibold ${
                isPaid
                  ? "bg-green-100 text-green-700"
                  : "bg-yellow-100 text-yellow-700"
              }`}
            >
              {isPaid ? "Paid" : "Pending Payment"}
            </span>
          </div>
        </div>
      </div>

      {/* ── Order summary ── */}
      <div className="mt-6 space-y-4">
        {/* Info cards */}
        <div className="grid sm:grid-cols-2 gap-4">
          {/* Customer */}
          <div className="bg-white border border-gray-200 rounded-2xl p-5">
            <div className="flex items-center gap-2 mb-3">
              <svg className="w-4 h-4 text-orange-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
              </svg>
              <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wide">
                Customer
              </h3>
            </div>
            <p className="text-sm font-medium text-gray-900">
              {order.customerName}
            </p>
            <p className="text-sm text-gray-600 mt-1">
              {order.customerPhone}
            </p>
            <p className="text-sm text-gray-600 mt-1">
              {order.customerAddress}
            </p>
          </div>

          {/* Service type */}
          <div className="bg-white border border-gray-200 rounded-2xl p-5">
            <div className="flex items-center gap-2 mb-3">
              <svg className="w-4 h-4 text-orange-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
              <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wide">
                Service Type
              </h3>
            </div>
            {orderType.type === "dine-in" ? (
              <>
                <p className="text-sm font-medium text-gray-900">Dine-in</p>
                <p className="text-sm text-gray-600 mt-1">
                  Table {orderType.tableNumber}
                </p>
              </>
            ) : (
              <>
                <p className="text-sm font-medium text-gray-900">Pickup</p>
                <p className="text-sm text-gray-600 mt-1">{branchName}</p>
                <p className="text-sm text-gray-600 mt-1">
                  {formatDate(orderType.pickupTime)}
                </p>
              </>
            )}
          </div>

          {/* Payment */}
          <div className="bg-white border border-gray-200 rounded-2xl p-5">
            <div className="flex items-center gap-2 mb-3">
              <svg className="w-4 h-4 text-orange-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
              </svg>
              <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wide">
                Payment
              </h3>
            </div>
            <p className="text-sm font-medium text-gray-900">
              {isPaid ? "Online Payment" : "Cash / Pay at Counter"}
            </p>
            <p className="text-sm text-gray-600 mt-1">
              {isPaid
                ? "Payment completed successfully"
                : "Please pay when you receive your order"}
            </p>
          </div>

          {/* Quick stats */}
          <div className="bg-white border border-gray-200 rounded-2xl p-5">
            <div className="flex items-center gap-2 mb-3">
              <svg className="w-4 h-4 text-orange-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
              </svg>
              <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wide">
                Summary
              </h3>
            </div>
            <div className="space-y-1">
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">Total items</span>
                <span className="font-medium text-gray-900">{totalItems}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">Delivery fee</span>
                <span className="font-medium text-green-600">Free</span>
              </div>
              <div className="flex justify-between text-sm pt-1 border-t border-gray-100 mt-1">
                <span className="font-semibold text-gray-900">Total</span>
                <span className="font-bold text-orange-500">
                  {formatCurrency(order.total)}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Order items list */}
        <div className="bg-white border border-gray-200 rounded-2xl p-6">
          <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wide mb-4">
            Ordered Items ({totalItems})
          </h3>
          <div className="space-y-4">
            {order.items.map(({ item, quantity }) => (
              <div
                key={item.id}
                className="flex items-center gap-4"
              >
                <div className="relative w-14 h-14 shrink-0 rounded-xl overflow-hidden bg-gray-100">
                  <Image
                    src={item.image}
                    alt={item.name}
                    fill
                    className="object-cover"
                    sizes="56px"
                  />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-gray-900 truncate">
                    {item.name}
                  </p>
                  <p className="text-xs text-gray-500">
                    {quantity} × {formatCurrency(item.price)}
                  </p>
                </div>
                <p className="text-sm font-semibold text-gray-900">
                  {formatCurrency(item.price * quantity)}
                </p>
              </div>
            ))}
          </div>

          {/* Total row */}
          <div className="mt-5 pt-4 border-t border-gray-100 flex justify-between font-bold text-lg text-gray-900">
            <span>Total</span>
            <span className="text-orange-500">
              {formatCurrency(order.total)}
            </span>
          </div>
        </div>
      </div>

      {/* ── Navigation buttons ── */}
      <div className="mt-8 flex flex-col sm:flex-row gap-3 justify-center">
        <Link href="/menu">
          <Button size="lg" className="w-full sm:w-auto">
            Continue Ordering
          </Button>
        </Link>
        <Link href="/orders">
          <Button variant="outline" size="lg" className="w-full sm:w-auto">
            View Order History
          </Button>
        </Link>
      </div>
    </div>
  );
}
