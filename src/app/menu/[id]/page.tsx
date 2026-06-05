"use client";
import { useMemo, useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { notFound, useParams, useRouter } from "next/navigation";
import { menuItems } from "@/data/menuItems";
import { formatCurrency } from "@/utils/format";
import Button from "@/components/ui/Button";
import MenuCard from "@/components/ui/MenuCard";
import { useAuth } from "@/context/AuthContext";
import { useCart } from "@/context/CartContext";
import { useToast } from "@/context/ToastContext";

import type { MenuItem } from "@/types";

export default function MenuDetailPage() {
  const { id } = useParams();
  // const item = menuItems.find((m) => m.id === id);

  const [quantity, setQuantity] = useState(1);
  const [activeImage, setActiveImage] = useState(0);
  const [item, setItem] = useState<MenuItem>();
  const [related, setRelated] = useState<MenuItem[]>([]);
  const { isAuthenticated } = useAuth();
  const { addItem } = useCart();
  const { showToast } = useToast();
  const router = useRouter();
  console.log(id, " base");

  const gallery = useMemo(
    () => (item ? [item.image, item.image, item.image] : []),
    [item],
  );

  // const related = useMemo(() => {
  //   if (!item) return [] as MenuItem[];
  //   return menuItems
  //     .filter((m) => m.category === item.category && m.id !== item.id)
  //     .slice(0, 4);
  // }, [item]);

  // if (!item) {
  //   notFound();
  // }

  const handleAddToCart = () => {
    if (!isAuthenticated) {
      showToast("Please log in to add items to your cart.", "info");
      router.push("/login");
      return;
    }
    if (!item) {
      return showToast("item not found error!");
    }
    addItem(item, quantity);
    showToast(`Added ${quantity} x "${item?.name}" to your cart.`);
  };
  useEffect(() => {
    const fetchItem = async () => {
      try {
        const res = await fetch(`/api/meals/${id}`);
        if (!res.ok) {
          throw new Error("Failed to load item");
        }
        const output: MenuItem = await res.json();
        console.log(output);
        setItem(output);
      } catch (err) {
        console.error("Faild to fetch: " + err);
      }
    };
    fetchItem();
  }, [id]);

  useEffect(() => {
    const fetchRelatedItem = async () => {
      try {
        const res = await fetch(`/api/meals/${id}/related-detail-meals`);

        if (!res.ok) {
          throw new Error("Faild to load item");
        }
        const output: MenuItem[] = await res.json();
        setRelated(output || []);
      } catch (error) {
        console.log("faild to log " + error);
      }
    };
    fetchRelatedItem();
  }, [id]);
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <nav className="text-sm text-gray-500 mb-6">
        <Link href="/" className="hover:text-orange-500">
          Home
        </Link>
        <span className="mx-2">/</span>
        <Link href="/menu" className="hover:text-orange-500">
          Menu
        </Link>
        <span className="mx-2">/</span>
        <span className="text-gray-700">{item?.name}</span>
      </nav>

      <div className="grid md:grid-cols-2 gap-10">
        <div>
          <div className="relative h-80 md:h-[460px] rounded-2xl overflow-hidden bg-gray-100">
            <Image
              src={gallery[activeImage] || "/vercel.svg"}
              alt={item?.name || "Menu item image"}
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 50vw"
              priority
            />
          </div>
          <div className="mt-3 grid grid-cols-3 gap-3">
            {gallery.map((src, i) => (
              <button
                key={i}
                onClick={() => setActiveImage(i)}
                className={`relative h-20 rounded-xl overflow-hidden bg-gray-100 border-2 transition-colors ${
                  i === activeImage ? "border-orange-500" : "border-transparent"
                }`}
              >
                <Image
                  src={src || "/vercel.svg"}
                  alt={`${item?.name || "menu item"}-${i}`}
                  fill
                  className="object-cover"
                  sizes="200px"
                />
              </button>
            ))}
          </div>
        </div>

        <div>
          <span className="inline-block px-3 py-1 text-xs font-medium bg-orange-50 text-orange-600 rounded-full">
            {item?.category}
          </span>
          <h1 className="mt-3 text-3xl md:text-4xl font-extrabold text-gray-900">
            {item?.name}
          </h1>

          {item && (
            <div className="mt-4 flex items-baseline gap-3">
              <span className="text-3xl font-bold text-orange-500">
                {formatCurrency(item.price)}
              </span>
              <span className="text-sm text-gray-500 line-through">
                {formatCurrency(Math.round(item.price * 1.2))}
              </span>
              <span className="text-xs font-semibold px-2 py-0.5 bg-red-100 text-red-600 rounded">
                -20%
              </span>
            </div>
          )}

          {item?.description && (
            <p className="mt-5 text-gray-600 leading-relaxed">
              {item.description}
            </p>
          )}

          <ul className="mt-5 space-y-2 text-sm text-gray-600">
            <li className="flex items-start gap-2">
              <span className="text-orange-500">✓</span> Fresh ingredients
              delivered daily.
            </li>
            <li className="flex items-start gap-2">
              <span className="text-orange-500">✓</span> Prepared following
              HACCP food safety standards.
            </li>
            <li className="flex items-start gap-2">
              <span className="text-orange-500">✓</span> Fast delivery within 30
              minutes.
            </li>
          </ul>

          <div className="mt-6">
            <p className="text-sm font-medium text-gray-700 mb-2">Quantity</p>
            <div className="inline-flex items-center border border-gray-200 rounded-xl overflow-hidden">
              <button
                onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                className="w-10 h-10 grid place-items-center text-gray-700 hover:bg-gray-100"
                aria-label="Decrease quantity"
              >
                −
              </button>
              <span className="w-12 text-center font-semibold">{quantity}</span>
              <button
                onClick={() => setQuantity((q) => Math.min(99, q + 1))}
                className="w-10 h-10 grid place-items-center text-gray-700 hover:bg-gray-100"
                aria-label="Increase quantity"
              >
                +
              </button>
            </div>
          </div>

          <div className="mt-6 flex flex-col sm:flex-row gap-3">
            <Button
              size="lg"
              onClick={handleAddToCart}
              className="flex-1 sm:flex-none"
            >
              Add to Cart
            </Button>
            <Link href="/menu">
              <Button variant="outline" size="lg" className="w-full">
                Continue Shopping
              </Button>
            </Link>
          </div>

          {!isAuthenticated && (
            <p className="mt-3 text-sm text-gray-500">
              You need to{" "}
              <Link href="/login" className="text-orange-500 font-medium">
                log in
              </Link>{" "}
              to add items to your cart.
            </p>
          )}

          {item && (
            <div className="mt-6 p-4 rounded-2xl bg-orange-50 border border-orange-100 text-sm text-gray-700">
              <p className="font-semibold text-orange-700 mb-1">Summary</p>
              <p>
                {quantity} × {formatCurrency(item.price)} ={" "}
                <span className="font-bold text-orange-600">
                  {formatCurrency(quantity * item.price)}
                </span>
              </p>
            </div>
          )}
        </div>
      </div>

      {related.length > 0 && (
        <section className="mt-16">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">
            You May Also Like
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {related.map((m) => (
              <MenuCard key={m.id} item={m} />
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
