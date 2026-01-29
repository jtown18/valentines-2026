"use client";

import { ScrollReveal } from "@/components/scroll-reveal";

export function HeroSection() {
  return (
    <section className="flex min-h-screen flex-col items-center justify-center px-6">
      <ScrollReveal direction="up" duration={1.2}>
        <p className="mb-4 text-sm font-medium uppercase tracking-widest text-muted-foreground italic">
          from pong to beng~
        </p>
      </ScrollReveal>
      <ScrollReveal direction="up" duration={1.2} delay={0.1}>
        <h1 className="text-balance text-center font-sans text-6xl font-bold leading-[1.1] tracking-tight md:text-8xl lg:text-9xl">
          Happy
          <br />
          <span className="text-red-500">valentines </span>
          <br />
          <span>day!</span>
        </h1>
      </ScrollReveal>
      <ScrollReveal direction="up" delay={0.5}>
        <div className="mt-12 flex animate-bounce flex-col items-center">
          <span className="mb-2 text-xs uppercase tracking-widest text-muted-foreground">
            Scroll
          </span>
          <svg
            className="h-6 w-6 text-muted-foreground"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M19 14l-7 7m0 0l-7-7m7 7V3"
            />
          </svg>
        </div>
      </ScrollReveal>
    </section>
  );
}
