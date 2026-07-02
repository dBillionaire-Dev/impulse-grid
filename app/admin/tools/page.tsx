'use client'

import { Button } from '@/components/ui/button'

const pageNames = {
  packages: 'Packages',
  testimonials: 'Testimonials',
  stats: 'Statistics',
  process: 'Process Steps',
  tools: 'Tools & Technologies',
  contact: 'Contact Submissions',
  settings: 'Settings'
}

export default function AdminPage() {
  const pathname = typeof window !== 'undefined' ? window.location.pathname : ''
  const page = pathname.split('/').pop() || 'page'
  
  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-4xl font-bold text-white">Placeholder</h1>
          <p className="text-muted-foreground mt-2">Admin panel section</p>
        </div>
      </div>

      <div className="border border-dashed border-border rounded-lg p-12 text-center">
        <p className="text-muted-foreground mb-4">Admin interface</p>
        <p className="text-xs text-muted-foreground">This section follows the same pattern as Services</p>
      </div>
    </div>
  )
}
