"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

interface FadeInImageProps {
  src: string;
  alt: string;
  onClick: () => void;
}

export function FadeInImage({ src, alt, onClick }: FadeInImageProps) {
  const imageRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!imageRef.current) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        imageRef.current,
        {
          opacity: 0,
          y: 30,
        },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: "power2.out",
          scrollTrigger: {
            trigger: imageRef.current,
            start: "top 85%",
            toggleActions: "play none none none",
          },
        }
      );
    }, imageRef);

    return () => ctx.revert();
  }, []);

  return (
    <div
      ref={imageRef}
      className="cursor-pointer overflow-hidden rounded-2xl"
      onClick={onClick}
    >
      <img
        src={src}
        alt={alt}
        className="aspect-square w-full object-cover transition-transform duration-500 hover:scale-105"
      />
    </div>
  );
}
