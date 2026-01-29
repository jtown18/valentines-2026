"use client"

import { useEffect, useRef } from "react"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { SplitText } from "gsap/SplitText"

gsap.registerPlugin(ScrollTrigger, SplitText)

interface SplitTextRevealProps {
  children: string
  stagger?: number
  duration?: number
  className?: string
  splitBy?: "chars" | "words" | "lines"
}

export function SplitTextReveal({
  children,
  stagger = 0.02,
  duration = 0.8,
  className = "",
  splitBy = "chars",
}: SplitTextRevealProps) {
  const textRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const element = textRef.current
    if (!element) return

    const split = new SplitText(element, { type: splitBy })

    gsap.fromTo(
      split[splitBy],
      { opacity: 0, y: 20 },
      {
        opacity: 1,
        y: 0,
        duration,
        stagger,
        ease: "power3.out",
        scrollTrigger: {
          trigger: element,
          start: "top 80%",
          toggleActions: "play none none none",
        },
      },
    )

    return () => {
      split.revert()
    }
  }, [children, stagger, duration, splitBy])

  return (
    <div ref={textRef} className={className}>
      {children}
    </div>
  )
}
