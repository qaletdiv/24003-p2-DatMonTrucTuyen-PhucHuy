"use client";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import MenuCard from "@/components/ui/MenuCard";
import Button from "@/components/ui/Button";
import { useAuth } from "@/context/AuthContext";
import { useCart } from "@/context/CartContext";
import { useToast } from "@/context/ToastContext";
import { useRouter } from "next/navigation";
import type { MenuItem } from "@/types";

const banners = [
  {
    title: "Order Delicious Food - Delivered to Your Door",
    subtitle: "Over 100 signature dishes served within 30 minutes.",
    image:
      "https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=1600",
    cta: "Order Now",
    href: "/menu",
  },
  {
    title: "May Deals - 30% Off",
    subtitle: "Applies to the entire menu when ordering online.",
    image:
      "https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=1600",
    cta: "View Deals",
    href: "/news",
  },
  {
    title: "Weekend Family Combo",
    subtitle: "Save over 25% with combos for 2–4 people.",
    image:
      "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=1600",
    cta: "Explore Now",
    href: "/menu",
  },
];

export default function Home() {
  const [slide, setSlide] = useState(0);
  const { isAuthenticated } = useAuth();
  const [specialMeals, setSpecialMeals] = useState<MenuItem[]>([]);
  const [isSpecialMealsLoading, setIsSpecialMealsLoading] = useState(true);
  const { addItem } = useCart();
  const { showToast } = useToast();

  const router = useRouter();

  useEffect(() => {
    const id = setInterval(() => {
      setSlide((s) => (s + 1) % banners.length);
    }, 5000);
    return () => clearInterval(id);
  }, []);

  useEffect(() => {
    const fetchSpecialMeals = async () => {
      try {
        const response = await fetch("/api/special-meals");
        if (!response.ok) {
          throw new Error("Failed to load special offers");
        }
        const data: MenuItem[] = await response.json();
        setSpecialMeals(data);
      } catch {
      } finally {
        setIsSpecialMealsLoading(false);
      }
    };

    fetchSpecialMeals();
  }, []);

  const handleQuickAdd = (item: MenuItem) => {
    if (!isAuthenticated) {
      showToast("Please log in to add items to your cart.", "info");
      router.push("/login");
      return;
    }
    addItem(item, 1);
    showToast(`Added "${item.name}" to your cart.`);
  };

  return (
    <div>
      <section className="relative h-[420px] md:h-[520px] overflow-hidden">
        {banners.map((b, i) => (
          <div
            key={i}
            className={`absolute inset-0 transition-opacity duration-700 ${
              i === slide ? "opacity-100" : "opacity-0"
            }`}
          >
            <Image
              src={b.image}
              alt={b.title}
              fill
              priority={i === 0}
              className="object-cover"
              sizes="100vw"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/40 to-transparent" />
            <div className="relative max-w-7xl mx-auto h-full px-4 sm:px-6 lg:px-8 flex items-center">
              <div className="max-w-xl text-white">
                <h1 className="text-4xl md:text-5xl font-extrabold leading-tight">
                  {b.title}
                </h1>
                <p className="mt-4 text-lg text-white/90">{b.subtitle}</p>
                <div className="mt-6">
                  <Link href={b.href}>
                    <Button size="lg">{b.cta}</Button>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        ))}

        <div className="absolute bottom-5 left-0 right-0 flex justify-center gap-2 z-10">
          {banners.map((_, i) => (
            <button
              key={i}
              onClick={() => setSlide(i)}
              aria-label={`Go to banner ${i + 1}`}
              className={`h-2 rounded-full transition-all ${
                i === slide ? "w-8 bg-orange-500" : "w-2 bg-white/70"
              }`}
            />
          ))}
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid md:grid-cols-2 gap-10 items-center">
          <div className="relative h-72 md:h-96 rounded-3xl overflow-hidden">
            <Image
              src="https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=1200"
              alt="About us"
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 50vw"
            />
          </div>
          <div>
            <span className="inline-block text-orange-500 font-semibold mb-2">
              About Us
            </span>
            <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900">
              Vietnamese Flavors - International Standards
            </h2>
            <p className="mt-4 text-gray-600 leading-relaxed">
              FoodOrder was founded with a mission to bring delicious, safe, and
              convenient meals to every family. We are committed to using fresh
              ingredients, strict food preparation standards, and a professional
              delivery team.
            </p>
            <ul className="mt-6 space-y-2 text-gray-700">
              <li className="flex items-start gap-2">
                <span className="mt-1 text-orange-500">✓</span> Over 100+
                signature dishes from Vietnam and around the world.
              </li>
              <li className="flex items-start gap-2">
                <span className="mt-1 text-orange-500">✓</span> Fast delivery
                within 30 minutes.
              </li>
              <li className="flex items-start gap-2">
                <span className="mt-1 text-orange-500">✓</span> Guaranteed food
                safety and hygiene.
              </li>
            </ul>
          </div>
        </div>
      </section>

      <section className="bg-gray-50 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-end justify-between mb-8">
            <div>
              <span className="inline-block text-orange-500 font-semibold mb-1">
                Best Sellers
              </span>
              <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900">
                Featured Products
              </h2>
            </div>
            <Link
              href="/menu"
              className="hidden sm:inline-flex text-orange-500 font-semibold hover:underline"
            >
              View All →
            </Link>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {specialMeals.map((item) => (
              <MenuCard key={item.id} item={item} onAdd={handleQuickAdd} />
            ))}
          </div>
          <div className="mt-8 text-center sm:hidden">
            <Link href="/menu">
              <Button variant="outline">View Full Menu</Button>
            </Link>
          </div>
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid md:grid-cols-2 gap-6">
          <Link
            href="/menu"
            className="relative h-56 rounded-3xl overflow-hidden group"
          >
            <Image
              src="https://images.unsplash.com/photo-1565958011703-44f9829ba187?w=1200"
              alt="Menu list"
              fill
              className="object-cover group-hover:scale-105 transition-transform duration-500"
              sizes="(max-width: 768px) 100vw, 50vw"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-black/60 to-transparent" />
            <div className="absolute inset-0 p-8 flex flex-col justify-center text-white">
              <span className="uppercase text-xs tracking-widest text-orange-300">
                Order Food
              </span>
              <h3 className="mt-2 text-2xl md:text-3xl font-bold">
                Menu & Special Offers
              </h3>
              <span className="mt-3 inline-flex text-sm font-semibold">
                Explore Now →
              </span>
            </div>
          </Link>

          <Link
            href="/stores"
            className="relative h-56 rounded-3xl overflow-hidden group"
          >
            <Image
              src="https://images.unsplash.com/photo-1551183053-bf91a1d81141?w=1200"
              alt="Store locations"
              fill
              className="object-cover group-hover:scale-105 transition-transform duration-500"
              sizes="(max-width: 768px) 100vw, 50vw"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-black/60 to-transparent" />
            <div className="absolute inset-0 p-8 flex flex-col justify-center text-white">
              <span className="uppercase text-xs tracking-widest text-orange-300">
                You May Like
              </span>
              <h3 className="mt-2 text-2xl md:text-3xl font-bold">
                Nationwide Store Network
              </h3>
              <span className="mt-3 inline-flex text-sm font-semibold">
                Find a Branch Near You →
              </span>
            </div>
          </Link>
        </div>
      </section>
    </div>
  );
}
