import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { AuthProvider } from "@/context/AuthContext";
import { CartProvider } from "@/context/CartContext";
import { OrderProvider } from "@/context/OrderContext";
import { ServiceTypeProvider } from "@/context/ServiceTypeContext";
import { ToastProvider } from "@/context/ToastContext";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "FoodOrder - Online Food Ordering",
  description:
    "Online food ordering with 100+ delicious dishes, fast delivery, and safe service.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-white text-gray-900 min-h-screen flex flex-col`}
      >
        <AuthProvider>
          <OrderProvider>
            <ServiceTypeProvider>
              <CartProvider>
                <ToastProvider>
                  <Header />
                  <main className="flex-1">{children}</main>
                  <Footer />
                </ToastProvider>
              </CartProvider>
            </ServiceTypeProvider>
          </OrderProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
