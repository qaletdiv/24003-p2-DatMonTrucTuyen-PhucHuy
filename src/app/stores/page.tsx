"use client";
import { useMemo, useState } from "react";
import { stores } from "@/data/stores";

export default function StoresPage() {
  const cities = useMemo(() => {
    const set = new Set(stores.map((s) => s.city));
    return ["Tất cả", ...Array.from(set)];
  }, []);
  const [city, setCity] = useState<string>("Tất cả");

  const filtered = useMemo(() => {
    if (city === "Tất cả") return stores;
    return stores.filter((s) => s.city === city);
  }, [city]);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <div className="mb-8">
        <h1 className="text-3xl md:text-4xl font-extrabold text-gray-900">
          Hệ thống cửa hàng
        </h1>
        <p className="mt-2 text-gray-600">
          Tìm chi nhánh FoodOrder gần bạn nhất.
        </p>
      </div>

      <div className="flex gap-2 overflow-x-auto pb-4 mb-2">
        {cities.map((c) => (
          <button
            key={c}
            onClick={() => setCity(c)}
            className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-colors ${
              c === city
                ? "bg-orange-500 text-white"
                : "bg-gray-100 text-gray-700 hover:bg-gray-200"
            }`}
          >
            {c}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {filtered.map((s) => (
          <div
            key={s.id}
            className="bg-white border border-gray-200 rounded-2xl p-5 hover:shadow-md transition-shadow"
          >
            <div className="flex items-start justify-between gap-3">
              <div>
                <h3 className="font-semibold text-lg text-gray-900">
                  {s.name}
                </h3>
                <p className="text-sm text-gray-500">{s.city}</p>
              </div>
              <span className="px-2 py-1 text-xs font-medium bg-green-50 text-green-600 rounded-full">
                Đang mở cửa
              </span>
            </div>
            <div className="mt-4 space-y-2 text-sm text-gray-700">
              <p>
                <span className="font-medium">📍 Địa chỉ:</span> {s.address}
              </p>
              <p>
                <span className="font-medium">📞 Hotline:</span>{" "}
                <a
                  href={`tel:${s.phone.replace(/\s/g, "")}`}
                  className="text-orange-500 hover:underline"
                >
                  {s.phone}
                </a>
              </p>
              <p>
                <span className="font-medium">🕐 Giờ mở cửa:</span>{" "}
                {s.openingHours}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
