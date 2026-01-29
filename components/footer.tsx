"use client";

import { ScrollReveal } from "@/components/scroll-reveal";

export function Footer() {
  return (
    <footer className="border-t border-border px-6 py-16">
      <div className="mx-auto max-w-6xl">
        <ScrollReveal direction="up">
          <div className="flex flex-col items-center justify-between gap-4 md:flex-row">
            <span className="text-xl font-bold">GSAP Reveal</span>
            <p className="text-sm text-muted-foreground">
              Built with Next.js, GSAP, and Tailwind CSS
            </p>
          </div>
        </ScrollReveal>
      </div>
    </footer>
  );
}
