"use client";

import { HeroSection } from "@/components/hero-section";
import { LetterSection } from "@/components/letter-section";
import { ImageGallery } from "@/components/image-gallery";
import { ValentineSection } from "@/components/valentines-section";
import { ImagePreloader } from "@/components/image-preloader";

export default function Home() {
  return (
    <ImagePreloader>
      <div className="min-h-screen bg-background text-foreground">
        <HeroSection />
        <LetterSection />
        <ImageGallery />
        <ValentineSection />
      </div>
    </ImagePreloader>
  );
}
