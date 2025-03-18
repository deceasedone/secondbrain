"use client"

import type React from "react"
import { useEffect } from "react"
import { Check } from "lucide-react"
import AnimatedButton from "../../components/ui/AnimatedButton"

const CtaSection: React.FC = () => {
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const animatedElements = entry.target.querySelectorAll(".animate-on-scroll")
            animatedElements.forEach((element, index) => {
              setTimeout(() => {
                element.classList.add("animate-fade-up")
              }, index * 100)
            })
          }
        })
      },
      { threshold: 0.1, rootMargin: "0px 0px -100px 0px" },
    )

    const section = document.querySelector("#cta")
    if (section) {
      observer.observe(section)
    }

    return () => {
      if (section) {
        observer.unobserve(section)
      }
    }
  }, [])

  const features = [
    "Unlimited content saving",
    "Smart organization",
    "Full-text search",
    "Cross-platform access",
    "Browser extensions",
    "Basic AI categorization",
  ]

  return (
    <section id="cta" className="section-padding bg-linear-to-b from-secondary-50 to-white dark:from-gray-800 dark:to-gray-900">
      <div className="container">
        <div className="max-w-4xl mx-auto rounded-2xl overflow-hidden border border-border dark:border-gray-700 shadow-xl">
          <div className="p-8 md:p-12 bg-white dark:bg-gray-800">
            <div className="text-center max-w-2xl mx-auto">
              <h2 className="text-3xl md:text-4xl font-display font-bold opacity-0 animate-on-scroll dark:text-white">
                Start Building Your Second Brain Today
              </h2>
              <p className="text-lg text-muted-foreground dark:text-gray-300 mt-4 opacity-0 animate-on-scroll">
                Join thousands of knowledge workers who have transformed how they capture and organize information.
              </p>
            </div>

            <div className="mt-8 opacity-0 animate-on-scroll">
              <h3 className="text-xl font-semibold text-center dark:text-white">Free Plan Includes:</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6 max-w-2xl mx-auto">
                {features.map((feature) => (
                  <div
                    key={feature}
                    className="flex items-center gap-3 p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                  >
                    <div className="shrink-0 w-6 h-6 rounded-full bg-green-100 dark:bg-green-900/30 flex items-center justify-center">
                      <Check className="w-3.5 h-3.5 text-green-600 dark:text-green-400" />
                    </div>
                    <span className="text-muted-foreground dark:text-gray-300">{feature}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="mt-10 text-center opacity-0 animate-on-scroll">
              <AnimatedButton size="lg" className="font-medium px-8 dark:bg-accent dark:hover:bg-accent/90">
                Start Organizing Today - It's Free
              </AnimatedButton>
              <p className="text-sm text-muted-foreground dark:text-gray-400 mt-4">No credit card required. Upgrade anytime.</p>
            </div>
          </div>

          <div className="p-8 bg-linear-to-r from-primary-50 to-accent-50 dark:from-gray-700 dark:to-gray-700 border-t border-border dark:border-gray-600">
            <div className="text-center opacity-0 animate-on-scroll">
              <p className="text-muted-foreground dark:text-gray-300">
                Need more features?{" "}
                <a href="#" className="text-accent-600 dark:text-accent-400 font-medium hover:text-accent-700 dark:hover:text-accent-300 transition-colors">
                  Check out our Pro and Team plans
                </a>
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default CtaSection

