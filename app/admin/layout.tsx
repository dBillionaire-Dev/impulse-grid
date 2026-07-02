import { auth } from '@/lib/auth'
import { redirect } from 'next/navigation'
import { headers } from 'next/headers'
import Link from 'next/link'

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const session = await auth.api.getSession({ headers: await headers() })
  
  if (!session?.user) {
    redirect('/sign-in')
  }

  return (
    <div className="min-h-screen bg-background text-foreground">
      <div className="flex">
        {/* Sidebar */}
        <aside className="w-64 border-r border-border/50 bg-card/30 backdrop-blur-sm p-6 fixed left-0 top-0 h-screen overflow-auto">
          <Link href="/admin" className="text-2xl font-bold bg-gradient-to-r from-purple-500 via-pink-500 to-orange-500 bg-clip-text text-transparent mb-12 block">
            NEX Admin
          </Link>

          <nav className="space-y-2">
            <Link href="/admin" className="block px-4 py-2 rounded-lg hover:bg-card/50 transition text-sm font-medium text-muted-foreground hover:text-foreground">
              Dashboard
            </Link>
            <Link href="/admin/services" className="block px-4 py-2 rounded-lg hover:bg-card/50 transition text-sm font-medium text-muted-foreground hover:text-foreground">
              Services
            </Link>
            <Link href="/admin/packages" className="block px-4 py-2 rounded-lg hover:bg-card/50 transition text-sm font-medium text-muted-foreground hover:text-foreground">
              Packages
            </Link>
            <Link href="/admin/projects" className="block px-4 py-2 rounded-lg hover:bg-card/50 transition text-sm font-medium text-muted-foreground hover:text-foreground">
              Projects
            </Link>
            <Link href="/admin/stats" className="block px-4 py-2 rounded-lg hover:bg-card/50 transition text-sm font-medium text-muted-foreground hover:text-foreground">
              Statistics
            </Link>
            <Link href="/admin/testimonials" className="block px-4 py-2 rounded-lg hover:bg-card/50 transition text-sm font-medium text-muted-foreground hover:text-foreground">
              Testimonials
            </Link>
            <Link href="/admin/process" className="block px-4 py-2 rounded-lg hover:bg-card/50 transition text-sm font-medium text-muted-foreground hover:text-foreground">
              Process Steps
            </Link>
            <Link href="/admin/tools" className="block px-4 py-2 rounded-lg hover:bg-card/50 transition text-sm font-medium text-muted-foreground hover:text-foreground">
              Tools
            </Link>
            <Link href="/admin/contact" className="block px-4 py-2 rounded-lg hover:bg-card/50 transition text-sm font-medium text-muted-foreground hover:text-foreground">
              Contact Submissions
            </Link>
            <Link href="/admin/settings" className="block px-4 py-2 rounded-lg hover:bg-card/50 transition text-sm font-medium text-muted-foreground hover:text-foreground">
              Settings
            </Link>
          </nav>

          <div className="mt-12 pt-6 border-t border-border/50">
            <p className="text-xs text-muted-foreground mb-3">Logged in as:</p>
            <p className="text-sm font-medium text-foreground truncate">{session.user.email}</p>
            <Link href="/api/auth/sign-out" className="text-xs text-purple-400 hover:text-purple-300 mt-4 block">
              Sign out
            </Link>
          </div>
        </aside>

        {/* Main content */}
        <main className="ml-64 flex-1">
          <div className="p-8">
            {children}
          </div>
        </main>
      </div>
    </div>
  )
}
