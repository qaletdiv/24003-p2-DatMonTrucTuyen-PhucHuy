"use client";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { stores } from "@/data/stores";
import { useAuth } from "@/context/AuthContext";
import { useCart } from "@/context/CartContext";
import { useServiceType } from "@/context/ServiceTypeContext";
import { useRequireAuth } from "@/hooks/useRequireAuth";
import Button from "@/components/ui/Button";
import { formatCurrency } from "@/utils/format";
import { OrderType } from "@/types";

export default function CheckoutPage() {
  const router = useRouter();
  const { isAuthenticated, authLoaded } = useRequireAuth("/checkout");
  const { user } = useAuth();
  const { items, totalPrice } = useCart();
  const { orderType, setOrderType } = useServiceType();

  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [paymentMethod, setPaymentMethod] = useState<"cash" | "online">("cash");
  const [serviceMode, setServiceMode] = useState<"dine-in" | "pickup">(
    "dine-in",
  );
  const [tableNumber, setTableNumber] = useState("");
  const [branchId, setBranchId] = useState(stores[0]?.id ?? "");
  const [pickupTime, setPickupTime] = useState("");
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!authLoaded) return;
    if (isAuthenticated && items.length === 0) {
      router.replace("/cart");
    }
  }, [authLoaded, isAuthenticated, items.length, router]);

  useEffect(() => {
    if (user) {
      setName(user.name);
    }
  }, [user]);

  useEffect(() => {
    if (!orderType) return;
    if (orderType.type === "dine-in") {
      setServiceMode("dine-in");
      setTableNumber(orderType.tableNumber);
    } else {
      setServiceMode("pickup");
      setBranchId(orderType.branchId);
      setPickupTime(orderType.pickupTime);
    }
  }, [orderType]);

  if (!authLoaded || !isAuthenticated || items.length === 0) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-20 text-center text-gray-500">
        Loading...
      </div>
    );
  }

  const buildOrderType = (): OrderType | null => {
    if (serviceMode === "dine-in") {
      if (!tableNumber.trim()) return null;
      return { type: "dine-in", tableNumber: tableNumber.trim() };
    }
    if (!branchId || !pickupTime) return null;
    return { type: "pickup", branchId, pickupTime };
  };

  const handleContinue = () => {
    setError(null);
    const type = buildOrderType();

    if (!name.trim() || !phone.trim() || !address.trim()) {
      setError("Please fill in all delivery information fields.");
      return;
    }
    if (!type) {
      setError("Please complete the service type information.");
      return;
    }

    setOrderType(type);

    sessionStorage.setItem(
      "fos_checkout",
      JSON.stringify({
        customerName: name.trim(),
        customerPhone: phone.trim(),
        customerAddress: address.trim(),
        paymentMethod,
        orderType: type,
      }),
    );

    router.push("/confirm-payment");
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <h1 className="text-3xl font-extrabold text-gray-900">Checkout</h1>
      <p className="mt-2 text-gray-600">
        Fill in your order details before reviewing payment.
      </p>

      <div className="mt-8 grid lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-6">
          <section className="bg-white border border-gray-200 rounded-2xl p-6">
            <h2 className="font-bold text-lg text-gray-900">
              Delivery Information
            </h2>
            <div className="mt-4 space-y-4">
              <div>
                <label className="text-sm font-medium text-gray-700">
                  Full Name
                </label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="mt-1 w-full px-3 py-2.5 rounded-xl border border-gray-200 focus:border-orange-400 focus:ring-2 focus:ring-orange-100 outline-none text-sm"
                />
              </div>
              <div>
                <label className="text-sm font-medium text-gray-700">
                  Phone Number
                </label>
                <input
                  type="tel"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="mt-1 w-full px-3 py-2.5 rounded-xl border border-gray-200 focus:border-orange-400 focus:ring-2 focus:ring-orange-100 outline-none text-sm"
                />
              </div>
              <div>
                <label className="text-sm font-medium text-gray-700">
                  Address
                </label>
                <textarea
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  rows={3}
                  className="mt-1 w-full px-3 py-2.5 rounded-xl border border-gray-200 focus:border-orange-400 focus:ring-2 focus:ring-orange-100 outline-none text-sm resize-none"
                />
              </div>
            </div>
          </section>

          <section className="bg-white border border-gray-200 rounded-2xl p-6">
            <h2 className="font-bold text-lg text-gray-900">Service Type</h2>
            <div className="mt-4 grid grid-cols-2 gap-3">
              <button
                type="button"
                onClick={() => setServiceMode("dine-in")}
                className={`p-3 rounded-xl border-2 text-sm font-medium transition-colors ${
                  serviceMode === "dine-in"
                    ? "border-orange-500 bg-orange-50 text-orange-700"
                    : "border-gray-200 text-gray-700"
                }`}
              >
                Dine-in
              </button>
              <button
                type="button"
                onClick={() => setServiceMode("pickup")}
                className={`p-3 rounded-xl border-2 text-sm font-medium transition-colors ${
                  serviceMode === "pickup"
                    ? "border-orange-500 bg-orange-50 text-orange-700"
                    : "border-gray-200 text-gray-700"
                }`}
              >
                Pickup
              </button>
            </div>
            <div className="mt-4">
              {serviceMode === "dine-in" ? (
                <div>
                  <label className="text-sm font-medium text-gray-700">
                    Table Number
                  </label>
                  <input
                    type="text"
                    value={tableNumber}
                    onChange={(e) => setTableNumber(e.target.value)}
                    className="mt-1 w-full px-3 py-2.5 rounded-xl border border-gray-200 focus:border-orange-400 focus:ring-2 focus:ring-orange-100 outline-none text-sm"
                  />
                </div>
              ) : (
                <div className="space-y-4">
                  <div>
                    <label className="text-sm font-medium text-gray-700">
                      Pickup Branch
                    </label>
                    <select
                      value={branchId}
                      onChange={(e) => setBranchId(e.target.value)}
                      className="mt-1 w-full px-3 py-2.5 rounded-xl border border-gray-200 focus:border-orange-400 focus:ring-2 focus:ring-orange-100 outline-none text-sm bg-white"
                    >
                      {stores.map((s) => (
                        <option key={s.id} value={s.id}>
                          {s.name}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-700">
                      Pickup Time
                    </label>
                    <input
                      type="datetime-local"
                      value={pickupTime}
                      onChange={(e) => setPickupTime(e.target.value)}
                      className="mt-1 w-full px-3 py-2.5 rounded-xl border border-gray-200 focus:border-orange-400 focus:ring-2 focus:ring-orange-100 outline-none text-sm"
                    />
                  </div>
                </div>
              )}
            </div>
          </section>

          <section className="bg-white border border-gray-200 rounded-2xl p-6">
            <h2 className="font-bold text-lg text-gray-900">Payment Method</h2>
            <div className="mt-4 space-y-3">
              <label className="flex items-center gap-3 p-4 rounded-xl border border-gray-200 cursor-pointer hover:border-orange-300">
                <input
                  type="radio"
                  name="payment"
                  checked={paymentMethod === "cash"}
                  onChange={() => setPaymentMethod("cash")}
                  className="accent-orange-500"
                />
                <div>
                  <p className="font-medium text-gray-900">
                    Cash / Pay at Counter
                  </p>
                  <p className="text-xs text-gray-500">
                    Order status: Pending Payment
                  </p>
                </div>
              </label>
              <label className="flex items-center gap-3 p-4 rounded-xl border border-gray-200 cursor-pointer hover:border-orange-300">
                <input
                  type="radio"
                  name="payment"
                  checked={paymentMethod === "online"}
                  onChange={() => setPaymentMethod("online")}
                  className="accent-orange-500"
                />
                <div>
                  <p className="font-medium text-gray-900">Online Payment</p>
                  <p className="text-xs text-gray-500">
                    Simulated card / e-wallet payment
                  </p>
                </div>
              </label>
            </div>
          </section>
        </div>

        <div className="lg:col-span-1">
          <div className="bg-white border border-gray-200 rounded-2xl p-6 sticky top-24">
            <h2 className="font-bold text-lg text-gray-900">Order Summary</h2>
            <div className="mt-4 space-y-3 max-h-64 overflow-y-auto">
              {items.map(({ item, quantity }) => (
                <div key={item.id} className="flex gap-3">
                  <div className="relative w-12 h-12 shrink-0 rounded-lg overflow-hidden bg-gray-100">
                    <Image
                      src={item.image}
                      alt={item.name}
                      fill
                      className="object-cover"
                      sizes="48px"
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
                  <p className="text-sm font-medium text-gray-900">
                    {formatCurrency(item.price * quantity)}
                  </p>
                </div>
              ))}
            </div>
            <div className="mt-4 pt-4 border-t border-gray-100 flex justify-between font-bold text-gray-900">
              <span>Total</span>
              <span className="text-orange-500">
                {formatCurrency(totalPrice)}
              </span>
            </div>

            {error && (
              <div className="mt-4 text-sm text-red-600 bg-red-50 border border-red-100 rounded-lg px-3 py-2">
                {error}
              </div>
            )}

            <Button size="lg" className="w-full mt-4" onClick={handleContinue}>
              Continue to Payment
            </Button>
            <Link href="/cart" className="block mt-3">
              <Button variant="outline" size="lg" className="w-full">
                Back to Cart
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
