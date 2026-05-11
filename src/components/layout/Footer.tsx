import Link from "next/link";

export default function Footer() {
  return (
    <footer className="mt-16 border-t border-gray-200 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 grid grid-cols-1 md:grid-cols-4 gap-8">
        <div>
          <div className="flex items-center gap-2 mb-3">
            <span className="w-9 h-9 rounded-xl bg-orange-500 text-white grid place-items-center font-extrabold">
              F
            </span>
            <span className="font-bold text-lg text-gray-900">
              Food<span className="text-orange-500">Order</span>
            </span>
          </div>
          <p className="text-sm text-gray-600 leading-relaxed">
            Hệ thống đặt món ăn trực tuyến với hơn 100 món hấp dẫn, giao hàng
            nhanh chóng và an toàn.
          </p>
        </div>

        <div>
          <h4 className="font-semibold text-gray-900 mb-3">Liên hệ</h4>
          <ul className="space-y-2 text-sm text-gray-600">
            <li>
              <span className="font-medium text-gray-800">Hotline:</span>{" "}
              <a href="tel:19001234" className="hover:text-orange-500">
                1900 1234
              </a>
            </li>
            <li>
              <span className="font-medium text-gray-800">Email:</span>{" "}
              <a
                href="mailto:support@foodorder.vn"
                className="hover:text-orange-500"
              >
                support@foodorder.vn
              </a>
            </li>
            <li>
              <span className="font-medium text-gray-800">Trụ sở:</span> 123
              Nguyễn Huệ, Quận 1, TP.HCM
            </li>
          </ul>
        </div>

        <div>
          <h4 className="font-semibold text-gray-900 mb-3">Liên kết nhanh</h4>
          <ul className="space-y-2 text-sm text-gray-600">
            <li>
              <Link href="/menu" className="hover:text-orange-500">
                Thực đơn
              </Link>
            </li>
            <li>
              <Link href="/news" className="hover:text-orange-500">
                Tin tức & Ưu đãi
              </Link>
            </li>
            <li>
              <Link href="/stores" className="hover:text-orange-500">
                Hệ thống cửa hàng
              </Link>
            </li>
            <li>
              <Link href="/privacy" className="hover:text-orange-500">
                Chính sách bảo mật
              </Link>
            </li>
            <li>
              <Link href="/terms" className="hover:text-orange-500">
                Điều khoản sử dụng
              </Link>
            </li>
          </ul>
        </div>

        <div>
          <h4 className="font-semibold text-gray-900 mb-3">Kết nối với chúng tôi</h4>
          <div className="flex gap-3">
            <a
              href="#"
              aria-label="Facebook"
              className="w-10 h-10 grid place-items-center rounded-full bg-white border border-gray-200 text-gray-600 hover:text-orange-500 hover:border-orange-500"
            >
              <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                <path d="M22 12a10 10 0 1 0-11.56 9.88v-6.99H7.9V12h2.54V9.8c0-2.5 1.49-3.89 3.77-3.89 1.09 0 2.24.2 2.24.2v2.46h-1.26c-1.24 0-1.63.77-1.63 1.56V12h2.77l-.44 2.89h-2.33v6.99A10 10 0 0 0 22 12Z" />
              </svg>
            </a>
            <a
              href="#"
              aria-label="Instagram"
              className="w-10 h-10 grid place-items-center rounded-full bg-white border border-gray-200 text-gray-600 hover:text-orange-500 hover:border-orange-500"
            >
              <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 2.2c3.2 0 3.58.01 4.85.07 1.17.05 1.8.25 2.23.41.56.22.96.48 1.38.9.42.42.68.82.9 1.38.16.42.36 1.06.41 2.23.06 1.26.07 1.65.07 4.85s-.01 3.58-.07 4.85c-.05 1.17-.25 1.8-.41 2.23-.22.56-.48.96-.9 1.38-.42.42-.82.68-1.38.9-.42.16-1.06.36-2.23.41-1.26.06-1.65.07-4.85.07s-3.58-.01-4.85-.07c-1.17-.05-1.8-.25-2.23-.41-.56-.22-.96-.48-1.38-.9a3.72 3.72 0 0 1-.9-1.38c-.16-.42-.36-1.06-.41-2.23C2.21 15.58 2.2 15.2 2.2 12s.01-3.58.07-4.85c.05-1.17.25-1.8.41-2.23.22-.56.48-.96.9-1.38.42-.42.82-.68 1.38-.9.42-.16 1.06-.36 2.23-.41C8.42 2.21 8.8 2.2 12 2.2Zm0 1.8c-3.15 0-3.51.01-4.74.07-1.05.05-1.62.22-2 .37-.5.2-.86.43-1.24.81-.38.38-.61.74-.81 1.24-.15.38-.32.95-.37 2C2.8 9.49 2.8 9.85 2.8 13s.01 3.51.07 4.74c.05 1.05.22 1.62.37 2 .2.5.43.86.81 1.24.38.38.74.61 1.24.81.38.15.95.32 2 .37 1.23.06 1.59.07 4.74.07s3.51-.01 4.74-.07c1.05-.05 1.62-.22 2-.37.5-.2.86-.43 1.24-.81.38-.38.61-.74.81-1.24.15-.38.32-.95.37-2 .06-1.23.07-1.59.07-4.74s-.01-3.51-.07-4.74c-.05-1.05-.22-1.62-.37-2a3.34 3.34 0 0 0-.81-1.24 3.34 3.34 0 0 0-1.24-.81c-.38-.15-.95-.32-2-.37C15.51 4.01 15.15 4 12 4Zm0 3.06a4.94 4.94 0 1 1 0 9.88 4.94 4.94 0 0 1 0-9.88Zm0 1.8a3.14 3.14 0 1 0 0 6.28 3.14 3.14 0 0 0 0-6.28Zm5.06-1.36a1.16 1.16 0 1 1 0 2.32 1.16 1.16 0 0 1 0-2.32Z" />
              </svg>
            </a>
            <a
              href="#"
              aria-label="YouTube"
              className="w-10 h-10 grid place-items-center rounded-full bg-white border border-gray-200 text-gray-600 hover:text-orange-500 hover:border-orange-500"
            >
              <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                <path d="M23.5 6.2a3 3 0 0 0-2.1-2.12C19.5 3.6 12 3.6 12 3.6s-7.5 0-9.4.48A3 3 0 0 0 .5 6.2C0 8.1 0 12 0 12s0 3.9.5 5.8a3 3 0 0 0 2.1 2.12c1.9.48 9.4.48 9.4.48s7.5 0 9.4-.48a3 3 0 0 0 2.1-2.12c.5-1.9.5-5.8.5-5.8s0-3.9-.5-5.8ZM9.6 15.6V8.4l6.2 3.6-6.2 3.6Z" />
              </svg>
            </a>
            <a
              href="#"
              aria-label="TikTok"
              className="w-10 h-10 grid place-items-center rounded-full bg-white border border-gray-200 text-gray-600 hover:text-orange-500 hover:border-orange-500"
            >
              <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                <path d="M19.6 6.7a5.4 5.4 0 0 1-3.27-1.1 5.4 5.4 0 0 1-2.1-3.5H10.7v12.55a2.86 2.86 0 1 1-2-2.73v-3.4a6.27 6.27 0 1 0 5.4 6.2V9.45a8.9 8.9 0 0 0 5.5 1.87V7.9a5.46 5.46 0 0 1-0-0Z" />
              </svg>
            </a>
          </div>
        </div>
      </div>

      <div className="border-t border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex flex-col sm:flex-row items-center justify-between gap-2 text-xs text-gray-500">
          <p>© {new Date().getFullYear()} FoodOrder. Mọi quyền được bảo lưu.</p>
          <div className="flex gap-4">
            <Link href="/privacy" className="hover:text-orange-500">
              Chính sách bảo mật
            </Link>
            <Link href="/terms" className="hover:text-orange-500">
              Điều khoản sử dụng
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
