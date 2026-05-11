import Image from "next/image";
import Link from "next/link";
import { news } from "@/data/new";

function formatNewsDate(dateStr: string) {
  return new Date(dateStr).toLocaleDateString("vi-VN", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  });
}

export default function NewsPage() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <div className="mb-8">
        <h1 className="text-3xl md:text-4xl font-extrabold text-gray-900">
          Tin tức & Ưu đãi
        </h1>
        <p className="mt-2 text-gray-600">
          Cập nhật những thông tin và chương trình khuyến mãi mới nhất.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {news.map((n) => (
          <Link
            key={n.id}
            href={`/news/${n.id}`}
            className="group bg-white rounded-2xl border border-gray-200 overflow-hidden hover:shadow-lg transition-shadow"
          >
            <div className="relative h-48 bg-gray-100">
              <Image
                src={n.image}
                alt={n.title}
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-300"
                sizes="(max-width: 768px) 100vw, 33vw"
              />
            </div>
            <div className="p-5">
              <p className="text-xs text-gray-500 mb-2">
                {formatNewsDate(n.date)}
              </p>
              <h3 className="font-semibold text-gray-900 line-clamp-2 group-hover:text-orange-500 transition-colors">
                {n.title}
              </h3>
              <p className="mt-2 text-sm text-gray-600 line-clamp-2">
                {n.excerpt}
              </p>
              <span className="mt-3 inline-flex text-sm font-medium text-orange-500">
                Xem chi tiết →
              </span>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
