"use client";

import { useState } from "react";
import { ScrollReveal } from "@/components/scroll-reveal";
import { FadeInImage } from "@/components/fade-in-image";
import { ImageModal } from "@/components/image-modal";

const images = Array.from({ length: 24 }, (_, i) => ({
  src: `/memory-lane/${i + 1}.jpg`,
  alt: `Memory ${i + 1}`,
}));

export function ImageGallery() {
  const [selectedImage, setSelectedImage] = useState<{
    src: string;
    alt: string;
  } | null>(null);

  return (
    <>
      <section className="px-6 py-32">
        <div className="mx-auto max-w-7xl">
          <ScrollReveal direction="up">
            <p className="italic mb-4 text-center text-sm font-medium uppercase tracking-widest text-muted-foreground">
              Us over the years
            </p>
          </ScrollReveal>
          <ScrollReveal direction="up" delay={0.1}>
            <h2 className="mb-20 text-center text-5xl font-bold md:text-6xl">
              Trip down memory lane
            </h2>
          </ScrollReveal>

          <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
            {images.map((image, index) => (
              <FadeInImage
                key={index}
                src={image.src}
                alt={image.alt}
                onClick={() => setSelectedImage(image)}
              />
            ))}
          </div>
        </div>
      </section>

      {selectedImage && (
        <ImageModal
          src={selectedImage.src}
          alt={selectedImage.alt}
          onClose={() => setSelectedImage(null)}
        />
      )}
    </>
  );
}
