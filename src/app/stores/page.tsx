"use client";
import { useEffect, useMemo, useState } from "react";
import { stores } from "@/data/stores";
import { Store } from "@/types";

export default function StoresPage() {
  const cities = useMemo(() => {
    const set = new Set(stores.map((s) => s.city));
    return ["All", ...Array.from(set)];
  }, []);

  const [city, setCity] = useState("All");
  const [district, setDistrict] = useState("All");
  const [selectedStore, setSelectedStore] = useState<Store | null>(
    stores[0] ?? null,
  );

  const districts = useMemo(() => {
    const source =
      city === "All" ? stores : stores.filter((s) => s.city === city);
    const set = new Set(source.map((s) => s.district));
    return ["All", ...Array.from(set)];
  }, [city]);

  useEffect(() => {
    setDistrict("All");
  }, [city]);

  const filtered = useMemo(() => {
    return stores.filter((s) => {
      const matchCity = city === "All" || s.city === city;
      const matchDistrict = district === "All" || s.district === district;
      return matchCity && matchDistrict;
    });
  }, [city, district]);

  useEffect(() => {
    if (filtered.length > 0) {
      setSelectedStore(filtered[0]);
    } else {
      setSelectedStore(null);
    }
  }, [filtered]);

  const mapSrc = selectedStore
    ? `https://maps.google.com/maps?q=${selectedStore.lat},${selectedStore.lng}&z=15&output=embed`
    : null;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <div className="mb-8">
        <h1 className="text-3xl md:text-4xl font-extrabold text-gray-900">
          Store Locations
        </h1>
        <p className="mt-2 text-gray-600">
          Find the FoodOrder branch nearest to you.
        </p>
      </div>

      <div className="flex flex-col sm:flex-row gap-4 mb-8">
        <div className="flex-1">
          <label className="text-sm font-medium text-gray-700">
            City / Province
          </label>
          <select
            value={city}
            onChange={(e) => setCity(e.target.value)}
            className="mt-1 w-full px-3 py-2.5 rounded-xl border border-gray-200 focus:border-orange-400 focus:ring-2 focus:ring-orange-100 outline-none text-sm bg-white"
          >
            {cities.map((c) => (
              <option key={c} value={c}>
                {c}
              </option>
            ))}
          </select>
        </div>
        <div className="flex-1">
          <label className="text-sm font-medium text-gray-700">District</label>
          <select
            value={district}
            onChange={(e) => setDistrict(e.target.value)}
            className="mt-1 w-full px-3 py-2.5 rounded-xl border border-gray-200 focus:border-orange-400 focus:ring-2 focus:ring-orange-100 outline-none text-sm bg-white"
          >
            {districts.map((d) => (
              <option key={d} value={d}>
                {d}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="space-y-4">
          {filtered.length === 0 ? (
            <div className="py-12 text-center text-gray-500 bg-gray-50 rounded-2xl border border-gray-200">
              No stores found for the selected area.
            </div>
          ) : (
            filtered.map((s) => (
              <button
                key={s.id}
                type="button"
                onClick={() => setSelectedStore(s)}
                className={`w-full text-left bg-white border rounded-2xl p-5 transition-all ${
                  selectedStore?.id === s.id
                    ? "border-orange-500 shadow-md ring-2 ring-orange-100"
                    : "border-gray-200 hover:shadow-md hover:border-gray-300"
                }`}
              >
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <h3 className="font-semibold text-lg text-gray-900">
                      {s.name}
                    </h3>
                    <p className="text-sm text-gray-500">
                      {s.district}, {s.city}
                    </p>
                  </div>
                  <span className="px-2 py-1 text-xs font-medium bg-green-50 text-green-600 rounded-full shrink-0">
                    Open Now
                  </span>
                </div>
                <div className="mt-4 space-y-2 text-sm text-gray-700">
                  <p>
                    <span className="font-medium">📍 Address:</span> {s.address}
                  </p>
                  <p>
                    <span className="font-medium">📞 Hotline:</span>{" "}
                    <a
                      href={`tel:${s.phone.replace(/\s/g, "")}`}
                      className="text-orange-500 hover:underline"
                      onClick={(e) => e.stopPropagation()}
                    >
                      {s.phone}
                    </a>
                  </p>
                  <p>
                    <span className="font-medium">🕐 Opening Hours:</span>{" "}
                    {s.openingHours}
                  </p>
                </div>
                <a
                  href={`https://www.google.com/maps/dir/?api=1&destination=${s.lat},${s.lng}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-block mt-3 text-sm text-orange-500 font-medium hover:underline"
                  onClick={(e) => e.stopPropagation()}
                >
                  Get Directions →
                </a>
              </button>
            ))
          )}
        </div>

        <div className="lg:sticky lg:top-24 h-fit">
          <div className="bg-white border border-gray-200 rounded-2xl overflow-hidden">
            <div className="p-4 border-b border-gray-100">
              <h2 className="font-semibold text-gray-900">Map</h2>
              {selectedStore && (
                <p className="text-sm text-gray-500 mt-1">
                  {selectedStore.name}
                </p>
              )}
            </div>
            {mapSrc ? (
              <iframe
                title="Store location map"
                src={mapSrc}
                className="w-full h-[400px] border-0"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            ) : (
              <div className="h-[400px] grid place-items-center text-gray-400 bg-gray-50">
                Select a store to view on map
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
