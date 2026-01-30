"use client";

import { useState, useRef, useEffect } from "react";
import { TextReveal } from "@/components/text-reveal";
import { ScrollReveal } from "@/components/scroll-reveal";
import gsap from "gsap";

export function ValentineSection() {
  const [answered, setAnswered] = useState(false);
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [noClickCount, setNoClickCount] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    date: "",
    time: "",
    activity: "",
  });
  const noButtonRef = useRef<HTMLButtonElement>(null);
  const yesButtonRef = useRef<HTMLButtonElement>(null);
  const confettiRef = useRef<HTMLDivElement>(null);
  const formRef = useRef<HTMLDivElement>(null);

  const noButtonTexts = [
    "No",
    "Are you sure?",
    "Really?",
    "Think again!",
    "Please?",
    "Pretty please?",
    "You'll break my heart 💔",
    "Last chance!",
  ];

  useEffect(() => {
    if (answered && confettiRef.current) {
      // Create confetti effect
      const confettiCount = 50;
      for (let i = 0; i < confettiCount; i++) {
        const confetti = document.createElement("div");
        confetti.className = "absolute w-2 h-2 rounded-full";
        confetti.style.backgroundColor = ["#ef4444", "#ec4899", "#f43f5e"][
          Math.floor(Math.random() * 3)
        ];
        confetti.style.left = "50%";
        confetti.style.top = "50%";
        confettiRef.current?.appendChild(confetti);

        gsap.to(confetti, {
          x: (Math.random() - 0.5) * 400,
          y: (Math.random() - 0.5) * 400,
          opacity: 0,
          duration: 1.5,
          ease: "power2.out",
          onComplete: () => confetti.remove(),
        });
      }
    }
  }, [answered]);

  const handleNoClick = () => {
    if (noClickCount < noButtonTexts.length - 1) {
      setNoClickCount(noClickCount + 1);
    }

    if (noButtonRef.current && yesButtonRef.current) {
      // Move No button to random position
      const x = (Math.random() - 0.5) * 200;
      const y = (Math.random() - 0.5) * 200;

      gsap.to(noButtonRef.current, {
        x,
        y,
        duration: 0.3,
        ease: "power2.out",
      });

      // Make Yes button bigger
      const newScale = 1 + (noClickCount + 1) * 0.15;
      gsap.to(yesButtonRef.current, {
        scale: newScale,
        duration: 0.3,
        ease: "back.out",
      });
    }
  };

  const handleYesClick = () => {
    if (yesButtonRef.current) {
      gsap.to(yesButtonRef.current, {
        scale: 1.3,
        duration: 0.2,
        yoyo: true,
        repeat: 1,
        ease: "power2.inOut",
      });
    }
    setTimeout(() => setAnswered(true), 400);
  };

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      // Send email via API
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        // Store form data in sessionStorage
        sessionStorage.setItem("valentineFormData", JSON.stringify(formData));

        // Animate form out before redirect
        if (formRef.current) {
          gsap.to(formRef.current, {
            scale: 0.95,
            opacity: 0,
            duration: 0.5,
            ease: "power2.in",
            onComplete: () => {
              // Redirect to success page
              window.location.href = "/success";
            },
          });
        } else {
          window.location.href = "/success";
        }
      } else {
        alert("Failed to send email. Please try again.");
        setIsLoading(false);
      }
    } catch (error) {
      console.error("Error:", error);
      alert("Failed to send email. Please try again.");
      setIsLoading(false);
    }
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  if (formSubmitted) {
    return (
      <section className="relative px-6 pt-40 pb-80">
        <div className="mx-auto max-w-5xl text-center">
          <TextReveal
            text="Perfect! Can't wait! 💕"
            className="text-3xl font-medium leading-snug text-red-500 md:text-4xl lg:text-5xl"
            staggerDelay={0.03}
          />
          <TextReveal
            text="See you then! ❤️"
            className="mt-8 text-xl text-muted-foreground"
            staggerDelay={0.04}
          />
        </div>
      </section>
    );
  }

  if (answered) {
    return (
      <section className="relative px-6 pt-15 pb-30">
        <div
          ref={confettiRef}
          className="pointer-events-none absolute inset-0"
        />
        <div className="mx-auto max-w-2xl">
          <TextReveal
            text="Yay! 💕"
            className="mb-8 text-center text-4xl font-bold text-red-500"
            staggerDelay={0.05}
          />
          <TextReveal
            text="Let's plan our special day!"
            className="mb-12 text-center text-xl text-muted-foreground"
            staggerDelay={0.04}
          />

          <div ref={formRef}>
            <form onSubmit={handleFormSubmit} className="space-y-6">
              <div>
                <label
                  htmlFor="email"
                  className="mb-2 block text-sm font-medium"
                >
                  Your Email
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  required
                  className="w-full rounded-lg border border-border bg-background px-4 py-3 focus:outline-none focus:ring-2 focus:ring-red-500"
                  placeholder="your@email.com"
                />
              </div>

              <div className="grid gap-6 md:grid-cols-2">
                <div>
                  <label
                    htmlFor="date"
                    className="mb-2 block text-sm font-medium"
                  >
                    Date
                  </label>
                  <input
                    type="date"
                    id="date"
                    name="date"
                    value={formData.date}
                    onChange={handleInputChange}
                    required
                    className="w-full rounded-lg border border-border bg-background px-4 py-3 focus:outline-none focus:ring-2 focus:ring-red-500"
                  />
                </div>

                <div>
                  <label
                    htmlFor="time"
                    className="mb-2 block text-sm font-medium"
                  >
                    Time
                  </label>
                  <input
                    type="time"
                    id="time"
                    name="time"
                    value={formData.time}
                    onChange={handleInputChange}
                    required
                    className="w-full rounded-lg border border-border bg-background px-4 py-3 focus:outline-none focus:ring-2 focus:ring-red-500"
                  />
                </div>
              </div>

              <div>
                <label
                  htmlFor="activity"
                  className="mb-2 block text-sm font-medium"
                >
                  What do you want to do that day?
                </label>
                <textarea
                  id="activity"
                  name="activity"
                  value={formData.activity}
                  onChange={handleInputChange}
                  required
                  rows={4}
                  className="w-full rounded-lg border border-border bg-background px-4 py-3 focus:outline-none focus:ring-2 focus:ring-red-500"
                  placeholder="Tell me what you'd like to do..."
                />
              </div>
              <button
                type="submit"
                disabled={isLoading}
                className="w-full rounded-full bg-red-500 px-12 py-4 text-xl font-bold text-white transition-colors hover:bg-red-600 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
              >
                {isLoading ? (
                  <>
                    <svg
                      className="animate-spin h-5 w-5 text-white"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                      ></circle>
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                      ></path>
                    </svg>
                    <span>Sending...</span>
                  </>
                ) : (
                  "Submit"
                )}
              </button>
            </form>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="px-6 pt-40 pb-80">
      <div className="mx-auto max-w-5xl text-center">
        <h2 className="mb-12 text-4xl font-bold md:text-5xl lg:text-6xl">
          <TextReveal
            text="Will you still be my valentine"
            className="leading-tight"
            staggerDelay={0.05}
          />
          <TextReveal
            text="this year? 💝"
            className="mt-2 text-red-500"
            staggerDelay={0.05}
          />
        </h2>

        <ScrollReveal
          direction="up"
          duration={0.9}
          delay={0.1}
          distance={40}
          scale={0.97}
        >
          <div className="relative mt-16 flex items-center justify-center gap-8">
            <button
              ref={yesButtonRef}
              onClick={handleYesClick}
              className="rounded-full bg-red-500 px-12 py-4 text-xl font-bold text-white transition-colors hover:bg-red-600"
            >
              Yes!
            </button>

            <button
              ref={noButtonRef}
              onClick={handleNoClick}
              className="relative rounded-full bg-muted px-12 py-4 text-xl font-bold text-foreground transition-colors hover:bg-muted/80"
            >
              {noButtonTexts[noClickCount]}
            </button>
          </div>
        </ScrollReveal>

        <ScrollReveal direction="up" duration={0.7} delay={0.2} distance={24}>
          {noClickCount > 3 ? (
            <TextReveal
              text="The Yes button is getting bigger for a reason 👀"
              className="mt-8 text-sm text-muted-foreground"
              staggerDelay={0.03}
            />
          ) : (
            <div className="mt-8" />
          )}
        </ScrollReveal>
      </div>
    </section>
  );
}
