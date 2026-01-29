"use client";

import { useEffect, useState } from "react";
import { LoadingScreen } from "./loading-screen";

const imageUrls = Array.from(
  { length: 24 },
  (_, i) => `/memory-lane/${i + 1}.jpg`
);

export function ImagePreloader({ children }: { children: React.ReactNode }) {
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    let loadedCount = 0;
    const totalImages = imageUrls.length;

    const preloadImage = (url: string) => {
      return new Promise((resolve, reject) => {
        const img = new Image();
        img.src = url;
        img.onload = () => {
          loadedCount++;
          resolve(url);
        };
        img.onerror = () => {
          loadedCount++;
          resolve(url); // Still resolve to continue loading others
        };
      });
    };

    Promise.all(imageUrls.map(preloadImage)).then(() => {
      // Add a small delay for smooth transition
      setTimeout(() => {
        setIsLoaded(true);
      }, 500);
    });
  }, []);

  if (!isLoaded) {
    return <LoadingScreen />;
  }

  return <>{children}</>;
}
