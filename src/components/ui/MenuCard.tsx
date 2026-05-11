"use client";
import Image from "next/image";
import Link from "next/link";
import { MenuItem } from "@/types/index";
import { formatCurrency } from "@/utils/format";
import Button from "./Button";

interface MenuCardProps {
  item: MenuItem;
  onAdd?: (item: MenuItem) => void;
}

export default function MenuCard({ item, onAdd }: MenuCardProps) {
  return (
    <div className="group bg-white rounded-2xl border border-gray-200 overflow-hidden hover:shadow-lg transition-shadow flex flex-col">
      <Link
        href={`/menu/${item.id}`}
        className="relative h-48 bg-gray-100 block"
      >
        <Image
          src={item.image}
          alt={item.name}
          fill
          className="object-cover group-hover:scale-105 transition-transform duration-300"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />
        <span className="absolute top-3 left-3 px-2 py-1 bg-white/90 backdrop-blur rounded-md text-xs font-medium text-gray-700">
          {item.category}
        </span>
      </Link>
      <div className="p-4 flex-1 flex flex-col">
        <Link href={`/menu/${item.id}`}>
          <h3 className="font-semibold text-gray-900 line-clamp-1 hover:text-orange-500 transition-colors">
            {item.name}
          </h3>
        </Link>
        {item.description && (
          <p className="mt-1 text-sm text-gray-500 line-clamp-2">
            {item.description}
          </p>
        )}
        <div className="mt-3 flex items-center justify-between gap-2">
          <span className="text-orange-500 font-bold text-lg">
            {formatCurrency(item.price)}
          </span>
          {onAdd && (
            <Button size="sm" onClick={() => onAdd(item)}>
              + Thêm nhanh
            </Button>
          )}
        </div>
      </div>
    </div>
  );
}
