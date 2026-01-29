"use client";

import { useEffect, useState } from "react";
import { useRouter, usePathname } from "next/navigation";

export function AuthGuard({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const pathname = usePathname();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Skip auth check for login page
    if (pathname === "/login") {
      setIsAuthenticated(true);
      setIsLoading(false);
      return;
    }

    // Check for auth token and expiration
    const token = localStorage.getItem("authToken");
    const expiresAt = localStorage.getItem("authTokenExpiry");

    if (!token || !expiresAt) {
      localStorage.removeItem("authToken");
      localStorage.removeItem("authTokenExpiry");
      router.push("/login");
    } else if (Date.now() > parseInt(expiresAt)) {
      // Token expired
      localStorage.removeItem("authToken");
      localStorage.removeItem("authTokenExpiry");
      router.push("/login");
    } else {
      setIsAuthenticated(true);
    }

    setIsLoading(false);
  }, [pathname, router]);

  if (isLoading) {
    return (
      <div className="fixed inset-0 flex items-center justify-center bg-background">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-red-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-muted-foreground">Loading...</p>
        </div>
      </div>
    );
  }

  if (!isAuthenticated && pathname !== "/login") {
    return null;
  }

  return <>{children}</>;
}
