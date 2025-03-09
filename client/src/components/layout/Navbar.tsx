"use client"

import type React from "react"
import { useState, useEffect } from "react"
import { Menu, X, Brain } from "lucide-react"
import { useNavigate } from "react-router-dom"
import { cn } from "../../lib/utils"
import AnimatedButton from "../../components/ui/AnimatedButton"
import { useTheme } from "../../contexts/ThemeContext"

const navLinks = [
  { name: "Features", href: "#features" },
  { name: "How It Works", href: "#how-it-works" },
  { name: "Testimonials", href: "#testimonials" },
  { name: "Pricing", href: "#cta" },
]

const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const navigate = useNavigate()
  const { theme, toggleTheme } = useTheme()

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10)
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const handleLogin = () => {
    navigate("/login")
  }

  const handleSignup = () => {
    navigate("/register")
  }

  return (
    <header
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
        scrolled ? "py-3 bg-white/90 backdrop-blur-md shadow-xs" : "py-5 bg-transparent",
      )}
    >
      <div className="container flex items-center justify-between">
        {/* Logo */}
        <a href="#" className="flex items-center gap-2 font-display text-2xl font-bold">
          <Brain className="h-8 w-8 text-accent" />
          <span className={cn("transition-colors duration-300", scrolled ? "text-foreground" : "text-foreground")}>
            Second<span className="text-accent">Brain</span>
          </span>
        </a>

        {/* Desktop Navigation - All items grouped together on the right */}
        <div className="hidden md:flex items-center">
          <ul className="flex items-center gap-4 mr-4">
            {navLinks.map((link) => (
              <li key={link.name}>
                <a
                  href={link.href}
                  className={cn(
                    "text-base font-medium transition-colors duration-200",
                    "relative after:absolute after:bottom-0 after:left-0 after:h-0.5",
                    "after:w-full after:origin-bottom-right after:scale-x-0 after:bg-accent",
                    "after:transition-transform after:duration-300 hover:after:origin-bottom-left",
                    "hover:after:scale-x-100",
                    scrolled ? "text-foreground hover:text-accent" : "text-foreground/90 hover:text-foreground",
                  )}
                >
                  {link.name}
                </a>
              </li>
            ))}
          </ul>
          
          {/* Theme toggle button - moved next to other controls */}
          <button
            onClick={toggleTheme}
            className="p-2 rounded-full bg-secondary/50 hover:bg-secondary/80 transition-colors mr-3"
            aria-label={theme === "dark" ? "Switch to light mode" : "Switch to dark mode"}
          >
            {theme === "dark" ? (
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path
                  fillRule="evenodd"
                  d="M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4 8a4 4 0 11-8 0 4 4 0 018 0zm-.464 4.95l.707.707a1 1 0 001.414-1.414l-.707-.707a1 1 0 00-1.414 1.414zm2.12-10.607a1 1 0 010 1.414l-.706.707a1 1 0 11-1.414-1.414l.707-.707a1 1 0 011.414 0zM17 11a1 1 0 100-2h-1a1 1 0 100 2h1zm-7 4a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zM5.05 6.464A1 1 0 106.465 5.05l-.708-.707a1 1 0 00-1.414 1.414l.707.707zm1.414 8.486l-.707.707a1 1 0 01-1.414-1.414l.707-.707a1 1 0 011.414 1.414zM4 11a1 1 0 100-2H3a1 1 0 000 2h1z"
                  clipRule="evenodd"
                />
              </svg>
            ) : (
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z" />
              </svg>
            )}
          </button>
          
          <div className="flex items-center gap-2">
            <AnimatedButton variant="outline" size="sm" onClick={handleLogin}>
              Log In
            </AnimatedButton>
            <AnimatedButton variant="primary" size="sm" onClick={handleSignup}>
              Sign Up
            </AnimatedButton>
          </div>
        </div>

        {/* Mobile Menu Controls */}
        <div className="flex md:hidden items-center gap-2">
          {/* Theme toggle button for mobile */}
          <button
            onClick={toggleTheme}
            className="p-2 rounded-full bg-secondary/50 hover:bg-secondary/80 transition-colors"
            aria-label={theme === "dark" ? "Switch to light mode" : "Switch to dark mode"}
          >
            {theme === "dark" ? (
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path
                  fillRule="evenodd"
                  d="M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4 8a4 4 0 11-8 0 4 4 0 018 0zm-.464 4.95l.707.707a1 1 0 001.414-1.414l-.707-.707a1 1 0 00-1.414 1.414zm2.12-10.607a1 1 0 010 1.414l-.706.707a1 1 0 11-1.414-1.414l.707-.707a1 1 0 011.414 0zM17 11a1 1 0 100-2h-1a1 1 0 100 2h1zm-7 4a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zM5.05 6.464A1 1 0 106.465 5.05l-.708-.707a1 1 0 00-1.414 1.414l.707.707zm1.414 8.486l-.707.707a1 1 0 01-1.414-1.414l.707-.707a1 1 0 011.414 1.414zM4 11a1 1 0 100-2H3a1 1 0 000 2h1z"
                  clipRule="evenodd"
                />
              </svg>
            ) : (
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z" />
              </svg>
            )}
          </button>
          
          {/* Mobile menu button */}
          <button
            className="flex items-center justify-center p-2 rounded-md"
            onClick={() => setIsOpen(!isOpen)}
            aria-label={isOpen ? "Close menu" : "Open menu"}
          >
            {isOpen ? <X className="h-6 w-6 text-foreground" /> : <Menu className="h-6 w-6 text-foreground" />}
          </button>
        </div>
      </div>

      {/* Mobile Navigation */}
      <div
        className={cn(
          "md:hidden absolute top-full left-0 right-0 bg-white/95 backdrop-blur-md shadow-md transition-all duration-300 overflow-hidden",
          isOpen ? "max-h-[500px] border-b border-border" : "max-h-0",
        )}
      >
        <div className="container py-4">
          <ul className="flex flex-col gap-4">
            {navLinks.map((link) => (
              <li key={link.name}>
                <a
                  href={link.href}
                  className="block py-2 text-foreground font-medium hover:text-accent transition-colors"
                  onClick={() => setIsOpen(false)}
                >
                  {link.name}
                </a>
              </li>
            ))}
          </ul>
          <div className="flex flex-col gap-3 mt-6">
            <AnimatedButton variant="outline" fullWidth onClick={handleLogin}>
              Log In
            </AnimatedButton>
            <AnimatedButton variant="primary" fullWidth onClick={handleSignup}>
              Sign Up
            </AnimatedButton>
          </div>
        </div>
      </div>
    </header>
  )
}

export default Navbar

