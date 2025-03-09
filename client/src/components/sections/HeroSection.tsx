"use client"

import type React from "react"
import { useEffect } from "react"
import AnimatedButton from "../../components/ui/AnimatedButton"

const HeroSection: React.FC = () => {
  useEffect(() => {
    // Initialize animation
    const animateElements = () => {
      const elements = document.querySelectorAll(".animate-on-scroll")
      elements.forEach((element, index) => {
        setTimeout(() => {
          element.classList.add("animate-fade-up")
        }, index * 100)
      })
    }

    // Add animation after a short delay to ensure smooth entry
    const timer = setTimeout(() => {
      animateElements()
    }, 100)

    return () => clearTimeout(timer)
  }, [])

  return (
    <section className="relative pt-32 pb-20 md:pt-40 md:pb-28 overflow-hidden">
      {/* Background elements */}
      <div className="absolute top-0 right-0 -translate-y-1/4 translate-x-1/4 w-2/3 h-2/3 rounded-full bg-accent/5 blur-3xl"></div>
      <div className="absolute bottom-0 left-0 translate-y-1/4 -translate-x-1/4 w-2/3 h-2/3 rounded-full bg-primary/5 blur-3xl"></div>

      <div className="container relative">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-8 items-center">
          {/* Text content */}
          <div className="flex flex-col gap-6 max-w-xl">
            <span className="text-sm font-medium px-4 py-1.5 bg-accent/10 text-accent rounded-full w-fit opacity-0 animate-on-scroll">
              Organize Your Digital Knowledge
            </span>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-display font-bold leading-tight opacity-0 animate-on-scroll">
              Your <span className="text-gradient">Second Brain</span> for Digital Knowledge
            </h1>
            <p className="text-xl text-muted-foreground text-balance opacity-0 animate-on-scroll">
              Save, organize, and access your digital content in one place. Stop forgetting valuable information and
              start connecting ideas.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 mt-4 opacity-0 animate-on-scroll">
              <AnimatedButton size="lg" className="font-medium">
                Start Organizing Today - It's Free
              </AnimatedButton>
              <AnimatedButton variant="outline" size="lg" className="font-medium">
                Watch Demo
              </AnimatedButton>
            </div>

            <div className="flex items-center gap-4 mt-4 text-sm text-muted-foreground opacity-0 animate-on-scroll">
              <div className="flex -space-x-3">
                <div className="w-8 h-8 rounded-full bg-primary-100 flex items-center justify-center text-[10px] font-medium border-2 border-background text-primary-700">
                  RS
                </div>
                <div className="w-8 h-8 rounded-full bg-accent-100 flex items-center justify-center text-[10px] font-medium border-2 border-background text-accent-700">
                  JD
                </div>
                <div className="w-8 h-8 rounded-full bg-green-100 flex items-center justify-center text-[10px] font-medium border-2 border-background text-green-700">
                  AS
                </div>
                <div className="w-8 h-8 rounded-full bg-amber-100 flex items-center justify-center text-[10px] font-medium border-2 border-background text-amber-700">
                  +
                </div>
              </div>
              <span>Joined by 10,000+ knowledge workers</span>
            </div>
          </div>

          {/* Hero image */}
          <div className="relative opacity-0 animate-on-scroll">
            {/* Floating elements - Moved before the image to appear in front */}
            <div className="absolute -top-6 -left-6 p-4 rounded-lg glass animate-float hidden md:block z-20 shadow-lg">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
                  <span className="text-green-600 text-sm font-medium">✓</span>
                </div>
                <span className="text-sm font-medium">Article saved</span>
              </div>
            </div>

            <div
              className="absolute -bottom-6 -right-6 p-4 rounded-lg glass animate-float hidden md:block z-20 shadow-lg"
              style={{ animationDelay: "1s" }}
            >
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-accent-100 rounded-full flex items-center justify-center">
                  <span className="text-accent-600 text-sm font-medium">12</span>
                </div>
                <span className="text-sm font-medium">Ideas connected</span>
              </div>
            </div>
            
            {/* Main image */}
            <div className="relative z-10 rounded-2xl overflow-hidden border border-border shadow-xl">
              <img
                src="/images/workspace.png"
                alt="Second Brain Interface"
                className="w-full h-auto"
              />
              <div className="absolute inset-0 bg-linear-to-t from-background/30 to-transparent pointer-events-none"></div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default HeroSection

