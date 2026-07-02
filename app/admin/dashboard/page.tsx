'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import Image from 'next/image'

interface ContentItem {
  id: string
  title: string
  type: 'hero' | 'service' | 'project'
  description: string
}

export default function AdminDashboard() {
  const router = useRouter()
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  const [activeTab, setActiveTab] = useState('overview')
  const [heroContent, setHeroContent] = useState({
    mainText: 'I Automate. I Design. I Elevate Brands.',
    description: 'AI automation with n8n. Stunning designs that communicate. Systems that scale your business.',
  })
  const [editingHero, setEditingHero] = useState(false)

  useEffect(() => {
    // Check if user is authenticated
    const token = localStorage.getItem('adminToken')
    if (!token) {
      router.push('/admin/login')
    } else {
      setIsAuthenticated(true)
      setIsLoading(false)
    }
  }, [router])

  const handleLogout = () => {
    localStorage.removeItem('adminToken')
    router.push('/admin/login')
  }

  const handleHeroUpdate = () => {
    // Save to localStorage for demo purposes
    localStorage.setItem('heroContent', JSON.stringify(heroContent))
    setEditingHero(false)
    alert('Hero content updated successfully!')
  }

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <p className="text-muted-foreground">Loading...</p>
      </div>
    )
  }

  if (!isAuthenticated) {
    return null
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 to-slate-900">
      {/* Header */}
      <header className="border-b border-border/50 bg-background/80 backdrop-blur-xl sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Image
              src="/logo.png"
              alt="IMPULSE GRID DIGITALS"
              width={40}
              height={40}
              className="h-10 w-auto"
            />
            <h1 className="text-xl font-bold text-white">Admin Dashboard</h1>
          </div>
          <Button
            onClick={handleLogout}
            variant="outline"
            className="border-border hover:bg-card"
          >
            Logout
          </Button>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-6 py-8">
        {/* Navigation Tabs */}
        <div className="flex gap-4 mb-8 border-b border-border/50">
          <button
            onClick={() => setActiveTab('overview')}
            className={`px-4 py-2 font-medium transition-colors ${
              activeTab === 'overview'
                ? 'text-purple-400 border-b-2 border-purple-500'
                : 'text-muted-foreground hover:text-foreground'
            }`}
          >
            Overview
          </button>
          <button
            onClick={() => setActiveTab('hero')}
            className={`px-4 py-2 font-medium transition-colors ${
              activeTab === 'hero'
                ? 'text-purple-400 border-b-2 border-purple-500'
                : 'text-muted-foreground hover:text-foreground'
            }`}
          >
            Hero Section
          </button>
          <button
            onClick={() => setActiveTab('portfolio')}
            className={`px-4 py-2 font-medium transition-colors ${
              activeTab === 'portfolio'
                ? 'text-purple-400 border-b-2 border-purple-500'
                : 'text-muted-foreground hover:text-foreground'
            }`}
          >
            Portfolio
          </button>
          <button
            onClick={() => setActiveTab('services')}
            className={`px-4 py-2 font-medium transition-colors ${
              activeTab === 'services'
                ? 'text-purple-400 border-b-2 border-purple-500'
                : 'text-muted-foreground hover:text-foreground'
            }`}
          >
            Services
          </button>
        </div>

        {/* Overview Tab */}
        {activeTab === 'overview' && (
          <div className="grid md:grid-cols-3 gap-6 mb-8">
            <div className="bg-card/40 backdrop-blur-xl border border-border/50 rounded-xl p-6">
              <p className="text-muted-foreground text-sm mb-2">Total Page Views</p>
              <p className="text-3xl font-bold text-white">12,432</p>
            </div>
            <div className="bg-card/40 backdrop-blur-xl border border-border/50 rounded-xl p-6">
              <p className="text-muted-foreground text-sm mb-2">Portfolio Projects</p>
              <p className="text-3xl font-bold text-white">8</p>
            </div>
            <div className="bg-card/40 backdrop-blur-xl border border-border/50 rounded-xl p-6">
              <p className="text-muted-foreground text-sm mb-2">Active Integrations</p>
              <p className="text-3xl font-bold text-white">12</p>
            </div>
          </div>
        )}

        {/* Hero Section Tab */}
        {activeTab === 'hero' && (
          <div className="bg-card/40 backdrop-blur-xl border border-border/50 rounded-xl p-8 max-w-2xl">
            <h2 className="text-2xl font-bold text-white mb-6">Edit Hero Section</h2>

            {!editingHero ? (
              <div className="space-y-4">
                <div>
                  <p className="text-sm text-muted-foreground mb-2">Main Heading</p>
                  <p className="text-lg text-white bg-background/50 p-3 rounded-lg">
                    {heroContent.mainText}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground mb-2">Description</p>
                  <p className="text-base text-white bg-background/50 p-3 rounded-lg">
                    {heroContent.description}
                  </p>
                </div>
                <Button
                  onClick={() => setEditingHero(true)}
                  className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white"
                >
                  Edit Content
                </Button>
              </div>
            ) : (
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">
                    Main Heading
                  </label>
                  <input
                    type="text"
                    value={heroContent.mainText}
                    onChange={(e) =>
                      setHeroContent({ ...heroContent, mainText: e.target.value })
                    }
                    className="w-full px-4 py-2 rounded-lg bg-background border border-border/50 text-foreground focus:outline-none focus:ring-2 focus:ring-purple-500/50"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">
                    Description
                  </label>
                  <textarea
                    value={heroContent.description}
                    onChange={(e) =>
                      setHeroContent({ ...heroContent, description: e.target.value })
                    }
                    className="w-full px-4 py-2 rounded-lg bg-background border border-border/50 text-foreground focus:outline-none focus:ring-2 focus:ring-purple-500/50 min-h-24"
                  />
                </div>
                <div className="flex gap-3">
                  <Button
                    onClick={handleHeroUpdate}
                    className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white"
                  >
                    Save Changes
                  </Button>
                  <Button
                    onClick={() => setEditingHero(false)}
                    variant="outline"
                    className="border-border hover:bg-card"
                  >
                    Cancel
                  </Button>
                </div>
              </div>
            )}
          </div>
        )}

        {/* Portfolio Tab */}
        {activeTab === 'portfolio' && (
          <div className="bg-card/40 backdrop-blur-xl border border-border/50 rounded-xl p-8">
            <h2 className="text-2xl font-bold text-white mb-6">Portfolio Management</h2>
            <p className="text-muted-foreground mb-6">
              Manage your portfolio projects, descriptions, and images.
            </p>
            <div className="space-y-4">
              <div className="p-4 bg-background/50 rounded-lg border border-border/30">
                <p className="font-medium text-white mb-2">Portfolio Item 1</p>
                <p className="text-sm text-muted-foreground">Click to edit project details</p>
              </div>
              <div className="p-4 bg-background/50 rounded-lg border border-border/30">
                <p className="font-medium text-white mb-2">Portfolio Item 2</p>
                <p className="text-sm text-muted-foreground">Click to edit project details</p>
              </div>
              <Button className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white">
                Add New Project
              </Button>
            </div>
          </div>
        )}

        {/* Services Tab */}
        {activeTab === 'services' && (
          <div className="bg-card/40 backdrop-blur-xl border border-border/50 rounded-xl p-8">
            <h2 className="text-2xl font-bold text-white mb-6">Services Management</h2>
            <p className="text-muted-foreground mb-6">
              Manage your service offerings, descriptions, and pricing.
            </p>
            <div className="grid md:grid-cols-2 gap-4">
              <div className="p-4 bg-background/50 rounded-lg border border-border/30">
                <p className="font-medium text-white mb-2">AI & Automation</p>
                <p className="text-sm text-muted-foreground">Smart automations, AI agents, workflows using n8n, APIs and more.</p>
              </div>
              <div className="p-4 bg-background/50 rounded-lg border border-border/30">
                <p className="font-medium text-white mb-2">No-Code / Low-Code</p>
                <p className="text-sm text-muted-foreground">Build powerful apps and automations without heavy coding.</p>
              </div>
              <div className="p-4 bg-background/50 rounded-lg border border-border/30">
                <p className="font-medium text-white mb-2">Backend & Integrations</p>
                <p className="text-sm text-muted-foreground">APIs, databases, auth, payments and integrations that power your business.</p>
              </div>
              <div className="p-4 bg-background/50 rounded-lg border border-border/30">
                <p className="font-medium text-white mb-2">Brand & Design</p>
                <p className="text-sm text-muted-foreground">Logos, brand identity, social graphics, UX/UI design that communicate value.</p>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  )
}
