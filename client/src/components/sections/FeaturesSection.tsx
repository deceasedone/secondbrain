"use client"

import type React from "react"
import { useEffect } from "react"
import { Link, Save, Layers, Globe } from "lucide-react"
import FeatureCard from "../../components/ui/FeatureCard"

const FeaturesSection: React.FC = () => {
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

    const section = document.querySelector("#features")
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
    {
      icon: Save,
      title: "Universal Content Saving",
      description: "Save links, images, videos, and text from anywhere on the web with a single click.",
    },
    {
      icon: Layers,
      title: "Smart Folder Organization",
      description: "Organize content in folders with AI-powered categorization and tagging.",
    },
    {
      icon: Globe,
      title: "Cross-platform Accessibility",
      description: "Access your content from any device, anywhere, anytime.",
    },
    {
      icon: Link,
      title: "One-click Saving",
      description: "Save web content instantly with our browser extension or mobile app.",
    },
  ]

  return (
    <section id="features" className="section-padding bg-linear-to-b from-white to-secondary-50">
      <div className="container">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-sm font-medium px-4 py-1.5 bg-accent-100 text-accent-700 rounded-full opacity-0 animate-on-scroll">
            Features
          </span>
          <h2 className="text-3xl md:text-4xl font-display font-bold mt-4 opacity-0 animate-on-scroll">
            Everything You Need to Build Your Second Brain
          </h2>
          <p className="text-lg text-muted-foreground mt-4 opacity-0 animate-on-scroll">
            Our platform provides all the tools you need to save, organize, and access your digital knowledge.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature, index) => (
            <FeatureCard
              key={feature.title}
              icon={feature.icon}
              title={feature.title}
              description={feature.description}
              delay={index * 100}
            />
          ))}
        </div>

        <div className="mt-20 rounded-xl overflow-hidden border border-border shadow-xl opacity-0 animate-on-scroll">
          <div className="relative">
            <img
              src="/images/workspace.png"
              alt="Second Brain Workspace Interface"
              className="w-full h-auto"
            />
            <div className="absolute inset-0 bg-linear-to-t from-background/10 to-transparent pointer-events-none"></div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default FeaturesSection

