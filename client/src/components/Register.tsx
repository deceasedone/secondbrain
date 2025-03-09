"use client"

import type React from "react"
import { useState } from "react"
import { useNavigate, Link } from "react-router-dom"
import { toast } from "react-hot-toast"
import * as api from "../services/api"
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "./ui/cards"
import { Input } from "./ui/inputs"
import { Button } from "./ui/buttons"
import { Alert } from "./ui/alerts"
import { AtSign, Lock, User, UserPlus, AlertCircle, CheckCircle2 } from "lucide-react"
import { Label } from "../components/ui/labels"

const Register: React.FC = () => {
  const navigate = useNavigate()
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  })
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    })
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError(null)
    setIsLoading(true)

    try {
      const { username, email, password, confirmPassword } = formData

      // Validate form data
      if (!username || !email || !password || !confirmPassword) {
        setError("All fields are required")
        setIsLoading(false)
        return
      }

      if (password !== confirmPassword) {
        setError("Passwords do not match")
        setIsLoading(false)
        return
      }

      if (password.length < 6) {
        setError("Password must be at least 6 characters long")
        setIsLoading(false)
        return
      }

      await api.register(username, email, password)
      toast.success("Registration successful! Please log in.")
      navigate("/login")
    } catch (err: any) {
      setError(err.response?.data?.message || "Registration failed. Please try again.")
      toast.error("Registration failed")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-background py-12 px-4 sm:px-6 lg:px-8">
      <div className="w-full max-w-md animate-slide-up">
        <Card className="border-border shadow-lg hover-scale overflow-hidden">
          <CardHeader className="space-y-1 text-center pb-6">
            <div className="mx-auto h-16 w-16 rounded-full glass flex items-center justify-center mb-3 animate-float">
              <UserPlus className="h-7 w-7 text-accent" />
            </div>
            <CardTitle className="text-2xl font-bold font-display">Create an account</CardTitle>
            <CardDescription className="text-balance">Enter your details to get started</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            {error && (
              <Alert variant="destructive" className="animate-fade-in flex items-center gap-2">
                <AlertCircle className="h-4 w-4" />
                <span>{error}</span>
              </Alert>
            )}
            <form onSubmit={handleSubmit} className="space-y-5">
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="username" className="text-sm font-medium">
                    Username
                  </Label>
                  <div className="relative">
                    <User className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input
                      id="username"
                      name="username"
                      type="text"
                      placeholder="Choose a username"
                      autoComplete="username"
                      required
                      value={formData.username}
                      onChange={handleChange}
                      className="pl-10 h-11"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="email" className="text-sm font-medium">
                    Email
                  </Label>
                  <div className="relative">
                    <AtSign className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      placeholder="Enter your email"
                      autoComplete="email"
                      required
                      value={formData.email}
                      onChange={handleChange}
                      className="pl-10 h-11"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="password" className="text-sm font-medium">
                    Password
                  </Label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input
                      id="password"
                      name="password"
                      type="password"
                      placeholder="Create a password"
                      autoComplete="new-password"
                      required
                      value={formData.password}
                      onChange={handleChange}
                      className="pl-10 h-11"
                    />
                  </div>
                  {formData.password && (
                    <div className="text-xs flex items-center gap-1 text-muted-foreground">
                      <CheckCircle2
                        className={`h-3 w-3 ${formData.password.length >= 6 ? "text-green-500" : "text-muted-foreground"}`}
                      />
                      <span>At least 6 characters</span>
                    </div>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="confirmPassword" className="text-sm font-medium">
                    Confirm Password
                  </Label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input
                      id="confirmPassword"
                      name="confirmPassword"
                      type="password"
                      placeholder="Confirm your password"
                      autoComplete="new-password"
                      required
                      value={formData.confirmPassword}
                      onChange={handleChange}
                      className="pl-10 h-11"
                    />
                  </div>
                  {formData.password && formData.confirmPassword && (
                    <div className="text-xs flex items-center gap-1 text-muted-foreground">
                      <CheckCircle2
                        className={`h-3 w-3 ${formData.password === formData.confirmPassword ? "text-green-500" : "text-muted-foreground"}`}
                      />
                      <span>Passwords match</span>
                    </div>
                  )}
                </div>
              </div>

              <Button
                type="submit"
                disabled={isLoading}
                className="w-full h-11 font-medium bg-accent text-accent-foreground hover:bg-accent/90"
              >
                {isLoading ? (
                  <div className="flex items-center gap-2">
                    <div className="h-4 w-4 animate-spin rounded-full border-2 border-accent-foreground border-t-transparent"></div>
                    <span>Creating account...</span>
                  </div>
                ) : (
                  <div className="flex items-center justify-center gap-2">
                    <span>Create account</span>
                    <UserPlus className="h-4 w-4" />
                  </div>
                )}
              </Button>
            </form>
          </CardContent>
          <CardFooter className="flex flex-col border-t bg-muted/20 py-4">
            <div className="text-center text-sm">
              <span className="text-muted-foreground">
                Already have an account?{" "}
                <Link to="/login" className="font-medium text-accent hover:underline transition-all">
                  Sign in
                </Link>
              </span>
            </div>
          </CardFooter>
        </Card>

        <div className="mt-6 text-center text-sm text-muted-foreground">
          <p>
            By signing up, you agree to our{" "}
            <Link to="/terms" className="underline">
              Terms of Service
            </Link>{" "}
            and{" "}
            <Link to="/privacy" className="underline">
              Privacy Policy
            </Link>
          </p>
        </div>
      </div>
    </div>
  )
}

export default Register

