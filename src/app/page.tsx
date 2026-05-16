"use client";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import MenuCard from "@/components/ui/MenuCard";
import Button from "@/components/ui/Button";
import { menuItems } from "@/data/menuItems";
import { useAuth } from "@/context/AuthContext";
import { useCart } from "@/context/CartContext";
import { useToast } from "@/context/ToastContext";
import { useRouter } from "next/navigation";
import type { MenuItem } from "@/types";

const banners = [
  {
    title: "Đặt món ngon - Giao tận cửa",
    subtitle: "Hơn 100 món ăn đặc trưng được phục vụ trong 30 phút.",
    image:
      "https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=1600",
    cta: "Đặt món ngay",
    href: "/menu",
  },
  {
    title: "Ưu đãi tháng 5 - Giảm 30%",
    subtitle: "Áp dụng cho toàn bộ menu khi đặt món online.",
    image:
      "https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=1600",
    cta: "Xem ưu đãi",
    href: "/news",
  },
  {
    title: "Combo gia đình cuối tuần",
    subtitle: "Tiết kiệm hơn 25% với combo dành cho 2–4 người.",
    image:
      "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=1600",
    cta: "Khám phá ngay",
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

  //
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
          throw new Error("Không tải được ưu đãi");
        }
        const data: MenuItem[] = await response.json();
        setSpecialMeals(data);
      } catch (error) {
        console.error("Fetch special meals failed:", error);
      } finally {
        setIsSpecialMealsLoading(false);
      }
    };

    fetchSpecialMeals();
  }, []);

  // const featured = menuItems.slice(0, 6);

  const handleQuickAdd = (item: MenuItem) => {
    if (!isAuthenticated) {
      showToast("Vui lòng đăng nhập để thêm món vào giỏ.", "info");
      router.push("/login");
      return;
    }
    addItem(item, 1);
    showToast(`Đã thêm "${item.name}" vào giỏ hàng.`);
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
              aria-label={`Chuyển banner ${i + 1}`}
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
              alt="Về chúng tôi"
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 50vw"
            />
          </div>
          <div>
            <span className="inline-block text-orange-500 font-semibold mb-2">
              Về chúng tôi
            </span>
            <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900">
              Hương vị Việt - Chuẩn quốc tế
            </h2>
            <p className="mt-4 text-gray-600 leading-relaxed">
              FoodOrder ra đời với sứ mệnh mang đến những bữa ăn ngon, an toàn
              và tiện lợi cho mọi gia đình Việt. Chúng tôi cam kết sử dụng
              nguyên liệu tươi sạch, quy trình chế biến nghiêm ngặt và đội ngũ
              giao hàng chuyên nghiệp.
            </p>
            <ul className="mt-6 space-y-2 text-gray-700">
              <li className="flex items-start gap-2">
                <span className="mt-1 text-orange-500">✓</span> Hơn 100+ món ăn
                đặc trưng từ Việt Nam và quốc tế.
              </li>
              <li className="flex items-start gap-2">
                <span className="mt-1 text-orange-500">✓</span> Giao hàng nhanh
                trong vòng 30 phút.
              </li>
              <li className="flex items-start gap-2">
                <span className="mt-1 text-orange-500">✓</span> Đảm bảo vệ sinh
                an toàn thực phẩm.
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
                Bán chạy nhất
              </span>
              <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900">
                Sản phẩm nổi bật
              </h2>
            </div>
            <Link
              href="/menu"
              className="hidden sm:inline-flex text-orange-500 font-semibold hover:underline"
            >
              Xem tất cả →
            </Link>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {specialMeals.map((item) => (
              <MenuCard key={item.id} item={item} onAdd={handleQuickAdd} />
            ))}
          </div>
          <div className="mt-8 text-center sm:hidden">
            <Link href="/menu">
              <Button variant="outline">Xem tất cả thực đơn</Button>
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
              alt="Danh sách món ăn"
              fill
              className="object-cover group-hover:scale-105 transition-transform duration-500"
              sizes="(max-width: 768px) 100vw, 50vw"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-black/60 to-transparent" />
            <div className="absolute inset-0 p-8 flex flex-col justify-center text-white">
              <span className="uppercase text-xs tracking-widest text-orange-300">
                Đặt món
              </span>
              <h3 className="mt-2 text-2xl md:text-3xl font-bold">
                Danh sách món ăn & Ưu đãi
              </h3>
              <span className="mt-3 inline-flex text-sm font-semibold">
                Khám phá ngay →
              </span>
            </div>
          </Link>

          <Link
            href="/stores"
            className="relative h-56 rounded-3xl overflow-hidden group"
          >
            <Image
              src="https://images.unsplash.com/photo-1551183053-bf91a1d81141?w=1200"
              alt="Hệ thống cửa hàng"
              fill
              className="object-cover group-hover:scale-105 transition-transform duration-500"
              sizes="(max-width: 768px) 100vw, 50vw"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-black/60 to-transparent" />
            <div className="absolute inset-0 p-8 flex flex-col justify-center text-white">
              <span className="uppercase text-xs tracking-widest text-orange-300">
                Có thể bạn quan tâm
              </span>
              <h3 className="mt-2 text-2xl md:text-3xl font-bold">
                Hệ thống cửa hàng toàn quốc
              </h3>
              <span className="mt-3 inline-flex text-sm font-semibold">
                Xem chi nhánh gần bạn →
              </span>
            </div>
          </Link>
        </div>
      </section>
    </div>
  );
}
