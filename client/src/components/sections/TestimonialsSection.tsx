"use client"

import type React from "react"
import { useEffect } from "react"
import TestimonialCard from "../../components/ui/TestimonialCard"

const TestimonialsSection: React.FC = () => {
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

    const section = document.querySelector("#testimonials")
    if (section) {
      observer.observe(section)
    }

    return () => {
      if (section) {
        observer.unobserve(section)
      }
    }
  }, [])

  const testimonials = [
    {
      quote:
        "SecondBrain has completely transformed how I manage my research. I can easily save articles, organize my thoughts, and find information when I need it.",
      author: "Sarah Johnson",
      role: "PhD Researcher",
    },
    {
      quote:
        "As a designer who collects inspiration from everywhere, having a tool that lets me save visual references and organize them intelligently is invaluable.",
      author: "Michael Chen",
      role: "UX Designer",
    },
    {
      quote:
        "I use SecondBrain every day to save articles, videos, and notes. The search functionality alone has saved me countless hours.",
      author: "Alex Rodriguez",
      role: "Content Creator",
    },
  ]

  return (
<section id="testimonials" className="section-padding bg-linear-to-b from-white to-secondary-50 dark:from-gray-900 dark:to-gray-800">
  <div className="container">
    <div className="text-center max-w-3xl mx-auto mb-16">
      <span className="text-sm font-medium px-4 py-1.5 bg-accent-100 dark:bg-accent-900/30 text-accent-700 dark:text-accent-300 rounded-full opacity-0 animate-on-scroll" style={{ color: '#bb66cc' }}>
        Testimonials
      </span>
      <h2 className="text-3xl md:text-4xl font-display font-bold mt-4 opacity-0 animate-on-scroll dark:text-white" style={{ color: '#bb66cc' }}>
        Trusted by Knowledge Workers Worldwide
      </h2>
      <p className="text-lg text-muted-foreground dark:text-white mt-4 opacity-0 animate-on-scroll" style={{ color: '#bb66cc' }}>
        Join thousands of professionals who rely on SecondBrain to organize their digital lives.
      </p>
    </div>
 




        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {testimonials.map((testimonial, index) => (
            <TestimonialCard
              key={testimonial.author}
              quote={testimonial.quote}
              author={testimonial.author}
              role={testimonial.role}
              delay={index * 100}
            />
          ))}
        </div>

        <div className="mt-16 p-8 rounded-xl bg-white dark:bg-gray-800 border border-border dark:border-gray-700 shadow-lg opacity-0 animate-on-scroll">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div className="p-4 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors">
              <p className="text-4xl font-display font-bold text-gradient dark:text-accent-400">10K+</p>
              <p className="text-muted-foreground dark:text-gray-300 mt-2">Active Users</p>
            </div>
            <div className="p-4 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors">
              <p className="text-4xl font-display font-bold text-gradient dark:text-accent-400">5M+</p>
              <p className="text-muted-foreground dark:text-gray-300 mt-2">Items Saved</p>
            </div>
            <div className="p-4 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors">
              <p className="text-4xl font-display font-bold text-gradient dark:text-accent-400">100K+</p>
              <p className="text-muted-foreground dark:text-gray-300 mt-2">Folders Created</p>
            </div>
            <div className="p-4 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors">
              <p className="text-4xl font-display font-bold text-gradient dark:text-accent-400">4.8/5</p>
              <p className="text-muted-foreground dark:text-gray-300 mt-2">User Rating</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default TestimonialsSection

