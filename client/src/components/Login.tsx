"use client"

import type React from "react"
import { useState } from "react"
import { useNavigate, Link } from "react-router-dom"
import { toast } from "react-hot-toast"
import { useAuth } from "../contexts/AuthContext"
import * as api from "../services/api"
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "./ui/cards"
import { Input } from "./ui/inputs"
import { Button } from "./ui/buttons"
import { Alert } from "./ui/alerts"
import { AtSign, Lock, LogIn, AlertCircle, Check } from 'lucide-react'
import { Label } from "../components/ui/labels"
import { Checkbox } from "../components/ui/checkbox"

const Login: React.FC = () => {
  const navigate = useNavigate()
  const { login } = useAuth()
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  })
  const [rememberMe, setRememberMe] = useState(false)
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
      const { email, password } = formData

      if (!email || !password) {
        setError("All fields are required")
        return
      }

      const response = await api.login(email, password)
      login(response.user, response.token)
      toast.success("Login successful")
      navigate("/app")
    } catch (err: any) {
      setError(err.response?.data?.message || "Login failed. Please try again.")
      toast.error("Login failed")
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
              <LogIn className="h-7 w-7 text-accent" />
            </div>
            <CardTitle className="text-2xl font-bold font-display">Welcome back</CardTitle>
            <CardDescription className="text-balance">Sign in to your account to continue</CardDescription>
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
                  <div className="flex items-center justify-between">
                    <Label htmlFor="password" className="text-sm font-medium">
                      Password
                    </Label>
                    <Link to="/forgot-password" className="text-xs text-accent hover:underline transition-all">
                      Forgot password?
                    </Link>
                  </div>
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input
                      id="password"
                      name="password"
                      type="password"
                      placeholder="Enter your password"
                      autoComplete="current-password"
                      required
                      value={formData.password}
                      onChange={handleChange}
                      className="pl-10 h-11"
                    />
                  </div>
                </div>
                
                <div className="flex items-center space-x-2">
                  <Checkbox 
                    id="remember" 
                    checked={rememberMe}
                    onCheckedChange={(checked) => setRememberMe(checked as boolean)}
                  />
                  <Label htmlFor="remember" className="text-sm text-muted-foreground cursor-pointer">
                    Remember me for 30 days
                  </Label>
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
                    <span>Signing in...</span>
                  </div>
                ) : (
                  <div className="flex items-center justify-center gap-2">
                    <span>Sign in</span>
                    <LogIn className="h-4 w-4" />
                  </div>
                )}
              </Button>
            </form>
          </CardContent>
          <CardFooter className="flex flex-col border-t bg-muted/20 py-4">
            <div className="text-center text-sm">
              <span className="text-muted-foreground">
                Don't have an account?{" "}
                <Link to="/register" className="font-medium text-accent hover:underline transition-all">
                  Sign up
                </Link>
              </span>
            </div>
          </CardFooter>
        </Card>
        
        <div className="mt-6 text-center text-sm text-muted-foreground">
          <p>Protected by industry-leading security practices</p>
        </div>
      </div>
    </div>
  )
}

export default Login
