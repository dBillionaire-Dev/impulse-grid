'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import Image from 'next/image'

export default function Dashboard() {
  const router = useRouter()
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  const [activeTab, setActiveTab] = useState('overview')
  const [adminEmail, setAdminEmail] = useState('')
  const [heroContent, setHeroContent] = useState({
    mainText: 'I Automate. I Design. I Elevate Brands.',
    description: 'AI automation with n8n. Stunning designs that communicate. Systems that scale your business.',
  })
  const [editingHero, setEditingHero] = useState(false)

  useEffect(() => {
    const token = localStorage.getItem('adminToken')
    const email = localStorage.getItem('adminEmail')
    
    if (!token || !email) {
      router.push('/sign-in')
    } else {
      setAdminEmail(email)
      setIsAuthenticated(true)
      
      // Load saved hero content if it exists
      const saved = localStorage.getItem('heroContent')
      if (saved) {
        setHeroContent(JSON.parse(saved))
      }
      
      setIsLoading(false)
    }
  }, [router])

  const handleLogout = () => {
    localStorage.removeItem('adminToken')
    localStorage.removeItem('adminEmail')
    router.push('/sign-in')
  }

  const handleHeroUpdate = () => {
    localStorage.setItem('heroContent', JSON.stringify(heroContent))
    setEditingHero(false)
    alert('Hero content updated successfully!')
  }

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-950 to-slate-900">
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
      <header className="border-b border-border/50 bg-background/50 backdrop-blur-xl sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Image
              src="/logo.png"
              alt="IMPULSE GRID DIGITALS"
              width={40}
              height={40}
              className="h-10 w-auto"
            />
            <div>
              <h1 className="text-xl font-bold text-white">Content Dashboard</h1>
              <p className="text-xs text-muted-foreground">Logged in as {adminEmail}</p>
            </div>
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
        <div className="flex gap-4 mb-8 border-b border-border/50 overflow-x-auto">
          {[
            { id: 'overview', label: 'Overview' },
            { id: 'hero', label: 'Hero Section' },
            { id: 'portfolio', label: 'Portfolio' },
            { id: 'services', label: 'Services' },
            { id: 'settings', label: 'Settings' },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`px-4 py-2 font-medium transition-colors whitespace-nowrap ${
                activeTab === tab.id
                  ? 'text-purple-400 border-b-2 border-purple-500'
                  : 'text-muted-foreground hover:text-foreground'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Overview Tab */}
        {activeTab === 'overview' && (
          <div className="space-y-8">
            <div className="grid md:grid-cols-3 gap-6">
              <div className="bg-card/40 backdrop-blur-xl border border-border/50 rounded-xl p-6">
                <p className="text-muted-foreground text-sm mb-2">Portfolio Status</p>
                <p className="text-3xl font-bold text-white">Active</p>
                <p className="text-xs text-green-400 mt-2">✓ All systems operational</p>
              </div>
              <div className="bg-card/40 backdrop-blur-xl border border-border/50 rounded-xl p-6">
                <p className="text-muted-foreground text-sm mb-2">Total Projects</p>
                <p className="text-3xl font-bold text-white">8</p>
              </div>
              <div className="bg-card/40 backdrop-blur-xl border border-border/50 rounded-xl p-6">
                <p className="text-muted-foreground text-sm mb-2">Tech Stack</p>
                <p className="text-3xl font-bold text-white">12+</p>
                <p className="text-xs text-muted-foreground mt-2">Tools & integrations</p>
              </div>
            </div>

            <div className="bg-card/40 backdrop-blur-xl border border-border/50 rounded-xl p-6">
              <h2 className="text-xl font-bold text-white mb-4">Quick Actions</h2>
              <div className="flex gap-4">
                <Button className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white">
                  Update Hero Content
                </Button>
                <Button variant="outline" className="border-border hover:bg-card">
                  Add Portfolio Project
                </Button>
              </div>
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
                  <p className="text-lg text-white bg-background/50 p-3 rounded-lg border border-border/30">
                    {heroContent.mainText}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground mb-2">Description</p>
                  <p className="text-base text-white bg-background/50 p-3 rounded-lg border border-border/30 leading-relaxed">
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
                    className="w-full px-4 py-2 rounded-lg bg-background border border-border/50 text-foreground focus:outline-none focus:ring-2 focus:ring-purple-500/50 min-h-24 resize-none"
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
            <h2 className="text-2xl font-bold text-white mb-6">Portfolio Projects</h2>
            <p className="text-muted-foreground mb-6">
              Manage your portfolio projects, descriptions, images, and links.
            </p>
            <div className="space-y-4 mb-6">
              {['Project 1: Client Onboarding System', 'Project 2: AI Content Automation', 'Project 3: Brand Identity Design'].map((project, i) => (
                <div key={i} className="p-4 bg-background/50 rounded-lg border border-border/30 hover:border-border/50 transition cursor-pointer">
                  <div className="flex justify-between items-start">
                    <div>
                      <p className="font-medium text-white">{project}</p>
                      <p className="text-sm text-muted-foreground mt-1">Click to edit details</p>
                    </div>
                    <span className="text-xs bg-purple-500/20 text-purple-300 px-2 py-1 rounded">Edit</span>
                  </div>
                </div>
              ))}
            </div>
            <Button className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white">
              Add New Project
            </Button>
          </div>
        )}

        {/* Services Tab */}
        {activeTab === 'services' && (
          <div className="bg-card/40 backdrop-blur-xl border border-border/50 rounded-xl p-8">
            <h2 className="text-2xl font-bold text-white mb-6">Services Management</h2>
            <p className="text-muted-foreground mb-6">
              Manage your service offerings, descriptions, and expertise areas.
            </p>
            <div className="grid md:grid-cols-2 gap-4">
              {[
                { title: 'AI & Automation', desc: 'Smart automations, AI agents, workflows using n8n' },
                { title: 'No-Code / Low-Code', desc: 'Build powerful apps and automations' },
                { title: 'Backend & Integrations', desc: 'APIs, databases, auth, payments, integrations' },
                { title: 'Brand & Design', desc: 'Logos, brand identity, UX/UI design' },
              ].map((service, i) => (
                <div key={i} className="p-4 bg-background/50 rounded-lg border border-border/30 hover:border-border/50 transition cursor-pointer">
                  <p className="font-medium text-white">{service.title}</p>
                  <p className="text-sm text-muted-foreground mt-2">{service.desc}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Settings Tab */}
        {activeTab === 'settings' && (
          <div className="bg-card/40 backdrop-blur-xl border border-border/50 rounded-xl p-8 max-w-2xl">
            <h2 className="text-2xl font-bold text-white mb-6">Admin Settings</h2>
            <div className="space-y-6">
              <div className="p-4 bg-background/50 rounded-lg border border-border/30">
                <p className="text-sm text-muted-foreground mb-2">Admin Email</p>
                <p className="text-white font-medium">{adminEmail}</p>
              </div>
              
              <div className="p-4 bg-background/50 rounded-lg border border-border/30">
                <p className="text-sm text-muted-foreground mb-2">Change Password</p>
                <p className="text-sm text-muted-foreground mb-3">To change credentials, edit the .env.local file:</p>
                <div className="bg-background p-3 rounded border border-border/50 font-mono text-xs text-muted-foreground mb-3 overflow-x-auto">
                  <div>NEXT_PUBLIC_ADMIN_EMAIL=your-email@example.com</div>
                  <div>NEXT_PUBLIC_ADMIN_PASSWORD=YourNewPassword123!</div>
                </div>
                <p className="text-xs text-amber-500">⚠ Then restart the development server</p>
              </div>

              <div className="pt-4 border-t border-border/50">
                <Button
                  onClick={handleLogout}
                  variant="outline"
                  className="border-red-500/30 text-red-400 hover:bg-red-500/10"
                >
                  Logout
                </Button>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  )
}
