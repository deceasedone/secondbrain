"use client"

import type React from "react"
import { useEffect } from "react"
import { PuzzleIcon, Search, FolderTree, Globe } from "lucide-react"
import { useTheme } from "../../contexts/ThemeContext"

const HowItWorksSection: React.FC = () => {
  const { theme } = useTheme();
  const isDarkMode = theme === 'dark';

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
    <section 
      id="how-it-works" 
      style={{ 
        backgroundColor: isDarkMode ? '#111827' : 'white',
        color: isDarkMode ? 'white' : 'inherit'
      }}
      className="section-padding"
    >
      <div className="container">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          <div>
          <span
  className="text-sm font-medium px-4 py-1.5 rounded-full opacity-0 animate-on-scroll"
  style={{
    backgroundColor: '#bb66cc',
    color: isDarkMode ? 'var(--accent-300)' : 'var(--accent-700)',
  }}
>
  How It Works
</span>

            <h2 
              className="text-3xl md:text-4xl font-display font-bold mt-4 opacity-0 animate-on-scroll"
              style={{ color: isDarkMode ? 'white' : 'inherit' }}
            >
              Building Your Digital Knowledge Base
            </h2>
            <p 
              className="text-lg mt-4 opacity-0 animate-on-scroll"
              style={{ color: isDarkMode ? 'white' : 'var(--muted-foreground, #666)' }}
            >
              Follow these simple steps to create your personalized second brain and never lose important information
              again.
            </p>

            <div className="mt-12 space-y-12">
              {steps.map((step, index) => (
                <div 
                  key={step.number}
                  className="flex items-start gap-4 opacity-0 animate-on-scroll"
                  style={{ transitionDelay: `${index * 100}ms` }}
                >
                  <div className="flex-shrink-0 flex flex-col items-center">
                    <div 
                      className="w-10 h-10 rounded-full flex items-center justify-center"
                      style={{
                        backgroundColor: isDarkMode ? 'rgba(79, 70, 229, 0.2)' : 'var(--accent-100)'
                      }}
                    >
                      <span 
                        className="text-lg font-bold"
                        style={{ color: isDarkMode ? 'var(--accent-300)' : 'var(--accent-700)' }}
                      >
                        {step.number}
                      </span>
                    </div>
                    <div 
                      className="w-0.5 h-full mt-2" 
                      style={{
                        backgroundColor: isDarkMode ? '#374151' : 'var(--accent-100)'
                      }}
                    ></div>
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <step.icon 
                        className="w-5 h-5" 
                        style={{ color: isDarkMode ? 'var(--accent-400)' : 'var(--accent)' }}
                      />
                      <h3 
                        className="text-xl font-semibold"
                        style={{ color: isDarkMode ? 'white' : 'inherit' }}
                      >
                        {step.title}
                      </h3>
                    </div>
                    <p 
                      className="mt-2"
                      style={{ color: isDarkMode ? '#D1D5DB' : 'var(--muted-foreground)' }}
                    >
                      {step.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="relative">
            <div 
              className="mt-16 rounded-xl overflow-hidden shadow-xl opacity-0 animate-on-scroll"
              style={{
                borderColor: isDarkMode ? '#374151' : 'var(--border)',
                borderWidth: '1px'
              }}
            >
              <div className="relative">
                <img
                  src="/images/workspace.png"
                  alt="Second Brain Workspace Interface"
                  className="w-full h-auto"
                />
                <div 
                  className="absolute inset-0 pointer-events-none"
                  style={{
                    background: isDarkMode 
                      ? 'linear-gradient(to top, rgba(17, 24, 39, 0.5), transparent)' 
                      : 'linear-gradient(to top, var(--background)/10%, transparent)'
                  }}
                ></div>
              </div>
            </div>

            {/* Decorative elements - with inline styles for dark mode */}
            <div 
              className="absolute top-1/2 left-0 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 rounded-full blur-3xl opacity-70 animate-on-scroll"
              style={{ 
                backgroundColor: isDarkMode ? 'rgba(79, 70, 229, 0.2)' : 'var(--primary-100)' 
              }}
            ></div>
            <div 
              className="absolute bottom-0 right-0 transform translate-x-1/3 translate-y-1/3 w-72 h-72 rounded-full blur-3xl opacity-70 animate-on-scroll"
              style={{ 
                backgroundColor: isDarkMode ? 'rgba(79, 70, 229, 0.2)' : 'var(--accent-100)' 
              }}
            ></div>

            {/* Floating cards */}
            <div 
              className="absolute top-10 -right-12 p-4 rounded-lg animate-float opacity-0 animate-on-scroll hidden md:block"
              style={{
                backgroundColor: isDarkMode ? 'rgba(31, 41, 55, 0.9)' : 'var(--glass, rgba(255, 255, 255, 0.8))',
                backdropFilter: 'blur(8px)'
              }}
            >
              {/* Card content with inline styles */}
              <div className="flex items-center gap-3">
                <div 
                  className="w-10 h-10 rounded-lg flex items-center justify-center"
                  style={{
                    backgroundColor: isDarkMode ? 'rgba(6, 78, 59, 0.3)' : 'var(--green-100)'
                  }}
                >
                  <svg
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    style={{ color: isDarkMode ? '#34D399' : '#059669' }}
                  >
                    <polyline points="9 11 12 14 22 4"></polyline>
                    <path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11"></path>
                  </svg>
                </div>
                <div>
                  <p 
                    className="text-sm font-medium"
                    style={{ color: isDarkMode ? 'white' : 'inherit' }}
                  >
                    Getting Things Done
                  </p>
                  <p 
                    className="text-xs"
                    style={{ color: isDarkMode ? '#9CA3AF' : 'var(--muted-foreground)' }}
                  >
                    Productivity System
                  </p>
                </div>
              </div>
            </div>

            {/* Second floating card with similar inline styles */}
            <div
              className="absolute -bottom-8 -left-8 p-4 rounded-lg animate-float opacity-0 animate-on-scroll hidden md:block"
              style={{
                backgroundColor: isDarkMode ? 'rgba(31, 41, 55, 0.9)' : 'var(--glass, rgba(255, 255, 255, 0.8))',
                backdropFilter: 'blur(8px)',
                animationDelay: "1.5s"
              }}
            >
              {/* Card content with inline styles */}
              <div className="flex items-center gap-3">
                <div 
                  className="w-10 h-10 rounded-lg flex items-center justify-center"
                  style={{
                    backgroundColor: isDarkMode ? 'rgba(79, 70, 229, 0.2)' : 'var(--primary-100)'
                  }}
                >
                  <svg
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    style={{ color: isDarkMode ? '#A5B4FC' : '#4F46E5' }}
                  >
                    <path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z"></path>
                    <polyline points="14 2 14 8 20 8"></polyline>
                  </svg>
                </div>
                <div>
                  <p 
                    className="text-sm font-medium"
                    style={{ color: isDarkMode ? 'white' : 'inherit' }}
                  >
                    Research Notes
                  </p>
                  <p 
                    className="text-xs"
                    style={{ color: isDarkMode ? '#9CA3AF' : 'var(--muted-foreground)' }}
                  >
                    12 new items
                  </p>
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

