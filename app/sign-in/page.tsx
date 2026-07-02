'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import Image from 'next/image'
import { Eye, EyeOff, AlertCircle } from 'lucide-react'

export default function SignIn() {
  const router = useRouter()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [error, setError] = useState('')
  const [isLoading, setIsLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    setIsLoading(true)

    try {
      const response = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      })

      const data = await response.json()

      if (!response.ok) {
        setError(data.error || 'Login failed')
        setIsLoading(false)
        return
      }

      // Store session token in localStorage
      localStorage.setItem('adminToken', data.token)
      localStorage.setItem('adminEmail', email)
      
      // Redirect to dashboard
      router.push('/dashboard')
    } catch (err) {
      console.error('Login error:', err)
      setError('An error occurred. Please try again.')
      setIsLoading(false)
    }
  }

  return (
    <main className="min-h-screen bg-gradient-to-br from-background via-background to-purple-950/20 flex items-center justify-center px-4 md:px-6">
      <div className="w-full max-w-md mx-auto relative z-10">
        {/* Logo - Clickable */}
        <Link href="/" className="flex justify-center mb-12 hover:opacity-80 transition">
          <Image
            src="/logo.png"
            alt="IMPULSE GRID DIGITALS"
            width={60}
            height={60}
            className="h-16 w-auto cursor-pointer"
          />
        </Link>

        <div className="bg-card/40 backdrop-blur-xl border border-border/50 rounded-2xl p-6 md:p-8 space-y-6 md:space-y-8">

          <div className="text-center space-y-2">
            <h1 className="text-2xl md:text-3xl font-bold text-white">Admin Portal</h1>
            <p className="text-xs md:text-sm text-muted-foreground">Access your portfolio dashboard</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4 md:space-y-5">
            <div>
              <label className="block text-xs md:text-sm font-medium text-foreground mb-2">
                Email
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="admin@impulse.local"
                className="w-full px-3 md:px-4 py-2 rounded-lg bg-background border border-border/50 text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-purple-500/50 text-sm"
                required
              />
            </div>

            <div>
              <label className="block text-xs md:text-sm font-medium text-foreground mb-2">
                Password
              </label>
              <div className="relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full px-3 md:px-4 py-2 rounded-lg bg-background border border-border/50 text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-purple-500/50 text-sm"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-muted-foreground hover:text-foreground transition"
                >
                  {showPassword ? (
                    <EyeOff size={16} />
                  ) : (
                    <Eye size={16} />
                  )}
                </button>
              </div>
            </div>

            {error && (
              <div className="p-4 bg-red-500/10 border border-red-500/30 rounded-lg flex items-start gap-3">
                <AlertCircle className="w-5 h-5 text-red-400 flex-shrink-0 mt-0.5" />
                <div className="flex-1">
                  <p className="text-red-400 text-sm font-semibold">Login Failed</p>
                  <p className="text-red-300 text-sm mt-1">
                    {error.includes('Invalid') || error.includes('incorrect') 
                      ? 'Email or password is incorrect. Please try again.' 
                      : error.includes('network') 
                      ? 'Network error. Please check your connection.'
                      : 'An error occurred. Please try again.'}
                  </p>
                </div>
              </div>
            )}

            <Button
              type="submit"
              disabled={isLoading}
              className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white font-semibold py-2 rounded-lg text-sm"
            >
              {isLoading ? 'Signing in...' : 'Sign In'}
            </Button>
          </form>

          <div className="pt-4 md:pt-6 border-t border-border/50">
            <p className="text-xs text-muted-foreground text-center leading-relaxed">
              <strong>Demo Credentials:</strong><br/>
              Email: admin@impulse.local<br/>
              Password: AdminPassword123!<br/>
              <br/>
              <em>(Change these in .env.local)</em>
            </p>
          </div>
        </div>
      </div>
    </main>
  )
}
