"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { stores } from "@/data/stores";
import { useOrders } from "@/context/OrderContext";
import { useRequireAuth } from "@/hooks/useRequireAuth";
import Button from "@/components/ui/Button";
import { formatCurrency, formatDate } from "@/utils/format";
import type { Order } from "@/types";

function statusLabel(status: Order["status"]) {
  switch (status) {
    case "completed":
      return { text: "Completed", cls: "bg-green-100 text-green-700" };
    case "cancelled":
      return { text: "Cancelled", cls: "bg-red-100 text-red-700" };
    default:
      return { text: "Pending Payment", cls: "bg-yellow-100 text-yellow-700" };
  }
}

function OrderCard({ order }: { order: Order }) {
  const [open, setOpen] = useState(false);

  const status = statusLabel(order.status);
  const totalItems = order.items.reduce((s, i) => s + i.quantity, 0);
  const orderType = order.orderType;
  const branchName =
    orderType.type === "pickup"
      ? stores.find((s) => s.id === orderType.branchId)?.name ??
        "Unknown Branch"
      : null;

  return (
    <div className="bg-white border border-gray-200 rounded-2xl overflow-hidden transition-shadow hover:shadow-sm">
      {/* Collapsed summary row — always visible */}
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        className="w-full text-left px-5 py-4 flex flex-col sm:flex-row sm:items-center gap-3 cursor-pointer"
      >
        {/* Order ID + date */}
        <div className="flex-1 min-w-0">
          <p className="text-sm font-bold text-gray-900 uppercase tracking-wide">
            #{order.id}
          </p>
          <p className="text-xs text-gray-400 mt-0.5">
            {formatDate(order.createdAt)}
          </p>
        </div>

        {/* Total */}
        <p className="text-sm font-bold text-orange-500 shrink-0">
          {formatCurrency(order.total)}
        </p>

        {/* Status badge */}
        <span
          className={`inline-block w-fit px-2.5 py-0.5 rounded-full text-xs font-semibold shrink-0 ${status.cls}`}
        >
          {status.text}
        </span>

        {/* Chevron */}
        <svg
          className={`w-5 h-5 text-gray-400 shrink-0 transition-transform ${open ? "rotate-180" : ""}`}
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={2}
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
        </svg>
      </button>

      {/* Expanded detail — shown on click */}
      {open && (
        <div className="border-t border-gray-100 px-5 pb-5">
          {/* Info row */}
          <div className="grid sm:grid-cols-3 gap-4 mt-4">
            {/* Service type */}
            <div>
              <p className="text-xs font-semibold text-gray-400 uppercase tracking-wide mb-1">
                Service Type
              </p>
              {orderType.type === "dine-in" ? (
                <>
                  <p className="text-sm font-medium text-gray-900">Dine-in</p>
                  <p className="text-sm text-gray-600">
                    Table {orderType.tableNumber}
                  </p>
                </>
              ) : (
                <>
                  <p className="text-sm font-medium text-gray-900">Pickup</p>
                  <p className="text-sm text-gray-600">{branchName}</p>
                  <p className="text-sm text-gray-600">
                    {formatDate(orderType.pickupTime)}
                  </p>
                </>
              )}
            </div>

            {/* Payment method */}
            <div>
              <p className="text-xs font-semibold text-gray-400 uppercase tracking-wide mb-1">
                Payment Method
              </p>
              <p className="text-sm font-medium text-gray-900">
                {order.paymentMethod === "online"
                  ? "Online Payment"
                  : "Cash"}
              </p>
              <p className="text-sm text-gray-600">
                {order.paymentMethod === "online"
                  ? "Paid online"
                  : "Pay at counter"}
              </p>
            </div>

            {/* Customer */}
            <div>
              <p className="text-xs font-semibold text-gray-400 uppercase tracking-wide mb-1">
                Customer
              </p>
              <p className="text-sm font-medium text-gray-900">
                {order.customerName}
              </p>
              <p className="text-sm text-gray-600">{order.customerPhone}</p>
            </div>
          </div>

          {/* Items list */}
          <div className="mt-5">
            <p className="text-xs font-semibold text-gray-400 uppercase tracking-wide mb-3">
              Items Ordered ({totalItems})
            </p>
            <div className="space-y-3">
              {order.items.map(({ item, quantity }) => (
                <div key={item.id} className="flex items-center gap-3">
                  <div className="relative w-11 h-11 shrink-0 rounded-lg overflow-hidden bg-gray-100">
                    <Image
                      src={item.image}
                      alt={item.name}
                      fill
                      className="object-cover"
                      sizes="44px"
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
                  <p className="text-sm font-semibold text-gray-900 shrink-0">
                    {formatCurrency(item.price * quantity)}
                  </p>
                </div>
              ))}
            </div>

            {/* Total */}
            <div className="mt-4 pt-3 border-t border-gray-100 flex justify-between font-bold text-gray-900">
              <span>Total</span>
              <span className="text-orange-500">
                {formatCurrency(order.total)}
              </span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default function OrderHistoryPage() {
  const { isAuthenticated, authLoaded } = useRequireAuth("/orders");
  const { orders } = useOrders();

  if (!authLoaded || !isAuthenticated) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-20 text-center text-gray-500">
        Loading...
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <h1 className="text-3xl font-extrabold text-gray-900">Order History</h1>
      <p className="mt-2 text-gray-600">
        View all your past orders. Click on any order to see full details.
      </p>

      {orders.length === 0 ? (
        <div className="mt-16 text-center">
          <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-gray-100 flex items-center justify-center">
            <svg
              className="w-8 h-8 text-gray-400"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={1.5}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
              />
            </svg>
          </div>
          <h2 className="text-lg font-semibold text-gray-900">
            No orders yet
          </h2>
          <p className="mt-1 text-gray-500">
            You haven&apos;t placed any orders yet. Start browsing the menu!
          </p>
          <Link href="/menu" className="inline-block mt-5">
            <Button size="lg">Browse Menu</Button>
          </Link>
        </div>
      ) : (
        <div className="mt-8 space-y-4">
          {orders.map((order) => (
            <OrderCard key={order.id} order={order} />
          ))}
        </div>
      )}
    </div>
  );
}
