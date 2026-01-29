"use client";

import { useEffect, useRef, useState } from "react";
import { TextReveal } from "@/components/text-reveal";
import gsap from "gsap";

export default function SuccessPage() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [formData, setFormData] = useState<{
    email: string;
    date: string;
    time: string;
    activity: string;
  } | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [videoLoaded, setVideoLoaded] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);

    // Get form data from sessionStorage
    const data = sessionStorage.getItem("valentineFormData");
    if (data) {
      setFormData(JSON.parse(data));
    }

    // Fallback timeout - stop loading after 3 seconds regardless
    const timeout = setTimeout(() => {
      setIsLoading(false);
    }, 3000);

    return () => clearTimeout(timeout);
  }, []);

  useEffect(() => {
    // Only stop loading when both conditions are met
    if (formData && videoLoaded) {
      setTimeout(() => {
        setIsLoading(false);

        // Animate after loading is complete
        if (containerRef.current) {
          gsap.fromTo(
            containerRef.current,
            {
              opacity: 0,
              y: 30,
            },
            {
              opacity: 1,
              y: 0,
              duration: 1,
              ease: "power2.out",
            }
          );
        }

        if (videoRef.current) {
          gsap.fromTo(
            videoRef.current,
            {
              scale: 0.8,
              opacity: 0,
            },
            {
              scale: 1,
              opacity: 1,
              duration: 1.2,
              delay: 0.3,
              ease: "back.out(1.7)",
            }
          );
        }
      }, 500);
    }
  }, [formData, videoLoaded]);

  const handleVideoLoad = () => {
    setVideoLoaded(true);
  };

  if (isLoading) {
    return (
      <div className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-background">
        <div className="mb-8 text-center">
          <h2 className="text-4xl font-bold mb-2">
            Loading your date details...
          </h2>
          <p className="text-muted-foreground">Just a moment ❤️</p>
        </div>

        <div className="w-64 h-2 bg-muted rounded-full overflow-hidden">
          <div className="h-full bg-red-500 animate-pulse w-full" />
        </div>

        {/* Preload video in background */}
        <video className="hidden" preload="auto" onLoadedData={handleVideoLoad}>
          <source src="/video/vid1.mp4" type="video/mp4" />
          <source src="/video/vid1.webm" type="video/webm" />
        </video>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background text-foreground">
      <section className="px-6 py-20">
        <div ref={containerRef} className="mx-auto max-w-4xl text-center">
          <TextReveal
            text="See you soon for our date! 💕"
            className="mb-12 text-4xl font-medium leading-snug text-red-500 md:text-5xl lg:text-6xl"
            staggerDelay={0.03}
          />

          {mounted && formData && (
            <div className="mb-12 rounded-2xl border border-border bg-card p-6">
              <h3 className="mb-4 text-xl font-semibold">Date Details:</h3>
              <div className="space-y-2 text-muted-foreground">
                <p>
                  <strong>Date:</strong>{" "}
                  {new Date(formData.date).toLocaleDateString()}
                </p>
                <p>
                  <strong>Time:</strong> {formData.time}
                </p>
                <p>
                  <strong>Activity:</strong> {formData.activity}
                </p>
              </div>
            </div>
          )}

          <h2 className="mb-8 text-2xl font-semibold md:text-3xl">
            Here's a recent cute video of us! 🎥
          </h2>

          <div className="mx-auto max-w-3xl">
            <video
              ref={videoRef}
              controls
              autoPlay
              loop
              muted
              className="w-full rounded-2xl shadow-2xl"
            >
              <source src="/video/vid1.mp4" type="video/mp4" />
              <source src="/video/vid1.webm" type="video/webm" />
              Your browser does not support the video tag.
            </video>
          </div>

          <p className="mt-12 text-xl text-muted-foreground">
            Can't wait to make more memories with you! ❤️
          </p>

          <a
            href="/"
            className="mt-8 inline-block rounded-full bg-red-500 px-8 py-3 text-lg font-semibold text-white transition-colors hover:bg-red-600"
          >
            Back to Home
          </a>
        </div>
      </section>
    </div>
  );
}
