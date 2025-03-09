"use client"

import type React from "react"
import { useEffect } from "react"
import { PuzzleIcon, Search, FolderTree, Globe } from "lucide-react"
import ProcessStep from "../../components/ui/ProcessStep"

const HowItWorksSection: React.FC = () => {
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

    const section = document.querySelector("#how-it-works")
    if (section) {
      observer.observe(section)
    }

    return () => {
      if (section) {
        observer.unobserve(section)
      }
    }
  }, [])

  const steps = [
    {
      number: 1,
      icon: PuzzleIcon,
      title: "Create an Account & Log In",
      description: "Sign up and access your workspace to start organizing and managing your content seamlessly.",
    },
    {
      number: 2,
      icon: FolderTree,
      title: "Organize with Folders",
      description:
        "Create a folder structure that works for you, or let our AI suggest the best way to organize your content.",
    },
    {
      number: 3,
      icon: Search,
      title: "Search and Filter",
      description: "Quickly find any piece of content with powerful search and filtering capabilities.",
    },
    {
      number: 4,
      icon: Globe,
      title: "Access Anywhere",
      description: "Your second brain syncs across all devices, so you can access your knowledge base from anywhere.",
    },
  ]

  return (
    <section id="how-it-works" className="section-padding bg-white">
      <div className="container">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          <div>
            <span className="text-sm font-medium px-4 py-1.5 bg-accent-100 text-accent-700 rounded-full opacity-0 animate-on-scroll">
              How It Works
            </span>
            <h2 className="text-3xl md:text-4xl font-display font-bold mt-4 opacity-0 animate-on-scroll">
              Building Your Digital Knowledge Base
            </h2>
            <p className="text-lg text-muted-foreground mt-4 opacity-0 animate-on-scroll">
              Follow these simple steps to create your personalized second brain and never lose important information
              again.
            </p>

            <div className="mt-12 space-y-12">
              {steps.map((step, index) => (
                <ProcessStep
                  key={step.number}
                  number={step.number}
                  icon={step.icon}
                  title={step.title}
                  description={step.description}
                  delay={index * 100}
                />
              ))}
            </div>
          </div>

          <div className="relative">
            <div className="mt-16 rounded-xl overflow-hidden border border-border shadow-xl opacity-0 animate-on-scroll">
              <div className="relative">
                <img
                  src="/images/workspace.png"
                  alt="Second Brain Workspace Interface"
                  className="w-full h-auto"
                />
                <div className="absolute inset-0 bg-linear-to-t from-background/10 to-transparent pointer-events-none"></div>
              </div>
            </div>

            {/* Decorative elements */}
            <div className="absolute top-1/2 left-0 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-primary-100 rounded-full blur-3xl opacity-70 animate-on-scroll"></div>
            <div className="absolute bottom-0 right-0 transform translate-x-1/3 translate-y-1/3 w-72 h-72 bg-accent-100 rounded-full blur-3xl opacity-70 animate-on-scroll"></div>

            {/* Floating cards */}
            <div className="absolute top-10 -right-12 p-4 rounded-lg glass animate-float opacity-0 animate-on-scroll hidden md:block">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-green-100 flex items-center justify-center">
                  <svg
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="text-green-600"
                  >
                    <polyline points="9 11 12 14 22 4"></polyline>
                    <path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11"></path>
                  </svg>
                </div>
                <div>
                  <p className="text-sm font-medium">Getting Things Done</p>
                  <p className="text-xs text-muted-foreground">Productivity System</p>
                </div>
              </div>
            </div>

            <div
              className="absolute -bottom-8 -left-8 p-4 rounded-lg glass animate-float opacity-0 animate-on-scroll hidden md:block"
              style={{ animationDelay: "1.5s" }}
            >
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-primary-100 flex items-center justify-center">
                  <svg
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="text-primary-600"
                  >
                    <path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z"></path>
                    <polyline points="14 2 14 8 20 8"></polyline>
                  </svg>
                </div>
                <div>
                  <p className="text-sm font-medium">Research Notes</p>
                  <p className="text-xs text-muted-foreground">12 new items</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default HowItWorksSection

