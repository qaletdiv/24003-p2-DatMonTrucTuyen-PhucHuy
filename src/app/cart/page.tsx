"use client";
import Image from "next/image";
import Link from "next/link";
import { useRequireAuth } from "@/hooks/useRequireAuth";
import { useCart } from "@/context/CartContext";
import { formatCurrency } from "@/utils/format";
import Button from "@/components/ui/Button";

export default function CartPage() {
  const { isAuthenticated, authLoaded } = useRequireAuth("/cart");
  const { items, totalPrice, updateQuantity, removeItem } = useCart();

  if (!authLoaded || !isAuthenticated) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-20 text-center text-gray-500">
        Loading...
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <h1 className="text-3xl font-extrabold text-gray-900">Your Cart</h1>
      <p className="mt-2 text-gray-600">
        Review your items before proceeding to checkout.
      </p>

      {items.length === 0 ? (
        <div className="mt-12 text-center py-16 bg-gray-50 rounded-2xl border border-gray-200">
          <p className="text-gray-500 mb-4">Your cart is empty.</p>
          <Link href="/menu">
            <Button>Browse Menu</Button>
          </Link>
        </div>
      ) : (
        <div className="mt-8 grid lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-4">
            {items.map(({ item, quantity }) => (
              <div
                key={item.id}
                className="flex gap-4 bg-white border border-gray-200 rounded-2xl p-4"
              >
                <div className="relative w-24 h-24 shrink-0 rounded-xl overflow-hidden bg-gray-100">
                  <Image
                    src={item.image}
                    alt={item.name}
                    fill
                    className="object-cover"
                    sizes="96px"
                  />
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="font-semibold text-gray-900">{item.name}</h3>
                  <p className="text-sm text-orange-500 font-medium mt-1">
                    {formatCurrency(item.price)}
                  </p>
                  <div className="mt-3 flex items-center justify-between gap-4">
                    <div className="inline-flex items-center border border-gray-200 rounded-xl overflow-hidden">
                      <button
                        onClick={() => updateQuantity(item.id, quantity - 1)}
                        className="w-9 h-9 grid place-items-center text-gray-700 hover:bg-gray-100"
                        aria-label="Decrease quantity"
                      >
                        −
                      </button>
                      <span className="w-10 text-center font-semibold text-sm">
                        {quantity}
                      </span>
                      <button
                        onClick={() => updateQuantity(item.id, quantity + 1)}
                        className="w-9 h-9 grid place-items-center text-gray-700 hover:bg-gray-100"
                        aria-label="Increase quantity"
                      >
                        +
                      </button>
                    </div>
                    <div className="text-right">
                      <p className="font-semibold text-gray-900">
                        {formatCurrency(item.price * quantity)}
                      </p>
                      <button
                        onClick={() => removeItem(item.id)}
                        className="text-xs text-red-500 hover:underline mt-1"
                      >
                        Remove
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="lg:col-span-1">
            <div className="bg-white border border-gray-200 rounded-2xl p-6 sticky top-24">
              <h2 className="font-bold text-lg text-gray-900">Order Summary</h2>
              <div className="mt-4 space-y-2 text-sm">
                <div className="flex justify-between text-gray-600">
                  <span>Subtotal</span>
                  <span>{formatCurrency(totalPrice)}</span>
                </div>
                <div className="flex justify-between font-bold text-gray-900 text-base pt-2 border-t border-gray-100">
                  <span>Total</span>
                  <span className="text-orange-500">
                    {formatCurrency(totalPrice)}
                  </span>
                </div>
              </div>
              <Link href="/checkout" className="block mt-6">
                <Button size="lg" className="w-full">
                  Proceed to Checkout
                </Button>
              </Link>
              <Link href="/menu" className="block mt-3">
                <Button variant="outline" size="lg" className="w-full">
                  Continue Shopping
                </Button>
              </Link>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
