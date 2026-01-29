"use client"

import { useEffect, useRef } from "react"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"

gsap.registerPlugin(ScrollTrigger)

interface TextRevealProps {
  text: string
  className?: string
  staggerDelay?: number
  splitBy?: "words" | "chars"
}

export function TextReveal({ text, className = "", staggerDelay = 0.05, splitBy = "words" }: TextRevealProps) {
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const container = containerRef.current
    if (!container) return

    const elements = container.querySelectorAll(".reveal-item")

    const ctx = gsap.context(() => {
      gsap.fromTo(
        elements,
        { y: 40, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          stagger: staggerDelay,
          ease: "power3.out",
          scrollTrigger: {
            trigger: container,
            start: "top 80%",
            toggleActions: "play none none none",
          },
        },
      )
    })

    return () => ctx.revert()
  }, [staggerDelay])

  const items = splitBy === "words" ? text.split(" ") : text.split("")

  return (
    <div ref={containerRef} className={className}>
      {items.map((item, i) => (
        <span key={i} className="reveal-item inline-block">
          {item}
          {splitBy === "words" && i < items.length - 1 && "\u00A0"}
        </span>
      ))}
    </div>
  )
}
