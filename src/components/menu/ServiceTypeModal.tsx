"use client";
import { useState } from "react";
import { stores } from "@/data/stores";
import { useServiceType } from "@/context/ServiceTypeContext";
import { OrderType } from "@/types";
import Button from "@/components/ui/Button";

export default function ServiceTypeModal() {
  const { orderType, setOrderType, hydrated } = useServiceType();
  const [mode, setMode] = useState<"dine-in" | "pickup">("dine-in");
  const [tableNumber, setTableNumber] = useState("");
  const [branchId, setBranchId] = useState(stores[0]?.id ?? "");
  const [pickupTime, setPickupTime] = useState("");
  const [error, setError] = useState<string | null>(null);

  if (!hydrated || orderType) return null;

  const handleConfirm = () => {
    setError(null);
    let type: OrderType;

    if (mode === "dine-in") {
      if (!tableNumber.trim()) {
        setError("Please enter your table number.");
        return;
      }
      type = { type: "dine-in", tableNumber: tableNumber.trim() };
    } else {
      if (!branchId || !pickupTime) {
        setError("Please select a branch and pickup time.");
        return;
      }
      type = { type: "pickup", branchId, pickupTime };
    }

    setOrderType(type);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
      <div className="w-full max-w-lg bg-white rounded-2xl shadow-xl p-6">
        <h2 className="text-xl font-bold text-gray-900">
          Choose Service Type
        </h2>
        <p className="mt-1 text-sm text-gray-500">
          Please select how you would like to receive your order before browsing
          the menu.
        </p>

        <div className="mt-5 grid grid-cols-2 gap-3">
          <button
            type="button"
            onClick={() => setMode("dine-in")}
            className={`p-4 rounded-xl border-2 text-left transition-colors ${
              mode === "dine-in"
                ? "border-orange-500 bg-orange-50"
                : "border-gray-200 hover:border-gray-300"
            }`}
          >
            <span className="text-2xl">🍽️</span>
            <p className="mt-2 font-semibold text-gray-900">Dine-in</p>
            <p className="text-xs text-gray-500">Eat at the restaurant</p>
          </button>
          <button
            type="button"
            onClick={() => setMode("pickup")}
            className={`p-4 rounded-xl border-2 text-left transition-colors ${
              mode === "pickup"
                ? "border-orange-500 bg-orange-50"
                : "border-gray-200 hover:border-gray-300"
            }`}
          >
            <span className="text-2xl">🥡</span>
            <p className="mt-2 font-semibold text-gray-900">Pickup</p>
            <p className="text-xs text-gray-500">Pick up at a branch</p>
          </button>
        </div>

        <div className="mt-5 space-y-4">
          {mode === "dine-in" ? (
            <div>
              <label className="text-sm font-medium text-gray-700">
                Table Number
              </label>
              <input
                type="text"
                value={tableNumber}
                onChange={(e) => setTableNumber(e.target.value)}
                placeholder="e.g. 12"
                className="mt-1 w-full px-3 py-2.5 rounded-xl border border-gray-200 focus:border-orange-400 focus:ring-2 focus:ring-orange-100 outline-none text-sm"
              />
            </div>
          ) : (
            <>
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
                      {s.name} — {s.district}
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
            </>
          )}
        </div>

        {error && (
          <div className="mt-4 text-sm text-red-600 bg-red-50 border border-red-100 rounded-lg px-3 py-2">
            {error}
          </div>
        )}

        <Button size="lg" className="w-full mt-5" onClick={handleConfirm}>
          Continue to Menu
        </Button>
      </div>
    </div>
  );
}
