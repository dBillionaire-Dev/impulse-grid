import { auth } from '@/lib/auth'
import { headers } from 'next/headers'
import Link from 'next/link'
import { Button } from '@/components/ui/button'

export default async function AdminDashboard() {
  const session = await auth.api.getSession({ headers: await headers() })
  const userId = session?.user?.id as string

  const menuItems = [
    { label: 'Services', icon: '⚙️', href: '/admin/services', description: 'Manage service offerings' },
    { label: 'Projects', icon: '📁', href: '/admin/projects', description: 'Portfolio projects & case studies' },
    { label: 'Testimonials', icon: '⭐', href: '/admin/testimonials', description: 'Client testimonials & reviews' },
    { label: 'Statistics', icon: '📊', href: '/admin/stats', description: 'Portfolio metrics & achievements' },
    { label: 'Process', icon: '🔄', href: '/admin/process', description: 'Your workflow process steps' },
    { label: 'Tools', icon: '🛠️', href: '/admin/tools', description: 'Technologies & expertise' },
    { label: 'Contact', icon: '💬', href: '/admin/contact', description: 'Form submissions & messages' },
    { label: 'Settings', icon: '⚡', href: '/admin/settings', description: 'Portfolio & account settings' },
  ]

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between border-b border-border/50 pb-6">
        <div>
          <h1 className="text-5xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
            Admin Dashboard
          </h1>
          <p className="text-muted-foreground mt-2">Manage your portfolio content, projects, and settings</p>
        </div>
        <Button asChild className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700">
          <Link href="/">View Portfolio</Link>
        </Button>
      </div>

      {/* Main Content Management Grid */}
      <div>
        <h2 className="text-2xl font-bold text-white mb-6">Content Management</h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {menuItems.slice(0, 7).map((item) => (
            <Link key={item.label} href={item.href}>
              <div className="group border border-border/50 hover:border-purple-500/50 rounded-lg p-6 bg-card/30 hover:bg-card/50 transition-all cursor-pointer h-full">
                <div className="text-4xl mb-4 group-hover:scale-110 transition-transform">{item.icon}</div>
                <h3 className="font-semibold text-white mb-2 group-hover:text-purple-300 transition">{item.label}</h3>
                <p className="text-xs text-muted-foreground">{item.description}</p>
                <p className="text-xs text-purple-400 mt-4 group-hover:translate-x-1 transition-transform">Manage →</p>
              </div>
            </Link>
          ))}
          
          {/* Settings Card */}
          <Link href="/admin/settings">
            <div className="group border border-purple-500/30 hover:border-purple-400 rounded-lg p-6 bg-purple-500/5 hover:bg-purple-500/10 transition-all cursor-pointer h-full">
              <div className="text-4xl mb-4 group-hover:scale-110 transition-transform">⚙️</div>
              <h3 className="font-semibold text-white mb-2 group-hover:text-purple-300 transition">Settings</h3>
              <p className="text-xs text-muted-foreground">Portfolio configuration</p>
              <p className="text-xs text-purple-400 mt-4 group-hover:translate-x-1 transition-transform">Configure →</p>
            </div>
          </Link>
        </div>
      </div>

      {/* Quick Actions Section */}
      <div className="border border-border/50 rounded-lg p-8 bg-card/30 backdrop-blur-sm">
        <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-2">
          <span>⚡</span> Quick Actions
        </h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
          <Link href="/admin/services" className="group">
            <Button variant="outline" className="w-full justify-start group-hover:bg-purple-500/10 group-hover:border-purple-500/50 transition">
              <span className="mr-2">➕</span>
              Add Service
            </Button>
          </Link>
          <Link href="/admin/projects" className="group">
            <Button variant="outline" className="w-full justify-start group-hover:bg-purple-500/10 group-hover:border-purple-500/50 transition">
              <span className="mr-2">➕</span>
              Add Project
            </Button>
          </Link>
          <Link href="/admin/testimonials" className="group">
            <Button variant="outline" className="w-full justify-start group-hover:bg-purple-500/10 group-hover:border-purple-500/50 transition">
              <span className="mr-2">➕</span>
              Add Testimonial
            </Button>
          </Link>
          <Link href="/admin/contact" className="group">
            <Button variant="outline" className="w-full justify-start group-hover:bg-purple-500/10 group-hover:border-purple-500/50 transition">
              <span className="mr-2">📋</span>
              View Messages
            </Button>
          </Link>
        </div>
      </div>

      {/* System Status */}
      <div className="border border-border/50 rounded-lg p-8 bg-card/30 backdrop-blur-sm">
        <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-2">
          <span>✅</span> System Status
        </h2>
        <div className="space-y-4">
          <div className="flex items-center justify-between p-4 border border-border/30 rounded-lg hover:border-green-500/50 transition">
            <div>
              <p className="text-white font-medium">Database</p>
              <p className="text-sm text-muted-foreground">PostgreSQL · Neon</p>
            </div>
            <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse" />
          </div>
          <div className="flex items-center justify-between p-4 border border-border/30 rounded-lg hover:border-green-500/50 transition">
            <div>
              <p className="text-white font-medium">Authentication</p>
              <p className="text-sm text-muted-foreground">Better Auth · Secure</p>
            </div>
            <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse" />
          </div>
          <div className="flex items-center justify-between p-4 border border-border/30 rounded-lg hover:border-green-500/50 transition">
            <div>
              <p className="text-white font-medium">API Status</p>
              <p className="text-sm text-muted-foreground">All systems operational</p>
            </div>
            <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse" />
          </div>
        </div>
      </div>

      {/* Help Section */}
      <div className="border border-dashed border-purple-500/30 rounded-lg p-8 bg-purple-500/5">
        <h2 className="text-2xl font-bold text-white mb-4 flex items-center gap-2">
          <span>❓</span> Help & Support
        </h2>
        <p className="text-muted-foreground mb-6 max-w-2xl">
          Access documentation, API reference, or contact support for assistance managing your portfolio.
        </p>
        <div className="flex gap-4 flex-wrap">
          <Button variant="outline" className="hover:bg-purple-500/10 hover:border-purple-500/50">
            📚 Documentation
          </Button>
          <Button variant="outline" className="hover:bg-purple-500/10 hover:border-purple-500/50">
            🔗 API Reference
          </Button>
          <Button variant="outline" className="hover:bg-purple-500/10 hover:border-purple-500/50">
            💬 Support
          </Button>
        </div>
      </div>
    </div>
  )
}
