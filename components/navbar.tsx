"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"

export function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const router = useRouter()

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50)
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const handleLogout = () => {
    localStorage.removeItem("authToken")    localStorage.removeItem("authTokenExpiry");    sessionStorage.clear()
    router.push("/login")
  }

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? "bg-background/80 backdrop-blur-md border-b border-border" : ""
      }`}
    >
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
        <span className="text-xl font-bold tracking-tight">GSAP Reveal</span>
        <div className="flex items-center gap-8">
          <a href="#demos" className="text-sm text-muted-foreground transition-colors hover:text-foreground">
            Demos
          </a>
          <a href="#features" className="text-sm text-muted-foreground transition-colors hover:text-foreground">
            Features
          </a>
          <a href="#about" className="text-sm text-muted-foreground transition-colors hover:text-foreground">
            About
          </a>
          <button 
            onClick={handleLogout}
            className="text-sm text-red-500 transition-colors hover:text-red-600 font-medium"
          >
            Logout
          </button>
        </div>
      </div>
    </nav>
  )
}
