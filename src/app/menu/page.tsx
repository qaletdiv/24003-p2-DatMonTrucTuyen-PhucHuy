"use client";
import { useEffect, useMemo, useState } from "react";
import MenuCard from "@/components/ui/MenuCard";
import { menuItems } from "@/data/menuItems";
import { useAuth } from "@/context/AuthContext";
import { useCart } from "@/context/CartContext";
import { useToast } from "@/context/ToastContext";
import { useRouter } from "next/navigation";
import type { MenuItem } from "@/types";

export default function MenuPage() {
  const [search, setSearch] = useState("");
  const [data, setData] = useState<MenuItem[]>([]);
  const [activeCategory, setActiveCategory] = useState<string>("");
  const { isAuthenticated } = useAuth();
  const { addItem } = useCart();
  const { showToast } = useToast();
  const router = useRouter();

  const categories = useMemo(() => {
    const set = new Set(menuItems.map((m) => m.category));
    return ["", ...Array.from(set)];
  }, []);

  useEffect(() => {
    const fetchSearchMeals = async () => {
      try {
        const response = await fetch(
          `/api/search-meals?search=${search}&category=${activeCategory}`,
        );
        if (!response.ok) {
          throw new Error("Failed to load menu items");
        }
        const result: MenuItem[] = await response.json();
        setData(result);
      } catch {}
    };
    fetchSearchMeals();
  }, [search, activeCategory]);

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
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <div className="mb-8">
        <h1 className="text-3xl md:text-4xl font-extrabold text-gray-900">
          Menu & Special Offers
        </h1>
        <p className="mt-2 text-gray-600">
          Explore over 100+ favorite dishes at FoodOrder.
        </p>
      </div>

      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
        <div className="flex gap-2 overflow-x-auto pb-2 -mx-1 px-1">
          {categories.map((c) => (
            <button
              key={c}
              onClick={() => setActiveCategory(c)}
              className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-colors ${
                c === activeCategory
                  ? "bg-orange-500 text-white"
                  : "bg-gray-100 text-gray-700 hover:bg-gray-200"
              }`}
            >
              {!c ? "All" : c}
            </button>
          ))}
        </div>

        <div className="relative md:w-72">
          <svg
            className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <circle cx="11" cy="11" r="8" />
            <path d="m21 21-4.3-4.3" />
          </svg>
          <input
            type="search"
            placeholder="Search dishes..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-gray-200 focus:border-orange-400 focus:ring-2 focus:ring-orange-100 outline-none text-sm"
          />
        </div>
      </div>

      {data.length === 0 ? (
        <div className="py-20 text-center text-gray-500">
          No matching dishes found.
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {data.map((item) => (
            <MenuCard key={item.id} item={item} onAdd={handleQuickAdd} />
          ))}
        </div>
      )}
    </div>
  );
}
