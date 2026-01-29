"use client";

import { ScrollReveal } from "@/components/scroll-reveal";
import { TextReveal } from "@/components/text-reveal";

export function LetterSection() {
  const letter =
    "Ikaw akoang gi pangga sa tanan! And it will always be that way. I love you from the bottom of my heart! <3";
  return (
    <section className="px-6 py-32">
      <div className="mx-auto max-w-5xl">
        <ScrollReveal direction="up">
          <p className=" italic mb-6 text-sm font-medium uppercase tracking-widest text-muted-foreground">
            From the bottom of my heart
          </p>
        </ScrollReveal>
        <TextReveal
          text={letter}
          className="text-4xl font-medium leading-snug md:text-5xl lg:text-6xl"
          staggerDelay={0.04}
        />
      </div>
    </section>
  );
}
