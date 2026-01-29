"use client"

import { useEffect, useRef, type ReactNode } from "react"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"

gsap.registerPlugin(ScrollTrigger)

interface ScrollRevealProps {
  children: ReactNode
  direction?: "up" | "down" | "left" | "right"
  duration?: number
  delay?: number
  distance?: number
  className?: string
  start?: string
  scale?: number
  rotate?: number
}

export function ScrollReveal({
  children,
  direction = "up",
  duration = 1,
  delay = 0,
  distance = 50,
  className = "",
  start = "top 85%",
  scale = 1,
  rotate = 0,
}: ScrollRevealProps) {
  const elementRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const element = elementRef.current
    if (!element) return

    const getInitialState = () => {
      const base: gsap.TweenVars = { opacity: 0, scale: scale < 1 ? scale : 1, rotate }
      switch (direction) {
        case "up":
          return { ...base, y: distance }
        case "down":
          return { ...base, y: -distance }
        case "left":
          return { ...base, x: distance }
        case "right":
          return { ...base, x: -distance }
      }
    }

    const ctx = gsap.context(() => {
      gsap.fromTo(element, getInitialState(), {
        y: 0,
        x: 0,
        opacity: 1,
        scale: 1,
        rotate: 0,
        duration,
        delay,
        ease: "power3.out",
        scrollTrigger: {
          trigger: element,
          start,
          toggleActions: "play none none none",
        },
      })
    })

    return () => ctx.revert()
  }, [direction, duration, delay, distance, start, scale, rotate])

  return (
    <div ref={elementRef} className={className}>
      {children}
    </div>
  )
}
