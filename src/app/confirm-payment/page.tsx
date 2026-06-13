"use client";

import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { stores } from "@/data/stores";
import { useCart } from "@/context/CartContext";
import { useOrders } from "@/context/OrderContext";
import { useToast } from "@/context/ToastContext";
import { useRequireAuth } from "@/hooks/useRequireAuth";
import Button from "@/components/ui/Button";
import { formatCurrency, formatDate } from "@/utils/format";
import type { OrderType } from "@/types";

interface CheckoutData {
  customerName: string;
  customerPhone: string;
  customerAddress: string;
  paymentMethod: "cash" | "online";
  orderType: OrderType;
}

export default function ConfirmPaymentPage() {
  const router = useRouter();
  const { isAuthenticated, authLoaded } = useRequireAuth("/confirm-payment");
  const { items, totalPrice, clearCart } = useCart();
  const { placeOrder } = useOrders();
  const { showToast } = useToast();

  const [checkout, setCheckout] = useState<CheckoutData | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [showCardForm, setShowCardForm] = useState(false);
  const [cardNumber, setCardNumber] = useState("");
  const [cardExpiry, setCardExpiry] = useState("");
  const [cardCvc, setCardCvc] = useState("");
  const [processing, setProcessing] = useState(false);

  useEffect(() => {
    if (!authLoaded) return;
    if (!isAuthenticated) return;

    const raw = sessionStorage.getItem("fos_checkout");
    if (!raw || items.length === 0) {
      router.replace("/checkout");
      return;
    }
    try {
      setCheckout(JSON.parse(raw) as CheckoutData);
    } catch {
      router.replace("/checkout");
    }
  }, [authLoaded, isAuthenticated, items.length, router]);

  if (!authLoaded || !isAuthenticated || !checkout || items.length === 0) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-20 text-center text-gray-500">
        Loading...
      </div>
    );
  }

  const isPaid = checkout.paymentMethod === "online";
  const branchName =
    checkout.orderType.type === "pickup"
      ? stores.find((s) => s.id === checkout.orderType.branchId)?.name ??
        "Unknown Branch"
      : null;

  const submitOrder = async (method: "cash" | "online") => {
    setProcessing(true);
    const status = method === "cash" ? "pending" : "completed";
    const order = await placeOrder({
      items: [...items],
      total: totalPrice,
      status,
      orderType: checkout.orderType,
      paymentMethod: method,
      customerName: checkout.customerName,
      customerPhone: checkout.customerPhone,
      customerAddress: checkout.customerAddress,
    });

    if (!order) {
      setProcessing(false);
      setError("Unable to place order. Please try again.");
      return;
    }

    sessionStorage.removeItem("fos_checkout");
    clearCart();
    showToast("Order placed successfully!");
    router.push(`/orders/${order.id}/confirmation`);
  };

  const handleConfirmOrder = () => {
    setError(null);
    if (checkout.paymentMethod === "online") {
      setShowCardForm(true);
      return;
    }
    submitOrder("cash");
  };

  const handleOnlinePayment = () => {
    if (!cardNumber.trim() || !cardExpiry.trim() || !cardCvc.trim()) {
      setError("Please fill in all payment details.");
      return;
    }
    setProcessing(true);
    setTimeout(() => {
      setShowCardForm(false);
      submitOrder("online");
    }, 1500);
  };

  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      {/* Step indicator */}
      <div className="flex items-center justify-center gap-2 text-sm text-gray-400 mb-8">
        <span className="text-gray-500">Cart</span>
        <span>→</span>
        <span className="text-gray-500">Checkout</span>
        <span>→</span>
        <span className="font-semibold text-orange-500">Confirm Payment</span>
      </div>

      <h1 className="text-3xl font-extrabold text-gray-900">
        Confirm Your Order
      </h1>
      <p className="mt-2 text-gray-600">
        Please review all details below before placing your order.
      </p>

      {/* Customer & Service details */}
      <div className="mt-8 grid sm:grid-cols-2 gap-4">
        <div className="bg-white border border-gray-200 rounded-2xl p-5">
          <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wide mb-3">
            Customer
          </h3>
          <div className="space-y-1">
            <p className="text-sm font-medium text-gray-900">
              {checkout.customerName}
            </p>
            <p className="text-sm text-gray-600">{checkout.customerPhone}</p>
            <p className="text-sm text-gray-600">{checkout.customerAddress}</p>
          </div>
        </div>

        <div className="bg-white border border-gray-200 rounded-2xl p-5">
          <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wide mb-3">
            Service Type
          </h3>
          {checkout.orderType.type === "dine-in" ? (
            <div className="space-y-1">
              <p className="text-sm font-medium text-gray-900">Dine-in</p>
              <p className="text-sm text-gray-600">
                Table {checkout.orderType.tableNumber}
              </p>
            </div>
          ) : (
            <div className="space-y-1">
              <p className="text-sm font-medium text-gray-900">Pickup</p>
              <p className="text-sm text-gray-600">{branchName}</p>
              <p className="text-sm text-gray-600">
                {formatDate(checkout.orderType.pickupTime)}
              </p>
            </div>
          )}
        </div>
      </div>

      {/* Payment method */}
      <div className="mt-4 bg-white border border-gray-200 rounded-2xl p-5">
        <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wide mb-3">
          Payment Method
        </h3>
        <div className="flex items-center gap-3">
          <div
            className={`w-10 h-10 rounded-full flex items-center justify-center ${
              isPaid ? "bg-blue-100" : "bg-green-100"
            }`}
          >
            {isPaid ? (
              <svg className="w-5 h-5 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
              </svg>
            ) : (
              <svg className="w-5 h-5 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z" />
              </svg>
            )}
          </div>
          <div>
            <p className="text-sm font-medium text-gray-900">
              {isPaid ? "Online Payment" : "Cash / Pay at Counter"}
            </p>
            <p className="text-xs text-gray-500">
              {isPaid
                ? "You will enter card details to complete payment"
                : "Pay when you receive your order"}
            </p>
          </div>
        </div>
      </div>

      {/* Order items */}
      <div className="mt-4 bg-white border border-gray-200 rounded-2xl p-6">
        <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wide mb-4">
          Order Items ({items.length})
        </h3>
        <div className="space-y-4">
          {items.map(({ item, quantity }) => (
            <div key={item.id} className="flex items-center gap-4">
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

        <div className="mt-5 pt-4 border-t border-gray-100">
          <div className="flex justify-between text-sm text-gray-500">
            <span>Subtotal</span>
            <span>{formatCurrency(totalPrice)}</span>
          </div>
          <div className="flex justify-between text-sm text-gray-500 mt-1">
            <span>Delivery fee</span>
            <span className="text-green-600 font-medium">Free</span>
          </div>
          <div className="flex justify-between mt-3 pt-3 border-t border-gray-100 font-bold text-lg text-gray-900">
            <span>Total</span>
            <span className="text-orange-500">
              {formatCurrency(totalPrice)}
            </span>
          </div>
        </div>
      </div>

      {error && (
        <div className="mt-4 text-sm text-red-600 bg-red-50 border border-red-100 rounded-lg px-3 py-2">
          {error}
        </div>
      )}

      {/* Actions */}
      <div className="mt-6 flex flex-col sm:flex-row gap-3">
        <Button
          size="lg"
          className="flex-1"
          onClick={handleConfirmOrder}
        >
          {isPaid ? "Proceed to Pay" : "Place Order"}
        </Button>
        <Link href="/checkout" className="flex-1">
          <Button variant="outline" size="lg" className="w-full">
            Back to Checkout
          </Button>
        </Link>
      </div>

      {/* Online payment modal */}
      {showCardForm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
          <div className="w-full max-w-md bg-white rounded-2xl shadow-xl p-6">
            <h3 className="text-lg font-bold text-gray-900">Online Payment</h3>
            <p className="text-sm text-gray-500 mt-1">
              Simulated payment — no real transaction will occur.
            </p>
            <div className="mt-4 space-y-3">
              <input
                type="text"
                placeholder="Card number"
                value={cardNumber}
                onChange={(e) => setCardNumber(e.target.value)}
                className="w-full px-3 py-2.5 rounded-xl border border-gray-200 focus:border-orange-400 outline-none text-sm"
              />
              <div className="grid grid-cols-2 gap-3">
                <input
                  type="text"
                  placeholder="MM/YY"
                  value={cardExpiry}
                  onChange={(e) => setCardExpiry(e.target.value)}
                  className="w-full px-3 py-2.5 rounded-xl border border-gray-200 focus:border-orange-400 outline-none text-sm"
                />
                <input
                  type="text"
                  placeholder="CVC"
                  value={cardCvc}
                  onChange={(e) => setCardCvc(e.target.value)}
                  className="w-full px-3 py-2.5 rounded-xl border border-gray-200 focus:border-orange-400 outline-none text-sm"
                />
              </div>
            </div>
            <div className="mt-5 flex gap-3">
              <Button
                variant="outline"
                className="flex-1"
                onClick={() => setShowCardForm(false)}
                disabled={processing}
              >
                Cancel
              </Button>
              <Button
                className="flex-1"
                onClick={handleOnlinePayment}
                disabled={processing}
              >
                {processing ? "Processing..." : `Pay ${formatCurrency(totalPrice)}`}
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
