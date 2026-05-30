"use client";
import { useEffect } from "react";
import { usePathname, useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";

export function useRequireAuth(redirectPath?: string) {
  const { isAuthenticated, authLoaded } = useAuth();
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    if (!authLoaded) return;
    if (!isAuthenticated) {
      const target = redirectPath ?? pathname;
      router.replace(`/login?callbackUrl=${encodeURIComponent(target)}`);
    }
  }, [authLoaded, isAuthenticated, router, redirectPath, pathname]);

  return { isAuthenticated, authLoaded };
}
